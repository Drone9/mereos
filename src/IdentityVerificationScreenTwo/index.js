import i18next from 'i18next';

import { showTab } from '../ExamsPrechecks';

import { acceptableLabels, acceptableText, dataURIToBlob, findLastVisitedRoute, findPreviousPrecheckStep, getSecureFeatures, registerEvent, sentryExceptioMessage, srcToData, updatePersistData, convertDataIntoParse, logger, addSectionSessionRecord } from '../utils/functions';
import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { ASSET_URL } from '../utils/constant';
import { CAMERA_FRAME_TIMEOUT_MS, isStreamLive, requestCameraStream, stopStream } from '../utils/camera';

import { uploadFileInS3Folder, userRekognitionInfo } from '../services/general.services.js';

let currentLanguageHandler = null;
let stopPreviousCamera = null;
// Shared across screen instances so a newer visit invalidates an older pending camera request.
let cameraRequestId = 0;

export const IdentityVerificationScreenTwo = async (tabContent) => {
	if (currentLanguageHandler) {
		i18next.off('languageChanged', currentLanguageHandler);
		currentLanguageHandler = null;
	}
	if (stopPreviousCamera) {
		stopPreviousCamera();
		stopPreviousCamera = null;
	}

	let photo = null;
	let stream = null;
	let cameraFrameTimeout = null;
	let inputFile;
	let disabledBtn = false;
	let fileObj;
	let failedAttempts = 0;
	let webcamError = false;
	let webcamLoading = true;
	let processingPDF = false;
	let pdfLibLoaded = false;
	let currentState = {
		captureMode: 'take',
		imageSrc: null,
		msg: {
			text: ''
		}
	};
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];

	const videoConstraints = {
		width: 350,
		height: 280,
		facingMode: 'user'
	};

	const stopCamera = () => {
		cameraRequestId++;
		clearTimeout(cameraFrameTimeout);
		stopStream(stream);
		stream = null;
		photo = null;
	};

	const startCamera = async () => {
		const requestId = ++cameraRequestId;
		webcamError = false;
		webcamLoading = true;
		renderUI();

		try {
			const newStream = await requestCameraStream(videoConstraints);
			if (requestId !== cameraRequestId) {
				stopStream(newStream);
				return;
			}

			stream = newStream;
			window.mereos.globalStream = newStream;
			newStream.getVideoTracks().forEach(track => {
				track.addEventListener('ended', () => {
					if (stream === newStream) handleWebcamError();
				});
			});

			webcamLoading = false;
			renderUI();
		} catch (error) {
			if (requestId !== cameraRequestId) return;
			sentryExceptioMessage(error, { type: 'error', message: 'Webcam error in ID card' });
			console.error('Webcam error:', error);
			handleWebcamError();
		}
	};

	const isTakePhotoDisabled = () =>
		disabledBtn ||
		!!currentState.imageSrc ||
		webcamError ||
		webcamLoading ||
		processingPDF ||
		!photo ||
		photo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA;

	const updateTakePhotoButton = () => {
		const takePhotoBtn = tabContent.querySelector('[data-action="take-photo"]');
		if (takePhotoBtn) takePhotoBtn.disabled = isTakePhotoDisabled();
	};

	// Enable "Take ID photo" only once the video shows a frame, instead of relying on play() resolving.
	const attachStreamToVideo = (video) => {
		video.muted = true;
		video.playsInline = true;
		video.srcObject = stream;
		photo = video;
		video.play().catch(() => {});

		clearTimeout(cameraFrameTimeout);
		if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
			updateTakePhotoButton();
			return;
		}

		video.addEventListener('loadeddata', () => {
			clearTimeout(cameraFrameTimeout);
			updateTakePhotoButton();
		}, { once: true });

		cameraFrameTimeout = setTimeout(() => {
			if (photo === video && video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
				handleWebcamError();
			}
		}, CAMERA_FRAME_TIMEOUT_MS);
	};

	const loadPdfJs = () => {
		if (window.pdfjsLib) {
			pdfLibLoaded = true;
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
		script.async = true;
		script.onload = () => {
			if (window.pdfjsLib) {
				window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
					'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
				pdfLibLoaded = true;
			}
		};
		script.onerror = () => {
			console.error('Failed to load PDF.js library');
			registerEvent({
				eventType: 'error',
				notify: true,
				eventName: 'pdf_library_load_error',
			});
		};
		document.head.appendChild(script);
	};

	loadPdfJs();

	const handleWebcamError = () => {
		stopCamera();
		webcamError = true;
		webcamLoading = false;
		currentState = {
			...currentState,
			captureMode: 'take',
			msg: { type: 'unsuccessful', text: 'webcam_error' }
		};
		renderUI();
		if(window.mereos.globalCallback) {
			window.mereos.globalCallback({ 
				type:'error',
				message: 'webcam_error',
				code:40030
			});
		}
		registerEvent({
			eventType: 'error',
			notify: true,
			eventName: 'webcam_error'
		});
	};

	const capturePhoto = () => {
		if (isTakePhotoDisabled()) return;

		const canvas = document.createElement('canvas');
		canvas.width = videoConstraints.width;
		canvas.height = videoConstraints.height;
		const context = canvas.getContext('2d');
		context.drawImage(photo, 0, 0, canvas.width, canvas.height);
		const imageSrc = canvas.toDataURL('image/png');

		dataURLtoFile(imageSrc).then(imageFile => {
			fileObj = imageFile;
			if (imageSrc) {
				currentState = {
					...currentState,
					imageSrc: imageSrc,
					msg: {
						type: 'checking',
						text: 'id_being_verified'
					}
				};
				renderUI();
				verifyImage();
			} else {
				currentState = {
					...currentState,
					captureMode: 'retake',
					msg: {
						type: 'unsuccessful',
						text: 'error_capturing_picture'
					}
				};
				renderUI();
			}
		});
	};

	const dataURLtoFile = async (dataurl, filename = 'screenshot.png') => {
		const res = await fetch(dataurl);
		const blob = await res.blob();
		return new File([blob], filename, { type: blob.type });
	};

	const handleRestart = () => {
		if (inputFile) {
			inputFile.value = '';
		}

		processingPDF = false;
		currentState = {
			...currentState,
			captureMode: 'take',
			imageSrc: null,
			isUploading: false,
			msg: {
				text: ''
			}
		};

		// Reuse the running camera on retake; only reopen it if it was lost.
		if (isStreamLive(stream)) {
			webcamError = false;
			webcamLoading = false;
			renderUI();
		} else {
			startCamera();
		}
	};

	const extractImageFromPDF = async (file) => {
		if (!pdfLibLoaded || !window.pdfjsLib) {
			throw new Error('pdf_library_not_loaded');
		}

		try {
			processingPDF = true;
			currentState = {
				...currentState,
				msg: { type: 'checking', text: 'processing_pdf_file' }
			};
			renderUI();

			const arrayBuffer = await file.arrayBuffer();
			const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
			const pdf = await loadingTask.promise;
			
			if (pdf.numPages > 1) {
				processingPDF = false;
				throw new Error('pdf_has_multiple_pages');
			}
			
			const page = await pdf.getPage(1);
			
			const scale = 2.0;
			const viewport = page.getViewport({ scale });
			
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;
			
			const renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			await page.render(renderContext).promise;
			
			const imageDataUrl = canvas.toDataURL('image/jpeg', 0.95);
			
			const imageFile = await dataURLtoFile(imageDataUrl);
			fileObj = imageFile;
			
			processingPDF = false;
			return imageDataUrl;
			
		} catch (error) {
			console.error('Error extracting image from PDF:', error);
			processingPDF = false;
			
			if (error.message === 'pdf_has_multiple_pages') {
				if(window.mereos.globalCallback) {
					window.mereos.globalCallback({ 
						type:'error',
						message: 'pdf_multiple_pages_error',
						code:40035
					});
				}
				registerEvent({
					eventType: 'error',
					notify: true,
					eventName: 'pdf_multiple_pages_error'
				});
				throw new Error('pdf_multiple_pages_error');
			} else {
				if(window.mereos.globalCallback) {
					window.mereos.globalCallback({ 
						type:'error',
						message: 'pdf_extraction_error',
						code:40034
					});
				}
				registerEvent({
					eventType: 'error',
					notify: true,
					eventName: 'pdf_extraction_error'
				});
				sentryExceptioMessage(error,{type:'error',message:'PDF extraction error'});
				throw new Error('error_processing_pdf');
			}
		}
	};

	const uploadImage = async (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			const fileType = file.type;
			
			try {
				if (fileType === 'application/pdf') {
					if (!pdfLibLoaded) {
						currentState = {
							...currentState,
							msg: { type: 'unsuccessful', text: 'loading_pdf_file' }
						};
						renderUI();
						return;
					}

					const extractedImageSrc = await extractImageFromPDF(file);
					
					if (extractedImageSrc) {
						currentState = {
							...currentState,
							imageSrc: extractedImageSrc,
							msg: { type: 'checking', text: 'id_being_verified' }
						};
						renderUI();
						verifyImage();
					} else {
						currentState = {
							...currentState,
							captureMode: 'retake',
							msg: { type: 'unsuccessful', text: 'error_with_uploading_file' }
						};
						renderUI();
					}
				} else {
					fileObj = file;
					const src = URL.createObjectURL(file);
					let imageSrc = await srcToData(src);
					
					if (imageSrc) {
						currentState = {
							...currentState,
							imageSrc: imageSrc,
							msg: {
								type: 'checking',
								text: 'id_being_verified'
							}
						};
						renderUI();
						verifyImage();
					} else {
						currentState = {
							...currentState,
							captureMode: 'retake',
							msg: {
								type: 'unsuccessful',
								text: 'error_with_uploading_file'
							}
						};
						renderUI();
					}
				}
			} catch (error) {
				console.error('Upload error:', error);
				currentState = {
					...currentState,
					captureMode: 'retake',
					msg: {
						type: 'unsuccessful',
						text: error.message || 'error_with_uploading_file'
					}
				};
				
				renderUI();
			}
		}
	};

	const verifyImage = async () => {
		if (currentState.imageSrc) {
			disabledBtn = true;
			renderUI();
			
			const data = new FormData();
			data.append('image', fileObj);
			try {
				const resp = await userRekognitionInfo(data);
				const userImageData = resp.data;
				
				const isFourthTry = failedAttempts >= 3;
				
				if (userImageData && !isFourthTry) {
					const faceDetails = userImageData?.face?.FaceDetails || [];
					const faceCount = faceDetails.length;

					const getFaceArea = (face) => {
						const box = face?.BoundingBox;
						if (!box || typeof box.Width !== 'number' || typeof box.Height !== 'number') return null;
						return box.Width * box.Height;
					};

					const twoFacesLookLikeSameCard = () => {
						if (faceCount !== 2) return false;
						const areas = faceDetails.map(getFaceArea);
						if (areas.some((area) => area === null)) return true;
						const smaller = Math.min(areas[0], areas[1]);
						const larger = Math.max(areas[0], areas[1]);
						return larger > 0 && smaller / larger <= 0.5;
					};

					const hasTooManyFaces = faceCount > 2 || (faceCount === 2 && !twoFacesLookLikeSameCard());
					const isValidID = acceptableLabels(userImageData?.label, 80) &&
									acceptableText(userImageData?.text, 59) &&
									faceCount >= 1 && !hasTooManyFaces;

					if (isValidID) {
						currentState = {
							...currentState,
							captureMode: 'retake',
							msg: {
								type: 'successful',
								text: 'id_successfully_verified'
							}
						};
						disabledBtn = false;
						if(window.mereos.globalCallback) {
							window.mereos.globalCallback({
								type:'success',
								message: 'id_successfully_verified',
								code:50008
							});
						}
						registerEvent({eventType: 'success', notify: false, eventName: 'id_successfully_verified'});
					} else {
						failedAttempts++;

						currentState = {
							...currentState,
							captureMode: 'retake',
							msg: {
								type: 'unsuccessful',
								text: hasTooManyFaces ? 'multiple_id_card_detected' : 'id_not_verified'
							}
						};
						disabledBtn = false;
						if(window.mereos.globalCallback) {
							window.mereos.globalCallback({
								type:'error',
								message: hasTooManyFaces ? 'multiple_id_card_detected' : 'id_not_verified',
								code: hasTooManyFaces ? 40067 : 40031
							});
						}
						registerEvent({eventType: 'error', notify: false, eventName: hasTooManyFaces ? 'multiple_id_card_detected' : 'id_not_verified'});
					}
				} else if (isFourthTry) {
					currentState = {
						...currentState,
						captureMode: 'retake',
						msg: {
							type: 'successful',
							text: 'id_successfully_verified'
						}
					};
					disabledBtn = false;
					if(window.mereos.globalCallback) {
						window.mereos.globalCallback({ 
							type:'success',
							message: 'id_successfully_verified',
							code:50008
						});
					}
					registerEvent({eventType: 'success', notify: false, eventName: 'id_successfully_verified'});
				}
			} catch (error) {
				console.error('Rekognition API error:', error);
				sentryExceptioMessage(error);
				
				failedAttempts++;
				
				if (failedAttempts >= 3) {
					currentState = {
						...currentState,
						captureMode: 'retake',
						msg: {
							type: 'successful',
							text: 'id_successfully_verified'
						}
					};
					disabledBtn = false;
					if(window.mereos.globalCallback) {
						window.mereos.globalCallback({ 
							type:'success',
							message: 'id_successfully_verified',
							code:50008
						});
					}
					registerEvent({eventType: 'success', notify: false, eventName: 'id_successfully_verified'});
				} else {
					currentState = {
						...currentState,
						captureMode: 'retake',
						msg: {
							type: 'unsuccessful',
							text: 'api_verification_failed'
						}
					};
					disabledBtn = false;
					if(window.mereos.globalCallback) {
						window.mereos.globalCallback({ 
							type:'error',
							message: 'api_verification_failed',
							code:40032
						});
					}
					registerEvent({
						eventType: 'error',
						notify: false,
						eventName: 'rekognition_api_failed'
					});
				}
			}
			renderUI();
		}
	};

	const nextStep = async () => {
		stopCamera();
		if(window.mereos.globalStream?.getTracks()){
			window.mereos.globalStream.getTracks().forEach(track => track.stop());
		}
		updatePersistData('preChecksSteps',{ identityCardPhoto:true });
		showTab('IdentityVerificationScreenThree');
	};

	const uploadCandidateIdentityCard = async () => {
		if (currentState.isUploading) return; 
        
		try {
			currentState.isUploading = true;
			renderUI();

			currentState = {
				...currentState,
				msg: {
					type: 'loading',
					text: 'file_is_being_uploaded'
				}
			};
			renderUI();

			let resp = await uploadFileInS3Folder({
				folderName: 'candidate_ids/',
				file: dataURIToBlob(currentState.imageSrc)
			});

			if (resp?.data?.file_key) {
				updatePersistData('session', { identityCard: `https://mereos-corder.s3.eu-west-3.amazonaws.com/${resp?.data?.file_key}` });
				
				const updatedSession = convertDataIntoParse('session');
				const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
				
				try {
					const sectionRecordResp = await addSectionSessionRecord(updatedSession, candidateInviteAssessmentSection);
					logger.info('Section session record added successfully:', sectionRecordResp);
				} catch (sectionError) {
					logger.error('Error adding section session record:', sectionError);
					sentryExceptioMessage(sectionError, { type: 'error', message: 'Failed to add section session record' });
				}
				
				currentState = {
					...currentState,
					captureMode: 'uploaded_photo',
					isUploading: false,
					msg: {
						type: 'waiting',
						text: 'candidate_id_is_uploaded_successfully'
					}
				};
				if(window.mereos.globalCallback) {
					window.mereos.globalCallback({ 
						type:'success',
						message: 'identity_card_uploaded_successfully',
						code:50009
					});
				}
				registerEvent({eventType: 'success', notify: false, eventName: 'identity_card_uploaded_successfully'});
			} else {
				throw 'something_went_wrong_please_upload_again';
			}
		} catch (error) {
			currentState = {
				...currentState,
				isUploading: false,
				msg: {
					type: 'error',
					text: 'something_went_wrong_please_upload_again'
				}
			};
			if(window.mereos.globalCallback) {
				window.mereos.globalCallback({ 
					type:'error',
					message: 'internet_connection_unstable',
					code:40033
				});
			}
			sentryExceptioMessage(error);
			registerEvent({eventType: 'success', notify: false, eventName: 'internet_connection_unstable'});
		}
		renderUI();
	};

	const prevStep = () => {
		stopCamera();
		const previousRoute = findLastVisitedRoute('IdentityVerificationScreenTwo');
		const previousStep = findPreviousPrecheckStep('IdentityVerificationScreenTwo');
		updatePersistData('preChecksSteps',{ [previousStep]:false });
		showTab(previousRoute);
	};

	const triggerFileUpload = () => {
		if (inputFile) inputFile.click();
	};
	
	const setupEventListeners = () => {
		const uploadEl = tabContent.querySelector('#upload-identity-card');
		if (uploadEl) {
			uploadEl.removeEventListener('click', triggerFileUpload);
			uploadEl.addEventListener('click', triggerFileUpload);
		}

		tabContent.querySelectorAll('.orange-filled-btn, .orange-hollow-btn').forEach(button => {
			const action = button.getAttribute('data-action');
			if (action === 'take-photo') button.addEventListener('click', capturePhoto);
			if (action === 'restart') button.addEventListener('click', handleRestart);
			if (action === 'upload') button.addEventListener('click', uploadCandidateIdentityCard);
			if (action === 'next') button.addEventListener('click', nextStep);
			if (action === 'prev') button.addEventListener('click', prevStep);
		});
	};

	const renderUI = () => {
		photo = null;
		clearTimeout(cameraFrameTimeout);

		let container = tabContent.querySelector('.id-card-container');
		if (!container) {
			tabContent.insertAdjacentHTML('beforeend', `
                <div class="id-card-container">
                    <div class="ivst-wrapper"></div>
                </div>
            `);
			container = tabContent.querySelector('.id-card-container');
		}

		const stepsContainerHTML = document.createElement('div');
		renderIdentityVerificationSteps(stepsContainerHTML, 2);

		let headerImgHTML = '';
		if (currentState.imageSrc) {
			headerImgHTML = `
                <img src="${currentState.imageSrc}" class="ivst-header-img" alt="captured-image">
                ${currentState.msg.type !== 'checking' && currentState.msg.type !== 'loading' ? 
		`<img src="${currentState.msg.type === 'unsuccessful' ? 
			`${ASSET_URL}/close-red.svg` : 
			`${ASSET_URL}/checkmark-green.svg`}" 
                        class="ivst-header-img-result" 
                        alt="status-icon">` : 
		''}
            `;
		} else if (webcamError) {
			const theme = JSON.parse(localStorage.getItem('schoolTheme'))?.theming;
			const isDarkTheme = theme === 'dark';
			const cameraIcon = isDarkTheme ? 
				`${ASSET_URL}/no-camera.svg`:
				`${ASSET_URL}/no-camera-white.svg`;
				
			headerImgHTML = `
				<img src="${cameraIcon}" class="ivso-broken-camera" alt="broken-camera" 
					style="width: 250px; height: 250px; opacity: 0.5; margin: auto;">
			`;
		} else if (webcamLoading) {
			headerImgHTML = `
			<div class="camera-spinner">
				<div class="new-spinner">
					<div class='bounce1'></div>
					<div class='bounce2'></div>
					<div class='bounce3'></div>
				</div>
			</div>
			`;
		} else {
			headerImgHTML = `
                <video width="${videoConstraints.width}" height="${videoConstraints.height}" autoplay muted playsinline></video>
                <img src="${ASSET_URL}/screen-centered-grid.svg" class="ivst-screen-grid" alt="screen-centered-grid">
            `;
		}

		const messageHTML = currentState.msg.text ? 
			`<div class="ivst-query-msg" id="queryMsg-msg" ${currentState.msg.type === 'unsuccessful' ? 'style="color: #E95E5E;"' : ''}>
                ${i18next.t(currentState.msg.text)}
            </div>` : '';

		let uploadMsgHTML = '';
		if (!currentState.imageSrc && !webcamError) {
			uploadMsgHTML = `
				<div class="ivst-query-msg">
					${i18next.t('please_take_picture_or')} <span id="upload-identity-card" class="ivst-file">${i18next.t('upload_your_identity_document')}</span>.
				</div>
			`;
		} else if (!currentState.imageSrc && webcamError) {
			uploadMsgHTML = `
				<div class="ivst-query-msg">
					<span>${i18next.t('webcam_unavailable_please')}</span> 
					<span id="upload-identity-card" class="ivst-file">${i18next.t('upload_your_identity_document')}</span>.
				</div>
			`;
		}

		let buttonsHTML = '';
		if (currentState.captureMode === 'take') {
			buttonsHTML = `
                ${secureFeatures.find(entity => entity.key === 'verify_candidate') ? 
		`<button class="orange-hollow-btn" data-action="prev">${i18next.t('previous_step')}</button>` : ''}
                <button class="orange-filled-btn" data-action="take-photo" ${isTakePhotoDisabled() ? 'disabled' : ''}>
                    ${i18next.t('take_id_photo')}
                </button>
            `;
		} else {
			if (currentState.captureMode !== 'uploaded_photo') {
				buttonsHTML = `
                    <button class="orange-filled-btn" data-action="restart">${i18next.t('retake_id_photo')}</button>
                    <button class="orange-filled-btn" data-action="upload" ${currentState.msg.type === 'successful' ? '' : 'disabled'}>
                        ${i18next.t('upload')}
                    </button>
                `;
			} else {
				buttonsHTML = `
                    <button class="orange-filled-btn" data-action="restart">${i18next.t('retake_id_photo')}</button>
                    <button class="orange-filled-btn" data-action="next">${i18next.t('next_step')}</button>
                `;
			}
		}

		container.querySelector('.ivst-wrapper').innerHTML = `
            <div class="ivst-header-title">${i18next.t('identity_validation')}</div>
            <div class="ivst-msg">${i18next.t('initial_system_check_passed_get_ready_for_identity_validation')}</div>
            ${stepsContainerHTML.innerHTML}
            <div class="ivst-header-img-container">
                ${headerImgHTML}
            </div>
            ${messageHTML}
            ${uploadMsgHTML}
            <div class="ivst-btn-container">
                ${buttonsHTML}
            </div>
        `;

		if (!inputFile) {
			inputFile = document.createElement('input');
			inputFile.type = 'file';
			inputFile.name = 'idCard';
			inputFile.accept = 'image/png,image/jpeg,image/jpg,application/pdf';
			inputFile.hidden = true;
			inputFile.addEventListener('change', uploadImage);
			container.appendChild(inputFile);
		}

		if (!currentState.imageSrc && !webcamError && !webcamLoading) {
			const videoElement = container.querySelector('video');
			if (videoElement && stream) {
				attachStreamToVideo(videoElement);
			}
		}

		setupEventListeners();
	};

	stopPreviousCamera = stopCamera;
	startCamera();

	currentLanguageHandler = () => {
		if (tabContent.classList.contains('active')) renderUI();
	};
	i18next.on('languageChanged', currentLanguageHandler);
};