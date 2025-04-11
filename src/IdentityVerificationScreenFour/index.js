import i18next from 'i18next';

import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { showTab } from '../ExamsPrechecks';

import { getDateTime, getSecureFeatures, logger, registerEvent, updatePersistData } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';

import '../assets/css/step4.css';
import { uploadFileInS3Folder } from '../services/general.services.js';

export const IdentityVerificationScreenFour = async (tabContent) => {
	if (tabContent.querySelector('.screen-four-container')) return; 
	window.userMediaStream = null;	
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
				mediaRecorder = new MediaRecorder(window.userMediaStream);

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
		loading=false;
		recordingMode ='startRecording';
		textMessage = 'scan_your_room';
		updateUI();
	};

	const handleStopRecording = async () => {
		clearInterval(window.recordingDotInterval);
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
			loading=false;
			blob=null;
			recordingMode ='startRecording';
			textMessage = 'scan_your_room';
			updateUI();
			if (window.userMediaStream) {
				window.userMediaStream.getTracks().forEach(track => track.stop());
				window.userMediaStream = null;
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
		loading=false;
		recordingMode ='startRecording';
		textMessage = 'scan_your_room';
		blob=null;
		updateUI();
		updatePersistData('preChecksSteps',{ audioDetection:false,roomScanningVideo:false });
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
			container = document.createElement('div');
			container.className = 'screen-four-container';
			container.id = 'screen-four-main-container';
			tabContent.appendChild(container);
		}
		container.innerHTML = '';

		const stepsContainer = document.createElement('div');
		renderIdentityVerificationSteps(stepsContainer, 4);

		const wrapper = document.createElement('div');
		wrapper.className = 'ivsf-wrapper';

		const headerTitle = document.createElement('div');
		headerTitle.className = 'room-scan-header-title';
		headerTitle.textContent = i18next.t('workspace_checking');

		const message = document.createElement('div');
		message.className = 'ivsf-msg';
		message.textContent = i18next.t('workspace_checking_msg');

		const headerImgContainer = document.createElement('div');
		headerImgContainer.className = 'ivsf-header-img-container';

		if (showPlayer && blob) {
			const refVideo = document.createElement('video');
			refVideo.id = 'myVideo';
			refVideo.className = 'my-recorded-video2';
			refVideo.controls = true;
			refVideo.autoplay = true;
			refVideo.src = URL.createObjectURL(blob);
			headerImgContainer.appendChild(refVideo);
		} else {
			if (recordingMode === 'beingRecorded') {
				const recordingBadge = document.createElement('div');
				recordingBadge.className = 'ivsf-recording-badge-container';

				const dot = document.createElement('img');
				dot.className = 'ivsf-recording-dot';
				dot.src = `${ASSET_URL}/white-dot.svg`; // Start with the white dot
				dot.alt = 'recording-dot';

				let isRed = false;
				const toggleDot = setInterval(() => {
					dot.src = `${ASSET_URL}/${isRed ? 'white-dot.svg' : 'red-dot.svg'}`;
					isRed = !isRed;
				}, 1000);
				window.recordingDotInterval = toggleDot;
				const webcam = document.createElement('video');
				webcam.autoplay = true;
				webcam.muted = true;
				webcam.height = 250;
				webcam.id = 'webcam-recorded-media';
				webcam.srcObject = window.userMediaStream;

				recordingBadge.appendChild(dot);
				recordingBadge.appendChild(document.createTextNode(`${i18next.t('recording')}`));
				headerImgContainer.appendChild(recordingBadge);
				headerImgContainer.appendChild(webcam);
			}
		}

		wrapper.appendChild(headerTitle);
		wrapper.appendChild(message);
		wrapper.appendChild(stepsContainer);
		wrapper.appendChild(headerImgContainer);

		const queryMsg = document.createElement('div');
		queryMsg.className = 'ivsf-query-msg';
		queryMsg.textContent = i18next.t(textMessage);
		if (textMessage === 'something_went_wrong_please_upload_again') {
			queryMsg.style.color = '#E95E5E';
		}
		wrapper.appendChild(queryMsg);

		const btnContainer = document.createElement('div');
		btnContainer.className = 'ivsf-btn-container';

		if (recordingMode === 'startRecording') {
			const mediaOptions = {
				audio: localStorage.getItem('microphoneID') !== null ? { deviceId: { exact: localStorage.getItem('microphoneID') }} : true,
				video: videoConstraints.video,
			};

			window.userMediaStream = await navigator.mediaDevices.getUserMedia(mediaOptions);
			const webcam = document.createElement('video');

			webcam.autoplay = true;
			webcam.muted = true;
			webcam.height = 250;
			webcam.id = 'webcam-recording-media';
			webcam.srcObject = window.userMediaStream;
			headerImgContainer.appendChild(webcam);

			const prevButton = createButton(`${i18next.t('previous_step')}`, 'orange-hollow-btn', prevStep);
			const recordButton = createButton(`${i18next.t('record_video')}`, 'orange-filled-btn', () => handleStartRecording('startRecording'));
			btnContainer.appendChild(prevButton);
			btnContainer.appendChild(recordButton);
		} else if (recordingMode === 'beingRecorded') {
			const prevButton = createButton(`${i18next.t('previous_step')}`, 'orange-hollow-btn', prevStep);
			const stopButton = createButton(`${i18next.t('stop_recording')}`, 'orange-filled-btn', handleStopRecording);
			stopButton.disabled = stopButtonDisabled;
			const prevStepsEntities = ['verify_candidate','verify_id','record_audio'];
			if(secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0){
				btnContainer.appendChild(prevButton);
			}
			btnContainer.appendChild(stopButton);
		} else if (recordingMode === 'stopRecording' || recordingMode === 'uploaded_file') {
			const resetButton = createButton(`${i18next.t('reset')}`, 'orange-hollow-btn', handleRestartRecording);
			btnContainer.appendChild(resetButton);

			if (recordingMode !== 'uploaded_file') {
				const uploadButton = createButton(`${i18next.t('upload')}`, 'orange-filled-btn', uploadUserRoomVideo);
				uploadButton.disabled = loading;
				btnContainer.appendChild(uploadButton);
			} else {
				const nextButton = createButton(`${i18next.t('next_step')}`, 'orange-filled-btn', nextStep);
				btnContainer.appendChild(nextButton);
			}
		}

		wrapper.appendChild(btnContainer);
		container.appendChild(wrapper);
	};


	const createButton = (text, className, onClick) => {
		const button = document.createElement('button');
		button.textContent = text;
		button.className = className;
		button.addEventListener('click', onClick);
		return button;
	};

	handleStartRecording();

	updateUI();

	i18next.on('languageChanged', () => {
		updateUI();
	});
};
