import axiosInstance from '../utils/axios';

export const getRoomSid = async (params) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: `${token}`,
		},
		params
	};
	return axiosInstance.get(`/twilio/create_room/`, config);
};

export const getToken = async (params) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: `${token}`,
		},
		params
	};
	return axiosInstance.get(`/twilio/get-token/`, config);
};

export const getRecordingSid = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: `${token}`,
		}
	};
	return axiosInstance.post(`/twilio/get_SID/`, data, config);
};
