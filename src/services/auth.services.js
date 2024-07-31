import axiosInstance from '../utils/axios';

export const registerPublicCandidate = async (data) => {
	return axiosInstance.post(`/auth/register/`, data);
};