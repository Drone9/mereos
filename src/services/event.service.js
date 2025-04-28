import axios from '../utils/axios.js';
import { getAuthenticationToken } from '../utils/functions.js';

export const getAllEvents = async () => {
	const token = getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.get(`/section_session/event/`, config);
};

export const createEvent = async (data) => {
	const token = getAuthenticationToken();
	const config = {
		headers: {
			token: token,
		},
	};
	return axios.post('/sessions/candidate_event/', data, config);
};

export const editEvent = async (data) => {
	const token = getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.put('/section_session/event/', data, config);
};

export const deleteEvent = async (id) => {
	const token = getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.delete(`/section_session/event/?id=${id}`, config);
};