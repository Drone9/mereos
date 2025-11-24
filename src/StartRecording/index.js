import * as TwilioVideo from 'twilio-video';
import i18next from 'i18next';
import { v4 } from 'uuid';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { 
	addSectionSessionRecord, 
	cleanupZendeskWidget, 
	convertDataIntoParse, 
	detectBackButton, 
	detectBackButtonCallback, 
	detectPageRefresh, 
	findConfigs, 
	forceClosure, 
	getDateTime, 
	getSecureFeatures, 
	getTimeInSeconds, 
	getTrackDeviceId, 
	initializeI18next, 
	isDevicePresent, 
	loadZendeskWidget, 
	lockBrowserFromContent, 
	logger, 
	probeExactDevice, 
	registerAIEvent, 
	registerEvent, 
	restoreRightClick, 
	showToast, 
	unlockBrowserFromContent, 
	updatePersistData, 
	updateThemeColor
} from '../utils/functions';
import { getCreateRoom } from '../services/twilio.services';
import { aiEventsFeatures, ASSET_URL, LockDownOptions, recordingEvents } from '../utils/constant';
import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';
import { initializeLiveChat, initShadowDOM, openModal } from '../ExamsPrechecks';

let aiEvents = [];
let mediaStream = null;
const trackStoppedListeners = new WeakMap();
const deviceChangeHandlers = new WeakMap();
let isMediaError = false;
let isSignalingError = false;

export const initMobileConnection = () => {
	const session = convertDataIntoParse('session');
    
	if (window.mereos.mobileRoomInstance) {
		window.mereos.mobileRoomInstance.disconnect();
		window.mereos.mobileRoomInstance = null;
	}
    
	getCreateRoom({
		room_name: session?.mobileRoomSessionId,
		auto_record: false
	}).then(async (twilioTokens) => {    
		const twilioRoom = await TwilioVideo.connect(twilioTokens?.data?.token, {
			audio: false,
			video: false
		});
		window.mereos.mobileRoomInstance = twilioRoom;
		if(twilioRoom){
			VideoChat(twilioRoom);
		}
	}).catch((error) => {
		logger.error('Mobile reconnection failed:', error);
		registerEvent({ eventType: 'success', notify: false, eventName: 'mobile_connection_failed',eventValue:error });
		if(window.mereos.startRecordingCallBack){
			window.mereos.startRecordingCallBack({ 
				type:'error',
				message: 'mobile_connection_failed',
				code:40016
			});
		}
	});
};

export const connectSocketConnection = () => {
	if (!window.mereos?.socket) {
		updatePersistData('preChecksSteps', { 
			mobileConnection: false,
			screenSharing: false
		});
		if(window.mereos.startRecordingCallBack){
			window.mereos.startRecordingCallBack({ 
				type:'error',
				message: 'mobile_connection_disconnected' ,
				code:40008
			});
		}
		logger.error('Socket not initialized');
		return;
	}

	window.mereos.socket.onmessage = (event) => {
		const eventData = JSON.parse(event?.data);
		switch (eventData?.message?.event || eventData?.event) {
			case 'MobileRecordingStarted': {
				initMobileConnection();

				break;
			}

			case 'violation':
				if(eventData?.message?.message === 'Violation'){
					updatePersistData('preChecksSteps', { 
						mobileConnection: false,
						screenSharing: false
					});
					showToast('error','mobile_phone_disconnected');
					const moileElement = document.getElementById('remote-video');
					if(moileElement){
						moileElement.remove();
					}
					if(window.mereos.mobileRoomInstance){
						window.mereos.mobileRoomInstance.removeAllListeners();
						window.mereos.mobileRoomInstance.disconnect();
						window.mereos.mobileRoomInstance = null;
					}
					window.mereos.mobileProctoring=true;
					if(window.mereos.startRecordingCallBack){
						window.mereos.startRecordingCallBack({ 
							type:'error',
							message: 'mobile_phone_disconnected',
							code:40010
						});
					}
					openModal();
				}
				registerEvent({ eventType: 'error', notify: false, eventName:'mobile_phone_disconnected' , eventValue: getDateTime() });
				break;

			default:
				logger.success('Unknown event:', eventData?.message);
				break;
		}
	};
		
	window.mereos.socket.onerror = (error) => {
		logger.error('WebSocket error:', error);
	};
};

const showPermissionModal = () => {
	let container, existingModal;
  
	if (window.mereos?.shadowRoot) {
		container = window.mereos.shadowRoot;
		existingModal = container.getElementById('permissionModal');
	} else {
		container = document.body;
		existingModal = document.getElementById('permissionModal');
	}
  
	if (existingModal) {
		existingModal.remove();
	}

	const modalDiv = document.createElement('div');
	modalDiv.id = 'permissionModal';
	modalDiv.className = 'permission-modal-overlay';
  
	modalDiv.innerHTML = `
    <div class="permission-modal">
      <div class="permission-modal-header">
        <h3>${i18next.t('camera_access_lost')}</h3>
      </div>
      <div class="permission-modal-body">
        <div class="permission-instructions">
          <p>${i18next.t('your_camera_access_has_been_disabled_during_the_session')}</p>
          <ol>
            <li>${i18next.t('click_the_camera_icon')}</li>
            <li>${i18next.t('select_allow_for_camera_access')}</li>
            <li>${i18next.t('click_reconnect_camera_below')}</li>
          </ol>
          
          <div class="browser-instructions">
            <h4>${i18next.t('alternative_method')}</h4>
            <ul>
              <li><strong>${i18next.t('chrome_edge')}</strong> ${i18next.t('settings_camera_steps')}</li>
              <li><strong>${i18next.t('firefox')}</strong> ${i18next.t('firefox_camera_steps')}</li>
              <li><strong>${i18next.t('safari')}</strong> ${i18next.t('safari_camera_step')}</li>
            </ul>
          </div>
          
          <div class="permission-modal-buttons">
            <button class="orange-filled-btn" type="button" id="reconnectBtn">
              ${i18next.t('reconnect_camera')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
	try {
		container.appendChild(modalDiv);
	} catch (error) {
		console.error('Error adding modal to container:', error);
		document.body.appendChild(modalDiv);
	}
  
	document.body.style.overflow = 'hidden';
  
	addModalEventListeners();
};

const hidePermissionModal = () => {
	let modal;
  
	if (window.mereos?.shadowRoot) {
		modal = window.mereos.shadowRoot.getElementById('permissionModal');
	} else {
		modal = document.getElementById('permissionModal');
	}
  
	if (modal) {
		modal.remove();
	}
	document.body.style.overflow = 'auto';
};

const addModalEventListeners = () => {
	let modal;
  
	if (window.mereos?.shadowRoot) {
		modal = window.mereos.shadowRoot.getElementById('permissionModal');
	} else {
		modal = document.getElementById('permissionModal');
	}
  
	if (!modal) return;

	const reconnectBtn = modal.querySelector('#reconnectBtn');
  
  
	if (reconnectBtn) {
		reconnectBtn.addEventListener('click', reconnectCamera);
	}
  
	modal.addEventListener('click', function(e) {
		if (e.target === modal) {
			hidePermissionModal();
		}
	});
};

const cleanupCameraTracks = async (room, trackKind) => {
	const existingTracks = Array.from(
		trackKind === 'video' ? room.localParticipant.videoTracks.values() : room.localParticipant.audioTracks.values()
	);
	
	for (const trackPublication of existingTracks) {
		if (trackPublication.track && trackPublication.track.kind === trackKind) {
			if (trackKind === 'video' && (
				trackPublication.track.name?.includes('screen') || 
				trackPublication === window.mereos?.screenTrackPublished
			)) {
				continue;
			}
			
			if (typeof trackStoppedListeners !== 'undefined' && trackStoppedListeners.has(trackPublication.track)) {
				trackStoppedListeners.delete(trackPublication.track);
			}
			
			try {
				await room.localParticipant.unpublishTrack(trackPublication.track);
				trackPublication.track.stop();
			} catch (error) {
				console.error('Error cleaning up camera track:', error);
			}
		}
	}
};

const handleDeviceLost = (kind, isUserDisabled = false,track) => {
	if(track.name.includes('screen-share')) return;

	const container = window.mereos?.shadowRoot || document;
	const session = convertDataIntoParse('session');

	const userRemoteVideo = container.querySelector('#user-video-element');
  if (userRemoteVideo) {
    userRemoteVideo.style.display = 'none';
    userRemoteVideo.remove();
  }

  if (typeof showPermissionModal === 'function' && 
    session.sessionStatus === 'Attending') {
  showPermissionModal();
	}

  if (window.mereos?.startRecordingCallBack) {
    window.mereos.startRecordingCallBack({
      type: 'error',
      message: kind === 'video' ? 'camera_is_stopped' : 'microphone_is_stopped',
      code: 40019,
    });
  }

  if (typeof registerEvent === 'function' && session.sessionStatus === 'Attending') {
    let eventName;
    
    if (isUserDisabled) {
      eventName = kind === 'video' ? 'camera_permission_denied_hardware' : 'camera_permission_denied_hardware';
    } else {
      eventName = kind === 'video' ? 'camera_permission_disabled' : 'microphone_permission_denied';
    }
    
    registerEvent({
      eventType: 'error',
      notify: false,
      eventName: eventName,
      eventValue: new Date(),
    });
  }
};

const attachDeviceChangeWatcher = (track) => {
  const kind = track.kind;
  const deviceId = getTrackDeviceId(track);
	const session = convertDataIntoParse('session');
  const handler = async () => {
    try {
      const present = await isDevicePresent(kind, deviceId);
      if (!present) {
        handleDeviceLost(kind, false,track);
      }
    } catch (e) {
      console.error('devicechange check failed', e);
    }
  };

	if(session.sessionStatus === 'Attending'){
  	navigator.mediaDevices.addEventListener('devicechange', handler);
	}
  deviceChangeHandlers.set(track, handler);
};

const detachDeviceChangeWatcher = (track) => {
  const handler = deviceChangeHandlers.get(track);
  if (handler) {
    navigator.mediaDevices.removeEventListener('devicechange', handler);
    deviceChangeHandlers.delete(track);
  }
};

const setupTrackStoppedListeners = (track) => {
  attachDeviceChangeWatcher(track);
	const session = convertDataIntoParse('session');
  const stoppedListener = async () => {

    const kind = track.kind;
    const mst = track.mediaStreamTrack;
    const deviceId = getTrackDeviceId(track);

    try {
      if (mst && mst.readyState === 'ended') {
        const present = await isDevicePresent(kind, deviceId);
        if (!present) {
          handleDeviceLost(kind, false,track);
          return;
        }
      }

      await probeExactDevice(kind, deviceId);
      handleDeviceLost(kind, true,track);
    } catch (probeError) {
      logger?.error?.(`Exact-device probe failed for ${kind}`, probeError);
			if(probeError.name === 'NotAllowedError'){
      	handleDeviceLost(kind, false,track);
			}else if (probeError.name === 'NotReadableError'){
      	handleDeviceLost(kind, true,track);
			}
    } finally {
      detachDeviceChangeWatcher(track);
    }
  };

	if(session.sessionStatus === 'Attending' && !track.name.includes('screen-share')){
  	track.on('stopped', stoppedListener);
	}

  trackStoppedListeners.set(track, stoppedListener);
};

const removeStoppedListener = (track) => {
  const fn = trackStoppedListeners.get(track);
  if (fn) {
    try { track.off('stopped', fn); } catch {}
    trackStoppedListeners.delete(track);
  }
  detachDeviceChangeWatcher(track);
};

const reconnectCamera = async () => {
	try {		
		if (!window.mereos?.roomInstance) {
			console.error('No active Twilio room instance found');
			if (window.mereos.startRecordingCallBack) {
				window.mereos.startRecordingCallBack({ 
					type: 'error',
					message: 'no_active_session_found',
					code: 40021
				});
			}
			return;
		}
		
		hidePermissionModal();
		
		const secureFeatures = getSecureFeatures();
		const session = convertDataIntoParse('session');
		const room = window.mereos.roomInstance;
		
		const mediaConstraints = {};
		let needsVideo = false;
		let needsAudio = false;
		
		if (findConfigs(['record_video'], secureFeatures?.entities).length) {
			mediaConstraints.video = localStorage.getItem('deviceId') 
				? { deviceId: { exact: localStorage.getItem('deviceId') } } 
				: true;
			needsVideo = true;
		}
		
		if (findConfigs(['record_audio'], secureFeatures?.entities).length) {
			mediaConstraints.audio = localStorage.getItem('microphoneID') 
				? { deviceId: { exact: localStorage.getItem('microphoneID') } } 
				: true;
			needsAudio = true;
		} else {
			mediaConstraints.audio = false;
		}
		
		if (!needsVideo && !needsAudio) {
			console.log('No camera or audio recording configured');
			return;
		}
		
		const mediaStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
		
		if (needsVideo) {
			await cleanupCameraTracks(room, 'video');
		}
		if (needsAudio) {
			await cleanupCameraTracks(room, 'audio');
		}
		
		const videoTrack = mediaStream.getVideoTracks()[0];
		const audioTrack = mediaStream.getAudioTracks()[0];
		
		let newVideoTrackPublication, newAudioTrackPublication;
		let cameraRecordings = [...(session.user_video_name || [])];
		let audioRecordings = [...(session.user_audio_name || [])];
		
		if (videoTrack && needsVideo) {
			const twilioVideoTrack = new TwilioVideo.LocalVideoTrack(videoTrack);
			newVideoTrackPublication = await room.localParticipant.publishTrack(twilioVideoTrack);
			
			cameraRecordings.push(newVideoTrackPublication.trackSid);
			
			await new Promise(resolve => setTimeout(resolve, 100));
			hidePermissionModal();
			const localVideoTrack = Array.from(room.localParticipant.videoTracks.values())
				.find(publication => publication.trackSid === newVideoTrackPublication.trackSid)?.track;
			
			if (localVideoTrack) {
				const twilioStream = new MediaStream([localVideoTrack.mediaStreamTrack]);
				hidePermissionModal();
				if (secureFeatures?.entities?.filter(entity => aiEventsFeatures?.includes(entity.key))?.length) {
					await startAIWebcam(room, twilioStream);
				} else {
					await setupWebcam(twilioStream);
				}
			}
			
			setupTrackStoppedListeners(twilioVideoTrack, 'video');
		}
		
		if (audioTrack && needsAudio) {
			const twilioAudioTrack = new TwilioVideo.LocalAudioTrack(audioTrack);
			newAudioTrackPublication = await room.localParticipant.publishTrack(twilioAudioTrack);
			
			audioRecordings.push(newAudioTrackPublication.trackSid);
			
			setupTrackStoppedListeners(twilioAudioTrack, 'audio');
			console.log('Audio track reconnected with stopped listener');
		}
		
		const updateData = {};
		if (newVideoTrackPublication) {
			updateData.user_video_name = cameraRecordings;
		}
		if (newAudioTrackPublication) {
			updateData.user_audio_name = audioRecordings;
		}
		
		if (Object.keys(updateData).length > 0) {
			updatePersistData('session', updateData);
		}
		
		if (typeof registerEvent === 'function') {
			registerEvent({ 
				eventType: 'success', 
				notify: false, 
				eventName: 'camera_permission_restored', 
				eventValue: new Date() 
			});
			hidePermissionModal();
		}
		
		if (window.mereos.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({ 
				type: 'success',
				message: 'camera_reconnected_successfully',
				code: 50000
			});
		}
		
				
	} catch (error) {
		console.error('Failed to reconnect camera:', error);
		
		if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
			setTimeout(() => {
				showPermissionModal();
			}, 500);
			
			if (window.mereos.startRecordingCallBack) {
				window.mereos.startRecordingCallBack({ 
					type: 'error',
					message: 'camera_permission_denied',
					code: 40019
				});
			}
		} else {
			if (window.mereos.startRecordingCallBack) {
				updatePersistData('session', {
					sessionStatus:'Terminated'
				});
				window.mereos.startRecordingCallBack({ 
					type: 'error',
					message: 'camera_reconnection_failed',
					code: 40022
				});
			}
		}
		
		if (typeof registerEvent === 'function') {
			registerEvent({ 
				eventType: 'error', 
				notify: false, 
				eventName: 'camera_reconnection_failed', 
				eventValue: new Date(),
				errorMessage: error.message
			});
		}
	}
};

export const startRecording = async () => {	
	let screenTrack = null;
	let cameraRecordings = [];
	let audioRecordings = [];
	let screenRecordings = [];
	const secureFeatures = getSecureFeatures();
	const session = convertDataIntoParse('session');
	const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');

	detectPageRefresh();
	detectBackButton();
	
	let libraryDOM = document.getElementById('mereos-library');
	if(!libraryDOM){
		initShadowDOM();
		updateThemeColor();
	}
	const existingChatIcon = document.getElementById('chat-icon-wrapper');
	if (!existingChatIcon) {
		initializeLiveChat();
	}

	loadZendeskWidget();
	if(findConfigs(['mobile_proctoring'], secureFeatures?.entities).length && window?.mereos?.mobileStream){
		connectSocketConnection();
	}

	if (
		(!window.mereos?.newStream || window?.mereos?.newStream?.getTracks()?.length === 0) &&
		findConfigs(['record_screen'], secureFeatures?.entities)?.length > 0
	) {		
		await registerEvent({ 
			eventType: 'error', 
			notify: false, 
			eventName: 'screen_recording_not_started', 
		});
		if (window.mereos.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({ 
				type:'error',
				message: 'please_share_your_screen' ,
				code:40011
			});
		}
		window.mereos.recordingStart=false;
		window.mereos.precheckCompleted=false;
		return;
	}

	if(secureFeatures?.entities?.filter(entity => LockDownOptions.includes(entity.key))?.length){
		await lockBrowserFromContent(secureFeatures?.entities || []);
	}

	if (secureFeatures?.entities.filter(entity => recordingEvents.includes(entity.key))?.length > 0) {

		let twilioOptions = {
			preferredVideoCodecs: 'auto', 
			bandwidthProfile: { 
				video: {
					contentPreferencesMode: 'auto',
					clientTrackSwitchOffControl: 'auto'
				}
			},
			networkQuality: { 
				local: 3, 
				remote: 3 
			},
			audio: findConfigs(['record_audio'], secureFeatures?.entities).length ?
				(localStorage.getItem('microphoneID') !== null ? {
					deviceId: { exact: localStorage.getItem('microphoneID') },
				} : true)
				:
				false,
			video: findConfigs(['record_video'], secureFeatures?.entities).length ?
				(localStorage.getItem('deviceId') !== null ? {
					deviceId: { exact: localStorage.getItem('deviceId') },
				} : true)
				:
				false
		};

		try {
			const newRoomSessionId = v4();
			const newSessionId = session?.sessionId ? session?.sessionId : v4();
			
			updatePersistData('session', {
				roomSessionId: newRoomSessionId,
				sessionId: newSessionId,
				sessionStatus:'Attending'
			});
			let room;

			try{
			room = await TwilioVideo.connect(session?.twilioToken, twilioOptions);
			window.mereos.roomInstance = room;
			}catch(error){
				registerEvent({ eventType: 'success', notify: false, eventName: 'room_is_not_creating',eventValue:error });
			}
			
			updatePersistData('session', { 
				room_id: room?.sid 
			});

			const mediaConstraints = {};

			if (findConfigs(['record_video'], secureFeatures?.entities).length) {
				mediaConstraints.video = localStorage.getItem('deviceId') 
					? { deviceId: { exact: localStorage.getItem('deviceId') } } 
					: true;
			}

			if (findConfigs(['record_audio'], secureFeatures?.entities).length) {
				mediaConstraints.audio = localStorage.getItem('microphoneID') 
					? { deviceId: { exact: localStorage.getItem('microphoneID') } } 
					: true;
			} else {
				mediaConstraints.audio = false;
			}
			
			if(secureFeatures?.entities?.find(entity => entity.key === 'record_video')){
				await new Promise((resolve) => {
					if (room.localParticipant.videoTracks.size > 0) {
						resolve();
					} else {
						const checkTracks = () => {
							if (room.localParticipant.videoTracks.size > 0) {
								room.localParticipant.off('trackPublished', checkTracks);
								resolve();
							}
						};
						room.localParticipant.on('trackPublished', checkTracks);
					}
				});

				const localVideoTrack = Array.from(room.localParticipant.videoTracks.values())[0]?.track;
				
				if (localVideoTrack) {
					const twilioStream = new MediaStream([localVideoTrack.mediaStreamTrack]);
					
					if(secureFeatures?.entities?.filter(entity => aiEventsFeatures.includes(entity.key))?.length){
						await startAIWebcam(room, twilioStream);
					} else {
						await setupWebcam(twilioStream);
					}
				} 

				cameraRecordings = [
					...session.user_video_name,
					...Array.from(room?.localParticipant?.videoTracks, ([name, value]) => ({ name, value })).map(rt => rt.name)
				];

				updatePersistData('session', { 
					user_video_name: cameraRecordings || [], 
				});
			}

			if(findConfigs(['record_audio'], secureFeatures?.entities).length){
				audioRecordings = [
					...session.user_audio_name,
					...Array.from(room?.localParticipant?.audioTracks, ([name, value]) => ({ name, value })).map(rt => rt.name)
				];
				updatePersistData('session', { user_audio_name: audioRecordings, room_id: room?.sid });
			}

			if (session?.screenRecordingStream && findConfigs(['record_screen'], secureFeatures?.entities).length) {
				if(window.mereos?.newStream?.getTracks()[0]){
					screenTrack = new TwilioVideo.LocalVideoTrack(window?.mereos?.newStream?.getTracks()[0],{
						name: `screen-share-${v4()}`
					});
					window.mereos.screenTrackPublished = await room.localParticipant.publishTrack(screenTrack);
					screenRecordings = [...session.screen_sharing_video_name, window.mereos.screenTrackPublished.trackSid];
					updatePersistData('session', { screen_sharing_video_name: screenRecordings });
				}else{
					await registerEvent({ 
						eventType: 'error', 
						notify: false, 
						eventName: 'screen_recording_not_started', 
					});
					if(window.mereos.startRecordingCallBack){
						window.mereos.startRecordingCallBack({ 
							type:'error',
							message: 'please_share_your_screen',
							code:40011 
						});
					}
					window.mereos.precheckCompleted=false;
					window.mereos.recordingStart = false;
					return;
				}
			}
			
			if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
				window.mereos.socket.send(JSON.stringify({ event: 'startRecording', data: 'Web video recording started' }));
			}

			const localParticipant = room.localParticipant;

			localParticipant.on('networkQualityLevelChanged', (level) => {
				if (level <= 2) {
					if(window.mereos.startRecordingCallBack){
						window.mereos.startRecordingCallBack({ 
							type:'error',
							message: 'session_is_terminated_due_to_slow_internet_connection',
							code:40013
						});
					}

					registerEvent({ eventType: 'success', notify: false, eventName: 'slow_internet_detected' });
				
					// showToast('error','your_internet_is_very_slow_please_make_sure_you_have_stable_network_quality');
				}
			});
			
			room.localParticipant.videoTracks.forEach(({ track }) => {
				if (track && track.kind === 'video') {
					setupTrackStoppedListeners(track, 'video');
				}
			});

			room.localParticipant.audioTracks.forEach(({ track }) => {
				if (track && track.kind === 'audio') {
					setupTrackStoppedListeners(track, 'audio');
				}
			});

			const handleReconnecting = async (error) => {
				if (
				error?.message?.includes('Media connection failed') ||
				error?.message?.includes('Media activity')
				) {
					registerEvent({
						notify: false,
						eventName: 'media_connection_failed',
					});
					showToast('error','internet_connection_lost');
					isMediaError = true;
				} else if (
				error?.message?.includes('Signaling connection disconnected')
				) {
					registerEvent({
						notify: false,
						eventName: 'signaling_connection_disconnected',
					});
					showToast('error','reconnecting_signaling_connection');
					isSignalingError = true;
				} else {
					registerEvent({
						notify: false,
						eventName: 'video_recording_reconnecting',
					});
				}
			};

			const handleDisconnected = async () => {
				cleanupLocalVideo();
				registerEvent({
					notify: false,
					eventName: 'video_recording_disconnected',
				});
				updatePersistData('session', { 
					sessionStatus: 'Terminated'
				});
		
				if(findConfigs(['mobile_proctoring'], secureFeatures?.entities).length > 0){
					updatePersistData('preChecksSteps', { 
						mobileConnection: false,
						screenSharing: false
					});
					showToast('error','mobile_phone_disconnected');		
				}else{
					updatePersistData('preChecksSteps', { 
						screenSharing: false,
					});
				}
				if(window.mereos.startRecordingCallBack){
					window.mereos.startRecordingCallBack({ 
						type:'error',
						message: 'web_internet_connection_disconnected',
						code:40014
					});
					window.mereos.recordingStart = false;
				}
				forceClosure();
			};

			const handleReconnected = async () => {
				if (room.state === 'connected' && isMediaError) {
					showToast('success','internet_connection_recovered');		
					isMediaError = false;
				}
				if (room.state === 'connected' && isSignalingError) {
					showToast('success','signaling_connection_reconnected');		
					isSignalingError = false;
				}
				registerEvent({
					notify: false,
					eventName: 'video_recording_reconnected',
				});
			};

			room.on('reconnected', handleReconnected);
			room.on('disconnected', handleDisconnected);
			room.on('reconnecting',handleReconnecting);

			registerEvent({ 
				eventType: 'success', 
				notify: false, 
				eventName: 'recording_started_successfully', 
			});
			
			if(window.mereos.startRecordingCallBack){
				window.mereos.startRecordingCallBack({ 
					type:'success',
					message: 'recording_started_successfully',
					code:50000
				});
			}
			
		} catch (error) {
			logger.error('error in startRecording',error.message);
			updatePersistData('session', {
				sessionStatus:'Terminated'
			});
			registerEvent({ eventType: 'success', notify: false, eventName: 'camera_or_microphone_permission_is_denied',eventValue:error });
			window.mereos.recordingStart = false;
			if(window.mereos.startRecordingCallBack){
				window.mereos.startRecordingCallBack({ 
					type:'success',
					message: 'please_allow_camera_or_microphone_permission',
					code:50000
				});
			}
		}
	}else{
		updatePersistData('session', {
			sessionStatus:'Attending'
		});
		if(window.mereos.startRecordingCallBack){
			window.mereos.startRecordingCallBack({ 
				type:'success',
				code:50000,
				message: 'recording_started_successfully' 
			});
		}
		window.mereos.recordingStart = true;
	}
	const updatedSession = convertDataIntoParse('session');
	let resp = await addSectionSessionRecord(updatedSession,candidateInviteAssessmentSection);
	if(resp){
		const dateTime = new Date();
		registerEvent({ eventType: 'success', notify: false, eventName: 'session_started', startAt: dateTime });
	}
};

const PREDICTION = ['cell phone', 'book'];

const setupWebcam = async (mediaStream) => {
	return new Promise((resolve, reject) => {
		try {
			const secureFeatures = getSecureFeatures();
			if (!i18next.isInitialized) {
				initializeI18next();
			}
            
			let webcamContainer = window.mereos.shadowRoot.querySelector('#webcam-container');
			if (!webcamContainer) {
				webcamContainer = document.createElement('div');
				webcamContainer.id = 'webcam-container';
				webcamContainer.className = 'user-videos-remote';
				if(findConfigs(['camera_view'], secureFeatures?.entities)?.length) {
					window.mereos.shadowRoot.appendChild(webcamContainer);
				}
			}
        
			const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
            
			let videoHeaderContainer = webcamContainer.querySelector('#user-video-header');
			if (!videoHeaderContainer) {
				videoHeaderContainer = document.createElement('div');
				videoHeaderContainer.className = 'user-video-header';
				videoHeaderContainer.id = 'user-video-header';

				const videoHeading = document.createElement('p');
				videoHeading.className = 'recording-heading';
				videoHeading.textContent = `${candidateInviteAssessmentSection?.candidate?.name}`;

				const recordingIcon = document.createElement('div');
				recordingIcon.className = 'recording-badge-container-header';
				recordingIcon.innerHTML = `
					<img
						class='ivsf-recording-dot'
						src="${ASSET_URL}/white-dot.svg"
						alt='white-dot'
					/>
					<p class='recording-text'>${i18next.t('recording')}</p>
				`;

				videoHeaderContainer.appendChild(videoHeading);
				videoHeaderContainer.appendChild(recordingIcon);
				webcamContainer.appendChild(videoHeaderContainer);
			}
        
			const remoteVideoRef = document.createElement('div');
			remoteVideoRef.classList.add('remote-video');
			remoteVideoRef.id = 'remote-video';
			
			let currentWidth = 180;
			const MIN_WIDTH = 180;
			const MAX_WIDTH = 600;
			
			let mediaWrapper = webcamContainer.querySelector('#user-video-element');
			if (!mediaWrapper) {
				mediaWrapper = document.createElement('div');
				mediaWrapper.id = 'user-video-element';
				Object.assign(mediaWrapper.style, {
					position: 'relative',
					marginLeft: 'auto',
					marginRight: 'auto',
					width: `${currentWidth}px`,
					height: '142px',
					objectFit: 'cover',
					transition: 'width 0.3s ease, height 0.3s ease',
					padding: '10px',
				});
				webcamContainer.appendChild(mediaWrapper);
			} else {
				mediaWrapper.innerHTML = '';
				mediaWrapper.style.display = 'block';
			}
			
			const videoElement = document.createElement('video');
			videoElement.autoplay = true;
			videoElement.muted = true;
			videoElement.srcObject = mediaStream;
			Object.assign(videoElement.style, {
				position: 'absolute',
				width: '100%',
				objectFit: 'cover',
				height: '100%'
			});
        
			const canvas = document.createElement('canvas');
			canvas.id = 'canvas';
			Object.assign(canvas.style, {
				position: 'absolute',
				left: '0',
				width: '100%',
				height: '100%'
			});
        
			webcamContainer.appendChild(videoHeaderContainer);
			mediaWrapper.appendChild(videoElement);
			if(secureFeatures?.entities?.filter(entity => aiEventsFeatures.includes(entity.key))?.length) {
				mediaWrapper.appendChild(canvas);
			}
			webcamContainer.appendChild(mediaWrapper);
			
			let videoFooterContainer = webcamContainer.querySelector('#user-video-footer');
			if (!videoFooterContainer && findConfigs(['camera_view'], secureFeatures?.entities)?.length) {
				videoFooterContainer = document.createElement('div');
				videoFooterContainer.className = 'user-view-footer';
				videoFooterContainer.id = 'user-video-footer';
				Object.assign(videoFooterContainer.style, {
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: '8px',
					padding: '8px',
					background: 'transparent'
				});

				const zoomOutBtn = document.createElement('button');
				zoomOutBtn.className = 'zoom-btns';
				zoomOutBtn.textContent = '−';
				Object.assign(zoomOutBtn.style, {
					padding: '4px 12px',
					cursor: 'pointer',
					border: '1px solid #ccc',
					borderRadius: '4px',
					background: '#fff',
					fontSize: '18px',
					fontWeight: 'bold'
				});

				const zoomInBtn = document.createElement('button');
				zoomInBtn.className = 'zoom-btns';
				zoomInBtn.textContent = '+';
				Object.assign(zoomInBtn.style, {
					padding: '4px 12px',
					cursor: 'pointer',
					border: '1px solid #ccc',
					borderRadius: '4px',
					background: '#fff',
					fontSize: '18px',
					fontWeight: 'bold'
				});

				zoomInBtn.addEventListener('click', (e) => {
					e.stopPropagation();
					if (currentWidth < MAX_WIDTH) {
						currentWidth = Math.min(currentWidth + 64, MAX_WIDTH);
						const aspectRatio = 142 / 180;
						const newHeight = Math.round(currentWidth * aspectRatio);
						
						webcamContainer.style.width = `${currentWidth}px`;
						mediaWrapper.style.width = `${currentWidth}px`;
						mediaWrapper.style.height = `${newHeight}px`;
					}
				});

				zoomOutBtn.addEventListener('click', (e) => {
					e.stopPropagation();
					if (currentWidth > MIN_WIDTH) {
						currentWidth = Math.max(currentWidth - 64, MIN_WIDTH);
						const aspectRatio = 142 / 180;
						const newHeight = Math.round(currentWidth * aspectRatio);
						
						webcamContainer.style.width = `${currentWidth}px`;
						mediaWrapper.style.width = `${currentWidth}px`;
						mediaWrapper.style.height = `${newHeight}px`;
					}
				});

				videoFooterContainer.appendChild(zoomOutBtn);
				videoFooterContainer.appendChild(zoomInBtn);
				webcamContainer.appendChild(videoFooterContainer);
			}
        
			videoElement.addEventListener('loadedmetadata', () => {
				canvas.width = videoElement.videoWidth;
				canvas.height = videoElement.videoHeight;
			});

			let isDragging = false;
			let startX, startY;
			let initialX, initialY;
            
			const aspectRatio = 142 / 180;
			const initialHeight = Math.round(currentWidth * aspectRatio);
			
			Object.assign(webcamContainer.style, {
				position: 'fixed',
				top: '20px',
				right: '20px',
				zIndex: '9999',
				cursor: 'move',
				transition: 'width 0.3s ease, height 0.3s ease',
				width: `${currentWidth}px`,
				height: 'auto'
			});

			const handleMouseDown = (e) => {
				if (e.target.classList.contains('zoom-btns')) {
					return;
				}
				
				isDragging = true;
				webcamContainer.style.cursor = 'grabbing';
                
				startX = e.clientX;
				startY = e.clientY;
                
				const rect = webcamContainer.getBoundingClientRect();
				initialX = rect.left;
				initialY = rect.top;
                
				e.preventDefault();
				e.stopPropagation();
			};

			const handleMouseMove = (e) => {
				if (!isDragging) return;
                
				const dx = e.clientX - startX;
				const dy = e.clientY - startY;
                
				const newX = initialX + dx;
				const newY = initialY + dy;
                
				webcamContainer.style.left = `${newX}px`;
				webcamContainer.style.top = `${newY}px`;
				webcamContainer.style.right = 'auto';
                
				e.preventDefault();
				e.stopPropagation();
			};

			const handleMouseUp = () => {
				isDragging = false;
				webcamContainer.style.cursor = 'move';
			};

			webcamContainer.addEventListener('mousedown', handleMouseDown);
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);

			const cleanupDrag = () => {
				webcamContainer.removeEventListener('mousedown', handleMouseDown);
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};

			resolve({ 
				videoElement, 
				canvas,
				cleanupDrag
			});
		} catch(e) {
			reject(e);
		}
	});
};

const handleVideoResize = (predictions, context) => {
	predictions.forEach(prediction => {
		if (PREDICTION.includes(prediction.class) || prediction.class === 'person') {
			const [x, y, width, height] = prediction.bbox;
			context.beginPath();
			context.rect(x, y, width, height);
			context.lineWidth = 2;
			context.strokeStyle = 'red';
			context.fillStyle = 'red';
			context.stroke();
			context.font = '16px Arial';
			context.fillText(`${prediction.class}`, x, y > 10 ? y - 5 : 10);
		}
	});
};

const startAIWebcam = async (room, mediaStream) => {
	try {
		const secureFeatures = getSecureFeatures();
		const multiplePeopleFeature = findConfigs(['multiple_people_detection'], secureFeatures?.entities).length > 0;
		const personMissingFeature = findConfigs(['person_missing'], secureFeatures?.entities).length > 0;
		const objectDetectionFeature = findConfigs(['object_detection'], secureFeatures?.entities).length > 0;

		try {
			await tf.setBackend('webgl');
			await tf.ready();
		} catch (webglError) {
			logger.warn('WebGL not supported. Falling back to CPU.', webglError);
			await tf.setBackend('cpu');
			await tf.ready();
		}
		

		if(!window.mereos.net){
			window.mereos.net = await cocoSsd.load();
		}
    
		const localParticipant = room.localParticipant;
		const videoTrackPublications = Array.from(localParticipant.videoTracks.values());
			
		if (videoTrackPublications.length === 0) {
			throw new Error('No video track available from local participant');
		}
		
		const { canvas } = await setupWebcam(mediaStream, window.mereos.shadowRoot);
		const context = canvas.getContext('2d');

		const processingVideo = document.createElement('video');
		processingVideo.style.display = 'none';
		processingVideo.srcObject = new MediaStream([videoTrackPublications[0].track.mediaStreamTrack]);
		processingVideo.autoplay = true;
		processingVideo.playsInline = true;
			
		await new Promise((resolve) => {
			processingVideo.onloadedmetadata = () => {
				processingVideo.width = processingVideo.videoWidth;
				processingVideo.height = processingVideo.videoHeight;
				resolve();
			};
		});

		const session = convertDataIntoParse('session');
		let seconds = session?.quizStartTime ? parseInt((getTimeInSeconds({ isUTC: true }) - session?.quizStartTime) / 1000) : 0;
		seconds = seconds + 1;
		const activeViolations = {
			multiple_people: null,
			person_missing: null,
			object_detected: null
		};

		window.mereos.aiProcessingInterval = setInterval(async () => {
			try {
				seconds = seconds + 1;
				if (processingVideo.readyState !== 4) return;

				const image = tf.browser.fromPixels(processingVideo);
				const predictions = await window.mereos.net.detect(image);
				tf.dispose(image);

				context.clearRect(0, 0, canvas.width, canvas.height);

				if (multiplePeopleFeature || personMissingFeature || objectDetectionFeature) {
					handleVideoResize(predictions, context, canvas);
				}

				let log = {}, person = {}, multiplePersonFound = false;
                    
				predictions.forEach(prediction => {
					if (prediction.class === 'person' && (personMissingFeature || multiplePeopleFeature)) {
						if (person?.class && multiplePeopleFeature) {
							if (!multiplePersonFound) {
								log = { ...log, 'multiple_people': (log['multiple_people'] || 0) + 1 };
								multiplePersonFound = true;
							}
						} else {
							person = prediction;
						}
					}
					else if (objectDetectionFeature && PREDICTION.includes(prediction.class)) {
						log = { ...log, ['object_detected']: (log[prediction.class] || 0) + 1 };
					}
				});

				if (personMissingFeature && !person.class) {
					log = { ...log, 'person_missing': (log['person_missing'] || 0) + 1 };
				}

				const featuresToCheck = [];
				if (personMissingFeature) featuresToCheck.push('person_missing');
				if (objectDetectionFeature) featuresToCheck.push('object_detected');
				if (multiplePeopleFeature) featuresToCheck.push('multiple_people');

				featuresToCheck.forEach(key => {
					if (log[key]) {
						if (!activeViolations[key]) {
							activeViolations[key] = {
								start_time: seconds,
								time_span: 1
							};
							aiEvents.push({ ...activeViolations[key], [key]: log[key] });
						} 
						else {
							activeViolations[key].time_span += 1;
						}

						if (activeViolations[key].time_span === 10) {
							let message = '';
							if (key === 'person_missing') {
								message = 'no_person_detected_for_more_than_10_seconds';
							} else if (key === 'object_detected') {
								message = 'unauthorized_object_detected_for_more_than_10_seconds';
							} else if (key === 'multiple_people') {
								message = 'multiple_people_detected_for_more_than_10_seconds';
							}
							showToast('error', message);
						}
					}
					else if (activeViolations[key]) {
						const violation = activeViolations[key];
						
						if (violation.time_span >= 2) {
							const data = { 
								eventType: 'success', 
								notify: true, 
								eventName: key, 
								startTime: violation.start_time, 
								endTime: violation.start_time + violation.time_span
							};
				
							registerAIEvent(data);
						}
            
						activeViolations[key] = null;
					}
				});
			} catch (error) {
				logger.error('Error in AI processing:', error);
			}
		}, 1000);

		return { success: true, message: 'AI webcam started successfully' };
	} catch (error) {
		logger.error('Failed to start AI webcam:', error);
    
		if (window.mereos.aiProcessingInterval) {
			clearInterval(window.mereos.aiProcessingInterval);
		}
    
		return { 
			success: false, 
			message: 'Failed to start AI webcam',
			error: error.message 
		};
	}
};

export const cleanupLocalVideo = () => {
	if(window.mereos.shadowRoot){
		const webcamContainer = window.mereos.shadowRoot.querySelector('#webcam-container');
		const webVideoContainer = window.mereos.shadowRoot.querySelector('#user-video-header');
		const imgContainer = window.mereos.shadowRoot.querySelector('#chat-icon');

		if(imgContainer){
			imgContainer.remove();
		}
		if(webVideoContainer){
			webVideoContainer.remove();
		}

		if (webcamContainer) {
			const videoElement = webcamContainer.querySelector('video');
			if (videoElement) {
				videoElement.pause();
				videoElement.srcObject.getTracks().forEach(track => track.stop());
				videoElement.srcObject = null;
			}

			const canvas = webcamContainer.querySelector('canvas');
			if (canvas) {
				canvas.remove();
			}

			webcamContainer.remove();
		}
	}
};

export function VideoChat(room) {
	const secureFeatures = getSecureFeatures();
	const session = convertDataIntoParse('session');
    
	let webcamContainer = window.mereos.shadowRoot.querySelector('#webcam-container');
	let videoHeaderContainer = window.mereos.shadowRoot.querySelector('#user-video-header');
    
	if (!webcamContainer) {
		webcamContainer = document.createElement('div');
		webcamContainer.id = 'webcam-container';
		webcamContainer.className = 'user-videos-remote';

		if(findConfigs(['camera_view'], secureFeatures?.entities)?.length){
			window.mereos.shadowRoot.appendChild(webcamContainer);
		}

		Object.assign(webcamContainer.style, {
			position: 'fixed',
			top: '20px',
			right: '20px',
			zIndex: '9999',
			cursor: 'move'
		});

		let isDragging = false;
		let startX, startY;
		let initialX, initialY;

		const handleMouseDown = (e) => {
			isDragging = true;
			webcamContainer.style.cursor = 'grabbing';
            
			startX = e.clientX;
			startY = e.clientY;
            
			const rect = webcamContainer.getBoundingClientRect();
			initialX = rect.left;
			initialY = rect.top;
            
			e.preventDefault();
			e.stopPropagation();
		};

		const handleMouseMove = (e) => {
			if (!isDragging) return;
            
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;
            
			const newX = initialX + dx;
			const newY = initialY + dy;
            
			webcamContainer.style.left = `${newX}px`;
			webcamContainer.style.top = `${newY}px`;
            
			e.preventDefault();
			e.stopPropagation();
		};

		const handleMouseUp = () => {
			isDragging = false;
			webcamContainer.style.cursor = 'move';
		};

		webcamContainer.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		webcamContainer.cleanupDrag = () => {
			webcamContainer.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}
    
	if(!videoHeaderContainer){
		const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
    
		videoHeaderContainer = document.createElement('div');
		videoHeaderContainer.className = 'user-video-header';
		videoHeaderContainer.id = 'user-video-header';
    
		const videoHeading = document.createElement('p');
		videoHeading.className = 'recording-heading';
		videoHeading.textContent = `${candidateInviteAssessmentSection?.candidate?.name}`;
        
		const recordingIcon = document.createElement('div');
		recordingIcon.className = 'recording-badge-container-header';
		recordingIcon.innerHTML = `
            <img
                    class='ivsf-recording-dot'
                    src="${ASSET_URL}/white-dot.svg"
                    alt='white-dot'
            ></img>
            <p class='recording-text'>${i18next.t('recording')}</p>
        `;
    
		videoHeaderContainer.appendChild(videoHeading);
		videoHeaderContainer.appendChild(recordingIcon);
		webcamContainer.appendChild(videoHeaderContainer);
	}
    
	const localVideoRef = document.createElement('div');
	const remoteVideoRef = document.createElement('div');
	remoteVideoRef.classList.add('remote-video');
	remoteVideoRef.id = 'remote-video';
    
	webcamContainer.appendChild(remoteVideoRef); 

	function attachTrack(track, container) {
		if (container && track && track.kind === 'video') {
			try {
				const attachedElement = track?.attach();
				if (attachedElement) {
					attachedElement.classList.add('video-attached');
					container.appendChild(attachedElement);
				}
			} catch (error) {
				logger.error('Error attaching video track:', error);
			}
		} else {
			logger.error('Track is not a video track or container is missing', { track, container });
		}
	}

	function detachTrack(track) {
		if (track && track.detach) {
			track.detach().forEach(element => element.remove());
		}
	}

	function handleParticipant(participant) {
		participant.tracks.forEach(publication => {
			if (publication.isSubscribed && publication.track.kind === 'video') {
				attachTrack(publication.track, remoteVideoRef);
			}
		});

		participant.on('trackSubscribed', (track) => {
			if (track.kind === 'video') {
				attachTrack(track, remoteVideoRef);
				updatePersistData('session', {
					mobileRecordings: [
						...(session.mobileRecordings || []),
						track.sid
					],
				});
			}

			if (track.kind === 'audio') {
				updatePersistData('session', {
					mobileAudios: [
						...(session.mobileAudios || []),
						track.sid
					],
				});
			}
		});

		participant.on('trackUnsubscribed', (track) => {
			detachTrack(track);
		});
	}

	function connectToRoom() {
		try {
			room.localParticipant.videoTracks.forEach(publication => {
				if (publication.track && publication.track.kind === 'video') {
					attachTrack(publication.track, localVideoRef);
				}
			});

			room.participants.forEach(participant => {
				handleParticipant(participant);
			});

			room.on('participantReconnecting', () => {
				if (findConfigs(['mobile_proctoring'], secureFeatures?.entities).length > 0) {
					updatePersistData('preChecksSteps', { 
						mobileConnection: false,
						screenSharing: false
					});
					updatePersistData('session', {
						sessionStatus:'Terminated'
					});
					showToast('error',i18next.t('mobile_phone_disconnected'));
				} else {
					updatePersistData('preChecksSteps', { 
						screenSharing: false
					});	
					showToast('error',i18next.t('internet_connection_not_working'));					
				}
				setTimeout(() => {
					if(window.mereos.startRecordingCallBack){
						window.mereos.startRecordingCallBack({ 
							type:'error',
							code:40015,
							message: 'mobile_internet_connection_disconnected' 
						});
					}
				}, 4000);
			});

			room.on('participantConnected', (participant) => {
				handleParticipant(participant);
			});

			room.on('participantDisconnected', participant => {
				participant.tracks.forEach(publication => {
					if (publication.track) {
						detachTrack(publication.track);
					}
				});
			});
		} catch (error) {
			logger.error('Error connecting to Twilio room:', error);
		}
	}

	connectToRoom();

	return {
		cleanup: () => {
			if (webcamContainer.cleanupDrag) {
				webcamContainer.cleanupDrag();
			}
		}
	};
}

export const stopAllRecordings = async () => {
	try {
		const secureFeatures = getSecureFeatures();
		const session = convertDataIntoParse('session');

		document.removeEventListener('visibilitychange', () => {});
		document.removeEventListener('beforeunload', ()=> {});
		window.removeEventListener('beforeunload',  ()=> {});
		window.removeEventListener('popstate', detectBackButtonCallback);
		restoreRightClick();

		if(window?.mereos?.mobileStream){
			window?.mereos?.mobileStream?.getTracks()?.forEach((track) => track.stop());
		}
		window.mereos.forceClosureTriggered = false;
		if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
			window.mereos.socket.send(JSON.stringify({ event: 'stopRecording', data: 'Web video recording stopped' }));
		}
		
		const chatIcons = document.querySelectorAll('[id="chat-icon"]');
		const chatContainer = document.getElementById('talkjs-container');
		const notificationBagde = document.getElementById('notification-badge');

		if(notificationBagde){
			notificationBagde.style.display = 'none';
			notificationBagde.remove();
		}

		if (chatIcons.length > 0) {
			chatIcons.forEach(icon => {
				icon.style.display = 'none';
				icon.remove();
			});
		}

		if (chatContainer) {
			chatContainer.style.display = 'none';
			chatContainer.remove();
		}

		updatePersistData('session', {
			recordingEnded: true,
			sessionStatus: session?.sessionStatus === 'Terminated'? 'Terminated':'Completed',
		});

		cleanupZendeskWidget();
		cleanupLocalVideo();

		if(mediaStream){
			mediaStream.getTracks().forEach(track => track.stop());
			mediaStream=null;
		}

		if (window?.mereos?.newStream) {
			window?.mereos?.newStream.getTracks().forEach(track => {
				track.stop();
				track.enabled = false;
			});
		}

		if (window.mereos.globalStream) {
			window.mereos.globalStream.getTracks().forEach(track => track.stop());
			window.mereos.globalStream = null;
		}

		removeStoppedListener();

		window.mereos.recordingStart=false;

		if (window?.mereos?.roomInstance) {
			const tracks = window?.mereos?.roomInstance?.localParticipant?.tracks;
			if (!tracks) return;
    
			for (const publication of tracks) {
				const track = publication.track;
				if (!track) continue;
        
				try {
					await window.mereos.roomInstance.localParticipant.unpublishTrack(track);
            
					track.stop();
					const elements = track.detach();
					elements.forEach(element => element.remove());
            
					if (track.disable) track.disable();
				} catch (error) {
					logger.error('Failed to cleanup track:', error);
				}
			}

			window.mereos.roomInstance.participants.forEach(participant => {
				participant.removeAllListeners();
			});
			if (secureFeatures?.entities.filter(entity => recordingEvents.includes(entity.key))?.length > 0){
				registerEvent({ eventType: 'success', notify: false, eventName: 'recording_stopped_successfully' });
			}
			window.mereos.roomInstance.removeAllListeners();
			window.mereos.roomInstance.disconnect();
			window.mereos.roomInstance = null;
		}

		if (window.mereos.mobileRoomInstance) {
			window.mereos.mobileRoomInstance.localParticipant.tracks.forEach(publication => {
				const track = publication.track;
				if (track) {
					track.stop();
					track.detach().forEach(element => element.remove());
					track.disable();
					window.mereos.mobileRoomInstance.localParticipant.unpublishTrack(track);
				}
			});
			window.mereos.mobileRoomInstance.disconnect();
			window.mereos.mobileRoomInstance = null;
		}

		if (window.mereos.aiProcessingInterval) {
			clearInterval(window.mereos.aiProcessingInterval);
			window.mereos.aiProcessingInterval = null;
		}

		if (secureFeatures?.entities?.filter(entity => LockDownOptions.includes(entity.key))?.length){
			unlockBrowserFromContent();
		}
		
		await changeCandidateAssessmentStatus({
			status: session?.sessionStatus === 'Terminated'? 'Terminated':'Completed',
			id: session?.candidate_assessment
		});

		registerEvent({ eventType: 'success', notify: false, eventName: session?.sessionStatus === 'Terminated' ? 'session_is_terminated' : 'session_completed'});
		
		showToast(session?.sessionStatus === 'Terminated' ? 'error' :'success', session?.sessionStatus === 'Terminated' ? 'session_is_terminated' : 'session_completed');
		
		return 'stop_recording';
	} catch (e) {
		logger.error('Error in stop recording:', e);
	}
};
