import i18next from 'i18next';

import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { showTab } from '../ExamsPrechecks';

import { findConfigs, findLastVisitedRoute, findPreviousPrecheckStep, getDateTime, getSecureFeatures, logger, registerEvent, sentryExceptioMessage, updatePersistData, convertDataIntoParse, addSectionSessionRecord } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { isStreamLive, requestCameraStream, stopStream, waitForVideoReady } from '../utils/camera';

import { uploadFileInS3Folder } from '../services/general.services.js';

const RECORDING_MAX_DURATION_MS = 60000;
const STOP_BUTTON_DELAY_MS = 3000;
const ERROR_MESSAGES = [
	'something_went_wrong_please_upload_again',
	'camera_permission_denied',
	'no_camera_found',
	'camera_in_use',
	'camera_access_error',
	'camera_not_supported',
	'camera_access_lost'
];

const videoConstraints = {
	width: 640,
	height: 480,
	facingMode: 'user'
};

let currentLanguageHandler = null;
let cleanupPreviousScreen = null;

const getCameraErrorMessage = (error) => {
	if (error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError') return 'camera_permission_denied';
	if (error?.name === 'NotFoundError' || error?.name === 'DevicesNotFoundError') return 'no_camera_found';
	if (error?.name === 'NotReadableError' || error?.name === 'TrackStartError') return 'camera_in_use';
	return 'camera_access_lost';
};

export const IdentityVerificationScreenFour = async (tabContent) => {
	if (currentLanguageHandler) {
		i18next.off('languageChanged', currentLanguageHandler);
		currentLanguageHandler = null;
	}
	if (cleanupPreviousScreen) {
		cleanupPreviousScreen();
		cleanupPreviousScreen = null;
	}

	let container = tabContent.querySelector('.screen-four-container');
	if (container) {
		if (window.mereos.globalStream) {
			window.mereos.globalStream.getTracks().forEach(track => track.stop());
			window.mereos.globalStream = null;
		}
		clearInterval(window.mereos.recordingDotInterval);
		tabContent.removeChild(container);
	}

	let recordingMode = 'startRecording';
	let showPlayer = false;
	let textMessage = 'scan_your_room';
	let loading = false;
	let blob = null;
	let blobUrl = null;
	let mediaRecorder = null;
	let recordedChunks = [];
	let cameraAvailable = true;
	let webcamLoading = true;
	let stream = null;
	let cameraRequestId = 0;
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const isAudioEnabled = findConfigs(['record_audio'], secureFeatures).length > 0;
	let stopButtonDisabled = true;

	let autoStopRecordingTimeout = null;
	let stopButtonTimeout = null;

	const clearRecordingTimers = () => {
		clearTimeout(autoStopRecordingTimeout);
		clearTimeout(stopButtonTimeout);
		clearInterval(window.mereos.recordingDotInterval);
	};

	// Stops an in-progress recording without producing a video (used on reset/leave/camera loss).
	const discardRecorder = () => {
		if (mediaRecorder && mediaRecorder.state !== 'inactive') {
			mediaRecorder.ondataavailable = null;
			mediaRecorder.onstop = null;
			mediaRecorder.stop();
		}
		mediaRecorder = null;
		recordedChunks = [];
	};

	const clearRecordedVideo = () => {
		if (blobUrl) {
			URL.revokeObjectURL(blobUrl);
			blobUrl = null;
		}
		blob = null;
		showPlayer = false;
	};

	const stopCamera = () => {
		cameraRequestId++;
		stopStream(stream);
		stream = null;
	};

	// Revoking the blob URL doesn't stop a <video> that already loaded it, so pause and empty
	// every video in this tab; otherwise the recorded room scan keeps playing on the next step.
	const stopVideoPlayback = () => {
		tabContent.querySelectorAll('video').forEach((video) => {
			video.pause();
			video.removeAttribute('src');
			video.srcObject = null;
			video.load();
		});
	};

	let tabActiveObserver = null;

	const cleanup = () => {
		tabActiveObserver?.disconnect();
		tabActiveObserver = null;
		stopVideoPlayback();
		clearRecordingTimers();
		discardRecorder();
		stopCamera();
		clearRecordedVideo();
	};

	const handleCameraError = (error) => {
		stopCamera();
		webcamLoading = false;
		cameraAvailable = false;
		textMessage = getCameraErrorMessage(error);
		if(window.mereos.globalCallback){
			window.mereos.globalCallback({
				type:'error',
				message: textMessage,
				code:40050
			});
		}
		sentryExceptioMessage(error,{
			type: 'error',
			message: textMessage,
		});
		updateUI();
	};

	const handleCameraLost = () => {
		if (recordingMode === 'beingRecorded') {
			clearRecordingTimers();
			discardRecorder();
			recordingMode = 'startRecording';
		}
		stopCamera();
		webcamLoading = false;
		cameraAvailable = false;
		textMessage = 'camera_access_lost';
		if(window.mereos.globalCallback){
			window.mereos.globalCallback({
				type:'error',
				message: 'camera_access_lost',
				code:40049
			});
		}
		updateUI();
	};

	// The only place the camera is opened. A newer request (or leaving the screen) discards
	// an older one and stops its stream, so streams never leak and keep the camera busy.
	const startCamera = async () => {
		const requestId = ++cameraRequestId;

		if (!navigator.mediaDevices?.getUserMedia) {
			webcamLoading = false;
			cameraAvailable = false;
			textMessage = 'camera_not_supported';
			updateUI();
			return;
		}

		webcamLoading = true;
		cameraAvailable = true;
		updateUI();

		try {
			const newStream = await requestCameraStream(videoConstraints, { audio: isAudioEnabled });
			if (requestId !== cameraRequestId) {
				stopStream(newStream);
				return;
			}
			stopStream(stream);
			stream = newStream;
			window.mereos.globalStream = newStream;

			newStream.getVideoTracks().forEach(track => {
				track.addEventListener('ended', () => {
					if (stream === newStream) handleCameraLost();
				});
			});

			const probeVideo = document.createElement('video');
			probeVideo.muted = true;
			probeVideo.srcObject = newStream;
			await waitForVideoReady(probeVideo);
			probeVideo.srcObject = null;
			if (requestId !== cameraRequestId) return;

			webcamLoading = false;
			cameraAvailable = true;
			textMessage = 'scan_your_room';
			updateUI();
		} catch (error) {
			if (requestId !== cameraRequestId) return;
			logger.error('Error getting user media:', error);
			handleCameraError(error);
		}
	};

	const handleStartRecording = () => {
		try {
			if (!isStreamLive(stream) || mediaRecorder?.state === 'recording') {
				return;
			}

			recordedChunks = [];
			mediaRecorder = new MediaRecorder(stream);

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					recordedChunks.push(event.data);
				}
			};

			mediaRecorder.onstop = () => {
				clearRecordingTimers();
				blob = new Blob(recordedChunks, { type: 'video/webm' });
				blobUrl = URL.createObjectURL(blob);
				showPlayer = true;
				recordedChunks = [];
				recordingMode = 'stopRecording';
				updateUI();
			};

			mediaRecorder.start();
			recordingMode = 'beingRecorded';
			stopButtonDisabled = true;
			updateUI();

			stopButtonTimeout = setTimeout(() => {
				stopButtonDisabled = false;
				updateUI();
			}, STOP_BUTTON_DELAY_MS);

			autoStopRecordingTimeout = setTimeout(() => {
				if (mediaRecorder && mediaRecorder.state === 'recording') {
					mediaRecorder.stop();
				}
			}, RECORDING_MAX_DURATION_MS);
		} catch (error) {
			logger.error('Error accessing media devices:', error);
			textMessage = 'camera_access_lost';
			cameraAvailable = false;
			sentryExceptioMessage(error,{
				type: 'error',
				message: textMessage,
			});
			if(window.mereos.globalCallback){
				window.mereos.globalCallback({
					type:'error',
					message: 'camera_access_lost',
					code:40049
				});
			}
			updateUI();
		}
	};

	const handleRestartRecording = () => {
		clearRecordingTimers();
		discardRecorder();
		clearRecordedVideo();
		loading = false;
		recordingMode = 'startRecording';
		textMessage = 'scan_your_room';
		cameraAvailable = true;
		// updateUI() reuses the running camera, or reopens it if it was lost.
		webcamLoading = false;
		updateUI();
	};

	const handleStopRecording = () => {
		clearRecordingTimers();
		if (mediaRecorder && mediaRecorder.state === 'recording') {
			mediaRecorder.stop();
		}
	};

	const nextStep = async () => {
		try {
			cleanup();
			loading = false;
			recordingMode = 'startRecording';
			textMessage = 'scan_your_room';
			if (window.mereos.globalStream) {
				window.mereos.globalStream.getTracks().forEach(track => track.stop());
				window.mereos.globalStream = null;
			}
			updatePersistData('preChecksSteps', { roomScanningVideo: true });
			registerEvent({
				eventType: 'success',
				notify: false,
				eventName: 'room_scan_completed',
				eventValue: getDateTime(),
			});

			showTab('MobileProctoring');
		} catch (error) {
			sentryExceptioMessage(error,{
				type: 'error',
				message: 'Error navigating to next step:',
			});
			logger.error('Error navigating to next step:', error);
		}
	};

	const prevStep = () => {
		cleanup();
		loading = false;
		recordingMode = 'startRecording';
		textMessage = 'scan_your_room';
		if (window.mereos.globalStream) {
			window.mereos.globalStream.getTracks().forEach(track => track.stop());
			window.mereos.globalStream = null;
		}
		const previousRoute = findLastVisitedRoute('IdentityVerificationScreenFour');
		const previousStep = findPreviousPrecheckStep('IdentityVerificationScreenFour');
		updatePersistData('preChecksSteps',{ [previousStep]:false });
		showTab(previousRoute);
	};

	const uploadUserRoomVideo = async () => {
		if (loading) return;
		try {
			loading = true;
			textMessage = 'file_is_being_uploaded';
			updateUI();

			let url = await uploadFileInS3Folder({
				file: blob,
				folderName: 'videos'
			});

			if (url?.data?.file_key) {
				const fileUrl = url.data.file_key;
				updatePersistData('session', { room_scan_video: `https://mereos-corder.s3.eu-west-3.amazonaws.com/${fileUrl}` });

				const updatedSession = convertDataIntoParse('session');
				const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');

				try {
					const sectionRecordResp = await addSectionSessionRecord(updatedSession, candidateInviteAssessmentSection);
					logger.info('Section session record added successfully:', sectionRecordResp);
				} catch (sectionError) {
					logger.error('Error adding section session record:', sectionError);
					sentryExceptioMessage(sectionError, { type: 'error', message: 'Failed to add section session record' });
				}

				loading = false;
				recordingMode = 'uploaded_file';
				textMessage = 'candidate_video_is_uploaded_successfully';
				if(window.mereos.globalCallback){
					window.mereos.globalCallback({
						type:'success',
						message: 'candidate_video_is_uploaded_successfully',
						code:50014
					});
				}
				updateUI();
			} else {
				throw new Error('room_scan_upload_missing_file_key');
			}
		} catch (error) {
			loading = false;
			textMessage = 'something_went_wrong_please_upload_again';
			recordingMode = 'stopRecording';
			sentryExceptioMessage(error);
			if(window.mereos.globalCallback){
				window.mereos.globalCallback({
					type:'error',
					message: 'something_went_wrong_please_upload_video_again',
					code:40051
				});
			}
			updateUI();
		}
	};

	// Synchronous on purpose: an async render that clears the container, awaits, and then
	// appends buttons lets overlapping renders duplicate buttons (only the first gets a listener).
	const updateUI = () => {
		clearInterval(window.mereos.recordingDotInterval);

		const schoolTheme = localStorage.getItem('schoolTheme') !== undefined ?
			JSON.parse(localStorage.getItem('schoolTheme')) : {};

		let container = tabContent?.querySelector('.screen-four-container');
		if (!container) {
			tabContent.insertAdjacentHTML('beforeend', `
				<div class="screen-four-container" id="screen-four-main-container"></div>
			`);
			container = tabContent.querySelector('.screen-four-container');
		}

		container.innerHTML = '';

		const stepsContainer = document.createElement('div');
		renderIdentityVerificationSteps(stepsContainer, 4);

		container.insertAdjacentHTML('beforeend', `
			<div class="ivsf-wrapper">
				<div class="room-scan-header-title">${i18next.t('workspace_checking')}</div>
				<div class="ivsf-msg">${i18next.t('workspace_checking_msg')}</div>
				<div class="steps-container"></div>
				<div class="ivsf-header-img-container"></div>
				<div class="ivsf-query-msg" ${ERROR_MESSAGES.includes(textMessage) ? 'style="color: #E95E5E;"' : ''}>${i18next.t(textMessage)}</div>
				<div class="ivsf-btn-container"></div>
			</div>
		`);

		const stepsPlaceholder = container.querySelector('.steps-container');
		stepsPlaceholder.appendChild(stepsContainer);

		const headerImgContainer = container.querySelector('.ivsf-header-img-container');
		const btnContainer = container.querySelector('.ivsf-btn-container');

		if (showPlayer && blobUrl) {
			headerImgContainer.insertAdjacentHTML('beforeend', `
				<video id="myVideo" class="my-recorded-video2" controls autoplay></video>
			`);
			const videoElement = headerImgContainer.querySelector('#myVideo');
			videoElement.src = blobUrl;
		} else if (recordingMode === 'beingRecorded') {
			headerImgContainer.insertAdjacentHTML('beforeend', `
				<div class="ivsf-recording-badge-container">
					<img class="ivsf-recording-dot" src="${ASSET_URL}/white-dot.svg" alt="recording-dot">
					${i18next.t('recording')}
				</div>
				<video id="webcam-recorded-media" autoplay muted playsinline height="250"></video>
			`);

			const dot = headerImgContainer.querySelector('.ivsf-recording-dot');
			let isRed = false;
			window.mereos.recordingDotInterval = setInterval(() => {
				dot.src = `${ASSET_URL}/${isRed ? 'white-dot.svg' : 'red-dot.svg'}`;
				isRed = !isRed;
			}, 1000);

			const webcam = headerImgContainer.querySelector('#webcam-recorded-media');
			webcam.srcObject = stream;
		}

		if (recordingMode === 'startRecording') {
			if (!cameraAvailable) {
				headerImgContainer.insertAdjacentHTML('beforeend', `
					<div class="camera-error-container">
						<img src="${schoolTheme?.mode === 'dark' ? `${ASSET_URL}/camera-icon-white.svg` : `${ASSET_URL}/camera-icon-black.svg`}" alt="camera-error" class="camera-error-icon">
					</div>
				`);

				const canRetry = textMessage !== 'camera_not_supported';
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-hollow-btn" data-action="prev">${i18next.t('previous_step')}</button>
					${canRetry ?
		`<button class="orange-filled-btn" data-action="retry">${i18next.t('retry_camera')}</button>` :
		`<button class="orange-filled-btn" disabled>${i18next.t('record_video')}</button>`
}
				`);

				btnContainer.querySelector('[data-action="prev"]').addEventListener('click', prevStep);
				btnContainer.querySelector('[data-action="retry"]')?.addEventListener('click', startCamera);
				return;
			}

			if (webcamLoading || !isStreamLive(stream)) {
				headerImgContainer.insertAdjacentHTML('beforeend', `
					<div class="camera-spinner">
					<div class="new-spinner">
						<div class='bounce1'></div>
						<div class='bounce2'></div>
						<div class='bounce3'></div>
					</div>
					</div>
				`);

				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-hollow-btn">${i18next.t('previous_step')}</button>
					<button class="orange-filled-btn" disabled>${i18next.t('record_video')}</button>
				`);

				btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);

				// Camera was lost or never opened (e.g. after reset): reopen it.
				if (!webcamLoading) startCamera();
				return;
			}

			headerImgContainer.insertAdjacentHTML('beforeend', `
				<video id="webcam-recording-media" autoplay muted playsinline height="250"></video>
			`);

			const webcam = headerImgContainer.querySelector('#webcam-recording-media');
			webcam.srcObject = stream;

			btnContainer.insertAdjacentHTML('beforeend', `
				<button class="orange-hollow-btn">${i18next.t('previous_step')}</button>
				<button class="orange-filled-btn">${i18next.t('record_video')}</button>
			`);

			btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);
			btnContainer.querySelector('.orange-filled-btn').addEventListener('click', handleStartRecording);
		} else if (recordingMode === 'beingRecorded') {
			const prevStepsEntities = ['verify_candidate', 'verify_id', 'record_audio'];
			const showPrevButton = secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0;

			if (showPrevButton) {
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-hollow-btn">${i18next.t('previous_step')}</button>
				`);
				btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);
			}

			btnContainer.insertAdjacentHTML('beforeend', `
				<button class="orange-filled-btn" ${stopButtonDisabled ? 'disabled' : ''}>${i18next.t('stop_recording')}</button>
			`);
			btnContainer.querySelector('.orange-filled-btn').addEventListener('click', handleStopRecording);
		} else if (recordingMode === 'stopRecording' || recordingMode === 'uploaded_file') {
			btnContainer.insertAdjacentHTML('beforeend', `
				<button class="orange-hollow-btn">${i18next.t('reset')}</button>
			`);
			btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', handleRestartRecording);

			if (recordingMode !== 'uploaded_file') {
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-filled-btn" ${loading ? 'disabled' : ''}>${i18next.t('upload')}</button>
				`);
				btnContainer.querySelector('.orange-filled-btn').addEventListener('click', uploadUserRoomVideo);
			} else {
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-filled-btn">${i18next.t('next_step')}</button>
				`);
				btnContainer.querySelector('.orange-filled-btn').addEventListener('click', nextStep);
			}
		}
	};

	cleanupPreviousScreen = cleanup;

	// Leaving this step any other way than its own Next/Previous buttons (e.g. clicking another
	// step) only hides the tab. Clean up as soon as it stops being the active tab; coming back
	// re-runs this screen from scratch.
	let wasTabActive = tabContent.classList.contains('active');
	tabActiveObserver = new MutationObserver(() => {
		const isTabActive = tabContent.classList.contains('active');
		if (wasTabActive && !isTabActive) {
			cleanup();
		}
		wasTabActive = isTabActive;
	});
	tabActiveObserver.observe(tabContent, { attributes: true, attributeFilter: ['class'] });
	startCamera();

	currentLanguageHandler = () => {
		if (tabContent.classList.contains('active')) updateUI();
	};
	i18next.on('languageChanged', currentLanguageHandler);
};
