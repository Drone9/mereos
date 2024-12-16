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
import { socket } from './src/utils/socket';
import { startRecording, stopAllRecordings } from './src/StartRecording';
import { logonSchool } from './src/services/auth.services';
import { initialSessionData, preChecksSteps } from './src/utils/constant';
import { addSectionSessionRecord, convertDataIntoParse, findConfigs, getSecureFeatures, logger, updatePersistData } from './src/utils/functions';
import { createCandidateAssessment } from './src/services/assessment.services';
import { v4 } from 'uuid';
import 'notyf/notyf.min.css';
import { customCandidateAssessmentStatus } from './src/services/candidate-assessment.services';

async function init(credentials, candidateData, profileId, assessmentData, schoolTheme) {
	try{
		const logonResp = await logonSchool(credentials);
		if(logonResp.data){
			localStorage.setItem('mereosToken', logonResp.data.token);

			const resp = await createCandidate(candidateData);
			const updateData = {
				school:logonResp?.data?.school,
				candidate: resp?.data
			};

			localStorage.setItem('candidateAssessment',JSON.stringify(updateData));
			localStorage.setItem('session',JSON.stringify(initialSessionData));
			localStorage.setItem('preChecksSteps',JSON.stringify(preChecksSteps));
			localStorage.setItem('socketGroupId',JSON.stringify({ groupName:v4() }));
			localStorage.setItem('schoolTheme',schoolTheme ? JSON.stringify(schoolTheme):{});
			localStorage.setItem('conversationId',v4());
      
			const data = {
				'name': assessmentData?.name,
				'description': assessmentData?.description,
				'external_id': assessmentData?.id || 1,
				'course_id':assessmentData?.course_id,
				'others': {'test': 'value'}
			};
			const assessmentResp = await createCandidateAssessment(data);
			if (assessmentResp?.data) {
				const candidateAssessmentData = {
					status: 'Initiated',
					candidate: resp?.data?.id,
					assessment: assessmentResp?.data?.id,
					profile:profileId
				};
				const candidateAssessmentResp = await customCandidateAssessmentStatus(candidateAssessmentData);
				updatePersistData('session', {
					assessment: assessmentResp?.data,
					candidate:resp?.data?.id
				});
				localStorage.setItem('secureFeatures', JSON.stringify(candidateAssessmentResp?.data?.profile));
			}
			return logonResp.data;
		}
	}catch(e){
		logger.error('error',e);
	}
}

window.globalCallback = null;
async function start_prechecks(callback,setting) {
	window.globalCallback = callback;
	localStorage.setItem('precheckSetting',setting);
	openModal(callback);
}

window.startRecordingCallBack = null;
async function start_session(callback) {
	try {
		window.startRecordingCallBack = callback;
		const secureFeatures = getSecureFeatures();
		if(secureFeatures?.entities?.length > 0){
			const mobileRoomSessionId = v4();
			
			const newRoomSessionId = v4();
			if(findConfigs(['mobile_proctoring'], secureFeatures?.entities).length){
				let resp = await getRoomSid({ session_id: mobileRoomSessionId, auto_record: true });
				let mobileTwilioToken = await getToken({ room_sid: resp.data.room_sid });
				updatePersistData('session', {
					mobileRoomId:resp.data.room_sid,
					mobileRoomSessionId:mobileRoomSessionId
				});
	
				if (socket && socket.readyState === WebSocket.OPEN) {
					socket.send(JSON.stringify({ event: 'twilioToken', message: mobileTwilioToken?.data?.token }));
				}
			}

			const roomCreation = ['record_screen','record_audio','record_video','mobile_proctoring'];
			if(secureFeatures?.entities.filter(entity => roomCreation.includes(entity.key))?.length > 0){
				let resp = await getRoomSid({ session_id: newRoomSessionId, auto_record: true });
				let twilioToken = await getToken({ room_sid: resp.data.room_sid });
				if (twilioToken) {
					updatePersistData('session', {
						twilioToken:twilioToken.data.token,
						sessionId:newRoomSessionId
					});
				}
			}
			startRecording();
		}else {
			window.startRecordingCallBack({ message: 'recording_started_successfully' });
		}
	} catch (err) {
		callback({type: 'error', message: 'There is error in starting the session'});
	}       
}

async function stop_session(callback) {
	try {
		const stop_sessionResp  = await stopAllRecordings();
		if(stop_sessionResp === 'stop_recording'){
			const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
			const session = convertDataIntoParse('session');
			let resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);
			if (resp) {
				localStorage.removeItem('candidateAssessment');
				localStorage.removeItem('mereosToken');
				localStorage.removeItem('session');
				localStorage.removeItem('preChecksSteps');
				localStorage.removeItem('secureFeatures');
				localStorage.removeItem('schoolTheme');
				localStorage.removeItem('conversationId');
				localStorage.removeItem('precheckSetting');
				localStorage.removeItem('socketGroupId');

				callback({ type: 'success', message: 'session is finished successfully' });
			} else {
				throw 'session can\'t add';
			}
		}
	} catch(err) {
		logger.error(err);
		callback({type: 'error', message: 'There is error in stopping the session'});
	}
    
}

// window.mereos = {init, start_prechecks, start_session, stop_session};
export {init, start_prechecks, start_session, stop_session };
