import i18next from 'i18next';

import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { showTab } from '../ExamsPrechecks';

import { dataURIToBlob, logger, registerEvent, updatePersistData, userRekognitionInfo } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { uploadFileInS3Folder } from '../services/general.services.js';

export const IdentityVerificationScreenOne = async (tabContent) => {
	let state = {
		isUploading: false,
		captureMode: 'take',
		imageSrc: null,
		failedAttempts: 0,
		webcamError: false, // Track webcam availability
		videoConstraints: {
			video: localStorage.getItem('deviceId') ? { deviceId: { exact: localStorage.getItem('deviceId') } } : true,
			width: 350,
			height: 280,
			facingMode: 'user',
		},
		msg: {
			type: 'checking',
			text: 'center_your_face',
		},
		isProcessing: false, // Added processing state
	};

	let videoElement = null;

	const handleWebcamError = () => {
		state.webcamError = true;
		state.msg = {
			type: 'unsuccessful',
			text: 'webcam_error'
		};
		renderUI();
		registerEvent({
			eventType: 'error',
			notify: true,
			eventName: 'webcam_error'
		});
	};

	const startWebcam = async () => {
		try {
			videoElement = document.createElement('video');
			videoElement.width = state.videoConstraints.width;
			videoElement.height = state.videoConstraints.height;
			videoElement.autoplay = true;
            
			window.mereos.globalStream = await navigator.mediaDevices.getUserMedia(state.videoConstraints);
			videoElement.srcObject = window.mereos.globalStream;
			
			// Add track ended listener
			const tracks = window.mereos.globalStream.getTracks();
			tracks.forEach(track => {
				track.addEventListener('ended', () => {
					handleWebcamError();
				});
			});
            
			if (tabContent) {
				const ivsoWebcamContainer = tabContent.querySelector('.ivso-webcam-container');
				if (ivsoWebcamContainer) {
					ivsoWebcamContainer.innerHTML = '';
					ivsoWebcamContainer.appendChild(videoElement);
				}
			}
			
			// Reset webcamError if camera starts successfully
			state.webcamError = false;
		} catch (err) {
			logger.error('Error accessing webcam:', err);
			handleWebcamError();
		}
	};

	const capturePhoto = async () => {
		const canvas = document.createElement('canvas');
		canvas.width = videoElement.videoWidth;
		canvas.height = videoElement.videoHeight;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

		const imageSrc = canvas.toDataURL('image/jpeg');
		state = {
			...state,
			captureMode: 'retake',
			imageSrc: imageSrc,
			isProcessing: true, // Set processing flag
			msg: {
				type: 'checking',
				text: 'please_wait_we_processing',
			},
		};
		renderUI();
		handleImageProcessing();
	};

	const dataURLtoFile = async (dataurl, filename = 'screenshot.png') => {
		const res = await fetch(dataurl);
		const blob = await res.blob();
		return new File([blob], filename, { type: blob.type });
	};

	const handleImageProcessing = async () => {
		if (state.imageSrc) {
			const img = new Image();
			const data = new FormData();
			const imageUrl = await dataURLtoFile(state.imageSrc);
			data.append('image', imageUrl);
            
			try {
				const resp = await userRekognitionInfo(data);
				const predictions = resp?.data?.face?.FaceDetails;
    
				img.onload = async function () {
					// Reset processing flag when done
					state.isProcessing = false;
					
					if (predictions?.length && predictions.length === 1) {
						const face = predictions[0];
    
						const { Pose, Confidence } = face;
						const isFullFace = 
                        Confidence >= 95 &&
                        Math.abs(Pose.Yaw) <= 10 && 
                        Math.abs(Pose.Pitch) <= 10 && 
                        Math.abs(Pose.Roll) <= 10;
    
						if (isFullFace) {
							state = {
								...state,
								imageSrc: state.imageSrc,
								msg: {
									type: 'successful',
									text: 'detected_face_successfully',
								},
							};
							registerEvent({ eventType: 'success', notify: false, eventName: 'detected_face_successfully' });
						} else {
							state.failedAttempts++;
							
							if (state.failedAttempts >= 3) {
								state = {
									...state,
									imageSrc: state.imageSrc,
									msg: {
										type: 'successful',
										text: 'detected_face_successfully',
									},
								};
								registerEvent({ eventType: 'success', notify: false, eventName: 'detected_face_successfully' });
							} else {
								state = {
									...state,
									imageSrc: null,
									captureMode: 'retake',
									msg: {
										type: 'unsuccessful',
										text: 'face_not_detected',
									},
								};
								startWebcam();
								registerEvent({ eventType: 'error', notify: true, eventName: 'face_not_detected' });
							}
						}
					} else if (predictions?.length > 1) {
						state.failedAttempts++;
						
						if (state.failedAttempts >= 3) {
							state = {
								...state,
								imageSrc: state.imageSrc,
								msg: {
									type: 'successful',
									text: 'detected_face_successfully',
								},
							};
							registerEvent({ eventType: 'success', notify: false, eventName: 'detected_face_successfully' });
						} else {
							state = {
								...state,
								imageSrc: null,
								captureMode: 'retake',
								msg: {
									type: 'unsuccessful',
									text: 'multiple_face_detected',
								},
							};
							startWebcam();
							registerEvent({ eventType: 'error', notify: true, eventName: 'multiple_face_detected' });
						}
					} else {
						state.failedAttempts++;
						
						if (state.failedAttempts >= 3) {
							state = {
								...state,
								imageSrc: state.imageSrc,
								msg: {
									type: 'successful',
									text: 'detected_face_successfully',
								},
							};
							registerEvent({ eventType: 'success', notify: false, eventName: 'detected_face_successfully' });
						} else {
							state = {
								...state,
								imageSrc: null,
								captureMode: 'retake',
								msg: {
									type: 'unsuccessful',
									text: 'face_not_detected',
								},
							};
							startWebcam();
							registerEvent({ eventType: 'error', notify: true, eventName: 'face_not_detected' });
						}
					}
    
					renderUI();
				};
				img.src = state.imageSrc;
			} catch (error) {
				logger.error('Error processing the image:', error);
				
				// Reset processing flag on error
				state.isProcessing = false;
				state.failedAttempts++;
				
				if (state.failedAttempts >= 3) {
					state = {
						...state,
						imageSrc: state.imageSrc,
						msg: {
							type: 'successful',
							text: 'detected_face_successfully',
						},
					};
					registerEvent({ eventType: 'success', notify: false, eventName: 'detected_face_successfully' });
				} else {
					state = {
						...state,
						msg: {
							type: 'error',
							text: 'face_processing_failed',
						},
					};
				}
				renderUI();
			}
		}
	};
    
	const nextStep = () => {
		if(window.mereos.globalStream){
      window.mereos.globalStream?.getTracks()?.forEach((track) => track.stop());
		}
		updatePersistData('preChecksSteps',{ userPhoto:true });
		showTab('IdentityVerificationScreenTwo');
	};

	const uploadUserCapturedPhoto = async () => {
		try {
			state.isUploading = true;
			renderUI();
			state = {
				...state,
				msg: {
					type: 'loading',
					text: 'file_is_being_uploaded',
				},
			};
    
			const blob = dataURIToBlob(state.imageSrc);
    
			let resp = await uploadFileInS3Folder({
				folderName: 'candidate_images',
				file: blob,
			});
    
			if (resp?.data?.file_url) {
				updatePersistData('session', { candidatePhoto: resp.data.file_url });
				state = {
					...state,
					captureMode: 'uploaded_photo',
					msg: {
						type: 'waiting',
						text: 'candidate_photo_uploaded_successfully',
					},
				};
				registerEvent({ eventType: 'success', notify: false, eventName: 'candidate_photo_uploaded_successfully' });
			}
		} catch (e) {
			logger.error('Upload failed:', e);
			state = {
				...state,
				captureMode: 'take',
				imageSrc: null,
				isProcessing: false,
				msg: {
					type: 'checking',
					text: 'something_went_wrong_please_upload_again',
				},
			};
			registerEvent({ eventType: 'error', notify: false, eventName: 'internet_connection_unstable' });
		} finally {
			state.isUploading = false;
			renderUI();
		}
	};

	const renderUI = () => {
		let ivsoContainer = tabContent.querySelector('.ivso-container');
        
		if (!ivsoContainer) {
			tabContent.insertAdjacentHTML('beforeend', '<div class="ivso-container"></div>');
			ivsoContainer = tabContent.querySelector('.ivso-container');
		} else {
			ivsoContainer.innerHTML = '';
		}
        
		const stepsContainer = document.createElement('div');
		renderIdentityVerificationSteps(stepsContainer, 1);
        
		const messageColorStyle = (state.msg.type === 'unsuccessful' || 
      state.msg.type === 'something_went_wrong_please_upload_again') 
			? 'style="color: #E95E5E;"' : '';
        
		let contentHTML = `
            <div class="ivso-first-wrapper">
                <div class="ivso-header-title">${i18next.t('webcam_diagnostics')}</div>
                <div class="first-header-msg">${i18next.t('your_face_must_visible_on_screen')}</div>
                <div class="identity-steps-container">${stepsContainer.innerHTML}</div>
        `;
        
		contentHTML += `<div class="ivso-header-img-container">`;
        
		if (state.imageSrc) {
			contentHTML += `<img src="${state.imageSrc}" class="ivso-captured-img">`;
		} else if (state.webcamError) {
			// Show no camera icon when webcam is unavailable
			const theme = JSON.parse(localStorage.getItem('schoolTheme'))?.theming;
			const isDarkTheme = theme === 'dark';
			const cameraIcon = isDarkTheme ? 
				`${ASSET_URL}/no-camera.svg`:
				`${ASSET_URL}/no-camera-white.svg`;
				
			contentHTML += `<img src="${cameraIcon}" class="ivso-broken-camera" alt="broken-camera" 
				style="width: 250px; height: 250px; opacity: 0.5; margin: auto;">`;
		} else {
			contentHTML += `<img src="${ASSET_URL}/screen-centered-grid.svg" class="ivso-screen-grid">`;
		}
      
		contentHTML += `</div>`;

		contentHTML += `<div class="ivso-webcam-container"></div>`;
        
		if (state.msg.text) {
			contentHTML += `
                <div class="ivso-msg" id="success-msg" ${messageColorStyle}>
                    ${i18next.t(state.msg.text)}
                </div>
            `;
		}

		contentHTML += `<div class="ivso-btn-container">`;
        
		// Only show retake button when not processing and in retake mode
		if (state.captureMode === 'retake' && !state.isProcessing) {
			contentHTML += `
                <button class="orange-hollow-btn" id="retake-btn">
                    ${i18next.t('retake_photo')}
                </button>
            `;
		}
        
		if (state.captureMode === 'uploaded_photo') {
			contentHTML += `
                <button class="orange-filled-btn" id="next-btn">
                    ${i18next.t('next_step')}
                </button>
            `;
		}
        
		if (state.captureMode === 'take') {
			// Disable take photo button if webcam error exists
			const isDisabled = state.webcamError || state.isProcessing ? 'disabled' : '';
			contentHTML += `
                <button class="orange-filled-btn" id="take-photo-btn" ${isDisabled}>
                    ${i18next.t('take_photo')}
                </button>
            `;
		}
        
		if (state.captureMode === 'retake') {
			const isDisabled = state.isUploading || state.msg.type !== 'successful' || state.isProcessing ? 'disabled' : '';
			contentHTML += `
                <button class="orange-filled-btn" id="upload-btn" ${isDisabled}>
                    ${i18next.t('upload')}
                </button>
            `;
		}
        
		contentHTML += `</div>`;
        
		if (state.captureMode === 'retake') {
			contentHTML += `<div class="ivso-query-msg"></div>`;
		}
        
		contentHTML += `</div>`;
        
		ivsoContainer.insertAdjacentHTML('beforeend', contentHTML);
        
		// Add event listeners only when elements exist
		const retakeBtn = window.mereos.shadowRoot.getElementById('retake-btn');
		if (retakeBtn) {
			retakeBtn.addEventListener('click', () => {
				state = {
					...state,
					imageSrc: null,
					captureMode: 'take',
					isUploading: false,
					isProcessing: false,
					webcamError: false, // Reset webcam error on retake
					videoConstraints: {
						...state.videoConstraints,
						deviceId: localStorage.getItem('deviceId') || undefined,
					},
					msg: {
						type: 'checking',
						text: 'center_your_face',
					},
				};
				renderUI();
				startWebcam();
			});
		}
        
		if (state.captureMode === 'uploaded_photo') {
			const nextBtn = window.mereos.shadowRoot.getElementById('next-btn');
			if (nextBtn) {
				nextBtn.addEventListener('click', nextStep);
			}
		}
        
		if (state.captureMode === 'take') {
			const takePhotoBtn = window.mereos.shadowRoot.getElementById('take-photo-btn');
			if (takePhotoBtn && !state.webcamError) {
				takePhotoBtn.addEventListener('click', capturePhoto);
			}
		}
        
		if (state.captureMode === 'retake' && state.msg.type === 'successful') {
			const uploadBtn = window.mereos.shadowRoot.getElementById('upload-btn');
			if (uploadBtn && !state.isProcessing) {
				uploadBtn.addEventListener('click', uploadUserCapturedPhoto);
			}
		}
		
		const hasActiveTracks = window.mereos.globalStream?.getTracks?.().some(track => track.readyState === 'live');
		if (!state.imageSrc && !state.webcamError && (!window.mereos.globalStream || !hasActiveTracks)) {
			startWebcam();
		} else if (!state.imageSrc && !state.webcamError) {
			const ivsoWebcamContainer = tabContent.querySelector('.ivso-webcam-container');
			if (ivsoWebcamContainer && videoElement) {
				ivsoWebcamContainer.appendChild(videoElement);
			}
		}
	};
	
	startWebcam();
	renderUI();

	i18next.on('languageChanged', () => {
		renderUI();
        
		const msg = window.mereos.shadowRoot.getElementById('success-msg');
		if (msg && state.msg.text) {
			msg.textContent = i18next.t(state.msg.text);
		}
	});
};