import axios from 'axios';
import { ASSET_URL, BASE_URL } from './constant';
import { addSectionSession, editSectionSession } from '../services/sessions.service';
import { getRecordingSid } from '../services/twilio.services';

export const dataURIToBlob = (dataURI) => {
	const splitDataURI = dataURI.split(',');
	const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
	const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

	const ia = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++)
		ia[i] = byteString.charCodeAt(i);

	return new Blob([ia], { type: mimeString });
};

export const getTimeInSeconds = ({ isUTC = false, inputDate = new Date() }) => {
	const currentDate = new Date(inputDate);
	if (isUTC) {
		return currentDate.getTime() - currentDate.getTimezoneOffset() * 60 * 1000;
	} else {
		return currentDate.getTime();
	}
};

export const checkCamera = () => {
	return new Promise((resolve, _reject) => {
		navigator.getMedia = (
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia
		);
	
		navigator.getMedia({ video: true }, stream => {
			resolve(stream);
		}, (err) => {
			console.log(err);
			resolve(false);
		});
	});
};

export const getLocation = () => {
	return new Promise((resolve, _reject) => {
		let startPos;
		const geoSuccess = (position) => {
			startPos = position;
			const {latitude, longitude} = startPos.coords;
			resolve({latitude, longitude});
		};
		const geoError = (_error) => {
			resolve(false);
		};
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
	});
};

export const checkNotification = () => {
	return new Promise((resolve, _reject) => {
		if (!('Notification' in window)) {
			resolve(false);
		} else if (Notification.permission === 'granted') {
			showNotification({
				title: 'New notification message from mereos!',
				body: 'Hey mate, Ready for the test ? It will be starting soon.',
				icon: `${ASSET_URL}/mereos.png`
			});
			resolve(true);
		} else if (Notification.permission === 'denied' || Notification.permission === 'default') {
			Notification.requestPermission()
				.then((permission) => {
					if (permission === 'granted') {
						showNotification({
							title: 'New notification message from mereos!',
							body: 'Hey mate, Ready for the test ? It will be starting soon.',
							icon: `${ASSET_URL}/mereos.png`
						});
						resolve(true);
					} else {
						resolve(false);
					}
				})
				.catch(err => {
					console.log('err', err);
				});
		}
	});
};

export const getMultipleCameraDevices = () => {
	return new Promise((resolve, reject) => {
		navigator.mediaDevices.enumerateDevices()
			.then(devices => {
				const videoDevices = devices.filter(device => device.kind === 'videoinput');
				videoDevices.sort((a, b) => {
					// Check for keywords or identifiers common on Windows and macOS for built-in cameras
					const isDefaultCamera = (device) => {
						const label = device.label.toLowerCase();
						return (
							// Windows identifiers
							label.includes('webcam') ||
							label.includes('camera') ||
							label.includes('integrated') ||
							// macOS identifiers
							label.includes('facetime') ||
							label.includes('isight')
							// Add more specific identifiers as needed
						);
					};
				
					if (isDefaultCamera(a)) {
						return -1; // prioritize default camera
					} else if (isDefaultCamera(b)) {
						return 1;
					}
					return 0;
				});
				resolve(videoDevices);
			})
			.catch(error => {
				console.error('Error enumerating devices:', error);
				reject(error);
			});
	});
};

export const showNotification = ({title = 'New Message', body = 'How you doing?', icon = `${ASSET_URL}/mereos.png`}) => {
	const notification = new Notification(title, { body: body, icon: icon, });
	console.log(notification);
};
export const detectMultipleScreens = () => {
	console.log('window.screen',window.screen);
	if (window.screen.isExtended) {
		return true;
	}else {
		return false;
	}
};

export const checkMicrophone = () => {
	return new Promise((resolve, _reject) => {
		navigator.getMedia = (
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia
		);
	
		navigator.getMedia({audio: true}, (stream) => {
			resolve(stream);
		}, (err) => {
			console.log(err);
			resolve(false);
		});
	});
};

export const getNetworkUploadSpeed = async () => {
	try {
		const myData = { 'test': 'a'.repeat(1024 * 1024) };
		const startTime = new Date().getTime();

		const response = await testUploadSpeed({ 'test': 'a'.repeat(1024 * 1024) });

		if(response){
			const endTime = new Date().getTime();
			const duration = (endTime - startTime) / 1000;
			const bitsLoaded = myData.test.length * 8;
			const speedMbps = ((bitsLoaded / duration) / 1024 / 1024).toFixed(2);
	
			return { speedMbps: speedMbps };
		}
        
	} catch (err) {
		console.error(err);
		return false;
	}
};

const testUploadSpeed = async (text) => {
	return axios.post(`${BASE_URL}/general/test-upload-speed`, { 'test': text });
};

export const registerEvent = ({ eventType, eventName, eventValue }) => {
	try{
			const session = convertDataIntoParse('session');
			console.log('session',session);

			const event = {
					name: eventName,
					value: eventName,
					section_session: session?.id,
					start_at: session.sessionStartTime !== 0 ? Math.round((getTimeInSeconds({isUTC: true}) - session.sessionStartTime) / 1000) : 0
			};
			const token = localStorage.getItem('token');
			const config = {
					headers: {
							token: token,
							'm-preferred-language': 'en'
					},
			};
			return axios.post(`${BASE_URL}/section_session/post_event/`, event,config);
	}catch(error){
			console.log(error);
	}
}

export const getAuthenticationToken = () => {
	return localStorage.getItem('token');
};

export const userRekognitionInfo = async (data) => {
	// const token = await localStorage.getItem('token');
	// let language = getPreferredLanguage();
	// const config = {
	// 	headers: {
	// 		token: `${token}`,
	// 		'm-preferred-language': language
	// 	},
	// };
	return axios.post(`${BASE_URL}/general/rekognition/`, data);
};

export const convertDataIntoParse = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const srcToData = async (src) => {
	let myPromise = await new Promise(resolve => {
		fetch(src)
			.then((res) => res.blob())
			.then((blob) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					resolve(reader.result);
					// getBase64StringFromDataURL
					reader.result.replace('data:', '').replace(/^.+,/, '');
				};
				reader.readAsDataURL(blob);
			});
	});

	return myPromise;
};

export const acceptableLabels = (detectedLabels, acceptedValue = 80) => {
	const acceptedLabels = ['cards', 'document', 'text', 'id cards', 'passport', 'driving license', 'license', 'id', 'identity', 'doc', 'cnic', 'nic'];
	let totalLabelConfidence = 0;
	let totalAcceptedLabels = 0;
	detectedLabels.Labels.forEach(label => {
		if (acceptedLabels.includes(label.Name.toLowerCase())) {
			totalLabelConfidence = totalLabelConfidence + label.Confidence;
			totalAcceptedLabels = totalAcceptedLabels + 1;
		}
	});

	return totalLabelConfidence / totalAcceptedLabels > acceptedValue;
};

export const acceptableText = (detectedText, acceptedValue = 80) => {
	let totalTextConfidence = 0;
	let totalAcceptedTexts = 0;
	detectedText.TextDetections.forEach(text => {
		totalTextConfidence = totalTextConfidence + text.Confidence;
		totalAcceptedTexts = totalAcceptedTexts + 1;
	});

	console.log('totalTextConfidence / totalAcceptedTexts', totalTextConfidence, totalAcceptedTexts);

	return totalTextConfidence / totalAcceptedTexts >= acceptedValue;
};

export const dataURLtoFile = (dataurl, filename) => {
	let arr = dataurl?.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[arr.length - 1]), 
		n = bstr.length, 
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, {type: mime});
};

export const shareScreenFromContent = () => {
	return new Promise((resolve, reject) => {
		navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: 'monitor' } })
			.then(stream => {
				resolve(stream);
			})
			.catch(err => {
				reject(err);
			});
	});
};


export const uploadFileInS3Folder = async (data) => {
	const token = localStorage.getItem('token');
	
	const myHeaders = new Headers();
	const formData = new FormData();
	formData.append('files', data.file, `${Date.now()}`);
	formData.append('folder_name',data.folderName);
	
	const config = {
		headers: {
			...myHeaders, 
			token: token,
		},
	};
	return axios.post(`${BASE_URL}/general/upload_file/`, formData,config);
};

export const findConfigs = (configs, entities) => {
	let result = [];
	for (const entity of entities) {
		for (const config of configs) {
			if (config === entity.name) {
				result.push(entity);
				break;
			}
		}
	}
	return result;
};

export const getCandidateAssessment = () => {
	const secureFeatures = JSON.parse(localStorage.getItem('candidateAssessment'))
	return secureFeatures;
}


export const checkForMultipleMicrophones = async () => {
	try {
		await navigator.mediaDevices.getUserMedia({ audio: true });

		const devices = await navigator.mediaDevices.enumerateDevices();

		const microphones = devices.filter(device => device.kind === 'audioinput');
		console.log('Microphones found:', microphones);

		const defaultMicrophone = microphones.find(device => device.deviceId === 'default');

		if (defaultMicrophone) {
			return [defaultMicrophone];
		}

		if (microphones.length > 0) {
			return [microphones[0]];
		}

		return [];
	} catch (err) {
		if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
			console.error('Permission denied:', err);
		} else {
			console.error('Error:', err);
		}
		return [];
	}
};

export const updatePersistData = (key, updates) => {
	let storedItemJSON = localStorage.getItem(key);

	if (storedItemJSON) {
			let storedItem = JSON.parse(storedItemJSON);

			for (let prop in updates) {
					if (updates.hasOwnProperty(prop)) {
							storedItem[prop] = updates[prop];
					}
			}

			let updatedItemJSON = JSON.stringify(storedItem);

			localStorage.setItem(key, updatedItemJSON);
	} else {
			console.warn(`No item found in localStorage with key "${key}"`);
	}
}

export const addSectionSessionRecord = (session, candidateInviteAssessmentSection) => {
	return new Promise(async (resolve, _reject) => {
		const sourceIds = [...session.cameraRecordings, ...session.audioRecordings, ...session.screenRecordings];
		const recordings = sourceIds?.length
			? await getRecordingSid({'source_id': [...session.cameraRecordings, ...session.audioRecordings, ...session.screenRecordings]})
			: [];
		let sectionSessionDetails = {
			start_time: session.sessionStartTime,
			duration_taken: session.sessionStartTime ? getTimeInSeconds({isUTC: true}) - session.sessionStartTime : 0,
			candidate_identity_card: session.identityCard,
			candidate_photo: session.candidatePhoto,
			school: candidateInviteAssessmentSection?.candidate_assessment.candidate.school,
			section: candidateInviteAssessmentSection.section.id,
			candidate: candidateInviteAssessmentSection.candidate_assessment.candidate.id,
			candidate_invite_assessment_section: candidateInviteAssessmentSection.id,
			camera_recordings: recordings?.data?.filter(recording => session.cameraRecordings.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
			audio_recordings: recordings?.data?.filter(recording => session.audioRecordings.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
			screen_recordings: recordings?.data?.filter(recording => session.screenRecordings.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
			roomscan_recordings: session.roomScanRecordings,
			room_id:session?.room_id || '',
			room_session_id: session.roomSessionId || '',
			session_id: session.sessionId,
			collected_details: {
				location: session.location,
			},
			browser_events: session.browserEvents,
			video_codec: null,
			video_extension: null,
			mobile_audio_recordings: session.mobileAudios,
			mobile_recordings: session.mobileRecordings
		};

		if (session.id) {
			sectionSessionDetails['id'] = session.id;
		}
		
		const resp = session.id ? await editSectionSession(sectionSessionDetails) : await addSectionSession(sectionSessionDetails);
		resolve(resp);
	});
};

export const getDateTime = (_dateBreaker_ = '/', _timeBreaker_ = ':', _differentiator_ = ' ', inputDate = new Date()) => {
	const currentDate = new Date(inputDate);
	const year = currentDate.getUTCFullYear();
	const date = ('0' + currentDate.getUTCDate()).substr(-2);
	const month = ('0' + (currentDate.getUTCMonth() + 1)).substr(-2);
	const hours = ('0' + currentDate.getUTCHours()).substr(-2);
	const minutes = ('0' + currentDate.getUTCMinutes()).substr(-2);
	const seconds = ('0' + currentDate.getUTCSeconds()).substr(-2);
	return `${year}${_dateBreaker_}${date}${_dateBreaker_}${month}${_differentiator_}${hours}${_timeBreaker_}${minutes}${_timeBreaker_}${seconds}`;
};
