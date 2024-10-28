import * as TwilioVideo from 'twilio-video';
import { newStream } from '../ExamPrepreation/IdentityVerificationScreenFive';
import { convertDataIntoParse, findConfigs, getDateTime, getSecureFeatures, getTimeInSeconds, lockBrowserFromContent, registerAIEvent, registerEvent, showNotification, unlockBrowserFromContent, updatePersistData } from '../utils/functions';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import socket from '../utils/socket';
import { getCreateRoom } from '../services/twilio.services';
import { LockDownOptions } from '../utils/constant';
import '../assets/css/start-recording.css';

let roomInstance = null;
let aiProcessingInterval = null;
let aiEvents = [];
let mediaStream=null;
let mobileRoomInstance = null;

export const startRecording = async (webToken) => {
	console.log('startRecording',webToken);

	let cameraTrack = null;
	let screenTrack = null;
	let cameraRecordings = [];
	let audioRecordings = [];
	let screenRecordings = [];
	const secureFeatures = getSecureFeatures();
	const session = convertDataIntoParse('session');
	
	const initSocketConnection = () => {
		if (!socket) {
			console.error('Socket not initialized');
			return;
		}
		socket.onmessage = (event) => {
			const eventData = JSON.parse(event?.data);
			console.log('message____',eventData?.message?.event);

			switch (eventData?.message?.event || eventData?.event) {
				case 'MobileRecordingStarted': {
					getCreateRoom({
						room_name: session?.mobileRoomSessionId,
						auto_record: false
					}).then(async (twilioTokens) => {
						console.log('mobileTwilioToken',twilioTokens);
	
						const twilioRoom = await TwilioVideo.connect(twilioTokens?.data?.token, {
							audio: false,
							video: false
						});
						console.log('mobileTwilioRoom', twilioRoom);
				
						mobileRoomInstance = twilioRoom;
						if(mobileRoomInstance){
							VideoChat(twilioRoom);
						}
					}).catch((error)=>{
						console.log('error', error);
					});

					break;
				}

				case 'violation':
					console.log('violation message',eventData?.message?.message);
					if(eventData?.message?.message === 'Violation'){
						updatePersistData('preChecksSteps', { 
							mobileConnection: false,
							screenSharing: false
						});
						window.open('/assessment/prechecks', '_self');
					}
					registerEvent({ eventType: 'error', notify: false, eventName:eventData?.message?.message , eventValue: getDateTime() });
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
	
	initSocketConnection();

	if(!(newStream?.getTracks()?.length) && findConfigs(['record_screen'],secureFeatures?.entities)?.length){
		console.log('in this newStream if condition');
		window.startRecordingCallBack({ message: 'screen_share_again' });
		return;
	}

	if (secureFeatures?.entities !== null) {
		if(secureFeatures?.entities?.filter(entity => LockDownOptions.includes(entity.key))?.length){
			await lockBrowserFromContent(secureFeatures?.entities || []);
		}

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

		console.log('twilioOptions',twilioOptions);
		try {
			console.log('in the try');
			const dateTime = new Date();
			const newRoomSessionId = dateTime.getTime();
			const newSessionId = session?.sessionId ? session?.sessionId : dateTime.getTime();

			updatePersistData('session', {
				roomSessionId: newRoomSessionId,
				sessionId: newSessionId,
				sessionStartTime: getTimeInSeconds({ isUTC: true, inputDate: dateTime }),
				sessionStatus:'Attending'
			});

			console.log('twilioOptions', twilioOptions);
			let room = await TwilioVideo.connect(webToken, twilioOptions);
			roomInstance = room;
			console.log('Room connected:', room);

			mediaStream = await navigator.mediaDevices.getUserMedia({ video: localStorage.getItem('deviceId') ? { deviceId: { exact: localStorage.getItem('deviceId') } } : true, audio: (localStorage.getItem('microphoneID') ? {
				deviceId: { exact: localStorage.getItem('microphoneID') },
			} : true) });

			if (secureFeatures?.entities?.find(entity => entity.key === 'record_video')) {
				startAIWebcam(mediaStream);
			}

			cameraTrack = new TwilioVideo.LocalVideoTrack(mediaStream.getVideoTracks()[0]);
			await room.localParticipant.publishTrack(cameraTrack);
			
			if (secureFeatures?.entities.find(entity => entity.key === 'record_video')) {
				cameraRecordings = [
					...cameraRecordings,
					...Array.from(room?.localParticipant?.videoTracks, ([name, value]) => ({ name, value })).map(rt => rt.name)
				];
				audioRecordings = [
					...audioRecordings,
					...Array.from(room?.localParticipant?.audioTracks, ([name, value]) => ({ name, value })).map(rt => rt.name)
				];
				updatePersistData('session', { user_video_name: cameraRecordings || [], user_audio_name: audioRecordings, room_id: room?.sid });
			}

			if (session?.screenRecordingStream && findConfigs(['record_screen'], secureFeatures?.entities).length) {
				screenTrack = new TwilioVideo.LocalVideoTrack(newStream?.getTracks()[0]);
				let screenTrackPublished = await room.localParticipant.publishTrack(screenTrack);
				screenRecordings = [...screenRecordings, screenTrackPublished.trackSid];
				updatePersistData('session', { screen_sharing_video_name: screenRecordings });
			}

			registerEvent({ eventType: 'success', notify: false, eventName: 'browser_locked_successfully', eventValue: getDateTime() });
			
			registerEvent({ eventType: 'success', notify: false, eventName: 'recording_started_successfully', startAt: dateTime });
			if (socket && socket.readyState === WebSocket.OPEN) {
				socket.send(JSON.stringify({ event: 'startRecording', data: 'Web video recording started' }));
			}

			if(window.startRecordingCallBack){
				window.startRecordingCallBack({ message: 'recording_started_successfully' });
			}

			console.log('Local screen share track published:', screenTrack);

			room.on('reconnecting', (error) => {
				cleanupLocalVideo(cameraTrack);
				if(findConfigs(['mobile_proctoring'], secureFeatures?.entities).length){
					updatePersistData('preChecksSteps', { 
						mobileConnection: false,
						screenSharing: false
					});
				}else{
					updatePersistData('preChecksSteps', { 
						screenSharing: false,
					});
				}
				console.log('diconnection room',error);
				if(window.startRecordingCallBack){
					window.startRecordingCallBack({ message: 'web_internet_connection_disconnected' });
				}
			});
		} catch (error) {
			updatePersistData('session', {
				sessionStatus:'Terminated'
			});
			console.error('Error starting recording:', error);
		}
	}
};

const PREDICTION = ['cell phone', 'book'];

const setupWebcam = async (mediaStream) => {
	console.log('setupWebcam');
	let webcamContainer = document.getElementById('webcam-container');
	if (!webcamContainer) {
		webcamContainer = document.createElement('div');
		webcamContainer.id = 'webcam-container';
		webcamContainer.style.position = 'relative';
		webcamContainer.style.width = '200px';
		webcamContainer.style.height = '150px';
		document.body.appendChild(webcamContainer);
	}

	const videoElement = document.createElement('video');
	videoElement.autoplay = true;
	videoElement.muted = true;
	videoElement.srcObject = mediaStream;
	videoElement.width = 200;
	videoElement.height = 200 * (3 / 4);
	videoElement.style.position = 'absolute';
	videoElement.style.width = '100%';
	videoElement.style.height = 'auto';
	videoElement.style.maxWidth = '100%';

	const canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.style.position = 'absolute';
	canvas.style.top = '0';
	canvas.style.left = '0';
	canvas.width = 200;
	canvas.height = 200 * (3 / 4);
	canvas.style.maxWidth = '100%';
	canvas.style.width = '100%';
	canvas.style.height = 'auto';

	webcamContainer.appendChild(videoElement);
	webcamContainer.appendChild(canvas);

	videoElement.addEventListener('loadedmetadata', () => {
		canvas.width = videoElement.videoWidth;
		canvas.height = videoElement.videoHeight;
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
	console.log('startAIWebcam');
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

						showNotification({
							title: 'Warning!',
							body: `Alert: ${key} detected!`,
						});
					} else if (log[key] && lastLog?.[key]) {
						lastLog = { ...lastLog, time_span: (Number(lastLog['time_span']) || 0) + 1 };
						aiEvents.push(lastLog);
						if (lastLog.time_span > 10) {
							showNotification({
								title: 'Warning!',
								body: `Alert: ${key} detected for more than 10 seconds!`,
							});
						}
					} else if (!log[key] && lastLog?.[key]) {
						lastLog = { ...lastLog, end_time: Number(lastLog.start_time) + Number(lastLog.time_span) };
						registerAIEvent({ eventType: 'success', notify: false, eventName: key, startTime: lastLog.start_time, endTime: Number(lastLog.start_time) + Number(lastLog.time_span) });
					}
				});
			}
		} catch (error) {
			console.error('Error in AI processing:', error);
		}
	}, 1000);
};


export const cleanupLocalVideo = () => {
	const webcamContainer = document.getElementById('webcam-container');
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

		if (socket && socket.readyState === WebSocket.OPEN) {
			console.log('in the stopRecording log');
			socket.send(JSON.stringify({ event: 'stopRecording', data: 'Web video recording stopped' }));
		}
		
		// if (secureFeatures?.entities.find(entity => entity.key === 'mobile_proctoring')) {
		// 	const getRecordingResp = await getRecordings({ room_sid: session?.mobileRoomId });
		// 	if (getRecordingResp?.data && getRecordingResp?.status === 200) {
		// 		const newCameraRecordings = [];
		// 		const newAudioRecordings = [];
				
		// 		console.log('getRecordingResp', getRecordingResp?.data);
		// 		const existingVideoRecordings = [...session.user_video_name, ...session.screen_sharing_video_name];
		// 		const existingAudioRecordings = [...session.audio_recordings];
				
		// 		getRecordingResp?.data?.video_recordings.forEach(recording => {
		// 			if (!existingVideoRecordings.includes(recording.source_sid)) {
		// 				newCameraRecordings.push(recording.source_sid);
		// 			}
		// 		});
		
		// 		getRecordingResp?.data?.audio_recordings.forEach(recording => {
		// 			if (!existingAudioRecordings.includes(recording.source_sid)) {
		// 				newAudioRecordings.push(recording.source_sid);
		// 			}
		// 		});

		// 		const mobileRecordings = session?.mobileRecordings || [];
		// 		const mobileAudios = session?.mobileAudios || [];

		// 		updatePersistData('session', {
		// 			mobileRecordings: [...mobileRecordings, ...newCameraRecordings],
		// 			mobileAudios: [...mobileAudios, ...newAudioRecordings],
		// 		});
		// 	}
		// }

		cleanupLocalVideo();

		if(mediaStream){
			mediaStream.getTracks().forEach(track => track.stop());
			mediaStream=null;
		}

		if (newStream) {
			newStream.getVideoTracks().forEach(track => {
				track.stop();
				track.enabled = false;
			});
		}

		if (newStream) {
			newStream.getAudioTracks().forEach(track => {
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

		if(secureFeatures?.entities?.filter(entity => LockDownOptions.includes(entity.key))?.length){
			unlockBrowserFromContent();
		}
		
		const dateTime = new Date();

		registerEvent({ eventType: 'success', notify: false, eventName: 'recording_stopped_successfully', startAt: dateTime });

		updatePersistData('session', {
			recordingEnded: true,
			sessionStatus: 'Completed',
		});

		showNotification({
			title: 'Recording Stopped',
			body: 'Recording session has ended.',
		});

		return 'stop_recording';
	} catch (e) {
		console.error(e);
	}
};

function VideoChat(room) {
	const secureFeatures = getSecureFeatures();
	const session = convertDataIntoParse('session');
	const localVideoRef = document.createElement('div');
	const remoteVideoRef = document.createElement('div');
	remoteVideoRef.classList.add('remote-video');

	document.body.appendChild(remoteVideoRef); 

	function attachTrack(track, container) {
		if (container && track && track.kind === 'video') {
			try {
				const attachedElement = track?.attach();
				if (attachedElement) {
					attachedElement.classList.add('video-attached');
					container.appendChild(attachedElement);
				}
			} catch (error) {
				console.error('Error attaching video track:', error);
			}
		} else {
			console.error('Track is not a video track or container is missing', { track, container });
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

			room.on('participantReconnecting', remoteParticipant => {
				console.log(`${remoteParticipant.identity} is reconnecting the signaling connection to the Room!`);
				if (findConfigs(['mobile_proctoring'], secureFeatures?.entities).length) {
					updatePersistData('preChecksSteps', { 
						mobileConnection: false,
						screenSharing: false
					});
				} else {
					updatePersistData('preChecksSteps', { 
						screenSharing: false
					});					
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
			console.error('Error connecting to Twilio room:', error);
		}
	}

	connectToRoom();
}
