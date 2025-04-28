import { getAuthenticationToken } from '../utils/functions';
import axios from '../utils/axios.js';

export const createCandidate = async (data) => {
	const mereosToken = getAuthenticationToken();
	const config = {
		headers: {
			token: mereosToken,
		},
	};
	return axios.post('/candidates/candidate_candidate/', data, config);
};