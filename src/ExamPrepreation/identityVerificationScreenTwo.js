import { acceptableLabels, acceptableText, dataURIToBlob, getDateTime, registerEvent, srcToData, updatePersistData, uploadFileInS3Folder, userRekognitionInfo } from '../utils/functions';
import '../assets/css/step2.css';
import greenCheckMark from '../assets/images/checkmark-green.svg';
import screenCenter from '../assets/images/screen-centered-grid.svg';
import { showTab } from './examPrechecks';
import i18next from 'i18next';
import { renderIdentityVerificationSteps } from './IdentitySteps';

export const IdentityVerificationScreenTwo = async (tabContent) => {
	console.log('IdentityVerificationScreenTwo');
	let photo;
	let inputFile;
	let stream = null;
	let disabledBtn = false;
	let fileObj;
	let currentState = {
		captureMode: 'take',
		imageSrc: null,
		msg: {
			text: ''
		}
	};

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
		currentState = {
			...currentState,
			captureMode: 'take',
			imageSrc: null,
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
				console.log('userImageData',userImageData);
				if (userImageData) {
					console.log('acceptableLabels',acceptableLabels(userImageData?.label, 80));
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
				console.error('Error verifying image:', error);
			}
			renderUI();
		}
	};

	const nextStep = async () => {
		if(stream?.getTracks()){
			stream.getTracks().forEach(track => track.stop());
		}
		updatePersistData('preChecksSteps',{ identityCardPhoto:true });
		registerEvent({eventType: 'success', notify: false, eventName: 'identity_card_verified_successfully', eventValue: getDateTime()});
		showTab('IdentityVerificationScreenThree');
	};

	const uploadCandidateIdentityCard = async () => {
		try {
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
				updatePersistData('session',{ identityCard: resp.data.file_url });
				currentState = {
					...currentState,
					captureMode: 'uploaded_photo',
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
				captureMode: 'take',
				imageSrc: null,
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
		showTab('IdentityVerificationScreenOne');
	};

	const renderUI = async () => {
		let container = tabContent.querySelector('.ivso-container');
		if (!container) {
			container = document.createElement('div');
			container.className = 'ivso-container';
			tabContent.appendChild(container);
		}
		container.innerHTML = '';

		let stepsContainer = document.createElement('div');

		renderIdentityVerificationSteps(stepsContainer, 2);

		const wrapper = document.createElement('div');
		wrapper.className = 'ivst-wrapper';

		const headerTitle = document.createElement('div');
		headerTitle.className = 'ivst-header-title';
		headerTitle.textContent = i18next.t('identity_validation');

		const message = document.createElement('div');
		message.className = 'ivst-msg';
		message.textContent = i18next.t('initial_system_check_passed_get_ready_for_identity_validation');

		const headerImgContainer = document.createElement('div');
		headerImgContainer.className = 'ivst-header-img-container';

		if (currentState.imageSrc) {
			const img = document.createElement('img');
			img.src = currentState.imageSrc;
			img.className = 'ivst-header-img';
			img.alt = 'captured-image';
			headerImgContainer.appendChild(img);

			const resultImg = document.createElement('img');
			resultImg.src = `${greenCheckMark}`;
			resultImg.className = 'ivst-header-img-result';
			resultImg.alt = 'tick-mark-green-bg';
			headerImgContainer.appendChild(resultImg);
		} else {
			photo = document.createElement('video');
			photo.width = videoConstraints.width;
			photo.height = videoConstraints.height;
			photo.autoplay = true;
			headerImgContainer.appendChild(photo);

			stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
			if(stream !== null) {
				photo.srcObject = stream;
			}
			const gridImg = document.createElement('img');
			gridImg.src = `${screenCenter}`;
			gridImg.className = 'ivst-screen-grid';
			gridImg.alt = 'screen-centered-grid';
			headerImgContainer.appendChild(gridImg);
		}

		wrapper.appendChild(headerTitle);
		wrapper.appendChild(stepsContainer);
		wrapper.appendChild(message);
		wrapper.appendChild(headerImgContainer);

		if (currentState.msg.text) {
			const queryMsg = document.createElement('div');
			queryMsg.className = 'ivst-query-msg';
			queryMsg.textContent = i18next.t(currentState.msg.text);
			if (currentState.msg.type === 'unsuccessful') {
				queryMsg.style.color = '#E95E5E';
			}
			wrapper.appendChild(queryMsg);
		}

		if (!currentState.imageSrc) {
			const uploadMsg = document.createElement('div');
			uploadMsg.className = 'ivst-query-msg';
			uploadMsg.innerHTML = `${i18next.t('please_take_picture_or')} <span class="ivst-file">${i18next.t('upload_your_identity_document')}</span>.`;
			uploadMsg.querySelector('.ivst-file').addEventListener('click', () => inputFile.click());
			wrapper.appendChild(uploadMsg);
		}

		const btnContainer = document.createElement('div');
		btnContainer.className = 'ivst-btn-container';

		if (currentState.captureMode === 'take') {
			const prevBtn = createButton(`${i18next.t('previous_step')}`, 'orange-hollow-btn', prevStep);
			const takePhotoBtn = createButton(`${i18next.t('take_id_photo')}`, 'orange-filled-btn', capturePhoto);
			takePhotoBtn.disabled = disabledBtn || !!currentState.imageSrc;
			btnContainer.appendChild(prevBtn);
			btnContainer.appendChild(takePhotoBtn);
		} else {
			const retakeBtn = createButton(`${i18next.t('retake_id_photo')}`, 'orange-filled-btn', handleRestart);
			btnContainer.appendChild(retakeBtn);

			if (currentState.captureMode !== 'uploaded_photo') {
				const uploadBtn = createButton(`${i18next.t('upload')}`, 'orange-filled-btn', uploadCandidateIdentityCard);
				uploadBtn.disabled = currentState.msg.type === 'loading';
				btnContainer.appendChild(uploadBtn);
			} else {
				const nextBtn = createButton(`${i18next.t('next_step')}`, 'orange-filled-btn', nextStep);
				btnContainer.appendChild(nextBtn);
			}
		}

		wrapper.appendChild(btnContainer);

		container.appendChild(wrapper);

		inputFile = document.createElement('input');
		inputFile.type = 'file';
		inputFile.name = 'idCard';
		inputFile.accept = 'image/*';
		inputFile.hidden = true;
		inputFile.addEventListener('change', uploadImage);
		container.appendChild(inputFile);
	};

	const createButton = (text, className, onClick) => {
		const button = document.createElement('button');
		button.className = className;
		button.textContent = text;
		button.addEventListener('click', onClick);
		return button;
	};

	renderUI();

	i18next.on('languageChanged', () => {
		currentState.msg.text = i18next.t(currentState.msg.text);
		renderUI();
	});
};
