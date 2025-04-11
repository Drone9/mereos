import i18next from 'i18next';

import { 
	checkCamera, 
	checkMicrophone, 
	detectMultipleScreens, 
	getLocation, 
	getSecureFeatures, 
	logger, 
	registerEvent, 
	updatePersistData 
} from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { showTab } from '../ExamsPrechecks';

import '../assets/css/systemDiagnostic.css';

let cameraStream = null;
let audioStream = null;

const videoGreen = `${ASSET_URL}/video-camera-green.svg`;
const microPhoneGreen = `${ASSET_URL}/microphone-green.svg`;
const locationGreen = `${ASSET_URL}/location-pin-green.svg`;
const multipleScreenGreen = `${ASSET_URL}/multiple-screen-green.svg`;
const videoRed = `${ASSET_URL}/video-camera-red.svg`;
const microPhoneRed = `${ASSET_URL}/microphone-red.svg`;
const locationRed = `${ASSET_URL}/location-pin-red.svg`;
const multipleScreenRed = `${ASSET_URL}/multiple-screen-red.svg`;

const createDiagnosticItem = (id, label) => {
	const diagnosticItem = document.createElement('div');
	diagnosticItem.classList.add('diagnostic-item', 'grey-box');
	diagnosticItem.id = `${id}DiagnosticItem`;

	const greyBoxRight = document.createElement('div');
	greyBoxRight.classList.add('grey-box-right');

	const statusIcon = document.createElement('img');
	statusIcon.id = `${id}StatusIcon`;

	const statusIconMap = {
		webcam: 'video-camera-light-gray.svg',
		microphone: 'microphone-light-gray.svg',
		location: 'location-pin-black.svg',
		desktop: 'multiple-screen-gray.svg'
	};
	
	statusIcon.src = `${ASSET_URL}/${statusIconMap[id] || 'video-camera-light-gray.svg'}`;
	statusIcon.alt = '';

	const labelElement = document.createElement('label');
	labelElement.textContent = label;

	const greyBoxLeft = document.createElement('div');
	greyBoxLeft.classList.add('grey-box-left');

	const loadingIcon = document.createElement('img');
	loadingIcon.id = `${id}StatusLoading`;
	loadingIcon.src = `${ASSET_URL}/loading-gray.svg`; 
	loadingIcon.alt = '';

	greyBoxRight.appendChild(statusIcon);
	greyBoxRight.appendChild(labelElement);
	greyBoxLeft.appendChild(loadingIcon);
	diagnosticItem.appendChild(greyBoxRight);
	diagnosticItem.appendChild(greyBoxLeft);

	return diagnosticItem;
};

const renderUI = (tab1Content) => {
	tab1Content.innerHTML = '';

	const container = document.createElement('div');
	container.classList.add('system-diagnostic-test-screen');

	const heading = document.createElement('h1');
	heading.classList.add('heading');
	heading.textContent = i18next.t('system_diagnostic');

	const diagnosticStatus = document.createElement('div');
	diagnosticStatus.classList.add('diagnostic-status', 'container-box');

	const innerContainer = document.createElement('div');
	innerContainer.classList.add('container');

	const containerTop = document.createElement('div');
	containerTop.classList.add('container-top');

	const description = document.createElement('label');
	description.classList.add('description');
	description.textContent = i18next.t('system_diagnostic_msg');

	const containerPrompt = document.createElement('div');
	containerPrompt.classList.add('container-prompt');

	const promptImage = document.createElement('img');
	promptImage.src = `${ASSET_URL}/microphone-${i18next.language || 'en'}.svg`;
	promptImage.alt = '';
	promptImage.id = 'microphone-img';
	promptImage.width = 350;
	promptImage.classList.add('prompt-image');

	const containerMiddle = document.createElement('div');
	containerMiddle.classList.add('container-middle', 'box-section');
	const candidateAssessment =  getSecureFeatures();
	const secureFeatures = candidateAssessment?.entities || [];
	const recordVideo = secureFeatures.some(entity => entity.key === 'record_video' || entity.key === 'record_room');
	const recordAudio = secureFeatures.some(entity => entity.key === 'record_audio');
	const trackLocation = secureFeatures.some(entity => entity.key === 'track_location');
	const multipleScreensCheck = secureFeatures.some(entity => entity.key === 'verify_desktop');

	let diagnosticItems = [];

	if (recordVideo) diagnosticItems.push('webcam');
	if (recordAudio) diagnosticItems.push('microphone');
	if (trackLocation) diagnosticItems.push('location');
	if (multipleScreensCheck) diagnosticItems.push('desktop');

	diagnosticItems.forEach(item => {
		const label = i18next.t(item);
		const diagnosticItem = createDiagnosticItem(item, label);
		containerMiddle.appendChild(diagnosticItem);
	});

	const buttonSection = document.createElement('div');
	buttonSection.classList.add('button-section');

	const continueBtn = document.createElement('button');
	continueBtn.classList.add('orange-filled-btn');
	continueBtn.id = 'diagnosticContinueBtn';
	continueBtn.disabled = true;
	continueBtn.textContent = i18next.t('continue');
	continueBtn.addEventListener('click', () => {
		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());
		
		registerEvent({ eventType: 'success', notify: false, eventName: 'system_diagnostic_passed' });
		updatePersistData('preChecksSteps',{ diagnosticStep:true });
		showTab('SystemRequirements');
	});

	buttonSection.appendChild(continueBtn);
	innerContainer.append(containerTop, description, containerPrompt, promptImage, containerMiddle, buttonSection);
	diagnosticStatus.appendChild(innerContainer);
	container.append(heading, diagnosticStatus);
	tab1Content.appendChild(container);
};

export const SystemDiagnostics = async (tab1Content) => {
	if (!tab1Content) {
		logger.error('Element with id "runSystemDiagnostics" not found.');
		return;
	}
	logger.success('langaueg isse',i18next.language);
	renderUI(tab1Content);

	const setElementStatus = (id, status, isSuccess) => {
		const statusIcon = document.getElementById(`${id}StatusIcon`);
		const statusLoading = document.getElementById(`${id}StatusLoading`);
		if (!statusIcon || !statusLoading) {
			return;
		}
		statusIcon.src = isSuccess ? status.success : status.failure;
		statusLoading.src = isSuccess ? `${ASSET_URL}/checkmark-rounded-green.png` : `${ASSET_URL}/x-circle.png`;
	};

	const handleDiagnosticItemClick = (id, checkFunction) => {
		const element = document.getElementById(`${id}DiagnosticItem`);
		if (!element) {
			return;
		}
		if(id !=='desktop'){
			element.addEventListener('click', async () => {
				const result = await checkFunction();
				setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, result);
				updateContinueButtonState();
			});
		}
	};

	const updateContinueButtonState = () => {
		const renderedItems = document.querySelectorAll('.diagnostic-item');

		const allDiagnosticsPassed = Array.from(renderedItems).every(item => {
			const itemId = item.id.replace('DiagnosticItem', '');
			const statusIcon = document.getElementById(`${itemId}StatusIcon`);
			if (!statusIcon) return false;

			const currentIconPathname = new URL(statusIcon.src).pathname;
			const expectedIconPathname = new URL(successIconMap[itemId] || '').pathname;

			return currentIconPathname === expectedIconPathname;
		});

		document.getElementById('diagnosticContinueBtn').disabled = !allDiagnosticsPassed;
	};

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

	try {
		const candidateAssessment =  getSecureFeatures();
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
				handleDiagnosticItemClick('webcam', checkCamera);
				return stream;
			}));
		} else {
			setElementStatus('webcam', { success: videoGreen, failure: videoRed }, true);
		}

		if (recordAudio) {
			promises.push(checkMicrophone().then(stream => {
				audioStream = stream; 
				setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, stream);
				handleDiagnosticItemClick('microphone', checkMicrophone);
				return stream;
			}));
		} else {
			setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, true);
		}

		if (trackLocation) {
			promises.push(getLocation().then(location => {
				updatePersistData('session', { location });
				setElementStatus('location', { success: locationGreen, failure: locationRed }, location);
				handleDiagnosticItemClick('location', getLocation);
				return location;
			}));
		} else {
			setElementStatus('location', { success: locationGreen, failure: locationRed }, true);
		}

		if (multipleScreensCheck) {
			promises.push(detectMultipleScreens().then(isDetected => {
				setElementStatus('desktop', { success: multipleScreenGreen, failure: multipleScreenRed }, !isDetected ? true : false);
				handleDiagnosticItemClick('desktop', detectMultipleScreens);
				return isDetected;
			}));
		} else {
			setElementStatus('desktop', { success: multipleScreenGreen, failure: multipleScreenRed }, true);
		}

		await Promise.all(promises);
		
		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());

		updateContinueButtonState();
	
	} catch (error) {
		logger.error('Error running diagnostics:', error);
	} finally {
		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());
	}
};

const updateDiagnosticText = () => {
	const diagnosticItems = ['webcam', 'microphone', 'location', 'desktop'];
	let microphoneImg = document.getElementById('microphone-img');

	diagnosticItems.forEach(item => {
		const labelElement = document.querySelector(`#${item}DiagnosticItem label`);
		if (labelElement) {
			labelElement.textContent = i18next.t(item);
		}
	});

	if(microphoneImg){
		microphoneImg.src = `${ASSET_URL}/microphone-${i18next.language || 'en'}.svg`;
	}

	const heading = document.querySelector('.heading');
	if (heading) {
		heading.textContent = i18next.t('system_diagnostic');
	}

	const description = document.querySelector('.description');
	if (description) {
		description.textContent = i18next.t('system_diagnostic_msg');
	}
	
	const btnText = document.querySelector('.orange-filled-btn');
	if (btnText) {
		btnText.textContent = i18next.t('continue');
	}
};

i18next.on('languageChanged', () => {
	updateDiagnosticText();
});
