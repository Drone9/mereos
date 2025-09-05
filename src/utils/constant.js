export const ASSET_URL = 'https://mereos-corder.s3.eu-west-3.amazonaws.com/library_icons';

export const BASE_URL = 'https://corder-api.mereos.eu/v1.1.1';

export const SOCKET_URL = 'wss://mobile-socket.mereos.eu/websocket/';

export const CONTENT_TYPE = Object.freeze({
	JSON: 'application/json',
	FORM_DATA: 'multipart/form-data'
});

export const initialSessionData = {
	aiEvents:[],
	browserEvents:[],
	start_time: null,
	submission_time: null,
	duration_taken: 0,
	identity_card: null,
	identity_photo: null,
	school: null,
	assessment: null,
	candidate: null,
	user_video_name:  [],
	user_audio_name: [],
	screen_sharing_video_name: [],
	roomscan_recordings: [],
	sessionId: null,
	collected_details: null,
	video_codec: null,
	video_extension: null,
	archive_id:null,
	attempt_id:null,
	sessionStatus:'Initiated',
	mobileRoomId:null,
	mobileRecordings:[],
	mobileAudios:[],
	mobileRoomSessionId:null,
	twilioToken:null,
	incident_level:null,
	converationId:null,
	candidate_assessment:null,
	location:null,
	downloadSpeed:null,
	uploadSpeed:null,
	CPUSpeed:null,
	RAMSpeed:null,
	room_id:null,
	quizStartTime:0,
	mobileTwilioToken:null
};

export const preChecksSteps = {
	examPreparation:false,
	identityConfirmation:false,
	diagnosticStep:false,
	requirementStep:false,
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

export const browserMinVersions = {
	Chrome: 90,
	Edge: 90,
	Firefox: 100,
};

export const recordingEvents = ['record_screen','record_audio','record_video','mobile_proctoring'];
   
export const LockDownOptions = [
	'detect_unfocus',
	'disable_printing',
	'force_full_screen',
	'detect_resizing_of_window',
	'disable_right_click',
	'disable_keyboard_shortcuts',
	'disable_clipboard',
	'notify',
	'force_closure',
	'camera_view'
];

export const defaultTheme = {
	language:'en',
	theming:'#FF961B'
};

export const systemDiagnosticSteps = [
	'verify_desktop', 
	'record_video', 
	'record_audio', 
	'verify_connection', 
	'track_location', 
	'record_room',
	'record_audio'
];
export const SYSTEM_REQUIREMENT_STEP = [
	'verify_cpu', 
	'verify_ram', 
	'verify_upload_speed', 
	'verify_download_speed'
];

export const examPreparationSteps = [
	'record_video', 
	'record_audio',
	'record_screen',
];

export const prevalidationSteps = [
	'record_video', 
	'record_audio',
	'verify_id',
	'record_room'
];

export const aiEventsFeatures = [
	'object_detection', 
	'multiple_people_detection',
	'person_missing',
];

export const tokenExpiredError = {
	type: 'error',
	code: 40023,
	message: 'token_expired_login_again_to_perform_this_action'
};

export const languages = [
	{name: 'English', value: 'english', src: `${ASSET_URL}/flag-of-uk.svg`, alt: '', keyword: 'en' },
	{name: 'Spanish', value: 'spanish', src: `${ASSET_URL}/flag-of-spain.svg`, alt: '', keyword: 'es' },
	{name: 'German', value: 'german', src: `${ASSET_URL}/flag-of-germany.svg`, alt: '', keyword: 'de' },
	{name: 'French', value: 'french', src: `${ASSET_URL}/flag-of-france.svg`, alt: '', keyword: 'fr' },
	{name: 'Portuguese (Brazil)', value: 'portuguese_brazil', src: `${ASSET_URL}/flag-of-brazil.svg`, alt: '', keyword: 'pt' },
	{name: 'Italian', value: 'italian', src: `${ASSET_URL}/flag-of-italy.svg`, alt: '', keyword: 'it' },
	{name: 'Dutch', value: 'dutch', src: `${ASSET_URL}/netherlands.svg`, alt: '', keyword: 'nl' },
	{name: 'Welsh',value:'welsh', src: `${ASSET_URL}/flag-of-whales.png`,alt: '',keyword: 'cy'}
];
