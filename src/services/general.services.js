import axiosInstance from '../utils/axios';
import { authenticatedRequest } from '../utils/functions';

export const testUploadSpeed = async (data) => {
	return authenticatedRequest(config => 
		axiosInstance.post('/general/info/',data,config)
	);
};

export const uploadFileInS3Folder = async (data) => {
	const formData = new FormData();
	formData.append('files', data.file, `${Date.now()}`);
	formData.append('folder_name',data.folderName);

	return authenticatedRequest(config => {
		const uploadConfig = {
			...config,
			headers: {
				...config.headers,
				'Content-Type': 'multipart/form-data',
			}
		};
    
		return axiosInstance.post(`/general/candidate_upload_file/`, formData, uploadConfig);
	});
};