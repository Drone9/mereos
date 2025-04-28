import i18next from 'i18next';

import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { shadowRoot, showTab } from '../ExamsPrechecks';

import { getDateTime, getSecureFeatures, logger, registerEvent, updatePersistData } from '../utils/functions';

import '../assets/css/step3.css';

export const IdentityVerificationScreenThree = async (tabContent) => {
	let canvasRef = null;
	let audioStream = null;
	let audioContext;
	let analyserNode;
	let disabledBtn = false;
	let msg = {
		type: '',
		text: 'be_loud_clear'
	};
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];

	const schoolTheme = JSON.parse(localStorage.getItem('schoolTheme'));

	let animationFrameId = null;

	const drawAudioSpikes = async () => {
		try {
			stopRecording(); 
			const audioPermission = await navigator.permissions.query({ name: 'microphone' });
			if (audioPermission.state === 'granted') {
				audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

				audioContext = new AudioContext();
				analyserNode = audioContext.createAnalyser();
				analyserNode.fftSize = 2048;
				const mediaStreamSource = audioContext.createMediaStreamSource(audioStream);
				mediaStreamSource.connect(analyserNode);

				const canvas = canvasRef || shadowRoot.getElementById('audio-wavesform-canvas');
				const canvasCtx = canvas?.getContext('2d');

				const drawOnCanvas = () => {
					if (!animationFrameId) { 
						animationFrameId = requestAnimationFrame(() => {
							const bufferLength = analyserNode.frequencyBinCount;
							const frequencyData = new Uint8Array(bufferLength);
							analyserNode.getByteFrequencyData(frequencyData);
			
							canvasCtx?.clearRect(0, 0, canvas.width, canvas.height);
							canvasCtx.fillStyle = schoolTheme?.theming || '#FF961B';
							const barWidth = (canvas.width / bufferLength) * 8.5;
							let barHeight;
							let x = 0;
	
							for (let i = 0; i < bufferLength; i++) {
								barHeight = frequencyData[i] / 2;
								canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
								x += barWidth + 1;
							}
	
							animationFrameId = null;
							drawOnCanvas(); 
						});
					}
				};
			
				drawOnCanvas();
			} else {
				throw audioPermission.state;
			}
		} catch (error) {
			logger.error('no_mircophone_detected:', error);
		}
	};

	const startRecording = () => {
		if (!animationFrameId) {
			drawAudioSpikes();
		}

		msg.type = ''; 
		msg.text = 'recording'; 
		disabledBtn = true;
		updateUI();

		let counter = 0;
		const timer = setInterval(() => {
			try {
				counter += 1;
				const profileSettings = getSecureFeature?.settings || [];

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
					clearInterval(timer);
					disabledBtn = false;
					msg.type = 'successful';
					msg.text = 'audio_test_passed'; 
					updateUI();
				} else if (counter >= 15) {
					throw 'error';
				}
			} catch (err) {
				clearInterval(timer);
				disabledBtn = false;
				msg.type = 'unsuccessful';
				msg.text = 'audio_test_failed';
				updateUI();
			}
		}, 1000);
	};

	const stopRecording = () => {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
		if (audioStream) {
			audioStream.getTracks().forEach(track => track.stop());
		}
	};

	const nextStep = async () => {
		if (audioStream) {
			audioStream.getAudioTracks().forEach(track => track.stop());
		}
		cleanup();
		updatePersistData('preChecksSteps', { audioDetection: true });
		registerEvent({ eventType: 'success', notify: false, eventName: 'audio_check_completed', eventValue: getDateTime() });
		showTab('IdentityVerificationScreenFour');
	};

	const prevStep = () => {
		cleanup();
		updatePersistData('preChecksSteps', { audioDetection: false });
	
		let navHistory = JSON.parse(localStorage.getItem('navHistory'));
		const currentIndex = navHistory.indexOf('IdentityVerificationScreenThree');
		const previousPage = currentIndex > 0 ? navHistory[currentIndex - 1] : null;
	
		if (previousPage === 'Prevalidationinstruction') {
			updatePersistData('preChecksSteps', { preValidation: false });
		} else if (previousPage === 'IdentityVerificationScreenTwo') {
			updatePersistData('preChecksSteps', { identityCardPhoto: false });
		} else if (previousPage === 'IdentityVerificationScreenOne') {
			updatePersistData('preChecksSteps', { userPhoto: false });
		}
	
		showTab(previousPage);
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
			
			canvasRef = shadowRoot.getElementById('audio-wavesform-canvas');
		} else {
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
			
			const stepsContainerElement = wrapper.querySelector('.ivst-steps-container');
			stepsContainerElement.innerHTML = '';
			stepsContainerElement.appendChild(stepsContainer);
		}
		
		const btnContainer = wrapper.querySelector('.ivst-btn-container');
		btnContainer.innerHTML = ''; // Clear existing buttons
		
		if (msg.type === '') {
			btnContainer.insertAdjacentHTML('beforeend', `
				<button class="orange-hollow-btn" ${disabledBtn ? 'disabled' : ''}>${i18next.t('previous_step')}</button>
				<button class="orange-filled-btn" ${disabledBtn ? 'disabled' : ''}>${i18next.t('record_audio')}</button>
			`);
			
			btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', prevStep);
			btnContainer.querySelector('.orange-filled-btn').addEventListener('click', startRecording);
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
			btnContainer.insertAdjacentHTML('beforeend', `
				<button class="orange-hollow-btn">${i18next.t('re_record_audio')}</button>
				<button class="orange-filled-btn">${i18next.t('done')}</button>
			`);
			
			btnContainer.querySelector('.orange-hollow-btn').addEventListener('click', startRecording);
			btnContainer.querySelector('.orange-filled-btn').addEventListener('click', nextStep);
		}

		if (canvasRef) {
			drawAudioSpikes();
		}
	};

	updateUI();
	drawAudioSpikes();

	i18next.on('languageChanged', () => {
		const msgElement = shadowRoot.getElementById('audio-test-msg');
		if (msgElement && msg.text) {
			msgElement.textContent = i18next.t(msg.text);
		}
		updateUI();
	});

	const cleanup = () => {
		if (audioStream) {
			audioStream.getTracks().forEach(track => track.stop()); 
		}
		if (audioContext) {
			audioContext.close(); 
		}
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}

		if (canvasRef) {
			const canvasCtx = canvasRef.getContext('2d');
			if (canvasCtx) {
				canvasCtx.clearRect(0, 0, canvasRef.width, canvasRef.height);
			}
		}
	};

	return {
		cleanup
	};
};