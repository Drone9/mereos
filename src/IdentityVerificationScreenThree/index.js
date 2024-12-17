import { getDateTime, getSecureFeatures, logger, registerEvent, updatePersistData } from '../utils/functions';
import '../assets/css/step3.css';
import i18next from 'i18next';
import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { showTab } from '../ExamsPrechecks';

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

				const canvas = canvasRef || document.getElementById('audio-wavesform-canvas');
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
			animationFrameId = null; // Reset the ID
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
		showTab(navHistory[navHistory.length - 2]);
	};

	const updateUI = () => {
		let container = tabContent.querySelector('.ivst-container');
		if (!container) {
			container = document.createElement('div');
			container.className = 'ivst-container';
			tabContent.appendChild(container);
		}

		const stepsContainer = document.createElement('div');
		renderIdentityVerificationSteps(stepsContainer, 3);
		let wrapper = container.querySelector('.ivst-wrapper');
    
		if (!wrapper) {
			wrapper = document.createElement('div');
			wrapper.className = 'ivst-wrapper';

			const headerTitle = document.createElement('div');
			headerTitle.className = 'ivst-header-title';
			wrapper.appendChild(headerTitle);

			wrapper.appendChild(stepsContainer);

			const message = document.createElement('div');
			message.className = 'ivst-msg';
        
			const audioText = document.createElement('div');
			audioText.className = 'ivst-audio-text';
			audioText.style.textAlign = 'center';
			wrapper.appendChild(audioText);

			canvasRef = document.createElement('canvas');
			canvasRef.width = 800;
			canvasRef.id = 'audio-wavesform-canvas';
			canvasRef.height = 200;

			wrapper.appendChild(canvasRef);
			wrapper.appendChild(message);
			container.appendChild(wrapper);
		}

		const headerTitle = wrapper.querySelector('.ivst-header-title');
		if (headerTitle) {
			headerTitle.textContent = i18next.t('audio_check');
		}

		const audioText = wrapper.querySelector('.ivst-audio-text');
		if (audioText) {
			audioText.textContent = i18next.t('no_point_in_running_leave_in_time');
		}

		const messageElement = wrapper.querySelector('.ivst-msg');
		if (messageElement) {
			messageElement.textContent = i18next.t(msg.text);
			if (msg.type === 'unsuccessful') {
				messageElement.style.color = '#E95E5E';
			} else {
				messageElement.style.color = '';
			}
		}

		let btnContainer = wrapper.querySelector('.ivst-btn-container');
		if (!btnContainer) {
			btnContainer = document.createElement('div');
			btnContainer.className = 'ivst-btn-container';
			wrapper.appendChild(btnContainer);
		} else {
			btnContainer.innerHTML = '';
		}

		if (msg.type === '') {
			const prevButton = createButton(`${i18next.t('previous_step')}`, 'orange-hollow-btn', prevStep);
			prevButton.disabled = disabledBtn;
			const recordButton = createButton(`${i18next.t('record_audio')}`, 'orange-filled-btn', startRecording);
			recordButton.disabled = disabledBtn;
			btnContainer.appendChild(prevButton);
			btnContainer.appendChild(recordButton);
		} else if (msg.type === 'unsuccessful') {
			const prevButton = createButton(`${i18next.t('previous_step')}`, 'orange-hollow-btn', prevStep);
			const reRecordButton = createButton(`${i18next.t('re_record_audio')}`, 'orange-filled-btn', startRecording);
			const prevStepsEntities = ['verify_candidate', 'verify_id'];
			if (secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0) {
				btnContainer.appendChild(prevButton);
			}
			btnContainer.appendChild(reRecordButton);
		} else {
			const reRecordButton = createButton(`${i18next.t('re_record_audio')}`, 'orange-hollow-btn', startRecording);
			const doneButton = createButton(`${i18next.t('done')}`, 'orange-filled-btn', nextStep);
			btnContainer.appendChild(reRecordButton);
			btnContainer.appendChild(doneButton);
		}

		if (canvasRef) {
			drawAudioSpikes(); 
		}
	};

	const createButton = (text, className, onClick) => {
		const button = document.createElement('button');
		button.textContent = text;
		button.className = className;
		button.addEventListener('click', onClick);
		return button;
	};

	updateUI();
	drawAudioSpikes();

	i18next.on('languageChanged', () => {
		msg.text = i18next.t(msg.text);
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

