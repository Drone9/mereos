import axiosInstance from '../utils/axios.js';
import { getAuthenticationToken } from '../utils/functions.js';

export const changeCandidateAssessmentStatus = async (data) => {
	const token =  getAuthenticationToken();
	const config = {
		headers: {
			token: token,
		},
	};
	return axiosInstance.put('/candidate/change_candidate_assessment_status/', data, config);
};

export const customCandidateAssessmentStatus = async (data) => {
	const token =  getAuthenticationToken();
	const config = {
		headers: {
			token: token,
		},
	};
	return axiosInstance.post('/candidates/custom_candidate_assessment/', data, config);
};