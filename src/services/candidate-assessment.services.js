import axiosInstance from '../utils/axios.js';
import { authenticatedRequest } from '../utils/functions.js';

export const changeCandidateAssessmentStatus = async (data) => {
	return authenticatedRequest(config => 
		axiosInstance.put('/candidates/custom_candidate_assessment/',data,config)
	);
};

export const customCandidateAssessmentStatus = async (data) => {
	return authenticatedRequest(config => 
		axiosInstance.post('/candidates/custom_candidate_assessment/',data,config)
	);
};