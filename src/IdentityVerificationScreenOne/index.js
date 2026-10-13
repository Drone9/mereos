import i18next from 'i18next';

import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { showTab } from '../ExamsPrechecks';

import { dataURIToBlob, logger, registerEvent, sentryExceptioMessage, updatePersistData, convertDataIntoParse, addSectionSessionRecord } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { uploadFileInS3Folder, userRekognitionInfo } from '../services/general.services.js';
import { hasVideoFrame, isStreamLive, requestCameraStream, stopStream, waitForVideoReady } from '../utils/camera';

let currentLanguageHandler = null;
let stopPreviousCamera = null;

const videoConstraints = {
	width: 350,
	height: 280,
	facingMode: 'user',
};

export const IdentityVerificationScreenOne = async (tabContent) => {
	if (currentLanguageHandler) {
		i18next.off('languageChanged', currentLanguageHandler);
		currentLanguageHandler = null;
	}
	if (stopPreviousCamera) {
		stopPreviousCamera();
		stopPreviousCamera = null;
	}

	let state = {
		isUploading: false,
		captureMode: 'take',
		imageSrc: null,
		failedAttempts: 0,
		webcamError: false, // Track webcam availability
		webcamLoading: true, // Track webcam loading state
		msg: {
			type: 'checking',
			text: 'center_your_face',
		},
		isProcessing: false, // Added processing state
	};

	let videoElement = null;
	let stream = null;
	let cameraRequestId = 0;

	const stopCamera = () => {
		cameraRequestId++;
		stopStream(stream);
		stream = null;
		if (videoElement) {
			videoElement.srcObject = null;
			videoElement = null;
		}
	};

	const handleWebcamError = () => {
		stopCamera();
		state.webcamError = true;
		state.webcamLoading = false;
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

	// Only one camera request is honoured at a time; a newer request (or leaving the screen)
	// discards the older one and stops its stream, so streams never leak and hold the camera.
	const startWebcam = async () => {
		const requestId = ++cameraRequestId;
		try {
			state.webcamError = false;
			state.webcamLoading = true;
			renderUI();

			const newStream = await requestCameraStream(videoConstraints);
			if (requestId !== cameraRequestId) {
				stopStream(newStream);
				return;
			}
			stopStream(stream);
			stream = newStream;
			window.mereos.globalStream = newStream;

			newStream.getVideoTracks().forEach(track => {
				track.addEventListener('ended', () => {
					if (stream === newStream) handleWebcamError();
				});
			});

			const newVideo = document.createElement('video');
			newVideo.width = videoConstraints.width;
			newVideo.height = videoConstraints.height;
			newVideo.autoplay = true;
			newVideo.muted = true;
			newVideo.playsInline = true;
			newVideo.srcObject = newStream;
			videoElement = newVideo;
			newVideo.play().catch(() => {});

			await waitForVideoReady(newVideo);
			if (requestId !== cameraRequestId) return;

			state.webcamError = false;
			state.webcamLoading = false;
			renderUI();
		} catch (err) {
			if (requestId !== cameraRequestId) return;
			sentryExceptioMessage(err,{type:'error',message:'Error accessing webcam'});
			logger.error('Error accessing webcam:', err);
			handleWebcamError();
		}
	};

	const capturePhoto = async () => {
		if (!hasVideoFrame(videoElement) || state.isProcessing) return;

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
							if(window.mereos.globalCallback){
								window.mereos.globalCallback({ 
									type:'success',
									message: 'detected_face_successfully',
									code:50007
								});
							}
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
								if(window.mereos.globalCallback){
									window.mereos.globalCallback({ 
										type:'success',
										message: 'detected_face_successfully',
										code:50007
									});
								}
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
								if(window.mereos.globalCallback){
									window.mereos.globalCallback({ 
										type:'error',
										message: 'face_not_detected',
										code:40029
									});
								}
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
							if(window.mereos.globalCallback){
								window.mereos.globalCallback({ 
									type:'success',
									message: 'detected_face_successfully',
									code:50007
								});
							}
						
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
							if(window.mereos.globalCallback){
								window.mereos.globalCallback({ 
									type:'error',
									message: 'multiple_face_detected',
									code:40028
								});
							}
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
							if(window.mereos.globalCallback){
								window.mereos.globalCallback({ 
									type:'success',
									message: 'detected_face_successfully',
									code:50007
								});
							}
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
							if(window.mereos.globalCallback){
								window.mereos.globalCallback({ 
									type:'error',
									message: 'face_not_detected',
									code:40027
								});
							}
							registerEvent({ eventType: 'error', notify: true, eventName: 'face_not_detected' });
						}
					}
    
					renderUI();
				};
				img.src = state.imageSrc;
			} catch (error) {
				sentryExceptioMessage(error,{type:'error',message:'Error processing the image'});
				logger.error('Error processing the image:', error);
				
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
					if(window.mereos.globalCallback){
						window.mereos.globalCallback({ 
							type:'success',
							message: 'detected_face_successfully',
							code:50007
						});
					}
					registerEvent({ eventType: 'success', notify: false, eventName: 'detected_face_successfully' });
				} else {
					state = {
						...state,
						msg: {
							type: 'unsuccessful',
							text: 'face_processing_failed',
						},
					};
				}
				renderUI();
			}
		}
	};
    
	const nextStep = () => {
		stopCamera();
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
    
			if (resp?.data?.file_key) {
				updatePersistData('session', { candidatePhoto: `https://mereos-corder.s3.eu-west-3.amazonaws.com/${resp.data.file_key}` });
				
				const updatedSession = convertDataIntoParse('session');
				const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
				
				try {
					const sectionRecordResp = await addSectionSessionRecord(updatedSession, candidateInviteAssessmentSection);
					logger.info('Section session record added successfully:', sectionRecordResp);
				} catch (sectionError) {
					sentryExceptioMessage(sectionError, { type: 'error', message: 'Failed to add section session record' });
				}
				
				state = {
					...state,
					captureMode: 'uploaded_photo',
					msg: {
						type: 'waiting',
						text: 'candidate_photo_uploaded_successfully',
					},
				};
				if(window.mereos.globalCallback){
					window.mereos.globalCallback({ 
						type:'success',
						message: 'candidate_photo_uploaded_successfully',
						code:50007 
					});
				}
				registerEvent({ eventType: 'success', notify: false, eventName: 'candidate_photo_uploaded_successfully' });
			} else {
				throw new Error('candidate_photo_upload_missing_file_key');
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
			if(window.mereos.globalCallback){
				window.mereos.globalCallback({ 
					type:'error',
					message: 'internet_connection_unstable',
					code:40026
				});
			}
			registerEvent({ eventType: 'error', notify: false, eventName: 'internet_connection_unstable' });
			sentryExceptioMessage(e,{type:'error',message:'Image Upload failed'});
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
			const theme = JSON.parse(localStorage.getItem('schoolTheme'))?.theming;
			const isDarkTheme = theme === 'dark';
			const cameraIcon = isDarkTheme ? 
				`${ASSET_URL}/no-camera.svg`:
				`${ASSET_URL}/no-camera-white.svg`;
				
			contentHTML += `<img src="${cameraIcon}" class="ivso-broken-camera" alt="broken-camera" 
				style="width: 250px; height: 250px; opacity: 0.5; margin: auto;">`;
		} else if (state.webcamLoading) {
			contentHTML += `
			<div class="camera-spinner">
				<div class="new-spinner">
					<div class='bounce1'></div>
					<div class='bounce2'></div>
					<div class='bounce3'></div>
				</div>
				</div>
			`;
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
			const isDisabled = state.webcamError || state.webcamLoading || state.isProcessing ? 'disabled' : '';
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
        
		// Query inside this tab only: ids like 'next-btn' also exist on other screens.
		const retakeBtn = tabContent.querySelector('#retake-btn');
		if (retakeBtn) {
			retakeBtn.addEventListener('click', () => {
				state = {
					...state,
					imageSrc: null,
					captureMode: 'take',
					isUploading: false,
					isProcessing: false,
					webcamError: false,
					// renderUI() reuses the running camera, or reopens it if it was lost.
					webcamLoading: false,
					msg: {
						type: 'checking',
						text: 'center_your_face',
					},
				};
				renderUI();
			});
		}

		if (state.captureMode === 'uploaded_photo') {
			const nextBtn = tabContent.querySelector('#next-btn');
			if (nextBtn) {
				nextBtn.addEventListener('click', nextStep);
			}
		}

		if (state.captureMode === 'take') {
			const takePhotoBtn = tabContent.querySelector('#take-photo-btn');
			if (takePhotoBtn && !state.webcamError && !state.webcamLoading) {
				takePhotoBtn.addEventListener('click', capturePhoto);
			}
		}

		if (state.captureMode === 'retake' && state.msg.type === 'successful') {
			const uploadBtn = tabContent.querySelector('#upload-btn');
			if (uploadBtn && !state.isProcessing) {
				uploadBtn.addEventListener('click', uploadUserCapturedPhoto);
			}
		}

		if (!state.imageSrc && !state.webcamError && !state.webcamLoading) {
			const ivsoWebcamContainer = tabContent.querySelector('.ivso-webcam-container');
			if (isStreamLive(stream) && videoElement) {
				if (ivsoWebcamContainer) {
					ivsoWebcamContainer.appendChild(videoElement);
					videoElement.play().catch(() => {});
				}
			} else {
				startWebcam();
			}
		}
	};

	stopPreviousCamera = stopCamera;
	startWebcam();

	currentLanguageHandler = () => {
		if (tabContent.classList.contains('active')) renderUI();
	};
	i18next.on('languageChanged', currentLanguageHandler);
};