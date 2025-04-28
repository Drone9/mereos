import axios from '../utils/axios.js';
import { authenticatedRequest } from '../utils/functions.js';

export const createCandidateAssessment = async (data) => {
	return authenticatedRequest(config => 
		axios.post('/assessments/candidate_assessment/',data,config),
	);
};

export const updateCandidateAssessment = async (data) => {
	return authenticatedRequest(config => 
		axios.put('/assessments/candidate_assessment/',data,config),
	);
};