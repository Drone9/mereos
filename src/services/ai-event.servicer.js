import axios from '../utils/axios.js';
import { getAuthenticationToken } from '../utils/functions.js';

export const getAllAiEvents = async () => {
	const token = getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.get(`/section_session/ai_event/`, config);
};

export const createAiEvent = async (data) => {
	const token = getAuthenticationToken();
	const config = {
		headers: {
			token: token,
		},
	};
	return axios.post('/section_session/post_ai_events/', data, config);
};

export const editAiEvent = async (data) => {
	const token = getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.put('/section_session/ai_event/', data, config);
};

export const deleteEvent = async (id) => {
	const token = getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
			'm-preferred-language': language
		},
	};
	return axios.delete(`/section_session/ai_event/?id=${id}`, config);
};