import { 
	checkCamera, 
	checkMicrophone, 
	checkNotification, 
	detectMultipleScreens, 
	getLocation, 
	getNetworkUploadSpeed, 
	getSecureFeatures, 
	registerEvent, 
	updatePersistData 
} from '../utils/functions';
import '../assets/css/systemDiagnostic.css';
import i18next from 'i18next';
import { showTab } from './examPrechecks';
import { ASSET_URL } from '../utils/constant';

let cameraStream = null;
let audioStream = null;

const videoGreen = `${ASSET_URL}/video-camera-green.svg`;
const microPhoneGreen = `${ASSET_URL}/microphone-green.svg`;
const networkGreen = `${ASSET_URL}/spinner-gap-green.svg`;
const locationGreen = `${ASSET_URL}/location-pin-green.svg`;
const notificationGreen = `${ASSET_URL}/bell-ringing-green.svg`;
const multipleScreenGreen = `${ASSET_URL}/multiple-screen-green.svg`;
const videoRed = `${ASSET_URL}/video-camera-red.svg`;
const microPhoneRed = `${ASSET_URL}/microphone-red.svg`;
const networkRed = `${ASSET_URL}/spinner-maroon.svg`;
const locationRed = `${ASSET_URL}/location-pin-red.svg`;
const notificationRed = `${ASSET_URL}/bell-ringing-maroon.svg`;
const multipleScreenRed = `${ASSET_URL}/multiple-screen-red.svg`;

const createDiagnosticItem = (id, label) => {
	const diagnosticItem = document.createElement('div');
	diagnosticItem.classList.add('diagnostic-item', 'grey-box');
	diagnosticItem.id = `${id}DiagnosticItem`;

	const greyBoxRight = document.createElement('div');
	greyBoxRight.classList.add('grey-box-right');

	const statusIcon = document.createElement('img');
	statusIcon.id = `${id}StatusIcon`;
	statusIcon.src = `${ASSET_URL}/video-camera-light-gray.svg`;
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
	promptImage.src = `${ASSET_URL}/user-permission-english.svg`;
	promptImage.alt = '';
	promptImage.width = 350;
	promptImage.classList.add('prompt-image');

	const containerMiddle = document.createElement('div');
	containerMiddle.classList.add('container-middle', 'box-section');

	const diagnosticItems =  ['webcam', 'microphone', 'connection','notification', 'location', 'screen'];
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
	continueBtn.textContent = 'Continue';
	continueBtn.addEventListener('click', () => {
		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());
		
		registerEvent({ eventType: 'success', notify: false, eventName: 'system_diagnostic_passed' });
		updatePersistData('preChecksSteps',{ diagnosticStep:true });
		showTab('Prevalidationinstruction');
	});
	buttonSection.appendChild(continueBtn);
	innerContainer.append(containerTop, description, containerPrompt, promptImage, containerMiddle, buttonSection);
	diagnosticStatus.appendChild(innerContainer);
	container.append(heading, diagnosticStatus);
	tab1Content.appendChild(container);
};

export const runSystemDiagnostics = async (tab1Content) => {
	if (!tab1Content) {
		console.error('Element with id "runSystemDiagnostics" not found.');
		return;
	}
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
		element.addEventListener('click', async () => {
			const result = await checkFunction();
			setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, result);
		});
	};

	const successIconMap = {
		webcam: videoGreen,
		microphone: microPhoneGreen,
		connection: networkGreen,
		location: locationGreen,
		notification: notificationGreen,
		screen: multipleScreenGreen
	};

	const failureIconMap = {
		webcam: videoRed,
		microphone: microPhoneRed,
		connection: networkRed,
		location: locationRed,
		notification: notificationRed,
		screen: multipleScreenRed
	};

	try {
		const candidateAssessment = await getSecureFeatures();
		const secureFeatures = candidateAssessment?.entities || [];
		const profileSettings = candidateAssessment?.settings;

		let recordVideo = secureFeatures.find(entity => entity.key === 'record_video');
		let recordAudio = secureFeatures.find(entity => entity.key === 'record_audio');
		let checkNetwork = secureFeatures.find(entity => entity.key === 'internet_speed');
		let trackLocation = secureFeatures.find(entity => entity.key === 'track_location');
		let enableNotifications = secureFeatures.find(entity => entity.key === 'enable_notifications');
		let multipleScreensCheck = secureFeatures.find(entity => entity.key === 'verify_desktop');
		
		const promises = [];

		if (recordVideo) {
			promises.push(checkCamera().then(stream => {
				cameraStream = stream; // Save the camera stream
				setElementStatus('webcam', { success: videoGreen, failure: videoRed }, stream);
				handleDiagnosticItemClick('webcam', checkCamera);
				return stream;
			}));
		} else {
			setElementStatus('webcam', { success: videoGreen, failure: videoRed }, true);
		}

		if (recordAudio) {
			promises.push(checkMicrophone().then(stream => {
				audioStream = stream; // Save the audio stream
				setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, stream);
				handleDiagnosticItemClick('microphone', checkMicrophone);
				return stream;
			}));
		} else {
			setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, true);
		}

		if (checkNetwork) {
			promises.push(getNetworkUploadSpeed().then(network => {
				const isNetworkGood = network.speedMbps > profileSettings?.upload_speed || 0.168;
				setElementStatus('connection', { success: networkGreen, failure: networkRed }, isNetworkGood);
				handleDiagnosticItemClick('connection', getNetworkUploadSpeed);
				return isNetworkGood;
			}));
		} else {
			setElementStatus('connection', { success: networkGreen, failure: networkRed }, true);
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

		if (enableNotifications) {
			promises.push(checkNotification().then(notification => {
				setElementStatus('notification', { success: notificationGreen, failure: notificationRed }, notification);
				handleDiagnosticItemClick('notification', checkNotification);
				return notification;
			}));
		} else {
			setElementStatus('notification', { success: notificationGreen, failure: notificationRed }, true);
		}

		if (multipleScreensCheck) {
			promises.push(detectMultipleScreens().then(isDetected => {
				setElementStatus('screen', { success: multipleScreenGreen, failure: multipleScreenRed }, !isDetected ? true : false);
				handleDiagnosticItemClick('screen', detectMultipleScreens);
				return isDetected;
			}));
		} else {
			setElementStatus('screen', { success: multipleScreenGreen, failure: multipleScreenRed }, true);
		}

		await Promise.all(promises);

		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());

		const allDiagnosticsPassed = Object.keys(successIconMap).every(item => {	
			const currentIconSrc = document.getElementById(`${item}StatusIcon`)?.src;
			if (!currentIconSrc) {
					return false;
			}
	
			const currentIconPathname = new URL(currentIconSrc).pathname;
			const expectedIconPathname = new URL(successIconMap[item]).pathname;
	
			return currentIconPathname === expectedIconPathname;
	});
	
		document.getElementById('diagnosticContinueBtn').disabled = !allDiagnosticsPassed;
	} catch (error) {
		console.error('Error running diagnostics:', error);
	} finally {
		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());
	}
};

const updateDiagnosticText = () => {
	const diagnosticItems = ['webcam', 'microphone', 'connection','notification', 'location', 'screen'];

	diagnosticItems.forEach(item => {
		const labelElement = document.querySelector(`#${item}DiagnosticItem label`);
		if (labelElement) {
			labelElement.textContent = i18next.t(item);
		}
	});

	const heading = document.querySelector('.heading');
	if (heading) {
		heading.textContent = i18next.t('system_diagnostic');
	}

	const description = document.querySelector('.description');
	if (description) {
		description.textContent = i18next.t('system_diagnostic_msg');
	}
};

i18next.on('languageChanged', () => {
	updateDiagnosticText();
});
