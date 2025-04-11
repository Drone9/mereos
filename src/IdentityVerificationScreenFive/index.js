import i18next from 'i18next';
import { 
	convertDataIntoParse,
	detectMultipleScreens, 
	getDateTime, 
	getSecureFeatures, 
	logger, 
	registerEvent, 
	shareScreenFromContent, 
	showToast, 
	updatePersistData
} from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { showTab } from '../ExamsPrechecks';
import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import '../assets/css/step5.css';
import * as TwilioVideo from 'twilio-video';
export const IdentityVerificationScreenFive = async (tabContent) => {
	let multipleScreens;
	window.newStream = null;
	const candidateAssessment = getSecureFeatures();
	const secureFeatures = candidateAssessment?.entities || [];
	
	if (!tabContent) {
		logger.error('tabContent is not defined or is not a valid DOM element');
		return;
	}

	let stream = null;
	let mode = 'startScreenRecording';
	let msg = {
		type: 'successful',
		text: i18next.t('please_share_entire_screen')
	};

	const checkMultipleScreens = async () => {
		const resp = await detectMultipleScreens();
		if (resp) {
			multipleScreens = true;
			registerEvent({ eventType: 'error', notify: false, eventName: 'multiple_screens_detected' });
		} else {
			multipleScreens = false;
		}
	};

	const initSocketConnection = () => {
		if (!window.socket) {
			updatePersistData('preChecksSteps', { 
				mobileConnection: false,
				screenSharing: false
			});
			window.globalCallback({ type:'error', message: 'mobile_phone_disconnected', code:40017 });
			showToast('error','mobile_phone_disconnected');
			logger.error('Socket not initialized');
			return;
		}

		window.socket.onmessage = (event) => {
			const eventData = JSON.parse(event?.data);

			switch (eventData?.message?.event || eventData?.event) {
				case 'violation':
					if(eventData?.message?.message === 'Violation'){
						updatePersistData('preChecksSteps', { mobileConnection: false,screenSharing:false });
						if(window.newStream){
							window.newStream?.getVideoTracks()[0].stop();
						}
						showTab('MobileProctoring');
					}
					registerEvent({ eventType: 'error', notify: false, eventName:eventData?.message?.message , eventValue: getDateTime() });
					break;

				default:
					break;
			}
		};
		
		window.socket.onerror = (error) => {
			logger.error('WebSocket error:',error);
		};

		window.socket.onclose = () => {
			logger.error('WebSocket connection closed');
		};
	};
	
	let multipleScreensCheck = secureFeatures.find(entity => entity.key === 'verify_desktop');

	multipleScreensCheck && checkMultipleScreens();

	const updateUI = () => {
		headerTitle.textContent = i18next.t('verification_completed');
		// msgElement.textContent = i18next.t('verification_completed_msg');
    
		if (mode === 'startScreenRecording') {
			msg = {
				type: 'successful',
				text: i18next.t('screen_shared_successfully')
			};
		} else if (mode === 'rerecordScreen') {
			msg = {
				type: 'unsuccessful',
				text: i18next.t('screen_sharing_stopped')
			};
		} else {
			msg = {
				type: 'successful',
				text: i18next.t('please_share_entire_screen')
			};
		}

		queryMsg.textContent = i18next.t(msg.text);
		queryMsg.style.color = msg.type === 'unsuccessful' ? '#E95E5E' : '';

		btnContainer.innerHTML = '';

		const prevButton = document.createElement('button');
		prevButton.className = 'orange-hollow-btn';
		prevButton.textContent = i18next.t('previous_step');

		const prevStepsEntities = ['verify_candidate', 'verify_id', 'record_audio', 'record_room'];
		if (secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0) {
			prevButton.addEventListener('click', prevStep);
			btnContainer.appendChild(prevButton);
		}

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

		headerImg.src = `${ASSET_URL}/share-screen-${i18next.language || 'en'}.svg`;
	};

	const shareScreen = async () => {
		try {
			window.newStream = await shareScreenFromContent();

			updatePersistData('session', { screenRecordingStream: location });

			const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

			const videoTrack = window.newStream.getVideoTracks()[0];
			const trackSettings = videoTrack.getSettings();

			const isScreenShared = isFirefox ? true
				: trackSettings.displaySurface === 'monitor';

			if (isScreenShared) {
				stream = window.newStream;
				mode = 'startScreenRecording';
				msg = {
					type: 'successful',
					text: i18next.t('screen_shared_successfully')
				};

			} else {
				mode = 'rerecordScreen';
				videoTrack.stop();
				throw new Error(i18next.t('please_share_entire_screen'));
			}
		} catch (err) {
			logger.error('Error during screen sharing:', err);
			mode = 'rerecordScreen';
			msg = {
				type: 'unsuccessful',
				text: 'screen_sharing_stopped'
			};
		}
		updateUI();
	};

	const nextStep = async () => {
		updatePersistData('preChecksSteps', { screenSharing: true });
		registerEvent({ eventType: 'success', notify: false, eventName: 'screen_recording_window_shared', eventValue: getDateTime() });
		showTab('IdentityVerificationScreenSix');

		const session = convertDataIntoParse('session');

		if(window.roomInstance){
			let screenTrack = new TwilioVideo.LocalVideoTrack(window?.newStream?.getTracks()[0]);
			let screenTrackPublished = await window.roomInstance.localParticipant.publishTrack(screenTrack);
			let screenRecordings = [...session.screen_sharing_video_name, screenTrackPublished.trackSid];
			updatePersistData('session', { screen_sharing_video_name: screenRecordings });
		}
	};

	const prevStep = () => {
		if (stream) {
			stream.getVideoTracks()[0].stop();
		}
		if (window.socket && window.socket.readyState === WebSocket.OPEN) {
			window.socket?.send(JSON.stringify({ event: 'resetSession' }));
		}
		updatePersistData('preChecksSteps',{ mobileConnection: false, screenSharing:false, roomScanningVideo:false });
		let navHistory = JSON.parse(localStorage.getItem('navHistory'));
		const currentIndex = navHistory.indexOf('IdentityVerificationScreenFive');
		const previousPage = currentIndex > 0 ? navHistory[currentIndex - 1] : null;
		showTab(previousPage);
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
	headerImg.src = `${ASSET_URL}/share-screen-${i18next?.language ||'en'}.svg`;
	headerImg.alt = 'camera-icon';
	wrapper.appendChild(headerImg);

	let queryMsg = document.createElement('div');
	queryMsg.classList.add('ivsf-query-msg');
	queryMsg.id = 'query-message-screen';
	if (msg.text) {
		queryMsg.textContent = i18next.t(msg.text);
		if (msg.type === 'unsuccessful') {
			queryMsg.style.color = '#E95E5E';
		}
		wrapper.appendChild(queryMsg);
	}

	const btnContainer = document.createElement('div');
	btnContainer.classList.add('ivsf-btn-container');
	let doneButton = document.createElement('button'); 
	container.appendChild(wrapper);

	const styleElement = document.createElement('style');
	container.appendChild(styleElement);

	tabContent.innerHTML = '';
	tabContent.appendChild(container);

	if (!window.newStream) {
		shareScreen();
	}
	if(secureFeatures.find(entity => entity.key === 'mobile_proctoring')){
		initSocketConnection();
	}	

	i18next.on('languageChanged', updateUI);

	return container;
};
