import i18next from 'i18next';

import { shadowRoot, showTab } from '../ExamsPrechecks';

import { acceptableLabels, acceptableText, dataURIToBlob, getSecureFeatures, logger, registerEvent, srcToData, updatePersistData, userRekognitionInfo } from '../utils/functions';
import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { ASSET_URL } from '../utils/constant';

import '../assets/css/step2.css';
import { uploadFileInS3Folder } from '../services/general.services.js';

export const IdentityVerificationScreenTwo = async (tabContent) => {
	let photo;
	let inputFile;
	let disabledBtn = false;
	let fileObj;
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
	
	const uploadImage = async (event) => {
		if (event.target.files.length > 0) {
			fileObj = event.target.files[0];
			const src = URL.createObjectURL(event.target.files[0]);
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
	};

	const verifyImage = async () => {
		if (currentState.imageSrc) {
			disabledBtn = true;
			const data = new FormData();
			data.append('image', fileObj);
			try {
				const resp = await userRekognitionInfo(data);
				const userImageData = resp.data;
				if (userImageData) {
					if (acceptableLabels(userImageData?.label, 80) && acceptableText(userImageData?.text, 59) && userImageData?.face?.FaceDetails.length > 0) {
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
								text: 'id_not_verified'
							}
						};
						disabledBtn = false;
						registerEvent({eventType: 'success', notify: false, eventName: 'id_not_verified'});
					}
				}
			} catch (error) {
				logger.error('Error verifying image:', error);
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
					isUploading: false, // Reset flag
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
			registerEvent({eventType: 'success', notify: false, eventName: 'internet_connection_unstable'});
		}
		renderUI();
	};

	const prevStep = () => {
		updatePersistData('preChecksSteps',{ identityCardPhoto:false });
		let navHistory = JSON.parse(localStorage.getItem('navHistory'));
		const currentIndex = navHistory.indexOf('IdentityVerificationScreenTwo');
		const previousPage = currentIndex > 0 ? navHistory[currentIndex - 1] : null;
		showTab(previousPage);
	};

	const setupEventListeners = () => {
		shadowRoot.querySelector('#upload-identity-card')?.addEventListener('click', () => inputFile.click());
		
		shadowRoot.querySelectorAll('.orange-filled-btn, .orange-hollow-btn').forEach(button => {
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
                ${currentState.msg.type !== 'checking' ? 
		`<img src="${currentState.msg.type === 'unsuccessful' ? 
			`${ASSET_URL}/close-red.svg` : 
			`${ASSET_URL}/checkmark-green.svg`}" 
                        class="ivst-header-img-result" 
                        alt="status-icon">` : 
		''}
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

		const uploadMsgHTML = !currentState.imageSrc ? 
			`<div class="ivst-query-msg">
                ${i18next.t('please_take_picture_or')} <span id="upload-identity-card" class="ivst-file">${i18next.t('upload_your_identity_document')}</span>.
            </div>` : '';

		let buttonsHTML = '';
		if (currentState.captureMode === 'take') {
			buttonsHTML = `
                ${secureFeatures.find(entity => entity.key === 'verify_candidate') ? 
		`<button class="orange-hollow-btn" data-action="prev">${i18next.t('previous_step')}</button>` : ''}
                <button class="orange-filled-btn" data-action="take-photo" ${disabledBtn || !!currentState.imageSrc ? 'disabled' : ''}>
                    ${i18next.t('take_id_photo')}
                </button>
            `;
		} else {
			if (currentState.captureMode !== 'uploaded_photo') {
				buttonsHTML = `
                    <button class="orange-filled-btn" data-action="restart">${i18next.t('retake_id_photo')}</button>
                    <button class="orange-filled-btn" data-action="upload" ${currentState.msg.type === 'unsuccessful' || currentState.isUploading ? 'disabled' : ''}>
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
			inputFile.accept = 'image/*';
			inputFile.hidden = true;
			inputFile.addEventListener('change', uploadImage);
			container.appendChild(inputFile);
		}

		if (!currentState.imageSrc) {
			photo = container.querySelector('video');
			if (photo) {
				window.mereos.globalStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false });
				if (window.mereos.globalStream !== null) {
					photo.srcObject = window.mereos.globalStream;
				}
			}
		}

		setupEventListeners();
	};

	renderUI();

	i18next.on('languageChanged', () => {
		renderUI();
	});
};