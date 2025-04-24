import axios from 'axios';
import { BASE_URL, CONTENT_TYPE } from './constant';

const createTokenExpiredError = () => ({
	type: 'error',
	message: 'token_expired_login_again_to_perform_this_action',
	code: 40024,
	details: 'Authentication token has expired'
});

const callbackKeys = [
	'globalCallback',
	'startRecordingCallBack',
	'stopRecordingCallBack',
	'stopPrecheckCallBack'
];

export const notifyTokenExpired = () => {
	const errorObj = createTokenExpiredError();
  
	callbackKeys.forEach(callbackKey => {
		if (typeof window[callbackKey] === 'function') {
			window[callbackKey](errorObj);
		}
	});
};

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'content-type': CONTENT_TYPE.JSON,
	},
});

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem('mereosToken');
			notifyTokenExpired();
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;