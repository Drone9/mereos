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
import * as TwilioVideo from 'twilio-video';
import { v4 } from 'uuid';

export const IdentityVerificationScreenFive = async (tabContent) => {
	let multipleScreens;
	window.mereos.newStream = null;
	const candidateAssessment = getSecureFeatures();
	const secureFeatures = candidateAssessment?.entities || [];
	let publishedScreenTrack = null;
	let isScreenAlreadyShared = false;

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
		if (!window.mereos.socket) {
			updatePersistData('preChecksSteps', { 
				mobileConnection: false,
				screenSharing: false
			});
			window.mereos.globalCallback({ type:'error', message: 'mobile_phone_disconnected', code:40017 });
			showToast('error','mobile_phone_disconnected');
			logger.error('Socket not initialized');
			return;
		}

		window.mereos.socket.onmessage = (event) => {
			const eventData = JSON.parse(event?.data);

			switch (eventData?.message?.event || eventData?.event) {
				case 'violation':
					if(eventData?.message?.message === 'Violation'){
						updatePersistData('preChecksSteps', { mobileConnection: false, screenSharing: false });
						if(window.mereos.newStream){
							window.mereos.newStream?.getVideoTracks()[0].stop();
						}
						isScreenAlreadyShared = false; 
						showTab('MobileProctoring');
					}
					registerEvent({ eventType: 'error', notify: false, eventName: eventData?.message?.message, eventValue: getDateTime() });
					break;

				default:
					break;
			}
		};
		
		window.mereos.socket.onerror = (error) => {
			logger.error('WebSocket error:', error);
		};

		window.mereos.socket.onclose = () => {
			logger.error('WebSocket connection closed');
		};
	};
	
	let multipleScreensCheck = secureFeatures.find(entity => entity.key === 'verify_desktop');
	multipleScreensCheck && checkMultipleScreens();

	let isSharingInProgress = false;

	const shareScreen = async () => {
		if (isSharingInProgress) {
			logger.warn('Share screen already in progress, skipping duplicate call');
			return;
		}
		isSharingInProgress = true;

		try {
			window.mereos.newStream = await shareScreenFromContent();
			updatePersistData('session', { screenRecordingStream: location });

			const videoTrack = window.mereos.newStream.getVideoTracks()[0];
			const trackSettings = videoTrack.getSettings();

			const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
			const isScreenShared = isFirefox || trackSettings.displaySurface === 'monitor';

			if (isScreenShared) {
				stream = window.mereos.newStream;
				mode = 'startScreenRecording';
				isScreenAlreadyShared = true;
				msg = { type: 'successful', text: i18next.t('screen_shared_successfully') };

				videoTrack.addEventListener('ended', () => {
					isScreenAlreadyShared = false;
				});
			} else {
				mode = 'rerecordScreen';
				isScreenAlreadyShared = false;
				videoTrack.stop();
				throw new Error(i18next.t('please_share_entire_screen'));
			}
		} catch (err) {
			logger.error('Error during screen sharing:', err.message);
			isScreenAlreadyShared = false;
			mode = 'share-screen-again';
			msg = {
				type: err?.message === i18next.t('please_share_entire_screen') ? 'share-screen-again' : 'unsuccessful',
				text: err?.message || 'screen_sharing_stopped'
			};
		} finally {
			isSharingInProgress = false; // reset lock
			updateUI();
		}
	};


	const nextStep = async () => {
		updatePersistData('preChecksSteps', { screenSharing: true });
		registerEvent({ eventType: 'success', notify: false, eventName: 'screen_recording_window_shared', eventValue: getDateTime() });
		showTab('IdentityVerificationScreenSix');

		const session = convertDataIntoParse('session');

		if (window?.mereos?.roomInstance) {
			try {
				const videoTrack = window?.mereos?.newStream
					?.getVideoTracks()[0];

				if (!videoTrack) {
					throw new Error('No video track found in screen share stream');
				}

				if (videoTrack.readyState !== 'live') {
					throw new Error('Video track is not in live state');
				}

				let screenTrack;
				try {
					screenTrack = new TwilioVideo.LocalVideoTrack(videoTrack, {
						name: `screen-share-${v4()}`
					});
				} catch (trackError) {
					console.error('Error creating LocalVideoTrack:', trackError);
					screenTrack = new TwilioVideo.LocalVideoTrack(videoTrack);
				}
			
				if (window.mereos?.screenTrackPublished?.track) {
					try {
						await window.mereos.roomInstance.localParticipant.unpublishTrack(window.mereos.screenTrackPublished.track);
					} catch (unpublishError) {
						console.error('Error unpublishing existing track:', unpublishError);
					}
				}

				publishedScreenTrack = await window.mereos.roomInstance.localParticipant.publishTrack(screenTrack);
			
				window.mereos.screenTrackPublished = publishedScreenTrack;
            
				let screenRecordings = [...(session.screen_sharing_video_name || []), publishedScreenTrack.trackSid];
				updatePersistData('session', { screen_sharing_video_name: screenRecordings });

			} catch (error) {
				console.error('Error starting screen share:', error);
				showToast('error', 'screen_share_publish_failed');
			}
		}
	};

	const prevStep = () => {
		if (stream) {
			stream.getVideoTracks()[0].stop();
		}
		isScreenAlreadyShared = false; 
		if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
			window.mereos.socket?.send(JSON.stringify({ event: 'resetSession' }));
		}
		updatePersistData('preChecksSteps', { mobileConnection: false, screenSharing: false, roomScanningVideo: false });
		let navHistory = JSON.parse(localStorage.getItem('navHistory'));
		const currentIndex = navHistory.indexOf('IdentityVerificationScreenFive');
		const previousPage = currentIndex > 0 ? navHistory[currentIndex - 1] : null;
		showTab(previousPage);
	};

	const updateUI = () => {
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

		const existingContainer = tabContent.querySelector('.screen-share-container');
		if (existingContainer) {
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

			updateButtons(existingContainer);
		} else {
			createInitialUI();
		}
	};

	const updateButtons = (container) => {
		const btnContainer = container.querySelector('.ivsf-btn-container');
		if (!btnContainer) return;

		btnContainer.innerHTML = '';

		const prevStepsEntities = ['verify_candidate', 'verify_id', 'record_audio', 'record_room'];
		const showPrevButton = secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0;

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
		tabContent.innerHTML = '';
		
		const stepsContainer = document.createElement('div');
		renderIdentityVerificationSteps(stepsContainer, 6);
		
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
		
		const stepsPlaceholder = tabContent.querySelector('.steps-container');
		stepsPlaceholder.appendChild(stepsContainer);
		
		updateButtons(tabContent.querySelector('.screen-share-container'));
	};

	if (window.mereos.newStream && 
		window.mereos.newStream.getVideoTracks()[0] && 
		window.mereos.newStream.getVideoTracks()[0].readyState === 'live') {
		isScreenAlreadyShared = true;
		stream = window.mereos.newStream;
		mode = 'startScreenRecording';
		msg = {
			type: 'successful',
			text: i18next.t('screen_shared_successfully')
		};
	}

	createInitialUI();
	
	if (!isScreenAlreadyShared) {
		shareScreen();
	}
	
	if (secureFeatures.find(entity => entity.key === 'mobile_proctoring')) {
		initSocketConnection();
	}
	
	i18next.on('languageChanged', updateUI);
	
	return tabContent.querySelector('.screen-share-container');
};