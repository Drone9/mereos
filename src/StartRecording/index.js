import * as TwilioVideo from 'twilio-video';
import interact from 'interactjs';
import i18next from 'i18next';
import { v4 } from 'uuid';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { addSectionSessionRecord, cleanupZendeskWidget, convertDataIntoParse, findConfigs, findIncidentLevel, getDateTime, getSecureFeatures, getTimeInSeconds, initializeI18next, lockBrowserFromContent, logger, registerAIEvent, registerEvent, showToast, unlockBrowserFromContent, updatePersistData } from '../utils/functions';
import { getCreateRoom } from '../services/twilio.services';
import { ASSET_URL, LockDownOptions, recordingEvents } from '../utils/constant';
import '../assets/css/start-recording.css';
import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';

let roomInstance = null;
let aiProcessingInterval = null;
let aiEvents = [];
let mediaStream = null;
let mobileRoomInstance = null;

export const startRecording = async () => {	
	if(window.recordingStart) {
		return;
	}

	let cameraTrack = null;
	let screenTrack = null;
	let cameraRecordings = [];
	let audioRecordings = [];
	let screenRecordings = [];
	const secureFeatures = getSecureFeatures();
	const session = convertDataIntoParse('session');
	const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');

	if(roomInstance !== null) return;

	window.addEventListener('popstate', () => {
		if(window.startRecordingCallBack){
			window.startRecordingCallBack({ message: 'session_has_been_terminated_send_resume_to_restart_again' });
			if (window.socket && window.socket.readyState === WebSocket.OPEN) {
				window.socket?.send(JSON.stringify({ event: 'resetSession' }));
			}
		}
	});

	const initSocketConnection = () => {
		if (!window.socket) {
			updatePersistData('preChecksSteps', { 
				mobileConnection: false,
				screenSharing: false
			});
			window.startRecordingCallBack({ message: 'session_has_been_terminated_send_resume_to_restart_again' });
			logger.error('Socket not initialized');
			return;
		}

		window.socket.onmessage = (event) => {
			const eventData = JSON.parse(event?.data);
			switch (eventData?.message?.event || eventData?.event) {
				case 'MobileRecordingStarted': {
					getCreateRoom({
						room_name: session?.mobileRoomSessionId,
						auto_record: false
					}).then(async (twilioTokens) => {	
						const twilioRoom = await TwilioVideo.connect(twilioTokens?.data?.token, {
							audio: false,
							video: false
						});
				
						mobileRoomInstance = twilioRoom;
						if(mobileRoomInstance){
							VideoChat(twilioRoom);
						}
					}).catch((error)=>{
						updatePersistData('preChecksSteps', { 
							mobileConnection: false,
							screenSharing: false
						});
						if(window.startRecordingCallBack){
							window.startRecordingCallBack({ message: 'session_has_been_terminated_send_resume_to_restart_again' });
						}
						window.recordingStart = false;
						logger.error('error',error);
					});

					break;
				}

				case 'violation':
					if(eventData?.message?.message === 'Violation'){
						updatePersistData('preChecksSteps', { 
							mobileConnection: false,
							screenSharing: false
						});
						showToast('error','mobile_phone_disconneted');
						if(window.startRecordingCallBack){
							window.startRecordingCallBack({ message: 'session_has_been_terminated_send_resume_to_restart_again' });
						}
					}
					registerEvent({ eventType: 'error', notify: false, eventName:eventData?.message?.message , eventValue: getDateTime() });
					break;

				default:
					logger.success('Unknown event:', eventData?.message);
					break;
			}
		};
		
		window.socket.onerror = (error) => {
			logger.error('WebSocket error:', error);
		};
	};
	
	if(findConfigs(['mobile_proctoring'], secureFeatures?.entities).length){
		initSocketConnection();
	}

	if( findConfigs(['record_screen'],secureFeatures?.entities)?.length){
		window?.newStream?.getVideoTracks()[0]?.addEventListener('ended', () => {
			window.startRecordingCallBack({ message: 'session_has_been_terminated_send_resume_to_restart_again' });
			if (window.socket && window.socket.readyState === WebSocket.OPEN) {
				window.socket?.send(JSON.stringify({ event: 'resetSession' }));
			}
			window.recordingStart = false;
		});
	}

	if(!(window?.newStream?.getTracks()?.length) && findConfigs(['record_screen'],secureFeatures?.entities)?.length){
		if(window.startRecordingCallBack){
			window.startRecordingCallBack({ message: 'session_has_been_terminated_send_resume_to_restart_again' });
		}
		window.recordingStart = false;
		return;
	}

	if(secureFeatures?.entities?.filter(entity => LockDownOptions.includes(entity.key))?.length){
		await lockBrowserFromContent(secureFeatures?.entities || []);
		registerEvent({ eventType: 'success', notify: false, eventName: 'browser_locked_successfully', eventValue: getDateTime() });
	}

	if (secureFeatures?.entities.filter(entity => recordingEvents.includes(entity.key))?.length > 0) {

		let twilioOptions = {
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
				sessionStartTime: getTimeInSeconds({ isUTC: true, inputDate: dateTime }),
				sessionStatus:'Attending'
			});

			let room = await TwilioVideo.connect(session?.twilioToken, twilioOptions);
			roomInstance = room;
			logger.success('room',room);

			if(secureFeatures?.entities?.find(entity => entity.key === 'record_video')){
				mediaStream = await navigator.mediaDevices.getUserMedia({ video: localStorage.getItem('deviceId') ? { deviceId: { exact: localStorage.getItem('deviceId') } } : true, audio: (localStorage.getItem('microphoneID') ? {
					deviceId: { exact: localStorage.getItem('microphoneID') },
				} : true) });

				startAIWebcam(mediaStream);
				cameraRecordings = [
					...session.user_video_name,
					...Array.from(room?.localParticipant?.videoTracks, ([name, value]) => ({ name, value })).map(rt => rt.name)
				];
				updatePersistData('session', { 
					user_video_name: cameraRecordings || [], 
					room_id: room?.sid 
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
				screenTrack = new TwilioVideo.LocalVideoTrack(window?.newStream?.getTracks()[0]);
				let screenTrackPublished = await room.localParticipant.publishTrack(screenTrack);
				screenRecordings = [...session.screen_sharing_video_name, screenTrackPublished.trackSid];
				updatePersistData('session', { screen_sharing_video_name: screenRecordings });
			}
			
			registerEvent({ eventType: 'success', notify: false, eventName: 'recording_started_successfully', startAt: dateTime });
			
			if (window.socket && window.socket.readyState === WebSocket.OPEN) {
				window.socket.send(JSON.stringify({ event: 'startRecording', data: 'Web video recording started' }));
			}

			if(window.startRecordingCallBack){
				window.startRecordingCallBack({ message: 'recording_started_successfully' });
			}

			window.recordingStart = true;

			room.on('reconnecting', () => {
				cleanupLocalVideo(cameraTrack);
				if(findConfigs(['mobile_proctoring'], secureFeatures?.entities).length){
					updatePersistData('preChecksSteps', { 
						mobileConnection: false,
						screenSharing: false
					});
					showToast('error','mobile_phone_disconneted');		
				}else{
					updatePersistData('preChecksSteps', { 
						screenSharing: false,
					});
					showToast('error','internet_connection_not_working');		
				}
				if(window.startRecordingCallBack){
					window.startRecordingCallBack({ message: 'web_internet_connection_disconnected' });
					window.recordingStart = false;
				}
			});

			const updatedSession = convertDataIntoParse('session');
			await addSectionSessionRecord(updatedSession,candidateInviteAssessmentSection);
		} catch (error) {
			logger.error('error in startRecording',error);
			updatePersistData('session', {
				sessionStatus:'Terminated'
			});
			window.recordingStart = false;
		}
	}else{
		const dateTime = new Date();
		updatePersistData('session', {
			sessionStartTime: getTimeInSeconds({ isUTC: true, inputDate: dateTime }),
			sessionStatus:'Attending'
		});
		if(window.startRecordingCallBack){
			window.startRecordingCallBack({ message: 'recording_started_successfully' });
		}
		window.recordingStart = true;
	}
};

const PREDICTION = ['cell phone', 'book'];

const setupWebcam = async (mediaStream) => {
	const secureFeatures = getSecureFeatures();
	if (!i18next.isInitialized) {
		initializeI18next();
	}
	let webcamContainer = document.getElementById('webcam-container');
	if (!webcamContainer) {
		webcamContainer = document.createElement('div');
		webcamContainer.id = 'webcam-container';
		webcamContainer.className='user-videos-remote';
		if(findConfigs(['camera_view'],secureFeatures?.entities)?.length){
			document.body.appendChild(webcamContainer);
		}
	}

	const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
	
	let videoHeaderContainer = document.createElement('div');
	videoHeaderContainer.className = 'user-video-header';
	videoHeaderContainer.id='user-video-header';

	const videoHeading = document.createElement('p');
	videoHeading.className='recording-heading';
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

	const mediaWrapper = document.createElement('div');
	mediaWrapper.style.position = 'relative';
	mediaWrapper.style.marginLeft = 'auto';
	mediaWrapper.style.marginRight = 'auto';
	mediaWrapper.style.width = '180px'; 
	mediaWrapper.style.height = '142px'; 
	mediaWrapper.style.objectFit = 'cover'; 

	const videoElement = document.createElement('video');
	videoElement.autoplay = true;
	videoElement.muted = true;
	videoElement.srcObject = mediaStream;
	videoElement.style.position = 'absolute';
	videoElement.style.width = '100%';
	videoElement.style.objectFit = 'cover';
	videoElement.style.height = '100%'; 

	const canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.style.position = 'absolute'; 
	canvas.style.left = '0';
	canvas.style.width = '100%'; 
	canvas.style.height = '100%'; 

	webcamContainer.appendChild(videoHeaderContainer);
	mediaWrapper.appendChild(videoElement);
	mediaWrapper.appendChild(canvas);
	webcamContainer.appendChild(mediaWrapper); 

	videoElement.addEventListener('loadedmetadata', () => {
		canvas.width = videoElement.videoWidth;
		canvas.height = videoElement.videoHeight;
	});

	interact(webcamContainer).draggable({
		listeners: {
			move(event) {
				const target = event.target;
				const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
				const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				target.style.transform = `translate(${x}px, ${y}px)`;

				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			}
		}
	});

	return { videoElement, canvas };
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

const startAIWebcam = async (mediaStream) => {
	await tf.setBackend('webgl');
	await tf.ready();
	const net = await cocoSsd.load();
	const { videoElement, canvas } = await setupWebcam(mediaStream);
	const context = canvas.getContext('2d');

	const session = convertDataIntoParse('session');

	let seconds = session?.quizStartTime ? parseInt((getTimeInSeconds({ isUTC: true }) - session?.quizStartTime) / 1000) : 0;

	aiProcessingInterval = setInterval(async () => {
		try {
			if (videoElement.readyState === 4) {
				const image = tf.browser.fromPixels(videoElement);
				const predictions = await net.detect(image);

				context.clearRect(0, 0, canvas.width, canvas.height);

				handleVideoResize(predictions, context, canvas);

				let log = {}, person = {}, multiplePersonFound = false;
				predictions.forEach(prediction => {
					if (prediction.class === 'person' && person?.class) {
						if (!multiplePersonFound) {
							log = { ...log, 'multiple_people': (log['multiple_people'] || 0) + 1 };
							multiplePersonFound = true;
						}
					} else if (prediction.class === 'person') {
						person = prediction;
					} else if (PREDICTION.includes(prediction.class)) {
						log = { ...log, ['object_detected']: (log[prediction.class] || 0) + 1 };
					}
				});

				if (!person.class) {
					log = { ...log, 'person_missing': (log['person_missing'] || 0) + 1 };
				}

				['person_missing', 'object_detected', 'multiple_people'].forEach(key => {
					let lastLogIndex = aiEvents.findIndex(lg => lg[key]);
					let lastLog = lastLogIndex > -1 ? aiEvents.splice(lastLogIndex, 1)[0] : undefined;
					if (log[key] && (!lastLog?.[key] || lastLog?.['end_time'])) {
						const newLog = { start_time: seconds, time_span: 1, [key]: log[key] };
						aiEvents.push(newLog);
					} else if (log[key] && lastLog?.[key]) {
						lastLog = { ...lastLog, time_span: (Number(lastLog['time_span']) || 0) + 1 };
						aiEvents.push(lastLog);
						if (lastLog.time_span === 10) {
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
					} else if (!log[key] && lastLog?.[key]) {
						lastLog = { ...lastLog, end_time: Number(lastLog.start_time) + Number(lastLog.time_span) };
						const data = { eventType: 'success', notify: true, eventName: key, startTime: lastLog.start_time, endTime: Number(lastLog.start_time) + Number(lastLog.time_span) };
						registerAIEvent(data);
						updatePersistData('session',{
							aiEvents: [data,...session.aiEvents]
						});
					}
				});
			}
		} catch (error) {
			logger.error('Error in AI processing:', error);
		}
	}, 1000);
};

export const cleanupLocalVideo = () => {
	const webcamContainer = document.getElementById('webcam-container');
	const webVideoContainer = document.getElementById('user-video-header');
	const imgContainer = document.getElementById('chat-icon');

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

export const stopAllRecordings = async () => {
	try {
		const secureFeatures = getSecureFeatures();
		const session = convertDataIntoParse('session');

		if (window.socket && window.socket.readyState === WebSocket.OPEN) {
			window.socket.send(JSON.stringify({ event: 'stopRecording', data: 'Web video recording stopped' }));
		}

		const findIncident = session?.aiEvents?.length > 0 ? findIncidentLevel(session?.aiEvents) : 'low';
		updatePersistData('session', {
			recordingEnded: true,
			sessionStatus: 'Completed',
			incident_level:findIncident
		});

		cleanupZendeskWidget();
		cleanupLocalVideo();

		if(mediaStream){
			mediaStream.getTracks().forEach(track => track.stop());
			mediaStream=null;
		}

		if (window?.newStream) {
			window?.newStream.getTracks().forEach(track => {
				track.stop();
				track.enabled = false;
			});
		}

		if (mobileRoomInstance) {
			mobileRoomInstance.localParticipant.tracks.forEach(publication => {
				const track = publication.track;
				if (track) {
					track.stop();
					track.detach().forEach(element => element.remove());
					track.disable();
					mobileRoomInstance.localParticipant.unpublishTrack(track);
				}
			});
			mobileRoomInstance.disconnect();
			mobileRoomInstance = null;
		}

		if (roomInstance) {
			roomInstance.localParticipant.tracks.forEach(publication => {
				const track = publication.track;
				if (track) {
					track.stop();
					track.detach().forEach(element => element.remove());
					track.disable();
					roomInstance.localParticipant.unpublishTrack(track);
				}
			});
			roomInstance.disconnect();
			roomInstance = null;
		}

		if (aiProcessingInterval) {
			clearInterval(aiProcessingInterval);
			aiProcessingInterval = null;
		}

		if (secureFeatures?.entities?.filter(entity => LockDownOptions.includes(entity.key))?.length){
			unlockBrowserFromContent();
		}
		
		const dateTime = new Date();
		await changeCandidateAssessmentStatus({
			status: 'Completed',
			id:session?.candidate_assessment
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

function VideoChat(room) {
	const secureFeatures = getSecureFeatures();
	const session = convertDataIntoParse('session');
	let webcamContainer = document.getElementById('webcam-container');
	let videoHeaderContainer = document.getElementById('user-video-header');
	if (!webcamContainer) {
		webcamContainer = document.createElement('div');
		webcamContainer.id = 'webcam-container';
		webcamContainer.className='user-videos-remote';

		if(findConfigs(['camera_view'],secureFeatures?.entities)?.length){
			document.body.appendChild(webcamContainer);
		}

		interact(webcamContainer).draggable({
			listeners: {
				move(event) {
					const target = event.target;
					const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
					const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
	
					target.style.transform = `translate(${x}px, ${y}px)`;
	
					target.setAttribute('data-x', x);
					target.setAttribute('data-y', y);
				}
			}
		});
	}
	if(!videoHeaderContainer){
		const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
	
		videoHeaderContainer = document.createElement('div');
		videoHeaderContainer.className = 'user-video-header';
	
		const videoHeading = document.createElement('p');
		videoHeading.className='recording-heading';
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
				if (findConfigs(['mobile_proctoring'], secureFeatures?.entities).length) {
					updatePersistData('preChecksSteps', { 
						mobileConnection: false,
						screenSharing: false
					});
					showToast('error',i18next.t('mobile_phone_disconneted'));
				} else {
					updatePersistData('preChecksSteps', { 
						screenSharing: false
					});	
					showToast('error',i18next.t('internet_connection_not_working'));					
				}
				setTimeout(() => {
					if(window.startRecordingCallBack){
						window.startRecordingCallBack({ message: 'mobile_internet_connection_disconnected' });
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
}
