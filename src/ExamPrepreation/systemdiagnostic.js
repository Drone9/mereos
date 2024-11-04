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
import loadingGray from '../assets/images/loading-gray.svg';
import checkMarkIcon from '../assets/images/checkmark-rounded-green.png';
import XCircle from '../assets/images/x-circle.png';
import videoCameraGray from '../assets/images/video-camera-light-gray.svg';
import videoGreen from '../assets/images/video-camera-green.svg';
import videoRed from '../assets/images/video-camera-red.svg';
import microPhoneRed from '../assets/images/microphone-red.svg';
import microPhoneGreen from '../assets/images/microphone-green.svg';
import networkGreen from '../assets/images/spinner-gap-green.svg';
import networkRed from '../assets/images/spinner-maroon.svg';
import locationGreen from '../assets/images/location-pin-green.svg';
import locationRed from '../assets/images/location-pin-red.svg';
import notificationGreen from '../assets/images/bell-ringing-green.svg';
import notificationRed from '../assets/images/bell-ringing-maroon.svg';
import multipleScreenRed from '../assets/images/multiple-screen-red.svg';
import multipleScreenGreen from '../assets/images/multiple-screen-green.svg';
import prompMessage from '../assets/images/user-permission-english.svg';
import i18next from 'i18next';
import { showTab } from './examPrechecks';

let cameraStream = null;
let audioStream = null;

const createDiagnosticItem = (id, label) => {
	const diagnosticItem = document.createElement('div');
	diagnosticItem.classList.add('diagnostic-item', 'grey-box');
	diagnosticItem.id = `${id}DiagnosticItem`;

	const greyBoxRight = document.createElement('div');
	greyBoxRight.classList.add('grey-box-right');

	const statusIcon = document.createElement('img');
	statusIcon.id = `${id}StatusIcon`;
	statusIcon.src = videoCameraGray; // Default gray icon
	statusIcon.alt = '';

	const labelElement = document.createElement('label');
	labelElement.textContent = label;

	const greyBoxLeft = document.createElement('div');
	greyBoxLeft.classList.add('grey-box-left');

	const loadingIcon = document.createElement('img');
	loadingIcon.id = `${id}StatusLoading`;
	loadingIcon.src = loadingGray;
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
	promptImage.src = prompMessage;
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
	console.log('runDiagnostics');

	if (!tab1Content) {
		console.error('Element with id "runSystemDiagnostics" not found.');
		return;
	}
	renderUI(tab1Content);

	const setElementStatus = (id, status, isSuccess) => {
		document.getElementById(`${id}StatusIcon`).src = isSuccess ? status.success : status.failure;
		document.getElementById(`${id}StatusLoading`).src = isSuccess ? checkMarkIcon : XCircle;
	};

	const handleDiagnosticItemClick = (id, checkFunction) => {
		document.getElementById(`${id}DiagnosticItem`).addEventListener('click', async () => {
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
		console.log('secureFeatures', secureFeatures);

		let recordVideo = secureFeatures.find(entity => entity.key === 'record_video');
		let recordAudio = secureFeatures.find(entity => entity.key === 'record_audio');
		let checkNetwork = secureFeatures.find(entity => entity.key === 'internet_speed');
		let trackLocation = secureFeatures.find(entity => entity.key === 'track_location');
		let enableNotifications = secureFeatures.find(entity => entity.key === 'enable_notifications');
		let multipleScreensCheck = secureFeatures.find(entity => entity.key === 'verify_desktop');

		console.log('multipleScreensCheck',multipleScreensCheck);
		
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
			const currentIconSrc = document.getElementById(`${item}StatusIcon`).src;
	
			const currentIconPathname = new URL(currentIconSrc).pathname;
	
			return currentIconPathname === successIconMap[item];
		});
	
		document.getElementById('diagnosticContinueBtn').disabled = !allDiagnosticsPassed;
	} catch (error) {
		console.error('Error running diagnostics:', error);
	} finally {
		if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
		if (audioStream) audioStream.getTracks().forEach(track => track.stop());
	}
};

// Update the text based on language change
const updateDiagnosticText = () => {
	const diagnosticItems = ['webcam', 'microphone', 'connection','notification', 'location', 'screen'];
	diagnosticItems.forEach(item => {
		const labelElement = document.querySelector(`#${item}DiagnosticItem label`);
		if (labelElement) {
			labelElement.textContent = i18next.t(item);
		}
	});
};

// Language change event listener
i18next.on('languageChanged', () => {
	updateDiagnosticText();
});
