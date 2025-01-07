import i18next from 'i18next';

import { showTab } from '../ExamsPrechecks';

import { getMultipleCameraDevices, checkForMultipleMicrophones, registerEvent, updatePersistData, logger } from '../utils/functions';

import '../assets/css/prevalidation.css';

export const PrevalidationInstructions = async (tabContent) => {
	try {
		let currentCaptureMode = null;
		let mediaStream = null;
		let cameras = [];
		let microphones = [];
		let selectedMicrophoneId=null;
		let selectedCameraId = null;
		let videoConstraints = {
			width: 640,
			height: 480,
			facingMode: 'user'
		};
		let audioConstraints = {
			noiseSuppression: true
		};
		const themeColor = JSON.parse(localStorage.getItem('schoolTheme'));

		const iconData = [
			{
				svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="24" cy="24" r="24" fill="#FF961B"/>
				<g clip-path="url(#clip0)">
				<path d="M23.9409 11.0078C23.5205 11.0078 23.1797 11.3487 23.1797 11.769V36.2299C23.1797 36.6504 23.5205 36.9912 23.9409 36.9912C24.3613 36.9912 24.7021 36.6503 24.7021 36.2299V11.7691C24.7022 11.3487 24.3613 11.0078 23.9409 11.0078Z" fill="white"/>
				<path d="M36.8643 24.7484L35.1193 19.9013C34.8916 19.0308 34.3656 18.3025 33.6677 17.814C34.2407 17.2599 34.5981 16.4842 34.5981 15.626C34.5981 13.947 33.2322 12.5811 31.5532 12.5811C29.8742 12.5811 28.5082 13.947 28.5082 15.626C28.5082 16.4842 28.8657 17.2599 29.4387 17.814C28.7408 18.3025 28.2148 19.0309 27.9871 19.9013L26.2421 24.7484C25.7971 25.9844 26.4853 27.3415 27.747 27.7129V33.1344C27.747 34.3936 28.7714 35.418 30.0307 35.418C30.615 35.418 31.1488 35.1974 31.5531 34.8351C31.9574 35.1974 32.4912 35.418 33.0756 35.418C34.3348 35.418 35.3593 34.3936 35.3593 33.1344V27.7129C36.6195 27.342 37.3097 25.9858 36.8643 24.7484ZM31.5532 14.1035C32.3927 14.1035 33.0757 14.7865 33.0757 15.626C33.0757 16.4655 32.3927 17.1485 31.5532 17.1485C30.7137 17.1485 30.0308 16.4655 30.0308 15.626C30.0308 14.7865 30.7137 14.1035 31.5532 14.1035ZM34.7156 26.2832H34.5981C34.1777 26.2832 33.8369 26.6241 33.8369 27.0444V33.1343C33.8369 33.554 33.4954 33.8955 33.0757 33.8955C32.6559 33.8955 32.3145 33.554 32.3145 33.1343V28.5668C32.3145 28.1464 31.9736 27.8056 31.5533 27.8056C31.1329 27.8056 30.7921 28.1465 30.7921 28.5668V33.1343C30.7921 33.554 30.4506 33.8955 30.0309 33.8955C29.6111 33.8955 29.2696 33.554 29.2696 33.1343V27.0445C29.2696 26.6241 28.9288 26.2833 28.5084 26.2833H28.391C27.8644 26.2833 27.4963 25.7598 27.6748 25.2642C29.5568 20.0367 29.4405 20.365 29.4543 20.3098C29.6955 19.3449 30.5587 18.6709 31.5534 18.6709C32.5481 18.6709 33.4113 19.3449 33.6525 20.3098C33.6663 20.3649 33.5506 20.0381 35.4321 25.2642C35.6102 25.7596 35.2423 26.2832 34.7156 26.2832Z" fill="white"/>
				<path d="M18.596 17.6556C19.079 17.1165 19.3735 16.4051 19.3735 15.626C19.3735 13.947 18.0076 12.5811 16.3286 12.5811C14.6496 12.5811 13.2837 13.947 13.2837 15.6259C13.2837 16.4051 13.5782 17.1165 14.0612 17.6556C12.2538 18.509 11 20.3492 11 22.4771V25.522C11 26.5145 11.6363 27.361 12.5225 27.6752V33.1343C12.5225 34.3935 13.5469 35.4179 14.8062 35.4179C15.3905 35.4179 15.9243 35.1973 16.3286 34.835C16.7329 35.1973 17.2667 35.4179 17.8511 35.4179C19.1103 35.4179 20.1348 34.3935 20.1348 33.1343V27.6752C21.0209 27.361 21.6573 26.5145 21.6573 25.5219V22.477C21.6573 20.3492 20.4035 18.509 18.596 17.6556ZM16.3286 14.1035C17.1681 14.1035 17.8511 14.7865 17.8511 15.626C17.8511 16.4655 17.1681 17.1485 16.3286 17.1485C15.4891 17.1485 14.8062 16.4655 14.8062 15.626C14.8062 14.7865 15.4892 14.1035 16.3286 14.1035ZM20.1348 25.522C20.1348 25.9418 19.7933 26.2832 19.3736 26.2832C18.9532 26.2832 18.6124 26.6241 18.6124 27.0444V33.1343C18.6124 33.554 18.2709 33.8955 17.8512 33.8955C17.4314 33.8955 17.0899 33.554 17.0899 33.1343V28.5668C17.0899 28.1464 16.7491 27.8056 16.3287 27.8056C15.9084 27.8056 15.5675 28.1465 15.5675 28.5668V33.1343C15.5675 33.554 15.226 33.8955 14.8063 33.8955C14.3866 33.8955 14.0451 33.554 14.0451 33.1343V27.0445C14.0451 26.6241 13.7043 26.2833 13.2839 26.2833C12.8641 26.2833 12.5227 25.9418 12.5227 25.522V22.4771C12.5227 20.3784 14.2301 18.6709 16.3288 18.6709C18.4275 18.6709 20.135 20.3784 20.135 22.4771V25.522H20.1348Z" fill="white"/>
				</g>
				<defs>
				<clipPath id="clip0">
				<rect width="26" height="26" fill="white" transform="translate(11 11)"/>
				</clipPath>
				</defs>
				</svg>
				`,
				text: 'use_washroom',
			},
			{
				svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="24" cy="24" r="24" fill="#FF961B"/>
				<path d="M33.6485 12.1421L33.6485 12.1421L33.647 12.1405C33.4633 11.9549 33.205 11.85 32.9375 11.85H15.0625C14.7949 11.85 14.5366 11.9549 14.353 12.1405L14.353 12.1405L14.3514 12.1421C14.1704 12.3305 14.0762 12.5821 14.1041 12.841L14.1041 12.8412L16.5416 35.3412L16.5416 35.3414C16.5933 35.8108 17.0156 36.15 17.5 36.15H30.5C30.9843 36.15 31.4067 35.8108 31.4583 35.3414L31.4583 35.3412L33.1774 19.4699C33.1774 19.4697 33.1775 19.4694 33.1775 19.4691C33.1789 19.4572 33.1804 19.4465 33.182 19.4346L33.182 19.4346L33.1825 19.4306L33.8958 12.8426L33.8959 12.8424C33.9237 12.5822 33.8297 12.3307 33.6485 12.1421ZM24.6056 18.0499C21.9428 16.0339 18.6956 16.3545 16.4846 16.9449L16.1282 13.65H31.8717L31.3219 18.7251C29.2739 19.3361 26.6527 19.6035 24.6058 18.05L24.6056 18.0499ZM31.1143 20.6461L29.6292 34.35H18.3707L16.6826 18.7675C18.5126 18.2227 21.2695 17.8384 23.3942 19.4485C24.9367 20.6179 26.6874 20.997 28.3111 20.997C29.3252 20.997 30.28 20.8443 31.1143 20.6461Z" fill="white" stroke="white" stroke-width="0.3"/>
				</svg>
				`,
				text: 'get_water',
			},
			{
				svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="24" cy="24" r="24" fill="#FF961B"/>
				<path d="M35.5879 23.875C34.607 22.4143 32.9612 22.5876 32.911 22.5762C32.6944 22.5762 32.4813 22.6007 32.2743 22.6469L33.4105 18.2496C33.9762 16.06 32.9529 13.7644 30.9451 12.7239C28.7376 11.5801 26.4016 11.0001 24.0003 11C21.6005 11.0001 19.2644 11.5801 17.057 12.7238C15.0491 13.7643 14.0259 16.06 14.5916 18.2495L15.7278 22.6468C15.3017 22.5518 15.0115 22.582 14.8521 22.5761C12.7668 22.5761 11.3468 24.6901 12.1346 26.6166C13.1602 29.1248 14.9393 31.2261 17.258 32.6566L15.2475 35.3812C14.9145 35.8326 15.0104 36.4684 15.4618 36.8015C15.9161 37.1367 16.5513 37.0356 16.8821 36.5872L19.0912 33.5933C20.6315 34.23 22.2861 34.5605 23.9775 34.5605H24.0246C25.716 34.5605 27.3706 34.23 28.9109 33.5933L31.1199 36.5872C31.452 37.0373 32.0877 37.1353 32.5402 36.8015C32.9916 36.4684 33.0876 35.8326 32.7545 35.3812L30.7441 32.6566C33.0596 31.2281 34.8405 29.1283 35.8675 26.6166C36.2375 25.7117 36.133 24.6868 35.5879 23.875ZM17.9916 14.5274C19.9074 13.5346 21.929 13.0313 24.0018 13.0313C26.073 13.0313 28.0946 13.5346 30.0104 14.5273C31.1859 15.1365 31.7753 16.4581 31.4437 17.7415L29.6801 24.5671C28.2954 25.5942 26.207 26.3438 24.001 26.3438C21.7927 26.3438 19.7038 25.5921 18.3219 24.5671L16.5583 17.7414C16.2268 16.4581 16.8161 15.1364 17.9916 14.5274ZM33.9873 25.8478C32.3364 29.8853 28.4035 32.5293 24.0246 32.5293H23.9775C19.5895 32.5293 15.662 29.8765 14.0148 25.8478C13.7727 25.2557 14.2076 24.6074 14.8521 24.6074C14.9629 24.6263 15.4486 24.5051 15.8198 24.9744C17.1152 26.6123 20.2279 28.375 24.0011 28.375C27.7742 28.375 30.8869 26.6122 32.1823 24.9744C32.3668 24.7412 32.6324 24.6074 32.9109 24.6074C33.0176 24.6263 33.5614 24.5009 33.9014 25.0073C34.0711 25.2599 34.1024 25.5663 33.9873 25.8478Z" fill="white"/>
				</svg>
				`,
				text: 'get_comfy',
			},
			{
				svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="24" cy="24" r="24" fill="#FF961B"/>
					<g clip-path="url(#clip0)">
					<path d="M36.9693 12.941C36.913 11.9082 36.0916 11.0869 35.0588 11.0305C32.9748 10.9167 28.8969 11.0274 24.9975 13.0443C23.0097 14.0725 20.9073 15.8158 19.2296 17.8271C19.2089 17.8519 19.1888 17.8768 19.1683 17.9017L15.3607 18.1958C14.734 18.2442 14.1757 18.5727 13.8291 19.097L11.2314 23.0261C10.9685 23.4237 10.9267 23.9213 11.1196 24.3571C11.3124 24.793 11.7087 25.0968 12.1797 25.1698L15.3876 25.6666C15.3763 25.729 15.3649 25.7913 15.3545 25.8537C15.2477 26.4925 15.4594 27.1493 15.9208 27.6106L20.3891 32.079C20.7717 32.4616 21.2886 32.6725 21.8182 32.6725C21.9273 32.6725 22.037 32.6635 22.1462 32.6452C22.2085 32.6348 22.2708 32.6235 22.3332 32.6121L22.83 35.8201C22.903 36.2911 23.2068 36.6874 23.6426 36.8803C23.8239 36.9605 24.0158 37.0001 24.2069 37.0001C24.4751 37 24.7415 36.9219 24.9737 36.7684L28.9027 34.1707C29.4271 33.824 29.7555 33.2658 29.8039 32.6391L30.098 28.8316C30.1228 28.8111 30.1478 28.791 30.1726 28.7703C32.184 27.0925 33.9273 24.9902 34.9555 23.0023C36.9724 19.1028 37.083 15.0248 36.9693 12.941ZM28.0626 32.8999L24.3042 35.3847L23.82 32.2584C25.4084 31.7914 26.9797 31.0434 28.4767 30.0413L28.2851 32.5217C28.2732 32.6764 28.192 32.8143 28.0626 32.8999ZM21.4663 31.0018L16.9979 26.5334C16.8839 26.4194 16.8312 26.2592 16.8571 26.1048C16.9899 25.3105 17.1964 24.5543 17.4519 23.8419L24.1564 30.5465C23.3009 30.8529 22.5345 31.0357 21.8949 31.1427C21.7404 31.1684 21.5803 31.1158 21.4663 31.0018ZM15.4781 19.7147L17.9584 19.5231C16.9563 21.0201 16.2083 22.5914 15.7413 24.1799L12.615 23.6957L15.0999 19.9372C15.1855 19.8077 15.3234 19.7267 15.4781 19.7147ZM29.1969 27.6003C27.9663 28.6268 26.7718 29.3692 25.6707 29.9064L18.0931 22.3288C18.7968 20.8915 19.6557 19.6946 20.3994 18.803C21.9521 16.9416 23.8831 15.3358 25.6975 14.3974C29.2762 12.5463 33.0468 12.4466 34.9759 12.5516C35.2312 12.5655 35.4343 12.7686 35.4482 13.024C35.5534 14.9531 35.4535 18.7236 33.6024 22.3024C32.664 24.1167 31.0582 26.0477 29.1969 27.6003Z" fill="white"/>
					<path d="M28.81 22.9971C29.7851 22.997 30.7606 22.6258 31.5029 21.8835C32.2223 21.1641 32.6184 20.2077 32.6184 19.1905C32.6184 18.1732 32.2223 17.2168 31.5029 16.4975C30.018 15.0125 27.6018 15.0126 26.117 16.4975C25.3976 17.2168 25.0015 18.1732 25.0015 19.1905C25.0015 20.2077 25.3977 21.1641 26.117 21.8835C26.8595 22.626 27.8345 22.9972 28.81 22.9971ZM27.1941 17.5747C27.6396 17.1292 28.2247 16.9064 28.8099 16.9064C29.3951 16.9064 29.9802 17.1292 30.4257 17.5747C30.8573 18.0063 31.0949 18.5801 31.0949 19.1904C31.0949 19.8008 30.8573 20.3746 30.4257 20.8062C29.5348 21.6972 28.085 21.6971 27.194 20.8062C26.7625 20.3746 26.5248 19.8008 26.5248 19.1905C26.5248 18.5801 26.7625 18.0063 27.1941 17.5747Z" fill="white"/>
					<path d="M11.7771 32.4264C11.972 32.4264 12.167 32.3521 12.3157 32.2033L14.8026 29.7163C15.1 29.4189 15.1 28.9366 14.8026 28.6391C14.5051 28.3416 14.0228 28.3416 13.7253 28.6391L11.2385 31.126C10.941 31.4235 10.941 31.9058 11.2385 32.2033C11.3872 32.352 11.5821 32.4264 11.7771 32.4264Z" fill="white"/>
					<path d="M17.0816 30.9184C16.7842 30.6209 16.3018 30.6209 16.0044 30.9184L11.2231 35.6997C10.9256 35.9972 10.9256 36.4795 11.2231 36.777C11.3718 36.9257 11.5667 37 11.7617 37C11.9566 37 12.1516 36.9257 12.3003 36.7769L17.0815 31.9956C17.3791 31.6982 17.3791 31.2159 17.0816 30.9184Z" fill="white"/>
					<path d="M18.2835 33.1977L15.7966 35.6846C15.4991 35.9821 15.4991 36.4644 15.7966 36.7619C15.9453 36.9106 16.1403 36.985 16.3352 36.985C16.5301 36.985 16.7251 36.9106 16.8738 36.7619L19.3607 34.2749C19.6581 33.9775 19.6581 33.4952 19.3607 33.1977C19.0632 32.9002 18.5809 32.9002 18.2835 33.1977Z" fill="white"/>
					</g>
					<defs>
					<clipPath id="clip0">
					<rect width="26" height="26" fill="white" transform="translate(11 11)"/>
					</clipPath>
					</defs>
					</svg>
					`,
				text: 'get_ready',
			},
		];

		logger.success('currentCaptureMode',currentCaptureMode);

		const handleDeviceId = async (id, type) => {
			if (type === 'camera') {
				videoConstraints = {
					...videoConstraints,
					deviceId: { ideal: id }
				};
	
				localStorage.setItem('deviceId',id);
			}
	
			if (type === 'microphone') {
				audioConstraints = {
					...audioConstraints,
					deviceId: { ideal: id }
				};
				localStorage.setItem('microphoneID',id);
			}
			startWebcam();
		};
	
		const nextStep = () => {
			if (mediaStream) {
				mediaStream?.getTracks()?.forEach(track => track.stop());
				mediaStream = null;
			}
			registerEvent({eventType: 'success', notify: false, eventName: 'prevalidation_passed'});
			updatePersistData('preChecksSteps', { preValidation: true });
			showTab('IdentityVerificationScreenOne');
		};

		const createUIElements = () => {
			let container = tabContent.querySelector('.ivso-container');
	
			if (!container) {
				container = document.createElement('div');
				container.className = 'ivso-container';
				tabContent.appendChild(container);
			} else {
				container.innerHTML = '';
			}

			const headingContainer = document.createElement('div');
			const subHeadingContainer = document.createElement('div');
			
			headingContainer.className = 'pvi-header-title';
			subHeadingContainer.className = 'pvi-msg';
	
			container.append(headingContainer);
			container.append(subHeadingContainer);
	
			const instructionsContainer = document.createElement('div');
			instructionsContainer.className = 'pvi-instructions-container';
	
			const iconTextElements = [];
	
			iconData.forEach(icon => {
				const svgWrapper = document.createElement('div');
				svgWrapper.className = 'pvi-instruction-svg';
				svgWrapper.innerHTML = icon.svg;
				const circles = svgWrapper.querySelectorAll('circle');
				circles.forEach(circle => {
					circle.setAttribute('fill', `${themeColor?.theming}`);
				});

				instructionsContainer.appendChild(svgWrapper);

				const textElement = document.createElement('div');
				textElement.className = 'pvi-instruction-txt';
				iconTextElements.push(textElement); 
				instructionsContainer.appendChild(textElement);
			});
	
			container.appendChild(instructionsContainer);
	
			const videoMainContainer = document.createElement('div');
			videoMainContainer.id = 'videoMainContainer';
			videoMainContainer.className = 'pvi-header-img';
	
			const videoContainer = document.createElement('div');
			videoContainer.id = 'videoContainer';
			videoMainContainer.appendChild(videoContainer);
	
			container.appendChild(videoMainContainer);
	
			const dropdownContainer = document.createElement('div');
			dropdownContainer.id = 'dropdownContainer';
			dropdownContainer.className = 'multi-device-block';
	
			const cameraContainer = document.createElement('div');
			cameraContainer.className = 'camera-container';
	
			const cameraDropdown = document.createElement('select');
			cameraDropdown.id = 'cameraDropdown';
			cameraContainer.appendChild(cameraDropdown);
			dropdownContainer.appendChild(cameraContainer);
	
			const microPhoneContainer = document.createElement('div');
			microPhoneContainer.className = 'microphone-container';
	
			const microphoneDropdown = document.createElement('select');
			microphoneDropdown.id = 'microphoneDropdown';
			microPhoneContainer.appendChild(microphoneDropdown);
			dropdownContainer.appendChild(microPhoneContainer);
	
			const messageElement = document.createElement('div');
			messageElement.id = 'message';
			messageElement.className = 'pvi-query-msg';
	
			const buttonContainer = document.createElement('div');
			buttonContainer.id = 'button-container';
			buttonContainer.className = 'pvi-btn-container';
	
			const continueBtn = document.createElement('button');
			continueBtn.id = 'continue-btn';
			continueBtn.textContent = i18next.t('continue'); 
			continueBtn.className = 'orange-filled-btn';
			continueBtn.style.marginLeft = 'auto';
			continueBtn.style.padding = '9px 32px';
			continueBtn.addEventListener('click', nextStep);
	
			buttonContainer.append(continueBtn);
	
			container.appendChild(dropdownContainer);
			container.appendChild(messageElement);
			container.appendChild(buttonContainer);
	
			tabContent.appendChild(container);
	
			setTextContent(headingContainer, subHeadingContainer, messageElement, iconTextElements, iconData);
		};

		const setTextContent = (headingContainer, subHeadingContainer, messageElement, iconTextElements, iconData) => {
			headingContainer.textContent = i18next.t('system_diagnostic');
			subHeadingContainer.textContent = i18next.t('initial_system_check_passed');
			messageElement.textContent = i18next.t('select_preferred_camera_and_microphone'); 
	
			if (Array.isArray(iconTextElements)) {
				iconData.forEach((icon, index) => {
					if (iconTextElements[index]) { 
						iconTextElements[index].textContent = i18next.t(icon.text); 
					}
				});
			}
		};
	
		const init = async () => {
			cameras = await getMultipleCameraDevices();
			cameras = cameras?.map(camera => ({id: camera.deviceId, name: camera.label, ...camera }));
			localStorage.setItem('deviceId',cameras?.length ? cameras[0].id : null);
			selectedCameraId = cameras?.length ? cameras[0].id : null;

			microphones = await checkForMultipleMicrophones();
			microphones = microphones?.map(microphone => ({id: microphone.deviceId, name: microphone.label, ...microphone }));
			localStorage.setItem('microphoneID',microphones?.length ? microphones[0].id : null);
			selectedMicrophoneId = microphones?.length ? microphones[0].id : null;

			startWebcam();
			updateUI();
		};

		const updateUI = () => {
			const cameraDropdown = document.getElementById('cameraDropdown');
			const microphoneDropdown = document.getElementById('microphoneDropdown');
			const messageElement = document.getElementById('message');
		
			cameraDropdown.innerHTML = '';
			microphoneDropdown.innerHTML = '';
		
			cameras.forEach(camera => {
				const option = document.createElement('option');
				option.value = camera.id;
				option.textContent = camera.name;
				if (camera.id === selectedCameraId) {
					option.selected = true;
				}
				cameraDropdown.appendChild(option);
			});
		
			microphones.forEach(microphone => {
				const option = document.createElement('option');
				option.value = microphone.id;
				option.textContent = microphone.name;
				if (microphone.id === selectedMicrophoneId) {
					option.selected = true;
				}
				microphoneDropdown.appendChild(option);
			});
		
			messageElement.textContent = i18next.t('select_preferred_camera_and_microphone');
		
			cameraDropdown.onchange = (event) => {
				selectedCameraId = event.target.value;
				handleDeviceId(selectedCameraId, 'camera');
			};
		
			microphoneDropdown.onchange = (event) => {
				selectedMicrophoneId = event.target.value;
				handleDeviceId(selectedMicrophoneId, 'microphone');
			};
		};
		
		const startWebcam = async () => {
			const videoContainer = document.getElementById('videoContainer');
			videoContainer.innerHTML = '';
	
			try {
				mediaStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false });
	
				let videoElement = document.getElementById('myVideo');
				if (!videoElement) {
					videoElement = document.createElement('video');
					videoElement.id = 'myVideo';
					videoElement.className = 'my-recorded-video';
					videoElement.controls = false; 
					videoElement.autoplay = true; 
				}
	
				videoElement.srcObject = mediaStream;
	
				videoContainer.appendChild(videoElement);
				currentCaptureMode = 'done';
				updateUI();
			} catch (error) {
				logger.error('Webcam error:', error);
				updateUI();
			}
		};

		createUIElements();

		init();

		i18next.on('languageChanged', () => {
			const headingContainer = document.querySelector('.pvi-header-title');
			const subHeadingContainer = document.querySelector('.pvi-msg');
			const messageElement = document.getElementById('message');
			const iconTextElements = document.querySelectorAll('.pvi-instruction-txt');
	
			setTextContent(headingContainer, subHeadingContainer, messageElement, Array.from(iconTextElements),iconData);
		});
	
	} catch (error) {
		logger.error('Failed to initialize; error: ' + error);
	}
};
