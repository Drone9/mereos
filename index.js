/** @license mereos v1.0.0
 * mereos.production.min.js
 *
 * Copyright (c) DT Education and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import axios from 'axios';
window.openModal = openModal;

import { openModal } from './src/ExamPrepreation/examPrechecks';
import { getRoomSid, getToken } from './src/services/twilio.services';
import { startRecording, stopAllRecordings } from './src/StartRecording/startRecording';
import { registerPublicCandidate } from './src/services/auth.services';
import { addSectionSessionRecord, convertDataIntoParse } from './src/utils/functions';
import { changeCandidateAssessmentStatus } from './src/services/candidate-assessment.services';
import { initialSessionData } from './src/utils/constant';

    async function init(host) {
        const resp = await registerPublicCandidate(host);
        localStorage.setItem('token', resp.data?.token);
        localStorage.setItem('candidateAssessment',JSON.stringify(resp.data?.candidate_invite_assessment_section));
        localStorage.setItem('session',JSON.stringify(initialSessionData))
        return resp.data;
    };
    
    async function start_prechecks(profile) {
        openModal();
        return
        try{
            const resp = await axios.get('https://corder-api.mereos.eu/profile/profile/', {
                profile: profile
            });
            if(resp){
                openModal();
            }
            // return resp;
        }catch(err){
            console.error(err);
            // throw err;
        }
        
    };
    
    async function start_recording() {
        try{
            const newDate = new Date();
            const newRoomSessionId = newDate.getTime();
            let resp = await getRoomSid({ session_id: newRoomSessionId, auto_record: true });
            let twilioToken = await getToken({ room_sid: resp.data.room_sid });
            console.log('twilioToken',twilioToken?.data?.token);
            if(twilioToken){
                startRecording(twilioToken?.data?.token);
            };
            // const resp = await axios.get('https://corder-api.mereos.eu/twilio/get_token');
            // return resp;
        }catch(err){
            console.log('error',err);
            // throw err;
        }
       
    };
    
    async function stop_recording(session) {
        try{
            const stop_recordingResp  = await stopAllRecordings();
            if(stop_recordingResp){
                return 'Recording Stops'
            }
            //     const resp = await axios.get('https://corder-api.mereos.eu/twilio/stop_recording');
            //     return resp;
        }catch(err){
            console.error(err);
        }
    }

    async function submit_session(session) {
        try{
            const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
            const session = convertDataIntoParse('session');
            let resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);
            if(resp){
                console.log('submit_session');
				let completedRes = await changeCandidateAssessmentStatus({id: candidateInviteAssessmentSection?.candidate_assessment?.assessment?.id, status: 'Completed'});
                if(completedRes){
                    localStorage.clear();
                }
            }
            return 
            // const resp = await axios.post('https://corder-api.mereos.eu/session/session', session);
            // return resp;
        }catch(err){
            console.error(err);
            // throw err;
        }
       
    }
    
    // window.mereos = {init, start_prechecks, start_recording, stop_recording};
    export {init, start_prechecks, start_recording, stop_recording, submit_session };

/******************************************* */