/** @license mereos v1.0.0
 * mereos.production.min.js
 *
 * Copyright (c) DT Education and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

window.openModal = openModal;

import { openModal } from './src/ExamPrepreation/examPrechecks';
import { getRoomSid, getToken } from './src/services/twilio.services';
import { startRecording, stopAllRecordings } from './src/StartRecording/startRecording';
import { registerPublicCandidate } from './src/services/auth.services';
import { addSectionSessionRecord, convertDataIntoParse, findConfigs, getSecureFeatures, updatePersistData } from './src/utils/functions';
import { defaultTheme, initialSessionData, preChecksSteps } from './src/utils/constant';
import { getProfile } from './src/services/profile.services';
import { createCandidateAssessment } from './src/services/assessment.services';
import socket from './src/utils/socket';
import { v4 } from 'uuid';

async function init(host, profileId, assessmentData,schoolTheme) {
	try{
		const resp = await registerPublicCandidate(host);
		if(resp.data){
			localStorage.setItem('mereosToken', resp.data.token);
			localStorage.setItem('candidateAssessment',JSON.stringify(resp.data.user_data));
			localStorage.setItem('session',JSON.stringify(initialSessionData));
			localStorage.setItem('preChecksSteps',JSON.stringify(preChecksSteps));
			if(schoolTheme){
				localStorage.setItem('schoolTheme',JSON.stringify(schoolTheme));
			}else{
				localStorage.setItem('schoolTheme',JSON.stringify(defaultTheme));
			}
      
			const data = {
				'name': assessmentData?.name,
				'description': assessmentData?.description,
				'external_id': assessmentData?.id || 1,
				'course_id':assessmentData?.course_id,
				'others': {'test': 'value'}
			};
			const assessmentResp = await createCandidateAssessment(data);
			if (assessmentResp?.data) {
				updatePersistData('session', {
					assessment: assessmentResp?.data,
				});
				const profileResp = await getProfile({id: profileId });
				localStorage.setItem('secureFeatures', JSON.stringify(profileResp.data));
				console.log('profileResp', profileResp);
			}
			return resp.data;
		}
	}catch(e){
		console.error('error',e);
	}
}

window.globalCallback = null;
async function start_prechecks(callback) {
	window.globalCallback = callback;
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
					console.log('in the socket if condition',mobileTwilioToken?.data?.token);
					socket.send(JSON.stringify({ event: 'twilioToken', message: mobileTwilioToken?.data?.token }));
				}
			}
			let resp = await getRoomSid({ session_id: newRoomSessionId, auto_record: true });
			let twilioToken = await getToken({ room_sid: resp.data.room_sid });
			if (twilioToken) {
				startRecording(twilioToken.data.token);
			}
		}else {
			window.startRecordingCallBack({ message: 'recording_started_successfully' });
		}
	} catch (err) {
		console.log('error',err); 
		callback({type: 'error', message: 'There is error in starting the session'});
	}       
}

async function stop_session(callback) {
	try {
		const stop_sessionResp  = await stopAllRecordings();
		console.log('stop_sessionResp',stop_sessionResp);
		if(stop_sessionResp === 'stop_recording'){
			const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
			const session = convertDataIntoParse('session');
			let resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);
			if (resp) {
				console.log('submit_session');
				localStorage.removeItem('candidateAssessment');
				localStorage.removeItem('mereosToken');
				localStorage.removeItem('session');
				localStorage.removeItem('preChecksSteps');
				localStorage.removeItem('secureFeatures');
				callback({ type: 'success', message: 'session is finished successfully' });
			} else {
				throw 'session can\'t add';
			}
		}
	} catch(err) {
		console.error(err);
		callback({type: 'error', message: 'There is error in stopping the session'});
	}
    
}

// window.mereos = {init, start_prechecks, start_session, stop_session};
export {init, start_prechecks, start_session, stop_session };
