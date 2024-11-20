import axiosInstance from '../utils/axios';

export const logonSchool = async (data) => {
	return axiosInstance.post(`/auth/logon/`, data);
};