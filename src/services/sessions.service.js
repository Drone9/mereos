import axiosInstance from '../utils/axios';

export const addSectionSession = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: token,
		},
	};
	return axiosInstance.post('/sessions/candidate_session/', data, config);
};

export const editSectionSession = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: token,
		},
	};
	return axiosInstance.put('/sessions/candidate_session/', data, config);
};