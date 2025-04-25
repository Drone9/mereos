import axiosInstance from '../utils/axios';
import { authenticatedRequest } from '../utils/functions';

export const addSectionSession = async (data) => {
	return authenticatedRequest(config => 
		axiosInstance.post('/sessions/candidate_session/',data,config),
	);
};

export const editSectionSession = async (data) => {
	return authenticatedRequest(config => 
		axiosInstance.put('/sessions/candidate_session/',data,config),
	);
};