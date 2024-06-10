/** @license mereos v1.0.0
 * mereos.production.min.js
 *
 * Copyright (c) DT Education and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

"use strict";
(function () {
    var axios = require('axios');
    async function init(host) {
        const resp = await axios.post('https://corder-api.mereos.eu/auth/register/', {
            host: host
        })
        return resp.data;
    };
    
    async function start_prechecks(profile) {
        const resp = await axios.get('https://corder-api.mereos.eu/profile/profile/', {
            profile: profile
        });

        return resp;
    };
    
    async function start_recording() {
        const resp = await axios.get('https://corder-api.mereos.eu/twilio/get_token');
        return resp;
    };
    
    async function stop_recording(session) {
        const sessionResp = await submit_session(session);
        if (sessionResp?.data) {
            const resp = await axios.get('https://corder-api.mereos.eu/twilio/stop_recording');
            return resp;
        } else {
            throw 'session data is incomplete';
        }
    }

    async function submit_session(session) {
        const resp = await axios.post('https://corder-api.mereos.eu/session/session', session);
        return resp;
    }
    
    // window.mereos = {init, start_prechecks, start_recording, stop_recording};
    module.exports = {init, start_prechecks, start_recording, stop_recording};
})();

/******************************************* */