import i18next from 'i18next';
import { checkForceClosureViolation, logger, registerEvent, sentryExceptioMessage, showToast } from './functions';

let fullscreenExitCallback = null;
let resizeTimeout;
let fullscreenTransitionInProgress = false;
let lastResizeTime = 0;
const RESIZE_COOLDOWN = 500; // ms between resize checks
let resizeCheckPending = false;
let resizeListenerActive = false;

export const initializeFullscreenMonitor = () => {
	if (!document.fullscreenEnabled) {
		return () => {};
	}

	let fullscreenCheckInterval = null;
	window.mereos = window.mereos || {};
	window.mereos.lastFullscreenState = false;

	const handleFullscreenChange = () => {
		const isCurrentlyFullscreen = document.fullscreenElement || 
		document.webkitFullscreenElement || 
		document.mozFullScreenElement || 
		document.msFullscreenElement;
		
		window.mereos.lastFullscreenState = isCurrentlyFullscreen;
		
		if (!isCurrentlyFullscreen) {
			setTimeout(() => {
				if (!document.fullscreenElement && !document.webkitFullscreenElement && 
					!document.mozFullScreenElement && !document.msFullscreenElement) {
					
					if (fullscreenExitCallback) {
						fullscreenExitCallback();
					} else {
						if (!window.mereos.forceFullscreenModal?.isOpen) {
							showForceFullscreenModal({ isInitialWarning: false });
						}
					}
				}
			}, 150);
		}
	};

	const handleKeydown = (event) => {
		if (event.key === 'F11' && document.fullscreenElement) {
			event.preventDefault();
		}
		
		if (event.key === 'Escape' && window.mereos.forceFullscreenModal?.isOpen) {
			event.preventDefault();
			forceFullScreen().catch(error => {
				logger.error('Failed to force fullscreen on Escape:', error);
			});
		}
	};

	document.addEventListener('fullscreenchange', handleFullscreenChange);
	document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
	document.addEventListener('mozfullscreenchange', handleFullscreenChange);
	document.addEventListener('MSFullscreenChange', handleFullscreenChange);
	document.addEventListener('keydown', handleKeydown);

	fullscreenCheckInterval = setInterval(() => {
		const isCurrentlyFullscreen = !!(document.fullscreenElement || 
			document.webkitFullscreenElement || 
			document.mozFullScreenElement || 
			document.msFullscreenElement);
		
		if (!isCurrentlyFullscreen && window.mereos.lastFullscreenState) {
			window.mereos.lastFullscreenState = false;
			if (fullscreenExitCallback) {
				fullscreenExitCallback();
			}
		}
	}, 1000);

	return () => {
		document.removeEventListener('fullscreenchange', handleFullscreenChange);
		document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
		document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
		document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
		document.removeEventListener('keydown', handleKeydown);
		
		if (fullscreenCheckInterval) {
			clearInterval(fullscreenCheckInterval);
		}
		
		if (window.mereos.forceFullscreenModal) {
			window.mereos.forceFullscreenModal.remove();
			window.mereos.forceFullscreenModal = null;
		}
		
		delete window.mereos.lastFullscreenState;
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
		background-color: rgba(0, 0, 0, 0.85);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999999;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		backdrop-filter: blur(5px);
	`;

	const modalContent = document.createElement('div');
	modalContent.className = 'force-fullscreen-modal';
	modalContent.style.cssText = `
		background-color: var(--theme-mode);
		z-index:99999999 !important;
		border-radius: 12px;
		width: 90%;
		max-width: 450px;
		padding: 32px 24px;
		text-align: center;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
		animation: modalFadeIn 0.3s ease;
	`;

	// Add keyframe animation
	const style = document.createElement('style');
	style.textContent = `
		@keyframes modalFadeIn {
			from { opacity: 0; transform: translateY(-20px); }
			to { opacity: 1; transform: translateY(0); }
		}
	`;
	document.head.appendChild(style);

	const icon = document.createElement('div');
	icon.className = 'force-fullscreen-modal-icon';
	icon.style.cssText = `
		font-size: 56px;
		margin-bottom: 24px;
	`;

	const warningIcon = document.createElement('span');
	warningIcon.textContent = '⚠️';
	warningIcon.setAttribute('role', 'img');
	warningIcon.setAttribute('aria-label', 'warning');
	icon.appendChild(warningIcon);

	const title = document.createElement('h3');
	title.className = 'force-fullscreen-modal-title';
	title.style.cssText = `
		margin: 0 0 16px 0;
		color: var(--text-color);
		font-size: 24px;
		font-weight: 600;
		opacity: 1;
		visibility: visible;
	`;
	title.textContent = isInitialWarning 
		? (i18next.t('fullscreen_required_title') || 'Fullscreen Required')
		: (i18next.t('fullscreen_exit_title') || 'Fullscreen Exit Detected');

	const message = document.createElement('p');
	message.className = 'force-fullscreen-modal-message';
	message.style.cssText = `
		margin: 0 0 28px 0;
		color: var(--text-color);
		font-size: 16px;
		line-height: 1.6;
		opacity: 1;
		visibility: visible;
	`;
	message.textContent = isInitialWarning
		? (i18next.t('fullscreen_required_message') || 'This assessment requires fullscreen mode for security reasons.')
		: (i18next.t('fullscreen_exit_message') || 'You have exited fullscreen mode. Please return to fullscreen to continue.');

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
		border-radius: 8px;
		padding: 14px 28px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		width: 100%;
		transition: all 0.2s ease;
		opacity: 1;
		visibility: visible;
	`;
	
	logger.success('isInitialWarning', isInitialWarning);
	button.textContent = isInitialWarning
		? (i18next.t('continue_in_fullscreen') || 'Continue in Fullscreen')
		: (i18next.t('return_to_fullscreen') || 'Return to Fullscreen');

	button.addEventListener('mouseenter', () => {
		button.style.backgroundColor = 'var(--theme-color-dark)';
		button.style.transform = 'translateY(-2px)';
	});
	button.addEventListener('mouseleave', () => {
		button.style.backgroundColor = 'var(--theme-color)';
		button.style.transform = 'translateY(0)';
	});

	button.addEventListener('click', async () => {
		try {
			await forceFullScreen();
			if (window.mereos.forceFullscreenModal) {
				window.mereos.forceFullscreenModal.remove();
				window.mereos.forceFullscreenModal.isOpen = false;
			}
			// Remove the style element we added
			if (style.parentNode) {
				style.parentNode.removeChild(style);
			}
		} catch (error) {
			sentryExceptioMessage(error,{type:'error',message:`Full screen failed`});
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

	const updateModalText = () => {
		if (title) {
			title.textContent = isInitialWarning 
				? (i18next.t('fullscreen_required_title') || 'Fullscreen Required')
				: (i18next.t('fullscreen_exit_title') || 'Fullscreen Exit Detected');
		}
		if (message) {
			message.textContent = isInitialWarning
				? (i18next.t('fullscreen_required_message') || 'This assessment requires fullscreen mode for security reasons.')
				: (i18next.t('fullscreen_exit_message') || 'You have exited fullscreen mode. Please return to fullscreen to continue.');
		}
		if (button) {
			button.textContent = isInitialWarning
				? (i18next.t('continue_in_fullscreen') || 'Continue in Fullscreen')
				: (i18next.t('return_to_fullscreen') || 'Return to Fullscreen');
		}
	};

	i18next.on('languageChanged', updateModalText);

	window.mereos.forceFullscreenModal = {
		element: modalContainer,
		isOpen: true,
		title: title,
		message: message,
		button: button,
		style: style,
		updateModalText: updateModalText,
		remove: () => {
			i18next.off('languageChanged', updateModalText);
			if (modalContainer.parentNode) {
				modalContainer.parentNode.removeChild(modalContainer);
			}
			if (style.parentNode) {
				style.parentNode.removeChild(style);
			}
			window.mereos.forceFullscreenModal.isOpen = false;
		}
	};
	
	setTimeout(() => {
		if (title) title.style.opacity = '1';
		if (message) message.style.opacity = '1';
		if (button) button.style.opacity = '1';
	}, 10);
};

export const forceFullScreen = () => {
	return new Promise((resolve, reject) => {
		const elem = document.documentElement;

		if (document.fullscreenElement || 
			document.webkitFullscreenElement || 
			document.mozFullScreenElement || 
			document.msFullscreenElement) {
			resolve();
			return;
		}

		fullscreenTransitionInProgress = true;

		const onFullscreenChange = () => {
			if (document.fullscreenElement || 
				document.webkitFullscreenElement || 
				document.mozFullScreenElement || 
				document.msFullscreenElement) {
				
				document.removeEventListener('fullscreenchange', onFullscreenChange);
				document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
				document.removeEventListener('mozfullscreenchange', onFullscreenChange);
				document.removeEventListener('MSFullscreenChange', onFullscreenChange);

				setTimeout(() => {
					fullscreenTransitionInProgress = false;
				}, 500);

				resolve();
			}
		};

		document.addEventListener('fullscreenchange', onFullscreenChange);
		document.addEventListener('webkitfullscreenchange', onFullscreenChange);
		document.addEventListener('mozfullscreenchange', onFullscreenChange);
		document.addEventListener('MSFullscreenChange', onFullscreenChange);

		const timeoutId = setTimeout(() => {
			document.removeEventListener('fullscreenchange', onFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
			document.removeEventListener('mozfullscreenchange', onFullscreenChange);
			document.removeEventListener('MSFullscreenChange', onFullscreenChange);
			fullscreenTransitionInProgress = false;
			reject(new Error('Fullscreen request timeout'));
		}, 5000);

		let requestPromise;

		try {
			if (elem.requestFullscreen) {
				requestPromise = elem.requestFullscreen();
			} else if (elem.webkitRequestFullscreen) {
				requestPromise = elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				requestPromise = elem.msRequestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				requestPromise = elem.mozRequestFullScreen();
			} else {
				clearTimeout(timeoutId);
				fullscreenTransitionInProgress = false;
				reject(new Error('Fullscreen API not supported'));
				return;
			}

			requestPromise
				.then(() => {
					clearTimeout(timeoutId);
				})
				.catch(error => {
					clearTimeout(timeoutId);
					fullscreenTransitionInProgress = false;
					reject(error);
				});
		} catch (error) {
			clearTimeout(timeoutId);
			fullscreenTransitionInProgress = false;
			reject(error);
		}
	});
};

const handleResize = () => {
	if (fullscreenTransitionInProgress) {
		return;
	}

	const now = Date.now();
	
	if (now - lastResizeTime < RESIZE_COOLDOWN) {
		if (!resizeCheckPending) {
			resizeCheckPending = true;
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				resizeCheckPending = false;
				lastResizeTime = Date.now();
				performResizeCheck();
			}, RESIZE_COOLDOWN);
		}
		return;
	}

	lastResizeTime = now;
	performResizeCheck();
};

const performResizeCheck = () => {
	registerEvent({
		eventType: 'error',
		notify: false,
		eventName: 'candidate_resized_window'
	});

	if (window.requestIdleCallback) {
		window.requestIdleCallback(() => {
			checkForceClosureViolation();
		}, { timeout: 1000 });
	} else {
		setTimeout(() => {
			checkForceClosureViolation();
		}, 250);
	}
};

export const detectWindowResize = () => {
	return new Promise((resolve, _reject) => {
		if (!resizeListenerActive) {
			window.addEventListener('resize', handleResize);
			resizeListenerActive = true;
		}
		resolve(true);
	});
};

export const registerFullscreenExitCallback = (callback) => {
	if (typeof callback === 'function') {
		fullscreenExitCallback = callback;
	}
};

export const unregisterFullscreenExitCallback = () => {
	fullscreenExitCallback = null;
};

export const initializeForceFullscreen = () => {
	window.mereos = window.mereos || {};
	
	const cleanupMonitor = initializeFullscreenMonitor();

	const showInitialModal = () => {
		showForceFullscreenModal({ isInitialWarning: true });
	};

	if (window.requestAnimationFrame) {
		window.requestAnimationFrame(() => {
			setTimeout(showInitialModal, 100);
		});
	} else {
		setTimeout(showInitialModal, 100);
	}

	registerFullscreenExitCallback(() => {
		if (!fullscreenTransitionInProgress) {
			showForceFullscreenModal({ isInitialWarning: false });
		}
	});

	detectWindowResize();

	return () => {
		cleanupMonitor();
		unregisterFullscreenExitCallback();
		if (window.mereos.forceFullscreenModal) {
			window.mereos.forceFullscreenModal.remove();
			window.mereos.forceFullscreenModal = null;
		}
		if (resizeListenerActive) {
			window.removeEventListener('resize', handleResize);
			resizeListenerActive = false;
		}
		clearTimeout(resizeTimeout);
		resizeCheckPending = false;
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
	
	if (resizeListenerActive) {
		window.removeEventListener('resize', handleResize);
		resizeListenerActive = false;
	}
	
	delete window.mereos.lastFullscreenState;
	
	clearTimeout(resizeTimeout);
	resizeCheckPending = false;
	fullscreenExitCallback = null;
	fullscreenTransitionInProgress = false;
};