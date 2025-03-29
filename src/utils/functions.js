import axios from 'axios';
import { BASE_URL, examPreparationSteps, prevalidationSteps, SYSTEM_REQUIREMENT_STEP, systemDiagnosticSteps } from './constant';
import { addSectionSession, editSectionSession } from '../services/sessions.service';
import { getRecordingSid } from '../services/twilio.services';
import { createAiEvent } from '../services/ai-event.services';
import { createEvent } from '../services/event.service';
import { testUploadSpeed } from '../services/general.services';
import i18next from 'i18next';
import { closeModal, openModal } from '../ExamsPrechecks';
import { Notyf } from 'notyf';

export const dataURIToBlob = (dataURI) => {
	
	const splitDataURI = dataURI.split(',');
	if (splitDataURI.length < 2) {
		return null;
	}

	const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
	const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

	const ia = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

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
					resolve(stream);
				})
				.catch(() => {
					resolve(false);
				});
		} else if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {
			const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
			getUserMedia({ video: true }, (stream) => {
				resolve(stream);
			}, () => {
				resolve(false);
			});
		} else {
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

// export const checkNotification = () => {
// 	return new Promise((resolve, _reject) => {
// 		if (!('Notification' in window)) {
// 			resolve(false);
// 		} else if (Notification.permission === 'granted') {
// 			showNotification({
// 				title: 'New notification message from mereos!',
// 				body: 'Hey mate, Ready for the test ? It will be starting soon.',
// 			});
// 			resolve(true);
// 		} else if (Notification.permission === 'denied' || Notification.permission === 'default') {
// 			Notification.requestPermission()
// 				.then((permission) => {
// 					if (permission === 'granted') {
// 						showNotification({
// 							title: 'New notification message from mereos!',
// 							body: 'Hey mate, Ready for the test ? It will be starting soon.',
// 						});
// 						resolve(true);
// 					} else {
// 						resolve(false);
// 					}
// 				})
// 				.catch(err => {
// 					logger.error('err', err);
// 				});
// 		}
// 	});
// };

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
				logger.error('Error enumerating devices:', error);
				reject(error);
			});
	});
};

// export const showNotification = ({ title, body }) => {
// 	try{
// 		const schoolTheme = JSON.parse(localStorage.getItem('schoolTheme'));
// 		let icons  = schoolTheme?.schoolLogo || `${ASSET_URL}/mereos.png`;
// 		const notification = new Notification(title, { body: body, icon: icons });
// 		logger.success(notification);
// 	}catch(error) {
// 		logger.error('Error in notification',error);
// 	}
// };

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
					resolve(stream);
				})
				.catch(() => {
					resolve(false);
				});
		} else if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {
			const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
			getUserMedia({ audio: true }, (stream) => {
				resolve(stream);
			}, () => {
				resolve(false);
			});
		} else {
			resolve(false);
		}
	});
};

export const registerEvent = ({ eventName }) => {
	try{
		const session = convertDataIntoParse('session');

		if(session?.id){
			const event = {
				name: eventName,
				value: eventName,
				session_id: session?.id,
				start_at: session?.sessionStartTime !== 0 ? Math.round((getTimeInSeconds({isUTC: true}) - session?.sessionStartTime) / 1000) : 0
			};
				
			return createEvent(event);
		}
	}catch(error){
		logger.error('Error in register event', error);
	}
};

export const updateThemeColor = () => {
	const defaultTheme = {
		theming: '#FF961B',  
		font: 'normal'       
	};

	const schoolTheme = JSON.parse(localStorage.getItem('schoolTheme'));

	const isValidHex = (color) => {
		const hexRegex = /^#[0-9A-F]{6}$/i;  
		return hexRegex.test(color);
	};

	const isValidFontStyle = (font) => {
		const validFontStyles = ['normal', 'italic', 'oblique'];
		return validFontStyles.includes(font);
	};

	const themeColor = isValidHex(schoolTheme?.theming) 
		? schoolTheme.theming 
		: defaultTheme.theming; 

	const fontStyle = isValidFontStyle(schoolTheme?.font) 
		? schoolTheme.font 
		: defaultTheme.font;  

	const themeToStore = {
		...schoolTheme,
		theming: themeColor,
		font: fontStyle
	};

	localStorage.setItem('schoolTheme', JSON.stringify(themeToStore));

	document.documentElement.style.setProperty('--theme-color', themeColor);
	document.documentElement.style.setProperty('--font-style', fontStyle);
};


export const loadZendeskWidget = () => {
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const hasChatBot = secureFeatures?.some(entity => entity.key === 'chat_bot');
	let script;

	if (hasChatBot) {
		script = document.createElement('script');
		script.src = 'https://static.zdassets.com/ekr/snippet.js?key=6542e7ef-41de-43ed-bc22-3d429a78ead3';
		script.async = true;
		script.id = 'ze-snippet';
		document.body.appendChild(script);
	}
};

export const cleanupZendeskWidget = () => {
	const existingScript = document.getElementById('ze-snippet');
	if (existingScript && existingScript.parentNode) {
		existingScript.parentNode.removeChild(existingScript);
	}

	if (window.zE && typeof window.zE === 'function') {
		try {
			window.zE('messenger', 'hide');
		} catch (e) {
			logger.error('Error resetting the Zendesk widget:', e);
		}
	}
};

export const getAuthenticationToken = () => {
	const tokenData = localStorage.getItem('mereosToken');

	if (tokenData) {
		const { token, expiresAt } = JSON.parse(tokenData);
        
		if (Date.now() > expiresAt) {
			localStorage.removeItem('mereosToken');
			return null;
		}
        
		return token; 
	}

	return null; 
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
		const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
		const constraints = isFirefox
			? { video: { mediaSource: 'screen' } } 
			: { video: { displaySurface: 'monitor' } }; 

		navigator.mediaDevices.getDisplayMedia(constraints)
			.then(stream => {
				const track = stream.getVideoTracks()[0];

				track.addEventListener('ended', () => {
					window.precheckCompleted=false;
					if(window.startRecordingCallBack){
						window.startRecordingCallBack({ 
							type:'error',
							message: 'screen_share_stopped',
							code:40012
						});
					}
					openModal();
					if (window.socket && window.socket.readyState === WebSocket.OPEN) {
						window.socket?.send(JSON.stringify({ event: 'resetSession' }));
					}
				});
				resolve(stream);
			})
			.catch(err => reject(err));
	});
};

export const findConfigs = (configs, entities) => {
	let result = [];
	for (const entity of entities) {
		for (const config of configs) {
			if (config === entity.key) {
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

		if (microphones.length > 0) {
			return microphones;
		}

		return [];
	} catch (err) {
		if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
			logger.error('Permission denied:', err);
		} else {
			logger.error('Permission denied:', err);
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
		logger.warn(`No item found in localStorage with key "${key}"`);
	}
};

export const addSectionSessionRecord = async (session, candidateInviteAssessmentSection) => {
	return new Promise(async (resolve, _reject) => {
		try{
			let recordings;
			if(session?.user_video_name?.length || session?.user_audio_name?.length || session?.screen_sharing_video_name?.length || session?.mobileRecordings?.length || session?.mobileAudios?.length){
				const sourceIds = [...session?.user_video_name, ...session?.user_audio_name, ...session?.screen_sharing_video_name, ...session?.mobileRecordings , ...session?.mobileAudios];
				recordings = sourceIds?.length
					? await getRecordingSid({'source_id': [...session?.user_video_name, ...session?.user_audio_name, ...session?.screen_sharing_video_name, ...session?.mobileRecordings , ...session?.mobileAudios]})
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
				candidate: candidateInviteAssessmentSection?.candidate?.id,
				user_video_name: recordings?.data?.filter(recording => session.user_video_name.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
				user_audio_name: recordings?.data?.filter(recording => session.user_audio_name.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
				screen_sharing_video_name: recordings?.data?.filter(recording => session.screen_sharing_video_name.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
				roomscan_recordings: session?.roomScanRecordings,
				session_id: session?.sessionId,
				location: session?.location,
				collected_details: {
					download_speed:session?.downloadSpeed,
					upload_speed:session?.uploadSpeed,
					cpu_info:session?.CPUSpeed,
					ram_info:session?.RAMSpeed
				},
				status: session?.sessionStatus,
				video_codec: null,
				video_extension: null,
				archive_id:session?.room_id,
				attempt_id:null,
				incident_level: session?.incident_level,
				mobile_audio_name: recordings?.data?.filter(recording => session?.mobileAudios?.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
				mobile_video_name: recordings?.data?.filter(recording => session?.mobileRecordings?.find(subrecording => subrecording === recording.source_sid))?.map(recording => recording.media_external_location) || [],
				conversation_id:localStorage.getItem('conversationId') || '',
				candidate_assessment:session?.candidate_assessment
			};
	
			if (session?.id) {
				sectionSessionDetails['id'] = session?.id;
			}
			
			const resp = session?.id ? await editSectionSession(sectionSessionDetails) : await addSectionSession(sectionSessionDetails);
			resolve(resp);
		}catch(err){
			if (err.response?.status === 403) {
				if(window.globalCallback){
					window?.globalCallback({type:'error', message: 'error_saving_session_info',code:40018 });
				}
			} 
			if(window.startRecordingCallBack){
				window?.startRecordingCallBack({type:'error', message: 'error_saving_session_info',code:40018 });
			}
			_reject(err);
		}
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

export const registerAIEvent = async ({ eventName, startTime,endTime }) => {
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
	}catch(e){
		logger.error('Error in register ai event',e);
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

				case 'Disable downloading': {
					const disableDownloading = await disablePageDownload();
					if (disableDownloading) {
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

function disablePageDownload() {
	document.addEventListener('contextmenu', (event) => event.preventDefault());

	document.addEventListener('keydown', (event) => {
		if ((event.ctrlKey || event.metaKey) && ['s', 'p', 'u'].includes(event.key.toLowerCase())) {
			event.preventDefault();
		}
	});
}

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
		resolve(true);
	});
};

export const detectDualDisplay = () => {
	return new Promise((resolve, _reject) => {
		resolve(window.screen.isExtended);
	});
};


let visibilityChangeHandler;

export const detectUnfocusOfTab = () => {
	return new Promise(async (resolve, _reject) => {
		try {
			visibilityChangeHandler = () => {
				if (document.hidden) {
					showToast('error', 'moved_away_from_page');
					registerEvent({ eventType: 'error', notify: false, eventName: 'moved_away_from_page' });
				} else {
					registerEvent({ eventType: 'success', notify: false, eventName: 'moved_back_to_page' });
				}
			};

			document.addEventListener('visibilitychange', visibilityChangeHandler);

			resolve(true);
		} catch (error) {
			logger.error('Notification permission error:', error);
			resolve(false);
		}
	});
};

window.sharedMediaStream = null;

export const getMediaStream = async ({ audio, video }) => {
	if (window.sharedMediaStream) {
		return window.sharedMediaStream;
	}
	try {
		window.sharedMediaStream = await navigator.mediaDevices.getUserMedia({ audio: audio, video: video });
		return window.sharedMediaStream;
	} catch (error) {
		logger.error('Error accessing media devices: ', error);
		throw error;
	}
};

export const removeUnfocusListener = () => {
	if (visibilityChangeHandler) {
		document.removeEventListener('visibilitychange', visibilityChangeHandler);
		visibilityChangeHandler = null; 
	}
};

export const preventShortCuts = (allowedFunctionKeys = []) => {
	return new Promise((resolve, _reject) => {
		document.onkeydown = (event) => {
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
				44, // Print Screen,
				173,
				174,
				114,
				145,
			];

			if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
				event.preventDefault();
				event.stopPropagation();
			}

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
			@media print {
				* {
					display: none !important;
				}
			}
		`;
		let head = document.head || document.getElementsByTagName('head')[0];
		let style = document.createElement('style');

		head.appendChild(style);
		style.type = 'text/css';
		style.media = 'print';

		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		window.onbeforeprint = function () {
			return false;
		};

		resolve(true);
	});
};

let resizeTimeout;
let isResizing = false;

const handleResize = () => {
	if (!isResizing) {
		registerEvent({ eventType: 'error', notify: false, eventName: 'candidate_resized_window' });
		isResizing = true;
	}

	clearTimeout(resizeTimeout);

	resizeTimeout = setTimeout(() => {
		registerEvent({ eventType: 'error', notify: false, eventName: 'candidate_resized_window' });
		isResizing = false;
	}, 500);
};

export const detectWindowResize = () => {
	return new Promise((resolve, _reject) => {
		window.addEventListener('resize', handleResize);
		resolve(true);
	});
};

export const exitFullScreen = () => {
	try {
		// Attempt to exit fullscreen based on the browser
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) { /* Safari */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) { /* IE11 */
			document.msExitFullscreen();
		}
	} catch (error) {
		logger.error('An error occurred while attempting to exit fullscreen:', error);
	}
};

let whiteBackgroundElement; // Declare outside to access in the event listener

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

		// Create the white background element only if it doesn't exist
		if (!whiteBackgroundElement) {
			whiteBackgroundElement = document.createElement('div');
			whiteBackgroundElement.id = 'white-Background-Element';
			whiteBackgroundElement.style.backgroundColor = 'white';
			whiteBackgroundElement.style.top = '0';
			whiteBackgroundElement.style.left = '0';
			whiteBackgroundElement.style.width = '100%';
			whiteBackgroundElement.style.height = '100%';
			whiteBackgroundElement.style.overflow = 'auto'; // Enable scrolling
			whiteBackgroundElement.style.zIndex = '1000'; // Ensure it's on top

			document.body.appendChild(whiteBackgroundElement);
		}

		const handleFullscreenChange = () => {
			if (!document.fullscreenElement) {
				if (whiteBackgroundElement && document.body.contains(whiteBackgroundElement)) {
					document.body.removeChild(whiteBackgroundElement);
					whiteBackgroundElement = null;
				}
				document.removeEventListener('fullscreenchange', handleFullscreenChange); 
			}
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);
	} catch (error) {
		logger.error('An error occurred while attempting to enter fullscreen:', error);
	}
};

const handleDefaultEvent = e => {
	e.preventDefault();
	e.stopPropagation();
};

export const unlockBrowserFromContent = () => {
	document.removeEventListener('contextmenu', handleDefaultEvent);

	'cut copy paste'.split(' ').forEach((eventName) => {
		window.removeEventListener(eventName, handleDefaultEvent);
	});

	document.onkeydown = null;

	const printStyles = document.querySelectorAll('style[media="print"]');
	printStyles.forEach((style) => {
		if (style.textContent.includes('display: none') && style.textContent.includes('visibility: hidden')) {
			style.remove();
		}
	});

	removeUnfocusListener();

	window.removeEventListener('resize', handleResize);

	if (document.fullscreenElement) {
		document.exitFullscreen();
	}

	const whiteBackgroundElement = document.getElementById('white-Background-Element');
	if (whiteBackgroundElement) {
		document.body.removeChild(whiteBackgroundElement);
	}

	window.alert = function(){};
};

export const getPreviousRoute = (currentRoute, navHistory, hasFeature) => {
	// Find the index of the current route in the navigation history
	const currentIndex = navHistory.indexOf(currentRoute);

	// Ensure the current route is valid and there's a previous route
	if (currentIndex > 0) {
		// Get the previous route
		const previousRoute = navHistory[currentIndex - 1];

		// Map of features required for each route
		const featureMap = {
			'ExamPreparation': 'record_video',
			'runSystemDiagnostics': 'systemDiagnosticSteps',
			'Prevalidationinstruction': 'prevalidationSteps',
			'IdentityVerificationScreenOne': 'verify_candidate',
			'IdentityVerificationScreenTwo': 'verify_id',
			'IdentityVerificationScreenThree': 'record_audio',
			'IdentityVerificationScreenFour': 'record_room',
			'MobileProctoring': 'mobile_proctoring',
			'IdentityVerificationScreenFive': 'record_screen',
		};

		// Get the feature required for the previous route
		const requiredFeature = featureMap[previousRoute];

		// Check if the feature is allowed
		if (!requiredFeature || hasFeature(requiredFeature)) {
			return previousRoute;
		}
	}

	// Return null if no valid previous route is found
	return null;
};


export const handlePreChecksRedirection = () => {
	const sessionSetting = localStorage.getItem('precheckSetting');

	if(sessionSetting === 'session_resume'){
		const preChecksSteps = convertDataIntoParse('preChecksSteps');
		const getSecureFeature = getSecureFeatures();
		const secureFeatures = getSecureFeature?.entities || [];
		const hasFeature = (featureName) => secureFeatures.some(feature => feature.key === featureName);

		if (!preChecksSteps?.examPreparation && secureFeatures?.filter(entity => examPreparationSteps.includes(entity.key))?.length) {
			return 'ExamPreparation';
		}if (!preChecksSteps?.identityConfirmation && hasFeature('verify_id')) {
			return 'IdentityCardRequirement';
		} else if(!preChecksSteps?.diagnosticStep && secureFeatures?.filter(entity => systemDiagnosticSteps.includes(entity.key))?.length){
			return 'runSystemDiagnostics';
		} else if(!preChecksSteps?.requirementStep && secureFeatures?.filter(entity => SYSTEM_REQUIREMENT_STEP.includes(entity.key))?.length){
			return 'SystemRequirements';
		} else if(!preChecksSteps?.preValidation && secureFeatures?.filter(entity => prevalidationSteps.includes(entity.key))?.length){
			return 'Prevalidationinstruction';
		}
		else if(!preChecksSteps?.userPhoto && hasFeature('verify_candidate')){
			return 'IdentityVerificationScreenOne';
		}else if(!preChecksSteps?.identityCardPhoto && hasFeature('verify_id')){
			return 'IdentityVerificationScreenTwo';
		}else if(!preChecksSteps?.audioDetection && hasFeature('record_audio')){
			return 'IdentityVerificationScreenThree';
		}else if(!preChecksSteps?.roomScanningVideo && hasFeature('record_room')){
			return 'IdentityVerificationScreenFour';
		}else if(!preChecksSteps?.mobileConnection && hasFeature('mobile_proctoring')){
			return 'MobileProctoring';
		}else if(!preChecksSteps?.screenSharing || hasFeature('record_screen')){
			return 'IdentityVerificationScreenFive';
		} else{
			closeModal();
		}
	}else{
		return 'ExamPreparation';
	}
};

export const findIncidentLevel = (ai_events) => {
	let result = 'low';

	for (const item of ai_events || []) {
		const { endTime, startTime } = item;
		const difference = endTime - startTime;

		if (difference > 10) {
			return 'high';
		} else if (difference > 5) {
			result = 'medium';
		}
	}
	return result;
};

export const normalizeLanguage = (input) => {
	if (!input) return 'en'; 
	input = input.toLowerCase();
	if (input.includes('-')) {
		return input.split('-')[0];
	}
	const languageMap = {
		french: 'fr',
		english: 'en',
		spanish: 'es',
		german:'de',
		italian:'it',
		dutch:'nl',
		portugese:'pt'
	};
	return languageMap[input] || input;
};

const logWithStyle = (message, style, object = null) => {
	if (object) {
		console.log(`%c${message}`, style, object);
	} else {
		console.log(`%c${message}`, style);
	}
};

export const logger = {
	info: (message, object) =>
		logWithStyle(message, 'color: blue; font-weight: bold;', object),
	success: (message, object) =>
		logWithStyle(message, 'color: green; font-weight: bold', object),
	debug: (message, object) =>
		logWithStyle(message, 'color: orange; font-weight: bold;', object),
	error: (message, object) =>
		logWithStyle(message, 'color: red; font-weight: bold;', object),
	warn: (message, object) =>
		logWithStyle(message, 'color: yellow; font-weight: bold;', object),
};

export const initializeI18next = () => {
	if (i18next.isInitialized) return;

	const schoolLanguage = localStorage.getItem('schoolTheme') !== undefined ? JSON.parse(localStorage.getItem('schoolTheme')) : {};
	const defaultLanguage = schoolLanguage?.language || 'en';

	i18next.init({
		lng: normalizeLanguage(defaultLanguage),
		resources: {
			cy: {
				translation: require('../assets/locales/cy/translation.json')
			}, 
			en: {
				translation: require('../assets/locales/en/translation.json')
			}, 
			fr: {
				translation: require('../assets/locales/fr/translation.json')
			},
			it: {
				translation: require('../assets/locales/it/translation.json')
			},
			pt: {
				translation: require('../assets/locales/pt/translation.json')
			},
			nl: {
				translation: require('../assets/locales/nl/translation.json')
			},
			es: {
				translation: require('../assets/locales/es/translation.json')
			},
			de: {
				translation: require('../assets/locales/de/translation.json')
			},	 
		}
	}, (err) => {
		if (err) return logger.error('Error in language', err);
	});
};

export const showToast = (type, message) => {
	if (!i18next.isInitialized) {
		initializeI18next();
	}
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const hasNotifyFeature = secureFeatures?.some(entity => entity.key === 'notify');

	if(hasNotifyFeature){
		const notyf = new Notyf();
		const translatedMessage = i18next.t(message);
		const options = {
			message: i18next.t(translatedMessage),
			duration: 3000, 
			position: { x: 'right', y: 'top' },
			ripple: true 
		};
	
		switch (type) {
			case 'error':
				notyf.error(options);
				break;
			case 'success':
				notyf.success(options);
				break;
			case 'warning':
				notyf.warning(options);
				break;
			default:
				logger.warn('Invalid notification type');
				break;
		}
	}
};

export const getRAMInfo = async () => {
	const memoryInfo = {
		capacity: 'Unknown',
		availableCapacity: 'Unknown',
	};
	
	if ('deviceMemory' in navigator) {
		memoryInfo.capacity = (navigator.deviceMemory * 1024 ** 3).toFixed(0);
	} 
	else if ('hardwareConcurrency' in navigator) {
		memoryInfo.capacity = (navigator.hardwareConcurrency * 2 * 1024 ** 3).toFixed(0);
	} else {
		console.warn('Cannot determine RAM capacity in this browser.');
	}

	if ('memory' in performance) {
		memoryInfo.availableCapacity = performance.memory.jsHeapSizeLimit - performance.memory.usedJSHeapSize;
	} else {
		console.warn('performance.memory is not supported in this browser.');
	}

	return memoryInfo;
};

export const getCPUInfo = () => {
	return new Promise((resolve, _reject) => {
		const noOfPrcessor = navigator.hardwareConcurrency || 'Unknown';
		const memoryGB = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown';

		let cpuSpeedGHz = '';
		let modelName = 'Unknown';

		if (window.WebGLRenderingContext) {
			const gl = document.createElement('canvas').getContext('webgl');
			if (gl) {
				const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
				if (debugInfo) {
					modelName = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'Unknown';

					const match = modelName.match(/@?\s*(\d+(\.\d+)?)\s*GHz/i);
					if (match) {
						cpuSpeedGHz = `${match[1]} GHz`;
					}
				}
			}
		}

		resolve({
			modelName,
			noOfPrcessor,
			cpuSpeedGHz,
			memoryGB,
		});
	});
};

export const getNetworkDownloadSpeed = () => {
	return new Promise((resolve, _reject) => {
		const imageAddr = 'http://d3ia9qn5swl78e.cloudfront.net/images/detection-side-img.svg'; 
		var downloadSize = 1263621; // bytes
		
		let startTime, endTime;
		const download = new Image();
		download.onload = function () {
			endTime = (new Date()).getTime();
			const duration = (endTime - startTime) / 1000;
			const bitsLoaded = downloadSize * 8;
			const speedBps = (bitsLoaded / duration).toFixed(2);
			const speedKbps = (speedBps / 1024).toFixed(2);
			const speedMbps = (speedKbps / 1024).toFixed(2);
			const speed = {
				speedBps, 
				speedKbps,
				speedMbps
			};
			resolve(speed);
		};
		
		startTime = (new Date()).getTime();
		var cacheBuster = '?nnn=' + startTime;
		download.src = imageAddr + cacheBuster;
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