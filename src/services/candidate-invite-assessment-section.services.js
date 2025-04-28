import axiosInstance from '../utils/axios.js';
import { authenticatedRequest } from '../utils/functions.js';

export const getCandidateInviteAssessmentSection = async (params) => {
	return authenticatedRequest(config => 
		axiosInstance.post(`assessment/public_candidate_invite_assessment_section/`,config),
	params
	);
};

export const changeCandidateInviteAssessmentSectionStatus = async (data) => {
	return authenticatedRequest(config => 
		axiosInstance.put(`assessment/public_candidate_invite_assessment_section/`,data,config),
	);
};
