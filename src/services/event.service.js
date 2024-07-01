import axios from '../utils/axios.js';
import { getAuthenticationToken } from '../utils/functions.js';

export const getAllEvents = async () => {
	const token = await getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.get(`/section_session/event/`, config);
};

export const createEvent = async (data) => {
	const token = await getAuthenticationToken();
	const config = {
		headers: {
			token: token,
		},
	};
	return axios.post('/section_session/post_event/', data, config);
};

export const editEvent = async (data) => {
	const token = await getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.put('/section_session/event/', data, config);
};

export const deleteEvent = async (id) => {
	const token = await getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.delete(`/section_session/event/?id=${id}`, config);
};