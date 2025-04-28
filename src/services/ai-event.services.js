import axios from '../utils/axios.js';
import { getAuthenticationToken } from '../utils/functions.js';

export const getAllAiEvents = async () => {
	const mereosToken = getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${mereosToken}`,
		},
	};
	return axios.get(`/sessions/ai_event/`, config);
};

export const createAiEvent = async (data) => {
	const mereosToken = getAuthenticationToken();
	const config = {
		headers: {
			token: mereosToken,
		},
	};
	return axios.post('/sessions/candidate_ai_event/', data, config);
};

export const editAiEvent = async (data) => {
	const mereosToken = getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${mereosToken}`,
		},
	};
	return axios.put('/sessions/ai_event/', data, config);
};

export const deleteEvent = async (id) => {
	const mereosToken = getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Basic ${mereosToken}`,
		},
	};
	return axios.delete(`/sessions/ai_event/?id=${id}`, config);
};