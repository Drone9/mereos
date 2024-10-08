import axios from '../utils/axios.js';

export const getProfile = async (params) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: `${token}`,
		},
		params: params
	};
	return axios.get('/profiles/candidate_profile/', config);
};
export const createProfile = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: token,
		},
	};
	return axios.post('/profiles/profile/', data, config);
};

export const editProfile = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.put('/profiles/profile/', data, config);
};

export const deleteProfile = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Basic ${token}`,
		},
	};
	return axios.delete(`/profiles/profile/?id=${id}`, config);
};