import Peer from 'peerjs';
import { v4 } from 'uuid';
import i18next, { t } from 'i18next';
import QRCode from 'qrcode';
import { closeModal, showTab } from '../ExamsPrechecks';
import { initSocket } from '../utils/socket';
import { renderIdentityVerificationSteps } from '../IdentitySteps.js';
import { convertDataIntoParse, getAuthenticationToken, getDateTime, getSecureFeatures, logger, registerEvent, showToast, updatePersistData } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { connectSocketConnection } from '../StartRecording/index.js';

export const MobileProctoring = async (tabContent) => {
	let mobileSteps = ''; 
	let disabledNextBtn = false; 
	let checkedVideo = false;
	let isApiLoading = false;
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const remoteVideoRef = document.createElement('video');
	remoteVideoRef.id = 'remote-mobile-video-container';
	const currentUserVideoRef = document.createElement('video');
	let peerInstance = null;
	
	const initSocketConnection = () => {
		initSocket();

		if (!window.mereos.socket) {
			logger.error('Socket not initialized');
			return;
		}

		const sendResetSession = () => {
			if (window.mereos.socket.readyState === WebSocket.OPEN) {
				window.mereos.socket.send(JSON.stringify({ event: 'resetSession' }));
				mobileSteps = '';
			} else {
				logger.warn('Socket is not open, cannot send resetSession');
			}
		};

		if (!remoteVideoRef.srcObject?.getTracks()?.length) {
			sendResetSession();
		}

		window.mereos.socket.onopen = () => {
			logger.success('WebSocket connection established');
			if (!remoteVideoRef.srcObject?.getTracks()?.length) {
				sendResetSession();
			}
		};

		window.mereos.socket.onmessage = (event) => {
			const eventData = JSON.parse(event.data);

			switch (eventData?.message?.event || eventData?.event) {
				case 'mobile_connection':
					logger.success('mobile_connection', eventData.message);
					break;

				case 'mobilePreChecksCompleted':
					mobileSteps = 'precheckCompleted';
					window.mereos.socket?.send(JSON.stringify({ event: 'requestMobileBroadcast' }));
					disabledNextBtn = true;
					renderUI();
					break;

				case 'MobileRecordingStarted':
					logger.success('MobileRecordingStarted', eventData.message);
					break;

				case 'mobile-broadcast': {
					renderUI();
					const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
					getUserMedia({ video: true, audio: false }, (mediaStream) => {
						window.mereos.mobileStream = mediaStream;

						if (peerInstance) { 
							const call = peerInstance.call(eventData?.message?.message, mediaStream);
							let remoteVideo = window.mereos.shadowRoot.getElementById('remote-mobile-video-container');
				
							call?.on('stream', (remoteStream) => {
								remoteVideo.srcObject = remoteStream;
								remoteVideo.setAttribute('autoplay', true);
								remoteVideo.setAttribute('playsinline', true);
								disabledNextBtn = false;
								renderUI();
								setupEventListeners(mobileSteps);
							});

							call?.on('close', () => {
								if(remoteVideo.srcObject){
									remoteVideo.srcObject = null;
								}
								disabledNextBtn = false;
							});
	
							call?.on('error', (error) => {
								logger.error('Error during call:', error);
							});
						} else {
							logger.error('peerInstance is not initialized');
						}
					});
					break;
				}
				
				case 'violation':
					if (eventData?.message?.message === 'Violation') {
						mobileSteps = 'tokenCode';
						checkedVideo = false;
						showToast('error', 'mobile_phone_disconnected');
						updatePersistData('session', {
							sessionStatus:'Terminated'
						});
						window.mereos.precheckCompleted=false;
						if(window.mereos.mobileStream){
							window.mereos.mobileStream.getTracks().forEach(track => track.stop());
						}
						renderUI();
					} else {
						logger.error(eventData?.message?.message);
					}
					break;

				default:
					logger.error('Unknown event:', eventData?.message);
					break;
			}
		};

		window.mereos.socket.onerror = (error) => {
			logger.error('WebSocket error:', error);
		};

		window.mereos.socket.onclose = () => {
			logger.error('WebSocket connection closed');
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
				logger.success('Peer connection opened with ID:', id);
			});
		
			peer.on('error', (error) => {
				logger.error('Peer connection error:', error);
			});

			peer.on('close', () => {
				logger.error('Peer connection closed');
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
			logger.error('Failed to create Peer instance:', error);
		}
	};

	const nextStep = async (newStep) => {
		try{
			console.log('in the nextStep');
			mobileSteps = newStep;
			renderUI(); 
			if (newStep === 'step4') {
				if(!window.mereos.mobileProctoring){
					logger.success('in the if condition');
					registerEvent({ eventType: 'success', notify: false, eventName: 'mobile_connection_successful', eventValue: getDateTime() });
					updatePersistData('preChecksSteps', { mobileConnection: true });
					showTab('IdentityVerificationScreenFive');
					let container = window.mereos.shadowRoot.getElementById('mobile-proctoring');
					if(container){
						container.innerHTML = '';
					}
					if(currentUserVideoRef){
						currentUserVideoRef.srcObject = null;
						remoteVideoRef.remove();
					}
					if(window.mereos.mobileStream){
						window.mereos.mobileStream.getTracks().forEach(track => track.stop());
					}
					if (remoteVideoRef) {
						remoteVideoRef.srcObject = null;
						remoteVideoRef.remove();
					}
				}else{
					logger.success('in the else condition');
					const session = convertDataIntoParse('session');
					
					isApiLoading = true;
					disabledNextBtn = true;
					renderUI();
					
					try {
						if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
							window.mereos.socket.send(
								JSON.stringify({
									event: 'twilioToken',
									message: session.mobileTwilioToken,
								})
							);
						}
						if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
							window.mereos.socket.send(
								JSON.stringify({ 
									event: 'startRecording', 
									data: 'Web video recording started' 
								})
							);
						}		
						connectSocketConnection();		
						closeModal();
						if(window.mereos.startRecordingCallBack){
							window.mereos.startRecordingCallBack({ 
								type:'success',
								message: 'mobile_phone_reconnected',
								code:50006
							});
						}
					} catch (error) {
						updatePersistData('preChecksSteps', { 
							mobileConnection: false,
							screenSharing: false
						});
						if(window.mereos.startRecordingCallBack){
							window.mereos.startRecordingCallBack({ 
								type:'error',
								message: 'error_on_start_mobile_recording' ,
								code:40009
							});
						}
						window.mereos.recordingStart = false;
						logger.error('error',error);
					} finally {
						isApiLoading = false;
						disabledNextBtn = false;
						renderUI();
					}
				}
			}
		}catch(error){
			logger.error('error',error);
			isApiLoading = false;
			disabledNextBtn = false;
			renderUI();
		}
	};

	const prevStep = (previousStep) => {
		if(previousStep === 'previousStep'){
			updatePersistData('preChecksSteps', { mobileConnection: false });
			let navHistory = JSON.parse(localStorage.getItem('navHistory'));
			const currentIndex = navHistory.indexOf('MobileProctoring');
			const previousPage = currentIndex > 0 ? navHistory[currentIndex - 1] : null;
			showTab(previousPage);
		} else {
			mobileSteps = 'tokenCode';
			checkedVideo = false;
			if (window.mereos.socket.readyState === WebSocket.OPEN) {
				window.mereos.socket?.send(JSON.stringify({ event: 'resetSession' }));
			}
			renderUI(); 
		}
	};

	function renderUI() {
		const socketGroupIds = JSON.parse(localStorage.getItem('socketGroupId'));
		let container = tabContent?.querySelector('.mobile-conection-container');
		if (!container) {
			container = document.createElement('div');
			container.className = 'mobile-conection-container';
			container.id = 'mobile-proctoring';
			tabContent.appendChild(container);
		}
		
		const stepsHTML = document.createElement('div');
		renderIdentityVerificationSteps(stepsHTML, 5);

		const baseHTML = `
			<div class="ivsf-wrapper">
				<div class="mobile-header-title">${t('setting_up_your_phone_camera')}</div>
				${stepsHTML.innerHTML}
				${renderStepContent(mobileSteps, socketGroupIds, secureFeatures)}
			</div>
		`;
		
		container.innerHTML = baseHTML;

		setupEventListeners(mobileSteps);

		if (mobileSteps === 'precheckCompleted') {
			const videoContainer = container.querySelector('.video-container');
			if (videoContainer) {
				videoContainer.appendChild(remoteVideoRef);
				
				if (disabledNextBtn) {
					const loaderHTML = `
						<div class='video-loader'>
							<div class='spinner'>
								<div class='bounce1'></div>
								<div class='bounce2'></div>
								<div class='bounce3'></div>
							</div>
						</div>
					`;
					videoContainer.insertAdjacentHTML('beforeend', loaderHTML);
				}
			}
		}
	}

	function renderStepContent(step, socketGroupIds, secureFeatures) {
		const prevStepsEntities = ['verify_candidate', 'verify_id', 'record_audio', 'record_room'];
		const showPrevButton = secureFeatures.filter(entity => prevStepsEntities.includes(entity.key))?.length > 0;
		
		switch (step) {
			case '':
				return `
					<div class="mobile-connection-banner">
						<img class="banner-image" src="${ASSET_URL}/mobile-connection-banner.png" />
						<div class="banner-info-box">
							<div class="title">
								<img src="${ASSET_URL}/info-blue.svg" />
								<p>${t('during_your_assessment')}</p>
							</div>
							<p class="desc">
								${t('notifications_on_your_phone_should_be_turned_off')}<br />
								${t('do_not_lock_your_phone')}
							</p>
						</div>
					</div>
					
					<div class="bottom-desc">${t('in_order_to_carry_out_your_assessment')}</div>
					
					<div class="ivsf-btn-container">
						<button class="orange-hollow-btn" id="already-have-app-btn">${t('i_already_have_the_app')}</button>
						<button class="orange-filled-btn" id="download-app-btn">${t('download_the_app')}</button>
					</div>
				`;
				
			case 'downloadApp':
				return `
					<div class="qr-code-container">
						<canvas id="download-qr-canvas"></canvas>
						<p class="bottom-desc">${t('please_scan_this_qr_code')}</p>
						<div class="ivsf-btn-container">
							${showPrevButton ? `<button class="orange-hollow-btn" id="previous-step-btn">${t('previous_step')}</button>` : ''}
							<button class="orange-filled-btn" id="downloaded-app-btn">${t('i_downloaded_the_app')}</button>
						</div>
					</div>
				`;
				
			case 'tokenCode':
				return `
					<div class="qr-code-container">
						<canvas id="token-qr-canvas"></canvas>
						<p class="bottom-desc">${t('open_the_mereos_mobile_application')}</p>
						<div class="ivsf-btn-container">
							${showPrevButton ? `<button class="orange-hollow-btn" id="previous-step-btn">${t('previous_step')}</button>` : ''}
							<button class="orange-filled-btn" id="no-app-btn">${t('i_dont_have_the_app')}</button>
						</div>
					</div>
				`;
				
			default: 
				return `
					<div class="remote-mobile-video">
						<div class="mobile-broadcastin-container">
							<img class="banner-image" src="${ASSET_URL}/user-video-tutorial.jpeg" />
							<div class="video-container"></div>
						</div>
						
						<span class="example-text">${t('example_tutorial')}</span>
						
						 <label for="video-check" class="bottom-desc-remote">
								<input type="checkbox" id="video-check" ${checkedVideo ? 'checked' : ''} />
								<span>${t('is_the_camera_feedback_good')}</span>
						</label>
						
						<div class="mobile-btn-container">
							<button class="orange-hollow-btn" id="previous-btn">${t('previous_step')}</button>
							<button class="orange-filled-btn" id="next-btn" ${!checkedVideo || disabledNextBtn ? 'disabled' : ''}>
								${isApiLoading ? `
									<span class="button-loader">
										<span class="spinner-small"></span>
										${t('loading')}...
									</span>
								` : t('next')}
							</button>
						</div>
					</div>
				`;
		}
	}

	function setupEventListeners(step) {
		const downloadCanvas = window.mereos.shadowRoot.getElementById('download-qr-canvas');
		const tokenCanvas = window.mereos.shadowRoot.getElementById('token-qr-canvas');
		const socketGroupIds = JSON.parse(localStorage.getItem('socketGroupId'));
		switch (step) {
			case '':
				window.mereos.shadowRoot.getElementById('already-have-app-btn')?.addEventListener('click', () => prevStep('tokenCode'));
				window.mereos.shadowRoot.getElementById('download-app-btn')?.addEventListener('click', () => nextStep('downloadApp'));
				break;
				
			case 'downloadApp':
				if (downloadCanvas) {
					QRCode.toCanvas(downloadCanvas, 'https://mobile.mereos.eu/', function (error) {
						if (error) logger.error('error in QR code', error);
					});
				}
				window.mereos.shadowRoot.getElementById('previous-step-btn')?.addEventListener('click', () => prevStep('previousStep'));
				window.mereos.shadowRoot.getElementById('downloaded-app-btn')?.addEventListener('click', () => nextStep('tokenCode'));
				break;
				
			case 'tokenCode':
				
				if (tokenCanvas) {
					QRCode.toCanvas(tokenCanvas, JSON.stringify({
						token: getAuthenticationToken(),
						groupName: socketGroupIds?.groupName
					}), function (error) {
						if (error) logger.error('Error in QR code', error);
					});
				}
				window.mereos.shadowRoot.getElementById('previous-step-btn')?.addEventListener('click', () => prevStep('previousStep'));
				window.mereos.shadowRoot.getElementById('no-app-btn')?.addEventListener('click', () => nextStep('downloadApp'));
				break;
				
			default: 
				window.mereos.shadowRoot.getElementById('video-check')?.addEventListener('change', (e) => {
					checkedVideo = e.target.checked;
					setTimeout(() => {
						renderUI();
					}, 0);
				});
				window.mereos.shadowRoot.getElementById('previous-btn')?.addEventListener('click', () => prevStep());
				window.mereos.shadowRoot.getElementById('next-btn')?.addEventListener('click', () => nextStep('step4'));
				break;
		}
	}

	const initProctoring = () => {
		if(window.mereos.webStream) {
			window.mereos.webStream.getTracks().forEach(track => track.stop());
		}
		initSocketConnection();
		initPeerConnection();
		renderUI();
	};

	initProctoring();

	i18next.on('languageChanged', renderUI);
};