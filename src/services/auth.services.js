import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export const registerPublicCandidate = async (data) => {
	return axios.post(`${BASE_URL}/auth/register/`, data);
};