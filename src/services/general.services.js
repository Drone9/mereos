import axiosInstance from '../utils/axios';
import { getAuthenticationToken } from '../utils/functions';

export const testUploadSpeed = async (data) => {
	const mereosToken = getAuthenticationToken();
	const config = {
		headers: {
			token: mereosToken,
		},
	};
	return axiosInstance.post('/general/info/', data, config);
};
