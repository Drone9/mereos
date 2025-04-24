import axios from '../utils/axios.js';
import { authenticatedRequest } from '../utils/functions.js';

export const getProfile = async (params) => {
	return authenticatedRequest(config => 
		axios.get('/profiles/candidate_profile/',config),
	params
	);
};

export const createProfile = async (data) => {
	return authenticatedRequest(config => 
		axios.post('/profiles/profile/',data,config),
	);
};

export const editProfile = async (data) => {
	return authenticatedRequest(config => 
		axios.put('/profiles/profile/',data,config),
	);
};

export const deleteProfile = async (id) => {
	return authenticatedRequest(config => 
		axios.delete(`/profiles/profile/?id=${id}`,config),
	);
};