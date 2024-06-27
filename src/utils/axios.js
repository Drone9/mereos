import axios from 'axios';

import { BASE_URL, CONTENT_TYPE } from './constant';

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'content-type': CONTENT_TYPE.JSON,
	},
});

export default axiosInstance;
