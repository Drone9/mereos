/** @license mereos v1.0.0
 * mereos.production.min.js
 *
 * Copyright (c) DT Education and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/
window.mereos = window.mereos || {};
import { addSectionSessionRecord, convertDataIntoParse, detectBrowser, detectBrowserActions, findConfigs, getSecureFeatures, getTimeInSeconds, handleBackendError, hideZendeskWidget, isMobileDevice, registerEvent, releaseAllMediaStreams, resetSessionAttemptFlags, sentryExceptioMessage, showToast, updatePersistData } from './src/utils/functions';
import { destroyPrechecksUi, initShadowDOM, openModal, startSession } from './src/ExamsPrechecks';
import { getRoomToken } from './src/services/twilio.services';
import { createCandidate } from './src/services/candidate.services';
import { startRecording, stopAllRecordings, cleanupSessionMediaMonitoring } from './src/StartRecording';
import { browserMinVersions, initialSessionData, preChecksSteps, tokenExpiredError } from './src/utils/constant';
import { createCandidateAssessment } from './src/services/assessment.services';
import { v4 } from 'uuid';
import { customCandidateAssessmentStatus } from './src/services/candidate-assessment.services';
import i18next from 'i18next';
import { initSentry } from './src/utils/sentry';
import * as Sentry from '@sentry/browser';

initSentry('production');

async function init(token, candidateData, profileId, assessmentData, schoolTheme, callback) {
	try {
		resetSessionAttemptFlags();
		destroyPrechecksUi();
		localStorage.clear();

		const checkMobile = isMobileDevice();
		if (checkMobile === 'mobile') {
			return callback({
				type: 'error',
				message: 'mobile_devices_are_not_supported_use_desktop',
				code: 40024,
			});
		}
		const info = detectBrowser();
		let detectedBrowser = { ...info };

		if (detectedBrowser?.browser.toLowerCase() === 'chrome' || detectedBrowser?.browser.toLowerCase() === 'edge' || detectedBrowser?.browser.toLowerCase() === 'firefox') {
			if (detectedBrowser.version && browserMinVersions[detectedBrowser.browser] && detectedBrowser.version < browserMinVersions[detectedBrowser.browser]) {
				return callback({
					type: 'error',
					message: 'your_browser_version_is_not_compatible',
					code: 40025,
					details: detectedBrowser
				});
			}
		}

		if (!token || typeof token !== 'string') {
			return callback({
				type: 'error',
				message: 'invalid_or_missing_token',
				code: 40020,
			});
		}

		localStorage.setItem('mereosToken', JSON.stringify({ token }));

		let resp;
		try {
			resp = await createCandidate(candidateData);
		} catch (error) {
			const message = handleBackendError(i18next.t, error?.response?.data?.message);
			sentryExceptioMessage(error, {
				type: 'error',
				message: error?.response?.data?.key === 'serialization_error' ? 'some_fields_are_wrong_or_data_is_incorrect' : message,
				code: 40021,
			});
			localStorage.removeItem('mereosToken');
			return callback({
				type: 'error',
				message: error?.response?.data?.key === 'serialization_error' ? 'some_fields_are_wrong_or_data_is_incorrect' : message,
				code: 40021,
				details: error,
			});
		}

		const updateData = {
			school: resp?.data?.school,
			candidate: resp?.data,
		};

		localStorage.setItem('candidateAssessment', JSON.stringify(updateData));
		localStorage.setItem('session', JSON.stringify(initialSessionData));
		localStorage.setItem('preChecksSteps', JSON.stringify(preChecksSteps));
		localStorage.setItem('socketGroupId', JSON.stringify({ groupName: v4() }));
		localStorage.setItem('schoolTheme', schoolTheme ? JSON.stringify(schoolTheme) : '{}');
		localStorage.setItem('conversationId', v4());

		const data = {
			name: assessmentData?.name,
			description: assessmentData?.description,
			external_id: assessmentData?.external_id,
			course_id: assessmentData?.course_id,
			others: { test: 'value' },
			branch: assessmentData?.branch
		};

		let assessmentResp;
		try {
			assessmentResp = await createCandidateAssessment(data);
		} catch (error) {
			const message = handleBackendError(i18next.t, error?.response?.data?.message);
			localStorage.removeItem('mereosToken');
			sentryExceptioMessage(error, {
				type: 'error',
				message: error?.response?.data?.key === 'serialization_error' ? 'some_fields_are_wrong_or_data_is_incorrect' : message,
				code: 40021,
				details: error,
			});
			return callback({
				type: 'error',
				message: error?.response?.data?.key === 'serialization_error' ? 'some_fields_are_wrong_or_data_is_incorrect' : message,
				code: 40021,
				details: error,
			});
		}

		if (assessmentResp?.data) {
			const candidateAssessmentData = {
				status: 'Initiated',
				candidate: resp?.data?.id,
				assessment: assessmentResp?.data?.id,
				profile: profileId,
			};

			let candidateAssessmentResp;
			try {
				candidateAssessmentResp = await customCandidateAssessmentStatus(candidateAssessmentData);
			} catch (error) {
				const message = handleBackendError(i18next.t, error?.response?.data?.message);
				localStorage.removeItem('mereosToken');
				sentryExceptioMessage(error, {
					type: 'error',
					message: error?.response?.data?.key === 'serialization_error' ? 'some_fields_are_wrong_or_data_is_incorrect' : message,
					code: 40021,
					details: error,
				});
				return callback({
					type: 'error',
					message: error?.response?.data?.key === 'serialization_error' ? 'some_fields_are_wrong_or_data_is_incorrect' : message,
					code: 40021,
					details: error,
				});
			}

			Sentry.setUser({ id: resp?.data?.id, email: resp?.data?.email, name: resp?.data?.name });

			updatePersistData('session', {
				candidate_assessment: candidateAssessmentResp?.data?.id,
				assessment: assessmentResp?.data,
				candidate: resp?.data?.id,
			});

			localStorage.setItem('secureFeatures', JSON.stringify(candidateAssessmentResp?.data?.profile));
		}

		callback({
			type: 'success',
			message: 'init_function_complete',
			code: 50004,
		});
	} catch (error) {
		sentryExceptioMessage(error, {
			type: 'error',
			message: 'Error in init function',
			code: 40022,
			details: error,
		});
		return callback({
			type: 'error',
			message: 'error_in_init_function',
			code: 40022,
			details: error,
		});
	}
}

async function start_prechecks(callback, setting) {
	try {
		window.mereos.globalCallback = callback;

		if (
			window.mereos?.sessionActive ||
			window.mereos?.recordingStart ||
			window.mereos?.pendingSessionStart ||
			window.mereos?.roomInstance
		) {
			return callback({
				type: 'error',
				message: 'session_already_in_progress',
				code: 40066,
			});
		}

		const tokenData = localStorage.getItem('mereosToken');
		if (!tokenData) {
			return callback(tokenExpiredError);
		}
		const { expiresAt } = JSON.parse(tokenData);
		if (expiresAt && Date.now() > expiresAt) {
			localStorage.removeItem('mereosToken');
			return callback(tokenExpiredError);
		}

		if (!setting) {
			localStorage.removeItem('navHistory');
		}

		localStorage.setItem('precheckSetting', setting);
		initShadowDOM();
		window.mereos.precheckCompleted = false;
		const savedData = await startSession();
		if (savedData === 'data_saved') {
			openModal(callback);
			return;
		}

		resetSessionAttemptFlags();
		destroyPrechecksUi();
	} catch (error) {
		resetSessionAttemptFlags();
		destroyPrechecksUi();
		showToast('error', 'error_in_prechecks_setup');
		sentryExceptioMessage(error, {
			type: 'error',
			message: 'Error in prechecks setup',
			code: 40000,
			details: error,
		});
		callback({
			type: 'error',
			message: 'error_in_prechecks_setup',
			code: 40000,
			details: error,
		});
	}
}

async function stop_prechecks(callback) {
	try {
		window.mereos.stopPrecheckCallBack = callback;
		const sessionSetting = localStorage.getItem('precheckSetting');

		await releaseAllMediaStreams();
		resetSessionAttemptFlags();

		if (sessionSetting !== 'session_resume') {
			localStorage.removeItem('preChecksSteps');
			localStorage.setItem('navHistory', JSON.stringify([]));
		}

		hideZendeskWidget();
		destroyPrechecksUi();

		if (typeof callback === 'function') {
			callback({
				type: 'success',
				message: 'prechecks_stopped',
				code: 50002
			});
		}
	} catch (error) {
		resetSessionAttemptFlags();
		destroyPrechecksUi();
		sentryExceptioMessage(error, {
			type: 'error',
			message: 'Error in stop prechecks',
			details: error,
			code: 40001
		});
		if (typeof callback === 'function') {
			callback({
				type: 'error',
				message: 'error_in_stop_prechecks',
				details: error,
				code: 40001
			});
		}
	}
}

/**
 * Starts the proctored exam session and notifies the LMS via callback.
 *
 * Flow:
 * 1. Store LMS callback → detectBrowserActions (navigation violations on active session)
 * 2. Validate token and prechecks
 * 3. If Twilio room already connected → success callback only
 * 4. Reset stale recordingStart flag from a prior failed attempt
 * 5. Preserve quizStartTime; on session_resume reuse stored Twilio tokens
 * 6. await startRecording() — final success/error callback fires inside that function
 */
async function start_session(callback) {
	/*
	 * LMS callback helper: always notify the integrator even if startRecordingCallBack
	 * was cleared elsewhere. Falls back to the callback argument passed into start_session.
	 */
	const invokeCallback = (payload) => {
		const cb = window.mereos.startRecordingCallBack || callback;
		if (typeof cb === 'function') {
			cb(payload);
		}
	};

	try {
		// Store callback for async paths inside startRecording (Twilio, media, etc.).
		window.mereos.startRecordingCallBack = callback;
		await detectBrowserActions();
		const secureFeatures = getSecureFeatures();
		const tokenData = localStorage.getItem('mereosToken');
		if (!tokenData) {
			return invokeCallback(tokenExpiredError);
		}
		const { expiresAt } = JSON.parse(tokenData);
		if (expiresAt && Date.now() > expiresAt) {
			localStorage.removeItem('mereosToken');
			return invokeCallback(tokenExpiredError);
		}
		const hasRecordScreen = findConfigs(['record_screen'], secureFeatures?.entities).length > 0;
		const hasMobileProctoring = findConfigs(['mobile_proctoring'], secureFeatures?.entities).length > 0;
		const screenShareStream = !window.mereos?.newStream;
		const notCompleted = !window.mereos?.precheckCompleted;
		const mobileStream = !window.mereos?.mobileStream;

		if (
			(hasRecordScreen && screenShareStream && notCompleted) ||
			(hasMobileProctoring && notCompleted && !mobileStream)
		) {
			updatePersistData('preChecksSteps', {
				mobileConnection: false,
				screenSharing: false
			});
			invokeCallback({
				type: 'error',
				message: 'please_complete_your_prechecks',
				code: 40019
			});
			return;
		}

		// Session already running — block duplicate start_session calls.
		if (window.mereos?.sessionActive) {
			invokeCallback({
				type: 'error',
				message: 'session_already_in_progress',
				code: 40066,
			});
			return;
		}

		/*
		 * recordingStart can remain true after a failed/interrupted attempt while roomInstance
		 * is null. Reset so the flow below can run again instead of exiting silently.
		 */
		if (window.mereos.recordingStart) {
			window.mereos.recordingStart = false;
		}

		window.mereos.recordingStart = true;
		const dateTime = new Date();
		const currentTimeInSeconds = Math.abs(getTimeInSeconds({ isUTC: true, inputDate: dateTime }));

		const previousSessionData = convertDataIntoParse('session') || {};
		// session_resume is set by start_prechecks(callback, 'session_resume') after reload/interruption.
		const sessionSetting = localStorage.getItem('precheckSetting');

		// Preserve quiz start time across resume; only set on first start.
		let quizStartTime = previousSessionData.quizStartTime;
		if (!quizStartTime || quizStartTime <= 0) {
			quizStartTime = currentTimeInSeconds;
		}

		updatePersistData('session', {
			quizStartTime: quizStartTime,
			lastUpdated: currentTimeInSeconds
		});

		if (secureFeatures?.entities?.length > 0) {
			const mobileRoomSessionId = v4();
			const newRoomSessionId = v4();
			/*
			 * On session_resume only: reuse Twilio tokens from localStorage instead of new rooms.
			 * Fresh starts always fetch new tokens below.
			 */
			const canReuseMobileToken = sessionSetting === 'session_resume' && previousSessionData.mobileTwilioToken;
			const canReuseTwilioToken = sessionSetting === 'session_resume' && previousSessionData.twilioToken;

			// Mobile proctoring room token
			if (findConfigs(['mobile_proctoring'], secureFeatures?.entities).length && !canReuseMobileToken) {
				try {
					const resp = await getRoomToken({ room_name: mobileRoomSessionId, identity: mobileRoomSessionId });
					const mobileTwilioToken = resp?.data?.token;

					updatePersistData('session', {
						mobileRoomId: resp.data.room_sid,
						mobileRoomSessionId: mobileRoomSessionId,
						mobileTwilioToken: mobileTwilioToken
					});

					if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
						window.mereos.socket.send(
							JSON.stringify({
								event: 'twilioToken',
								message: mobileTwilioToken,
							})
						);
					}
				} catch (err) {
					window.mereos.recordingStart = false;
					sentryExceptioMessage(err, {
						type: 'error',
						message: 'Error in mobile proctoring setup',
						details: err,
						code: 40002
					});
					invokeCallback({
						type: 'error',
						message: 'error_in_mobile_proctoring_setup',
						details: err,
						code: 40002
					});
					return;
				}
				// session_resume: re-send stored mobile token to the signaling socket.
			} else if (canReuseMobileToken && window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
				window.mereos.socket.send(
					JSON.stringify({
						event: 'twilioToken',
						message: previousSessionData.mobileTwilioToken,
					})
				);
			}

			const roomCreation = ['record_screen', 'record_audio', 'record_video', 'mobile_proctoring'];
			const needsWebRoom = secureFeatures?.entities.filter((entity) => roomCreation.includes(entity.key)).length > 0;
			// Web recording room token (skip fetch when resuming with stored token)
			if (needsWebRoom && !canReuseTwilioToken) {
				try {
					const resp = await getRoomToken({ room_name: newRoomSessionId, identity: newRoomSessionId });
					const twilioToken = resp?.data?.token;

					if (twilioToken) {
						updatePersistData('session', {
							twilioToken: twilioToken,
							sessionId: newRoomSessionId,
						});
						// No token in API response and none stored — cannot connect.
					} else if (!previousSessionData.twilioToken) {
						window.mereos.recordingStart = false;
						invokeCallback({
							type: 'error',
							message: 'error_in_web_room_creation',
							code: 40003,
							details: 'Twilio token missing from room creation response',
						});
						return;
					}
				} catch (err) {
					window.mereos.recordingStart = false;
					sentryExceptioMessage(err, {
						type: 'error',
						message: 'Error in web room creation',
						details: err,
						code: 40003
					});
					invokeCallback({
						type: 'error',
						message: 'error_in_web_room_creation',
						details: err,
						code: 40003
					});
					return;
				}
			}

			// Final guard before Twilio connect inside startRecording.
			if (needsWebRoom) {
				const sessionWithToken = convertDataIntoParse('session');
				if (!sessionWithToken?.twilioToken) {
					window.mereos.recordingStart = false;
					invokeCallback({
						type: 'error',
						message: 'error_in_web_room_creation',
						code: 40003,
						details: 'Twilio token is missing',
					});
					return;
				}
			}

			/*
			 * Await so errors propagate here and invokeCallback runs in the catch below.
			 * Success/error callbacks for recording also fire inside startRecording.
			 */
			await startRecording();
		} else {
			// No proctoring features — session starts immediately with success callback.
			invokeCallback({
				type: 'success',
				message: 'recording_started_successfully',
				code: 50000
			});
		}
	} catch (err) {
		// Allow retry after unexpected failure in this function.
		window.mereos.recordingStart = false;
		window.mereos.sessionActive = false;
		window.mereos.pendingSessionStart = false;
		console.log('err_________', err);
		showToast('error', 'error_in_starting_the_session');
		if (typeof registerEvent !== 'undefined' && typeof registerEvent === 'function') {
			registerEvent({
				eventType: 'success',
				notify: false,
				eventName: 'error_starting_session',
			});
		}
		sentryExceptioMessage(err, {
			type: 'error',
			message: 'Error in starting the session',
			details: err,
			code: 40004
		});
		invokeCallback({
			type: 'error',
			message: 'error_in_starting_the_session',
			details: err,
			code: 40004
		});
	}
}

async function stop_session(callback) {
	try {
		window.mereos.isStoppingSession = true;
		window.mereos.isReleasingMedia = true;
		window.mereos.sessionActive = false;
		window.mereos.recordingStart = false;
		cleanupSessionMediaMonitoring();
		await releaseAllMediaStreams({ force: true });

		if (window.mereos.checkTokenInterval) {
			clearInterval(window.mereos.checkTokenInterval);
			window.mereos.checkTokenInterval = null;
		}
		window.mereos.stopRecordingCallBack = callback;
		const tokenData = localStorage.getItem('mereosToken');
		if (!tokenData) {
			return callback(tokenExpiredError);
		}
		const { expiresAt } = JSON.parse(tokenData);
		if (expiresAt && Date.now() > expiresAt) {
			localStorage.removeItem('mereosToken');
			return callback(tokenExpiredError);
		}
		const stopSessionResp = await stopAllRecordings();

		if (stopSessionResp === 'stop_recording') {
			const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
			const session = convertDataIntoParse('session');

			const resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);

			if (resp) {
				const keysToRemove = [
					'candidateAssessment', 'mereosToken', 'session', 'preChecksSteps',
					'secureFeatures', 'schoolTheme', 'conversationId', 'precheckSetting',
					'socketGroupId', 'navHistory', 'deviceId', 'microphoneID',
				];
				keysToRemove.forEach((key) => localStorage.removeItem(key));

				callback({
					type: 'success',
					message: 'session_finished_successfully',
					code: 50003
				});
			} else {
				throw new Error('Session can\'t be added');
			}
		} else {
			throw 'session can\'t add';
		}
	} catch (err) {
		sentryExceptioMessage(err, {
			type: 'error',
			message: 'Error in stopping the session',
			code: 40016
		});
		callback({
			type: 'error',
			message: 'error_in_stopping_the_session',
			code: 40016
		});
	} finally {
		window.mereos.isStoppingSession = false;
	}
}

// window.mereos.mereos = {init, start_prechecks, start_session, stop_session};
export { init, start_prechecks, stop_prechecks, start_session, stop_session };
