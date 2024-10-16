import i18next from 'i18next';
import { getMultipleCameraDevices, checkForMultipleMicrophones, registerEvent, updatePersistData } from '../utils/functions';
import '../assets/css/prevalidation.css';
import washroomCircle from '../assets/images/washroom-circled-light-blue.svg';
import waterCircle from '../assets/images/water-circled-light-blue.svg';
import couchedCircle from '../assets/images/couch-circled-navy-blue.svg';
import getReadyCircle from '../assets/images/get-ready.svg';
import { showTab } from './examPrechecks';

export const PrevalidationInstructions = async (tabContent) => {
	try {
		let cameras = [];
		let microphones = [];
		let videoConstraints = {
			width: 640,
			height: 480,
			facingMode: 'user'
		};
		let audioConstraints = {
			noiseSuppression: true
		};
		const iconData = [
			{
				src: washroomCircle,
				text: 'use_washroom', // Store the translation key instead of the translated text
			},
			{
				src: waterCircle,
				text: 'get_water',
			},
			{
				src: couchedCircle,
				text: 'get_comfy',
			},
			{
				src: getReadyCircle,
				text: 'get_ready',
			},
		];
		console.log('cameras',cameras,'microphones',microphones);

		let currentCaptureMode = null;
		console.log('currentCaptureMode',currentCaptureMode);

		let mediaStream = null;

		const handleDeviceId = async (id, type) => {
			if (type === 'camera') {
				videoConstraints = {
					...videoConstraints,
					deviceId: { ideal: id }
				};
	
				localStorage.setItem('deviceId',id);
			}
	
			if (type === 'microphone') {
				audioConstraints = {
					...audioConstraints,
					deviceId: { ideal: id }
				};
				localStorage.setItem('microphoneID',id);
			}
	
			startWebcam();
		};
	
		const nextStep = () => {
			registerEvent({eventType: 'success', notify: false, eventName: 'prevalidation_passed'});
			updatePersistData('preChecksSteps', { preValidation: true });
			showTab('IdentityVerificationScreenOne');
		};

		
		const createUIElements = () => {
			const container = document.createElement('div');
			container.className = 'ivsf-container';
	
			const headingContainer = document.createElement('div');
			const subHeadingContainer = document.createElement('div');
			
			headingContainer.className = 'pvi-header-title';
			subHeadingContainer.className = 'pvi-msg';
	
			container.append(headingContainer);
			container.append(subHeadingContainer);
	
			const instructionsContainer = document.createElement('div');
			instructionsContainer.className = 'pvi-instructions-container';
	
			const iconTextElements = [];
	
			iconData.forEach(icon => {
				const imgElement = document.createElement('img');
				imgElement.src = icon.src;
				imgElement.className = 'pvi-instruction-img'; 
				instructionsContainer.appendChild(imgElement);
	
				const textElement = document.createElement('div');
				textElement.className = 'pvi-instruction-txt';
				iconTextElements.push(textElement); 
				instructionsContainer.appendChild(textElement);
			});
	
			container.appendChild(instructionsContainer);
	
			const videoMainContainer = document.createElement('div');
			videoMainContainer.id = 'videoMainContainer';
			videoMainContainer.className = 'pvi-header-img';
	
			const videoContainer = document.createElement('div');
			videoContainer.id = 'videoContainer';
			videoMainContainer.appendChild(videoContainer);
	
			container.appendChild(videoMainContainer);
	
			const dropdownContainer = document.createElement('div');
			dropdownContainer.id = 'dropdownContainer';
			dropdownContainer.className = 'multi-device-block';
	
			const cameraContainer = document.createElement('div');
			cameraContainer.className = 'camera-container';
	
			const cameraDropdown = document.createElement('select');
			cameraDropdown.id = 'cameraDropdown';
			cameraContainer.appendChild(cameraDropdown);
			dropdownContainer.appendChild(cameraContainer);
	
			const microPhoneContainer = document.createElement('div');
			microPhoneContainer.className = 'microphone-container';
	
			const microphoneDropdown = document.createElement('select');
			microphoneDropdown.id = 'microphoneDropdown';
			microPhoneContainer.appendChild(microphoneDropdown);
			dropdownContainer.appendChild(microPhoneContainer);
	
			const messageElement = document.createElement('div');
			messageElement.id = 'message';
			messageElement.className = 'pvi-query-msg';
	
			const buttonContainer = document.createElement('div');
			buttonContainer.id = 'button-container';
			buttonContainer.className = 'pvi-btn-container';
	
			const continueBtn = document.createElement('button');
			continueBtn.id = 'continue-btn';
			continueBtn.textContent = i18next.t('continue'); 
			continueBtn.className = 'orange-filled-btn';
			continueBtn.style.marginLeft = 'auto';
			continueBtn.style.padding = '9px 32px';
			continueBtn.addEventListener('click', nextStep);
	
			buttonContainer.append(continueBtn);
	
			container.appendChild(dropdownContainer);
			container.appendChild(messageElement);
			container.appendChild(buttonContainer);
	
			tabContent.appendChild(container);
	
			setTextContent(headingContainer, subHeadingContainer, messageElement, iconTextElements, iconData);
		};

		const setTextContent = (headingContainer, subHeadingContainer, messageElement, iconTextElements, iconData) => {
			headingContainer.textContent = i18next.t('system_diagnostic');
			subHeadingContainer.textContent = i18next.t('system_diagnostic');
			messageElement.textContent = i18next.t('select_preferred_camera_and_microphone'); 
	
			if (Array.isArray(iconTextElements)) {
				iconData.forEach((icon, index) => {
					if (iconTextElements[index]) { 
						iconTextElements[index].textContent = i18next.t(icon.text); 
					}
				});
			}
		};
	
		const init = async () => {
			cameras = await getMultipleCameraDevices();
			cameras = cameras?.map(camera => ({id: camera.deviceId, name: camera.label, ...camera }));
			console.log('cameras',cameras);

			microphones = await checkForMultipleMicrophones();
			microphones = microphones?.map(microphone => ({id: microphone.deviceId, name: microphone.label, ...microphone }));
			console.log('microphones', microphones);

			startWebcam();
			updateUI();
		};

		const updateUI = () => {
			const cameraDropdown = document.getElementById('cameraDropdown');
			const microphoneDropdown = document.getElementById('microphoneDropdown');
			const messageElement = document.getElementById('message');

			cameraDropdown.innerHTML = '';
			cameras.forEach(camera => {
				const option = document.createElement('option');
				option.value = camera.id;
				option.textContent = camera.name;
				cameraDropdown.appendChild(option);
			});

			microphoneDropdown.innerHTML = '';
			microphones.forEach(microphone => {
				const option = document.createElement('option');
				option.value = microphone.id;
				option.textContent = microphone.name;
				microphoneDropdown.appendChild(option);
			});

			messageElement.textContent = i18next.t('select_preferred_camera_and_microphone');

			cameraDropdown.onchange = (event) => {
				const selectedCameraId = event.target.value;
				handleDeviceId(selectedCameraId, 'camera');
			};

			microphoneDropdown.onchange = (event) => {
				const selectedMicrophoneId = event.target.value;
				handleDeviceId(selectedMicrophoneId, 'microphone');
			};
		};


		const startWebcam = async () => {
			const videoContainer = document.getElementById('videoContainer');
			videoContainer.innerHTML = ''; 
	
			try {
				mediaStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: audioConstraints });
	
				const videoElement = document.createElement('video');
				videoElement.id = 'myVideo';
				videoElement.className = 'my-recorded-video';
				videoElement.controls = false; 
				videoElement.autoplay = true; 
				videoElement.srcObject = mediaStream; 
	
				videoContainer.appendChild(videoElement);
				currentCaptureMode = 'done';
				updateUI(); 
			} catch (error) {
				console.log('Webcam error:', error);
				updateUI(); 
			}
		};

		createUIElements();

		init();

		i18next.on('languageChanged', () => {
			const headingContainer = document.querySelector('.pvi-header-title');
			const subHeadingContainer = document.querySelector('.pvi-msg');
			const messageElement = document.getElementById('message');
			const iconTextElements = document.querySelectorAll('.pvi-instruction-txt');
	
			setTextContent(headingContainer, subHeadingContainer, messageElement, Array.from(iconTextElements),iconData);
		});
	
	} catch (error) {
		console.error('Failed to initialize; error: ' + error);
	}
};
