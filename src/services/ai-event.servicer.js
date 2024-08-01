import axios from '../utils/axios.js';

export const getAllAiEvents = async () => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.get(`/sessions/ai_event/`, config);
};

export const createAiEvent = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: token,
		},
	};
	return axios.post('/sessions/candidate_ai_event/', data, config);
};

export const editAiEvent = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.put('/sessions/ai_event/', data, config);
};

export const deleteEvent = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.delete(`/sessions/ai_event/?id=${id}`, config);
};