import i18next from 'i18next';

import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { showTab } from '../ExamsPrechecks';

import { getDateTime, getSecureFeatures, logger, registerEvent, updatePersistData } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';

import '../assets/css/step4.css';
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

	const handleStartRecording = async (type) => {
		try {
			if (type === 'startRecording') {
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
		}
	};

	const handleRestartRecording = async () => {
		showPlayer = false;
		loading = false;
		recordingMode = 'startRecording';
		textMessage = 'scan_your_room';
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
		if (window.mereos.globalStream) {
			window.mereos.globalStream.getTracks().forEach(track => track.stop());
			window.mereos.globalStream = null;
		}
		clearInterval(window.mereos.recordingDotInterval);
		updateUI();
		updatePersistData('preChecksSteps', { audioDetection: false, roomScanningVideo: false });
		let navHistory = JSON.parse(localStorage.getItem('navHistory'));
		const currentIndex = navHistory.indexOf('IdentityVerificationScreenFour');
		const previousPage = currentIndex > 0 ? navHistory[currentIndex - 1] : null;
		showTab(previousPage);
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
				<div class="ivsf-query-msg" ${textMessage === 'something_went_wrong_please_upload_again' ? 'style="color: #E95E5E;"' : ''}>${i18next.t(textMessage)}</div>
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
			const mediaOptions = {
				audio: localStorage.getItem('microphoneID') !== null ? { deviceId: { exact: localStorage.getItem('microphoneID') }} : true,
				video: videoConstraints.video,
			};

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

	handleStartRecording();

	updateUI();

	i18next.on('languageChanged', () => {
		updateUI();
	});
};