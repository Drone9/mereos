import axiosInstance from '../utils/axios';
import { getAuthenticationToken } from '../utils/functions';

export const testUploadSpeed = async (data) => {
	const mereosToken = getAuthenticationToken();
	const config = {
		headers: {
			token: mereosToken,
		},
	};
	return axiosInstance.post('/general/info/', data, config);
};

export const uploadFileInS3Folder = async (data) => {
	const token = getAuthenticationToken();
	
	const formData = new FormData();
	formData.append('files', data.file, `${Date.now()}`);
	formData.append('folder_name',data.folderName);

	const config = {
		headers: {
			token: token,
			'Content-Type': 'multipart/form-data',
		},
	};
	return axiosInstance.post(`/general/candidate_upload_file/`, formData,config);
};