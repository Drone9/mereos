import { defaultInitPayload } from './defaults.js';

const logEl = document.getElementById('log');
const flowStatusEl = document.getElementById('flowStatus');
const initJsonEl = document.getElementById('initJson');
const lightModeEl = document.getElementById('lightMode');
const darkModeEl = document.getElementById('darkMode');

const btnInit = document.getElementById('btnInit');
const btnPrechecks = document.getElementById('btnPrechecks');
const btnStopPrechecks = document.getElementById('btnStopPrechecks');
const btnSession = document.getElementById('btnSession');
const btnStopSession = document.getElementById('btnStopSession');

const FLOW = {
	login: 'login',
	prechecks: 'prechecks',
	session: 'session',
	stop: 'stop',
};

let currentStep = FLOW.login;
let initSucceeded = false;
let prechecksCompleted = false;
let sessionStarted = false;

if (!initJsonEl.value.trim()) {
	initJsonEl.value = JSON.stringify(defaultInitPayload, null, 2);
}

lightModeEl.addEventListener('change', () => {
	if (lightModeEl.checked) darkModeEl.checked = false;
});

darkModeEl.addEventListener('change', () => {
	if (darkModeEl.checked) lightModeEl.checked = false;
});

let mereosApi;

async function getMereos() {
	mereosApi = await import('mereos');
	return mereosApi;
}

if (import.meta.hot) {
	import.meta.hot.accept(() => {
		mereosApi = null;
	});
}

function log(message, data) {
	const time = new Date().toLocaleTimeString();
	const line = data !== undefined
		? `[${time}] ${message}\n${JSON.stringify(data, null, 2)}\n`
		: `[${time}] ${message}\n`;
	logEl.textContent = line + logEl.textContent;
}

function mirrorMereosConsoleToPage() {
	const mirror = (args) => {
		const first = args[0];
		const text = typeof first === 'string' ? first.replace(/^%c/, '') : '';
		if (!text.includes('[mereos]')) return;
		const data = args.length > 2 ? args[args.length - 1] : (args.length === 2 && typeof args[1] !== 'string' ? args[1] : undefined);
		log(text.replace('[mereos] ', ''), data);
	};

	const originalLog = console.log.bind(console);
	const originalInfo = console.info.bind(console);
	const originalWarn = console.warn.bind(console);
	const originalError = console.error.bind(console);

	console.log = (...args) => {
		originalLog(...args);
		mirror(args);
	};
	console.info = (...args) => {
		originalInfo(...args);
		mirror(args);
	};
	console.warn = (...args) => {
		originalWarn(...args);
		mirror(args);
	};
	console.error = (...args) => {
		originalError(...args);
		mirror(args);
	};
}

mirrorMereosConsoleToPage();

function setStep(step, statusText) {
	currentStep = step;
	document.querySelectorAll('.step').forEach((el) => {
		const stepName = el.dataset.step;
		el.classList.remove('active', 'done');
		const order = [FLOW.login, FLOW.prechecks, FLOW.session, FLOW.stop];
		const currentIdx = order.indexOf(step);
		const elIdx = order.indexOf(stepName);
		if (elIdx < currentIdx) el.classList.add('done');
		if (elIdx === currentIdx) el.classList.add('active');
	});
	if (statusText) flowStatusEl.textContent = statusText;
	updateButtons();
}

function updateButtons() {
	btnPrechecks.disabled = !initSucceeded || sessionStarted;
	btnStopPrechecks.disabled = !initSucceeded || sessionStarted;
	btnSession.disabled = !initSucceeded || !prechecksCompleted || sessionStarted;
	btnStopSession.disabled = !sessionStarted;
}

function buildSchoolTheme() {
	const mode = darkModeEl.checked ? 'dark' : lightModeEl.checked ? 'light' : 'dark';

	return {
		language: document.getElementById('language').value,
		theming: document.getElementById('themeColor').value,
		mode,
		font: document.getElementById('fontStyle').value,
	};
}

function parseInitPayload() {
	const raw = initJsonEl.value.trim();
	const payload = raw ? JSON.parse(raw) : defaultInitPayload;

	const credentials = payload.host || payload.credentials || {
		client_id: payload.client_id,
		client_secret: payload.client_secret,
	};

	const profileId = payload.profileID ?? payload.profileId ?? payload.profile_id;
	const candidateData = payload.candidateData ?? payload.candidate_object ?? payload.candidate;
	const assessmentData = payload.assessmentData ?? payload.assessment_object ?? payload.assessment;

	if (!credentials?.client_id || !credentials?.client_secret) {
		throw new Error('host.client_id and host.client_secret are required');
	}
	if (profileId === undefined || profileId === null || profileId === '') {
		throw new Error('profileID is required');
	}
	if (!candidateData) {
		throw new Error('candidateData is required');
	}
	if (!assessmentData) {
		throw new Error('assessmentData is required');
	}

	return {
		credentials,
		profileId: Number(profileId),
		candidateData,
		assessmentData,
		schoolTheme: buildSchoolTheme(),
	};
}

function handlePrechecksCallback(result) {
	log('prechecks callback', result);

	if (result?.type === 'error') {
		setStep(FLOW.prechecks, `Prechecks error: ${result.message}. Fix the issue and click Start Prechecks.`);
		return;
	}

	if (result?.code === 50001 || result?.message === 'precheck_completed') {
		prechecksCompleted = true;
		setStep(FLOW.session, 'Prechecks complete. Click Start Session to begin recording.');
		log('Prechecks finished — ready for Start Session');
		return;
	}

	if (result?.code === 50017 || result?.code === 50018) {
		setStep(FLOW.prechecks, 'Precheck modal open — complete all steps in the overlay (camera, ID, etc.).');
	}
}

async function runPrechecks(resume = false) {
	const { start_prechecks } = await getMereos();
	log(resume ? 'Resuming prechecks...' : 'Opening prechecks modal...');
	setStep(FLOW.prechecks, 'Precheck modal loading — complete all steps in the overlay.');

	const setting = resume ? 'session_resume' : undefined;
	start_prechecks(handlePrechecksCallback, setting);
}

async function runInit() {
	const { init } = await getMereos();
	const { credentials, profileId, candidateData, assessmentData, schoolTheme } = parseInitPayload();

	log('Calling init...', { profileId, schoolTheme });
	setStep(FLOW.login, 'Logging in...');

	init(credentials, candidateData, profileId, assessmentData, schoolTheme, async (result) => {
		log('init callback', result);

		if (result?.type !== 'success') {
			initSucceeded = false;
			setStep(FLOW.login, `Login failed: ${result?.message || 'unknown error'}. Check credentials and payload.`);
			return;
		}

		initSucceeded = true;
		prechecksCompleted = false;
		sessionStarted = false;
		setStep(FLOW.prechecks, 'Login successful — opening prechecks...');

		try {
			await runPrechecks(false);
		} catch (error) {
			log('Failed to start prechecks after login', { message: error.message });
			setStep(FLOW.prechecks, 'Login OK but prechecks failed to open. Click Start Prechecks.');
		}
	});
}

btnInit.addEventListener('click', async () => {
	try {
		await runInit();
	} catch (error) {
		log('Init error', { message: error.message });
		setStep(FLOW.login, `Error: ${error.message}`);
	}
});

btnPrechecks.addEventListener('click', async () => {
	try {
		if (!initSucceeded) {
			log('Run Login first before prechecks');
			return;
		}
		await runPrechecks(true);
	} catch (error) {
		log('Error', { message: error.message });
	}
});

btnStopPrechecks.addEventListener('click', async () => {
	try {
		const { stop_prechecks } = await getMereos();
		log('Calling stop_prechecks...');
		stop_prechecks((result) => {
			log('stop_prechecks callback', result);
			prechecksCompleted = false;
			setStep(FLOW.prechecks, 'Prechecks stopped. Click Start Prechecks to open again.');
		});
	} catch (error) {
		log('Error', { message: error.message });
	}
});

btnSession.addEventListener('click', async () => {
	try {
		const { start_session } = await getMereos();
		log('Calling start_session...');
		setStep(FLOW.session, 'Starting proctoring session...');

		start_session((result) => {
			log('start_session callback', result);

			if (result?.type === 'success') {
				sessionStarted = true;
				setStep(FLOW.stop, 'Session running. Click Stop Session when finished.');
			} else {
				setStep(FLOW.session, `Session failed: ${result?.message || 'unknown'}. Complete prechecks first if required.`);
			}
			updateButtons();
		});
	} catch (error) {
		log('Error', { message: error.message });
	}
});

btnStopSession.addEventListener('click', async () => {
	try {
		const { stop_session } = await getMereos();
		log('Calling stop_session...');

		stop_session((result) => {
			log('stop_session callback', result);
			sessionStarted = false;
			initSucceeded = false;
			prechecksCompleted = false;
			setStep(FLOW.login, 'Session ended. Click Login to start again.');
			updateButtons();
		});
	} catch (error) {
		log('Error', { message: error.message });
	}
});

setStep(FLOW.login, 'Step 1: Click Login to authenticate and open prechecks.');
log('Dev playground ready. Login will auto-open prechecks on success.');
