import axios from '../utils/axios.js';
import { authenticatedRequest } from '../utils/functions.js';

export const getAllEvents = async () => {
	return authenticatedRequest(config => 
		axios.get(`/section_session/event/`, config)
	);
};

export const createEvent = async (data) => {
	return authenticatedRequest(config => 
		axios.post(`/sessions/candidate_event/`, data,config)
	);
};

export const editEvent = async (data) => {
	return authenticatedRequest(config => 
		axios.put(`/section_session/event/`, data,config)
	);
};

export const deleteEvent = async (id) => {
	return authenticatedRequest(config => 
		axios.delete(`/section_session/event/?id=${id}`,config)
	);
};