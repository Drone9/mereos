import axiosInstance from '../utils/axios';


export const addSectionSession = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: token,
		},
	};
	return axiosInstance.post('/section_session/get_or_create_section_session/', data, config);
};

export const editSectionSession = async (data) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			token: token,
		},
	};
	return axiosInstance.put('/section_session/candidate_edit_section_session/', data, config);
};