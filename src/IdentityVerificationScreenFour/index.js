import i18next from 'i18next';

import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { showTab } from '../ExamsPrechecks';

import { findConfigs, findLastVisitedRoute, findPreviousPrecheckStep, getDateTime, getSecureFeatures, logger, registerEvent, updatePersistData } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';

import { uploadFileInS3Folder } from '../services/general.services.js';

export const IdentityVerificationScreenFour = async (tabContent) => {
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
	let mediaRecorder = null;
	let recordedChunks = [];
	let cameraAvailable = false;
	let permissionDenied = false;
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	let stopButtonDisabled = true;

	const videoConstraints = {
		width: 640,
		height: 480,
		facingMode: 'user',
		video: localStorage.getItem('deviceId') ? { deviceId: { exact: localStorage.getItem('deviceId') } } : true
	};

	let autoStopRecordingTimeout = null;

	const checkCameraAvailability = async () => {
		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				textMessage = 'camera_not_supported';
				cameraAvailable = false;
				return false;
			}

			const devices = await navigator.mediaDevices.enumerateDevices();
			const videoDevices = devices.filter(device => device.kind === 'videoinput');
			
			if (videoDevices.length === 0) {
				textMessage = 'camera_access_lost';
				cameraAvailable = false;
				return false;
			}

			const testStream = await navigator.mediaDevices.getUserMedia({ 
				video: true, 
				audio: false 
			});
			
			testStream.getTracks().forEach(track => track.stop());
			cameraAvailable = true;
			permissionDenied = false;
			return true;

		} catch (error) {
			cameraAvailable = false;
			
			if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
				textMessage = 'camera_permission_denied';
				permissionDenied = true;
			} else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
				textMessage = 'no_camera_found';
			} else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
				textMessage = 'camera_in_use';
			} else {
				textMessage = 'camera_access_lost';
			}
			return false;
		}
	};

	const handleStartRecording = async (type) => {
		try {
			if (type === 'startRecording') {
				const isCameraAvailable = await checkCameraAvailability();
				if (!isCameraAvailable) {
					updateUI();
					return;
				}

				mediaRecorder = new MediaRecorder(window.mereos.globalStream);

				mediaRecorder.ondataavailable = (event) => {
					if (event.data.size > 0) {
						recordedChunks.push(event.data);
					}
				};

				mediaRecorder.onstop = () => {
					clearTimeout(autoStopRecordingTimeout); 
					blob = new Blob(recordedChunks, { type: 'video/webm' });
					showPlayer = true;
					recordedChunks = [];
					updateUI();
				};

				mediaRecorder.start();
				recordingMode = 'beingRecorded';
				stopButtonDisabled = true;
				updateUI();

				setTimeout(() => {
					stopButtonDisabled = false;
					updateUI();
				}, 3000);

				autoStopRecordingTimeout = setTimeout(() => {
					if (mediaRecorder && mediaRecorder.state === 'recording') {
						mediaRecorder.stop();
						recordingMode = 'stopRecording';
						updateUI();
					}
				}, 60000);
			}
		} catch (error) {
			logger.error('Error accessing media devices:', error);
			textMessage = 'camera_access_lost';
			cameraAvailable = false;
			updateUI();
		}
	};

	const handleRestartRecording = async () => {
		showPlayer = false;
		loading = false;
		recordingMode = 'startRecording';
		textMessage = 'scan_your_room';
		cameraAvailable = false;
		permissionDenied = false;
		updateUI();
	};

	const handleStopRecording = async () => {
		clearInterval(window.mereos.recordingDotInterval);
		clearTimeout(autoStopRecordingTimeout);
		if (mediaRecorder) {
			mediaRecorder.stop();
		}
		recordingMode = 'stopRecording';
		updateUI();
	};	

	const nextStep = async () => {
		try {
			showPlayer = false;
			loading = false;
			blob = null;
			recordingMode = 'startRecording';
			textMessage = 'scan_your_room';
			cameraAvailable = false;
			permissionDenied = false;
			updateUI();
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
			logger.error('Error navigating to next step:', error);
		}
	};

	const prevStep = () => {
		showPlayer = false;
		loading = false;
		recordingMode = 'startRecording';
		textMessage = 'scan_your_room';
		blob = null;
		cameraAvailable = false;
		permissionDenied = false;
		if (window.mereos.globalStream) {
			window.mereos.globalStream.getTracks().forEach(track => track.stop());
			window.mereos.globalStream = null;
		}
		clearInterval(window.mereos.recordingDotInterval);
		updateUI();
		const previousRoute = findLastVisitedRoute('IdentityVerificationScreenFour');
		const previousStep = findPreviousPrecheckStep('IdentityVerificationScreenFour');
		updatePersistData('preChecksSteps',{ [previousStep]:false });
		showTab(previousRoute);
	};

	const uploadUserRoomVideo = async () => {
		try {
			loading = true;
			textMessage = 'file_is_being_uploaded';
			updateUI();

			let url = await uploadFileInS3Folder({
				file: blob,
				folderName: 'videos'
			});

			if (url?.data?.file_url) {
				const fileUrl = url.data.file_url;
				updatePersistData('session', { room_scan_video: fileUrl });
				recordingMode = 'uploaded_file';
				textMessage = 'candidate_video_is_uploaded_successfully';
				updateUI();
			}
		} catch (error) {
			loading = false;
			textMessage = 'something_went_wrong_please_upload_again';
			recordingMode = 'stopRecording';
			updateUI();
		}
	};

	const updateUI = async () => {
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
				<div class="ivsf-query-msg" ${textMessage === 'something_went_wrong_please_upload_again' || textMessage === 'camera_permission_denied' || textMessage === 'no_camera_found' || textMessage === 'camera_in_use' || textMessage === 'camera_access_error' || textMessage === 'camera_not_supported' || textMessage === 'camera_access_lost' ? 'style="color: #E95E5E;"' : ''}>${i18next.t(textMessage)}</div>
				<div class="ivsf-btn-container"></div>
			</div>
		`);
		
		const stepsPlaceholder = container.querySelector('.steps-container');
		stepsPlaceholder.appendChild(stepsContainer);
		
		const headerImgContainer = container.querySelector('.ivsf-header-img-container');
		const btnContainer = container.querySelector('.ivsf-btn-container');
		
		if (showPlayer && blob) {
			headerImgContainer.insertAdjacentHTML('beforeend', `
				<video id="myVideo" class="my-recorded-video2" controls autoplay></video>
			`);
			const videoElement = headerImgContainer.querySelector('#myVideo');
			videoElement.src = URL.createObjectURL(blob);
		} else {
			if (recordingMode === 'beingRecorded') {
				headerImgContainer.insertAdjacentHTML('beforeend', `
					<div class="ivsf-recording-badge-container">
						<img class="ivsf-recording-dot" src="${ASSET_URL}/white-dot.svg" alt="recording-dot">
						${i18next.t('recording')}
					</div>
					<video id="webcam-recorded-media" autoplay muted height="250"></video>
				`);
				
				const dot = headerImgContainer.querySelector('.ivsf-recording-dot');
				let isRed = false;
				const toggleDot = setInterval(() => {
					dot.src = `${ASSET_URL}/${isRed ? 'white-dot.svg' : 'red-dot.svg'}`;
					isRed = !isRed;
				}, 1000);
				window.mereos.recordingDotInterval = toggleDot;
				
				const webcam = headerImgContainer.querySelector('#webcam-recorded-media');
				webcam.srcObject = window.mereos.globalStream;
			}
		}
		
		if (recordingMode === 'startRecording') {
			const isCameraAvailable = await checkCameraAvailability();
			logger.success('isCameraAvailable',isCameraAvailable);
			if (!cameraAvailable) {
				headerImgContainer.insertAdjacentHTML('beforeend', `
					<div class="camera-error-container">
						<img src="${schoolTheme?.mode === 'dark' ? `${ASSET_URL}/camera-icon-white.svg` : `${ASSET_URL}/camera-icon-black.svg`}" alt="camera-error" class="camera-error-icon">
						<div class="camera-error-message">${i18next.t('camera_access_lost')}</div>
					</div>
				`);
				
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-hollow-btn">${i18next.t('previous_step')}</button>
					${permissionDenied ? 
		`<button class="orange-filled-btn">${i18next.t('retry_camera')}</button>` :
		`<button class="orange-filled-btn" disabled>${i18next.t('record_video')}</button>`
}
				`);
				
				btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);
				return;
			}

			const isAudioEnabled = findConfigs(['record_audio'], secureFeatures).length > 0;
			const mediaOptions = {
				audio: isAudioEnabled
					? (localStorage.getItem('microphoneID') !== null
						? { deviceId: { exact: localStorage.getItem('microphoneID') }}
						: true)
					: false,
				video: videoConstraints.video,
			};

			try {
				window.mereos.globalStream = await navigator.mediaDevices.getUserMedia(mediaOptions);
				
				headerImgContainer.insertAdjacentHTML('beforeend', `
					<video id="webcam-recording-media" autoplay muted height="250"></video>
				`);
				
				const webcam = headerImgContainer.querySelector('#webcam-recording-media');
				webcam.srcObject = window.mereos.globalStream;
				
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-hollow-btn">${i18next.t('previous_step')}</button>
					<button class="orange-filled-btn">${i18next.t('record_video')}</button>
				`);
				
				btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);
				btnContainer.querySelector('.orange-filled-btn').addEventListener('click', () => handleStartRecording('startRecording'));
			} catch (error) {
				logger.error('Error getting user media after camera check:', error);
				cameraAvailable = false;
				textMessage = 'camera_access_lost';
				updateUI();
			}
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

	checkCameraAvailability().then(() => {
		updateUI();
	});

	updateUI();

	i18next.on('languageChanged', () => {
		updateUI();
	});
};