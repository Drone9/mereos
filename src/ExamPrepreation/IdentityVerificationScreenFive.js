import { detectMultipleScreens, getDateTime, getSecureFeatures, registerEvent, shareScreenFromContent, updatePersistData } from '../utils/functions';
import '../assets/css/step5.css';
import { showTab } from './examPrechecks';
import i18next from 'i18next';
import { renderIdentityVerificationSteps } from './IdentitySteps';
import socket from '../utils/socket';
import { ASSET_URL } from '../utils/constant';

export let newStream;

export const IdentityVerificationScreenFive = async (tabContent) => {
	let multipleScreens;
	if (!tabContent) {
		console.error('tabContent is not defined or is not a valid DOM element');
		return;
	}

	let stream = null;
	let mode = 'startScreenRecording';
	let msg = {
		type: 'successful',
		text: i18next.t('please_share_entire_screen')
	};

	const checkMultipleScreens = async () => {
		const resp = detectMultipleScreens();
		if (resp) {
			multipleScreens = true;
		} else {
			multipleScreens = false;
			registerEvent({ eventType: 'error', notify: false, eventName: 'multiple_screens_detected' });
		}
	};

	const initSocketConnection = () => {
		if (!socket) {
			console.error('Socket not initialized');
			return;
		}

		socket.onmessage = (event) => {
			const eventData = JSON.parse(event?.data);

			switch (eventData?.message?.event || eventData?.event) {
				case 'violation':
					if(eventData?.message?.message === 'Violation'){
						updatePersistData('preChecksSteps', { mobileConnection: false,screenSharing:false });
						if(newStream){
							newStream?.getVideoTracks()[0].stop();
						}
						showTab('MobileProctoring');
					}
					registerEvent({ eventType: 'error', notify: false, eventName:eventData?.message?.message , eventValue: getDateTime() });
					break;

				default:
					break;
			}
		};
		
		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		socket.onclose = () => {
			console.log('WebSocket connection closed');
		};
	};

	const shareScreen = async () => {
		try {
			newStream = await shareScreenFromContent();
			updatePersistData('session', { screenRecordingStream: location });

			if (newStream.getVideoTracks()[0].getSettings().displaySurface === 'monitor') {
				stream = newStream;
				mode = 'startScreenRecording';
				msg = {
					type: 'successful',
					text: i18next.t('screen_shared_successfully')
				};
			} else {
				newStream.getVideoTracks()[0].stop();
				throw i18next.t('please_share_entire_screen');
			}
		} catch (err) {
			console.error('Error during screen sharing:', err);
			mode = 'rerecordScreen';
			msg = {
				type: 'unsuccessful',
				text: err
			};
		}
		updateUI(); 
	};

	const nextStep = () => {
		updatePersistData('preChecksSteps', { screenSharing: true });
		registerEvent({ eventType: 'success', notify: false, eventName: 'screen_recording_window_shared', eventValue: getDateTime() });
		showTab('IdentityVerificationScreenSix');
	};

	const prevStep = () => {
		if (stream) {
			stream.getVideoTracks()[0].stop();
		}
		updatePersistData('preChecksSteps',{ screenSharing:false });
		showTab('IdentityVerificationScreenFour');
	};

	const container = document.createElement('div');
	container.classList.add('screen-share-container');

	const stepsContainer = document.createElement('div');
	renderIdentityVerificationSteps(stepsContainer, 6);

	const wrapper = document.createElement('div');
	wrapper.classList.add('screen-wrapper');

	const headerTitle = document.createElement('div');
	headerTitle.classList.add('ivsf-header-titles');
	headerTitle.textContent = i18next.t('verification_completed');

	const msgElement = document.createElement('div');
	msgElement.classList.add('screen-desc');
	msgElement.textContent = i18next.t('verification_completed_msg');

	wrapper.appendChild(headerTitle);
	wrapper.appendChild(msgElement);
	wrapper.appendChild(stepsContainer);

	const reshareButton = document.createElement('button');
	const headerImg = document.createElement('img');
	headerImg.classList.add('screen-share-dummy');
	headerImg.src = `${ASSET_URL}/screen-recorder-mock.svg`;
	headerImg.alt = 'camera-icon';
	wrapper.appendChild(headerImg);

	let queryMsg = document.createElement('div'); // Declare queryMsg here
	queryMsg.classList.add('ivsf-query-msg');
	if (msg.text) {
		queryMsg.textContent = i18next.t(msg.text);
		if (msg.type === 'unsuccessful') {
			queryMsg.style.color = '#E95E5E';
		}
		wrapper.appendChild(queryMsg);
	}

	const btnContainer = document.createElement('div');
	btnContainer.classList.add('ivsf-btn-container');

	const prevButton = document.createElement('button');
	prevButton.className = 'orange-hollow-btn';
	prevButton.textContent = i18next.t('previous_step');
	prevButton.addEventListener('click', prevStep);
	btnContainer.appendChild(prevButton);

	let doneButton; // Declare doneButton outside the conditional block

	if (mode === 'startScreenRecording') {
		doneButton = document.createElement('button'); 
		doneButton.className = 'orange-filled-btn';
		doneButton.textContent = i18next.t('done');
		doneButton.disabled = multipleScreens;
		doneButton.addEventListener('click', nextStep);
		btnContainer.appendChild(doneButton);
	} else if (mode === 'rerecordScreen') {
		
		reshareButton.className = 'orange-filled-btn';
		reshareButton.textContent = i18next.t('reshare_screen');
		reshareButton.addEventListener('click', shareScreen);
		btnContainer.appendChild(reshareButton);
	}

	wrapper.appendChild(btnContainer);
	container.appendChild(wrapper);

	const styleElement = document.createElement('style');
	styleElement.textContent = `
        .screen-share-container {
            /* Define your CSS styles here */
        }
        .screen-wrapper {
            /* Define your CSS styles here */
        }
        /* Define other classes as needed */
    `;
	container.appendChild(styleElement);

	tabContent.innerHTML = '';
	tabContent.appendChild(container);

	shareScreen();
	initSocketConnection();
	
	const candidateAssessment = getSecureFeatures();
	const secureFeatures = candidateAssessment?.entities || [];
    
	let multipleScreensCheck = secureFeatures.find(entity => entity.name === 'Verify Desktop');

	multipleScreensCheck && checkMultipleScreens();

	const updateUI = () => {
		headerTitle.textContent = i18next.t('verification_completed');
		msgElement.textContent = i18next.t('verification_completed_msg');
		queryMsg.textContent = i18next.t(msg.text);
		prevButton.textContent = i18next.t('previous_step');
		if (mode === 'startScreenRecording') {
			doneButton.textContent = i18next.t('done');
		} else if (mode === 'rerecordScreen') {
			reshareButton.textContent = i18next.t('reshare_screen');
		}
	};

	// Update UI when language changes
	i18next.on('languageChanged', updateUI);

	return container;
};
