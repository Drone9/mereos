import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export const getRoomSid = async (params) => {
	const token = localStorage.getItem('token');
	// let language = getPreferredLanguage();
	const config = {
		headers: {
			token: `${token}`,
		},
		params
	};
	return axios.get(`${BASE_URL}/twilio/create_room/`, config);
};

export const getToken = async (params) => {
  const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: `${token}`,
		},
		params
	};
	return axios.get(`${BASE_URL}/twilio/get-token/`, config);
};