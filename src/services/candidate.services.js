import { authenticatedRequest } from '../utils/functions';
import axios from '../utils/axios.js';

export const createCandidate = async (data) => {
	return authenticatedRequest(config => 
		axios.post('/candidates/candidate_candidate/',data,config)
	);
};