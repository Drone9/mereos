import i18next from 'i18next';

import { 
	checkCamera, 
	checkMicrophone, 
	detectMultipleScreens, 
	getLocation, 
	getSecureFeatures, 
	logger, 
	registerEvent, 
	sentryExceptioMessage, 
	updatePersistData 
} from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { showTab } from '../ExamsPrechecks';

let cameraStream = null;
let audioStream = null;
let screenMonitorInterval = null; 
let locationMonitorInterval = null;
let locationErrorRegistered = false;

const videoGreen = `${ASSET_URL}/video-camera-green.svg`;
const microPhoneGreen = `${ASSET_URL}/microphone-green.svg`;
const locationGreen = `${ASSET_URL}/location-pin-green.svg`;
const multipleScreenGreen = `${ASSET_URL}/single-screen-green.svg`;
const videoRed = `${ASSET_URL}/video-camera-red.svg`;
const microPhoneRed = `${ASSET_URL}/microphone-red.svg`;
const locationRed = `${ASSET_URL}/location-pin-red.svg`;
const multipleScreenRed = `${ASSET_URL}/single-screen-red.svg`;

const successIconMap = {
	webcam: videoGreen,
	microphone: microPhoneGreen,
	location: locationGreen,
	desktop: multipleScreenGreen
};

const failureIconMap = {
	webcam: videoRed,
	microphone: microPhoneRed,
	location: locationRed,
	desktop: multipleScreenRed
};

const stopScreenMonitoring = () => {
	if (screenMonitorInterval) {
		clearInterval(screenMonitorInterval);
		screenMonitorInterval = null;
	}
};

const renderUI = (tab1Content) => {
	const candidateAssessment = getSecureFeatures();
	const secureFeatures = candidateAssessment?.entities || [];
	const recordVideo = secureFeatures.some(entity => entity.key === 'record_video' || entity.key === 'record_room');
	const recordAudio = secureFeatures.some(entity => entity.key === 'record_audio');
	const trackLocation = secureFeatures.some(entity => entity.key === 'track_location');
	const multipleScreensCheck = secureFeatures.some(entity => entity.key === 'verify_desktop');

	let diagnosticItemsHTML = '';
    
	if (recordVideo) {
		diagnosticItemsHTML += createDiagnosticItemHTML('webcam', i18next.t('webcam'));
	}
	if (recordAudio) {
		diagnosticItemsHTML += createDiagnosticItemHTML('microphone', i18next.t('microphone'));
	}
	if (trackLocation) {
		diagnosticItemsHTML += createDiagnosticItemHTML('location', i18next.t('location'));
	}
	if (multipleScreensCheck) {
		diagnosticItemsHTML += createDiagnosticItemHTML('desktop', i18next.t('single_screen'));
	}

	const html = `
    <div class="system-diagnostic-test-screen">
        <h1 class="heading">${i18next.t('system_diagnostics')}</h1>
        <div class="diagnostic-status container-box">
            <div class="container">
                <div class="container-top"></div>
                <label class="description">${i18next.t('system_diagnostics_msg')}</label>
                <div class="container-prompt"></div>
                <img src="${ASSET_URL}/microphone-${i18next.language || 'en'}.svg" alt="" id="microphone-img" width="350" class="prompt-image">
                <div class="container-middle box-section">
                    ${diagnosticItemsHTML}
                </div>
                <div class="button-section">
                    <button class="orange-hollow-btn" id="diagnosticRefreshBtn" style="display: none;">
                        ${i18next.t('refresh')}
                    </button>
                    <button class="orange-filled-btn" id="diagnosticContinueBtn" disabled>${i18next.t('continue')}</button>
                </div>
            </div>
        </div>
    </div>
    `;

	tab1Content.innerHTML = html;

	window.mereos.shadowRoot.getElementById('diagnosticRefreshBtn')?.addEventListener('click', async () => {
		await retryAllFailedDiagnostics();
	});

	window.mereos.shadowRoot.getElementById('diagnosticContinueBtn')?.addEventListener('click', () => {
		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());
		stopScreenMonitoring();
		stopLocationMonitoring();

		registerEvent({ eventType: 'success', notify: false, eventName: 'system_diagnostic_passed' });
		updatePersistData('preChecksSteps',{ diagnosticStep:true });
		showTab('SystemRequirements');
	});

	addDiagnosticItemClickEvents();
};

const createDiagnosticItemHTML = (id, label) => {
	const statusIconMap = {
		webcam: 'video-camera-light-gray.svg',
		microphone: 'microphone-light-gray.svg',
		location: 'location-pin-black.svg',
		desktop: 'single-screen-gray.svg'
	};

	return `
    <div class="diagnostic-item grey-box" id="${id}DiagnosticItem">
        <div class="grey-box-right">
            <img id="${id}StatusIcon" src="${ASSET_URL}/${statusIconMap[id] || 'video-camera-light-gray.svg'}" alt="">
            <label>${label}</label>
        </div>
        <div class="grey-box-left">
            <img id="${id}StatusLoading" src="${ASSET_URL}/loading-gray.svg" alt="">
        </div>
    </div>
    `;
};

const addDiagnosticItemClickEvents = () => {
	const handleDiagnosticItemClick = (id, checkFunction) => {
		const element = window.mereos.shadowRoot.getElementById(`${id}DiagnosticItem`);
		if (!element || id === 'desktop') {
			return;
		}
        
		element.addEventListener('click', async () => {
			const result = await checkFunction();
			setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, result);
			updateContinueButtonState();
			updateRefreshButtonVisibility();
		});
	};

	handleDiagnosticItemClick('webcam', checkCamera);
	handleDiagnosticItemClick('microphone', checkMicrophone);
	handleDiagnosticItemClick('location', getLocation);
};

const retryAllFailedDiagnostics = async () => {
	const refreshBtn = window.mereos.shadowRoot.getElementById('diagnosticRefreshBtn');
	const continueBtn = window.mereos.shadowRoot.getElementById('diagnosticContinueBtn');
	
	if (refreshBtn && continueBtn) {
		refreshBtn.disabled = true;
		continueBtn.disabled = true;
		
		refreshBtn.innerHTML = `
			${i18next.t('retrying')}
		`;
		
		try {
			const candidateAssessment = getSecureFeatures();
			const secureFeatures = candidateAssessment?.entities || [];
			const recordVideo = secureFeatures.some(entity => entity.key === 'record_video' || entity.key === 'record_room');
			const recordAudio = secureFeatures.some(entity => entity.key === 'record_audio');
			const trackLocation = secureFeatures.some(entity => entity.key === 'track_location');
			const multipleScreensCheck = secureFeatures.some(entity => entity.key === 'verify_desktop');
			
			const retryPromises = [];
			
			const failedDiagnostics = getFailedDiagnostics();
			
			if (failedDiagnostics.includes('webcam') && recordVideo) {
				retryPromises.push(retryDiagnosticItem('webcam', checkCamera));
			}
			
			if (failedDiagnostics.includes('microphone') && recordAudio) {
				retryPromises.push(retryDiagnosticItem('microphone', checkMicrophone));
			}
			
			if (failedDiagnostics.includes('location') && trackLocation) {
				retryPromises.push(retryDiagnosticItem('location', getLocation));
			}
			
			if (failedDiagnostics.includes('desktop') && multipleScreensCheck) {
				retryPromises.push(retryDiagnosticItem('desktop', detectMultipleScreens));
			}
			
			await Promise.all(retryPromises);
			
			registerEvent({ 
				eventType: 'info', 
				notify: false, 
				eventName: 'diagnostics_retry_attempted' 
			});
			
		} catch (error) {
			sentryExceptioMessage(error,{type:'error',message:'Error retrying diagnostics'});
			logger.error('Error retrying diagnostics:', error);
		} finally {
			refreshBtn.innerHTML = `
				${i18next.t('refresh')}
			`;
			
			refreshBtn.disabled = false;
			updateContinueButtonState();
			updateRefreshButtonVisibility();
		}
	}
};

const retryDiagnosticItem = async (id) => {
	const statusIcon = window.mereos.shadowRoot.getElementById(`${id}StatusIcon`);
	const statusLoading = window.mereos.shadowRoot.getElementById(`${id}StatusLoading`);
	
	if (!statusIcon || !statusLoading) {
		return false;
	}
	
	const statusIconMap = {
		webcam: 'video-camera-light-gray.svg',
		microphone: 'microphone-light-gray.svg',
		location: 'location-pin-black.svg',
		desktop: 'single-screen-gray.svg'
	};
	statusIcon.src = `${ASSET_URL}/${statusIconMap[id] || 'video-camera-light-gray.svg'}`;
	statusLoading.src = `${ASSET_URL}/loading-gray.svg`;
	
	try {
		let result;
		if (id === 'webcam') {
			result = await checkCamera();
		} else if (id === 'microphone') {
			result = await checkMicrophone();
		} else if (id === 'location') {
			result = await getLocation();
		} else if (id === 'desktop') {
			const isDetected = await detectMultipleScreens();
			result = !isDetected; 
		}
		
		setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, result);
		
		if (result) {
			registerEvent({ 
				eventType: 'success', 
				notify: false, 
				eventName: `${id}_retry_success` 
			});
		} else {
			registerEvent({ 
				eventType: 'error', 
				notify: false, 
				eventName: `${id}_retry_failed` 
			});
		}
		
		return result;
	} catch (error) {
		logger.error(`Error retrying ${id}:`, error);
		sentryExceptioMessage(error,{type:'error',message:`Error retrying ${id}:`});

		setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, false);
		return false;
	}
};

const getFailedDiagnostics = () => {
	const failedItems = [];
	const diagnosticItems = ['webcam', 'microphone', 'location', 'desktop'];
	
	diagnosticItems.forEach(itemId => {
		const statusIcon = window.mereos.shadowRoot.getElementById(`${itemId}StatusIcon`);
		if (!statusIcon) return;
		
		const currentIconPathname = new URL(statusIcon.src).pathname;
		const failureIconPathname = new URL(failureIconMap[itemId] || '').pathname;
		
		if (currentIconPathname === failureIconPathname) {
			failedItems.push(itemId);
		}
	});
	
	return failedItems;
};

const setElementStatus = (id, status, isSuccess) => {
	const statusIcon = window.mereos.shadowRoot.getElementById(`${id}StatusIcon`);
	const statusLoading = window.mereos.shadowRoot.getElementById(`${id}StatusLoading`);
	if (!statusIcon || !statusLoading) {
		return;
	}
	statusIcon.src = isSuccess ? status.success : status.failure;
	statusLoading.src = isSuccess ? `${ASSET_URL}/checkmark-rounded-green.png` : `${ASSET_URL}/x-circle.png`;
};

const updateContinueButtonState = () => {
	const renderedItems = window.mereos.shadowRoot.querySelectorAll('.diagnostic-item');

	const allDiagnosticsPassed = Array.from(renderedItems).every(item => {
		const itemId = item.id.replace('DiagnosticItem', '');
		const statusIcon = window.mereos.shadowRoot.getElementById(`${itemId}StatusIcon`);
		if (!statusIcon) return false;

		const currentIconPathname = new URL(statusIcon.src).pathname;
		const expectedIconPathname = new URL(successIconMap[itemId] || '').pathname;

		return currentIconPathname === expectedIconPathname;
	});

	const continueBtn = window.mereos.shadowRoot.getElementById('diagnosticContinueBtn');
	if (continueBtn) {
		continueBtn.disabled = !allDiagnosticsPassed;
	}
};

const updateRefreshButtonVisibility = () => {
	const refreshBtn = window.mereos.shadowRoot.getElementById('diagnosticRefreshBtn');
	const continueBtn = window.mereos.shadowRoot.getElementById('diagnosticContinueBtn');
	
	if (!refreshBtn || !continueBtn) return;
	
	const failedDiagnostics = getFailedDiagnostics();
	
	// Show refresh button if there are any failed diagnostics
	if (failedDiagnostics.length > 0) {
		refreshBtn.style.display = 'block';
		continueBtn.style.display = 'none';
	} else {
		refreshBtn.style.display = 'none';
		continueBtn.style.display = 'block';
	}
};

const startLocationMonitoring = () => {
	if (locationMonitorInterval) return;

	locationMonitorInterval = setInterval(async () => {
		try {
			const location = await getLocation();

			setElementStatus('location', { 
				success: locationGreen, 
				failure: locationRed 
			}, !!location);

			if (!location) {
				if (!locationErrorRegistered) {
					registerEvent({ 
						eventType: 'error', 
						notify: false, 
						eventName: 'location_not_working' 
					});
					locationErrorRegistered = true;
				}
			} else {
				locationErrorRegistered = false;
				updatePersistData('session', { location });
			}

			updateContinueButtonState();
			updateRefreshButtonVisibility();
		} catch (error) {
			sentryExceptioMessage(error,{type:'error',message:`Error during location monitoring`});
			logger.error('Error during location monitoring:', error);
		}
	}, 2000);
};

const stopLocationMonitoring = () => {
	if (locationMonitorInterval) {
		clearInterval(locationMonitorInterval);
		locationMonitorInterval = null;
		locationErrorRegistered = false;
	}
};

const startScreenMonitoring = () => {
	screenMonitorInterval = setInterval(async () => {
		try {
			const isDetected = await detectMultipleScreens();
			const desktopElement = window.mereos.shadowRoot.getElementById('desktopDiagnosticItem');
		
			if (desktopElement) {
				setElementStatus('desktop', { success: multipleScreenGreen, failure: multipleScreenRed }, !isDetected);
				
				if (isDetected) {
					registerEvent({
						eventType: 'error', 
						notify: false, 
						eventName: 'multiple_screens_detected'
					});
				}
				
				updateContinueButtonState();
				updateRefreshButtonVisibility();
			}
		} catch (error) {
			sentryExceptioMessage(error,{type:'error',message:`Error during screen monitoring`});
			logger.error('Error during screen monitoring:', error);
		}
	}, 2000);
};

export const SystemDiagnostics = async (tab1Content) => {
	if (!tab1Content) {
		logger.error('Element with id "runSystemDiagnostics" not found.');
		return;
	}
	renderUI(tab1Content);

	try {
		const candidateAssessment = getSecureFeatures();
		const secureFeatures = candidateAssessment?.entities || [];
		const recordVideo = secureFeatures.some(entity => entity.key === 'record_video' || entity.key === 'record_room');
		const recordAudio = secureFeatures.some(entity => entity.key === 'record_audio');
		const trackLocation = secureFeatures.some(entity => entity.key === 'track_location');
		const multipleScreensCheck = secureFeatures.some(entity => entity.key === 'verify_desktop');

		const promises = [];

		if (recordVideo) {
			promises.push(checkCamera().then(stream => {
				cameraStream = stream; 
				setElementStatus('webcam', { success: videoGreen, failure: videoRed }, stream);
				if (!stream) {
					registerEvent({eventType: 'error', notify: false, eventName: 'webcam_not_working'});
				}
				return stream;
			}));
		} else {
			setElementStatus('webcam', { success: videoGreen, failure: videoRed }, true);
		}

		if (recordAudio) {
			promises.push(checkMicrophone().then(stream => {
				audioStream = stream; 
				setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, stream);
				if (!stream) {
					registerEvent({eventType: 'error', notify: false, eventName: 'microphone_not_working'});
				}
				return stream;
			}));
		} else {
			setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, true);
		}

		if (trackLocation) {
			promises.push(getLocation().then(location => {
				updatePersistData('session', { location });
				setElementStatus('location', { success: locationGreen, failure: locationRed }, location);
				if (!location) {
					registerEvent({eventType: 'error', notify: false, eventName: 'location_not_working'});
					locationErrorRegistered = true;
				}
				startLocationMonitoring();
				return location;
			}));
		} else {
			setElementStatus('location', { success: locationGreen, failure: locationRed }, true);
		}

		if (multipleScreensCheck) {
			promises.push(detectMultipleScreens().then(isDetected => {
				setElementStatus('desktop', { success: multipleScreenGreen, failure: multipleScreenRed }, !isDetected ? true : false);
				if (isDetected) {
					registerEvent({eventType: 'error', notify: false, eventName: 'multiple_screens_detected'});
				}
				startScreenMonitoring();
				return isDetected;
			}));
		} else {
			setElementStatus('desktop', { success: multipleScreenGreen, failure: multipleScreenRed }, true);
		}

		await Promise.all(promises);
        
		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());

		updateContinueButtonState();
		updateRefreshButtonVisibility();
    
	} catch (error) {
		sentryExceptioMessage(error,{type:'error',message:`Error running diagnostics`});
		logger.error('Error running diagnostics:', error);
	} finally {
		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());
	}
};

const updateDiagnosticText = () => {
	if (!window.mereos || !window.mereos.shadowRoot) return;
	const diagnosticItems = ['webcam', 'microphone', 'location', 'desktop'];
	let microphoneImg = window.mereos.shadowRoot.getElementById('microphone-img');

	diagnosticItems.forEach(item => {
		const labelElement = window.mereos.shadowRoot.querySelector(`#${item}DiagnosticItem label`);
		if (labelElement) {
			labelElement.textContent = i18next.t(item);
		}
	});

	if(microphoneImg){
		microphoneImg.src = `${ASSET_URL}/microphone-${i18next.language || 'en'}.svg`;
	}

	const heading = window.mereos.shadowRoot.querySelector('.heading');
	if (heading) {
		heading.textContent = i18next.t('system_diagnostics');
	}

	const description = window.mereos.shadowRoot.querySelector('.description');
	if (description) {
		description.textContent = i18next.t('system_diagnostics_msg');
	}
    
	const continueBtn = window.mereos.shadowRoot.getElementById('diagnosticContinueBtn');
	if (continueBtn) {
		continueBtn.textContent = i18next.t('continue');
	}
	
	const refreshBtn = window.mereos.shadowRoot.getElementById('diagnosticRefreshBtn');
	if (refreshBtn) {
		refreshBtn.innerHTML = `
			${i18next.t('refresh')}
		`;
	}
};

i18next.on('languageChanged', () => {
	updateDiagnosticText();
});