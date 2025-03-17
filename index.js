/** @license mereos v1.0.0
 * mereos.production.min.js
 *
 * Copyright (c) DT Education and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

window.openModal = openModal;

import { openModal } from './src/ExamsPrechecks';
import { getRoomSid, getToken } from './src/services/twilio.services';
import { createCandidate } from './src/services/candidate.services'; 
import { startRecording, stopAllRecordings } from './src/StartRecording';
import { logonSchool } from './src/services/auth.services';
import { initialSessionData, preChecksSteps } from './src/utils/constant';
import { addSectionSessionRecord, convertDataIntoParse, findConfigs, getSecureFeatures, logger, updatePersistData } from './src/utils/functions';
import { createCandidateAssessment } from './src/services/assessment.services';
import { v4 } from 'uuid';
import 'notyf/notyf.min.css';
import { customCandidateAssessmentStatus } from './src/services/candidate-assessment.services';

async function init(credentials, candidateData, profileId, assessmentData, schoolTheme) {
	try {
		const logonResp = await logonSchool(credentials);

		if (logonResp.data) {
			const token = logonResp.data.token;
			const expiresInDays = 7;
			const expiresAt = Date.now() + expiresInDays * 24 * 60 * 60 * 1000;
				
			localStorage.setItem('mereosToken', JSON.stringify({ token, expiresAt }));

			const resp = await createCandidate(candidateData);
			const updateData = {
				school: logonResp?.data?.school,
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
				external_id: assessmentData?.id || 1,
				course_id: assessmentData?.course_id,
				others: { test: 'value' },
			};
				
			const assessmentResp = await createCandidateAssessment(data);

			if (assessmentResp?.data) {
				const candidateAssessmentData = {
					status: 'Initiated',
					candidate: resp?.data?.id,
					assessment: assessmentResp?.data?.id,
					profile: profileId,
				};

				const candidateAssessmentResp = await customCandidateAssessmentStatus(candidateAssessmentData);
				updatePersistData('session', {
					candidate_assessment: candidateAssessmentResp?.data?.id,
					assessment: assessmentResp?.data,
					candidate: resp?.data?.id,
				});

				localStorage.setItem('secureFeatures', JSON.stringify(candidateAssessmentResp?.data?.profile));
			}

			return logonResp.data;
		}
	} catch (error) {
		logger.error('Error in init:', error);
	}
}

window.globalCallback = null;
async function start_prechecks(callback,setting) {
	try {
		window.globalCallback = callback;
		localStorage.setItem('precheckSetting', setting);
		openModal(callback);
	} catch (error) {
		logger.error('Error in start_prechecks:', error);
		callback({
			type: 'error',
			message: 'Error in prechecks setup',
			details: error,
		});
	}
}

window.startRecordingCallBack = null;
async function start_session(callback) {
	try {
		window.startRecordingCallBack = callback;
		const secureFeatures = getSecureFeatures();
		if (secureFeatures?.entities?.length > 0) {
			const mobileRoomSessionId = v4();
			const newRoomSessionId = v4();

			if (findConfigs(['mobile_proctoring'], secureFeatures?.entities).length) {
				try {
					const resp = await getRoomSid({ session_id: mobileRoomSessionId, auto_record: true });
					const mobileTwilioToken = await getToken({ room_sid: resp.data.room_sid });

					updatePersistData('session', {
						mobileRoomId: resp.data.room_sid,
						mobileRoomSessionId: mobileRoomSessionId,
					});

					if (window.socket && window.socket.readyState === WebSocket.OPEN) {
						window.socket.send(
							JSON.stringify({
								event: 'twilioToken',
								message: mobileTwilioToken?.data?.token,
							})
						);
					}
				} catch (err) {
					if(window.startRecordingCallBack){
						window.startRecordingCallBack({
							type: 'error',
							message: 'Error in mobile proctoring setup',
							details: err,
						});
					}
					return;
				}
			}

			const roomCreation = ['record_screen', 'record_audio', 'record_video', 'mobile_proctoring'];
			if (secureFeatures?.entities.filter((entity) => roomCreation.includes(entity.key)).length > 0) {
				try {
					const resp = await getRoomSid({ session_id: newRoomSessionId, auto_record: true });
					const twilioToken = await getToken({ room_sid: resp.data.room_sid });

					if (twilioToken) {
						updatePersistData('session', {
							twilioToken: twilioToken.data.token,
							sessionId: newRoomSessionId,
						});
					}
				} catch (err) {
					window.startRecordingCallBack({
						type: 'error',
						message: 'Error in room creation',
						details: err,
					});
					return;
				}
			}

			startRecording();
		} else {
			window.startRecordingCallBack({ message: 'recording_started_successfully' });
		}
	} catch (err) {
		callback({
			type: 'error',
			message: 'There was an error in starting the session',
			details: err,
		});
	}
}

async function stop_session(callback) {
	try {
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

				callback({ type: 'success', message: 'session_is_finished_successfully' });
			} else {
				throw new Error('Session can\'t be added');
			}
		} else {
			throw 'session can\'t add';
		}
	} catch (err) {
		logger.error(err);
		callback({type: 'error', message: 'There is error in stopping the session'});
	}
}


// window.mereos = {init, start_prechecks, start_session, stop_session};
export {init, start_prechecks, start_session, stop_session };
