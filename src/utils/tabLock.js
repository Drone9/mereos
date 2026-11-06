import i18next from 'i18next';

import { initializeI18next, updateThemeColor } from './functions';

const LOCK_KEY = 'mereosAssessmentTabLock';
const CHANNEL_NAME = 'mereos_assessment_tab_lock';
const HEARTBEAT_INTERVAL_MS = 4000;
const STALE_THRESHOLD_MS = 12000;
const CLAIM_VERIFY_DELAY_MS = 250;

export const assessmentTabBlockedError = {
	type: 'error',
	message: 'assessment_already_open_in_another_tab',
	code: 40069
};

const previousState = window.mereosTabLockState;
const state = {
	tabId: previousState?.tabId ||
		(window.crypto?.randomUUID && window.crypto.randomUUID()) ||
		`${Date.now()}-${Math.random().toString(36).slice(2)}`,
	status: previousState?.status || 'idle', // 'idle' | 'owner' | 'blocked'
	heartbeatTimer: null,
	watchTimer: null,
	channel: null,
	overlayHost: null,
	overlayRoot: null,
	overlayMode: null, // 'active' | 'completed'
	languageListener: null,
	pagehideListener: null
};

if (previousState) {
	clearInterval(previousState.heartbeatTimer);
	clearInterval(previousState.watchTimer);
	previousState.channel?.close();
	previousState.overlayHost?.remove();
	if (previousState.languageListener) i18next.off('languageChanged', previousState.languageListener);
	if (previousState.pagehideListener) window.removeEventListener('pagehide', previousState.pagehideListener);
}
window.mereosTabLockState = state;

const { tabId } = state;

const readLock = () => {
	try {
		const raw = localStorage.getItem(LOCK_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
};

const writeLock = (lockStatus = 'active') => {
	localStorage.setItem(LOCK_KEY, JSON.stringify({ tabId, timestamp: Date.now(), status: lockStatus }));
};

const isHeldByOtherTab = (lock) =>
	!!lock &&
	lock.status !== 'completed' &&
	lock.tabId !== tabId &&
	Date.now() - lock.timestamp <= STALE_THRESHOLD_MS;

const notifyIntegrator = (payload) => {
	try {
		if (typeof window.mereos?.globalCallback === 'function') {
			window.mereos.globalCallback(payload);
		}
	} catch (error) {
		console.error('Error in tab lock callback', error);
	}
};

/* ---------- Blocked-tab modal (styled like the force-fullscreen modal) ---------- */

const MODAL_CSS = `
	.tab-blocked-modal-overlay {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(5px);
		z-index: 2147483647;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		font-style: var(--font-style, normal);
	}
	.tab-blocked-modal {
		box-sizing: border-box;
		width: 90%;
		max-width: 450px;
		padding: 32px 24px;
		border-radius: 12px;
		background-color: var(--theme-mode, #ffffff);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
		text-align: center;
		animation: tabBlockedModalFadeIn 0.3s ease;
	}
	@keyframes tabBlockedModalFadeIn {
		from { opacity: 0; transform: translateY(-20px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.tab-blocked-modal-icon {
		font-size: 56px;
		margin-bottom: 24px;
	}
	.tab-blocked-modal-title {
		margin: 0 0 16px 0;
		color: var(--text-color, #000000);
		font-size: 24px;
		font-weight: 600;
	}
	.tab-blocked-modal-message {
		margin: 0 0 28px 0;
		color: var(--text-color, #000000);
		font-size: 16px;
		line-height: 1.6;
	}
	.tab-blocked-modal-message:last-child {
		margin-bottom: 0;
	}
	.tab-blocked-modal-button {
		width: 100%;
		padding: 14px 28px;
		border: none;
		border-radius: 8px;
		background-color: var(--theme-color, #FF961B);
		color: #ffffff;
		font-family: inherit;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.tab-blocked-modal-button:hover {
		box-shadow: 1px 1px 2px rgb(32 33 36 / 28%);
	}
	.tab-blocked-modal-button:active {
		transform: scale(0.98);
	}
`;

const renderOverlay = () => {
	if (!state.overlayRoot) return;
	const isCompleted = state.overlayMode === 'completed';
	const t = (key) => i18next.t(key);

	state.overlayRoot.innerHTML = `
		<style>${MODAL_CSS}</style>
		<div class="tab-blocked-modal-overlay">
			<div class="tab-blocked-modal" role="alertdialog" aria-modal="true" aria-labelledby="tab-blocked-title" aria-describedby="tab-blocked-message">
				<div class="tab-blocked-modal-icon"><span role="img" aria-label="warning">⚠️</span></div>
				<h3 class="tab-blocked-modal-title" id="tab-blocked-title">
					${t(isCompleted ? 'assessment_already_completed_in_another_tab_title' : 'assessment_in_progress_in_another_tab_title')}
				</h3>
				<p class="tab-blocked-modal-message" id="tab-blocked-message">
					${t(isCompleted ? 'assessment_already_completed_in_another_tab_message' : 'assessment_in_progress_in_another_tab_message')}
				</p>
				${isCompleted ? '' : `<button type="button" class="tab-blocked-modal-button">${t('reload_page')}</button>`}
			</div>
		</div>
	`;

	state.overlayRoot.querySelector('.tab-blocked-modal-button')?.addEventListener('click', () => window.location.reload());
};

const showOverlay = (mode) => {
	if (!i18next.isInitialized) {
		initializeI18next();
	}

	try {
		updateThemeColor();
	} catch (error) {
		console.error('Error applying theme to tab-blocked modal', error);
	}
	if (!state.languageListener) {
		state.languageListener = renderOverlay;
		i18next.on('languageChanged', renderOverlay);
	}

	state.overlayMode = mode;
	if (!state.overlayHost || !state.overlayHost.isConnected) {
		state.overlayHost = document.createElement('div');
		state.overlayHost.id = 'mereos-tab-blocked';
		state.overlayRoot = state.overlayHost.attachShadow({ mode: 'closed' });
		(document.body || document.documentElement).appendChild(state.overlayHost);
	}
	renderOverlay();
};

const hideOverlay = () => {
	state.overlayHost?.remove();
	state.overlayHost = null;
	state.overlayRoot = null;
	state.overlayMode = null;
};

/* ---------- Lock lifecycle ---------- */

const stopHeartbeat = () => {
	clearInterval(state.heartbeatTimer);
	state.heartbeatTimer = null;
};

const stopWatching = () => {
	clearInterval(state.watchTimer);
	state.watchTimer = null;
};

const showCompleted = () => {
	stopWatching();
	showOverlay('completed');
};

// The lock is free again: reload so the host page re-runs init() and this tab takes over.
const resumeTab = () => {
	stopWatching();
	window.location.reload();
};

const handleChannelMessage = (event) => {
	const { type, tabId: senderId } = event.data || {};
	if (senderId === tabId || state.status !== 'blocked') return;

	if (type === 'completed') {
		showCompleted();
	} else if (type === 'released') {
		resumeTab();
	}
};

const getChannel = () => {
	if (!state.channel && typeof BroadcastChannel !== 'undefined') {
		state.channel = new BroadcastChannel(CHANNEL_NAME);
		state.channel.onmessage = handleChannelMessage;
	}
	return state.channel;
};

// Polls in case BroadcastChannel is unavailable or the owner tab crashed without releasing.
const startWatching = () => {
	stopWatching();
	state.watchTimer = setInterval(() => {
		const lock = readLock();
		if (lock?.status === 'completed' && lock.tabId !== tabId) {
			showCompleted();
		} else if (!isHeldByOtherTab(lock)) {
			resumeTab();
		}
	}, HEARTBEAT_INTERVAL_MS);
};

const block = ({ notify = true } = {}) => {
	const wasBlocked = state.status === 'blocked';
	state.status = 'blocked';
	stopHeartbeat();
	getChannel();
	showOverlay('active');
	startWatching();
	if (notify && !wasBlocked) {
		notifyIntegrator(assessmentTabBlockedError);
	}
};

const startHeartbeat = () => {
	stopHeartbeat();
	state.heartbeatTimer = setInterval(() => {
		if (isHeldByOtherTab(readLock())) {
			block();
			return;
		}
		writeLock();
	}, HEARTBEAT_INTERVAL_MS);
};

export const acquireAssessmentTabLock = () => {
	if (isHeldByOtherTab(readLock())) {
		block({ notify: false });
		return false;
	}

	writeLock();
	state.status = 'owner';
	stopWatching();
	hideOverlay();
	getChannel();
	startHeartbeat();

	// Two tabs can claim at the same instant; the last write wins and the other one yields.
	setTimeout(() => {
		if (state.status === 'owner' && isHeldByOtherTab(readLock())) {
			block();
		}
	}, CLAIM_VERIFY_DELAY_MS);

	return true;
};

export const isAssessmentTabBlocked = () => state.status === 'blocked';


export const ensureAssessmentTabLock = () =>
	state.status === 'owner' || acquireAssessmentTabLock();


export const releaseAssessmentTabLock = ({ completed = false } = {}) => {
	if (state.status !== 'owner') return;

	stopHeartbeat();
	if (readLock()?.tabId === tabId) {
		if (completed) {
			writeLock('completed');
		} else {
			localStorage.removeItem(LOCK_KEY);
		}
	}
	getChannel()?.postMessage({ type: completed ? 'completed' : 'released', tabId });
	state.status = 'idle';
};

state.pagehideListener = () => releaseAssessmentTabLock();
window.addEventListener('pagehide', state.pagehideListener);

if (state.status === 'owner') {
	getChannel();
	startHeartbeat();
} else if (state.status === 'blocked') {
	block({ notify: false });
}

const checkLockOnLoad = () => {
	if (state.status === 'idle' && isHeldByOtherTab(readLock())) {
		block({ notify: false });
	}
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', checkLockOnLoad, { once: true });
} else {
	setTimeout(checkLockOnLoad, 0);
}
