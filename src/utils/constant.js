export const ASSET_URL = '../assets/images'

export const BASE_URL = 'https://corder-api.mereos.eu'

export const CONTENT_TYPE = Object.freeze({
	JSON: 'application/json',
	FORM_DATA: 'multipart/form-data'
});

export const initialSessionData = {
		start_time: null,
		submission_time: null,
		duration_taken: 0,
		identity_card: null,
		identity_photo: null,
		school: null,
		assessment: null,
		candidate: null,
		user_video_name:  [],
		audio_recordings: [],
		screen_sharing_video_name: [],
		roomscan_recordings: [],
		session_id: null,
		collected_details: null,
		video_codec: null,
		video_extension: null,
		archive_id:null,
		attempt_id:null
};

export const preChecksSteps = {
	examPreparation:false,
	diagnosticStep:false,
	preValidation:false,
	userPhoto:false,
	identityCardPhoto:false,
	audioDetection:false,
	roomScanningVideo:false,
	screenSharing:false,
	examIndication:false,
	examPrechecks:false,
	mobileConnection:false,
};