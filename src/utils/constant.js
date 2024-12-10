export const ASSET_URL = 'https://mereos-corder.s3.eu-west-3.amazonaws.com/library_icons';

export const BASE_URL = 'https://corder-api.mereos.eu';

export const SOCKET_URL = 'wss://mobile-socket.mereos.eu/websocket/';

export const CONTENT_TYPE = Object.freeze({
	JSON: 'application/json',
	FORM_DATA: 'multipart/form-data'
});

export const initialSessionData = {
	aiEvents:[],
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
	incident_level:null,
	converationId:null
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
	{name: 'English', value: 'english', src: `${ASSET_URL}/flag-of-uk.svg`, alt: '', keyword: 'en' },
	{name: 'Spanish', value: 'spanish', src: `${ASSET_URL}/flag-of-spain.svg`, alt: '', keyword: 'es' },
	{name: 'German', value: 'german', src: `${ASSET_URL}/flag-of-germany.svg`, alt: '', keyword: 'de' },
	{name: 'French', value: 'french', src: `${ASSET_URL}/flag-of-france.svg`, alt: '', keyword: 'fr' },
	{name: 'Portuguese (Brazil)', value: 'portuguese_brazil', src: `${ASSET_URL}/flag-of-brazil.svg`, alt: '', keyword: 'pt' },
	{name: 'Italian', value: 'italian', src: `${ASSET_URL}/flag-of-italy.svg`, alt: '', keyword: 'it' },
	{name: 'Dutch', value: 'dutch', src: `${ASSET_URL}/netherlands.svg`, alt: '', keyword: 'nl' },
];

export const examPreprationCss = `.exam-preparation {
  display: flex;
  position: relative;
  margin: 10px;
  white-space: pre-line;
}

.exam-preparation h1 {
  text-align: center;
}

@media (min-width: 401px) {
  .exam-preparation h1 {
      text-align: left;
  }
}

.exam-preparation .img1 {
  position: absolute;
  top: 60%;
  right: 15%;
  transform: rotate(25.43deg);
}

@media (max-width: 720px) {
  .exam-preparation .img1 {
      top: 63%;
      right: 14%;
      width: 62px;
  }
}

.exam-preparation .img2 {
  position: absolute;
  top: 15%;
  right: 20%;
  transform: rotate(-17.18deg);
}

@media (max-width: 720px) {
  .exam-preparation .img2 {
      top: -7%;
      right: 0%;
  }
}

.exam-preparation .img3 {
  position: absolute;
  top: 15%;
  left: 25%;
  transform: rotate(-16.25deg);
}

@media (max-width: 720px) {
  .exam-preparation .img3 {
      top: -3%;
      left: 25%;
      width: 78px;
  }
}

.exam-preparation .img4 {
  position: absolute;
  top: 70%;
  left: 5%;
  transform: rotate(11.39deg);
}

@media (max-width: 720px) {
  .exam-preparation .img4 {
      top: 62%;
  }
}

.exam-preparation .img5 {
  position: absolute;
  top: 35%;
  right: 10%;
  transform: rotate(-165deg);
}

@media (max-width: 720px) {
  .exam-preparation .img5 {
      top: 15%;
      right: 0%;
      width: 78px;
  }
}

.exam-preparation .img6 {
  position: absolute;
  top: 85%;
  right: 15%;
}

@media (max-width: 720px) {
  .exam-preparation .img6 {
      display: none;
  }
}

.exam-preparation .img7 {
  position: absolute;
  top: 85%;
  left: 15%;
  transform: rotate(-69.35deg);
}

@media (max-width: 720px) {
  .exam-preparation .img7 {
      display: none;
  }
}

.exam-preparation .img8 {
  position: absolute;
  top: 25%;
  left: 10%;
  transform: rotate(-69.35deg);
}

@media (max-width: 720px) {
  .exam-preparation .img8 {
      top: 15%;
      left: -5%;
      width: 78px;
  }
}

.exam-preparation .exam-preparation-container {
  margin: 25px auto 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exam-preparation .exam-preparation-container .header-img {
  width: fit-content;
}

.exam-preparation .exam-preparation-container .ep-msg {
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #8D979F;
  width: 650px;
}

@media (max-width: 720px) {
  .exam-preparation .exam-preparation-container .ep-msg {
      width: 98%;
  }
}

.exam-preparation .exam-preparation-container > h1 {
  font-weight: 500;
  margin-top: 5px;
}

.exam-preparation .exam-preparation-container label {
  font-weight: 400;
  color: #92959A;
}
`;

export const modalCss = `@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
body {
  font-family: 'Poppins', sans-serif;
  font-style: var(--font-style);
}
:root {
  --theme-color: #FF961B;
  --font-style: var(--font-style);
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  display: flex;
  flex-direction: column;
  width: 830px;
  position: fixed;
  top: 50%;
  height: 530px;
  left: 50%;
  z-index: 2147483647;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 1.1rem;
  padding: 25px;
  overflow: auto;
  padding-top: 10px;
}
.dropdown-option{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 12px;
  padding-left: 12px;
  padding-bottom: 5px;
}

.flag-icon-img{
  width: 25px;
}
.dropdown-content .text{
  font-size: 14px !important;
  font-weight: 400 !important;
  cursor: pointer;
}
.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: end;
  justify-content: end;
  position: absolute;
  right: 13px;
  top: 2px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.tab {
  cursor: pointer;
  padding: 10px;
  display: inline-block;
}

.tab.active {
  color: var(--theme-color);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.tabs-container > div{
  white-space: nowrap;
  font-size: 15px;
}

.header {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.dropdown {
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}
.live-chat-container{
  position: fixed;
  bottom: 87px;
  right: 33px;
  height: 500px;
  z-index: 99999999;
}

.dropdown .select {
  display: flex;
  align-items: center;
  padding: 5px;
  column-gap: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  max-width: 182px;
  justify-content: space-between;
  z-index: 99999;
}
.dropdown .select label{
  cursor: pointer;
  font-size: 15px;
}

.dropdown .select div {
  margin-right: 5px;
}

.dropdown-content {
  position: absolute;
  top: 42px;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  display: none;
}

.dropdown-content.active {
  display: block;
  z-index: 999;
}

.dropdown .option {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown .option:hover {
  background-color: #f0f0f0;
}`;
