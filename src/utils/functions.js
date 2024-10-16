import axios from 'axios';
import { ASSET_URL, BASE_URL } from './constant';
import { addSectionSession, editSectionSession } from '../services/sessions.service';
import { getRecordingSid } from '../services/twilio.services';
import { createAiEvent } from '../services/ai-event.servicer';
// import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';
import i18next from 'i18next';
import { createEvent } from '../services/event.service';
import { closeModal } from '../ExamPrepreation/examPrechecks';

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
	return new Promise((resolve) => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true })
				.then((stream) => {
					console.log('Camera stream:', stream);
					resolve(stream);
				})
				.catch((err) => {
					console.log('Error checking camera:', err);
					resolve(false);
				});
		} else if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {
			const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
			getUserMedia({ video: true }, (stream) => {
				console.log('Camera stream:', stream);
				resolve(stream);
			}, (err) => {
				console.log('Error checking camera:', err);
				resolve(false);
			});
		} else {
			console.log('getUserMedia is not supported');
			resolve(false);
		}
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
					const isDefaultCamera = (device) => {
						const label = device.label.toLowerCase();
						return (
							label.includes('webcam') ||
							label.includes('camera') ||
							label.includes('integrated') ||
							label.includes('facetime') ||
							label.includes('isight')
						);
					};
				
					if (isDefaultCamera(a)) {
						return -1;
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

export const detectMultipleScreens = async () => {
	if (window.screen.isExtended) {
		return true;
	}else {
		return false;
	}
};

export const checkMicrophone = () => {
	return new Promise((resolve) => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ audio: true })
				.then((stream) => {
					console.log('Microphone stream:', stream);
					resolve(stream);
				})
				.catch((err) => {
					console.log('Error checking microphone:', err);
					resolve(false);
				});
		} else if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {
			const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
			getUserMedia({ audio: true }, (stream) => {
				console.log('Microphone stream:', stream);
				resolve(stream);
			}, (err) => {
				console.log('Error checking microphone:', err);
				resolve(false);
			});
		} else {
			console.log('getUserMedia is not supported');
			resolve(false);
		}
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

export const testUploadSpeed = async (text) => {
	return axios.post(`https://dashboard-api.mereos-datasafe.com/general/test-upload-speed`, { 'test': text });
};

export const registerEvent = ({ eventName }) => {
	try{
		const session = convertDataIntoParse('session');
		console.log('session',session);

		const event = {
			name: eventName,
			value: eventName,
			session_id: session?.id,
			start_at: session.sessionStartTime !== 0 ? Math.round((getTimeInSeconds({isUTC: true}) - session.sessionStartTime) / 1000) : 0
		};
			
		return createEvent(event);
	}catch(error){
		console.log(error);
	}
};

export const getAuthenticationToken = () => {
	return localStorage.getItem('mereosToken');
};

export const userRekognitionInfo = async (data) => {
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
	detectedLabels?.Labels?.forEach(label => {
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
	const token = localStorage.getItem('mereosToken');
	
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
	return axios.post(`${BASE_URL}/general/candidate_upload_file/`, formData,config);
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

export const getSecureFeatures = () => {
	const secureFeatures = JSON.parse(localStorage.getItem('secureFeatures'));
	return secureFeatures;
};

export const checkForMultipleMicrophones = async () => {
	try {
		await navigator.mediaDevices.getUserMedia({ audio: true });

		const devices = await navigator.mediaDevices.enumerateDevices();

		const microphones = devices.filter(device => device.kind === 'audioinput');
		console.log('Microphones found:', microphones);

		if (microphones.length > 0) {
			return microphones;
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
};

export const addSectionSessionRecord = (session, candidateInviteAssessmentSection) => {
	return new Promise(async (resolve, _reject) => {
		console.log('session',session,'candidateInviteAssessmentSection',candidateInviteAssessmentSection);
		let recordings;
		if(session?.user_video_name?.length || session?.audio_recordings?.length || session?.screen_sharing_video_name?.length){
			const sourceIds = [...session?.user_video_name, ...session?.audio_recordings, ...session?.screen_sharing_video_name];
			recordings = sourceIds?.length
				? await getRecordingSid({'source_id': [...session.user_video_name, ...session.audio_recordings, ...session.screen_sharing_video_name]})
				: [];
		}
		
		let sectionSessionDetails = {
			start_time: session?.sessionStartTime,
			submission_time: session?.submissionTime,
			duration_taken: session?.sessionStartTime ? getTimeInSeconds({isUTC: true}) - session.sessionStartTime : 0,
			identity_card: session?.identityCard,
			room_scan_video:session?.room_scan_video,
			identity_photo: session?.candidatePhoto,
			school: candidateInviteAssessmentSection?.school?.id || '',
			assessment: session?.assessment?.id || 1,
			candidate: candidateInviteAssessmentSection?.id,
			user_video_name: recordings?.data?.filter(recording => session.user_video_name.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
			audio_recordings: recordings?.data?.filter(recording => session.audio_recordings.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
			screen_sharing_video_name: recordings?.data?.filter(recording => session.screen_sharing_video_name.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
			roomscan_recordings: session?.roomScanRecordings,
			session_id: session?.sessionId,
			collected_details: {
				location: session?.location,
			},
			status: session?.sessionStatus,
			video_codec: null,
			video_extension: null,
			archive_id:null,
			attempt_id:null,
		};

		if (session?.id) {
			sectionSessionDetails['id'] = session?.id;
		}
		
		const resp = session?.id ? await editSectionSession(sectionSessionDetails) : await addSectionSession(sectionSessionDetails);
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

export const registerAIEvent = async ({ notify, eventType, eventName, eventValue, startTime,endTime }) => {
	try{
		const session = convertDataIntoParse('session');

		const event = {
			name: eventName,
			start_at: startTime,
			end_at:endTime,
			value: eventName,
			created_at: getDateTime(),
			session_id: session?.id
		};
				
		await createAiEvent(event);
		notify && showNotification({eventType, eventName, eventValue});
	}catch(e){
		console.log('error',e);
	}
};

export const lockBrowserFromContent = (entities) => {
	return new Promise(async (resolve, _reject) => {
		let result = {};
		for (const entity of entities) {
			switch (entity.name) {
				case 'Disable Right Click': {
					const disableRightClick = await preventRightClick();
					if (disableRightClick) {
						result = {...result, [entity.name]: true};
					}
					break;
				}

				case 'Disable Clipboard': {
					const copyPasteCutDisabled = await disableCopyPasteCut();
					if (copyPasteCutDisabled) {
						result = {...result, [entity.name]: true};
					}
					break;
				}

				case 'Disable function keys': {
					const disableShortcuts = await preventShortCuts();
					if (disableShortcuts) {
						result = {...result, [entity.name]: true};
					}
					break;
				}

				case 'Disable Printing': {
					const disablePrinting = await stopPrinting();
					if (disablePrinting) {
						result = {...result, [entity.name]: true};
					}
					break;
				}

				case 'Detect unfocus': {
					const defocusDisabled = await detectUnfocusOfTab();
					if (defocusDisabled) {
						result = {...result, [entity.name]: true};
					}
					break;
				}

				case 'Disable switch to other Apps': {
					const detectPageLeaving = await preventPreClosure();
					if (detectPageLeaving) {
						result = {...result, [entity.name]: true};
					}
					break;
				}

				case 'Detect resizing of window': {
					const disableWindowResize = await detectWindowResize(null);
					if (disableWindowResize) {
						result = {...result, [entity.name]: true};
					}
					break;
				}

				case 'Verify Desktop': {
					const dualDisplay = await detectDualDisplay();
					if (dualDisplay) {
						result = {...result, [entity.name]: true};
					}
					break;
				}

				case 'Force Full Screen': {
					const fullScreen = await forceFullScreen();
					if (fullScreen) {
						result = {...result, [entity.name]: true};
					}
					break;
				}
				
				default:
					null;
			}
		}

		resolve(result);
	});
};

export const preventRightClick = () => {
	return new Promise((resolve, _reject) => {
		document.addEventListener('contextmenu', handleDefaultEvent);
		resolve(true);
	});
};

export const disableCopyPasteCut = () => {
	return new Promise((resolve, _reject) => {
		'cut copy paste'.split(' ').forEach((eventName) => {
			window.addEventListener(eventName, handleDefaultEvent);
		});
		resolve(true);
	});
};

export const restoreRightClick = () => {
	return new Promise((resolve, _reject) => {
		document.removeEventListener('contextmenu', handleDefaultEvent, true);
		resolve(true);
	});
};

export const preventPreClosure = () => {
	return new Promise((resolve, _reject) => {
		// window.onbeforeunload = (_error) => {
		// 	return 'Really want to quit the exam, may lead to failure?';
		// };
		resolve(true);
	});
};

export const detectDualDisplay = () => {
	return new Promise((resolve, _reject) => {
		resolve(window.screen.isExtended);
	});
};

export const detectUnfocusOfTab = () => {
	return new Promise(async (resolve, _reject) => {
		try {
			document.addEventListener('visibilitychange', () => {
				if (document.hidden) {
					showNotification({
						title: 'Warning',
						body: i18next.t('moved_away_from_page'),
						icon: `${ASSET_URL}/mereos.png`
					});
					registerEvent({ eventType: 'error', notify: false, eventName: 'moved_away_from_page' });
				} else {
					showNotification({
						title: 'Welcome Back',
						body: i18next.t('moved_back_to_page'),
						icon: `${ASSET_URL}/mereos.png`
					});
					registerEvent({ eventType: 'success', notify: false, eventName: 'moved_back_to_page' });
				}
			});

			resolve(true);
		} catch (error) {
			console.error('Notification permission error:', error);
			resolve(false);
		}
	});
};

export const preventShortCuts = (allowedFunctionKeys = []) => {
	return new Promise((resolve, _reject) => {
		document.onkeydown = (event) => {
			console.log('preventShortCuts', event);
			event = event || window.event;

			// List of key codes to be blocked
			const blockedKeys = [
				27,  // Escape
				91,  // Meta (Windows key, Command key on Mac)
				112, // F1
				113, // F2
				114, // F3
				115, // F4
				116, // F5
				117, // F6
				118, // F7
				119, // F8
				120, // F9
				121, // F10
				122, // F11
				123, // F12
				91, // window btn
				44,   // Print Screen,
				173,
				174,
				114,
				145,
				91
			];

			// Check for Ctrl/Meta + any alphabet key
			if (
				(event.ctrlKey || event.metaKey) && 
							'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(event.key) !== -1
			) {
				event.preventDefault();
				event.stopPropagation();
			}

			// Check for Ctrl + Shift + any alphabet key
			if (
				(event.ctrlKey || event.metaKey) && event.shiftKey &&
							'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(event.key) !== -1
			) {
				event.preventDefault();
				event.stopPropagation();
			}

			// Check for specific function keys and other special keys
			if (blockedKeys.includes(event.keyCode)) {
				// Allow specific function key combinations if they are in the allowed list
				if (event.keyCode >= 112 && event.keyCode <= 123 && allowedFunctionKeys.includes(event.keyCode)) {
					return; // Allow the function key if it is in the allowed list
				}

				event.preventDefault();
				event.stopPropagation();
			}
		};
		resolve(true);
	});
};


export const stopPrinting = () => {
	return new Promise((resolve, _reject) => {
		let css = `
			body {
				display: none;
				visibility: hidden;
			}
		`;
		let head = document.head || document.getElementsByTagName('head')[0];
		let style = document.createElement('style');

		head.appendChild(style);

		style.type = 'text/css';
		style.media = 'print';
		if (style.styleSheet) {
			// This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		resolve(true);
	});
};

export const detectWindowResize = () => {
	return new Promise((resolve, _reject) => {
		let resizeTimeout;
		let isResizing = false;

		const handleResize = () => {
			if (!isResizing) {
				registerEvent({ eventType: 'error', notify: false, eventName: 'candidate_resized_window' });
				console.log('Resize started');
				isResizing = true;
			}

			clearTimeout(resizeTimeout);

			resizeTimeout = setTimeout(() => {
				registerEvent({ eventType: 'error', notify: false, eventName: 'candidate_resized_window' });
				console.log('Resize ended');
				isResizing = false;
			}, 500);
		};

		window.addEventListener('resize', handleResize);
		resolve(true);
	});
};

export const createATab = (url) => {
	return new Promise((resolve, _reject) => {
		window.open(url);
		resolve(true);
	});
};

export const forceFullScreen = (element = document.documentElement) => {
	try {
		// Attempt to request fullscreen based on the browser
		if (typeof element.requestFullscreen === 'function') {
			element.requestFullscreen();
		} else if (typeof element.webkitRequestFullscreen === 'function') { /* Safari */
			element.webkitRequestFullscreen();
		} else if (typeof element.msRequestFullscreen === 'function') { /* IE11 */
			element.msRequestFullscreen();
		}

		const whiteBackgroundElement = document.createElement('div');
		whiteBackgroundElement.style.backgroundColor = 'white';
		whiteBackgroundElement.style.top = '0';
		whiteBackgroundElement.style.left = '0';
		whiteBackgroundElement.style.width = '100%';
		whiteBackgroundElement.style.height = '100%';
		whiteBackgroundElement.style.overflow = 'auto'; // Enable scrolling
		whiteBackgroundElement.style.zIndex = '1000'; // Ensure it's on top

		document.body.appendChild(whiteBackgroundElement);

		// Add event listener to handle exiting fullscreen
		document.addEventListener('fullscreenchange', () => {
			if (!document.fullscreenElement) {
				document.body.removeChild(whiteBackgroundElement);
			}
		});
	} catch (error) {
		console.error('An error occurred while attempting to enter fullscreen:', error);
	}
};


export const getCPUInfo = () => {
	return new Promise((resolve, _reject) => {
		resolve(navigator.hardwareConcurrency);
	});
};

export const getRAMInfo = () => {
	return new Promise((resolve, _reject) => {
		resolve(navigator.deviceMemory);
	});
};

const handleDefaultEvent = e => {
	e.preventDefault();
	e.stopPropagation();
};

export const handlePreChecksRedirection = () => {
	const preChecksSteps = convertDataIntoParse('preChecksSteps');
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const hasFeature = (featureName) => secureFeatures.some(feature => feature.key === featureName);
	const systemDiagnosticSteps = ['Verify Desktop', 'Record Video', 'Record Audio', 'Verify Connection', 'Track Location', 'Enable Notifications','Upload Speed'];
	const prevalidationSteps = ['record_video', 'record_audio','identity_card_requirement','record_room'];

	console.log('preValidation',!preChecksSteps?.preValidation && secureFeatures?.filter(entity => prevalidationSteps.includes(entity.name))?.length > 0);

	if (!preChecksSteps?.examPreparation && hasFeature('exam_perparation')) {
		return 'ExamPreparation';
	} else if(!preChecksSteps?.diagnosticStep && secureFeatures?.filter(entity => systemDiagnosticSteps.includes(entity.name))?.length){
		return 'runSystemDiagnostics';
	}else if(!preChecksSteps?.preValidation){
		return 'Prevalidationinstruction';
	}
	else if(!preChecksSteps?.userPhoto && hasFeature('verify_candidate')){
		return 'IdentityVerificationScreenOne';
	}else if(!preChecksSteps?.identityCardPhoto && hasFeature('identity_card_requirement')){
		return 'IdentityVerificationScreenTwo';
	}else if(!preChecksSteps?.audioDetection && hasFeature('record_audio')){
		return 'IdentityVerificationScreenThree';
	}else if(!preChecksSteps?.roomScanningVideo && hasFeature('record_room')){
		return 'IdentityVerificationScreenFour';
	}
	// else if(!preChecksSteps?.mobileConnection){
	// 	return IDENTITY_VERIFICATION_SCREEN_SIX;
	// }
	else if(!preChecksSteps?.screenSharing || hasFeature('record_screen')){
		return 'IdentityVerificationScreenFive';
	}
	// else if(!preChecksSteps?.examIndication){
	// 	return EXAM_INDICATIONS;
	// }
	else{
		closeModal();
	}
};