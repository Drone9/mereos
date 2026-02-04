import i18next from 'i18next';

import { showTab } from '../ExamsPrechecks';

import { acceptableLabels, acceptableText, dataURIToBlob, findLastVisitedRoute, findPreviousPrecheckStep, getSecureFeatures, registerEvent, sentryExceptioMessage, srcToData, updatePersistData, userRekognitionInfo } from '../utils/functions';
import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { ASSET_URL } from '../utils/constant';

import { uploadFileInS3Folder } from '../services/general.services.js';

export const IdentityVerificationScreenTwo = async (tabContent) => {
	let photo;
	let inputFile;
	let disabledBtn = false;
	let fileObj;
	let failedAttempts = 0;
	let webcamError = false;
	let webcamLoading = true; // Track webcam loading state
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
		facingMode: 'user',
		deviceId: localStorage.getItem('deviceId') || undefined,
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
		webcamError = true;
		webcamLoading = false;
		currentState = {
			...currentState,
			captureMode: 'take',
			msg: { type: 'unsuccessful', text: 'webcam_error' }
		};
		renderUI();
		registerEvent({
			eventType: 'error',
			notify: true,
			eventName: 'webcam_error'
		});
	};

	const capturePhoto = () => {
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
	
		webcamError = false;
		webcamLoading = true; // Set loading state on restart
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
		renderUI();
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
			registerEvent({
				eventType: 'error',
				notify: true,
				eventName: 'pdf_extraction_error'
			});
			sentryExceptioMessage(error,{type:'error',message:'PDF extraction error'});
			throw new Error('error_processing_pdf');
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
					const isValidID = acceptableLabels(userImageData?.label, 80) && 
									acceptableText(userImageData?.text, 59) && 
									userImageData?.face?.FaceDetails.length > 0;
					
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
						registerEvent({eventType: 'success', notify: false, eventName: 'id_successfully_verified'});
					} else {
						failedAttempts++;
						
						currentState = {
							...currentState,
							captureMode: 'retake',
							msg: {
								type: 'unsuccessful',
								text: 'id_not_verified'
							}
						};
						disabledBtn = false;
						registerEvent({eventType: 'success', notify: false, eventName: 'id_not_verified'});
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

			if (resp?.data?.file_url) {
				updatePersistData('session', { identityCard: resp.data.file_url });
				currentState = {
					...currentState,
					captureMode: 'uploaded_photo',
					isUploading: false,
					msg: {
						type: 'waiting',
						text: 'candidate_id_is_uploaded_successfully'
					}
				};
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
			sentryExceptioMessage(error);
			registerEvent({eventType: 'success', notify: false, eventName: 'internet_connection_unstable'});
		}
		renderUI();
	};

	const prevStep = () => {
		const previousRoute = findLastVisitedRoute('IdentityVerificationScreenTwo');
		const previousStep = findPreviousPrecheckStep('IdentityVerificationScreenTwo');
		updatePersistData('preChecksSteps',{ [previousStep]:false });
		showTab(previousRoute);
	};

	const triggerFileUpload = () => {
		if (inputFile) inputFile.click();
	};
	const setupEventListeners = () => {
		const uploadEl = window.mereos.shadowRoot.querySelector('#upload-identity-card');
		if (uploadEl) {
			uploadEl.removeEventListener('click', triggerFileUpload);
			uploadEl.addEventListener('click', triggerFileUpload);
		}

		window.mereos.shadowRoot.querySelectorAll('.orange-filled-btn, .orange-hollow-btn').forEach(button => {
			const action = button.getAttribute('data-action');
			if (action === 'take-photo') button.addEventListener('click', capturePhoto);
			if (action === 'restart') button.addEventListener('click', handleRestart);
			if (action === 'upload') button.addEventListener('click', uploadCandidateIdentityCard);
			if (action === 'next') button.addEventListener('click', nextStep);
			if (action === 'prev') button.addEventListener('click', prevStep);
		});
	};

	const renderUI = async () => {
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
                <video width="${videoConstraints.width}" height="${videoConstraints.height}" autoplay></video>
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
                <button class="orange-filled-btn" data-action="take-photo" ${disabledBtn || !!currentState.imageSrc || webcamError || webcamLoading || processingPDF ? 'disabled' : ''}>
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

		if (!currentState.imageSrc && !webcamError && webcamLoading) {
			const hasActiveTracks = window.mereos.globalStream?.getTracks?.().some(track => track.readyState === 'live');
			
			if (!window.mereos.globalStream || !hasActiveTracks) {
				setTimeout(async () => {
					const videoElement = container.querySelector('video');
					if (!videoElement) {
						try {
							window.mereos.globalStream = await navigator.mediaDevices.getUserMedia({ 
								video: videoConstraints, 
								audio: false 
							});
							
							if (window.mereos.globalStream !== null) {
								const testVideo = document.createElement('video');
								testVideo.srcObject = window.mereos.globalStream;
								
								testVideo.onloadedmetadata = () => {
									webcamLoading = false;
									photo = testVideo;
									renderUI();
								};
								
								const tracks = window.mereos.globalStream.getTracks();
								tracks.forEach(track => {
									track.addEventListener('ended', () => {
										handleWebcamError();
									});
								});
							}
						} catch (error) {
							sentryExceptioMessage(error,{type:'error',message:'Webcam error in ID card'});
							console.error('Webcam error:', error);
							handleWebcamError();
						}
					}
				}, 100);
			}
		} else if (!currentState.imageSrc && !webcamError && !webcamLoading) {
			const videoElement = container.querySelector('video');
			if (videoElement && window.mereos.globalStream) {
				videoElement.srcObject = window.mereos.globalStream;
				photo = videoElement;
			}
		}

		setupEventListeners();
	};

	renderUI();

	i18next.on('languageChanged', () => {
		renderUI();
	});
};