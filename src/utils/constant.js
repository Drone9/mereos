import germanyFlag from '../assets/images/flag-of-germany.svg';
import UKFlag from '../assets/images/flag-of-uk.svg';
import spainFlag from '../assets/images/flag-of-spain.svg';
import franceFlag from '../assets/images/flag-of-france.svg';
import brazilFlag from '../assets/images/flag-of-brazil.svg';
import italyFlag from '../assets/images/flag-of-italy.svg';

export const ASSET_URL = '../assets/images';

export const BASE_URL = process.env.NODE_ENV === 'production'
	? 'https://corder-api.mereos.eu'
	: 'https://corder-api.mereos-datasafe.com/';

export const SOCKET_URL = 'wss://mobile-socket.mereos.eu/websocket/';

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
	attempt_id:null,
	sessionStatus:'Initiated',
	mobileRoomId:null,
	mobileRecordings:[],
	mobileAudios:[],
	mobileRoomSessionId:null,
	twilioToken:null,
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

export const LockDownOptions = [
	'detect_unfocus',
	'disable_downloading',
	'disable_printing',
	'force_full_screen',
	'detect_resizing_of_window',
	'disable_right_click',
	'disable_function_keys',
	'block_browser_screenshot',
	'disable_clipboard'
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
	'enable_notifications', 
	'record_room',
	'record_audio'
];

export const prevalidationSteps = [
	'record_video', 
	'record_audio',
	'identity_card_requirement',
	'record_room'
];

export const languages = [
	{name: 'English', value: 'english', src: UKFlag, alt: '', keyword: 'en' },
	{name: 'Spanish', value: 'spanish', src: spainFlag, alt: '', keyword: 'es' },
	{name: 'German', value: 'german', src: germanyFlag, alt: '', keyword: 'de' },
	{name: 'French', value: 'french', src: franceFlag, alt: '', keyword: 'fr' },
	{name: 'Portuguese (Brazil)', value: 'portuguese_brazil', src: brazilFlag, alt: '', keyword: 'pt' },
	{name: 'Italian', value: 'italian', src: italyFlag, alt: '', keyword: 'it' },
];