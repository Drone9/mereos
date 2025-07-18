import * as TwilioVideo from 'twilio-video';
import i18next from 'i18next';
import { v4 } from 'uuid';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { 
	addSectionSessionRecord, 
	checkPermissionStatus, 
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
	initializeI18next, 
	lockBrowserFromContent, 
	logger, 
	registerAIEvent, 
	registerEvent, 
	showToast, 
	unlockBrowserFromContent, 
	updatePersistData 
} from '../utils/functions';
import { getCreateRoom } from '../services/twilio.services';
import { aiEventsFeatures, ASSET_URL, LockDownOptions, recordingEvents } from '../utils/constant';
import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';
import { initShadowDOM, openModal } from '../ExamsPrechecks';

let aiEvents = [];
let mediaStream = null;
const trackStoppedListeners = new Map();
	
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
		logger.success('in the connectSocketConnection');
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
					logger.error('in the violation');
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
	}
	if(findConfigs(['mobile_proctoring'], secureFeatures?.entities).length && window?.mereos?.mobileStream){
		connectSocketConnection();
	}

	if (
		(!window.mereos?.newStream || window?.mereos?.newStream?.getTracks()?.length === 0) &&
		findConfigs(['record_screen'], secureFeatures?.entities)?.length > 0
	) {		
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
			const dateTime = new Date();
			const newRoomSessionId = v4();
			const newSessionId = session?.sessionId ? session?.sessionId : v4();
			
			updatePersistData('session', {
				roomSessionId: newRoomSessionId,
				sessionId: newSessionId,
				sessionStatus:'Attending'
			});

			let room = await TwilioVideo.connect(session?.twilioToken, twilioOptions);
			window.mereos.roomInstance = room;

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
				mediaStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

				if(secureFeatures?.entities?.filter(entity => aiEventsFeatures.includes(entity.key))?.length){
					await startAIWebcam(room, mediaStream);
				}else{
					await setupWebcam(mediaStream);
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
					screenTrack = new TwilioVideo.LocalVideoTrack(window?.mereos?.newStream?.getTracks()[0]);
					window.mereos.screenTrackPublished = await room.localParticipant.publishTrack(screenTrack);
					screenRecordings = [...session.screen_sharing_video_name, window.mereos.screenTrackPublished.trackSid];
					updatePersistData('session', { screen_sharing_video_name: screenRecordings });
				}else{
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

					registerEvent({ eventType: 'success', notify: false, eventName: 'slow_internet_detected', startAt: dateTime });
				
					showToast('error','your_internet_is_very_slow_please_make_sure_you_have_stable_network_quality');
				}
			});
			
			room.localParticipant.videoTracks.forEach(({ track }) => {
				if (track && track.kind === 'video') {
					const stoppedListener = async () => {
						const status = await checkPermissionStatus();

						if (status.camera === 'denied') {
							if (window.mereos.startRecordingCallBack) {
								window.mereos.startRecordingCallBack({ 
									type: 'error',
									message: 'camera_is_stopped',
									code: 40019
								});
							}
							registerEvent({ 
								eventType: 'error', 
								notify: false, 
								eventName: 'camera_permission_disabled', 
								eventValue: new Date() 
							});
						}
					};

					track.on('stopped', stoppedListener);
					trackStoppedListeners.set(track, stoppedListener);
				}
			});

			room.localParticipant.audioTracks.forEach(({ track }) => {
				if (track && track.kind === 'audio') {
					const stoppedListener = async () => {
						const status = await checkPermissionStatus();

						if (status.microphone === 'denied') {
							if (window.mereos.startRecordingCallBack) {
								window.mereos.startRecordingCallBack({ 
									type: 'error',
									message: 'microphone_is_stopped',
									code: 40019
								});
							}
							registerEvent({ 
								eventType: 'error', 
								notify: false, 
								eventName: 'microphone_permission_denied', 
								eventValue: new Date() 
							});
						}
					};

					track.on('stopped', stoppedListener);
					trackStoppedListeners.set(track, stoppedListener);
				}
			});

			room.on('reconnecting', () => {
				cleanupLocalVideo();
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
					showToast('error','internet_connection_not_working');		
				}
				if(window.mereos.startRecordingCallBack){
					window.mereos.startRecordingCallBack({ 
						type:'error',
						message: 'web_internet_connection_disconnected',
						code:40014
					});
					window.mereos.recordingStart = false;
				}
				setTimeout(async () => {
					forceClosure();
				},3000);
			
			});

			registerEvent({ 
				eventType: 'success', 
				notify: false, 
				eventName: 'recording_started_successfully', 
				startAt: dateTime 
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
			if(window.mereos.startRecordingCallBack){
				window.mereos.startRecordingCallBack({ 
					type:'success',
					message: error.message.includes('Permission') ? 'please_allow_camera_or_microphone_permission' : error.message,
					code:50000
				});
			}
			updatePersistData('session', {
				sessionStatus:'Terminated'
			});
			window.mereos.recordingStart = false;
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
            
			let videoHeaderContainer = document.createElement('div');
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
        
			const remoteVideoRef = document.createElement('div');
			remoteVideoRef.classList.add('remote-video');
			remoteVideoRef.id = 'remote-video';
        
			const mediaWrapper = document.createElement('div');
			Object.assign(mediaWrapper.style, {
				position: 'relative',
				marginLeft: 'auto',
				marginRight: 'auto',
				width: '180px',
				height: '142px',
				objectFit: 'cover'
			});
        
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
        
			videoElement.addEventListener('loadedmetadata', () => {
				canvas.width = videoElement.videoWidth;
				canvas.height = videoElement.videoHeight;
			});

			let isDragging = false;
			let startX, startY;
			let initialX, initialY;
            
			Object.assign(webcamContainer.style, {
				position: 'fixed',
				top: '20px',
				right: '20px',
				zIndex: '9999',
				cursor: 'move'
			});

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

		await tf.setBackend('webgl');
		await tf.ready();
    
		const net = await cocoSsd.load();
    
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
				const predictions = await net.detect(image);
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
						const data = { 
							eventType: 'success', 
							notify: true, 
							eventName: key, 
							startTime: violation.start_time, 
							endTime: violation.start_time + violation.time_span
						};
            
						registerAIEvent(data);
            
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

		// Store cleanup function on the element itself
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
				logger.success('in the participantDisconnected');
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

		if(window?.mereos?.mobileStream){
			window?.mereos?.mobileStream?.getTracks()?.forEach((track) => track.stop());
		}
		window.mereos.forceClosureTriggered = false;
		if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
			window.mereos.socket.send(JSON.stringify({ event: 'stopRecording', data: 'Web video recording stopped' }));
		}
		
		const chatIcons = window.mereos.shadowRoot.querySelectorAll('[id="chat-icon"]');
		const chatContainer = window.mereos.shadowRoot.getElementById('talkjs-container');
		const notificationBagde = window.mereos.shadowRoot.getElementById('notification-badge');

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

		if(trackStoppedListeners){
			trackStoppedListeners.forEach((listener, track) => {
				track.off('stopped', listener);
			});
			trackStoppedListeners.clear();
		}

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
		
		const dateTime = new Date();
		await changeCandidateAssessmentStatus({
			status: session?.sessionStatus === 'Terminated'? 'Terminated':'Completed',
			id: session?.candidate_assessment
		});

		if (secureFeatures?.entities.filter(entity => recordingEvents.includes(entity.key))?.length > 0){
			registerEvent({ eventType: 'success', notify: false, eventName: 'recording_stopped_successfully', startAt: dateTime });
		}

		registerEvent({ eventType: 'success', notify: false, eventName: 'session_completed', startAt: dateTime });
		
		showToast('success', 'session_completed');
		
		return 'stop_recording';
	} catch (e) {
		logger.error('Error in stop recording:', e);
	}
};
