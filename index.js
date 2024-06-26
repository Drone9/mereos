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
import {v4} from 'uuid';

import { openModal } from './src/ExamPrepreation/examPrechecks';
import { getRoomSid, getToken } from './src/services/twilio.services';
import { startRecording } from './src/StartRecording/startRecording';
import { registerPublicCandidate } from './src/services/auth.services';
import { generateRandomData } from './src/utils/constant';
import { stopAllRecordings } from './src/StopRecording/stopRecording';

    async function init(host) {
        const resp = await registerPublicCandidate(generateRandomData());
        localStorage.setItem('token', resp.data?.token);
        localStorage.setItem('secureFeatures',JSON.stringify(resp.data?.candidate_invite_assessment_section?.section?.secure_feature_profile?.entity_relation));
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
            const newRoomSessionId = v4();
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
            throw err;
        }
       
    };
    
    async function stop_recording(session) {
        try{
            stopAllRecordings();
            return
            const sessionResp = await submit_session(session);
            if (sessionResp?.data) {
                const resp = await axios.get('https://corder-api.mereos.eu/twilio/stop_recording');
                return resp;
            } else {
                throw 'session data is incomplete';
            }
        }catch(err){
            console.error(err);
            throw err;
        }
        
    }

    async function submit_session(session) {
        try{
            const resp = await axios.post('https://corder-api.mereos.eu/session/session', session);
            return resp;
        }catch(err){
            console.error(err);
            throw err;
        }
       
    }
    
    // window.mereos = {init, start_prechecks, start_recording, stop_recording};
    export {init, start_prechecks, start_recording, stop_recording, submit_session };

/******************************************* */