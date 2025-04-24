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
						updatePersistData('preChecksSteps', { mobileConnection: false, screenSharing: false });
						if(window.newStream){
							window.newStream?.getVideoTracks()[0].stop();
						}
						showTab('MobileProctoring');
					}
					registerEvent({ eventType: 'error', notify: false, eventName: eventData?.message?.message, eventValue: getDateTime() });
					break;

				default:
					break;
			}
		};
		
		window.socket.onerror = (error) => {
			logger.error('WebSocket error:', error);
		};

		window.socket.onclose = () => {
			logger.error('WebSocket connection closed');
		};
	};
	
	let multipleScreensCheck = secureFeatures.find(entity => entity.key === 'verify_desktop');
	multipleScreensCheck && checkMultipleScreens();

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
			logger.error('Error during screen sharing:', err.message);
			mode = 'share-screen-again';
			msg = {
				type: err?.message === i18next.t('please_share_entire_screen') ? 'share-screen-again' : 'unsuccessful',
				text: err?.message || 'screen_sharing_stopped'
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
		updatePersistData('preChecksSteps', { mobileConnection: false, screenSharing: false, roomScanningVideo: false });
		let navHistory = JSON.parse(localStorage.getItem('navHistory'));
		const currentIndex = navHistory.indexOf('IdentityVerificationScreenFive');
		const previousPage = currentIndex > 0 ? navHistory[currentIndex - 1] : null;
		showTab(previousPage);
	};

	const updateUI = () => {
		// Update message based on current mode
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
		} else if(mode === 'share-screen-again') {
			msg = {
				type: 'unsuccessful',
				text: i18next.t('please_share_entire_screen')
			};
		}

		// Check if the container already exists
		const existingContainer = tabContent.querySelector('.screen-share-container');
		if (existingContainer) {
			// Update existing elements instead of recreating everything
			const headerTitle = existingContainer.querySelector('.ivsf-header-titles');
			if (headerTitle) {
				headerTitle.textContent = i18next.t('verification_completed');
			}
			const headerDesc = existingContainer.querySelector('.screen-desc');
			if (headerDesc) {
				headerDesc.textContent = i18next.t('verification_completed_msg');
			}
			const queryMsg = existingContainer.querySelector('#query-message-screen');
			if (queryMsg) {
				queryMsg.textContent = i18next.t(msg.text);
				queryMsg.style.color = msg.type === 'unsuccessful' ? '#E95E5E' : '';
			}

			const headerImg = existingContainer.querySelector('.screen-share-dummy');
			if (headerImg) {
				headerImg.src = `${ASSET_URL}/share-screen-${i18next.language || 'en'}.svg`;
			}

			// Update buttons
			updateButtons(existingContainer);
		} else {
			// Create the entire UI structure from scratch
			createInitialUI();
		}
	};

	const updateButtons = (container) => {
		const btnContainer = container.querySelector('.ivsf-btn-container');
		if (!btnContainer) return;

		// Clear existing buttons
		btnContainer.innerHTML = '';

		// Check if we need to show previous button
		const prevStepsEntities = ['verify_candidate', 'verify_id', 'record_audio', 'record_room'];
		const showPrevButton = secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0;

		// Add buttons based on current mode
		let buttonsHTML = '';
		
		if (showPrevButton) {
			buttonsHTML += `<button class="orange-hollow-btn">${i18next.t('previous_step')}</button>`;
		}
		
		if (mode === 'startScreenRecording') {
			buttonsHTML += `<button class="orange-filled-btn" ${multipleScreens ? 'disabled' : ''}>${i18next.t('done')}</button>`;
		} else if (mode === 'rerecordScreen' || mode === 'share-screen-again') {
			buttonsHTML += `<button class="orange-filled-btn">${i18next.t('reshare_screen')}</button>`;
		}
		
		btnContainer.insertAdjacentHTML('beforeend', buttonsHTML);
		
		// Add event listeners
		if (showPrevButton) {
			btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);
		}
		
		if (mode === 'startScreenRecording') {
			btnContainer.querySelector('.orange-filled-btn').addEventListener('click', nextStep);
		} else if (mode === 'rerecordScreen' || mode === 'share-screen-again') {
			btnContainer.querySelector('.orange-filled-btn').addEventListener('click', shareScreen);
		}
	};

	const createInitialUI = () => {
		// Clear existing content
		tabContent.innerHTML = '';
		
		// Create steps container element for steps rendering
		const stepsContainer = document.createElement('div');
		renderIdentityVerificationSteps(stepsContainer, 6);
		
		// Create the basic HTML structure
		tabContent.insertAdjacentHTML('beforeend', `
			<div class="screen-share-container">
				<div class="screen-wrapper">
					<div class="ivsf-header-titles">${i18next.t('verification_completed')}</div>
					<div class="screen-desc">${i18next.t('verification_completed_msg')}</div>
					<div class="steps-container"></div>
					<img class="screen-share-dummy" src="${ASSET_URL}/share-screen-${i18next.language || 'en'}.svg" alt="camera-icon">
					<div id="query-message-screen" class="ivsf-query-msg" ${msg.type === 'unsuccessful' ? 'style="color: #E95E5E;"' : ''}>${i18next.t(msg.text)}</div>
					<div class="ivsf-btn-container"></div>
				</div>
				<style></style>
			</div>
		`);
		
		// Insert the steps container into the DOM
		const stepsPlaceholder = tabContent.querySelector('.steps-container');
		stepsPlaceholder.appendChild(stepsContainer);
		
		// Update buttons
		updateButtons(tabContent.querySelector('.screen-share-container'));
	};

	// Create initial UI
	createInitialUI();
	
	// Initialize screen sharing if not already started
	if (!window.newStream) {
		shareScreen();
	}
	
	// Initialize socket connection if mobile proctoring is enabled
	if (secureFeatures.find(entity => entity.key === 'mobile_proctoring')) {
		initSocketConnection();
	}
	
	// Set up language change listener
	i18next.on('languageChanged', updateUI);
	
	return tabContent.querySelector('.screen-share-container');
};