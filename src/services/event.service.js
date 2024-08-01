import axios from '../utils/axios.js';

export const getAllEvents = async () => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.get(`/section_session/event/`, config);
};

export const createEvent = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.post('/sessions/candidate_event/', data, config);
};

export const editEvent = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.put('/section_session/event/', data, config);
};

export const deleteEvent = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.delete(`/section_session/event/?id=${id}`, config);
};