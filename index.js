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
import { addSectionSessionRecord, convertDataIntoParse } from './src/utils/functions';
import { changeCandidateAssessmentStatus } from './src/services/candidate-assessment.services';
import { initialSessionData, preChecksSteps } from './src/utils/constant';
import { getProfile } from './src/services/profile.services';

async function init(host,profileId) {
	try{
		const resp = await registerPublicCandidate(host);
		if(resp.data){
			localStorage.setItem('token', resp.data.token);
			localStorage.setItem('candidateAssessment',JSON.stringify(resp.data.user_data));
			localStorage.setItem('session',JSON.stringify(initialSessionData));
			localStorage.setItem('preChecksSteps',JSON.stringify(preChecksSteps));
        
			const profileResp = await getProfile({id:profileId});
			localStorage.setItem('secureFeatures',JSON.stringify(profileResp.data));
			console.log('profileResp',profileResp);
			return resp.data;
		}
	}catch(e){
		console.error('error',e);
	}
}
    
async function start_prechecks(callback) {
	console.log('Callback received in start_prechecks:', callback);
	openModal(callback);
}

async function start_recording() {
	try{
		const newDate = new Date();
		const newRoomSessionId = newDate.getTime();
		let resp = await getRoomSid({ session_id: newRoomSessionId, auto_record: true });
		let twilioToken = await getToken({ room_sid: resp.data.room_sid });
		if(twilioToken){
			startRecording(twilioToken.data.token);
		}
	}catch(err){
		console.log('error',err);
	}       
}

async function stop_recording() {
	try{
		const stop_recordingResp  = await stopAllRecordings();
		if(stop_recordingResp){
			return 'Recording Stops';
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
				localStorage.clear();
			}
		}
		return;
		// const resp = await axios.post('https://corder-api.mereos.eu/session/session', session);
		// return resp;
	}catch(err){
		console.error(err);
		// throw err;
	}
    
}

// window.mereos = {init, start_prechecks, start_recording, stop_recording};
export {init, start_prechecks, start_recording, stop_recording, submit_session };
