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
import { addSectionSessionRecord, convertDataIntoParse, updatePersistData } from './src/utils/functions';
import { changeCandidateAssessmentStatus } from './src/services/candidate-assessment.services';
import { initialSessionData, preChecksSteps } from './src/utils/constant';
import { getProfile } from './src/services/profile.services';
import { createCandidateAssessment } from './src/services/assessment.services';

async function init(host,profileId,assessmentData) {
	try{
		const resp = await registerPublicCandidate(host);
		if(resp.data){
			localStorage.setItem('mereosToken', resp.data.token);
			localStorage.setItem('candidateAssessment',JSON.stringify(resp.data.user_data));
			localStorage.setItem('session',JSON.stringify(initialSessionData));
			localStorage.setItem('preChecksSteps',JSON.stringify(preChecksSteps));
      
			const data = {
				'name': assessmentData?.name,
				'description': assessmentData?.description,
				'external_id': assessmentData?.id,
				'course_id':assessmentData?.course_id,
				'others': {'test': 'value'}
			};
			const assessmentResp = await createCandidateAssessment(data);
			if(assessmentResp?.data){
				updatePersistData('session', {
					assessment: assessmentResp?.data,
				});
				const profileResp = await getProfile({ id:profileId });
				localStorage.setItem('secureFeatures',JSON.stringify(profileResp.data));
				console.log('profileResp',profileResp);
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
async function start_recording(callback) {
	try{
		window.startRecordingCallBack = callback;
		const newDate = new Date();
		const newRoomSessionId = newDate.getTime();
		let resp = await getRoomSid({ session_id: newRoomSessionId, auto_record: true });
		let twilioToken = await getToken({ room_sid: resp.data.room_sid });
		if(twilioToken){
			startRecording(twilioToken.data.token,callback);
		}
	}catch(err){
		console.log('error',err);
	}       
}

async function stop_recording() {
	try{
		const stop_recordingResp  = await stopAllRecordings();
		if(stop_recordingResp){
			return {message:'recording_stopped'};
		}
	}catch(err){
		console.error(err);
	}
}

async function submit_session() {
	try{
		const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
		const session = convertDataIntoParse('session');
		let resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);
		if(resp){
			console.log('submit_session');
			let completedRes = await changeCandidateAssessmentStatus({id: candidateInviteAssessmentSection.candidate_assessment.assessment.id, status: 'Completed'});
			if(completedRes){
				localStorage.removeItem('candidateAssessment');
				localStorage.removeItem('mereosToken');
				localStorage.removeItem('session');
				localStorage.removeItem('preChecksSteps');
				localStorage.removeItem('secureFeatures');
			}
		}
		return;
	}catch(err){
		console.error(err);
	}
    
}

// window.mereos = {init, start_prechecks, start_recording, stop_recording};
export {init, start_prechecks, start_recording, stop_recording, submit_session };
