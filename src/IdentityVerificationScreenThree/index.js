import i18next from 'i18next';

import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { showTab } from '../ExamsPrechecks';

import { findLastVisitedRoute, findPreviousPrecheckStep, getDateTime, getSecureFeatures, logger, registerEvent, sentryExceptioMessage, updatePersistData } from '../utils/functions';

export const IdentityVerificationScreenThree = async (tabContent) => {
	let canvasRef = null;
	let audioContext;
	let analyserNode;
	let disabledBtn = false;
	let recordingTimer = null;
	let isRecordingActive = false;
	let msg = {
		type: '',
		text: 'be_loud_clear'
	};
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];

	const schoolTheme = JSON.parse(localStorage.getItem('schoolTheme'));

	let animationFrameId = null;

	const initializeAudioContext = async () => {
		try {
			const audioPermission = await navigator.permissions.query({ name: 'microphone' });
			if (audioPermission.state === 'granted') {
				window.mereos.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

				audioContext = new AudioContext();
				analyserNode = audioContext.createAnalyser();
				analyserNode.fftSize = 2048;
				const mediaStreamSource = audioContext.createMediaStreamSource(window.mereos.audioStream);
				mediaStreamSource.connect(analyserNode);
				return true;
			} else {
				throw audioPermission.state;
			}
		} catch (error) {
			sentryExceptioMessage(error,{type:'error',message:'No mircophone detected'});
			logger.error('no_mircophone_detected:', error);
			return false;
		}
	};

	const drawAudioSpikes = async () => {
		if (!(await initializeAudioContext())) {
			return;
		}

		const canvas = canvasRef || window.mereos.shadowRoot.getElementById('audio-wavesform-canvas');
		if (!canvas) return;
		
		const canvasCtx = canvas.getContext('2d');
		if (!canvasCtx) return;

		const drawOnCanvas = () => {
			if (!analyserNode) return;
			
			const bufferLength = analyserNode.frequencyBinCount;
			const frequencyData = new Uint8Array(bufferLength);
			analyserNode.getByteFrequencyData(frequencyData);

			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
			canvasCtx.fillStyle = schoolTheme?.theming || '#FF961B';
			const barWidth = (canvas.width / bufferLength) * 8.5;
			let barHeight;
			let x = 0;

			for (let i = 0; i < bufferLength; i++) {
				barHeight = frequencyData[i] / 2;
				canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
				x += barWidth + 1;
			}

			if (!animationFrameId) {
				animationFrameId = requestAnimationFrame(() => {
					animationFrameId = null;
					drawOnCanvas();
				});
			}
		};

		drawOnCanvas();
	};

	const startRecording = async () => {
		if (isRecordingActive) return;

		if (recordingTimer) {
			clearInterval(recordingTimer);
			recordingTimer = null;
		}

		if (!(await initializeAudioContext())) {
			msg.type = 'unsuccessful';
			msg.text = 'audio_test_failed';
			updateUIText();
			return;
		}

		isRecordingActive = true;
		msg.type = '';
		msg.text = 'recording';
		disabledBtn = true;
		updateUIText();
		updateButtons();

		drawAudioSpikes();

		let counter = 0;
		recordingTimer = setInterval(() => {
			try {
				counter += 1;
				const profileSettings = getSecureFeature?.settings || [];

				if (!analyserNode) {
					throw 'analyser_not_available';
				}

				const bufferLength = analyserNode.frequencyBinCount;
				const frequencyData = new Uint8Array(bufferLength);
				analyserNode.getByteFrequencyData(frequencyData);

				let sumSquares = 0;
				for (let i = 0; i < bufferLength; i++) {
					sumSquares += (frequencyData[i] / 255) ** 2;
				}
				const rms = Math.sqrt(sumSquares / bufferLength);
				const requiredLevel = profileSettings?.audio_level || 0.15;
				
				if (rms > requiredLevel) {
					clearInterval(recordingTimer);
					recordingTimer = null;
					isRecordingActive = false;
					disabledBtn = false;
					msg.type = 'successful';
					msg.text = 'audio_test_passed';
					updateUIText();
					updateButtons();
				} else if (counter >= 15) {
					throw 'timeout';
				}
			} catch (err) {
				clearInterval(recordingTimer);
				recordingTimer = null;
				isRecordingActive = false;
				disabledBtn = false;
				msg.type = 'unsuccessful';
				msg.text = 'audio_test_failed';
				updateUIText();
				updateButtons();
			}
		}, 1000);
	};

	const stopRecording = () => {
		if (recordingTimer) {
			clearInterval(recordingTimer);
			recordingTimer = null;
		}
		
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
		
		isRecordingActive = false;
		
		if (window.mereos.audioStream) {
			window.mereos.audioStream.getTracks().forEach(track => track.stop());
			window.mereos.audioStream = null;
		}
	};

	const nextStep = async () => {
		stopRecording();
		cleanup();
		
		updatePersistData('preChecksSteps', { audioDetection: true });
		registerEvent({ eventType: 'success', notify: false, eventName: 'audio_check_completed', eventValue: getDateTime() });
		showTab('IdentityVerificationScreenFour');
	};

	const prevStep = () => {
		stopRecording();
		cleanup();
		isRecordingActive = false;
		canvasRef = null;
		const previousRoute = findLastVisitedRoute('IdentityVerificationScreenThree');
		const previousStep = findPreviousPrecheckStep('IdentityVerificationScreenThree');
		updatePersistData('preChecksSteps',{ [previousStep]:false });
		showTab(previousRoute);
	};

	const updateUIText = () => {
		const wrapper = tabContent.querySelector('.ivst-wrapper');
		if (!wrapper) return;

		const headerTitle = wrapper.querySelector('.ivst-header-title');
		if (headerTitle) {
			headerTitle.textContent = i18next.t('audio_check');
		}

		const audioText = wrapper.querySelector('.ivst-audio-text');
		if (audioText) {
			audioText.textContent = i18next.t('no_point_in_running_leave_in_time');
		}

		const messageElement = wrapper.querySelector('.audio-test-msg');
		if (messageElement) {
			messageElement.textContent = i18next.t(msg.text);
			messageElement.style.color = msg.type === 'unsuccessful' ? '#E95E5E' : '';
		}
	};

	const updateButtons = () => {
		const wrapper = tabContent.querySelector('.ivst-wrapper');
		if (!wrapper) return;

		const btnContainer = wrapper.querySelector('.ivst-btn-container');
		if (!btnContainer) return;

		btnContainer.innerHTML = '';

		if (msg.type === '' || isRecordingActive) {
			// Don't show previous step button when recording is in progress
			if (isRecordingActive) {
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-filled-btn" disabled>${i18next.t('recording')}</button>
				`);
			} else {
				// Show previous step button only when NOT recording
				const prevStepsEntities = ['verify_candidate', 'verify_id'];
				const showPrevButton = secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0;
				
				if (showPrevButton) {
					btnContainer.insertAdjacentHTML('beforeend', `
						<button class="orange-hollow-btn" ${disabledBtn ? 'disabled' : ''}>${i18next.t('previous_step')}</button>
					`);
					btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);
				}
				
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-filled-btn" ${disabledBtn ? 'disabled' : ''}>${i18next.t('record_audio')}</button>
				`);
				btnContainer.querySelector('.orange-filled-btn').addEventListener('click', startRecording);
			}
		} else if (msg.type === 'unsuccessful') {
			const prevStepsEntities = ['verify_candidate', 'verify_id'];
			const showPrevButton = secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0;

			if (showPrevButton) {
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-hollow-btn">${i18next.t('previous_step')}</button>
				`);
				btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);
			}

			btnContainer.insertAdjacentHTML('beforeend', `
				<button class="orange-filled-btn">${i18next.t('re_record_audio')}</button>
			`);
			btnContainer.querySelector('.orange-filled-btn').addEventListener('click', startRecording);
		} else {
			// Audio test passed - show re-record and done buttons
			const prevStepsEntities = ['verify_candidate', 'verify_id'];
			const showPrevButton = secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0;
			
			if (showPrevButton) {
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-hollow-btn">${i18next.t('re_record_audio')}</button>
				`);
				btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', startRecording);
			} else {
				// If no previous step button was showing before, just show re-record as hollow
				btnContainer.insertAdjacentHTML('beforeend', `
					<button class="orange-hollow-btn">${i18next.t('re_record_audio')}</button>
				`);
				btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', startRecording);
			}
			
			btnContainer.insertAdjacentHTML('beforeend', `
				<button class="orange-filled-btn">${i18next.t('done')}</button>
			`);
			btnContainer.querySelector('.orange-filled-btn').addEventListener('click', nextStep);
		}
	};

	const updateUI = () => {
		let container = tabContent.querySelector('.ivst-container');
		if (!container) {
			tabContent.insertAdjacentHTML('beforeend', `
				<div class="ivst-container"></div>
			`);
			container = tabContent.querySelector('.ivst-container');
		}

		const stepsContainer = document.createElement('div');
		renderIdentityVerificationSteps(stepsContainer, 3);

		let wrapper = container.querySelector('.ivst-wrapper');
		if (!wrapper) {
			container.insertAdjacentHTML('beforeend', `
				<div class="ivst-wrapper">
					<div class="ivst-header-title">${i18next.t('audio_check')}</div>
					<div class="ivst-steps-container"></div>
					<div class="ivst-audio-text" style="text-align: center;">${i18next.t('no_point_in_running_leave_in_time')}</div>
					<canvas id="audio-wavesform-canvas" width="800" height="200"></canvas>
					<div class="audio-test-msg" id="audio-test-msg">${i18next.t(msg.text)}</div>
					<div class="ivst-btn-container"></div>
				</div>
			`);

			wrapper = container.querySelector('.ivst-wrapper');
			const stepsContainerElement = wrapper.querySelector('.ivst-steps-container');
			stepsContainerElement.appendChild(stepsContainer);

			canvasRef = window.mereos.shadowRoot.getElementById('audio-wavesform-canvas');
		} else {
			const stepsContainerElement = wrapper.querySelector('.ivst-steps-container');
			stepsContainerElement.innerHTML = '';
			stepsContainerElement.appendChild(stepsContainer);
		}

		updateUIText();
		updateButtons();

		drawAudioSpikes();
	};

	updateUI();

	i18next.on('languageChanged', () => {
		updateUIText();
		updateButtons();
	});

	const cleanup = () => {
		if (recordingTimer) {
			clearInterval(recordingTimer);
			recordingTimer = null;
		}
		
		if (window.mereos.audioStream) {
			window.mereos.audioStream.getTracks().forEach(track => track.stop());
			window.mereos.audioStream = null;
		}
		
		if (audioContext && audioContext.state !== 'closed') {
			audioContext.close();
		}
		
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (canvasRef) {
			const canvasCtx = canvasRef.getContext('2d');
			if (canvasCtx) {
				canvasCtx.clearRect(0, 0, canvasRef.width, canvasRef.height);
			}
		}
		
		isRecordingActive = false;
	};

	return {
		cleanup
	};
};