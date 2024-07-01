export const ASSET_URL = '../assets/images'

export const BASE_URL = 'https://dashboard-api.mereos-datasafe.com'

export const CONTENT_TYPE = Object.freeze({
	JSON: 'application/json',
	FORM_DATA: 'multipart/form-data'
});

export const initialSessionData = {
	id: undefined,
	name: undefined,
	location: undefined,
	profilePhoto: undefined,
	candidatePhoto: undefined,
	identityCard: undefined,
	emailAddress: undefined,
	schoolId: undefined,
	sessionId: undefined,
	roomSessionId: undefined,
	recordingRoom: undefined,
	roomScanRecordings: '',
	cameraRecordings: [],
	audioRecordings: '',
	screenRecordings: [],
	sessionStartTime: 0,
	browserEvents: [],
	screenRecordingStream: undefined,
	sessionStatus: undefined,
	room_id:undefined,
	mobileRecordings:[],
	mobileAudios:[]
};