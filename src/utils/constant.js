export const ASSET_URL = 'https://mereos-corder.s3.eu-west-3.amazonaws.com/library_icons';

export const BASE_URL = process.env.NODE_ENV === 'production'
	? 'https://corder-api.mereos.eu'
	: 'https://corder-api.mereos-datasafe.com/';

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

export const startRecordingCss = `.local-video-container {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 120px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f0f0f0;
}
body{
  position: relative;
}

.local-video-container video {
  width: 100%;
  height: auto;
  display: block;
}
.remote-video{
  display: flex;
  justify-content: center;
}
.remote-video  .video-attached{
  width: 180px;
  height: 140px;
  object-fit: cover;
}

.user-videos-remote{
  display: flex;
  position: absolute;
  bottom: 10px;
  column-gap: 10px;
  row-gap: 9px;
  flex-direction: column;
  width: 220px;
  background-color: #e7ebef;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px #f1f1f1;
  z-index: 9999999;
  left: 10px;
}

.user-videos-remote .user-video-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
}
.user-videos-remote .user-video-header .recording-heading{
  font-size: 14px;
  margin-bottom: 9px;
}

.recording-badge-container-header {
    position: absolute;
    right: 10px;
    width: 61px;
    white-space: nowrap;
    background-color: #e95e5e;
    border-radius: 5px;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 10px;
    column-gap: 4px;
    padding: 5px 5px;
    text-transform: lowercase;
    text-overflow: ellipsis;
    overflow: hidden;
}
.recording-badge-container-header .recording-text{
  margin: 0;
  font-size: 10px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.user-videos-remote .btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 11px;
  padding-bottom: 10px;
}

.user-videos-remote .btn-container .arrow-icon-btn{
  border: 2px solid var(--primary-color);
  padding: 6px;
  width: 40px;
  height: auto;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-videos-remote .btn-container .arrow-icon-btn .bottom-icon{
  transform: rotate(180deg);
}`;

export const identityStepsCss = `.ivs-container {
  margin: auto;
  display: flex;
  flex-direction: column;
}
.steps-container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}
@media (max-width: 720px) {
  .ivs-container {
      overflow: auto;
      width: 98%;
  }
}

.ivs-header-img {
  width: 411px;
  height: 230px;
  border-radius: 5px;
  margin: 30px auto 0;
}

.ivs-instructions-container {
  text-align: center;
  display: flex;
  flex-direction: row;
  margin: 20px auto 0;
}

.ivs-instruction {
  display: flex;
  flex-direction: row;
}

.ivs-instruction-step-container {
  margin: 6px 10px 0 5px;
}

.ivs-instruction-step {
  display: flex;
  align-items: center;
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  color: #B7C5D1;
}

.ivs-instruction-txt {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  color: #92959A;
  border-bottom: 3.5px solid #EAEDF2;
  border-radius: 1px;
  padding-bottom: 10px;
}

.ivs-instruction-txt-orange {
  font-family: Poppins, sans-serif;
  white-space: nowrap;
  font-style: var(--font-style);
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: var(--theme-color);
  border-bottom: 3.5px solid var(--theme-color);
  border-radius: 1px;
  padding-bottom: 10px;
}

.ivs-btn-container {
  margin: 35px 0 auto;
}

.ivs-query-msg {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8D979F;
  margin: 16px auto 0;
}

.ivs-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 32px;
  background: #0087FD;
  border-radius: 5px;
  border: 0;
  color: #ffffff;
  margin: auto;
  cursor: pointer;
}
`;

export const preValidationCss = `.pvi-container {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.ivsf-container{
  margin-top: -15px;
}
.pvi-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
}

.pvi-header-img {
  margin: 20px auto 0px;
}
.pvi-instruction-img{
  width: 40px;
  height: 40px;
}
.multi-device-block {
  margin: auto;
  gap: 10px;
  display: flex;
  justify-content: center;
}
.multi-device-block select {
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 100%;
}

.multi-device-block label {
  font-size: 13px;
}
.camera-container{
  width: 35%;
}
.microphone-container{
  width: 35%;
}
.pvi-header-title {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: bold;
  font-size: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #222222;
  margin: 0px auto 0px;
}
.my-recorded-video{
  height: 245px;
}
.pvi-msg {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8D979F;
  margin: 0px auto 0px;
}

.pvi-instructions-container {
  display: flex;
  flex-direction: row;
  margin: 10px auto 0px;
}

.pvi-instructions-img {
  height: 48px;
  width: 48px;
  border-radius: 0px;
}

.pvi-instruction-txt {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #222222;
  margin: 0px 15px 0px 5px;
}

.pvi-query-msg {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 9px auto 0px;
  cursor: pointer;
}

.pvi-btn-container {
  margin: 10px 0px 0px;
  text-align: center;
}

.pvi-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 32px;
  background: #0087FD;
  border-radius: 5px;
  border: 0px;
  color: #ffffff;
  margin: auto;
  cursor: pointer;
}
`;

export const mobileProctoringCss = `.mobile-conection-container {
  display: flex;
  flex-direction: column;
}

.ivsf-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
}

@media (max-width: 720px) {
  .ivsf-wrapper {
    margin: 0;
  }
}

.mobile-connection-banner {
  margin: 10px auto 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.mobile-connection-banner .banner-image {
  width: 400px;
  height: 240px;
  object-fit: cover;  
  border-radius: 5px;
}

.mobile-connection-banner .banner-info-box {
  background: #e5f3ff;
  width: 272px;
  position: absolute;
  padding: 10px;
  border-radius: 10px;
  right: -198px;
  top: 12%;
}

.mobile-connection-banner .banner-info-box .title {
  display: flex;
  align-items: center;
  gap: 9px;
}

.mobile-connection-banner .banner-info-box .title p {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 0;
  margin-top: 0;
}

.mobile-connection-banner .banner-info-box .desc {
  font-size: 13px;
  color: #8D979F;
  margin-left: 8px;
}

.bottom-desc {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #8D979F;
  width: 53%;
  margin-left: auto;
  font-size: 14px;
  text-align: center;
  margin-right: auto;
}

.bottom-desc p {
  width: 884px;
}

.example-text {
  color: #8d979f;
  font-size: 15px;
}

.bottom-desc-remote {
  width: 700px;
  text-align: start;
  display: flex;
  column-gap: 13px;
  justify-content: center;
  color: #8d979f;
}

.bottom-desc-remote input {
  accent-color: var(--theme-color);
}
.bottom-desc-remote p{
  margin: 0;
  font-size: 15px;
}
.qr-code-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 30px;
}
.qr-code-container canvas{
  width: 200px !important;
  height: 200px !important;
}
.qr-code-container .qr-code {
  background: #F4F7F9;
  padding: 10px;
  border: 0;
}

.qr-code-container .qr-code svg {
  height: 167px !important;
  max-width: 168px !important;
  width: 167px !important;    
}

.remote-mobile-video {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 10px;
  position: relative;
}

.remote-mobile-video img {
  width: 350px;
  height: 235px;
  object-fit: cover;
  border-radius: 8px;
}

.remote-mobile-video div video {
  width: 350px;
  height: 235px;
  object-fit: cover;
  border-radius: 8px;
}

.ivsf-header-img {
  height: 300px;
  border-radius: 5px;
  margin: 30px auto 0px;
}

@media (max-width: 720px) {
  .ivsf-header-img {
    width: 100%;
  }
}

.mobile-header-title {
  font-family: Poppins;
  font-style: var(--font-style);
  font-weight: bold;
  font-size: 35px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #222222;
  margin: 15px auto 0px;
}

.ivsf-msg {
  font-family: Poppins;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8D979F;
  margin: 10px auto 0px;
}

.ivsf-instructions-container {
  text-align: center;
  display: flex;
  flex-direction: row;
  margin: 20px auto 0px;
}

.ivsf-instructions-container .ivsf-instructions-img {
  height: 48px;
  width: 48px;
  border-radius: 0px;
}

.ivsf-instruction-step-container {
  margin: 0px 25px 0px 5px;
}

.ivsf-instruction-step {
  display: flex;
  align-items: center;
  font-family: Poppins;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  color: #B7C5D1;
}

.ivsf-instruction-txt {
  font-family: Poppins;
  font-style: var(--font-style);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #222222;
}

.mobile-btn-container {
  display: flex;
  justify-content: center;
  margin: 0px auto 0px;
  gap: 20px;
}

@media (max-width: 720px) {
  .ivsf-btn-container {
    margin: 19px 0 0 0;
    flex-direction: column;
  }
}

.ivsf-query-msg {
  font-size: 14px;
  margin: 20px auto 0px;
  color: #8D979F;
}

.mobile-broadcastin-container{
  display: flex;
  align-items: center;
  column-gap: 19px;
}
.remote-mobile-video{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;  
}
.video-loader{
  position: relative;
}
.spinner {
  position: absolute;
  left: 50%;
  top: -115px;
  transform: translate(-50%, -50%);
  z-index: 214748364;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
  background-color: var(--theme-color);;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
  background-color: var(--theme-color);;
}

.spinner .bounce3 {
  animation-delay: -0.16s;
  background-color: var(--theme-color);;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
      transform: scale(0);
  }
  40% {
      transform: scale(1);
  }
}
`;

export const step5Css = `.screen-share-container {
	display: flex;
	flex-direction: column;
}

.screen-wrapper {
	margin: auto;
	display: flex;
	flex-direction: column;
}

@media (max-width: 720px) {
	.screen-wrapper {
		margin: 0;
	}
}

.screen-share-dummy {
	height: 230px;
	display: flex;
	border-radius: 5px;
	align-items: center;
	justify-content: center;
	margin-top: 9px;
	margin-bottom: 10px;
}

@media (max-width: 720px) {
	.screen-share-dummy {
		width: 100%;
	}
}

.ivsf-header-titles {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: bold;
	font-size: 35px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #222222;
	margin: 22px auto 0;
}

.screen-desc {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 15px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 10px auto 0;
}

.ivsf-instructions-container {
	text-align: center;
	display: flex;
	flex-direction: row;
	margin: 20px auto 0;
}

.ivsf-instructions-img {
	height: 48px;
	width: 48px;
	border-radius: 0;
}

.ivsf-instruction-step-container {
	margin: 0 25px 0 5px;
}

.ivsf-instruction-step {
	display: flex;
	align-items: center;
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 13px;
	line-height: 19px;
	color: #B7C5D1;
}

.ivsf-instruction-txt {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	display: flex;
	align-items: center;
	color: #222222;
}

.ivsf-btn-container {
	display: flex;
	justify-content: center;
	margin: 35px auto 55px;
	gap: 20px;
}

@media (max-width: 720px) {
	.ivsf-btn-container {
		margin: 19px 0 0 0;
		flex-direction: column;
	}
}

.ivsf-query-msg {
	font-size: 14px;
	margin: 20px auto 0;
	color: #8D979F;
}
`;

export const step4Css = `.screen-four-container {
	margin: auto;
}

.room-scan-wrapper {
	display: flex;
	flex-direction: column;
}

.ivsf-header-img-container {
	position: relative;
	margin: 10px auto 0px;
}

@media(max-width:720px) {
	.ivsf-header-img-container {
		width: 98%;
	}
	.ivsf-header-img-container video {
		width: 98%;
	}
	.my-recorded-video {
		width: 98%;
		margin: 0;
		height: 100%;
	}
}

.my-recorded-video2 {
	width: 400px;
	height: 250px;
}

.ivsf-header-img {
	height: 300px;
	width: 400px;
	border-radius: 5px;
}

.ivsf-recording-badge-container {
	position: absolute;
	right: 10px;
	top: 10px;
	background-color: #E95E5E;
	border-radius: 5px;
	color: #ffffff;
	display: flex;
	align-items: center;
	padding: 5px 10px;
	text-transform: lowercase;
}

.ivsf-recording-dot {
	font-size: 20px;
	margin-right: 5px;
	width: 8px;
}

.ivsf-recording-badge {
	font-size: 12px;
}

.room-scan-header-title {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: bold;
	font-size: 34px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #222222;
	margin: 27px auto 0px !important;
}

.ivsf-msg {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 15px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 0px auto 10px !important;
}

.ivsf-instructions-container {
	text-align: center;
	display: flex;
	flex-direction: row;
	margin: 20px auto 0px;
}

.ivsf-instructions-img {
	height: 48px;
	width: 48px;
	border-radius: 0px;
}

.ivsf-instruction-step-container {
	margin: 0px 25px 0px 5px;
}

.ivsf-instruction-step {
	display: flex;
	align-items: center;
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 13px;
	line-height: 19px;
	color: #B7C5D1;
}

.ivsf-instruction-txt {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	display: flex;
	align-items: center;
	color: #222222;
}

.ivsf-btn-container {
	display: flex;
	margin: 20px auto 0px !important;
	gap: 20px;
}

@media(max-width:720px) {
	.ivsf-btn-container {
		flex-direction: column;
		margin: 30px 0 0 0;
	}
}

.ivsf-query-msg {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 14px;
	line-height: 21px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 0px auto 0px !important;
}

.ivsf-btn {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 11px 32px;
	background: #0087FD;
	border-radius: 5px;
	border: 0px;
	color: #ffffff;
	margin: auto;
	cursor: pointer;
}
`;

export const step3Css = `.ivst-container {
  display: flex;
  flex-direction: column;
}

.ivst-container #audio-wave {
  width: 600px;
  height: 140px;
  margin: 0 auto;
}

@media (max-width: 720px) {
  .ivst-container #audio-wave {
      width: 100%;
      height: 150px;
  }
}

.ivst-container .recording-text {
  text-align: center;
  font-size: 18px;
  color: var(--theme-color); /* $primaryColor */
  text-transform: capitalize;
}

.ivst-container .ivst-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
}

@media (max-width: 720px) {
  .ivst-container .ivst-wrapper {
      margin: 0;
  }
}

.ivst-container .ivst-header-img {
  width: 411px;
  height: 230px;
  border-radius: 5px;
  margin: 30px auto 0px;
}

.ivst-container .ivst-header-title {
  font-weight: bold;
  font-size: 35px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #222222;
  margin: 15px auto 0px;
}

.ivst-container .ivst-query-msg {
  color: #8d979f;
  font-size: 16px;
  margin-top: 14px;
  margin-bottom: 0px;
  text-align: center;
}

.ivst-container .mic-checking-txt {
  text-align: center;
  font-size: 16px;
}

.ivst-container .audio-timer {
  text-align: center;
  font-size: 16px;
}

.ivst-container .audio-timer span {
  color: var(--theme-color); /* $primaryColor */
  font-size: 17px;
  font-weight: 500;
}

.ivst-container .error-msg {
  color: red;
  font-size: 16px;
  margin-top: 14px;
  margin-bottom: 0px;
  text-align: center;
}

.ivst-container .ivst-msg {
  font-size: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8d979f;
  margin: 15px auto 0px;
}

.ivst-container .ivst-instructions-container {
  text-align: center;
  display: flex;
  flex-direction: row;
  margin: 20px auto 0px;
}

.ivst-container .ivst-instructions-img {
  height: 48px;
  width: 48px;
  border-radius: 0px;
}

.ivst-container .ivst-instruction-step-container {
  margin: 0px 25px 0px 5px;
}

.ivst-container .ivst-instruction-step {
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 19px;
  color: #b7c5d1;
}

.ivst-container .volum-checker {
  text-align: center;
  color: red;
  font-size: 16px;
}

.ivst-container .ivst-instruction-txt {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #222222;
}

.ivst-container .ivst-btn-container {
  display: flex;
  margin: 20px auto 0px;
  gap: 20px;
}

@media (max-width: 720px) {
  .ivst-container .ivst-btn-container {
      flex-direction: column;
      margin: 0;
  }
}

.ivst-container .ivst-audio-text {
  padding: 10px 20px;
  background-color: #f7f9fc;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  margin: auto;
  border-radius: 5px;
  margin: 20px auto 10px;
}
`;

export const step2Css = `
.ivst-container {
    margin: auto;
}

.ivst-wrapper {
    display: flex;
    flex-direction: column;
}

.ivst-header-img-container {
    position: relative;
    margin: 10px auto 0px;
}

@media (max-width: 720px) {
    .ivst-header-img-container {
        width: 98%;
    }
    .ivst-header-img-container video {
        width: 98%;
    }
}

.ivst-header-img {
    height: 280px;
    border-radius: 5px;
}

@media (max-width: 720px) {
    .ivst-header-img {
        width: 100%;
        object-fit: cover;
    }
}

.ivst-header-img-result {
    position: absolute;
    top: 15px;
    right: 15px;
    height: 20px;
}

@media (max-width: 720px) {
    .ivst-header-img-result {
        top: 28px;
    }
}

.ivst-screen-grid {
    position: absolute;
    left: 19px;
    top: 37px;
    height: 187px;
}

@media (max-width: 720px) {
    .ivst-screen-grid {
        width: 85%;
    }
}

.step-2-header-title {
    font-family: Poppins;
    font-style: var(--font-style);
    font-weight: bold;
    font-size: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #222222;
    margin: 23px auto 0px;
}

.ivst-msg {
    font-family: Poppins;
    font-style: var(--font-style);
    font-weight: normal;
    font-size: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #8D979F;
    margin: 0px auto 0px;
}

.ivst-instructions-container {
    text-align: center;
    display: flex;
    flex-direction: row;
    margin: 20px auto 0px;
}

.ivst-instructions-img {
    height: 48px;
    width: 48px;
    border-radius: 0px;
}

.ivst-instruction-step-container {
    margin: 0px 25px 0px 5px;
}

.ivst-instruction-step {
    display: flex;
    align-items: center;
    font-family: Poppins;
    font-style: var(--font-style);
    font-weight: normal;
    font-size: 13px;
    line-height: 19px;
    color: #B7C5D1;
}

.ivst-instruction-txt {
    font-family: Poppins;
    font-style: var(--font-style);
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #222222;
}

.ivst-btn-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 10px auto 0px;
}

@media (max-width: 720px) {
    .ivst-btn-container {
        flex-direction: column;
        margin: 30px 0 0 0;
    }
}

.ivst-query-msg {
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    color: #8D979F;
    margin: 0px auto 0px;
    max-width: 600px;
}
.first-header-msg {
    font-family: Poppins;
    font-style: var(--font-style);
    font-weight: normal;
    font-size: 16px;
    line-height: 160%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #8D979F;
    margin: 0px auto 0px;
}

.ivst-file {
    text-decoration: underline;
    color: var(--theme-color); /* Assuming $primaryColor is defined in colors.scss */
    cursor: pointer;
}
`;

export const step1Css = `.ivso-container {
  margin-left: auto;
  display: flex;
  font-family: 'Poppins', sans-serif;
  justify-content: center;
	flex-direction: column;
}

.ivso-wrapper {
	display: flex;
	flex-direction: column;
}
.ivso-webcam-container{
	display: flex;
	align-items: center;
	justify-content: center;
}
.ivso-header-title {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: bold;
	font-size: 32px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #222222;
	margin: 0px auto 7px;
}

.ivso-msg {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 16px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 15px auto 7px;
}

.ivso-header-img-container {
	position: relative;
	margin: 0px auto 0px;
}
.ivso-captured-img{
	width: 350px;
	height: 274px;
	object-fit: cover;
}

.ivso-header-img {
	height: 300px;
	border-radius: 5px;
}

.ivso-header-img-result {
	position: absolute;
	top: 15px;
	right: 15px;
	height: 20px;
}

.ivso-screen-grid {
	position: absolute;
	right: -169px;
	top: 37px;
	height: 195px;
}

@media (max-width: 720px) {
	.ivso-header-img-container {
		width: 98%;
	}

	.ivso-header-img-container video {
		width: 98%;
	}

	.ivso-header-img {
		width: 98%;
		object-fit: cover;
	}

	.ivso-screen-grid {
		left: 15px;
		top: 50px;
		width: 90%;
	}
}

.ivso-instructions-container {
	text-align: center;
	display: flex;
	flex-direction: row;
	margin: 20px auto 0px;
}

.ivso-instructions-img {
	height: 48px;
	width: 48px;
	border-radius: 0px;
}

.ivso-instruction-step-container {
	margin: 0px 25px 0px 5px;
}

.ivso-instruction-step {
	display: flex;
	align-items: center;
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 13px;
	line-height: 19px;
	color: #B7C5D1;
}

.ivso-instruction-txt {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	display: flex;
	align-items: center;
	color: #222222;
}

.ivso-btn-container {
	margin: 10px auto 0px;
	display: flex;
	flex-direction: row;
	column-gap: 20px;
}

.ivso-query-msg {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 14px;
	line-height: 21px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 0px auto 0px;
}

.ivso-retake-btn,
.ivso-btn {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 11px 32px;
	border-radius: 5px;
	color: #ffffff;
	margin: auto;
	cursor: pointer;
}

.ivso-retake-btn {
	background: #0087FD;
	border: 0px;
}

.ivso-btn {
	background: #0087FD;
	border: 0px;
}
`;
export const systemDiagnosticCss = `.system-diagnostic-test-screen {
  display: flex;
  flex-direction: column;
  white-space: pre-line;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .prompt-image {
    width: 100%;
  }
}

.system-diagnostic-test-screen .heading {
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 0;
  margin-top: 31px;
  text-align: center;
}

.system-diagnostic-test-screen .container-prompt {
  width: 97%;
}

.system-diagnostic-test-screen .description {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #8D979F;
  width: 650px;
  margin: 10px auto 10px;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .description {
    width: 98%;
  }
}

.system-diagnostic-test-screen .container-box {
  display: flex;
  justify-content: center;
}

.system-diagnostic-test-screen .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.system-diagnostic-test-screen .container-top {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.system-diagnostic-test-screen .container-middle {
  display: flex;
  /* flex-direction: column; */
  margin: 20px 0;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .container-middle {
    width: 100%;
  }
}

.system-diagnostic-test-screen .grey-box {
  border: 1px solid #f6f6f9;
  border-radius: 4px;
  width: 118px;
  height: 100px;
  display: flex;
  position: relative;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .grey-box {
    width: 90%;
    margin: 0 auto;
  }
}

.system-diagnostic-test-screen .grey-box .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.system-diagnostic-test-screen .grey-box .grey-box-left {
  display: flex;
  margin-top: 7px;
  margin-right: 7px;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  right: 0px;
}

.system-diagnostic-test-screen .grey-box .grey-box-left img {
  width: 21px;
}

.system-diagnostic-test-screen .red-box {
  border: 1px solid #eca9a9;
  background-color: #f6f6f9;
  cursor: pointer;
  border-radius: 4px;
  width: 200px;
  height: 120px;
  display: flex;
  position: relative;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .red-box {
    width: 90%;
    margin: 0 auto;
  }
}

.system-diagnostic-test-screen .red-box .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.system-diagnostic-test-screen .red-box .grey-box-left {
  display: flex;
  margin-top: 7px;
  margin-right: 7px;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  right: 0px;
}

.system-diagnostic-test-screen .red-box .grey-box-left img {
  width: 28px;
}

.system-diagnostic-test-screen .green-box {
  border: 1px solid #C3E8D6;
  border-radius: 4px;
  width: 200px;
  height: 120px;
  display: flex;
  position: relative;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .green-box {
    width: 90%;
    margin: 0 auto;
  }
}

.system-diagnostic-test-screen .green-box .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.system-diagnostic-test-screen .green-box .grey-box-left {
  display: flex;
  margin-top: 7px;
  margin-right: 7px;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  right: 0px;
}

.system-diagnostic-test-screen .green-box .grey-box-left img {
  width: 28px;
}

.system-diagnostic-test-screen .green-box-left {
  display: flex;
  margin-top: 10px;
  margin-right: 5px;
  justify-content: flex-end;
  align-items: flex-start;
}

.system-diagnostic-test-screen .grey-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}
.system-diagnostic-test-screen .grey-box-right  img{
    width: 35px;
}

.system-diagnostic-test-screen .grey-box-right  label{
  font-size: 16px;
}

.system-diagnostic-test-screen .box-section {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .box-section {
    flex-direction: column;
    width: 100%;
  }
}

.system-diagnostic-test-screen .button-section {
  display: flex;
  justify-content: center;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .button-section button {
    width: 50% !important;
  }
}

.system-diagnostic-test-screen .btn-next {
  width: 200px;
  height: 45px;
  background: #F6F6F9;
  border-radius: 5px;
  border: #F6F6F9;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #A7ABB2;
}

.system-diagnostic-test-screen .img-rotate {
  -webkit-animation: spin 3s linear infinite;
  -moz-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.orange-hollow-btn{
  border-style: none;
	font-size: 1em;
	color: var(--theme-color);
	font-weight: 500;
	border-radius: 5px;
	padding: 10px 20px;
  background-color: #ffffff; 
  border: 1px solid var(--theme-color);
  cursor: pointer;
	&:disabled {
		background-image: linear-gradient(#F6F6F9, #F6F6F9) !important;
		color: #A7ABB2 !important;
		border: 1px solid #F6F6F9 !important;
		background-color: #F6F6F9 !important;
	}
	&:hover {
		box-shadow: 1px 1px 2px rgb(32 33 36 / 28%)
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		background-image: none;
	}

	&:active {
		transform: scale(0.98); 
	}
}

.orange-filled-btn {
	border-style: none;
	font-size: 1em;
  font-style: var(--font-style);
	color: white;
	font-weight: 500;
	border-radius: 5px;
	padding: 10px 20px;
  background-color: var(--theme-color);
  cursor: pointer;
	&:disabled {
		background-image: linear-gradient(#F6F6F9, #F6F6F9) !important;
		color: #A7ABB2 !important;
		border: 1px solid #F6F6F9 !important;
		background-color: #F6F6F9 !important;
	}
	&:hover {
		box-shadow: 1px 1px 2px rgb(32 33 36 / 28%)
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		background-image: none;
	}

	&:active {
		transform: scale(0.98); 
	}
}`;

export const examPreprationCss = `
.exam-preparation {
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