import axiosInstance from '../utils/axios.js';

export const changeCandidateAssessmentStatus = async (data) => {
	const token =  localStorage.getItem('token');
	const config = {
		headers: {
			token: token,
		},
	};
	return axiosInstance.put('/candidate/change_candidate_assessment_status/', data, config);
};