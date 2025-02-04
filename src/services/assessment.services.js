import axios from '../utils/axios.js';
import { getAuthenticationToken } from '../utils/functions.js';

export const createCandidateAssessment = async (data) => {
	const mereosToken = getAuthenticationToken();
	const config = {
		headers: {
			token: mereosToken,
		},
	};
	return axios.post('/assessments/candidate_assessment/', data, config);
};

export const updateCandidateAssessment = async (data) => {
	const mereosToken = getAuthenticationToken();
	const config = {
		headers: {
			token: mereosToken,
		},
	};
	return axios.put('/assessments/candidate_assessment/', data, config);
};