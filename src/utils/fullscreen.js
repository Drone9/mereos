import i18next from 'i18next';
import { showToast } from './functions';

export const initializeFullscreenMonitor = () => {
	if (!document.fullscreenEnabled) {
		return () => {};
	}

	const handleFullscreenChange = () => {
		
		if (!document.fullscreenElement) {
			setTimeout(() => {
				if (!window.mereos.forceFullscreenModal?.isOpen) {
					showForceFullscreenModal({ isInitialWarning: false });
				}
			}, 100);
		}
	};

	const handleKeydown = (event) => {
		if (event.key === 'F11' && document.fullscreenElement) {
			event.preventDefault();
		}
		
		if (event.key === 'Escape' && window.mereos.forceFullscreenModal?.isOpen) {
			event.preventDefault();
			forceFullScreen();
		}
	};

	const handleVisibilityChange = () => {
		if (document.hidden && document.fullscreenElement) {
		}
	};

	document.addEventListener('fullscreenchange', handleFullscreenChange);
	document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
	document.addEventListener('mozfullscreenchange', handleFullscreenChange);
	document.addEventListener('MSFullscreenChange', handleFullscreenChange);
	document.addEventListener('keydown', handleKeydown);
	document.addEventListener('visibilitychange', handleVisibilityChange);

	return () => {
		document.removeEventListener('fullscreenchange', handleFullscreenChange);
		document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
		document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
		document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
		document.removeEventListener('keydown', handleKeydown);
		document.removeEventListener('visibilitychange', handleVisibilityChange);
		if (window.mereos.forceFullscreenModal) {
			window.mereos.forceFullscreenModal.remove();
			window.mereos.forceFullscreenModal = null;
		}
	};
};

export const showForceFullscreenModal = (options = {}) => {
	const { isInitialWarning = false } = options;
	
	
	if (window.mereos.forceFullscreenModal?.isOpen) {
		return;
	}
	
	if (window.mereos.forceFullscreenModal) {
		window.mereos.forceFullscreenModal.remove();
	}
	
	const modalContainer = document.createElement('div');
	modalContainer.className = 'force-fullscreen-modal-overlay';
	modalContainer.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999999;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	`;

	const modalContent = document.createElement('div');
	modalContent.className = 'force-fullscreen-modal';
	modalContent.style.cssText = `
		background-color: white;
		border-radius: 8px;
		width: 90%;
		max-width: 450px;
		padding: 32px 24px;
		text-align: center;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	`;

	const icon = document.createElement('div');
	icon.className = 'force-fullscreen-modal-icon';
	icon.style.cssText = `
		font-size: 48px;
		margin-bottom: 20px;
	`;

	const warningIcon = document.createElement('span');
	warningIcon.textContent = '⚠️';
	warningIcon.setAttribute('role', 'img');
	warningIcon.setAttribute('aria-label', 'warning');
	icon.appendChild(warningIcon);

	// Create title
	const title = document.createElement('h3');
	title.className = 'force-fullscreen-modal-title';
	title.style.cssText = `
		margin: 0 0 16px 0;
		color: #333;
		font-size: 20px;
		font-weight: 600;
	`;
	title.textContent = isInitialWarning 
		? i18next.t('fullscreen_required_title')
		: i18next.t('fullscreen_exit_title');

	const message = document.createElement('p');
	message.className = 'force-fullscreen-modal-message';
	message.style.cssText = `
		margin: 0 0 24px 0;
		color: #666;
		font-size: 16px;
		line-height: 1.5;
	`;
	message.textContent = isInitialWarning
		? i18next.t('fullscreen_required_message')
		: i18next.t('fullscreen_exit_message');

	const buttonContainer = document.createElement('div');
	buttonContainer.style.cssText = `
		width: 100%;
	`;

	const button = document.createElement('button');
	button.className = 'orange-filled-btn force-fullscreen-modal-button';
	button.style.cssText = `
		background-color: var(--theme-color);
		color: white;
		border: none;
		border-radius: 4px;
		padding: 12px 24px;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		width: 100%;
		transition: background-color 0.2s;
	`;
	
	button.textContent = isInitialWarning
		? i18next.t('continue_in_fullscreen')
		: i18next.t('return_to_fullscreen');

	button.addEventListener('click', async () => {
		try {
			await forceFullScreen();
			if (window.mereos.forceFullscreenModal) {
				window.mereos.forceFullscreenModal.remove();
				window.mereos.forceFullscreenModal.isOpen = false;
			}
		} catch (error) {
			showToast('error', 'fullscreen_failed');
		}
	});

	buttonContainer.appendChild(button);
	modalContent.appendChild(icon);
	modalContent.appendChild(title);
	modalContent.appendChild(message);
	modalContent.appendChild(buttonContainer);
	modalContainer.appendChild(modalContent);

	document.body.appendChild(modalContainer);

	window.mereos.forceFullscreenModal = {
		element: modalContainer,
		isOpen: true,
		remove: () => {
			if (modalContainer.parentNode) {
				modalContainer.parentNode.removeChild(modalContainer);
			}
			window.mereos.forceFullscreenModal.isOpen = false;
		}
	};
	
};

export const forceFullScreen = () => {
	return new Promise((resolve, reject) => {
		const elem = document.documentElement;
		
		if (document.fullscreenElement) {
			resolve();
			return;
		}
		
		const onFullscreenChange = () => {
			if (document.fullscreenElement) {
				document.removeEventListener('fullscreenchange', onFullscreenChange);
				document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
				resolve();
			}
		};
		
		document.addEventListener('fullscreenchange', onFullscreenChange);
		document.addEventListener('webkitfullscreenchange', onFullscreenChange);
		
		let requestPromise;
		if (elem.requestFullscreen) {
			requestPromise = elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) { /* Safari */
			requestPromise = elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { /* IE11 */
			requestPromise = elem.msRequestFullscreen();
		} else {
			document.removeEventListener('fullscreenchange', onFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
			reject(new Error('Fullscreen API not supported'));
			return;
		}
		
		requestPromise.catch(error => {
			document.removeEventListener('fullscreenchange', onFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
			reject(error);
		});
	});
};

let fullscreenExitCallback = null;
console.log('fullscreenExitCallback',fullscreenExitCallback);
export const registerFullscreenExitCallback = (callback) => {
	fullscreenExitCallback = callback;
};

export const unregisterFullscreenExitCallback = () => {
	fullscreenExitCallback = null;
};

export const initializeForceFullscreen = () => {
	
	const cleanupMonitor = initializeFullscreenMonitor();

	showForceFullscreenModal({ isInitialWarning: true });

	registerFullscreenExitCallback(() => {
		showForceFullscreenModal({ isInitialWarning: false });
	});

	return () => {
		cleanupMonitor();
		unregisterFullscreenExitCallback();
		if (window.mereos.forceFullscreenModal) {
			window.mereos.forceFullscreenModal.remove();
			window.mereos.forceFullscreenModal = null;
		}
	};
};

export const cleanupForceFullscreen = () => {	
	if (window.mereos.cleanupForceFullscreen) {
		window.mereos.cleanupForceFullscreen();
		window.mereos.cleanupForceFullscreen = null;
	}
	
	if (window.mereos.fullscreenCheckInterval) {
		clearInterval(window.mereos.fullscreenCheckInterval);
		window.mereos.fullscreenCheckInterval = null;
	}
	
	if (window.mereos.forceFullscreenModal) {
		window.mereos.forceFullscreenModal.remove();
		window.mereos.forceFullscreenModal = null;
	}
};