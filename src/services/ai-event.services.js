import axios from '../utils/axios.js';
import { authenticatedRequest } from '../utils/functions.js';

export const getAllAiEvents = async () => {
	return authenticatedRequest(config => 
		axios.get(`/sessions/ai_event/`, config)
	);
};

export const createAiEvent = async (data) => {
	return authenticatedRequest(config => 
		axios.post(`/sessions/candidate_ai_event/`, data,config)
	);
};

export const editAiEvent = async (data) => {
	return authenticatedRequest(config => 
		axios.put(`/sessions/ai_event/`, data,config)
	);
};

export const deleteEvent = async (id) => {
	return authenticatedRequest(config => 
		axios.delete(`/sessions/ai_event/?id=${id}`,config)
	);
};

export const bulkRegisterAIEvents = async (data) => {
	return authenticatedRequest(config => 
		axios.post(`/sessions/candidate_bulk_ai_events/`,data,config)
	);
};