
import Peer from 'peerjs';
import socket from '../utils/socket';
import '../assets/css/mobile-proctoring.css';
import { renderIdentityVerificationSteps } from './IdentitySteps';
import i18next, { t } from 'i18next';
import QRCode from 'qrcode';
import MobileBanner from '../assets/images/mobile-connection-banner.png';
import infoBlue from '../assets/images/info-blue.svg';
import { getAuthenticationToken, getDateTime, registerEvent, showToast, updatePersistData } from '../utils/functions';
import { showTab } from './examPrechecks';
import cameraExample from '../assets/images/user-video-tutorial.jpeg';
import { v4 } from 'uuid';

window.mobileStream = null;
export const MobileProctoring = async (tabContent) => {
	let mobileSteps = ''; 
	let disabledNextBtn = false; 
	let checkedVideo = false;
	const remoteVideoRef = document.createElement('video');
	const currentUserVideoRef = document.createElement('video');
	let peerInstance = null;
  
	const socketGroupIds = JSON.parse(localStorage.getItem('socketGroupId'));

	const initSocketConnection = () => {
		if (!socket) {
			console.error('Socket not initialized');
			return;
		}

		const sendResetSession = () => {
			if (socket.readyState === WebSocket.OPEN) {
				socket.send(JSON.stringify({ event: 'resetSession' }));
				mobileSteps = '';
			} else {
				console.warn('Socket is not open, cannot send resetSession');
			}
		};

		if (!remoteVideoRef.srcObject?.getTracks()?.length) {
			sendResetSession();
		}

		socket.onopen = () => {
			if (!remoteVideoRef.srcObject?.getTracks()?.length) {
				sendResetSession();
			}
		};

		socket.onmessage = (event) => {
			const eventData = JSON.parse(event.data);

			switch (eventData?.message?.event || eventData?.event) {
				case 'mobile_connection':
					console.log('mobile_connection', eventData.message);
					break;

				case 'mobilePreChecksCompleted':
					mobileSteps = 'precheckCompleted';
					socket?.send(JSON.stringify({ event: 'requestMobileBroadcast' }));
					disabledNextBtn = true;
					renderUI();
					break;

				case 'MobileRecordingStarted':
					console.log('MobileRecordingStarted', eventData?.message?.message);
					break;

				case 'mobile-broadcast': {
					renderUI();
					const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
					getUserMedia({ video: true, audio: false }, (mediaStream) => {
						window.mobileStream = mediaStream;

						if (peerInstance) { 
							const call = peerInstance.call(eventData?.message?.message, mediaStream);
							let remoteVideo = document.getElementById('remote-mobile-video-container');
				
							call?.on('stream', (remoteStream) => {
								remoteVideo.srcObject = remoteStream;
								remoteVideo.setAttribute('autoplay', true);
								remoteVideo.setAttribute('playsinline', true);
								disabledNextBtn = false;
							});
	
							call?.on('close', () => {
								if(remoteVideo.srcObject){
									remoteVideo.srcObject = null;
								}
								disabledNextBtn = false;
							});
	
							call?.on('error', (error) => {
								console.error('Error during call:', error);
							});
						} else {
							console.error('peerInstance is not initialized');
						}
					});
					break;
				}
				
				case 'violation':
					if (eventData?.message?.message === 'Violation') {
						mobileSteps = 'tokenCode';
						checkedVideo = false;
						showToast('error',i18next.t('mobile_phone_disconneted'));
						if(window.mobileStream){
							window.mobileStream.getTracks().forEach(track => track.stop());
						}
						renderUI();
					} else {
						console.error(eventData?.message?.message);
					}
					break;

				default:
					console.log('Unknown event:', eventData?.message);
					break;
			}
		};

		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		socket.onclose = () => {
			console.log('WebSocket connection closed');
		};
	};

	const initPeerConnection = () => {
		try {
			if (peerInstance) {
				peerInstance.destroy();
			}

			const groupName = v4();

			const peer = new Peer(groupName);

			peerInstance = peer;

			peer.on('open', (id) => {
				console.log('Peer connection opened with ID:', id);
			});
		
			peer.on('error', (error) => {
				console.error('Peer connection error:', error);
			});

			peer.on('close', () => {
				console.log('Peer connection closed');
			});

			peer.on('call', (call) => {
				const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
				getUserMedia({ video: true, audio: true }, (mediaStream) => {
					currentUserVideoRef.srcObject = mediaStream;
					call.answer(mediaStream);
					call.on('stream', (remoteStream) => {
						remoteVideoRef.srcObject = remoteStream;
					});
				});
			});
		} catch (error) {
			console.error('Failed to create Peer instance:', error);
		}
	};

	const nextStep = (newStep) => {
		mobileSteps = newStep;
		renderUI(); 
		if(newStep === 'step4'){
			window.mobileStream?.getTracks()?.forEach((track) => track.stop());
			registerEvent({ eventType: 'success', notify: false, eventName: 'mobile_connection_successfull', eventValue: getDateTime() });
			updatePersistData('preChecksSteps', { mobileConnection: true });
			showTab('IdentityVerificationScreenFive');
			let container = document.getElementById('mobile-proctoring');
			if(container){
				container.innerHTML = '';
			}
			if(remoteVideoRef){
				remoteVideoRef.srcObject = null;
			}
		}
	};

	const prevStep = () => {
		mobileSteps = 'tokenCode';
		checkedVideo = false;
		if(window.mobileStream){
			window.mobileStream?.getTracks()?.forEach(track => track.stop());
		}
		if (socket.readyState === WebSocket.OPEN) {
			socket?.send(JSON.stringify({ event: 'resetSession' }));
		}
		renderUI(); 
	};

	function renderUI() {
		let container = tabContent?.querySelector('.ivsf-container');
		if (!container) {
			container = document.createElement('div');
			container.className = 'ivsf-container';
			tabContent.appendChild(container);
			container.id = 'mobile-proctoring';
		}
		container.innerHTML = '';

		const wrapper = document.createElement('div');
		wrapper.className = 'ivsf-wrapper';

		const headerTitle = document.createElement('div');
		headerTitle.className = 'mobile-header-title';
		headerTitle.innerText = t('setting_up_your_phone_camera');
		
		const stepsContainer = document.createElement('div');
		renderIdentityVerificationSteps(stepsContainer, 5);

		wrapper.appendChild(headerTitle);
		wrapper.appendChild(stepsContainer);

		if (mobileSteps === '') {
			const mobileConnectionBanner = document.createElement('div');
			mobileConnectionBanner.className = 'mobile-connection-banner';

			const bannerImage = document.createElement('img');
			bannerImage.className = 'banner-image';
			bannerImage.src = MobileBanner;
			mobileConnectionBanner.appendChild(bannerImage);

			const bannerInfoBox = document.createElement('div');
			bannerInfoBox.className = 'banner-info-box';

			const title = document.createElement('div');
			title.className = 'title';
			title.innerHTML = `<img src="${infoBlue}" /> <p>${t('during_your_assessment')}</p>`;

			const desc = document.createElement('p');
			desc.className = 'desc';
			desc.innerHTML = `${t('notifications_on_your_phone_should_be_turned_off')}<br />${t('do_not_lock_your_phone')}`;

			bannerInfoBox.appendChild(title);
			bannerInfoBox.appendChild(desc);
			mobileConnectionBanner.appendChild(bannerInfoBox);
			wrapper.appendChild(mobileConnectionBanner);

			const bottomDesc = document.createElement('div');
			bottomDesc.className = 'bottom-desc';
			bottomDesc.innerText = t('in_order_to_carry_out_your_assessment');
			wrapper.appendChild(bottomDesc);

			const btnContainer = document.createElement('div');
			btnContainer.className = 'ivsf-btn-container';

			const btnBack = document.createElement('button');
			btnBack.className = 'orange-hollow-btn';
			btnBack.innerText = t('i_already_have_the_app');
			btnBack.onclick = prevStep;

			const btnDownload = document.createElement('button');
			btnDownload.className = 'orange-filled-btn';
			btnDownload.innerText = t('download_the_app');
			btnDownload.onclick = () => nextStep('downloadApp');

			btnContainer.appendChild(btnBack);
			btnContainer.appendChild(btnDownload);
			wrapper.appendChild(btnContainer);

		} else if (mobileSteps === 'downloadApp') {
			const qrCodeContainer = document.createElement('div');
			qrCodeContainer.className = 'qr-code-container';

			const canvas = document.createElement('canvas');
			qrCodeContainer.appendChild(canvas);

			QRCode.toCanvas(canvas, 'https://mobile.mereos.eu/', function (error) {
				if (error) console.error(error);
			});

			const bottomDesc = document.createElement('p');
			bottomDesc.className = 'bottom-desc';
			bottomDesc.innerText = t('please_scan_this_qr_code');

			const btnContainer = document.createElement('div');
			btnContainer.className = 'ivsf-btn-container';

			const btnDownloaded = document.createElement('button');
			btnDownloaded.className = 'orange-filled-btn';
			btnDownloaded.innerText = t('i_downloaded_the_app');
			btnDownloaded.onclick = () => nextStep('tokenCode');

			btnContainer.appendChild(btnDownloaded);
			qrCodeContainer.appendChild(bottomDesc);
			qrCodeContainer.appendChild(btnContainer);
			wrapper.appendChild(qrCodeContainer);

		} else if (mobileSteps === 'tokenCode') {
			const qrCodeContainer = document.createElement('div');
			qrCodeContainer.className = 'qr-code-container';
			const canvas = document.createElement('canvas');
			qrCodeContainer.appendChild(canvas);
      
			QRCode.toCanvas(canvas, JSON.stringify({
				token: getAuthenticationToken(),
				groupName: socketGroupIds?.groupName
			}), function (error) {
				if (error) console.error(error);
			});

			const bottomDesc = document.createElement('p');
			bottomDesc.className = 'bottom-desc';
			bottomDesc.innerText = t('open_the_mereos_mobile_application');

			const btnContainer = document.createElement('div');
			btnContainer.className = 'ivsf-btn-container';

			const btnDownloaded = document.createElement('button');
			btnDownloaded.className = 'orange-filled-btn';
			btnDownloaded.innerText = t('i_dont_have_the_app');
			btnDownloaded.onclick = () => nextStep('downloadApp');

			btnContainer.appendChild(btnDownloaded);
			qrCodeContainer.appendChild(bottomDesc);
			qrCodeContainer.appendChild(btnContainer);
			wrapper.appendChild(qrCodeContainer);

		} else {
			const remoteMobileVideo = document.createElement('div');
			remoteMobileVideo.className = 'remote-mobile-video';

			const bannerVideoContainer = document.createElement('div');
			bannerVideoContainer.className = 'mobile-broadcastin-container';

			const bannerImage = document.createElement('img');
			bannerImage.className = 'banner-image';
			bannerImage.src = cameraExample;
      
			const remoteVideoRef = document.createElement('video');
			remoteVideoRef.id = 'remote-mobile-video-container';
			
			const videoContainer = document.createElement('div');
			videoContainer.appendChild(remoteVideoRef);

			bannerVideoContainer.appendChild(bannerImage);
			bannerVideoContainer.appendChild(videoContainer);

			const exampleText = document.createElement('span');
			exampleText.className = 'example-text';
			exampleText.innerText = t('example_tutorial');

			const bottomDescRemote = document.createElement('div');
			bottomDescRemote.className = 'bottom-desc-remote';

			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.checked = checkedVideo;
			checkbox.onchange = (e) => {
				checkedVideo = e.target.checked; 
				btnNext.disabled = !checkedVideo; 
			};

			const label = document.createElement('p');
			label.innerText = t('is_the_camera_feedback_good');

			bottomDescRemote.appendChild(checkbox);
			bottomDescRemote.appendChild(label);
			remoteMobileVideo.appendChild(bannerVideoContainer);
			remoteMobileVideo.appendChild(exampleText);
			remoteMobileVideo.appendChild(bottomDescRemote);

			const btnContainer = document.createElement('div');
			btnContainer.className = 'mobile-btn-container';

			const btnPrevious = document.createElement('button');
			btnPrevious.className = 'orange-hollow-btn';
			btnPrevious.innerText = t('previous_step');
			btnPrevious.onclick = prevStep;

			const btnNext = document.createElement('button');
			btnNext.className = 'orange-filled-btn';
			btnNext.innerText = t('next');
			btnNext.disabled = !checkedVideo || disabledNextBtn;
			btnNext.onclick = () => nextStep('step4');

			btnContainer.appendChild(btnPrevious);
			btnContainer.appendChild(btnNext);
			remoteMobileVideo.appendChild(btnContainer);
			wrapper.appendChild(remoteMobileVideo);

		}

		container.appendChild(wrapper);
		tabContent.appendChild(container);
	}

	const initProctoring = () => {
		if(window.webStream) {
			window.webStream.getTracks().forEach(track => track.stop());
		}
		
		initPeerConnection();

		initSocketConnection();

		renderUI();
	};

	initProctoring();
};
