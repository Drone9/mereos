import axios from 'axios';
import { 
	BASE_URL, 
	BROWSER_SECURTIY_STEP, 
	examPreparationSteps, 
	preChecksSteps, 
	SYSTEM_REQUIREMENT_STEP, 
	systemDiagnosticSteps
} from './constant';
import { addSectionSession, editSectionSession } from '../services/sessions.service';
import { getRecordingSid } from '../services/twilio.services';
import { bulkRegisterAIEvents, createAiEvent } from '../services/ai-event.services';
import { bulkRegisterEvents, createEvent } from '../services/event.service';
import { testUploadSpeed } from '../services/general.services';
import i18next from 'i18next';
import { closeModal, openModal } from '../ExamsPrechecks';
import { Notyf } from 'notyf';
import { notifyTokenExpired } from './axios';
import { stop_prechecks } from '../..';
import pkg from '../../package.json';
import { detectWindowResize } from './fullscreen';
import * as Sentry from '@sentry/browser';

export const sentryExceptioMessage = (error, extra = {}) => {
	Sentry.captureException(error, {
		extra: extra
	});					
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

export const forceClosure = async () => {
	try {
		const secureFeatures = getSecureFeatures();
		const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');

		if (findConfigs(['force_closure'], secureFeatures?.entities || []).length) {
			try {
				const isOnline = navigator.onLine;
				const updatedSession = convertDataIntoParse('session');

				document.removeEventListener('visibilitychange', () => {});
				document.removeEventListener('beforeunload', ()=> {});
				window.removeEventListener('beforeunload',  ()=> {});

				if (!isOnline) {
					if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
						window.mereos.socket.send(JSON.stringify({ event: 'stopRecording', data: 'Web video recording stopped' }));
					}
					showToast('error', 'signaling_connection_disconnected');
					addSectionSessionRecord(updatedSession, candidateInviteAssessmentSection);
					registerEvent({ 
						eventType: 'success', 
						notify: false, 
						eventName: 'signaling_connection_disconnected', 
						eventValue: getDateTime() 
					});
					window.mereos.startRecordingCallBack({ 
						type: 'error', 
						message: 'signaling_connection_disconnected',
						code: 40006
					});
				} else {
					showToast('error', 'assessment_closed_due_to_multiple_violation');

					if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
						window.mereos.socket.send(JSON.stringify({ event: 'stopRecording', data: 'Web video recording stopped' }));
					}

					await addSectionSessionRecord(updatedSession, candidateInviteAssessmentSection);
						
					await registerEvent({ 
						eventType: 'error', 
						notify: false, 
						eventName: 'assessment_closed_due_to_multiple_violation', 
						eventValue: getDateTime(),
					});

					window.mereos.startRecordingCallBack({ 
						type: 'error', 
						message: 'assessment_closed_due_to_multiple_violation',
						code: 400010
					});
				}

				resetSessionData();
			} catch (apiError) {
				sentryExceptioMessage(apiError,{type:'error',message:`API error during force closure`});
				logger.error('API error during force closure:', apiError);
				resetSessionData();
			}
		} else {
			window.mereos.roomInstance = null;
			window.mereos.recordingStart = false;
			if (window.mereos.startRecordingCallBack) {
				window.mereos.startRecordingCallBack({ 
					type: 'error', 
					message: 'signaling_connection_disconnected',
					code: 40006
				});
			}
		}
	} catch (error) {
		sentryExceptioMessage(error,{type:'error',message:`Error in forceClosure`});
		logger.error('Error in forceClosure:', error);
		resetSessionData();
	}
};

export const resetSessionData = () => {
	if (window.mereos.aiProcessingInterval) {
		clearInterval(window.mereos.aiProcessingInterval);
		window.mereos.aiProcessingInterval = null;
	}

	localStorage.clear();
	
	window.mereos.forceClosureTriggered = false;

	if (window.mereos.startRecordingCallBack) {
		window.mereos.startRecordingCallBack({ 
			type: 'error',
			message: 'internet_connection_lost_force_close_your_session',
			code: 40007
		});
	}
};

export const forceClosureIncident = (
	browserEvents = [], 
	profile
) => {
	const browserIncidentlevel = findBrowserIncidentLevel(browserEvents, profile);
	if (
		browserIncidentlevel === 'high') {
		return 'high';
	} else if (
		browserIncidentlevel === 'medium') {
		return 'medium';
	} else {
		return 'low';
	}
};

export const findIncidentLevel = (aiEvents = [], browserEvents = [], profile) => {
	const settingLevel = profile?.settings?.proctoring_behavior?.name;
	const aiIncidentlevel = findAIIncidentLevel(aiEvents, settingLevel);
	const browserIncidentlevel = findBrowserIncidentLevel(browserEvents, settingLevel);
	console.log('aiIncidentlevel',aiIncidentlevel);
	console.log('browserIncidentlevel',browserIncidentlevel);

	if (aiIncidentlevel === 'high' || browserIncidentlevel === 'high') {
		return 'high';
	} else if (aiIncidentlevel === 'medium' || browserIncidentlevel === 'medium') {
		return 'medium';
	} else {
		return 'low';
	}
};

export const findAIIncidentLevel = (aiEvents = [], settingLevel) => {
	let totalPoints = 0;
    
	for (const item of aiEvents) {
		const duration = item.end_at - item.start_at;
		let points = 0;

		// STRICT setting
		if (settingLevel === 'strict') {
			if (duration > 0) {
				points = 50; // Any duration > 0 gives 50 points
			}
			totalPoints += points;
			continue;
		}

		// MODERATE setting
		if (settingLevel === 'moderate') {
			switch (item.name) {
				case 'person_missing':
					if (duration >= 8) {
						points = 50;
					} else if (duration >= 3.5) {
						points = 25;
					} else if (duration >= 2) {
						points = 3;
					} else if (duration > 0) {
						points = 1;
					}
					break;

				case 'multiple_people':
					if (duration >= 8) {
						points = 50;
					} else if (duration >= 3.5) {
						points = 25;
					} else if (duration >= 2) {
						points = 5;
					} else if (duration > 0) {
						points = 1;
					}
					break;

				case 'object_detection':
					if (duration >= 5.5) {
						points = 50;
					} else if (duration >= 2) {
						points = 15;
					} else if (duration > 0) {
						points = 3;
					}
					break;
			}
		}
        
		// LENIENT setting (default)
		else {
			switch (item.name) {
				case 'person_missing':
					if (duration >= 16) {
						points = 50;
					} else if (duration >= 7) {
						points = 25;
					} else if (duration >= 4) {
						points = 3;
					} else if (duration > 0) {
						points = 1;
					}
					break;

				case 'multiple_people':
					if (duration >= 16) {
						points = 50;
					} else if (duration >= 7) {
						points = 25;
					} else if (duration >= 4) {
						points = 5;
					} else if (duration > 0) {
						points = 1;
					}
					break;

				case 'object_detection':
					if (duration >= 11) {
						points = 50;
					} else if (duration >= 4) {
						points = 15;
					} else if (duration > 0) {
						points = 3;
					}
					break;
			}
		}

		totalPoints += points;
	}

	console.log('Total AI Points:', totalPoints);
    
	if (totalPoints >= 50) {
		return 'high';
	} else if (totalPoints >= 24) {
		return 'medium';
	} else {
		return 'low';
	}
};

export const findBrowserIncidentLevel = (browserEvents = [], settingLevel) => {
	let totalPoints = 0;

	let copyPasteCutEvents = browserEvents.filter(item =>
		['candidate_paste_the_content', 'candidate_copy_the_content', 'copy_and_paste'].includes(item.name)
	);
	let browserResizedEvents = browserEvents.filter(item => item.name === 'candidate_resized_window');
	const awayEvents = browserEvents.filter(item => item.name === 'moved_back_to_page');
	const navigatingAway = browserEvents.filter(item =>
		['candidate_navigate_away_from_page', 'candidate_move_back_or_forward_from_the_page'].includes(item.name)
	);

	let copyPastePoints = 10;
	let resizePoints = 10;
	
	if (settingLevel === 'strict') {
		copyPastePoints = 50;
		resizePoints = 50;
	}
	
	navigatingAway.forEach(() => {
		totalPoints += 50;
	});

	copyPasteCutEvents.forEach(() => {
		totalPoints += copyPastePoints;
	});

	browserResizedEvents.forEach(() => {
		totalPoints += resizePoints;
	});

	awayEvents.forEach(event => {
		const duration = Number(event.end_at) - Number(event.start_at);

		if (settingLevel === 'strict') {
			if (duration > 0) {
				totalPoints += 50;
			}
		} else if (settingLevel === 'moderate') {
			const adjustedDuration = duration / 2;
			if (adjustedDuration <= 3) {
				totalPoints += 3;
			} else if (adjustedDuration <= 10) {
				totalPoints += 25;
			} else {
				totalPoints += 50;
			}
		} else {
			if (duration <= 3) {
				totalPoints += 3;
			} else if (duration <= 10) {
				totalPoints += 25;
			} else {
				totalPoints += 50;
			}
		}
	});

	console.log('Total Browser Points:', totalPoints, 'Setting Level:', settingLevel);

	if (settingLevel === 'moderate') {
		if (totalPoints >= 25) {
			return 'high';
		} else if (totalPoints >= 12.5) {
			return 'medium';
		}
		return 'low';
	} else {
		if (totalPoints >= 50) {
			return 'high';
		} else if (totalPoints >= 25) {
			return 'medium';
		}
		return 'low';
	}
};

export const checkForceClosureViolation = async () =>{
	const session = convertDataIntoParse('session');
	if (!session || !session.browserEvents) {
		return;
	}
	const { browserEvents, aiEvents, incident_level } = session;
	const secureFeatures = getSecureFeatures();

	const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
	let incidentLevel = findIncidentLevel(
		aiEvents,
		browserEvents, 
		secureFeatures
	);

	if((incidentLevel === 'high' || incidentLevel === 'medium') && incident_level !== 'high'){
		await addSectionSessionRecord(session,candidateInviteAssessmentSection);
		updatePersistData('session', { incident_level: incidentLevel });
	}
	if (
		incidentLevel === 'high' &&
		findConfigs(['force_closure'], secureFeatures?.entities || []).length > 0
	) {
		updatePersistData('session', {
			sessionStatus: 'Terminated',
		});
		window.mereos.forceClosureTriggered = true;
		forceClosure();
	}
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

export const registerEvent = async ({ eventName, eventValue = null, duration }) => {
	try {
		const session = convertDataIntoParse('session');
		if (!session || !session.browserEvents) return;

		const failedEvents = JSON.parse(localStorage.getItem('failedEvents') || '[]');
		if (failedEvents.length > 0 && navigator.onLine && !window.mereos.isRetryEvent) {
			retryFailedEvents();
		}

		const startTime = session?.quizStartTime !== 0 
			? Math.round((getTimeInSeconds({ isUTC: true }) - session?.quizStartTime) / 1000) 
			: 0;

		if (session?.id) {
			const event = {
				name: eventName,
				value: eventValue,
				session_id: session.id,
				start_at: startTime
			};

			if (duration !== null) {
				event.end_at = startTime + Number(duration);
			}

			updatePersistData('session', { browserEvents: [...session.browserEvents, event] });

			try {
				await createEvent(event);
			} catch (err) {
				sentryExceptioMessage(err,{type:'error',message:`API failed, storing event for retry`});
				logger.error('API failed, storing event for retry', err);
				const failedEvents = JSON.parse(localStorage.getItem('failedEvents') || '[]');
				localStorage.setItem('failedEvents', JSON.stringify([...failedEvents, event]));
			}
		}
	} catch (error) {
		sentryExceptioMessage(error,{type:'error',message:`Error in registerEvent`});
		logger.error('Error in registerEvent', error);
	}
};

export const retryFailedEvents = async () => {
	if (window.mereos.isRetryEvent) return;
	window.mereos.isRetryEvent = true;

	window.removeEventListener('online', retryFailedEvents);
	const failedEvents = JSON.parse(localStorage.getItem('failedEvents') || '[]');
	if (!failedEvents.length) {
		window.mereos.isRetryEvent = true;
		return;
	}

	try {
		await bulkRegisterEvents({ events: failedEvents });
		localStorage.removeItem('failedEvents');
	} catch (err) {
		logger.error('Retry failed for events', err);
		localStorage.setItem('failedEvents', JSON.stringify(failedEvents));
	} finally {
		window.mereos.isRetryEvent = true;
	}
};

window.addEventListener('online', retryFailedEvents);

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

	const isDarkMode = (schoolTheme?.mode === 'light' || !schoolTheme?.mode) ? false : true;

	const themeToStore = {
		...schoolTheme,
		theming: themeColor,
		font: fontStyle
	};

	localStorage.setItem('schoolTheme', JSON.stringify(themeToStore));

	document.documentElement.style.setProperty('--theme-color', themeColor);
	document.documentElement.style.setProperty('--theme-mode', isDarkMode ? '#000' : '#fff');
	document.documentElement.style.setProperty('--text-color', isDarkMode ? '#fff' : '#000');
	document.documentElement.style.setProperty('--font-style', fontStyle);
	document.documentElement.style.setProperty('--video-style', isDarkMode ? '#000' : '#e7ebef');
	document.documentElement.style.setProperty('--filter-color', isDarkMode ? 'invert(1)' : 'none');
};

export const loadZendeskWidget = () => {
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const hasChatBot = secureFeatures?.some(entity => entity.key === 'chat_bot');
	
	if (hasChatBot) {
		if (!document.querySelector('#ze-snippet')) {
			const script = document.createElement('script');
			script.src = 'https://static.zdassets.com/ekr/snippet.js?key=6542e7ef-41de-43ed-bc22-3d429a78ead3';
			script.async = true;
			script.id = 'ze-snippet';

			document.body.appendChild(script);
		}
		
		if (window.zE && typeof window.zE === 'function') {
			window.zE('messenger', 'show');
			
			window.zE('messenger:on', 'open', () => {
				setTimeout(() => {
					const allZendeskElements = document.querySelectorAll('iframe[id*="webWidget"], iframe[title*="Chat"], iframe[title*="Help"], iframe[title*="Zendesk"], div[data-testid*="widget"], div[data-testid*="chat"], div[data-testid*="messenger"], [id*="zendesk"], [class*="zendesk"], [class*="zEWidget"]');
					allZendeskElements.forEach(element => {
						element.style.setProperty('z-index', '2147483647', 'important');
						
						let parent = element.parentElement;
						while (parent && parent !== document.body) {
							parent.style.setProperty('z-index', '2147483647', 'important');
							parent = parent.parentElement;
						}
					});
				}, 100);
			});
			
			window.zE('messenger:on', 'close', () => {
				setTimeout(() => {
					const launcher = document.querySelector('#launcher');
					if (launcher) {
						launcher.style.setProperty('z-index', '2147483647', 'important');
					}
				}, 100);
			});
		}
	}
};

export const hideZendeskWidget =() => {
	if (window.zE && typeof window.zE === 'function') {
		try {
			window.zE('messenger', 'hide');
			window.zE('messenger', 'close');
		} catch (e) {
			logger.error('Error resetting the Zendesk widget:', e);
		}
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
			window.zE('messenger', 'close');

			delete window.zE;
			delete window.zESettings;
		} catch (e) {
			sentryExceptioMessage(e,{type:'error',message:`Error resetting the Zendesk widget`});
			logger.error('Error resetting the Zendesk widget:', e);
		}
	}
};

export const authenticatedRequest = async (apiCall, params = null) => {
	const mereosToken = getAuthenticationToken();
  
	if (!mereosToken) {
		stop_prechecks(()=>null);
		return {
			type: 'error',
			message: 'authentication_required',
			code: 40023,
			details: 'Valid authentication token required for this operation'
		};
	}
  
	const config = {
		headers: {
			token: mereosToken,
		}
	};
  
	if (params) {
		config.params = params;
	}
  
	return apiCall(config);
};

export const getAuthenticationToken = () => {
	const tokenData = localStorage.getItem('mereosToken');

	if (tokenData) {
		try {
			const { token, expiresAt } = JSON.parse(tokenData);
      
			if (Date.now() > expiresAt) {
				localStorage.removeItem('mereosToken');
				notifyTokenExpired();
				return null;
			}
      
			return token;
		} catch (error) {
			localStorage.removeItem('mereosToken');
			notifyTokenExpired();
			return null;
		}
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
					window.mereos.isScreenShare = false;
					registerEvent({notify: false, eventName: 'screen_shared_stopped', eventType: 'error'});
					if(window.mereos.startRecordingCallBack){
						window.mereos.startRecordingCallBack({ 
							type:'error',
							message: 'screen_share_stopped',
							code:40012
						});
					}
					openModal();
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
		
		// Merge updates into storedItem using spread operator
		const updatedItem = {
			...storedItem,
			...updates
		};

		localStorage.setItem(key, JSON.stringify(updatedItem));
	} else {
		logger.warn(`No item found in localStorage with key "${key}"`);
	}
};

export const addSectionSessionRecord = async (session) => {
	try {
		const { 
			aiEvents, 
			browserEvents 
		} = session;
		const secureFeatures = getSecureFeatures();
		
		let recordings = { data: [] };
		let hasRecordings = false;
		
		const allRecordings = [
			...session?.user_video_name || [],
			...session?.user_audio_name || [], 
			...session?.screen_sharing_video_name || [],
			...session?.mobileRecordings || [],
			...session?.mobileAudios || []
		];
		
		hasRecordings = allRecordings.length > 0;
		
		if (hasRecordings) {
			try {
				recordings = await getRecordingSid({'source_id': allRecordings});
				
				if (!recordings || !recordings.data) {
					throw new Error('Invalid response from recordings API');
				}
			} catch (recordingError) {
				sentryExceptioMessage(recordingError,{type:'error',message:`Failed to fetch recording SIDs`});
				logger.error('Failed to fetch recording SIDs:', recordingError);
				recordings = { data: [] };
				
				if (window.mereos?.globalCallback) {
					window.mereos.globalCallback({
						type: 'warning',
						message: 'recording_info_unavailable',
						code: 40019
					});
				}
			}
		}
		
		const filterRecordings = (sourceArray) => {
			if (!sourceArray || !sourceArray.length || !recordings.data || !recordings.data.length) {
				return [];
			}
			return recordings.data
				.filter(recording => 
					sourceArray.find(subrecording => subrecording === recording.source_sid)
				)
				.map(recording => recording.media_external_location);
		};
		
		let sectionSessionDetails = {
			start_time: session?.quizStartTime,
			submission_time: session?.submissionTime,
			duration_taken: session?.quizStartTime ? getTimeInSeconds({isUTC: true}) - session.quizStartTime : 0,
			identity_card: session?.identityCard,
			room_scan_video: session?.room_scan_video,
			identity_photo: session?.candidatePhoto,
			user_video_name: filterRecordings(session?.user_video_name),
			user_audio_name: filterRecordings(session?.user_audio_name),
			screen_sharing_video_name: filterRecordings(session?.screen_sharing_video_name),
			roomscan_recordings: session?.roomScanRecordings,
			session_id: session?.sessionId,
			archive_id: session?.room_id,
			location: session?.location,
			library_version: pkg.version,
			mobile_session_id: session?.mobileRoomSessionId,
			collected_details: {
				download_speed: session?.downloadSpeed,
				upload_speed: session?.uploadSpeed,
				cpu_info: session?.CPUSpeed,
				ram_info: session?.RAMSpeed
			},
			status: session?.sessionStatus,
			video_codec: recordings.data?.filter(recording => 
				session?.user_video_name?.find(subrecording => subrecording === recording.source_sid)
			)?.map(recording => recording.codec)[0] || null,
			video_extension: recordings.data?.filter(recording => 
				session?.user_video_name?.find(subrecording => subrecording === recording.source_sid)
			)?.map(recording => recording.container_format)[0] || null,
			incident_level: findIncidentLevel(
				aiEvents,
				browserEvents, 	
				secureFeatures
			),
			mobile_audio_name: filterRecordings(session?.mobileAudios),
			mobile_video_name: filterRecordings(session?.mobileRecordings),
			conversation_id: localStorage.getItem('conversationId') || '',
			candidate_assessment: session?.candidate_assessment,
			recording_fetch_status: hasRecordings ? 
				(recordings.data.length > 0 ? 'success' : 'failed') : 
				'not_required'
		};

		if (session?.id) {
			sectionSessionDetails['id'] = session?.id;
		}
		
		const resp = session?.id ? 
			await editSectionSession(sectionSessionDetails) : 
			await addSectionSession(sectionSessionDetails);
		
		return resp;
		
	} catch(err) {
		sentryExceptioMessage(err,{type:'error',message:`Error in addSectionSessionRecord`});
		logger.error('Error in addSectionSessionRecord:', err);
		
		if (err.response?.status === 403) {
			if (window.mereos?.globalCallback) {
				window.mereos.globalCallback({
					type: 'error', 
					message: 'error_saving_session_info',
					code: 40018 
				});
			}
		}
		
		if (window.mereos?.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({
				type: 'error', 
				message: 'error_saving_session_info', 
				code: 40018 
			});
		}
		
		throw err;
	}
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

export const registerAIEvent = async ({ eventName, startTime, endTime }) => {
	try {
		const session = convertDataIntoParse('session');
		if (!session || !session.aiEvents) return;

		const failedAIEvents = JSON.parse(localStorage.getItem('failedAIEvents') || '[]');
		if (failedAIEvents.length > 0 && navigator.onLine && !window.mereos.isRetryingAIEvent) {
			retryFailedAIEvents();
		}

		const secureFeatures = getSecureFeatures();
		const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
		const { aiEvents, browserEvents, incident_level } = session;

		const event = {
			name: eventName,
			start_at: startTime,
			end_at: endTime,
			value: eventName,
			created_at: getDateTime(),
			session_id: session?.id
		};

		const updatedEvents = [...aiEvents, event];
		updatePersistData('session', { aiEvents: updatedEvents });

		try {
			await createAiEvent(event);
		} catch (err) {
			logger.error('API failed, storing event for retry', err);
			const failedAIEvents = JSON.parse(localStorage.getItem('failedAIEvents') || '[]');
			localStorage.setItem('failedAIEvents', JSON.stringify([...failedAIEvents, event]));
		}

		let incidentLevel = findIncidentLevel(updatedEvents, browserEvents, secureFeatures);
		console.log('incidentLevel',incidentLevel);
		if ((incidentLevel === 'high' || incidentLevel === 'medium') && incident_level !== 'high') {
			await addSectionSessionRecord(session, candidateInviteAssessmentSection);
			updatePersistData('session', { incident_level: incidentLevel });
		}
	} catch (e) {
		sentryExceptioMessage(e,{type:'error',message:`Error in registerAIEvent`});
		logger.error('Error in registerAIEvent', e);
	}
};

export const retryFailedAIEvents = async () => {
	if (window.mereos.isRetryingAIEvent) return; 
	window.mereos.isRetryingAIEvent = true;

	const failedAIEvents = JSON.parse(localStorage.getItem('failedAIEvents') || '[]');
	if (!failedAIEvents.length) {
		window.mereos.isRetryingAIEvent = false;
		return;
	}

	try {
		await bulkRegisterAIEvents({ ai_events: failedAIEvents });
		localStorage.removeItem('failedAIEvents');
	} catch (err) {
		logger.error('Retry failed for AI events', err);
		localStorage.setItem('failedAIEvents', JSON.stringify(failedAIEvents));
	} finally {
		window.mereos.isRetryingAIEvent = false;
	}
};

window.addEventListener('online', retryFailedAIEvents);

export const lockBrowserFromContent = async (entities) => {
	let result = {};
	
	for (const entity of entities) {
		try {
			switch (entity.key) {
				case 'disable_right_click': {
					const disableRightClick = await preventRightClick();
					if (disableRightClick) {
						result = { ...result, [entity.name]: true };
					}
					break;
				}

				case 'disable_clipboard': {
					const copyPasteCutDisabled = await disableCopyPasteCut();
					if (copyPasteCutDisabled) {
						result = { ...result, [entity.name]: true };
					}
					break;
				}

				case 'disable_highlight_text': {
					const disableHightLight = await disableTextHighlighting();
					if (disableHightLight) {
						result = { ...result, [entity.name]: true };
					}
					break;
				}
				
				case 'disable_keyboard_shortcuts': {
					const disableShortcuts = await preventShortCuts();
					if (disableShortcuts) {
						result = { ...result, [entity.name]: true };
					}
					break;
				}

				case 'disable_printing': {
					const disablePrinting = await stopPrinting();
					if (disablePrinting) {
						result = { ...result, [entity.name]: true };
					}
					break;
				}

				case 'detect_unfocus': {
					const defocusDisabled = await detectUnfocusOfTab();
					if (defocusDisabled) {
						result = { ...result, [entity.name]: true };
					}
					break;
				}

				case 'detect_resizing_of_window': {
					const disableWindowResize = await detectWindowResize(null);
					if (disableWindowResize) {
						result = { ...result, [entity.name]: true };
					}
					break;
				}

				case 'verify_desktop': {
					const dualDisplay = await detectDualDisplay();
					if (dualDisplay) {
						result = { ...result, [entity.name]: true };
					}
					break;
				}

				// case 'force_full_screen': {
				// 	const fullScreen = await forceFullScreen();
				// 	if (fullScreen) {
				// 		result = { ...result, [entity.name]: true };
				// 	}
				// 	break;
				// }
				
				default:
					// Do nothing for unknown keys
					break;
			}
		} catch (error) {
			console.error(`Error processing entity ${entity.key}:`, error);
			result = { ...result, [entity.name]: false };
		}
	}

	return result;
};

// Store handler references outside so we can remove them later
let selectStartHandler;
let dragStartHandler;
let keyDownHandler;

export const disableTextHighlighting = () => {
	// Prevent duplicate injection
	if (document.getElementById('highligh-text-style')) return;

	const style = document.createElement('style');
	style.id = 'highligh-text-style';
	style.textContent = `
    body * {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    input,
    textarea,
    [contenteditable="true"],
    .lrn_texteditor_editable {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
  `;
	document.head.appendChild(style);

	const isEditableElement = (target) => {
		const element = target.nodeType === 3 ? target.parentElement : target;
		if (!element) return false;

		if (
			element.isContentEditable ||
      element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA'
		) {
			return true;
		}

		if (
			element.closest &&
      (element.closest('[contenteditable="true"]') ||
        element.closest('.lrn_texteditor_editable'))
		) {
			return true;
		}

		return false;
	};

	selectStartHandler = (e) => {
		if (!isEditableElement(e.target)) {
			e.preventDefault();
		}
	};

	dragStartHandler = (e) => {
		if (!isEditableElement(e.target)) {
			e.preventDefault();
		}
	};

	keyDownHandler = (e) => {
		if (e.key === 'F12' || (e.ctrlKey && (e.key === 'u' || e.key === 'U'))) {
			e.preventDefault();
		}
	};

	document.addEventListener('selectstart', selectStartHandler);
	document.addEventListener('dragstart', dragStartHandler);
	document.addEventListener('keydown', keyDownHandler);
};


export const enableTextHighlighting = () => {
	// Remove style
	const style = document.getElementById('highligh-text-style');
	if (style) {
		style.remove();
	}

	// Remove listeners safely
	if (selectStartHandler) {
		document.removeEventListener('selectstart', selectStartHandler);
		selectStartHandler = null;
	}

	if (dragStartHandler) {
		document.removeEventListener('dragstart', dragStartHandler);
		dragStartHandler = null;
	}

	if (keyDownHandler) {
		document.removeEventListener('keydown', keyDownHandler);
		keyDownHandler = null;
	}
};

//* ***************** DefaultEvent Callback *********************/
// One stable handler reference
const handleDefaultEvent = (e) => {
	e.preventDefault();
	e.stopPropagation();
};

export const preventRightClick = () => {
	if (typeof window === 'undefined') return false;

	window.mereos = window.mereos || {};

	if (!window.mereos.rightClickDisabled) {
		document.addEventListener('contextmenu', handleDefaultEvent);
		window.mereos.rightClickDisabled = true;
		window.mereos.rightClickHandler = handleDefaultEvent;
	}
	return true;
};

export const restoreRightClick = () => {
	if (typeof window === 'undefined') return false;

	const handler = window.mereos?.rightClickHandler;
	if (handler) {
		document.removeEventListener('contextmenu', handler);
	}

	if (window.mereos) {
		window.mereos.rightClickDisabled = false;
		delete window.mereos.rightClickHandler;
	}

	return true;
};

let copyPasteHandlers = {};
let originalClipboard = {};

export const disableCopyPasteCut = () => {
	return new Promise((resolve) => {
		let copyEventRegistered = false;

		const handler = (eventName) => (e) => {
			e.preventDefault();

			if (!copyEventRegistered) {
				const eventMap = {
					copy: 'candidate_copy_the_content',
					paste: 'candidate_paste_the_content',
					cut: 'candidate_cut_the_content',
				};

				registerEvent({
					notify: false,
					eventName: eventMap[eventName] || 'copy_paste_cut',
					eventType: 'error',
				});

				copyEventRegistered = true;
				setTimeout(() => (copyEventRegistered = false), 200);
			}

			checkForceClosureViolation();
		};

		['cut', 'copy', 'paste'].forEach((eventName) => {
			const fn = handler(eventName);
			copyPasteHandlers[eventName] = fn;
			document.addEventListener(eventName, fn, true);
		});

		const keydownHandler = (e) => {
			if (
				(e.ctrlKey || e.metaKey) &&
        ['c', 'v', 'x'].includes(e.key.toLowerCase())
			) {
				e.preventDefault();

				const eventName =
          e.key === 'v' ? 'candidate_paste_the_content' : e.key === 'c' ? 'candidate_copy_the_content' : 'candidate_cut_the_content';

				registerEvent({ notify: false, eventName, eventType: 'error' });

				checkForceClosureViolation();
			}
		};

		copyPasteHandlers.keydown = keydownHandler;
		document.addEventListener('keydown', keydownHandler, true);

		// Save original clipboard methods
		if (navigator.clipboard) {
			originalClipboard.writeText = navigator.clipboard.writeText;
			originalClipboard.readText = navigator.clipboard.readText;

			navigator.clipboard.writeText = () =>
				Promise.reject('Clipboard disabled');
			navigator.clipboard.readText = () =>
				Promise.reject('Clipboard disabled');
		}

		resolve(true);
	});
};

export const enableCopyPasteCut = () => {
	// Remove event listeners
	['cut', 'copy', 'paste'].forEach((eventName) => {
		if (copyPasteHandlers[eventName]) {
			document.removeEventListener(
				eventName,
				copyPasteHandlers[eventName],
				true
			);
		}
	});

	if (copyPasteHandlers.keydown) {
		document.removeEventListener(
			'keydown',
			copyPasteHandlers.keydown,
			true
		);
	}

	copyPasteHandlers = {};

	// Restore clipboard
	if (navigator.clipboard && originalClipboard.writeText) {
		navigator.clipboard.writeText = originalClipboard.writeText;
		navigator.clipboard.readText = originalClipboard.readText;
	}

	originalClipboard = {};
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

let awayStartTime = null;
let visibilityHandler;
let blurHandler;
let focusHandler;
let isChatOpen = false; // Add this flag

export const setChatOpenState = (open) => {
	isChatOpen = open;
};

export const detectUnfocusOfTab = () => {
	return new Promise((resolve) => {
		try {
			removeUnfocusListener();

			const startAway = () => {
				if (!awayStartTime && !isChatOpen) { // Check if chat is NOT open
					awayStartTime = Date.now();
					registerEvent({
						eventType: 'error',
						notify: true,
						eventName: 'moved_away_from_page',
						sentryError: false,
					});
					showToast('error','moved_away_from_page');
				}
			};

			const endAway = () => {
				if (!awayStartTime) return;

				const durationSec = Math.floor((Date.now() - awayStartTime) / 1000);
				awayStartTime = null;
				registerEvent({
					eventType: 'info',
					notify: false,
					eventName: 'moved_back_to_page',
					duration: durationSec, 
					sentryError: false,
				});
				checkForceClosureViolation();
			};

			visibilityHandler = () => {
				if (document.hidden && !isChatOpen) { // Check if chat is NOT open
					startAway();
				} else {
					endAway();
				}
			};

			blurHandler = () => {
				if (!isChatOpen) { // Only trigger if chat is NOT open
					startAway();
				}
			};

			focusHandler = endAway;

			document.addEventListener('visibilitychange', visibilityHandler);
			window.addEventListener('blur', blurHandler);
			window.addEventListener('focus', focusHandler);

			resolve(true);
		} catch (err) {
			sentryExceptioMessage(err);
			console.error('Error in detectUnfocusOfTab:', err);
			resolve(false);
		}
	});
};

export const removeUnfocusListener = () => {
	if (visibilityHandler) {
		document.removeEventListener('visibilitychange', visibilityHandler);
		window.removeEventListener('blur', blurHandler);
		window.removeEventListener('focus', focusHandler);
		visibilityHandler = blurHandler = focusHandler = null;
	}
	awayStartTime = null;
	isChatOpen = false; // Reset the flag
};

export const preventShortCuts = (allowedFunctionKeys = []) => {
	return new Promise((resolve) => {
		const blockedKeys = new Set([
			27,   // Escape
			91,   // Meta (Windows/Command key)
			44,   // Print Screen
			173,  // Volume Mute
			174,  // Volume Down
			175,  // Volume Up
			176,  // Next Track
			177,  // Previous Track
			178,  // Stop Media
			179,  // Play/Pause
			180,  // Mail
			181,  // Select Media
			182,  // Start Application 1
			183,  // Start Application 2
			145,  // Scroll Lock
			// Function keys (F1-F12)
			...Array.from({length: 12}, (_, i) => 112 + i)
		]);

		const isAlphabetKey = (key) => /^[a-zA-Z]$/.test(key);
		const isFunctionKey = (keyCode) => keyCode >= 112 && keyCode <= 123;
		const isNumericKey = (keyCode) => keyCode >= 48 && keyCode <= 57;

		const handleKeyDown = (event) => {
			const {key, keyCode, ctrlKey, metaKey, shiftKey, altKey} = event;

			if (ctrlKey || metaKey) {
				if (key.toLowerCase() === 'n' || key.toLowerCase() === 't') {
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					return;
				}

				if (isAlphabetKey(key) || 
            ['p', 's', 'o', 'u', 'i', 'w', 'f', 'tab'].includes(key.toLowerCase())) {
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					return;
				}
			}

			if ((ctrlKey || metaKey) && shiftKey && isAlphabetKey(key)) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return;
			}

			if (altKey && (isAlphabetKey(key) || isNumericKey(keyCode) || 
          ['tab', 'f4'].includes(key.toLowerCase()))) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return;
			}

			if (blockedKeys.has(keyCode)) {
				if (isFunctionKey(keyCode) && allowedFunctionKeys.includes(keyCode)) {
					return;
				}
        
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
			}
		};

		document.addEventListener('keydown', handleKeyDown, {capture: true, passive: false});
		window.addEventListener('keydown', handleKeyDown, {capture: true, passive: false});

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

// ************* Detect Page Refresh ***************** //
export const detectPageRefreshCallback = (e) => {
	if(!localStorage.getItem('mereosToken')){
		return;
	}

	if (window.mereos?.socket?.readyState === WebSocket.OPEN) {
		window.mereos.socket?.send(JSON.stringify({ event: 'resetSession' }));
	}

	const getPreChecksSteps = convertDataIntoParse('preChecksSteps');
	if(getPreChecksSteps){
		updatePersistData('preChecksSteps', { 
			mobileConnection: false,
			screenSharing: false
		});
	}

	if (window.mereos.startRecordingCallBack) {
		window.mereos.startRecordingCallBack({ 
			type: 'error',
			message: 'candidate_clicked_on_refresh_button',
			code: 40026
		});
	}

	registerEvent({ 
		eventType: 'error', 
		notify: false, 
		eventName: 'candidate_clicked_on_refresh_button',
		eventValue: getDateTime() 
	});
	const secureFeatures = getSecureFeatures();
	if (findConfigs(['force_closure'], secureFeatures?.entities || []).length) {
		checkForceClosureViolation();
	}
	
	e.preventDefault();
	e.returnValue = '';
};

export const detectPageRefresh = () => {
	window.addEventListener('beforeunload', detectPageRefreshCallback);
};

// ************* Detect Back Button ***************** //
export const detectBackButtonCallback = () => {
	if (window.mereos.startRecordingCallBack) {
		window.mereos.startRecordingCallBack({
			type: 'error',
			message: 'candidate_clicked_on_browser_back_button' ,
			code: 40005
		});
		window.mereos.recordingStart = false;
		if (window.mereos?.socket?.readyState === WebSocket.OPEN) {
			window.mereos.socket?.send(JSON.stringify({ event: 'resetSession' }));
		}
	}
};

export const detectBackButton = () => {
	window.addEventListener('popstate', detectBackButtonCallback);
};

//* ***************** Unlock browser from Events */
export const unlockBrowserFromContent = () => {
	window.removeEventListener('beforeunload', detectPageRefreshCallback);
	window.removeEventListener('popstate', detectBackButtonCallback);
	document.removeEventListener('selectstart', e => e.preventDefault());
	document.removeEventListener('dragstart', e => e.preventDefault());
	document.removeEventListener('contextmenu', e => e.preventDefault());

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
	const currentIndex = navHistory.indexOf(currentRoute);

	if (currentIndex > 0) {
		const previousRoute = navHistory[currentIndex - 1];

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

		const requiredFeature = featureMap[previousRoute];

		if (!requiredFeature || hasFeature(requiredFeature)) {
			return previousRoute;
		}
	}

	return null;
};

export const handlePreChecksRedirection = () => {
	const sessionSetting = localStorage.getItem('precheckSetting');
	const preChecksStep = convertDataIntoParse('preChecksSteps');
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const navHistory = localStorage.getItem('navHistory');
	const hasFeature = (featureName) => secureFeatures.some(feature => feature.key === featureName);

	if(sessionSetting === 'session_resume'){
		if (!preChecksStep?.examPreparation && secureFeatures?.filter(entity => examPreparationSteps.includes(entity.key))?.length) {
			return 'ExamPreparation';
		}if (!preChecksStep?.identityConfirmation && hasFeature('verify_id')) {
			return 'IdentityCardRequirement';
		} else if(!preChecksStep?.diagnosticStep && secureFeatures?.filter(entity => systemDiagnosticSteps.includes(entity.key))?.length){
			return 'runSystemDiagnostics';
		} else if(!preChecksStep?.requirementStep && secureFeatures?.filter(entity => SYSTEM_REQUIREMENT_STEP.includes(entity.key))?.length){
			return 'SystemRequirements';
		} else if(!preChecksStep?.browserSecurity && secureFeatures?.filter(entity => BROWSER_SECURTIY_STEP.includes(entity.key))?.length){
			return 'BrowserSecurity';
		}	else if(!preChecksStep?.preValidation && hasFeature('verify_multiple_devices')){
			return 'Prevalidationinstruction';
		}
		else if(!preChecksStep?.userPhoto && hasFeature('verify_candidate')){
			return 'IdentityVerificationScreenOne';
		}else if(!preChecksStep?.identityCardPhoto && hasFeature('verify_id')){
			return 'IdentityVerificationScreenTwo';
		}else if(!preChecksStep?.audioDetection && hasFeature('record_audio')){
			return 'IdentityVerificationScreenThree';
		}else if(!preChecksStep?.roomScanningVideo && hasFeature('record_room')){
			return 'IdentityVerificationScreenFour';
		}else if(!preChecksStep?.mobileConnection && hasFeature('mobile_proctoring') || !window.mereos?.mobileStream){
			return 'MobileProctoring';
		}else if(!preChecksStep?.screenSharing || hasFeature('record_screen')){
			return 'IdentityVerificationScreenFive';
		} else{
			closeModal();
		}
	}else{
		if ((window.mereos.precheckCompleted && hasFeature('record_screen')) || navHistory?.includes('IdentityVerificationScreenFive')) {
			return 'IdentityVerificationScreenFive';
		}else{
			localStorage.setItem('preChecksSteps', JSON.stringify(preChecksSteps));
			return 'ExamPreparation';
		}
	}
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
		portugese:'pt',
		welsh:'cy'
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

export const initializeI18next = () => {
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

export const loadNotyfJS = () => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = 'https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css';
	link.type = 'text/css';
	document.head.appendChild(link);
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
			const speedBps = (bitsLoaded / duration).toFixed(2);
			const speedKbps = (speedBps / 1024).toFixed(2);
			const speedMbps = (speedKbps / 1024).toFixed(2);

			return { 	
				speedBps,
				speedKbps,
				speedMbps 
			};
		}
        
	} catch (err) {
		sentryExceptioMessage(err);
		console.error(err);
		return false;
	}
};

export const checkPermissionStatus = async () => {
	const results = {};

	if (navigator.permissions) {
		try {
			const camStatus = await navigator.permissions.query({ name: 'camera' });
			const micStatus = await navigator.permissions.query({ name: 'microphone' });
			results.camera = camStatus.state; // 'granted' | 'denied' | 'prompt'
			results.microphone = micStatus.state;
		} catch (err) {
			console.warn('Permission check failed', err);
		}
	}

	return results;
};

export const handleBackendError = (t, error) => {
	let message = '';

	if (!error) {
		message = t('something_went_wrong_please_try_again_later');
	} 
	else if (typeof error === 'string') {
		const translated = t(error);
		message = translated !== error ? translated : error;
	} 
	else if (typeof error === 'object') {
		if (error && typeof error === 'string') {
			const translated = t(error);
			message = translated !== error ? translated : error;
		} 
		else if (typeof error === 'object') {
			const firstKey = Object.keys(error)[0];
			const firstMsgArray = error[firstKey];

			if (Array.isArray(firstMsgArray) && firstMsgArray.length > 0) {
				message = firstMsgArray[0];
			} else {
				message = t('something_went_wrong_please_try_again_later');
			}
		}
	}

	return { type: 'error', message };
};

export const detectBrowser = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	let browserInfo = { browser: 'Unknown', version: null };

	if (/opr|opera/.test(userAgent)) {
		browserInfo.browser = 'Opera';
		browserInfo.version = userAgent.match(/(?:opr|opera)[/\s](\d+)/)?.[1] || null;
	} else if (/edg/.test(userAgent)) {
		browserInfo.browser = 'Edge';
		browserInfo.version = userAgent.match(/edg\/(\d+)/)?.[1] || null;
	} else if (/firefox/.test(userAgent)) {
		browserInfo.browser = 'Firefox';
		browserInfo.version = userAgent.match(/firefox\/(\d+)/)?.[1] || null;
	} else if (/ucbrowser/.test(userAgent)) {
		browserInfo.browser = 'UC Browser';
		browserInfo.version = userAgent.match(/ucbrowser\/(\d+)/)?.[1] || null;
	} else if (/safari/.test(userAgent) && !/chrome/.test(userAgent) && !/edg/.test(userAgent)) {
		browserInfo.browser = 'Safari';
		browserInfo.version = userAgent.match(/version\/(\d+)/)?.[1] || null;
	} else if (/chrome/.test(userAgent) && !/edg/.test(userAgent) && !/opr/.test(userAgent)) {
		browserInfo.browser = 'Chrome';
		browserInfo.version = userAgent.match(/chrome\/(\d+)/)?.[1] || null;

		if (navigator.userAgentData?.brands) {
			const isBrave = navigator.userAgentData.brands.some((brand) =>
				brand.brand.toLowerCase().includes('brave')
			);
			if (isBrave) {
				browserInfo.browser = 'Brave';
			}
		}
	}

	return browserInfo;
};

export const isMobileDevice = () => {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
	return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
		? 'mobile'
		: 'desktop';
};


export const getTrackDeviceId = (track) => {
	const mst = track?.mediaStreamTrack;
	if (!mst) return null;

	const settings = typeof mst.getSettings === 'function' ? mst.getSettings() : {};
	if (settings?.deviceId) return settings.deviceId;

	const constraints = typeof mst.getConstraints === 'function' ? mst.getConstraints() : {};
	const dev = constraints?.deviceId;
	if (typeof dev === 'string') return dev;
	if (dev && typeof dev === 'object' && dev.exact) return dev.exact;

	return null;
};

export const enumerateByKind = async () => {
	const devs = await navigator.mediaDevices.enumerateDevices();
	return {
		audioinput: devs.filter(d => d.kind === 'audioinput'),
		videoinput: devs.filter(d => d.kind === 'videoinput'),
	};
};

export const isDevicePresent = async (kind, deviceId) => {
	const byKind = await enumerateByKind();
	const list = kind === 'audio' ? byKind.audioinput : byKind.videoinput;
	if (!deviceId) return list.length > 0; 
	return list.some(d => d.deviceId === deviceId);
};

export const probeExactDevice = async (kind, deviceId) => {
	const constraints =
    kind === 'video' ? { video: deviceId ? { deviceId: { exact: deviceId } } : true } : { audio: deviceId ? { deviceId: { exact: deviceId } } : true };

	const stream = await navigator.mediaDevices.getUserMedia(constraints);
	const track = stream.getTracks()[0];

	if (!track || track.readyState === 'ended') {
		stream.getTracks().forEach(t => t.stop());
		throw new Error('DeviceUnavailable');
	}

	stream.getTracks().forEach(t => t.stop());
	return true;
};

export const findLastVisitedRoute = (currentRoute) => {
	let navHistory = JSON.parse(localStorage.getItem('navHistory'));
	const currentIndex = navHistory.indexOf(currentRoute);
	const previousPage = currentIndex > 0 ? navHistory[currentIndex - 1] : null;
	return previousPage;
};

const routeToPrecheckKey = {
	ExamPreparation: 'examPreparation',
	runSystemDiagnostics: 'diagnosticStep',
	SystemRequirements: 'requirementStep',
	BrowserSecurity:'browserSecurity',
	Prevalidationinstruction: 'preValidation',

	IdentityVerificationScreenOne: 'userPhoto',
	IdentityVerificationScreenTwo: 'identityCardPhoto',
	IdentityVerificationScreenThree: 'audioDetection',
	IdentityVerificationScreenFour: 'roomScanningVideo',
	IdentityVerificationScreenFive: 'screenSharing',
	IdentityVerificationScreenSix: 'mobileConnection',
};

export const findPreviousPrecheckStep = (currentRoute) => {
	const navHistory = JSON.parse(localStorage.getItem('navHistory')) || [];
	const currentIndex = navHistory.indexOf(currentRoute);

	if (currentIndex <= 0) return null;

	const previousRoute = navHistory[currentIndex - 1];
	return routeToPrecheckKey[previousRoute] || null;
};


const stepToVideoId = {
	ExamPreparation: 'Auo67aH9cEo',
	runSystemDiagnostics: 'aUMnLA_HvVw',
	SystemRequirements: 'PcDT3YfaLaA',
	
	IdentityVerificationScreenOne: '7zYeVZv1ZtQ',
	IdentityVerificationScreenTwo: 'RbgXRpUnZaM',
	IdentityVerificationScreenThree: 'NBHQa8y--Mg',
	IdentityVerificationScreenFive: 'b0avjfaAMjc',
};

export const getVideoIdForStep = (step) => {
	return stepToVideoId[step] || null;
};

export const getCurrentStep = () => {
	const navHistory = JSON.parse(localStorage.getItem('navHistory')) || [];
	return navHistory[navHistory.length - 1] || null;
};

export const hasHelpVideo = () => {
	const currentStep = getCurrentStep();
	return !!stepToVideoId[currentStep];
};

export const detectBrowserActions = () => {
	const navEntry = performance.getEntriesByType('navigation')[0];
	const navType = navEntry?.type;

	if (navType === 'back_forward') {
		registerEvent({
			eventType: 'error',
			notify: false,
			eventName: 'candidate_move_back_or_forward_from_the_page',
			eventValue: getDateTime()
		});

		const secureFeatures = getSecureFeatures();
		if (findConfigs(['force_closure'], secureFeatures?.entities || []).length) {
			checkForceClosureViolation();
		}
	}
	else if (navType === 'navigate') {
		registerEvent({
			eventType: 'error',
			notify: false,
			eventName: 'candidate_navigate_away_from_page',
			eventValue: getDateTime()
		});

		const secureFeatures = getSecureFeatures();
		if (findConfigs(['force_closure'], secureFeatures?.entities || []).length) {
			forceClosure();
		}
	}
};
