import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export const registerPublicCandidate = async (data) => {
	return axios.post(`${BASE_URL}/candidate/register_candidate/`, data);
};