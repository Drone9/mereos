import i18next from 'i18next';
import { 
	convertDataIntoParse,
	detectMultipleScreens, 
	findLastVisitedRoute, 
	findPreviousPrecheckStep, 
	getDateTime, 
	getSecureFeatures, 
	logger, 
	registerEvent, 
	sentryExceptioMessage, 
	shareScreenFromContent, 
	showToast, 
	updatePersistData
} from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { openModal, showTab } from '../ExamsPrechecks';
import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { publishCanvasScreenTrack, waitForActiveRecordingStart } from '../StartRecording';
import { getShareDimensions, isWholeScreenShape, matchesCurrentScreenShape, SCREEN_CAPTURE_NOT_READY } from '../utils/screenCapture';
import { v4 } from 'uuid';

const SCREEN_LAYOUT_POLL_MS = 2000;
let stopScreenLayoutWatch = null;

export const IdentityVerificationScreenFive = async (tabContent) => {
	if(window.mereos.isScreenShare){
		return;
	}
	window.mereos.isScreenShare=true;
	let multipleScreens;
	window.mereos.newStream = null;
	const candidateAssessment = getSecureFeatures();
	const secureFeatures = candidateAssessment?.entities || [];
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

	const verifyDesktop = secureFeatures.some(entity => entity.key === 'verify_desktop');

	let otherScreensConnected = false;

	const reportMultipleScreens = () => {
		if(window.mereos.globalCallback){
			window.mereos.globalCallback({
				type:'error',
				message: 'multiple_screens_detected',
				code:40037
			});
		}
		registerEvent({ eventType: 'error', notify: false, eventName: 'multiple_screens_detected' });
	};

	const applyMultipleScreens = (detected) => {
		if (detected === Boolean(multipleScreens)) return;
		multipleScreens = detected;

		if (detected) {
			reportMultipleScreens();
		} else {

			const shareLive = isScreenAlreadyShared && window.mereos.newStream?.getVideoTracks()[0]?.readyState === 'live';
			mode = shareLive ? 'startScreenRecording' : 'share-screen-again';
		}
	};

	const watchScreenLayout = () => {
		stopScreenLayoutWatch?.();

		const onScreenLayoutChange = async () => {
			if (!tabContent.classList.contains('active')) {
				stopScreenLayoutWatch?.();
				return;
			}
			const detected = await detectMultipleScreens();
			if (verifyDesktop) {
				if (detected !== Boolean(multipleScreens)) {
					applyMultipleScreens(detected);
					updateUI();
				}
			} else if (detected !== otherScreensConnected) {
				otherScreensConnected = detected;
				if (detected) reportMultipleScreens();
				updateUI();
			}
		};

		const intervalId = setInterval(onScreenLayoutChange, SCREEN_LAYOUT_POLL_MS);
		window.screen.addEventListener?.('change', onScreenLayoutChange);
		stopScreenLayoutWatch = () => {
			clearInterval(intervalId);
			window.screen.removeEventListener?.('change', onScreenLayoutChange);
			stopScreenLayoutWatch = null;
		};
	};

	const initSocketConnection = () => {
		if (!window.mereos.socket) {
			updatePersistData('preChecksSteps', { 
				mobileConnection: false,
				screenSharing: false
			});
			if(window.mereos.globalCallback){
				window.mereos.globalCallback({ type:'error', message: 'mobile_phone_disconnected', code:40017 });
			}
			showToast('error','mobile_phone_disconnected');
			logger.error('Socket not initialized');
			return;
		}
		if(!window.mereos.recordingStart){
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
						if(window.mereos.globalCallback){
							window.mereos.globalCallback({ 
								type:'error',
								message:'mobile_phone_disconnected_in_screen_share_screen',
								code:40052
							});
						}
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
		}
		
	};

	const isShareLive = () => window.mereos.newStream?.getVideoTracks()[0]?.readyState === 'live';

	const shareScreen = async () => {
		if (multipleScreens) return;
		if (isScreenAlreadyShared && window.mereos.newStream && 
			window.mereos.newStream.getVideoTracks()[0] && 
			window.mereos.newStream.getVideoTracks()[0].readyState === 'live') {
			
			stream = window.mereos.newStream;
			mode = 'startScreenRecording';
			msg = {
				type: 'successful',
				text: i18next.t('screen_shared_successfully')
			};
			updateUI();
			return;
		}

		try {
			window.mereos.newStream = await shareScreenFromContent();

			updatePersistData('session', { screenRecordingStream: location });

			const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

			const videoTrack = window.mereos.newStream.getVideoTracks()[0];
			const trackSettings = videoTrack.getSettings();

			// Firefox usually doesn't report displaySurface; it is checked by the share's shape below.
			const surfaceUnknown = isFirefox && !trackSettings.displaySurface;
			let isScreenShared = surfaceUnknown || trackSettings.displaySurface === 'monitor';

			// Firefox doesn't report what was shared, so also check the share is screen-shaped.
			const dimensions = isScreenShared ? await getShareDimensions(window.mereos.newStream) : null;
			if (dimensions && !isWholeScreenShape(dimensions)) {
				registerEvent({
					eventType: 'error',
					notify: false,
					eventName: 'screen_share_incomplete',
					eventValue: JSON.stringify({ ...dimensions, firefox: isFirefox })
				});
				if(window.mereos.globalCallback){
					window.mereos.globalCallback({
						type:'error',
						message: 'screen_share_incomplete',
						code:40070
					});
				}
				videoTrack.stop();
				window.mereos.newStream = null;
				stream = null;
				isScreenAlreadyShared = false;
				mode = 'incomplete-share';
				updateUI();
				return;
			}

			// Firefox lets the candidate pick a window too: a window doesn't have the screen's shape.
			if (surfaceUnknown && dimensions && !matchesCurrentScreenShape(dimensions)) {
				isScreenShared = false;
			}

			if (isScreenShared) {
				stream = window.mereos.newStream;
				mode = 'startScreenRecording';
				isScreenAlreadyShared = true; 
				msg = {
					type: 'successful',
					text: i18next.t('screen_shared_successfully')
				};

				videoTrack.addEventListener('ended', () => {
					isScreenAlreadyShared = false;
					// Still on this step: swap Done for Reshare instead of leaving a dead button.
					if (tabContent.classList.contains('active') && mode === 'startScreenRecording') {
						mode = 'rerecordScreen';
						updateUI();
					}
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
			sentryExceptioMessage(err,{
				type: 'error', 
				message: err?.message, 
			});
		}
		
		updateUI();
	};

	const nextStep = async () => {
		if (multipleScreens || !isShareLive()) return;
		stopScreenLayoutWatch?.();
		try {
			window.mereos.screenShareStopped = false;
			updatePersistData('preChecksSteps', { screenSharing: true });
			if(window.mereos.globalCallback){
				window.mereos.globalCallback({ 
					type:'success',
					message: 'screen_recording_window_shared',
					code:50015
				});
			}
			showTab('IdentityVerificationScreenSix');
			window.mereos.isScreenShare = false;

			const session = convertDataIntoParse('session');

			await waitForActiveRecordingStart();

			const room = window?.mereos?.roomInstance;

			// Opened mid-session only because an extra screen was connected: the share never
			// stopped and is still being recorded, so don't republish it as a new recording.
			const unchangedShare = window.mereos.multiScreenModalStream;
			window.mereos.multiScreenModalStream = null;
			if (room && unchangedShare && unchangedShare === window.mereos.newStream
				&& unchangedShare.getVideoTracks()[0]?.readyState === 'live'
				&& window.mereos.screenTrackPublished?.track) {
				return;
			}

			if (room) {
				const videoTrack = window?.mereos?.newStream?.getVideoTracks()[0];

				if (!videoTrack) {
					throw new Error('No video track found in screen share stream');
				}
				if (videoTrack.readyState !== 'live') {
					throw new Error('Video track is not in live state');
				}

				if (window.mereos?.screenTrackPublished?.track) {
					try {
						await room.localParticipant.unpublishTrack(
							window.mereos.screenTrackPublished.track
						);
					} catch (unpublishError) {
						sentryExceptioMessage(unpublishError);
						console.error('Error unpublishing existing track:', unpublishError);
					}
				}

				if (room !== window.mereos.roomInstance) {
					showToast('error', 'screen_share_publish_failed');
					sentryExceptioMessage(new Error('roomInstance changed during screen reshare'));
					return;
				}

				const pauseAndResumeEnabled = secureFeatures.some(entity => entity.key === 'pause_and_resume');

				let publishedScreenTrack;
				try {
					if (pauseAndResumeEnabled) {
						({ publication: publishedScreenTrack } = await publishCanvasScreenTrack(room, window.mereos.newStream));
					} else {
						publishedScreenTrack = await room.localParticipant.publishTrack(
							videoTrack,
							{ name: `screen-share-${v4()}` }
						);
					}
				} catch (publishError) {
					if (publishError?.message === SCREEN_CAPTURE_NOT_READY) {
						window.mereos.screenShareStopped = true;
						window.mereos.newStream?.getTracks().forEach(track => track.stop());
						window.mereos.newStream = null;
						updatePersistData('preChecksSteps', { screenSharing: false });
						if (window.mereos.startRecordingCallBack) {
							window.mereos.startRecordingCallBack({
								type: 'error',
								message: 'please_share_your_screen',
								code: 40011
							});
						}
						openModal();
						return;
					}
					console.error('Error publishing screen track:', publishError);
					showToast('error', 'screen_share_publish_failed');
					sentryExceptioMessage(publishError,{
						type: 'error', 
						message: 'Error publishing screen track', 
					});
					return;
				}

				window.mereos.screenTrackPublished = publishedScreenTrack;

				let screenRecordings = [
					...(session.screen_sharing_video_name || []),
					publishedScreenTrack.trackSid
				];

				registerEvent({
					eventType: 'success', 
					notify: false, 
					eventName: 'screen_shared_again', 
					eventValue: getDateTime()
				});
				if(window.mereos.globalCallback){
					window.mereos.globalCallback({ 
						type:'success',
						message: 'screen_shared_again',
						code:50015
					});
				}
				updatePersistData('session', { screen_sharing_video_name: screenRecordings });
			} else {
				registerEvent({
					eventType: 'success',
					notify: false,
					eventName: 'screen_recording_window_shared',
					eventValue: getDateTime()
				});
			}
		} catch (error) {
			console.error('Error starting screen share:', error);
			showToast('error', 'screen_share_publish_failed');
			sentryExceptioMessage(error,{
				type: 'error', 
				message: 'Error starting screen share', 
			});
		}
	};

	const prevStep = () => {
		stopScreenLayoutWatch?.();
		if (stream) {
			stream.getVideoTracks()[0].stop();
		}
		window.mereos.isScreenShare = false;
		isScreenAlreadyShared = false; 
		if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
			window.mereos.socket?.send(JSON.stringify({ event: 'resetSession' }));
		}
		const previousRoute = findLastVisitedRoute('IdentityVerificationScreenFive');
		const previousStep = findPreviousPrecheckStep('IdentityVerificationScreenFive');
		updatePersistData('preChecksSteps',{ [previousStep]:false });
		showTab(previousRoute);
	};

	const updateUI = () => {
		// Also covers a share that finished while a second screen was being connected.
		if (multipleScreens) {
			mode = 'multiple-screens';
		}

		if (mode === 'multiple-screens') {
			msg = {
				type: 'unsuccessful',
				text: 'desktop_error'
			};
		} else if (mode === 'startScreenRecording') {
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
		} else if (mode === 'incomplete-share') {
			msg = {
				type: 'unsuccessful',
				text: 'screen_share_incomplete'
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
			updateScreenNotice(existingContainer);

			const headerImg = existingContainer.querySelector('.screen-share-dummy');
			if (headerImg) {
				headerImg.src = `${ASSET_URL}/share-screen-${i18next.language || 'en'}.svg`;
			}

			updateButtons(existingContainer);
		} else {
			createInitialUI();
		}
	};

	const updateScreenNotice = (container) => {
		const notice = container.querySelector('#multi-screen-notice');
		if (!notice) return;
		notice.textContent = i18next.t('share_assessment_screen_notice');
		notice.style.display = !verifyDesktop && otherScreensConnected ? '' : 'none';
	};

	const updateButtons = (container) => {
		const btnContainer = container.querySelector('.ivsf-btn-container');
		if (!btnContainer) return;

		btnContainer.innerHTML = '';

		const prevStepsEntities = ['verify_candidate', 'verify_id', 'record_audio', 'record_room'];
		const showPrevButton = secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0;

		const isSessionResume = convertDataIntoParse('session')?.room_id;

		const canGoBack = showPrevButton &&
			mode === 'startScreenRecording' &&
			!window.mereos.roomInstance &&
			!isSessionResume &&
			!window.mereos.screenShareStopped;

		let buttonsHTML = '';

		if (canGoBack) {
			buttonsHTML += `<button class="orange-hollow-btn">${i18next.t('previous_step')}</button>`;
		}

		if (mode === 'multiple-screens') {
			buttonsHTML += `<button class="orange-filled-btn" disabled>${i18next.t('reshare_screen')}</button>`;
		} else if (mode === 'startScreenRecording') {
			// Firefox's share picker doesn't block the page, so Done must wait for a live share.
			buttonsHTML += `<button class="orange-filled-btn" ${isShareLive() ? '' : 'disabled'}>${i18next.t('done')}</button>`;
		} else if (mode === 'rerecordScreen' || mode === 'share-screen-again' || mode === 'incomplete-share') {
			buttonsHTML += `<button class="orange-filled-btn">${i18next.t('reshare_screen')}</button>`;
		}

		btnContainer.insertAdjacentHTML('beforeend', buttonsHTML);

		if (canGoBack) {
			btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);
		}
	
		if (mode === 'startScreenRecording') {
			btnContainer.querySelector('.orange-filled-btn').addEventListener('click', nextStep);
		} else if (mode === 'rerecordScreen' || mode === 'share-screen-again' || mode === 'incomplete-share') {
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
					<div id="multi-screen-notice" class="ivsf-multi-screen-notice"></div>
					<div class="ivsf-btn-container"></div>
				</div>
				<style></style>
			</div>
		`);
		
		const stepsPlaceholder = tabContent.querySelector('.steps-container');
		stepsPlaceholder.appendChild(stepsContainer);

		updateScreenNotice(tabContent.querySelector('.screen-share-container'));

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

	if (verifyDesktop) {
		applyMultipleScreens(await detectMultipleScreens());
	} else {
		otherScreensConnected = await detectMultipleScreens();
		if (otherScreensConnected) reportMultipleScreens();
	}
	watchScreenLayout();

	if (multipleScreens) {
		updateUI();
	} else {
		createInitialUI();
	}

	if (!isScreenAlreadyShared && !multipleScreens) {
		shareScreen();
	}
	
	if (secureFeatures.find(entity => entity.key === 'mobile_proctoring')) {
		initSocketConnection();
	}
	
	i18next.on('languageChanged', updateUI);
	
	return tabContent.querySelector('.screen-share-container');
};