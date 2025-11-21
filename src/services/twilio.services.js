import axiosInstance from '../utils/axios';
import { authenticatedRequest } from '../utils/functions';

export const getRoomSid = async (params) => {
	return authenticatedRequest(config => 
		axiosInstance.get('/twilio/create_room/',config),
	params
	);
};

export const getRecordings = async (params) => {
	return authenticatedRequest(config => 
		axiosInstance.get('/twilio/get_recordings_sid/',config),
	params
	);
};

export const getToken = async (params) => {
	return authenticatedRequest(config => 
		axiosInstance.get('/twilio/get-token/',config),
	params
	);
};

export const getRecordingSid = async (data) => {
	return authenticatedRequest(config => 
		axiosInstance.post('/twilio/get_SID/',data,config)
	);
};

export const getCreateRoom = async (data) => {
	return authenticatedRequest(config => 
		axiosInstance.post('/twilio/candidate_get_create_room/',data,config)
	);
};


export const fetchIceServers = async () => {
	return authenticatedRequest(config => 
		axiosInstance.get('/twilio/fetch_ice_servers/',config)
	);
};