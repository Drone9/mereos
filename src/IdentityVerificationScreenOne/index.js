import i18next from 'i18next';

import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { showTab } from '../ExamsPrechecks';

import { dataURIToBlob, logger, registerEvent, updatePersistData, userRekognitionInfo } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';

import '../assets/css/step1.css';
import { uploadFileInS3Folder } from '../services/general.services.js';

export const IdentityVerificationScreenOne = async (tabContent) => {
	let state = {
		isUploading: false,
		captureMode: 'take',
		imageSrc: null,
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
	};

	let webcamStream = null;
	let videoElement = null;

	const startWebcam = async () => {
		try {
			videoElement = document.createElement('video');
			videoElement.width = state.videoConstraints.width;
			videoElement.height = state.videoConstraints.height;
			videoElement.autoplay = true;
			webcamStream = await navigator.mediaDevices.getUserMedia(state.videoConstraints);
			videoElement.srcObject = webcamStream;
			if (tabContent) {
				const ivsoWebcamContainer = tabContent.querySelector('.ivso-webcam-container');
				if (ivsoWebcamContainer) {
					ivsoWebcamContainer.innerHTML = '';
					ivsoWebcamContainer.appendChild(videoElement);
				}
			}
		} catch (err) {
			logger.error('Error accessing webcam:', err);
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
					} else if (predictions?.length > 1) {
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
	
					renderUI();
				};
				img.src = state.imageSrc;
			} catch (error) {
				logger.error('Error processing the image:', error);
				state = {
					...state,
					msg: {
						type: 'error',
						text: 'face_processing_failed',
					},
				};
				renderUI();
			}
		}
	};
	
	const nextStep = () => {
		if(webcamStream){
			webcamStream?.getTracks()?.forEach((track) => track.stop());
		}
		registerEvent({ eventType: 'success', notify: false, eventName: 'candidate_photo_captured_successfully' });
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
			ivsoContainer = document.createElement('div');
			ivsoContainer.className = 'ivso-container';
			tabContent.appendChild(ivsoContainer);
		} else {
			ivsoContainer.innerHTML = '';
		}
	
		const ivsoWrapper = document.createElement('div');
		ivsoWrapper.className = 'ivso-wrapper';
	
		const ivsHeaderTitle = document.createElement('div');
		ivsHeaderTitle.className = 'ivso-header-title';
		ivsHeaderTitle.textContent = i18next.t('webcam_diagnostics');
		const ivssubHeading = document.createElement('div');
		ivssubHeading.className = 'first-header-msg';
		ivssubHeading.textContent = i18next.t('your_face_must_visible_on_screen');
		const stepsContainer = document.createElement('div');

		renderIdentityVerificationSteps(stepsContainer, 1);
	
		let ivsMsg = document.createElement('div');
	
		if (state.msg.text) {
			ivsMsg.className = 'ivso-msg';

			if (state.msg.type === 'unsuccessful' || state.msg.type === 'something_went_wrong_please_upload_again') {
				ivsMsg.style.color = '#E95E5E';
			}

			ivsMsg.textContent = i18next.t(state.msg.text);
		}
	
		const ivsoWebcamContainer = document.createElement('div');
		ivsoWebcamContainer.className = 'ivso-webcam-container';
	
		const ivsoHeaderImgContainer = document.createElement('div');
		ivsoHeaderImgContainer.className = 'ivso-header-img-container';
	
		const ivsoBtnContainer = document.createElement('div');
		ivsoBtnContainer.className = 'ivso-btn-container';
	
		const ivsoQueryMsg = document.createElement('div');
		ivsoQueryMsg.className = 'ivso-query-msg';
	
		if (state.imageSrc) {
			const img = document.createElement('img');
			img.src = state.imageSrc;
			img.className = 'ivso-captured-img';
			ivsoHeaderImgContainer.appendChild(img);
		} else {
			if (!webcamStream) {
				startWebcam();
			}
			ivsoWebcamContainer.appendChild(videoElement);
	
			const gridImg = document.createElement('img');
			gridImg.src = `${ASSET_URL}/screen-centered-grid.svg`;
			gridImg.className = 'ivso-screen-grid';
			ivsoHeaderImgContainer.appendChild(gridImg);
		}
	
		if (state.captureMode !== 'take') {
			const retakePhotoBtn = document.createElement('button');
			retakePhotoBtn.textContent = i18next.t('retake_photo');
			retakePhotoBtn.className = 'orange-hollow-btn';
			retakePhotoBtn.addEventListener('click', () => {
				state = {
					...state,
					imageSrc: null,
					captureMode: 'take',
					isUploading:false,
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
			ivsoBtnContainer.appendChild(retakePhotoBtn);
		}
	
		if (state.captureMode === 'uploaded_photo') {
			const nextBtn = document.createElement('button');
			nextBtn.textContent = i18next.t('next_step');
			nextBtn.className = 'orange-filled-btn';
			nextBtn.addEventListener('click', nextStep);
			ivsoBtnContainer.appendChild(nextBtn);
		}
	
		if (state.captureMode === 'take') {
			const takePhotoBtn = document.createElement('button');
			takePhotoBtn.textContent = i18next.t('take_photo');
			takePhotoBtn.className = 'orange-filled-btn';
			takePhotoBtn.addEventListener('click', capturePhoto);
			ivsoBtnContainer.appendChild(takePhotoBtn);
		}
	
		if (state.captureMode === 'retake') {
			const uploadPhotoBtn = document.createElement('button');
			uploadPhotoBtn.textContent = i18next.t('upload');
			uploadPhotoBtn.className = 'orange-filled-btn';
			uploadPhotoBtn.disabled = state.isUploading || state.msg.type !== 'successful'; 
			uploadPhotoBtn.addEventListener('click', uploadUserCapturedPhoto);
			ivsoBtnContainer.appendChild(uploadPhotoBtn);
		}
	
		// Append elements to wrapper
		ivsoWrapper.appendChild(ivsHeaderTitle);
		ivsoWrapper.appendChild(ivssubHeading);
		ivsoWrapper.appendChild(stepsContainer);
		ivsoWrapper.appendChild(ivsoHeaderImgContainer);
		ivsoWrapper.appendChild(ivsoWebcamContainer);
		ivsoWrapper.appendChild(ivsMsg);
		ivsoWrapper.appendChild(ivsoBtnContainer);
		if (state.captureMode === 'retake') {
			ivsoWrapper.appendChild(ivsoQueryMsg);
		}
	
		// Append the wrapper to the container
		ivsoContainer.appendChild(ivsoWrapper);
	};

	renderUI();

	i18next.on('languageChanged', () => {
		state.msg.text = i18next.t(state.msg.text);
		renderUI();
	});
};
