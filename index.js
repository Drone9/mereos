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

    async function init(host) {
        const formData = new FormData();
        formData.append('email', host.username);
        formData.append('password', host.password);

        const resp = await axios.post('https://dashboard-api.mereos-datasafe.com/auth/token/',  formData);
        localStorage.setItem('token', resp.data?.access);
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
            const resp = await axios.get('https://corder-api.mereos.eu/twilio/get_token');
            return resp;
        }catch(err){
            console.log('error',err);
            throw err;
        }
       
    };
    
    async function stop_recording(session) {
        try{
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