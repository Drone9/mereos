import {
	addSectionSessionRecord,
	checkForceClosureViolation,
	cleanupZendeskWidget,
	convertDataIntoParse,
	detectBackButton,
	detectBackButtonCallback,
	detectPageRefresh,
	enableCopyPasteCut,
	enableTextHighlighting,
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
	releaseAllMediaStreams,
	registerAcquiredMediaStream,
	registerManagedLocalTrack,
	registerTwilioRoom,
	restoreRightClick,
	sentryExceptioMessage,
	showToast,
	stopMediaStreamTracks,
	stopRoomMediaAndDisconnect,
	stopUnusedMediaStreamTracks,
	unlockBrowserFromContent,
	updatePersistData,
	updateThemeColor
} from '../utils/functions';
import * as TwilioVideo from 'twilio-video';
import i18next from 'i18next';
import { v4 } from 'uuid';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { getCreateRoom } from '../services/twilio.services';
import { aiEventsFeatures, ASSET_URL, LockDownOptions, recordingEvents } from '../utils/constant';
import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';
import { initializeLiveChat, initShadowDOM, openModal } from '../ExamsPrechecks';
import { cleanupForceFullscreen, initializeForceFullscreen } from '../utils/fullscreen';
import { permissionModalStyle } from '../utils/styles';

let aiEvents = [];
const trackStoppedListeners = new WeakMap();
const deviceChangeHandlers = new WeakMap();
let isMediaError = false;
let isSignalingError = false;
let isPauseResumeBusy = false;

const resolvePermissionType = (trackType, kind) => {
	if (trackType === 'microphone' || kind === 'audio') return 'microphone';
	return 'camera';
};

/*
 * Draws either the live camera frame or a static "Recording Paused" placeholder into the
 * publish canvas, so the Twilio recording stays continuous (no track republish/gap) while
 * clearly showing the paused interval instead of silently keeping the camera live.
 */
const drawPausedFrame = (ctx, videoEl, width, height, isPaused, label) => {
	if (isPaused) {
		const iconSize = Math.round(height * 0.14);
		const textSize = Math.round(height * 0.07);

		ctx.fillStyle = '#1a1a1a';
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = `bold ${iconSize}px sans-serif`;
		ctx.fillText('❚❚', width / 2, height / 2 - iconSize * 0.7);
		ctx.font = `${textSize}px sans-serif`;
		ctx.fillText(label, width / 2, height / 2 + textSize);
	} else {
		ctx.drawImage(videoEl, 0, 0, width, height);
	}
};

const buildIndependentMediaConstraints = (kind) => {
	if (kind === 'video') {
		return {
			video: localStorage.getItem('deviceId')
				? { deviceId: { exact: localStorage.getItem('deviceId') } }
				: true,
			audio: false,
		};
	}

	return {
		audio: localStorage.getItem('microphoneID')
			? { deviceId: { exact: localStorage.getItem('microphoneID') } }
			: true,
		video: false,
	};
};

const acquireIndependentMediaStream = async (kind) => {
	const constraints = buildIndependentMediaConstraints(kind);

	try {
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		registerAcquiredMediaStream(stream);
		return stream;
	} catch (error) {
		if (error.name === 'OverconstrainedError') {
			const fallback = kind === 'video'
				? { video: true, audio: false }
				: { audio: true, video: false };
			const stream = await navigator.mediaDevices.getUserMedia(fallback);
			registerAcquiredMediaStream(stream);
			return stream;
		}
		throw error;
	}
};

/*
 * Notifies the LMS callback stored by start_session. Used at every success/error exit
 * in this module so the integrator always receives a final result.
 */
const invokeStartSessionCallback = (payload) => {
	if (payload?.type === 'success' && payload?.message === 'recording_started_successfully') {
		window.mereos.sessionActive = true;
	}
	if (typeof window.mereos?.startRecordingCallBack === 'function') {
		window.mereos.startRecordingCallBack(payload);
	}
};

const abortFailedSessionStart = async (error) => {
	logger.error('Aborting session start after candidate_session API failure:', error);

	window.mereos.isStoppingSession = true;
	window.mereos.isReleasingMedia = true;

	cleanupSessionMediaMonitoring();
	cleanupLocalVideo();

	const room = window.mereos?.roomInstance;
	if (room) {
		try {
			await stopRoomMediaAndDisconnect(room);
		} catch (disconnectError) {
			logger.error('Failed to disconnect room after session start failure:', disconnectError);
		}
		window.mereos.roomInstance = null;
	}

	const secureFeatures = getSecureFeatures();
	if (secureFeatures?.entities?.filter((entity) => LockDownOptions.includes(entity.key))?.length) {
		unlockBrowserFromContent();
	}
	cleanupForceFullscreen();

	await releaseAllMediaStreams({ force: true });

	window.mereos.recordingStart = false;
	window.mereos.sessionActive = false;
	window.mereos.pendingSessionStart = false;

	updatePersistData('session', { sessionStatus: 'Terminated' });

	window.mereos.isReleasingMedia = false;
	window.mereos.isStoppingSession = false;

	showToast('error', 'something_went_wrong_please_contact_support');
	invokeStartSessionCallback({
		type: 'error',
		message: 'error_saving_session_info',
		code: 40018,
		details: error,
	});
};

const finalizeSuccessfulSessionStart = async (session) => {
	registerEvent({
		eventType: 'success',
		notify: false,
		eventName: 'recording_started_successfully',
	});

	const dateTime = new Date();
	if (!session?.browserEvents?.filter((item) => item.name === 'session_started')?.length) {
		registerEvent({ eventType: 'success', notify: false, eventName: 'session_started', startAt: dateTime });
	}

	window.mereos.recordingStart = true;
	invokeStartSessionCallback({
		type: 'success',
		message: 'recording_started_successfully',
		code: 50000,
	});
};

/*
 * Waits for Twilio to publish a local video track (natural event-based wait, no timeout).
 * Rejects immediately if the room has no participant — avoids a promise that never settles.
 */
const waitForParticipantVideoTracks = (room) => {
	return new Promise((resolve, reject) => {
		const localParticipant = room?.localParticipant;
		const videoTracks = localParticipant?.videoTracks;

		if (!localParticipant || !videoTracks) {
			reject(new Error('Twilio room has no local participant video tracks'));
			return;
		}

		if (videoTracks.size > 0) {
			resolve();
			return;
		}

		const onTrackPublished = () => {
			if (videoTracks.size > 0) {
				localParticipant.off('trackPublished', onTrackPublished);
				localParticipant.off('trackPublicationFailed', onTrackPublicationFailed);
				resolve();
			}
		};

		const onTrackPublicationFailed = (error, publication) => {
			if (!publication || publication.kind === 'video') {
				localParticipant.off('trackPublished', onTrackPublished);
				localParticipant.off('trackPublicationFailed', onTrackPublicationFailed);
				reject(error || new Error('Camera video track was not published'));
			}
		};

		localParticipant.on('trackPublished', onTrackPublished);
		localParticipant.on('trackPublicationFailed', onTrackPublicationFailed);
	});
};

/*
 * Determines whether camera or microphone permission caused a start/reconnect failure.
 * Twilio/browser errors are often generic, so we fall back to Permissions API + getUserMedia probes.
 */
const resolveStartPermissionType = async (error = null, hint = null) => {
	const secureFeatures = getSecureFeatures();
	const hasVideo = findConfigs(['record_video'], secureFeatures?.entities).length > 0;
	const hasAudio = findConfigs(['record_audio'], secureFeatures?.entities).length > 0;
	const errorText = `${error?.message || ''} ${error?.name || ''} ${error?.constraint || ''}`.toLowerCase();

	if (/audio|microphone/.test(errorText)) return 'microphone';
	if (/video|camera/.test(errorText)) return 'camera';

	const isMediaPermissionDenied = async (kind) => {
		const permissionName = kind === 'audio' ? 'microphone' : 'camera';

		try {
			const status = await navigator.permissions.query({ name: permissionName });
			if (status.state === 'denied') return true;
			if (status.state === 'granted') return false;
		} catch { /* Permissions API may be unavailable */ }

		try {
			const constraints = kind === 'audio'
				? {
					audio: localStorage.getItem('microphoneID')
						? { deviceId: { exact: localStorage.getItem('microphoneID') } }
						: true,
					video: false,
				}
				: {
					video: localStorage.getItem('deviceId')
						? { deviceId: { exact: localStorage.getItem('deviceId') } }
						: true,
					audio: false,
				};
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			stream.getTracks().forEach((track) => track.stop());
			return false;
		} catch (probeError) {
			return probeError?.name === 'NotAllowedError' || probeError?.name === 'PermissionDeniedError';
		}
	};

	if (hasAudio && await isMediaPermissionDenied('audio')) return 'microphone';
	if (hasVideo && await isMediaPermissionDenied('video')) return 'camera';

	if (hint === 'microphone' || hint === 'camera') return hint;
	if (hasAudio && !hasVideo) return 'microphone';
	if (hasVideo && !hasAudio) return 'camera';
	return 'camera';
};

const unpublishDisturbedTracks = async (permissionType) => {
	const room = window.mereos?.roomInstance;
	if (!room) return;
	await cleanupCameraTracks(room, permissionType === 'microphone' ? 'audio' : 'video');
};

const showMediaPermissionError = async (permissionType, duringSession = false) => {
	if (!i18next.isInitialized) {
		initializeI18next();
	}
	if (!document.getElementById('mereos-library') && !window.mereos?.shadowRoot) {
		initShadowDOM();
		updateThemeColor();
	}

	if (duringSession) {
		await unpublishDisturbedTracks(permissionType);
		if (permissionType === 'camera') {
			cleanupLocalVideo();
		}
		updatePersistData('session', { sessionStatus: 'Attending' });
		window.mereos.recordingStart = true;
	} else {
		detachAllTrackStoppedListeners();
		await unpublishDisturbedTracks(permissionType);

		const room = window.mereos?.roomInstance;
		const hasPublishedVideo = Array.from(room?.localParticipant?.videoTracks?.values() || [])
			.some(({ track }) => track && !track.name?.includes('screen-share'));
		const micOnlyFailureWithVideo = permissionType === 'microphone' && hasPublishedVideo;

		if (permissionType === 'camera') {
			cleanupLocalVideo();
		}
		hidePermissionModal();

		if (!micOnlyFailureWithVideo) {
			if (room) {
				await stopRoomMediaAndDisconnect(room);
				window.mereos.roomInstance = null;
			}
			await releaseAllMediaStreams();
			window.mereos.pendingSessionStart = false;
		} else {
			window.mereos.pendingSessionStart = true;
		}

		window.mereos.recordingStart = false;
		window.mereos.sessionActive = false;
	}

	showToast('error', permissionType === 'camera' ? 'enable_camera_permissions' : 'enable_microphone_permissions');
	showPermissionModal(permissionType);
	invokeStartSessionCallback({
		type: 'error',
		message: permissionType === 'camera' ? 'camera_permission_denied' : 'microphone_permission_denied',
		code: 40019,
	});
};

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
		if (twilioRoom) {
			VideoChat(twilioRoom);
		}
	}).catch((error) => {
		logger.error('Mobile reconnection failed:', error);
		registerEvent({ eventType: 'success', notify: false, eventName: 'mobile_connection_failed', eventValue: error });
		sentryExceptioMessage(error, { type: 'error', message: 'Mobile connection failed' });
		if (window.mereos.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({
				type: 'error',
				message: 'mobile_connection_failed',
				code: 40016
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
		if (window.mereos.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({
				type: 'error',
				message: 'mobile_connection_disconnected',
				code: 40008
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
				if (eventData?.message?.message === 'Violation') {
					updatePersistData('preChecksSteps', {
						mobileConnection: false,
						screenSharing: false
					});
					showToast('error', 'mobile_phone_disconnected');
					const moileElement = document.getElementById('remote-video');
					if (moileElement) {
						moileElement.remove();
					}
					if (window.mereos.mobileRoomInstance) {
						window.mereos.mobileRoomInstance.removeAllListeners();
						window.mereos.mobileRoomInstance.disconnect();
						window.mereos.mobileRoomInstance = null;
					}
					window.mereos.mobileProctoring = true;
					if (window.mereos.startRecordingCallBack) {
						window.mereos.startRecordingCallBack({
							type: 'error',
							message: 'mobile_phone_disconnected',
							code: 40010
						});
					}
					openModal();
				}
				registerEvent({ eventType: 'error', notify: false, eventName: 'mobile_phone_disconnected', eventValue: getDateTime() });
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

const cleanupCameraTracks = async (room, trackKind) => {
	const existingTracks = Array.from(
		trackKind === 'video'
			? room.localParticipant.videoTracks.values()
			: room.localParticipant.audioTracks.values()
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
				removeStoppedListener(trackPublication.track);
			}

			try {
				await room.localParticipant.unpublishTrack(trackPublication.track);
				trackPublication.track.stop();
				const mediaStreamTrack = trackPublication.track.mediaStreamTrack;
				if (trackKind === 'audio' && mediaStreamTrack === window.mereos?.sessionAudioMediaTrack) {
					window.mereos.sessionAudioMediaTrack = null;
					window.mereos.sessionTwilioAudioTrack = null;
					window.mereos.sessionAudioStream = null;
				}
				if (trackKind === 'video' && mediaStreamTrack === window.mereos?.sessionVideoMediaTrack) {
					window.mereos.sessionVideoMediaTrack = null;
					window.mereos.sessionTwilioVideoTrack = null;
					window.mereos.sessionVideoStream = null;
				}
			} catch (error) {
				console.error('Error cleaning up camera track:', error);
			}
		}
	}
};

// ============= MODAL FUNCTIONS =============

export const showPermissionModal = (permissionType = 'camera') => {
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
	modalDiv.setAttribute('data-permission-type', permissionType);

	// Set content based on permission type
	const modalTitle = permissionType === 'camera'
		? i18next.t('camera_access_lost')
		: i18next.t('microphone_access_lost');

	const modalDescription = permissionType === 'camera'
		? i18next.t('your_camera_access_has_been_disabled_during_the_session')
		: i18next.t('your_microphone_access_has_been_disabled_during_the_session');

	const step1Text = permissionType === 'camera'
		? i18next.t('click_the_camera_icon')
		: i18next.t('click_the_microphone_icon');

	const step2Text = permissionType === 'camera'
		? i18next.t('select_allow_for_camera_access')
		: i18next.t('select_allow_for_microphone_access');

	const buttonText = permissionType === 'camera'
		? i18next.t('reconnect_camera')
		: i18next.t('reconnect_microphone');

	const alternativeMethodTitle = permissionType === 'camera'
		? i18next.t('alternative_method')
		: i18next.t('alternative_method_microphone');

	// Browser instructions based on permission type
	const chromeInstructions = permissionType === 'camera'
		? i18next.t('settings_camera_steps')
		: i18next.t('settings_microphone_steps');

	const firefoxInstructions = permissionType === 'camera'
		? i18next.t('firefox_camera_steps')
		: i18next.t('firefox_microphone_steps');

	const safariInstructions = permissionType === 'camera'
		? i18next.t('safari_camera_step')
		: i18next.t('safari_microphone_step');

	modalDiv.innerHTML = `
        <div class="permission-modal">
            <div class="permission-modal-header">
                <h3>${modalTitle}</h3>
            </div>
            <div class="permission-modal-body">
                <div class="permission-instructions">
                    <p>${modalDescription}</p>
                    <ol>
                        <li>${step1Text}</li>
                        <li>${step2Text}</li>
                        <li>${permissionType === 'camera' ? i18next.t('click_reconnect_camera') : i18next.t('click_reconnect_microphone')}</li>
                    </ol>
                    
                    <div class="browser-instructions">
                        <h4>${alternativeMethodTitle}</h4>
                        <ul>
                            <li><strong>${i18next.t('chrome_edge')}</strong> ${chromeInstructions}</li>
                            <li><strong>${i18next.t('firefox')}</strong> ${firefoxInstructions}</li>
                            <li><strong>${i18next.t('safari')}</strong> ${safariInstructions}</li>
                        </ul>
                    </div>
                    
                    <div class="permission-modal-buttons">
                        <button class="orange-filled-btn" type="button" id="reconnectBtn">
                            ${buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

	try {
		container.appendChild(modalDiv);
	} catch (error) {
		document.body.appendChild(modalDiv);
	}

	document.body.style.overflow = 'hidden';
	window.mereos.activePermissionModalType = permissionType;

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
	window.mereos.activePermissionModalType = null;
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

	modal.addEventListener('click', function (e) {
		if (e.target === modal) {
			hidePermissionModal();
		}
	});
};

const refreshSessionAudioPins = () => {
	const room = window.mereos?.roomInstance;
	if (!room?.localParticipant) return;

	for (const { track } of room.localParticipant.audioTracks.values()) {
		if (!track || track.name?.includes('screen-share')) continue;

		window.mereos.sessionTwilioAudioTrack = track;
		if (track.mediaStreamTrack) {
			window.mereos.sessionAudioMediaTrack = track.mediaStreamTrack;
			window.mereos.sessionAudioStream = new MediaStream([track.mediaStreamTrack]);
			registerAcquiredMediaStream(window.mereos.sessionAudioStream);
		}
		return;
	}
};

// ============= DEVICE HANDLING FUNCTIONS =============

const handleDeviceLost = async (kind, isUserDisabled = false, track, trackType) => {
	if (track?.name?.includes('screen-share')) return;
	if (window.mereos?.isReleasingMedia) return;

	const permissionType = resolvePermissionType(trackType, kind);
	if (!window.mereos.lostPermissionTypes) {
		window.mereos.lostPermissionTypes = new Set();
	}
	if (window.mereos.lostPermissionTypes.has(permissionType)) {
		return;
	}
	window.mereos.lostPermissionTypes.add(permissionType);

	const isVideo = permissionType === 'camera';
	const container = window.mereos?.shadowRoot || document;
	const session = convertDataIntoParse('session');

	try {
		await unpublishDisturbedTracks(permissionType);

		if (isVideo) {
			if (window.mereos.aiProcessingInterval) {
				clearInterval(window.mereos.aiProcessingInterval);
				window.mereos.aiProcessingInterval = null;
			}
			if (window.mereos.aiProcessingVideo) {
				window.mereos.aiProcessingVideo.pause?.();
				stopMediaStreamTracks(window.mereos.aiProcessingVideo.srcObject?.getTracks?.() || []);
				window.mereos.aiProcessingVideo.srcObject = null;
				window.mereos.aiProcessingVideo = null;
			}
			window.mereos.sessionVideoMediaTrack = null;
			window.mereos.sessionTwilioVideoTrack = null;
			window.mereos.sessionVideoStream = null;

			if (window.mereos.pauseCanvasState) {
				window.mereos.pauseCanvasState.cleanup?.();
				window.mereos.pauseCanvasState = null;
			}

			const userRemoteVideo = container.querySelector('#webcam-container');
			if (userRemoteVideo) {
				userRemoteVideo.style.display = 'none';
				userRemoteVideo.remove();
			}

			refreshSessionAudioPins();
		}

		if (session?.sessionStatus === 'Attending') {
			showToast('error', isVideo ? 'enable_camera_permissions' : 'enable_microphone_permissions');
			showPermissionModal(permissionType);
		}

		if (window.mereos?.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({
				type: 'error',
				message: isVideo ? 'camera_is_stopped' : 'microphone_is_stopped',
				code: 40019,
			});
		}

		if (typeof registerEvent === 'function' && session.sessionStatus === 'Attending') {
			const eventName = isUserDisabled
				? (isVideo ? 'camera_permission_denied_hardware' : 'microphone_permission_denied_hardware')
				: (isVideo ? 'camera_permission_disabled' : 'microphone_permission_denied');

			registerEvent({
				eventType: 'error',
				notify: false,
				eventName: eventName,
				eventValue: new Date(),
			});
		}

		if (!isVideo) {
			await restoreIndependentVideoTrackIfNeeded();
		}
	} catch (error) {
		window.mereos.lostPermissionTypes.delete(permissionType);
		logger.error(`Failed to handle ${permissionType} device loss:`, error);
	}
};

const handlePermissionDeniedDuringSession = async (permissionType) => {
	if (window.mereos?.isReleasingMedia) return;

	const session = convertDataIntoParse('session');
	if (session?.sessionStatus !== 'Attending') return;

	const trackKind = permissionType === 'camera' ? 'video' : 'audio';
	const room = window.mereos?.roomInstance;
	let localTrack;

	room?.localParticipant?.[trackKind === 'video' ? 'videoTracks' : 'audioTracks']?.forEach?.(({ track }) => {
		if (track && !track.name?.includes('screen-share') && !localTrack) {
			localTrack = track;
		}
	});

	await handleDeviceLost(
		trackKind,
		false,
		localTrack || { name: '', kind: trackKind },
		permissionType
	);
};

const detachDeviceChangeWatcher = (track) => {
	const handler = deviceChangeHandlers.get(track);
	if (handler) {
		navigator.mediaDevices.removeEventListener('devicechange', handler);
		deviceChangeHandlers.delete(track);
	}
};

const clearSessionPermissionWatchers = () => {
	window.mereos?.permissionWatchers?.forEach(({ status, onChange }) => {
		try {
			status.removeEventListener('change', onChange);
		} catch { }
	});
	if (window.mereos) {
		window.mereos.permissionWatchers = [];
	}
};

const watchSessionMediaPermissions = () => {
	if (window.mereos?.permissionWatchers?.length) return;

	const secureFeatures = getSecureFeatures();
	const watchers = [];

	const watchPermission = async (permissionName) => {
		const needsMic = permissionName === 'microphone'
			&& findConfigs(['record_audio'], secureFeatures?.entities).length;
		const needsCam = permissionName === 'camera'
			&& findConfigs(['record_video'], secureFeatures?.entities).length;
		if (!needsMic && !needsCam) return;

		try {
			const status = await navigator.permissions.query({ name: permissionName });
			const onChange = async () => {
				if (status.state !== 'denied') return;
				await handlePermissionDeniedDuringSession(permissionName);
			};

			status.addEventListener('change', onChange);
			watchers.push({ status, onChange });
		} catch (error) {
			logger?.error?.(`Permission watcher unavailable for ${permissionName}`, error);
		}
	};

	watchPermission('microphone');
	watchPermission('camera');
	window.mereos.permissionWatchers = watchers;
};

const runDeviceLostCheck = async (track, trackType) => {
	const session = convertDataIntoParse('session');
	if (session?.sessionStatus !== 'Attending' || window.mereos?.isReleasingMedia) return;

	const kind = track.kind;
	const permissionType = resolvePermissionType(trackType, kind);

	try {
		const permissionName = permissionType === 'camera' ? 'camera' : 'microphone';
		const status = await navigator.permissions.query({ name: permissionName });
		if (status.state === 'denied') {
			await handlePermissionDeniedDuringSession(permissionType);
			return;
		}
	} catch { }

	const mst = track.mediaStreamTrack;
	const deviceId = getTrackDeviceId(track);

	if (mst && mst.readyState === 'ended') {
		if (permissionType === 'camera') {
			try {
				const camStatus = await navigator.permissions.query({ name: 'camera' });
				if (camStatus.state !== 'denied') {
					await probeExactDevice(kind, deviceId);
					await restoreIndependentVideoTrack(track);
					return;
				}
			} catch (restoreError) {
				if (restoreError?.name === 'NotAllowedError' || restoreError?.name === 'PermissionDeniedError') {
					await handlePermissionDeniedDuringSession('camera');
					return;
				}
			}
		}

		const present = await isDevicePresent(kind, deviceId);
		if (!present) {
			await handleDeviceLost(kind, false, track, trackType);
			return;
		}
	}

	try {
		await probeExactDevice(kind, deviceId);
		return;
	} catch (probeError) {
		logger?.error?.(`Exact-device probe failed for ${kind}`, probeError);
		if (probeError.name === 'NotAllowedError' || probeError.name === 'PermissionDeniedError') {
			await handlePermissionDeniedDuringSession(permissionType);
		} else if (probeError.name === 'NotReadableError' || probeError.message === 'DeviceUnavailable') {
			await handleDeviceLost(kind, true, track, trackType);
		}
		sentryExceptioMessage(probeError, { type: 'error', message: probeError.name });
	}
};

const setupTrackStoppedListeners = (track, trackType) => {
	if (track.name?.includes('screen-share') || trackStoppedListeners.has(track)) return;

	registerManagedLocalTrack(track);

	const onDeviceIssue = () => {
		void runDeviceLostCheck(track, trackType);
	};

	track.on('stopped', onDeviceIssue);
	track.on('disabled', onDeviceIssue);

	const mst = track.mediaStreamTrack;
	let onMstEnded;
	if (mst) {
		onMstEnded = () => onDeviceIssue();
		mst.addEventListener('ended', onMstEnded);
	}

	trackStoppedListeners.set(track, { onDeviceIssue, onMstEnded });
};

const removeStoppedListener = (track) => {
	const handlers = trackStoppedListeners.get(track);
	if (handlers) {
		if (typeof handlers === 'function') {
			try { track.off('stopped', handlers); } catch { }
		} else {
			try { track.off('stopped', handlers.onDeviceIssue); } catch { }
			try { track.off('disabled', handlers.onDeviceIssue); } catch { }
			if (handlers.onMstEnded && track.mediaStreamTrack) {
				try {
					track.mediaStreamTrack.removeEventListener('ended', handlers.onMstEnded);
				} catch { }
			}
		}
		trackStoppedListeners.delete(track);
	}
	detachDeviceChangeWatcher(track);
};

const attachTrackMonitoring = (room) => {
	watchSessionMediaPermissions();

	const localParticipant = room.localParticipant;
	const onTrackPublished = (publication) => {
		const track = publication.track;
		if (!track || track.name?.includes('screen-share')) return;
		const publishedTrackType = track.kind === 'video' ? 'camera' : 'microphone';
		setupTrackStoppedListeners(track, publishedTrackType);
	};

	if (window.mereos?.onTrackPublishedMonitor) {
		try {
			localParticipant.off('trackPublished', window.mereos.onTrackPublishedMonitor);
		} catch { }
	}

	localParticipant.on('trackPublished', onTrackPublished);
	window.mereos.onTrackPublishedMonitor = onTrackPublished;

	localParticipant.videoTracks.forEach(({ track }) => {
		if (track && track.kind === 'video') {
			setupTrackStoppedListeners(track, 'camera');
		}
	});

	localParticipant.audioTracks.forEach(({ track }) => {
		if (track && track.kind === 'audio') {
			setupTrackStoppedListeners(track, 'microphone');
		}
	});
};

const publishIndependentVideoTrack = async (room, preAcquiredStream = null) => {
	const videoStream = preAcquiredStream || await acquireIndependentMediaStream('video');
	const rawVideoTrack = videoStream.getVideoTracks()[0];
	if (!rawVideoTrack) {
		throw new Error('No video track available');
	}

	const twilioVideoTrack = new TwilioVideo.LocalVideoTrack(rawVideoTrack);
	registerManagedLocalTrack(twilioVideoTrack);
	const publication = await room.localParticipant.publishTrack(twilioVideoTrack);
	const localVideoTrack = publication.track || twilioVideoTrack;
	registerManagedLocalTrack(localVideoTrack);
	setupTrackStoppedListeners(localVideoTrack, 'camera');
	window.mereos.sessionVideoMediaTrack = rawVideoTrack;
	window.mereos.sessionTwilioVideoTrack = localVideoTrack;
	window.mereos.sessionVideoStream = videoStream;
	if (!window.mereos.allSessionMediaStreamTracks) {
		window.mereos.allSessionMediaStreamTracks = new Set();
	}
	window.mereos.allSessionMediaStreamTracks.add(rawVideoTrack);

	return { publication, localVideoTrack, videoStream, rawVideoTrack };
};

/*
 * Same publish contract as publishIndependentVideoTrack, but the track actually sent to Twilio
 * is a canvas' captureStream() instead of the raw camera track. The canvas is redrawn every
 * frame from a hidden <video> fed by the real camera -- live frames while running, a static
 * "Recording Paused" placeholder while window.mereos.pauseCanvasState.isPaused is true. This
 * keeps the Twilio track continuously published (no unpublish/republish) across a pause, so the
 * recording never has a gap and clearly shows the paused interval instead of silently freezing
 * or dropping the last live frame. Device-loss monitoring is attached to the raw camera track's
 * native 'ended' event (not the synthetic canvas track, which never ends on its own) so a real
 * camera disconnect is still caught while this publish path is active.
 */
const publishCanvasVideoTrack = async (room, preAcquiredStream = null) => {
	const videoStream = preAcquiredStream || await acquireIndependentMediaStream('video');
	const rawVideoTrack = videoStream.getVideoTracks()[0];
	if (!rawVideoTrack) {
		throw new Error('No video track available');
	}

	const videoEl = document.createElement('video');
	videoEl.autoplay = true;
	videoEl.muted = true;
	videoEl.playsInline = true;
	videoEl.srcObject = videoStream;
	videoEl.style.display = 'none';
	document.body.appendChild(videoEl);

	const settings = rawVideoTrack.getSettings?.() || {};
	const width = settings.width || 640;
	const height = settings.height || 480;

	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');

	const pauseState = { isPaused: false, canvasStream: null, cleanup: null };
	window.mereos.pauseCanvasState = pauseState;

	let rafId = null;
	const renderLoop = () => {
		drawPausedFrame(ctx, videoEl, width, height, pauseState.isPaused, i18next.t('recording_paused'));
		rafId = requestAnimationFrame(renderLoop);
	};
	renderLoop();

	const canvasStream = canvas.captureStream(15);
	const canvasVideoTrack = canvasStream.getVideoTracks()[0];
	const twilioVideoTrack = new TwilioVideo.LocalVideoTrack(canvasVideoTrack, {
		name: `camera-${v4()}`,
	});
	registerManagedLocalTrack(twilioVideoTrack);
	const publication = await room.localParticipant.publishTrack(twilioVideoTrack);
	const localVideoTrack = publication.track || twilioVideoTrack;
	registerManagedLocalTrack(localVideoTrack);
	setupTrackStoppedListeners(localVideoTrack, 'camera');

	const onRawTrackEnded = () => {
		const publishedTrack = window.mereos.sessionTwilioVideoTrack;
		if (publishedTrack) void runDeviceLostCheck(publishedTrack, 'camera');
	};
	rawVideoTrack.addEventListener('ended', onRawTrackEnded);

	window.mereos.sessionVideoMediaTrack = rawVideoTrack;
	window.mereos.sessionTwilioVideoTrack = localVideoTrack;
	window.mereos.sessionVideoStream = videoStream;
	if (!window.mereos.allSessionMediaStreamTracks) {
		window.mereos.allSessionMediaStreamTracks = new Set();
	}
	window.mereos.allSessionMediaStreamTracks.add(rawVideoTrack);

	pauseState.canvasStream = canvasStream;
	pauseState.cleanup = () => {
		if (rafId) cancelAnimationFrame(rafId);
		rawVideoTrack.removeEventListener('ended', onRawTrackEnded);
		videoEl.pause();
		videoEl.srcObject = null;
		videoEl.remove();
	};

	return { publication, localVideoTrack, videoStream, rawVideoTrack, canvasStream };
};

const publishIndependentAudioTrack = async (room, preAcquiredStream = null) => {
	const audioStream = preAcquiredStream || await acquireIndependentMediaStream('audio');
	const rawAudioTrack = audioStream.getAudioTracks()[0];
	if (!rawAudioTrack) {
		throw new Error('No audio track available');
	}

	const twilioAudioTrack = new TwilioVideo.LocalAudioTrack(rawAudioTrack);
	registerManagedLocalTrack(twilioAudioTrack);
	const publication = await room.localParticipant.publishTrack(twilioAudioTrack);
	const localAudioTrack = publication.track || twilioAudioTrack;
	registerManagedLocalTrack(localAudioTrack);
	setupTrackStoppedListeners(localAudioTrack, 'microphone');
	window.mereos.sessionAudioMediaTrack = rawAudioTrack;
	window.mereos.sessionTwilioAudioTrack = localAudioTrack;
	window.mereos.sessionAudioStream = audioStream;
	if (!window.mereos.allSessionMediaStreamTracks) {
		window.mereos.allSessionMediaStreamTracks = new Set();
	}
	window.mereos.allSessionMediaStreamTracks.add(rawAudioTrack);

	return { publication, localAudioTrack, audioStream, rawAudioTrack };
};

const restoreIndependentVideoTrack = async (deadTrack = null) => {
	if (window.mereos?.isRestoringVideoTrack || window.mereos?.isReleasingMedia) return;

	const session = convertDataIntoParse('session');
	if (session?.sessionStatus !== 'Attending') return;

	const room = window.mereos?.roomInstance;
	if (!room) return;

	const secureFeatures = getSecureFeatures();
	if (!findConfigs(['record_video'], secureFeatures?.entities).length) return;

	try {
		const camStatus = await navigator.permissions.query({ name: 'camera' });
		if (camStatus.state === 'denied') return;
	} catch {
		return;
	}

	window.mereos.isRestoringVideoTrack = true;

	try {
		if (deadTrack) {
			removeStoppedListener(deadTrack);
			try {
				await room.localParticipant.unpublishTrack(deadTrack);
				deadTrack.stop?.();
			} catch { }
		} else {
			await cleanupCameraTracks(room, 'video');
		}

		const pauseAndResumeEnabled = findConfigs(['pause_and_resume'], secureFeatures?.entities).length > 0;
		const { publication, localVideoTrack, videoStream, rawVideoTrack, canvasStream } = pauseAndResumeEnabled
			? await publishCanvasVideoTrack(room)
			: await publishIndependentVideoTrack(room);
		const twilioStream = canvasStream || new MediaStream([localVideoTrack.mediaStreamTrack]);

		if (secureFeatures?.entities?.filter((entity) => aiEventsFeatures.includes(entity.key))?.length) {
			await startAIWebcam(room, twilioStream);
		} else {
			await setupWebcam(twilioStream);
		}

		stopUnusedMediaStreamTracks(videoStream, [rawVideoTrack]);

		const cameraRecordings = [
			...(session.user_video_name || []),
			publication.trackSid,
		];
		updatePersistData('session', { user_video_name: cameraRecordings });
	} catch (error) {
		logger.error('Failed to restore independent video track:', error);
	} finally {
		window.mereos.isRestoringVideoTrack = false;
	}
};

const restoreIndependentVideoTrackIfNeeded = async () => {
	const session = convertDataIntoParse('session');
	if (session?.sessionStatus !== 'Attending' || window.mereos?.isReleasingMedia) return;

	const room = window.mereos?.roomInstance;
	if (!room) return;

	const secureFeatures = getSecureFeatures();
	if (!findConfigs(['record_video'], secureFeatures?.entities).length) return;

	if (window.mereos?.lostPermissionTypes?.has('camera')) return;

	try {
		const camStatus = await navigator.permissions.query({ name: 'camera' });
		if (camStatus.state === 'denied') return;
	} catch {
		return;
	}

	const videoPublication = Array.from(room.localParticipant.videoTracks.values())
		.find(({ track }) => track && !track.name?.includes('screen-share'));
	const videoMst = videoPublication?.track?.mediaStreamTrack;

	if (videoMst?.readyState === 'live') {
		await restoreCameraViewFromRoom(room, secureFeatures);
		return;
	}

	await restoreIndependentVideoTrack(videoPublication?.track || null);
};

const detachAllTrackStoppedListeners = () => {
	clearSessionPermissionWatchers();
	window.mereos?.lostPermissionTypes?.clear();

	[window.mereos?.roomInstance, window.mereos?.mobileRoomInstance]
		.filter(Boolean)
		.forEach((room) => {
			if (window.mereos?.onTrackPublishedMonitor && room?.localParticipant) {
				try {
					room.localParticipant.off('trackPublished', window.mereos.onTrackPublishedMonitor);
				} catch { }
			}
			room?.localParticipant?.videoTracks.forEach(({ track }) => {
				if (track) removeStoppedListener(track);
			});
			room?.localParticipant?.audioTracks.forEach(({ track }) => {
				if (track) removeStoppedListener(track);
			});
		});

	window.mereos.onTrackPublishedMonitor = null;
};

export const cleanupSessionMediaMonitoring = () => {
	hidePermissionModal();
	detachAllTrackStoppedListeners();
};

// ============= RECONNECT FUNCTION =============

const buildReconnectMediaConstraints = (reconnectType, secureFeatures) => {
	let needsVideo = false;
	let needsAudio = false;
	const mediaConstraints = {};

	if (reconnectType === 'camera' && findConfigs(['record_video'], secureFeatures?.entities).length) {
		Object.assign(mediaConstraints, buildIndependentMediaConstraints('video'));
		needsVideo = true;
	}

	if (reconnectType === 'microphone' && findConfigs(['record_audio'], secureFeatures?.entities).length) {
		Object.assign(mediaConstraints, buildIndependentMediaConstraints('audio'));
		needsAudio = true;
	}

	return { mediaConstraints, needsVideo, needsAudio };
};

const acquireReconnectMediaStream = async (mediaConstraints, needsVideo, needsAudio) => {
	try {
		const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
		registerAcquiredMediaStream(stream);
		return stream;
	} catch (error) {
		if (error.name === 'OverconstrainedError') {
			const fallback = {};
			if (needsVideo) fallback.video = true;
			if (needsAudio) fallback.audio = true;
			const stream = await navigator.mediaDevices.getUserMedia(fallback);
			registerAcquiredMediaStream(stream);
			return stream;
		}
		throw error;
	}
};

const ensureActiveRoom = async (session) => {
	const existing = window.mereos?.roomInstance;
	if (existing?.state === 'connected') {
		return existing;
	}

	if (existing) {
		await stopRoomMediaAndDisconnect(existing);
		window.mereos.roomInstance = null;
		window.mereos.sessionTwilioAudioTrack = null;
		window.mereos.sessionAudioMediaTrack = null;
		window.mereos.sessionAudioStream = null;
	}

	if (!session?.twilioToken) return null;

	const room = await TwilioVideo.connect(session.twilioToken, {
		preferredVideoCodecs: 'auto',
		audio: false,
		video: false,
	});

	window.mereos.roomInstance = room;
	registerTwilioRoom(room);
	window.mereos.recordingStart = true;
	updatePersistData('session', {
		room_id: room?.sid,
		sessionStatus: 'Attending',
	});
	attachTrackMonitoring(room);
	return room;
};

const hasActiveVideoTrack = (room) => Array.from(room?.localParticipant?.videoTracks?.values() || [])
	.some(({ track }) => track && !track.name?.includes('screen-share'));

const restoreCameraViewFromRoom = async (room, secureFeatures) => {
	if (!room || !findConfigs(['record_video'], secureFeatures?.entities).length) return;

	const container = window.mereos?.shadowRoot;
	if (container?.querySelector('#webcam-container video, #webcam-container canvas')) {
		return;
	}

	const localVideoTrack = Array.from(room.localParticipant.videoTracks.values())
		.find(({ track }) => track && !track.name?.includes('screen-share'))?.track;

	if (!localVideoTrack) return;

	const twilioStream = new MediaStream([localVideoTrack.mediaStreamTrack]);
	if (secureFeatures?.entities?.filter((entity) => aiEventsFeatures.includes(entity.key))?.length) {
		await startAIWebcam(room, twilioStream);
	} else {
		await setupWebcam(twilioStream);
	}
};

const completePendingSessionStart = async (room, secureFeatures) => {
	if (!window.mereos?.pendingSessionStart) return;

	const needsAudio = findConfigs(['record_audio'], secureFeatures?.entities).length > 0;
	const needsVideo = findConfigs(['record_video'], secureFeatures?.entities).length > 0;

	if (needsAudio && room.localParticipant.audioTracks.size === 0) return;
	if (needsVideo && !hasActiveVideoTrack(room)) return;

	window.mereos.pendingSessionStart = false;
	attachTrackMonitoring(room);
	updatePersistData('session', { sessionStatus: 'Attending', room_id: room?.sid });

	try {
		const updatedSession = convertDataIntoParse('session');
		const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
		const resp = await addSectionSessionRecord(updatedSession, candidateInviteAssessmentSection);
		if (!resp) {
			throw new Error('Failed to save session information');
		}
		await finalizeSuccessfulSessionStart(updatedSession);
	} catch (error) {
		logger.error('Error saving candidate session after reconnect:', error);
		await abortFailedSessionStart(error);
	}
};

const reconnectCamera = async () => {
	let reconnectType = 'camera';

	try {
		const modal = window.mereos?.shadowRoot?.getElementById('permissionModal')
			|| document.getElementById('permissionModal');
		reconnectType = modal?.getAttribute('data-permission-type') || 'camera';

		const secureFeatures = getSecureFeatures();
		const session = convertDataIntoParse('session');
		const { needsVideo, needsAudio } = buildReconnectMediaConstraints(
			reconnectType,
			secureFeatures
		);

		if (!needsVideo && !needsAudio) {
			return;
		}

		let preAcquiredVideoStream = null;
		let preAcquiredAudioStream = null;

		// Request media immediately while the button-click user gesture is still active.
		if (needsVideo) {
			preAcquiredVideoStream = await acquireIndependentMediaStream('video');
		}
		if (needsAudio) {
			preAcquiredAudioStream = await acquireIndependentMediaStream('audio');
		}

		hidePermissionModal();

		const room = await ensureActiveRoom(session);
		if (!room) {
			stopMediaStreamTracks(preAcquiredVideoStream?.getVideoTracks() || []);
			stopMediaStreamTracks(preAcquiredAudioStream?.getAudioTracks() || []);
			if (window.mereos.startRecordingCallBack) {
				window.mereos.startRecordingCallBack({
					type: 'error',
					message: 'no_active_session_found',
					code: 40021
				});
			}
			showPermissionModal(reconnectType);
			return;
		}

		let newVideoTrackPublication;
		let newAudioTrackPublication;
		let cameraRecordings = [...(session.user_video_name || [])];
		let audioRecordings = [...(session.user_audio_name || [])];

		if (needsVideo) {
			await cleanupCameraTracks(room, 'video');
			const { publication, localVideoTrack, videoStream, rawVideoTrack } = await publishIndependentVideoTrack(
				room,
				preAcquiredVideoStream
			);
			newVideoTrackPublication = publication;
			cameraRecordings.push(publication.trackSid);

			const twilioStream = new MediaStream([localVideoTrack.mediaStreamTrack]);
			if (secureFeatures?.entities?.filter((entity) => aiEventsFeatures?.includes(entity.key))?.length) {
				await startAIWebcam(room, twilioStream);
			} else {
				await setupWebcam(twilioStream);
			}
			stopUnusedMediaStreamTracks(videoStream, [rawVideoTrack]);
		}

		if (needsAudio) {
			await cleanupCameraTracks(room, 'audio');
			const { publication } = await publishIndependentAudioTrack(room, preAcquiredAudioStream);
			newAudioTrackPublication = publication;
			audioRecordings.push(publication.trackSid);
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

		if (reconnectType === 'microphone') {
			await restoreIndependentVideoTrackIfNeeded();
		}

		await completePendingSessionStart(room, secureFeatures);

		if (typeof registerEvent === 'function') {
			registerEvent({
				eventType: 'success',
				notify: false,
				eventName: 'permission_restored',
				eventValue: new Date()
			});
		}

		window.mereos.lostPermissionTypes?.delete(reconnectType);

		const remainingLost = [...(window.mereos.lostPermissionTypes || [])];
		if (remainingLost.length > 0) {
			showPermissionModal(remainingLost[0]);
		}

		if (window.mereos.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({
				type: 'success',
				message: 'device_reconnected_successfully',
				code: 50000
			});
		}

	} catch (error) {
		logger.error('Device reconnect failed:', error);

		if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
			const permissionType = await resolveStartPermissionType(error, reconnectType);
			showToast('error', permissionType === 'camera' ? 'enable_camera_permissions' : 'enable_microphone_permissions');
			showPermissionModal(permissionType);

			if (window.mereos.startRecordingCallBack) {
				window.mereos.startRecordingCallBack({
					type: 'error',
					message: permissionType === 'camera' ? 'camera_permission_denied' : 'microphone_permission_denied',
					code: 40019
				});
			}
			sentryExceptioMessage(error, { type: 'error', message: `${permissionType} permission denied` });
			return;
		}

		showToast('error', reconnectType === 'camera' ? 'enable_camera_permissions' : 'enable_microphone_permissions');
		showPermissionModal(reconnectType);

		if (window.mereos.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({
				type: 'error',
				message: 'device_reconnection_failed',
				code: 40022
			});
		}

		if (typeof registerEvent === 'function') {
			registerEvent({
				eventType: 'error',
				notify: false,
				eventName: reconnectType === 'camera' ? 'camera_reconnection_failed' : 'microphone_reconnection_failed',
				eventValue: new Date(),
				errorMessage: error.message
			});
		}
	}
};

// Inject styles if needed
if (typeof document !== 'undefined') {
	const styleElement = document.createElement('style');
	styleElement.textContent = permissionModalStyle;
	document.head.appendChild(styleElement);
}

/**
 * Connects Twilio, publishes tracks, and persists session to the backend.
 * Called by start_session after room tokens are ready.
 * LMS success callback fires only after candidate_session is saved; API failure aborts the session.
 */
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
	if (!libraryDOM) {
		initShadowDOM();
		updateThemeColor();
	}
	const existingChatIcon = document.getElementById('chat-icon-wrapper');
	if (!existingChatIcon) {
		initializeLiveChat();
	}

	loadZendeskWidget();
	if (findConfigs(['mobile_proctoring'], secureFeatures?.entities).length && window?.mereos?.mobileStream) {
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
				type: 'error',
				message: 'please_share_your_screen',
				code: 40011
			});
		}
		window.mereos.recordingStart = false;
		window.mereos.precheckCompleted = false;
		return;
	}

	/*
	 * Outer try/catch: lockdown, fullscreen, and addSectionSessionRecord were previously
	 * outside the inner Twilio try — failures there never invoked the LMS callback.
	 */
	try {
		const fullscreenRequired = secureFeatures?.entities?.some(entity => entity.key === 'force_full_screen');

		if (secureFeatures?.entities?.filter(entity => LockDownOptions.includes(entity.key))?.length) {
			await lockBrowserFromContent(secureFeatures?.entities || []);
		}

		if (fullscreenRequired) {
			const cleanupForceFullscreen = initializeForceFullscreen();

			window.mereos.cleanupForceFullscreen = cleanupForceFullscreen;
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

			[window.mereos.globalStream, window.mereos.audioStream].forEach((stream) => {
				stream?.getTracks?.().forEach((track) => {
					try {
						track.stop();
					} catch (error) {
						logger.error('Failed to stop precheck media track:', error);
					}
				});
			});
			window.mereos.globalStream = null;
			window.mereos.audioStream = null;

			/*
			 * Re-read session from localStorage so connect uses the token set by start_session
			 * (new fetch or session_resume reuse). `session` above is kept for recording history arrays.
			 */
			const persistedSession = convertDataIntoParse('session');
			if (!persistedSession?.twilioToken) {
				window.mereos.recordingStart = false;
				registerEvent({ eventType: 'success', notify: false, eventName: 'room_is_not_creating' });
				invokeStartSessionCallback({
					type: 'error',
					message: 'room_is_not_creating',
					code: 40065,
					details: 'Twilio token is missing',
				});
				return;
			}

			try {
				const newRoomSessionId = v4();
				const newSessionId = session?.sessionId ? session?.sessionId : v4();

				updatePersistData('session', {
					roomSessionId: newRoomSessionId,
					sessionId: newSessionId,
					sessionStatus: 'Attending'
				});
				let room;
				try {
					if (window.mereos?.roomInstance) {
						try {
							detachAllTrackStoppedListeners();
							await stopRoomMediaAndDisconnect(window.mereos.roomInstance);
						} catch (disconnectError) {
							logger.error('Failed to disconnect stale room before new session:', disconnectError);
						}
						window.mereos.roomInstance = null;
					}
					window.mereos.pendingSessionStart = false;

					room = await TwilioVideo.connect(persistedSession.twilioToken, twilioOptions);
					registerTwilioRoom(room);
					window.mereos.roomInstance = room;
				} catch (error) {
					const isPermissionError = error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError';
					if (isPermissionError) {
						const permissionType = await resolveStartPermissionType(error);
						await showMediaPermissionError(permissionType);
						return;
					}

					await releaseAllMediaStreams();
					if (error.code) {
						logger.error('Twilio error code:', error.code);
					}
					if (error.message) {
						logger.error('Twilio error message:', error.message);
					}
					registerEvent({ eventType: 'success', notify: false, eventName: 'room_is_not_creating' });
					sentryExceptioMessage(error, { type: 'error', message: 'Twilio room is not creating' });
					window.mereos.recordingStart = false;
					invokeStartSessionCallback({
						type: 'error',
						message: 'room_is_not_creating',
						code: 40065,
					});
					// Must return here — previously execution continued with room === undefined.
					return;
				}
				updatePersistData('session', {
					room_id: room?.sid
				});

				const needsVideo = findConfigs(['record_video'], secureFeatures?.entities).length > 0;
				const needsAudio = findConfigs(['record_audio'], secureFeatures?.entities).length > 0;
				const pauseAndResumeEnabled = findConfigs(['pause_and_resume'], secureFeatures?.entities).length > 0;

				if (needsVideo) {
					try {
						const { publication, localVideoTrack, canvasStream } = pauseAndResumeEnabled
							? await publishCanvasVideoTrack(room)
							: await publishIndependentVideoTrack(room);
						const twilioStream = canvasStream || new MediaStream([localVideoTrack.mediaStreamTrack]);

						if (secureFeatures?.entities?.filter(entity => aiEventsFeatures.includes(entity.key))?.length) {
							const aiResult = await startAIWebcam(room, twilioStream);
							if (aiResult?.success === false) {
								window.mereos.recordingStart = false;
								return;
							}
						} else {
							await setupWebcam(twilioStream);
						}

						cameraRecordings = [
							...session.user_video_name,
							publication.trackSid,
						];

						updatePersistData('session', {
							user_video_name: cameraRecordings || [],
						});
					} catch (error) {
						const permissionType = await resolveStartPermissionType(error, 'camera');
						await showMediaPermissionError(permissionType);
						return;
					}
				}

				if (needsAudio) {
					try {
						const { publication } = await publishIndependentAudioTrack(room);
						audioRecordings = [
							...session.user_audio_name,
							publication.trackSid,
						];
						updatePersistData('session', { user_audio_name: audioRecordings, room_id: room?.sid });
					} catch (error) {
						if (hasActiveVideoTrack(room)) {
							window.mereos.pendingSessionStart = true;
							await showMediaPermissionError('microphone');
						} else {
							const permissionType = await resolveStartPermissionType(error, 'microphone');
							await showMediaPermissionError(permissionType);
						}
						return;
					}
				}

				if (session?.screenRecordingStream && findConfigs(['record_screen'], secureFeatures?.entities).length) {
					if (window.mereos?.newStream?.getTracks()[0]) {
						screenTrack = new TwilioVideo.LocalVideoTrack(window?.mereos?.newStream?.getTracks()[0], {
							name: `screen-share-${v4()}`
						});
						window.mereos.screenTrackPublished = await room.localParticipant.publishTrack(screenTrack);
						screenRecordings = [...session.screen_sharing_video_name, window.mereos.screenTrackPublished.trackSid];
						updatePersistData('session', { screen_sharing_video_name: screenRecordings });
					} else {
						await registerEvent({
							eventType: 'error',
							notify: false,
							eventName: 'screen_recording_not_started',
						});
						if (window.mereos.startRecordingCallBack) {
							invokeStartSessionCallback({
								type: 'error',
								message: 'please_share_your_screen',
								code: 40011
							});
						}
						window.mereos.precheckCompleted = false;
						window.mereos.recordingStart = false;
						return;
					}
				}

				if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
					window.mereos.socket.send(JSON.stringify({ event: 'startRecording', data: 'Web video recording started' }));
				}

				const localParticipant = room?.localParticipant;

				localParticipant.on('networkQualityLevelChanged', (level) => {
					if (level <= 2) {
						if (window.mereos.startRecordingCallBack) {
							window.mereos.startRecordingCallBack({
								type: 'error',
								message: 'session_is_terminated_due_to_slow_internet_connection',
								code: 40013
							});
						}

						registerEvent({ eventType: 'error', notify: false, eventName: 'slow_internet_detected' });

						// showToast('error','your_internet_is_very_slow_please_make_sure_you_have_stable_network_quality');
					}
				});

				attachTrackMonitoring(room);

				const handleReconnecting = async (error) => {
					if (
						error?.message?.includes('Media connection failed') ||
						error?.message?.includes('Media activity')
					) {
						registerEvent({
							notify: false,
							eventName: 'media_connection_failed',
						});
						if (window.mereos.startRecordingCallBack) {
							window.mereos.startRecordingCallBack({
								type: 'error',
								message: 'media_connection_failed',
								code: 40056
							});
						}
						showToast('error', 'internet_connection_lost');
						isMediaError = true;
					} else if (
						error?.message?.includes('Signaling connection disconnected')
					) {
						registerEvent({
							notify: false,
							eventName: 'signaling_connection_disconnected',
						});
						if (window.mereos.startRecordingCallBack) {
							window.mereos.startRecordingCallBack({
								type: 'error',
								message: 'signaling_connection_disconnected',
								code: 40057
							});
						}
						showToast('error', 'reconnecting_signaling_connection');
						isSignalingError = true;
					} else {
						if (window.mereos.startRecordingCallBack) {
							window.mereos.startRecordingCallBack({
								type: 'success',
								message: 'video_recording_reconnecting',
								code: 50019
							});
						}
						registerEvent({
							notify: false,
							eventName: 'video_recording_reconnecting',
						});
					}
				};

				const handleDisconnected = async () => {
					if (window.mereos?.isReleasingMedia || window.mereos?.isStoppingSession) {
						return;
					}

					if (window.mereos?.lostPermissionTypes?.size > 0) {
						logger.warn('Twilio room disconnected during recoverable permission loss');
						return;
					}

					cleanupLocalVideo();
					registerEvent({
						notify: false,
						eventName: 'video_recording_disconnected',
					});

					updatePersistData('session', {
						sessionStatus: 'Terminated'
					});

					if (findConfigs(['mobile_proctoring'], secureFeatures?.entities).length > 0) {
						updatePersistData('preChecksSteps', {
							mobileConnection: false,
							screenSharing: false
						});
						showToast('error', 'mobile_phone_disconnected');
						if (window.mereos.startRecordingCallBack) {
							window.mereos.startRecordingCallBack({
								type: 'error',
								message: 'mobile_phone_disconnected_during_assessment',
								code: 40058
							});
						}
					} else {
						updatePersistData('preChecksSteps', {
							screenSharing: false,
						});
					}
					if (window.mereos.startRecordingCallBack) {
						window.mereos.startRecordingCallBack({
							type: 'error',
							message: 'web_internet_connection_disconnected',
							code: 40014
						});
						window.mereos.recordingStart = false;
					}
					forceClosure();
				};

				const handleReconnected = async () => {
					if (room.state === 'connected' && isMediaError) {
						showToast('success', 'internet_connection_recovered');
						isMediaError = false;
					}
					if (room.state === 'connected' && isSignalingError) {
						showToast('success', 'signaling_connection_reconnected');
						isSignalingError = false;
					}
					registerEvent({
						notify: false,
						eventName: 'video_recording_reconnected',
					});
					if (window.mereos.startRecordingCallBack) {
						window.mereos.startRecordingCallBack({
							type: 'success',
							message: 'video_recording_reconnected',
							code: 50020
						});
					}
				};

				room.on('reconnected', handleReconnected);
				room.on('disconnected', handleDisconnected);
				room.on('reconnecting', handleReconnecting);

			} catch (error) {
				logger.error('error in startRecording', error);
				const isPermissionError = error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError';
				if (isPermissionError) {
					const permissionType = await resolveStartPermissionType(error);
					await showMediaPermissionError(permissionType);
					return;
				}

				await releaseAllMediaStreams();
				updatePersistData('session', {
					sessionStatus: 'Terminated'
				});
				registerEvent({ eventType: 'success', notify: false, eventName: 'camera_or_microphone_permission_is_denied' });
				sentryExceptioMessage(error, { type: 'error', message: 'Camera or microphone permission is denied' });
				window.mereos.recordingStart = false;
				invokeStartSessionCallback({
					type: 'error',
					message: 'error_in_starting_the_session',
					code: 40004,
					details: error,
				});
				// Return so addSectionSessionRecord is not called after a failed recording start.
				return;
			}
		} else {
			// Lockdown-only profile (no Twilio recording entities).
			updatePersistData('session', {
				sessionStatus: 'Attending'
			});
		}

		try {
			const updatedSession = convertDataIntoParse('session');
			const resp = await addSectionSessionRecord(updatedSession, candidateInviteAssessmentSection);
			if (!resp) {
				throw new Error('Failed to save session information');
			}
			await finalizeSuccessfulSessionStart(updatedSession);
		} catch (error) {
			logger.error('Error saving candidate session on start:', error);
			await abortFailedSessionStart(error);
			return;
		}
	} catch (error) {
		// Catch-all for lockBrowser, fullscreen init, addSectionSessionRecord, etc.
		logger.error('Unhandled error in startRecording:', error);
		await releaseAllMediaStreams();
		window.mereos.recordingStart = false;
		sentryExceptioMessage(error, { type: 'error', message: 'Unhandled error in startRecording' });
		invokeStartSessionCallback({
			type: 'error',
			message: 'error_in_starting_the_session',
			code: 40004,
			details: error,
		});
	}
};

const PREDICTION = ['cell phone', 'book', 'laptop'];

const updatePauseResumeUI = (isPaused) => {
	const container = window.mereos?.shadowRoot;
	if (!container) return;

	const badge = container.querySelector('#user-video-header .recording-badge-container-header');
	const badgeText = badge?.querySelector('.recording-text');
	if (badge && badgeText) {
		badge.classList.toggle('recording-badge-container-header--paused', isPaused);
		badgeText.textContent = i18next.t(isPaused ? 'recording_paused' : 'recording');
	}

	const button = container.querySelector('#pause-resume-btn');
	if (button) {
		button.textContent = i18next.t(isPaused ? 'resume' : 'pause');
	}
};

const pauseRecording = async () => {
	if (isPauseResumeBusy) return;
	const room = window.mereos?.roomInstance;
	const pauseState = window.mereos?.pauseCanvasState;
	if (!room || !pauseState || pauseState.isPaused) return;

	isPauseResumeBusy = true;
	try {
		pauseState.isPaused = true;
		room.localParticipant.audioTracks.forEach(({ track }) => {
			if (!track || track.name?.includes('screen-share')) return;
			track.disable();
		});
		updatePauseResumeUI(true);
		registerEvent({ eventType: 'success', notify: false, eventName: 'recording_paused' });
	} catch (error) {
		pauseState.isPaused = false;
		sentryExceptioMessage(error, { type: 'error', message: 'Failed to pause recording' });
		registerEvent({ eventType: 'error', notify: false, eventName: 'recording_pause_failed', sentryError: true });
		showToast('error', 'recording_pause_failed');
	} finally {
		isPauseResumeBusy = false;
	}
};

const resumeRecording = async () => {
	if (isPauseResumeBusy) return;
	const room = window.mereos?.roomInstance;
	const pauseState = window.mereos?.pauseCanvasState;
	if (!room || !pauseState || !pauseState.isPaused) return;

	isPauseResumeBusy = true;
	try {
		pauseState.isPaused = false;
		room.localParticipant.audioTracks.forEach(({ track }) => {
			if (!track || track.name?.includes('screen-share')) return;
			track.enable();
		});
		updatePauseResumeUI(false);
		registerEvent({ eventType: 'success', notify: false, eventName: 'recording_resumed' });
	} catch (error) {
		pauseState.isPaused = true;
		sentryExceptioMessage(error, { type: 'error', message: 'Failed to resume recording' });
		registerEvent({ eventType: 'error', notify: false, eventName: 'recording_resume_failed', sentryError: true });
		showToast('error', 'recording_resume_failed');
	} finally {
		isPauseResumeBusy = false;
	}
};

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
				if (findConfigs(['camera_view'], secureFeatures?.entities)?.length) {
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

			// Initialize dimensions
			let currentWidth = 200;
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
					overflow: 'hidden'
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
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				objectFit: 'cover'
			});

			const canvas = document.createElement('canvas');
			canvas.id = 'canvas';
			Object.assign(canvas.style, {
				position: 'absolute',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%'
			});

			webcamContainer.appendChild(videoHeaderContainer);
			mediaWrapper.appendChild(videoElement);
			if (secureFeatures?.entities?.filter(entity => aiEventsFeatures.includes(entity.key))?.length) {
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

						const remoteVideo = webcamContainer.querySelector('#remote-video');
						if (remoteVideo) {
							remoteVideo.style.width = `${currentWidth}px`;
							remoteVideo.style.height = `${newHeight}px`;
						}
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

						const remoteVideo = webcamContainer.querySelector('#remote-video');
						if (remoteVideo) {
							remoteVideo.style.width = `${currentWidth}px`;
							remoteVideo.style.height = `${newHeight}px`;
						}
					}
				});

				videoFooterContainer.appendChild(zoomOutBtn);
				videoFooterContainer.appendChild(zoomInBtn);

				if (findConfigs(['pause_and_resume'], secureFeatures?.entities)?.length) {
					const pauseResumeBtn = document.createElement('button');
					pauseResumeBtn.id = 'pause-resume-btn';
					pauseResumeBtn.className = 'pause-resume-btn';
					const initiallyPaused = Boolean(window.mereos.pauseCanvasState?.isPaused);
					pauseResumeBtn.textContent = i18next.t(initiallyPaused ? 'resume' : 'pause');

					pauseResumeBtn.addEventListener('click', (e) => {
						e.stopPropagation();
						if (window.mereos.pauseCanvasState?.isPaused) {
							resumeRecording();
						} else {
							pauseRecording();
						}
					});

					videoFooterContainer.appendChild(pauseResumeBtn);
				}

				webcamContainer.appendChild(videoFooterContainer);
			}

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
				cursor: 'move',
				transition: 'width 0.3s ease, height 0.3s ease',
				width: `${currentWidth}px`,
				height: 'auto'
			});

			const handleMouseDown = (e) => {
				if (e.target.classList.contains('zoom-btns') || e.target.classList.contains('pause-resume-btn')) {
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
		} catch (e) {
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


		if (!window.mereos.net) {
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
		window.mereos.aiProcessingVideo = processingVideo;

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
				if (window.mereos.pauseCanvasState?.isPaused) return;

				const image = tf.browser.fromPixels(processingVideo);
				const predictions = await window.mereos.net.detect(image);
				tf.dispose(image);

				context.clearRect(0, 0, canvas.width, canvas.height);

				if (multiplePeopleFeature || personMissingFeature || objectDetectionFeature) {
					handleVideoResize(predictions, context, canvas);
				}

				let log = {}, person = {}, multiplePersonFound = false;
				let detectedObjects = new Set();

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
						detectedObjects.add(prediction.class);
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
								time_span: 1,
								...(key === 'object_detected' && detectedObjects.size > 0 ? { detected_objects: Array.from(detectedObjects) } : {})
							};
							aiEvents.push({ ...activeViolations[key], [key]: log[key] });
						}
						else {
							activeViolations[key].time_span += 1;
							if (key === 'object_detected' && detectedObjects.size > 0) {
								const existingObjects = new Set(activeViolations[key].detected_objects || []);
								detectedObjects.forEach(obj => existingObjects.add(obj));
								activeViolations[key].detected_objects = Array.from(existingObjects);
							}
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
							if (window.mereos.startRecordingCallBack) {
								window.mereos.startRecordingCallBack({
									type: 'error',
									message: message,
									code: 40059,
									detail: activeViolations[key].time_span
								});
							}
						}
					}
					else if (activeViolations[key]) {
						const violation = activeViolations[key];

						if (violation.time_span >= 2) {
							const data = {
								eventType: 'success',
								notify: true,
								eventName: key,
								eventValue: violation?.detected_objects?.length > 0 ? violation?.detected_objects[0]?.replace(/\s+/g, '_') : key,
								startTime: violation.start_time,
								endTime: violation.start_time + violation.time_span
							};
							registerAIEvent(data);
							if (window.mereos.startRecordingCallBack) {
								window.mereos.startRecordingCallBack({
									type: 'error',
									message: key,
									code: 40060,
									detail: violation.start_time + violation.time_span
								});
							}
							checkForceClosureViolation();
						}

						activeViolations[key] = null;
					}
				});
			} catch (error) {
				sentryExceptioMessage(error, { type: 'error', message: 'Error in AI processing' });
				logger.error('Error in AI processing:', error);
			}
		}, 1000);

		return { success: true, message: 'AI webcam started successfully' };
	} catch (error) {
		sentryExceptioMessage(error, { type: 'error', message: 'Failed to start AI webcam' });
		logger.error('Failed to start AI webcam:', error);
		if (window.mereos.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({
				type: 'error',
				message: 'failed_to_start_ai_webcam',
				code: 40061,
			});
		}
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
	if (window.mereos.shadowRoot) {
		const webcamContainer = window.mereos.shadowRoot.querySelector('#webcam-container');
		const webVideoContainer = window.mereos.shadowRoot.querySelector('#user-video-header');
		const imgContainer = document.querySelector('#chat-icon-wrapper');

		if (imgContainer) {
			imgContainer.remove();
		}
		if (webVideoContainer) {
			webVideoContainer.remove();
		}

		if (webcamContainer) {
			const videoElement = webcamContainer.querySelector('video');
			if (videoElement) {
				videoElement.pause();
				if (videoElement.srcObject?.getTracks) {
					videoElement.srcObject.getTracks().forEach(track => track.stop());
				}
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

	let currentWidth = 200;
	const aspectRatio = 142 / 180;
	const initialHeight = Math.round(currentWidth * aspectRatio);

	let webcamContainer = window.mereos.shadowRoot.querySelector('#webcam-container');
	let videoHeaderContainer = window.mereos.shadowRoot.querySelector('#user-video-header');

	if (!webcamContainer) {
		webcamContainer = document.createElement('div');
		webcamContainer.id = 'webcam-container';
		webcamContainer.className = 'user-videos-remote';

		if (findConfigs(['camera_view'], secureFeatures?.entities)?.length) {
			window.mereos.shadowRoot.appendChild(webcamContainer);
		}

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

		let isDragging = false;
		let startX, startY;
		let initialX, initialY;

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

		webcamContainer.cleanupDrag = () => {
			webcamContainer.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}

	if (!videoHeaderContainer) {
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

	let userVideoElement = window.mereos.shadowRoot.querySelector('#user-video-element');
	if (!userVideoElement) {
		userVideoElement = document.createElement('div');
		userVideoElement.id = 'user-video-element';
		Object.assign(userVideoElement.style, {
			position: 'relative',
			marginLeft: 'auto',
			marginRight: 'auto',
			width: `${currentWidth}px`,
			height: `${initialHeight}px`,
			objectFit: 'cover',
			transition: 'width 0.3s ease, height 0.3s ease'
		});
		webcamContainer.appendChild(userVideoElement);
	}

	const localVideoRef = document.createElement('div');
	localVideoRef.classList.add('local-video');
	localVideoRef.id = 'local-video';
	Object.assign(localVideoRef.style, {
		width: '100%',
		height: '100%'
	});
	userVideoElement.appendChild(localVideoRef);

	let videoFooterContainer = window.mereos.shadowRoot.querySelector('#user-video-footer');

	const remoteVideoRef = document.createElement('div');
	remoteVideoRef.classList.add('remote-video');
	remoteVideoRef.id = 'remote-video';
	Object.assign(remoteVideoRef.style, {
		position: 'relative',
		marginLeft: 'auto',
		marginRight: 'auto',
		width: `${currentWidth}px`,
		height: `${initialHeight}px`,
		marginTop: '8px',
		overflow: 'hidden',
		transition: 'width 0.3s ease, height 0.3s ease',
		background: '#000'
	});

	if (videoFooterContainer) {
		webcamContainer.insertBefore(remoteVideoRef, videoFooterContainer);
	} else {
		webcamContainer.appendChild(remoteVideoRef);
	}

	function attachTrack(track, container) {
		if (container && track && track.kind === 'video') {
			try {
				const attachedElement = track?.attach();
				if (attachedElement) {
					attachedElement.classList.add('video-attached');

					const isRemoteVideo = container.id === 'remote-video';

					if (isRemoteVideo) {
						Object.assign(attachedElement.style, {
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							display: 'block'
						});
					} else {
						Object.assign(attachedElement.style, {
							position: 'absolute',
							top: '0',
							left: '0',
							width: '100%',
							height: '100%',
							objectFit: 'cover'
						});
					}

					container.appendChild(attachedElement);
				}
			} catch (error) {
				sentryExceptioMessage(error, { type: 'error', message: 'Error attaching video track' });
				if (window.mereos.startRecordingCallBack) {
					window.mereos.startRecordingCallBack({
						type: 'error',
						message: 'error_attaching_video_track',
						code: 40062,
					});
				}
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

			room.on('participantReconnecting', async () => {
				if (findConfigs(['mobile_proctoring'], secureFeatures?.entities).length > 0) {
					updatePersistData('preChecksSteps', {
						mobileConnection: false,
						screenSharing: false
					});
					updatePersistData('session', {
						sessionStatus: 'Terminated'
					});
					showToast('error', i18next.t('mobile_phone_disconnected'));
				} else {
					updatePersistData('preChecksSteps', {
						screenSharing: false
					});
					showToast('error', i18next.t('internet_connection_not_working'));
				}
				await releaseAllMediaStreams();
				setTimeout(() => {
					if (window.mereos.startRecordingCallBack) {
						window.mereos.startRecordingCallBack({
							type: 'error',
							code: 40015,
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
			void releaseAllMediaStreams();
			sentryExceptioMessage(error, { type: 'error', message: 'Error connecting to Twilio room' });
			if (window.mereos.startRecordingCallBack) {
				window.mereos.startRecordingCallBack({
					type: 'error',
					message: 'error_on_starting_recording',
					code: 40063,
				});
			}
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
	if (window.mereos.aiProcessingInterval) {
		clearInterval(window.mereos.aiProcessingInterval);
		window.mereos.aiProcessingInterval = null;
	}

	if (window.mereos.pauseCanvasState) {
		window.mereos.pauseCanvasState.cleanup?.();
		window.mereos.pauseCanvasState = null;
	}

	cleanupLocalVideo();
	detachAllTrackStoppedListeners();

	try {
		const secureFeatures = getSecureFeatures();
		const session = convertDataIntoParse('session');
		const isManualStop = Boolean(window.mereos?.isStoppingSession);
		const finalSessionStatus = isManualStop || session?.sessionStatus !== 'Terminated'
			? 'Completed'
			: 'Terminated';

		document.removeEventListener('visibilitychange', () => { });
		document.removeEventListener('beforeunload', () => { });
		window.removeEventListener('beforeunload', () => { });
		window.removeEventListener('popstate', detectBackButtonCallback);
		enableCopyPasteCut();
		enableTextHighlighting();
		restoreRightClick();
		cleanupForceFullscreen();

		window.mereos.forceClosureTriggered = false;
		if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
			window.mereos.socket.send(JSON.stringify({ event: 'stopRecording', data: 'Web video recording stopped' }));
		}

		const chatIcons = document.querySelectorAll('[id="chat-icon"]');
		const chatContainer = document.getElementById('talkjs-container');
		const notificationBagde = document.getElementById('notification-badge');

		if (notificationBagde) {
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
			sessionStatus: finalSessionStatus,
		});

		cleanupZendeskWidget();

		window.mereos.recordingStart = false;
		window.mereos.sessionActive = false;
		window.mereos.pendingSessionStart = false;

		if (secureFeatures?.entities.filter(entity => recordingEvents.includes(entity.key))?.length > 0) {
			registerEvent({ eventType: 'success', notify: false, eventName: 'recording_stopped_successfully' });
		}

		if (secureFeatures?.entities?.filter(entity => LockDownOptions.includes(entity.key))?.length) {
			unlockBrowserFromContent();
		}

		await changeCandidateAssessmentStatus({
			status: finalSessionStatus,
			id: session?.candidate_assessment
		});

		registerEvent({
			eventType: 'success',
			notify: false,
			eventName: finalSessionStatus === 'Terminated' ? 'session_is_terminated' : 'session_completed',
		});

		showToast(
			finalSessionStatus === 'Terminated' ? 'error' : 'success',
			finalSessionStatus === 'Terminated' ? 'session_is_terminated' : 'session_completed'
		);

		return 'stop_recording';
	} catch (e) {
		if (window.mereos.startRecordingCallBack) {
			window.mereos.startRecordingCallBack({
				type: 'error',
				message: 'error_on_stop_recording',
				code: 40064,
			});
		}
		sentryExceptioMessage(e, { type: 'error', message: 'Error in stop recording' });
		logger.error('Error in stop recording:', e);
	} finally {
		window.mereos.isStoppingSession = false;
		await releaseAllMediaStreams({ force: true });
	}
};
