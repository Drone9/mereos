export const ASSET_URL = 'https://mereos-corder.s3.eu-west-3.amazonaws.com/library_icons';

export const BASE_URL = 'https://corder-api.mereos-datasafe.com/v1.1.2';

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
	mobileConnection:false,
	browserSecurity:false,
};

export const browserMinVersions = {
	Chrome: 90,
	Edge: 90,
	Firefox: 100,
};

export const BROWSER_SECURTIY_STEP = ['disable_tampering','allow_incognito_mode'];
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

export const EXTENSIONS_LIST = {
	ghbmnnjooekpmoecnnnilnnbdlolhkhi: {
		name: 'Google Docs Offline',
		file: 'page_embed_script.js'
	},
	gbkeegbaiigmenfmjfclcdgdpimamgkj: {
		name: 'Office Editing for Docs, Sheets & Slides',
		file: 'views/app.html'
	},
	efaidnbmnnnibpcajpcglclefindmkaj: {
		name: 'Adobe Acrobat',
		file: 'viewer.html'
	},
	kbfnbcaeplbcioakkpcpgfkobkghlhen: {
		name: 'Grammarly',
		file: 'src/js/Grammarly.js'
	},
	ncennffkjdiamlpmcbajkmaiiiddgioo: {
		name: '迅雷下载支持',
		file: 'assets/tick.png'
	},
	aapbdbdomjkkjkaonfhkkikfgjllcleb: {
		name: 'Google Translate',
		file: 'popup_css_compiled.css'
	},
	majdfhpaihoncoakbjgbdhglocklcgno: {
		name: 'VPN Proxy VeePN',
		file: 'fonts/FigtreeVF.woff2'
	},
	jlhmfgmfgeifomenelglieieghnjghma: {
		name: 'Cisco Webex',
		file: 'cwcsf-nativemsg-iframe-43c85c0d-d633-af5e-c056-32dc7efc570b.html'
	},
	ecnphlgnajanjnkcmbpancdjoidceilk: {
		name: 'Kami',
		file: 'images/tick.svg'
	},
	jgfbgkjjlonelmpenhpfeeljjlcgnkpe: {
		name: 'ClassLink OneClick',
		file: 'images/16x16.png'
	},
	glcimepnljoholdmjchkloafkggfoijh: {
		name: '360 Internet Protection',
		file: 'promo/afsrc.js'
	},
	inoeonmfapjbbkmdafoankkfajkcphgd: {
		name: 'Read&Write',
		file: 'mathjax/a11y/sre.js'
	},
	bmnlcjabgnpnenekpadlanbbkooimhnj: {
		name: 'PayPal Honey',
		file: 'paypal/meta.js'
	},
	llbcnfanfmjhpedaedhbcnpgeepdnnok: {
		name: 'Online Security',
		file: 'content.styles.css'
	},
	mmeijimgabbpbgpdklnllpncmdofkcpn: {
		name: 'Screencastify',
		file: 'webcam.html'
	},
	oocalimimngaihdkbihfgmpkcpnmlaoa: {
		name: 'Teleparty',
		file: 'img/x.svg'
	},
	0: {
		edojjlpfekimnipmpclecojdpegkmocf: {
			name: 'Crypto Wallet',
			file: 'images/logo.png'
		}
	},
	dncepekefegjiljlfbihljgogephdhph: {
		name: 'TouchEn',
		file: 'contentscript.js'
	},
	hdokiejnpimakedhajhdlcegeplioahd: {
		name: 'LastPass',
		file: 'webclient-infield.html'
	},
	ihcjicgdanjaechkgeegckofjjedodee: {
		name: 'Malwarebytes Browser Guard',
		file: 'app/app.html'
	},
	fjoaledfpmneenckfbpdfhkmimnjocfa: {
		name: 'NordVPN',
		file: 'csKillSwitch.bundle.css'
	},
	kgjfgplpablkjnlkjmjdecgdpfankdle: {
		name: 'Zoom',
		file: 'images/icon.svg'
	},
	liecbddmkiiihnedobmlmillhodjkdmb: {
		name: 'Loom',
		file: 'html/bubble.html'
	},
	ekhagklcjbdpajgpjgmbionohlpdbjgc: {
		name: 'Zotero Connector',
		file: 'itemSaver.js'
	},
	flliilndjeohchalpbbcdekjklbdgfkk: {
		name: 'Avira Browser Safety',
		file: 'html/top.html'
	},
	lpcaedmchfhocbbapmcbpinfpgnhiddi: {
		name: 'Google Keep',
		file: 'index.html'
	},
	bfnaelmomeimhlpmgjnjophhpkkoljpa: {
		name: 'Phantom',
		file: 'btc.js'
	},
	caljgklbbfbcjjanaijlacgncafpegll: {
		name: 'Avira Password Manager',
		file: 'panel.html'
	},
	ccbpbkebodcjkknkfkpmfeciinhidaeh: {
		name: 'Avira Safe Shopping',
		file: 'siteScript.js'
	},
	enfolipbjmnmleonhhebhalojdpcpdoo: {
		name: 'Screenshot reader',
		file: 'pages/ocr.html'
	},
	eppiocemhmnlbhjplcgkofciiegomcon: {
		name: 'Urban VPN Proxy',
		file: 'libs/requests.js'
	},
	gomekmidlodglbbmalcneegieacbdmki: {
		name: 'Avast Online Security & Privacy',
		file: 'icons/bg.png'
	},
	gpdjojdkbbmdfjfahjcgigfpmkopogic: {
		name: 'Save to Pinterest',
		file: 'style.css'
	},
	jjkchpdmjjdmalgembblgafllbpcjlei: {
		name: 'Trellix Endpoint Security Web Control',
		file: 'images/128.png'
	},
	aeblfdkhhhdcdjpifhhbdiojplfjncoa: {
		name: '1Password',
		file: 'inline/injected.js'
	},
	difoiogjjojoaoomphldepapgpbgkhkb: {
		name: 'Sider',
		file: 'i18n/am.json'
	},
	eofcbnmajmjmplflapaojjnihcjkigck: {
		name: 'Avast SafePrice',
		file: 'siteScript.js'
	},
	feepmdlmhplaojabeoecaobfmibooaid: {
		name: 'OrbitNote',
		file: 'filePicker/index.html'
	},
	gkojfkhlekighikafcpjkiklfbnlmeio: {
		name: 'Hola VPN',
		file: 'js/popup.html'
	},
	iidnbdjijdkbmajdffnidomddglmieko: {
		name: 'QuillBot',
		file: 'content.js'
	},
	mpnlkmlkncncpgnnkmkgoobfpnjmblnk: {
		name: 'Norton Safe Search',
		file: 'content/scripts/NSSS.js'
	},
	njdniclgegijdcdliklgieicanpmcngj: {
		name: 'Insight',
		file: 'env/qa.json'
	},
	nngceckbapebfimnlniiiahkandclblb: {
		name: 'Bitwarden',
		file: 'images/icon38.png'
	},
	ogdlpmhglpejoiomcodnpjnfgcpmgale: {
		name: 'Custom Cursor',
		file: 'content.js'
	},
	pejdijmoenmkgeppbflobdenhhabjlaj: {
		name: 'iCloud Passwords',
		file: 'completion_list.html'
	},
	admmjipmmciaobhojoghlmleefbicajg: {
		name: 'Norton Password Manager',
		file: 'css/content-page.css'
	},
	bhlhnicpbhignbdhedgjhgdocnmhomnp: {
		name: 'ColorZilla',
		file: 'images/icon-16.png'
	},
	bkdgflcldnnnapblkhphbgpggdiikppg: {
		name: 'DuckDuckGo Search & Tracker Protection',
		file: 'img/logo-small.svg'
	},
	cofdbpoegempjloogbagkncekinflcnj: {
		name: 'DeepL',
		file: 'images/info.svg'
	},
	eiaeiblijfjekdanodkjadfinkhbfgcd: {
		name: 'NordPass',
		file: 'biometrics.html'
	},
	fmkadmapgofadopljbjfkapdkoienihi: {
		name: 'React Developer Tools',
		file: 'main.html'
	},
	hehijbfgiekmjfkfjpbkbammjbdenadd: {
		name: 'IE Tab',
		file: 'redir.htm'
	},
	hjngolefdpdnooamgdldlkjgmdcmcjnc: {
		name: 'Equatio',
		file: 'desmos/graph.html'
	},
	mclkkofklkfljcocdinagocijmpgbhab: {
		name: 'Google Input Tools',
		file: 'inner_bin.js'
	},
	mgijmajocgfcbeboacabfgobmjgjcoja: {
		name: 'Google Dictionary (by Google)',
		file: 'content.min.css'
	},
	dpadflhmiohjfhhaehelneimpllfbpcg: {
		name: 'TeraBox Download Assistant',
		file: 'logo.4abccce0.png'
	},
	fjgncogppolhfdpijihbpfmeohpaadpc: {
		name: 'EndNote',
		file: 'settings.json'
	},
	gppongmhjkpfnbhagpmjfkannfbllamg: {
		name: 'Wappalyzer',
		file: 'js/js.js'
	},
	kejbdjndbnbjgmefkgdddjlbokphdefk: {
		name: 'Tag Assistant',
		file: 'api/tag_assistant_api_bin.js'
	},
	mfidniedemcgceagapgdekdbmanojomk: {
		name: 'Coupert',
		file: 'css/font.css'
	},
	nffaoalbilbmmfgbnbgppjihopabppdk: {
		name: 'videospeed',
		file: 'inject.js'
	},
	nlipoenfbbikpbjkfpfillcgkoblgpmj: {
		name: 'Awesome Screen Recorder & Screenshot',
		file: 'camera.html'
	},
	ofpnmcalabcbjgholdjcjblkibolbppb: {
		name: 'Monica',
		file: 'content.js'
	},
	ohfgljdgelakfkefopgklcohadegdpjf: {
		name: 'Smallpdf',
		file: 'iframe.html'
	},
	oldceeleldhonbafppcapldpdifcinji: {
		name: 'LanguageTool',
		file: 'content.js'
	},
	pachckjkecffpdphbpmfolblodfkgbhl: {
		name: 'vidIQ Vision',
		file: 'options.js'
	},
	bfgdeiadkckfbkeigkoncpdieiiefpig: {
		name: 'Bitmoji',
		file: 'popup.html'
	},
	bkkbcggnhapdmkeljlodobbkopceiche: {
		name: 'Poper Blocker',
		file: 'message.html'
	},
	bpoadfkcbjbfhfodiogcnhhhpibjhbnh: {
		name: 'Immersive Translate',
		file: 'locales.json'
	},
	dagcmkpagjlhakfdhnbomgmjdpkdklff: {
		name: 'Mendeley Web Importer',
		file: 'index.html'
	},
	dmghijelimhndkbmpgbldicpogfkceaj: {
		name: 'Dark Mode',
		file: 'data/content_script/custom/bing.css'
	},
	fjnbnpbmkenffdnngjfgmeleoegfcffe: {
		name: 'Stylish',
		file: 'index.html'
	},
	ghdbmcfiemkndpbhfeifkneiolehkcli: {
		name: 'FUJIFILM Synapse',
		file: 'canary.png'
	},
	glghokcicpikglmflbbelbgeafpijkkf: {
		name: 'Signer.Digital',
		file: 'icon32.png'
	},
	golbdgciocipijcnkhfjbljaepchclbc: {
		name: '夸克网盘',
		file: 'update-iframe.html'
	},
	gpaiobkfhnonedkhhfjpmhdalgeoebfa: {
		name: 'Microsoft Editor',
		file: 'options.html'
	},
	honjcnefekfnompampcpmcdadibmjhlk: {
		name: 'LanSchool Web Helper',
		file: 'style.css'
	},
	hoombieeljmmljlkjmnheibnpciblicm: {
		name: 'Lang Reactor',
		file: 'images/tt.png'
	},
	imdndkajeppdomiimjkcbhkafeeooghd: {
		name: 'WithSecure',
		file: 'ols.css'
	},
	jgjaeacdkonaoafenlfkkkmbaopkbilf: {
		name: 'ChatGPT for Google',
		file: 'content.js'
	},
	jpkfgepcmmchgfbjblnodjhldacghenp: {
		name: 'Pie Adblock',
		file: 'assets/page/suppressAlert.js'
	},
	laookkfknpbbblfpciffpaejjkokdgca: {
		name: 'Momentum',
		file: 'site-blocker.html'
	},
	lgblnfidahcdcjddiepkckcfdhpknnjh: {
		name: 'Ad Blocker',
		file: 'content/popups-script.js'
	},
	mcohilncbfahbmgdjkbpemcciiolgcge: {
		name: 'OKX Wallet',
		file: 'scripts/lib/inpage.js'
	},
	mnjggcdmjocbbbhaepdhchncahnbgone: {
		name: 'SponsorBlock',
		file: 'popup.css'
	},
	nmigaijibiabddkkmjhlehchpmgbokfj: {
		name: 'Sound Booster',
		file: 'css/window.css'
	},
	ohahllgiabjaoigichmmfljhkcfikeof: {
		name: 'AdBlocker Ultimate',
		file: 'static-web-accessible-resources/logo.png'
	},
	pfhgbfnnjiafkhfdkmpiflachepdcjod: {
		name: 'CAdES',
		file: 'icons/icon16.png'
	},
	pioclpoplcdbaefihamjohnefbikjilc: {
		name: 'Evernote Web Clipper',
		file: 'content.css'
	},
	acbchkahfmndkenefkcklofjmipghjjp: {
		name: 'Rutoken',
		file: 'error.html'
	},
	ailoabdmgclmfmhdagmlohpjlbpffblp: {
		name: 'Surfshark VPN',
		file: 'fonts.css'
	},
	ajphlblkfpppdpkgokiejbjfohfohhmk: {
		name: 'Mote',
		file: 'popup.html'
	},
	akdgnmcogleenhbclghghlkkdndkjdjc: {
		name: 'SEOquake',
		file: 'static/svg/bad.svg'
	},
	aopddeflghjljihihabdclejbojaomaf: {
		name: 'AnyDoc Translator',
		file: 'public/images/pro.svg'
	},
	becfinhbfclcgokjlobojlnldbfillpf: {
		name: 'AITOPIA',
		file: 'aitopia.png'
	},
	bfbmjmiodbnnpllbbbfblcplfjjepjdn: {
		name: 'Turn Off the Lights',
		file: 'scripts/video-player-status.js'
	},
	bfogiafebfohielmmehodmfbbebbbpei: {
		name: 'Keeper',
		file: 'images/web.svg'
	},
	bigefpfhnfcobdlfbedofhhaibnlghod: {
		name: 'MEGA',
		file: 'mega/secure.html'
	},
	camppjleccjaphfdbohjdohecfnoikec: {
		name: 'Merlin',
		file: 'assets/i18n-a7d9572b.js'
	},
	ckejmhbmlajgoklhgbapkiccekfoccmk: {
		name: 'Mobile simulator',
		file: 'assets/pictos/logo.png'
	},
	cldmemdnllncchfahbcnjijheaolemfk: {
		name: 'Foxified',
		file: 'ff-options.html'
	},
	cmeakgjggjdlcpncigglobpjbkabhmjl: {
		name: 'Steam Inventory Helper',
		file: 'js/faq.js'
	},
	cndibmoanboadcifjkjbdpjgfedanolh: {
		name: 'BetterCanvas',
		file: 'images/fonts/Jost.png'
	},
	cnlhokffphohmfcddnibpohmkdfafdli: {
		name: 'MultiPassword',
		file: 'save.html'
	},
	cnpniohnfphhjihaiiggeabnkjhpaldj: {
		name: 'Image Downloader',
		file: 'images/me.jpg'
	},
	dahenjhkoodjbpjheillcadbppiidmhp: {
		name: 'Google Scholar PDF Reader',
		file: 'reader.html'
	},
	dmkamcknogkgcdfhhbddcghachkejeap: {
		name: 'Keplr',
		file: 'assets/icon-128.png'
	},
	edlifbnjlicfpckhgjhflgkeeibhhcii: {
		name: 'ScreenShot Tool',
		file: 'editor.html'
	},
	egjidjbpglichdcondbcbdnbeeppgdph: {
		name: 'Trust Wallet',
		file: 'inpage.js'
	},
	eiimnmioipafcokbfikbljfdeojpcgbh: {
		name: 'Block Site',
		file: 'public/popup.html'
	},
	fdjamakpfbbddfjaooikfcpapjohcfmg: {
		name: 'Dashlane',
		file: 'index.html'
	},
	feolagkacappiaieohahjkeaikhjjcfa: {
		name: 'Dragon',
		file: 'content.js'
	},
	fgddmllnllkalaagkghckoinaemmogpe: {
		name: 'ExpressVPN',
		file: 'images/icons/x.svg'
	},
	fggkaccpbmombhnjkjokndojfgagejfb: {
		name: 'Tactiq',
		file: 'logo.svg'
	},
	flkenbnefhfhjeflinndcnlepkapgigl: {
		name: 'Paper',
		file: 'assets/favicon.staging.png'
	},
	fllaojicojecljbmefodhfapmkghcbnh: {
		name: 'Google Analytics Opt-out Add-on (by Google)',
		file: 'gaoptout_signal.js'
	},
	fnjhmkhhmkbjkkabndcnnogagogbneec: {
		name: 'Ronin Wallet',
		file: 'in-page.js'
	},
	ggjhpefgjjfobnfoldnjipclpcfbgbhl: {
		name: 'My Apps Secure Sign-in',
		file: 'images/notLoggedInIcon.png'
	},
	gohjpllcolmccldfdggmamodembldgpc: {
		name: 'Shimeji',
		file: 'fonts/balsamiq-sans-v12-cyrillic_cyrillic-ext_latin_latin-ext-700.woff2'
	},
	gojbdfnpnhogfdgjbigejoaolejmgdhk: {
		name: 'OneNote',
		file: 'clipper.html'
	},
	hbapdpeemoojbophdfndmlgdhppljgmp: {
		name: 'Keywords Everywhere',
		file: 'img/on.png'
	},
	hdppkjifljbdpckfajcmlblbchhledln: {
		name: 'Browser Redirection',
		file: 'bcr.html'
	},
	hfapbcheiepjppjbnkphkmegjlipojba: {
		name: 'Klarna',
		file: 'klapp.html'
	},
	hgeljhfekpckiiplhkigfehkdpldcggm: {
		name: 'Auto Refresh Plus',
		file: 'editor.html'
	},
	hipncndjamdcmphkgngojegjblibadbe: {
		name: 'Planet VPN',
		file: 'blocked.html'
	},
	hkdmdpdhfaamhgaojpelccmeehpfljgf: {
		name: 'Video Downloader Plus',
		file: 'js/popup.js'
	},
	hmdcmlfkchdmnmnmheododdhjedfccka: {
		name: 'Eye Dropper',
		file: 'edropper.js'
	},
	hmffdimoneaieldiddcmajhbjijmnggi: {
		name: 'EasyBib Toolbar',
		file: 'popup.html'
	},
	hnfanknocfeofbddgcijnmhnfnkdnaad: {
		name: 'Coinbase Wallet',
		file: 'forceUpdate.js'
	},
	hodiladlefdpcbemnbbcpclbmknkiaem: {
		name: 'Google Meet Enhanced Experience',
		file: 'main.css'
	},
	hoklmmgfnpapgjgcpechhaamimifchmp: {
		name: 'Similarweb',
		file: 'images/close.svg'
	},
	ijejnggjjphlenbhmjhhgcdpehhacaal: {
		name: 'scrnli',
		file: 'index.html'
	},
	inehghpkjjjdgpnagcbogckbonilnidc: {
		name: 'Degreed',
		file: 'trusted/trusted-pdf.js'
	},
	ioimlbgefgadofblnajllknopjboejda: {
		name: 'Transpose',
		file: 'scripts/content-getmedia.js'
	},
	jhhclmfgfllimlhabjkgkeebkbiadflb: {
		name: 'EPUBReader',
		file: 'reader.html'
	},
	kabafodfnabokkkddjbnkgbcbmipdlmb: {
		name: 'Tasks for Canvas',
		file: 'icon-128.png'
	},
	klekeajafkkpokaofllcadenjdckhinm: {
		name: 'McAfee Web Boost',
		file: 'images/logo.png'
	},
	kohfgcgbkjodfcfkcackpagifgbcmimk: {
		name: 'NaturalReader',
		file: 'injected/ok.js'
	},
	ljflmlehinmoeknoonhibbjpldiijjmm: {
		name: 'Speechify',
		file: 'houdini.js'
	},
	lkhjgdkpibcepflmlgahofcmeagjmecc: {
		name: 'Scener',
		file: 'ScenerIcon.png'
	},
	lkoeejijapdihgbegpljiehpnlkadljb: {
		name: 'LibKey Nomad',
		file: 'static/main.js'
	},
	lmbopdiikkamfphhgcckcjhojnokgfeo: {
		name: 'Antidote Connector',
		file: 'antidote-grav.js'
	},
	lpfemeioodjbpieminkklglpmhlngfcn: {
		name: 'WebChatGPT',
		file: 'chunks/2PBVIHK4.js'
	},
	lphicbbhfmllgmomkkhjfkpbdlncafbn: {
		name: 'LetyShops',
		file: 'images/btn/logo16.png'
	},
	mbckjcfnjmoiinpgddefodcighgikkgn: {
		name: 'AVG SafePrice',
		file: 'siteScript.js'
	},
	mkhjobnjhllkhekbbedlkmgcglgaeidc: {
		name: 'iboss Cloud Connector',
		file: 'index.html'
	},
	nhdogjmejiglipccpnnnanhbledajbpd: {
		name: 'Vue.js devtools',
		file: 'dist/proxy.js'
	},
	njgehaondchbmjmajphnhlojfnbfokng: {
		name: 'Video Downloader PLUS',
		file: 'main.js'
	},
	nkkighcdodpjcdenompholalclpaobff: {
		name: 'LockDown Browser',
		file: 'viewer.js'
	},
	nllcnknpjnininklegdoijpljgdjkijc: {
		name: 'Wordtune',
		file: 'content-scripts/read.js'
	},
	nmmicjeknamkfloonkhhcjmomieiodli: {
		name: 'YouTube Summary with ChatGPT & Claude',
		file: 'assets/index-cd77e154.js'
	},
	oemmndcbldboiebfnladdacbdfmadadm: {
		name: 'PDF Viewer',
		file: 'content/web/viewer.html'
	},
	ohcpnigalekghcmgcdcenkpelffpdolg: {
		name: 'ColorPick Eyedropper',
		file: 'img/close.png'
	},
	ohedcglhbbfdgaogjhcclacoccbagkjg: {
		name: 'Адаптер Рутокен Плагин',
		file: 'webpage.js'
	},
	ohlencieiipommannpdfcmfdpjjmeolj: {
		name: 'PrintFriendly',
		file: 'sandbox.html'
	},
	oiiaigjnkhngdbnoookogelabohpglmd: {
		name: 'HubSpot Sales',
		file: 'css/popup.css'
	},
	okfkdaglfjjjfefdcppliegebpoegaii: {
		name: 'Scribe',
		file: 'assets/style.css'
	},
	oofgbpoabipfcfjapgnbbjjaenockbdp: {
		name: 'SetupVPN',
		file: 'libs/vendors.dll.js'
	},
	opcgpfmipidbgpenhmajoajpbobppdil: {
		name: 'Slush',
		file: 'canvaskit.wasm'
	},
	paijmjmfnjcbjlimjeminlepannmimbi: {
		name: 'Pear Deck Power-Up',
		file: 'static/css/styles.css'
	},
	pbhelknnhilelbnhfpcjlcabhmfangik: {
		name: '1C:Enterprise',
		file: 'manifest.json'
	},
	pcblbflgdkdfdjpjifeppkljdnaekohj: {
		name: 'Brisk Teaching',
		file: 'assets/icon.png'
	},
	pchfckkccldkbclgdepkaonamkignanh: {
		name: 'Visual Bookmarks',
		file: 'brandings.js'
	},
	phidhnmbkbkbkbknhldmpmnacgicphkf: {
		name: 'MyBib',
		file: 'static/css/fonts.css'
	},
	pllcidbcfbamjfbfpemnnjohnfcliakf: {
		name: 'ArkSigner',
		file: 'content.js'
	},
	pohmgobdeajemcifpoldnnhffjnnkhgf: {
		name: 'WeVideo Screen & Webcam Recorder',
		file: 'webcam.html'
	},
	acmacodkjbdgmoleebolmdjonilkdbch: {
		name: 'Rabby Wallet',
		file: 'pageProvider.js'
	},
	anflghppebdhjipndogapfagemgnlblh: {
		name: 'Cute Cursors',
		file: 'assets/static/svg/1.1.svg'
	},
	cfnpidifppmenkapgihekkeednfoenal: {
		name: 'TrafficLight',
		file: 'img/atf.svg'
	},
	cimpffimgeipdhnhjohpbehjkcdpjolg: {
		name: 'Watch2Gether',
		file: 'controls.html'
	},
	dhcpobccjkdnmibckgpejmbpmpembgco: {
		name: 'Topaz SigPlusExtLite',
		file: 'SigPlusExtLiteWrapper.js'
	},
	ecimfebadcfiablhgjpheinknpdkdjhh: {
		name: 'Britannica School Insights',
		file: 'img/b2.svg'
	},
	eljapbgkmlngdpckoiiibecpemleclhh: {
		name: 'Fonts Ninja',
		file: 'frame.html'
	},
	gekdekpbfehejjiecgonmgmepbdnaggp: {
		name: 'Total Adblock',
		file: 'assets/img/logo/edge.svg'
	},
	jfiihjeimjpkpoaekpdpllpaeichkiod: {
		name: 'Page Marker',
		file: 'main.css'
	},
	kjacjjdnoddnpbbcjilcajfhhbdhkpgk: {
		name: 'Forest',
		file: 'images/plants/9/4.png'
	},
	lanhpcaapacdmofkjpkahckmlkljcdhh: {
		name: 'Jinshan Web Clipper',
		file: 'kdocs/path/index.html'
	},
	lneaocagcijjdpkcabeanfpdbmapcjjg: {
		name: 'VPNLY',
		file: 'icons/icon-48.png'
	},
	ppbibelpcjmhbdihakflkdcoccbgbkpo: {
		name: 'UniSat Wallet',
		file: 'index.html'
	},
	ppcdkdcafnbklehdngbhmhpidandcjke: {
		name: 'think-cell',
		file: 'inject.js'
	},
	alhgpfoeiimagjlnfekdhkjlkiomcapa: {
		name: 'Apollo.io',
		file: 'panel.html'
	},
	bhhhlbepdkbapadjdnnojkbgioiodbic: {
		name: 'Solflare Wallet',
		file: 'inpage.js'
	},
	clngdbkpkpeebahjckkjfobafhncgmne: {
		name: 'Stylus',
		file: 'install-usercss.html'
	},
	dehajjkfchegiinhcmoclkfbnmpgcahj: {
		name: 'InsertLearning',
		file: 'lib/img/icon.png'
	},
	donbcfbmhbcapadipfkeojnmajbakjdc: {
		name: 'Ruffle',
		file: 'popup.html'
	},
	edjkecefjhobekadlkdkopkggdefpgfp: {
		name: 'Smarty',
		file: 'css/popup.css'
	},
	epnhoepnmfjdbjjfanpjklemanhkjgil: {
		name: 'Pendo Launcher',
		file: 'idp.js'
	},
	gcoekeoenehjmndhkdnoomdjeaclkhbe: {
		name: 'Nearpod',
		file: 'assets/close.svg'
	},
	idgpnmonknjnojddfkpgkljpfnnfcklj: {
		name: 'ModHeader',
		file: 'images/icon.png'
	},
	iodihamcpbpeioajjeobimgagajmlibd: {
		name: 'Secure Shell',
		file: 'html/nassh.html'
	},
	iplffkdpngmdjhlpjmppncnlhomiipha: {
		name: 'Unpaywall',
		file: 'unpaywall.html'
	},
	kkelicaakdanhinjdeammmilcgefonfh: {
		name: 'Window Resizer',
		file: 'assets/fonts/lato-bold.ttf'
	},
	lppkeogbkjlmmbjenbogdndlgmpiddda: {
		name: 'Ntko office document control',
		file: 'icons/ntko.png'
	},
	mciiogijehkdemklbdcbfkefimifhecn: {
		name: 'Chrono Download Manager',
		file: 'icons/newd.png'
	},
	mhnlakgilnojmhinhkckjpncpbhabphi: {
		name: 'MaxAI',
		file: 'worker.js'
	},
	mjnbclmflcpookeapghfhapeffmpodij: {
		name: 'UltraSurf Security',
		file: 'injected_content.js'
	},
	phgddhgfnjjaobkeekohieahfingldac: {
		name: 'M*Modal',
		file: 'fd-web-connector.js'
	},
	adlpodnneegcnbophopdmhedicjbcgco: {
		name: 'Troywell VPN',
		file: 'popup.html'
	},
	aefehdhdciieocakfobpaaolhipkcpgc: {
		name: 'Simple Allow Copy',
		file: 'content_scripts/copy.js'
	},
	aflkmfhebedbjioipglgcbcmnbpgliof: {
		name: 'Backpack',
		file: 'injected.js'
	},
	amfojhdiedpdnlijjbhjnhokbnohfdfb: {
		name: 'eJOY AI Dictionary',
		file: 'img/on.png'
	},
	bhmmomiinigofkjcapegjjndpbikblnp: {
		name: 'Web of Trust',
		file: 'popupV2.html'
	},
	cbhilkcodigmigfbnphipnnmamjfkipp: {
		name: 'Calendly',
		file: '842.js'
	},
	cpaibbcbodhimfnjnakiidgbpiehfgci: {
		name: 'True Key',
		file: 'css/main.css'
	},
	fnmihdojmnkclgjpcoonokmkhjpjechg: {
		name: 'Chat GPT for Chrome with GPT-5, Claude Sonnet & DeepSeek AI',
		file: 'logo.svg'
	},
	gbdjcgalliefpinpmggefbloehmmknca: {
		name: 'No Ads',
		file: 'js/b.js'
	},
	gidejehfgombmkfflghejpncblgfkagj: {
		name: 'Cuponomia',
		file: 'app.js'
	},
	gjfpmkejnolcfklaaddjnckanhhgegla: {
		name: 'Guardio',
		file: 'frame.html'
	},
	hdgegmlancchhhlkkddoiedlklgocffm: {
		name: 'Read The Web',
		file: 'css/pin.css'
	},
	hgmhmanijnjhaffoampdlllchpolkdnj: {
		name: 'Hunter',
		file: 'img/location_icon.png'
	},
	jldhpllghnbhlbpcmnajkpdmadaolakh: {
		name: 'Todoist',
		file: 'popup.js'
	},
	jlgkpaicikihijadgifklkbpdajbkhjo: {
		name: 'CrxMouse',
		file: 'icon.png'
	},
	jmekfmbnaedfebfnmakmokmlfpblbfdm: {
		name: 'Tag Assistant Companion',
		file: 'api/tag_assistant_api_bin.js'
	},
	kfokdmfpdnokpmpbjhjbcabgligoelgp: {
		name: 'Chrome Audio Capture',
		file: 'images/8.gif'
	},
	mafcicncghogpdpaieifglifaagndbni: {
		name: 'RoGold',
		file: 'init.js'
	},
	nbcojefnccbanplpoffopkoepjmhgdgh: {
		name: 'Hoxx VPN',
		file: 'resources/flags/ad.png'
	},
	nhpgknpddjnapobgocnpjkbfnjfkedpj: {
		name: 'SearchGPT Powered',
		file: 'logo.svg'
	},
	nmpgaoofmjlimabncmnmnopjabbflegf: {
		name: 'Ubersuggest',
		file: 'img/pc.svg'
	},
	nnnmhgkokpalnmbeighfomegjfkklkle: {
		name: 'Cite This For Me',
		file: 'popup.htm'
	},
	oligonmocnihangdjlloenpndnniikol: {
		name: 'edpuzzle',
		file: 'images/mic-blocked.jpg'
	},
	pnnfemgpilpdaojpnkjdgfgbnnjojfik: {
		name: 'Streak CRM for Gmail',
		file: 'blank.png'
	},
	aejoelaoggembcahagimdiliamlcdmfm: {
		name: 'Talend API Tester',
		file: 'images/icon/favicon.ico'
	},
	bafijghppfhdpldihckdcadbcobikaca: {
		name: 'Keyword Surfer',
		file: 'lib/index.js'
	},
	bogabmgabnjabjbiggmfkdocbjgackfo: {
		name: 'Cursor Helper',
		file: 'content.js'
	},
	clldacgmdnnanihiibdgemajcfkmfhia: {
		name: 'Color Picker',
		file: 'cp.png'
	},
	ekhbcipncbkfpkaianbjbcbmfehjflpf: {
		name: 'CocoCut',
		file: 'mpd.js'
	},
	ghmbeldphafepmbegfdlkpapadhbakde: {
		name: 'Proton Pass',
		file: 'elements.js'
	},
	gkmiciealelfckimnoopefeplibjciih: {
		name: 'Fortinet Privileged Access Agent',
		file: 'css/style.css'
	},
	ibnejdfjmmkpcnlpebklmnkoeoihofec: {
		name: 'TronLink',
		file: 'injected/injected.js'
	},
	idgadaccgipmpannjkmfddolnnhmeklj: {
		name: 'Text Blaze',
		file: 'images/bg.svg'
	},
	jbbplnpkjmmeebjpijfedlgcdilocofh: {
		name: 'WAVE',
		file: 'inject.js'
	},
	jfedfbgedapdagkghmgibemcoggfppbb: {
		name: 'cat-catch',
		file: 'catch-script/i18n.js'
	},
	kdfieneakcjfaiglcfcgkidlkmlijjnh: {
		name: 'AI Grammar and Spell Checker',
		file: 'assets/logo.png'
	},
	laankejkbhbdhmipfmgcngdelahlfoji: {
		name: 'StayFocusd',
		file: 'icon-16.png'
	},
	nbmoafcmbajniiapeidgficgifbfmjfo: {
		name: 'AVG Online Security',
		file: 'icons/bg.png'
	},
	nlmmgnhgdeffjkdckmikfpnddkbbfkkk: {
		name: 'Lightning Autofill',
		file: 'css/wizard.css'
	},
	onepmapfbjohnegdmfhndpefjkppbjkm: {
		name: 'SuperCopy',
		file: 'mf'
	},
	pdnenlnelpdomajfejgapbdpmjkfpjkp: {
		name: 'Jetwriter AI (formerly ChatGPT Writer)',
		file: 'content-scripts/content.css'
	},
	pjnefijmagpdjfhhkpljicbbpicelgko: {
		name: 'Voice In',
		file: 'setup.html'
	},
	pnlccmojcmeohlpggmfnbbiapkmbliob: {
		name: 'RoboForm',
		file: 'save-forms.html'
	},
	ahmapmilbkfamljbpgphfndeemhnajme: {
		name: 'Helperbird',
		file: 'pdf.html'
	},
	akncjgblpooaigmieecjiigaebgblnaj: {
		name: 'SaveFrom.net helper',
		file: 'includes/contextBridge.js'
	},
	blgcbajigpdfohpgcmbbfnphcgifjopc: {
		name: 'ExpressVPN Keys',
		file: 'html/autofill.html'
	},
	blillmbchncajnhkjfdnincfndboieik: {
		name: 'Glasp Web Highlighter',
		file: 'images/16.png'
	},
	cdnapgfjopgaggbmfgbiinmmbdcglnam: {
		name: 'OpenDyslexic',
		file: 'assets/fonts/opendyslexic/bold.otf'
	},
	cgdjpilhipecahhcilnafpblkieebhea: {
		name: 'Send to Kindle',
		file: 'images/s2k-sprite.png'
	},
	cpcifbdmkopohnnofedkjghjiclmhdah: {
		name: 'NeatDownloadManager',
		file: 'img/icon16.png'
	},
	cpgaheeihidjmolbakklolchdplenjai: {
		name: 'Turbo Downloader for Instagram',
		file: 'icons/igdl2.png'
	},
	dbepggeogbaibhgnhhndojpepiihcmeb: {
		name: 'Vimium',
		file: 'resources/tlds.txt'
	},
	dbjbempljhcmhlfpfacalomonjpalpko: {
		name: 'ImageAssistant',
		file: 'images/icon.png'
	},
	elpmkbbdldhoiggkjfpgibmjioncklbn: {
		name: 'Translate',
		file: 'helpers/icons/280.svg'
	},
	emalgedpdlghbkikiaeocoblajamonoh: {
		name: 'Karma',
		file: 'lottie/loader.json'
	},
	emnoomldgleagdjapdeckpmebokijail: {
		name: 'wanteeed',
		file: 'img/W.png'
	},
	eollffkcakegifhacjnlnegohfdlidhn: {
		name: 'Voice Control for ChatGPT',
		file: 'icon-34.png'
	},
	fedoeoceggohfajbhbadkfhgckjkieop: {
		name: 'Sound Equalizer',
		file: 'helpers/tuna.js'
	},
	gfbepnlhpkbgbkcebjnfhgjckibfdfkc: {
		name: 'FantasyPros',
		file: 'content/socket-event.js'
	},
	gikbaopejleepnfocphkejjbgaifnico: {
		name: 'Ripple Tools',
		file: 'data.json'
	},
	gnblbpbepfbfmoobegdogkglpbhcjofh: {
		name: 'Beyond 20',
		file: 'popup.html'
	},
	jajikjbellknnfcomfjjinfjokihcfoi: {
		name: 'All Block',
		file: 'strictblock.html'
	},
	jkncabbipkgbconhaajbapbhokpbgkdc: {
		name: 'Cegid Peoplenet ClickOnce launcher',
		file: 'nativeinstall.html'
	},
	kpiecbcckbofpmkkkdibbllpinceiihk: {
		name: 'DotVPN',
		file: 'popup.html'
	},
	lhgiigkiddoalobhmmcpdhddlccindjj: {
		name: 'Seesaw',
		file: 'images/cropped_image.png'
	},
	llaficoajjainaijghjlofdfmbjpebpa: {
		name: 'New Tab Page',
		file: 'newtab.html'
	},
	lokadhdaghfjbmailhhenifjejpokche: {
		name: 'AppWriter Cloud',
		file: 'menu.html'
	},
	maekfnoeejhpjfkfmdlckioggdcdofpg: {
		name: 'Adblocker for Youtube',
		file: 'js/rate.js'
	},
	mbnbehikldjhnfehhnaidhjhoofhpehk: {
		name: 'CSS Peeper',
		file: 'colors.3a754b95.png'
	},
	mbpaklahifpfndjiefdfjhmkefppocfm: {
		name: 'Assinatura Digital',
		file: 'ok.png'
	},
	mcgbeeipkmelnpldkobichboakdfaeon: {
		name: 'BLACKBOX.AI',
		file: 'logo.png'
	},
	npdkkcjlmhcnnaoobfdjndibfkkhhdfn: {
		name: 'Read Aloud',
		file: 'background.js'
	},
	oboonakemofpalcgghocfoadofidjkkk: {
		name: 'KeePassXC-Browser',
		file: 'css/totp.css'
	},
	ofgdcdohlhjfdhbnfkikfeakhpojhpgm: {
		name: 'Enable Right Click',
		file: 'js/welcome.js'
	},
	pbanhockgagggenencehbnadejlgchfc: {
		name: 'Simplify Copilot',
		file: 'css/styles.css'
	},
	pnjaodmkngahhkoihejjehlcdlnohgmp: {
		name: 'feeder',
		file: 'extension-icons/icon48x48.png'
	},
	pphgdbgldlmicfdkhondlafkiomnelnk: {
		name: '1ClickVPN Proxy',
		file: 'libs/requests.js'
	},
	abikfbojmghmfjdjlbagiamkinbmbaic: {
		name: 'Equalizer',
		file: 'content.js'
	},
	achogidmbhmofkmpgamphmlebdhgkdhc: {
		name: 'Soda PDF Viewer',
		file: 'favicon.ico'
	},
	afkoofjocpbclhnldmmaphappihehpma: {
		name: 'zkPass TransGate',
		file: 'manifest.json'
	},
	agjnjboanicjcpenljmaaigopkgdnihi: {
		name: 'PreMiD',
		file: 'icons/PreMiD.png'
	},
	aiifbnbfobpmeekipheeijimdpnlpgpp: {
		name: 'Station Wallet',
		file: 'keplr.js'
	},
	ajhbdcgfhlhhmocddefknjjkejcfpbnj: {
		name: 'Allow Copy +',
		file: 'images/resolve_online_test_test-helper___test_bro.gif'
	},
	appcnhiefcidclcdjeahgklghghihfok: {
		name: 'GMAL',
		file: 'shims.js'
	},
	bckjlihkmgolmgkchbpiponapgjenaoa: {
		name: 'Jungle Scout',
		file: 'images/48.png'
	},
	bmhcbmnbenmcecpmpepghooflbehcack: {
		name: 'Liner',
		file: 'fonts/ABCArizonaFlare-Regular.woff2'
	},
	cbapcdnkcgiajboppakkhjmdolbkinge: {
		name: 'ChatbotsPlace',
		file: 'logo/logo_128.png'
	},
	cmkdbmfndkfgebldhnkbfhlneefdaaip: {
		name: 'WhatRuns',
		file: 'popup.html'
	},
	ddaloccgjfibfpkalenodgehlhkgoahe: {
		name: 'Dragon Ext',
		file: 'nuanria.Chrome.js'
	},
	demgbalbngngkkgjcofhdiiipjblblob: {
		name: 'Horizon Browser Redirection',
		file: 'injectEnhBrowserRedir.js'
	},
	dfablgdffinpaeiilgjpebchbacimpoa: {
		name: 'eParaksts signing',
		file: 'eparaksts-page.js'
	},
	dicgkflojhbopmagcacdklcpdfdcnhko: {
		name: 'Converter',
		file: 'iframe.html'
	},
	dlcobpjiigpikoobohmabehhmhfoodbb: {
		name: 'Ready Wallet',
		file: 'inpage.js'
	},
	eanggfilgoajaocelnaflolkadkeghjp: {
		name: 'HARPA AI',
		file: 'oi.js'
	},
	eenflijjbchafephdplkdmeenekabdfb: {
		name: 'Alitools',
		file: 'assets/fonts/OpenSans-Regular-latin-400.woff2'
	},
	ejjladinnckdgjemekebdpeokbikhfci: {
		name: 'Petra',
		file: 'static/js/inpage.js'
	},
	fofjcndophjadilglgimelemjkjblgpf: {
		name: 'ZoomInfo',
		file: 'index.html'
	},
	glcipcfhmopcgidicgdociohdoicpdfc: {
		name: 'Muzli',
		file: 'js/app.js'
	},
	haebnnbpedcbhciplfhjjkbafijpncjl: {
		name: 'TinEye Reverse Image Search',
		file: 'assets/tineye48.png'
	},
	idnnbdplmphpflfnlkomgpfbpcgelopg: {
		name: 'Xverse',
		file: 'inpage.js'
	},
	ienfalfjdbdpebioblfackkekamfmbnh: {
		name: 'Angular DevTools',
		file: 'app/backend_bundle.js'
	},
	ihmgiclibbndffejedjimfjmfoabpcke: {
		name: 'Mate Translate',
		file: 'images/ui/help.png'
	},
	imgpenhngnbnmhdkpdfnfhdpmfgmihdn: {
		name: 'IObit Surfing Protection',
		file: 'Plugin/Test.js'
	},
	jdianbbpnakhcmfkcckaboohfgnngfcc: {
		name: 'Email Extractor',
		file: 'css/help.css'
	},
	jifcoadedkediabkmjbflemiblmnbjfk: {
		name: 'CyberArk Identity',
		file: 'content/style-idle.css'
	},
	jlmpjdjjbgclbocgajdjefcidcncaied: {
		name: 'daily.dev',
		file: 'index.html'
	},
	jpbjcnkcffbooppibceonlgknpkniiff: {
		name: 'Global Speed',
		file: 'circles/16.svg'
	},
	ldmmifpegigmeammaeckplhnjbbpccmm: {
		name: 'Save to Notion',
		file: 'popup/index.html'
	},
	lfidjngibpklhhijphdmbmedchiiolgk: {
		name: 'Omnissa Horizon URL Content Redirection Helper',
		file: 'ConfigLoader.html'
	},
	lggdbpblkekjjbobadliahffoaobaknh: {
		name: 'Tango',
		file: 'overlay.js'
	},
	lgomjifbpjfhpodjhihemafahhmegbek: {
		name: 'NCapture',
		file: 'icons/ncapture-48.png'
	},
	lhannfkhjdhmibllojbbdjdbpegidojj: {
		name: 'Screenshot & Screen Video Recorder',
		file: 'mf'
	},
	lijhjhlnfifgoabbihoobnfapogkcjgk: {
		name: 'Scrible',
		file: 'images/Favicon32.png'
	},
	lknmjhcajhfbbglglccadlfdjbaiifig: {
		name: 'Record, Transcribe & ChatGPT for Google Meet',
		file: 'content-scripts/multi-tabs.css'
	},
	lnbmbgocenenhhhdojdielgnmeflbnfb: {
		name: 'SellerSprite',
		file: 'assets/fontjs.js'
	},
	mcebeofpilippmndlpcghpmghcljajna: {
		name: 'Lusha',
		file: 'frame.html'
	},
	mfpiaehgjbbfednooihadalhehabhcjo: {
		name: 'Scrolling screenshot tool & screen capture',
		file: 'images/clear.png'
	},
	mhmphnocemakkjdampibehejoaleebpo: {
		name: 'SuperNova',
		file: 'enabler.html'
	},
	migomhggnppjdijnfkiimcpjgnhmnale: {
		name: 'CrossPilot',
		file: 'html/options.html'
	},
	mjgcgnfikekladnkhnimljcalfibijha: {
		name: 'DocHub',
		file: 'blank.html'
	},
	mmanaflgaempokjfbeeabkadnkoidjam: {
		name: 'DSers',
		file: 'options.js'
	},
	mnoiedledcncagkonmmhbenokojeciib: {
		name: 'Tesla Search',
		file: 'inject_content.js'
	},
	nfmmmhanepmpifddlkkmihkalkoekpfd: {
		name: 'FetchV',
		file: 'js/hook.js'
	},
	nkkhljadiejecbgelalchmjncoilpnlk: {
		name: 'Video Speed Controller',
		file: 'styles/cnt.css'
	},
	oalnnpgcgikdnenhjigoaencbppcmgel: {
		name: 'LexiFlow',
		file: 'views/action-popup.html'
	},
	oejgccbfbmkkpaidnkphaiaecficdnfn: {
		name: 'Toggl Track',
		file: 'settings.html'
	},
	pfjdepjjfjjahkjfpkcgfmfhmnakjfba: {
		name: 'Detailed SEO',
		file: 'assets/url-5EKKMhqX.js'
	},
	aaengkeeajpfabihmmmnkjpogmfkahjo: {
		name: 'TxtAnalyser',
		file: 'css/layout.css'
	},
	aefalnopbcachhkjnihfjgglnjdegicg: {
		name: 'uPerform',
		file: 'inject.inappui5.js'
	},
	aeidadjdhppdffggfgjpanbafaedankd: {
		name: 'SignalHire',
		file: 'inject.js'
	},
	aiamjjeggglngiggkmmbnpnpeejjejaf: {
		name: 'Read AI',
		file: 'index.css'
	},
	aikflfpejipbpjdlfabpgclhblkpaafo: {
		name: 'WeTab',
		file: 'hm.js'
	},
	akimgimeeoiognljlfchpbkpfbmeapkh: {
		name: 'Google Arts & Culture',
		file: 'fonts/mat_icons.woff2'
	},
	alncdjedloppbablonallfbkeiknmkdi: {
		name: 'Night Eye',
		file: 'css/home.css'
	},
	baecjmoceaobpnffgnlkloccenkoibbb: {
		name: 'NoteGPT',
		file: 'src/assets/base.css'
	},
	bfidboloedlamgdmenmlbipfnccokknp: {
		name: 'PureVPN',
		file: 'assets/js/script.js'
	},
	bhiichidigehdgphoambhjbekalahgha: {
		name: 'Font Finder',
		file: 'data/window/index.html'
	},
	bjfhmglciegochdpefhhlphglcehbmek: {
		name: 'Hypothesis',
		file: 'help/index.js'
	},
	bkemklnfmefiejflhjpelnoopmehdkaf: {
		name: 'SaveFrom.net helper',
		file: 'includes/contextBridge.js'
	},
	blkboeaihdlecgdjjgkcabbacndbjibc: {
		name: 'DocuSign',
		file: 'shell.html'
	},
	bmhejbnmpamgfnomlahkonpanlkcfabg: {
		name: 'Dropbox Passwords',
		file: 'save_prompt.html'
	},
	bnompdfnhdbgdaoanapncknhmckenfog: {
		name: 'Email Tracker',
		file: 'lib/gmail.js'
	},
	cbnaodkpfinfiipjblikofhlhlcickei: {
		name: 'Weava Highlighter',
		file: 'main.js'
	},
	cipccbpjpemcnijhjcdjmkjhmhniiick: {
		name: 'SciSpace',
		file: 'asset-manifest.json'
	},
	ckkdlimhmcjmikdlpkmbgfkaikojcbjk: {
		name: 'Markdown Viewer',
		file: 'themes/new.css'
	},
	ddlbpiadoechcolndfeaonajmngmhblj: {
		name: 'Compose AI',
		file: 'gdocsInject.js'
	},
	dfnhijmficoiilogkjlnkionfjlgecdi: {
		name: 'PDF2Go',
		file: 'iframe.html'
	},
	didegimhafipceonhjepacocaffmoppf: {
		name: 'passbolt',
		file: 'webAccessibleResources/js/dist/app.js'
	},
	dkaagdgjmgdmbnecmcefdhjekcoceebi: {
		name: 'PerfectPixel',
		file: 'settings.html'
	},
	dkagmnnkfinalebballociekdnlaniem: {
		name: 'Ad Block Genius',
		file: 'blocked.html'
	},
	ecabifbgmdmgdllomnfinbmaellmclnh: {
		name: 'Reader View',
		file: 'data/reader/template.html'
	},
	ecmeogcbcoalojmkfkmancobmiahaigg: {
		name: '아이템스카우트',
		file: 'popup/popup.html'
	},
	efbglgofoippbgcjepnhiblaibcnclgk: {
		name: 'Martian Aptos & Sui Wallet',
		file: 'inpage.js'
	},
	eifflpmocdbdmepbjaopkkhbfmdgijcc: {
		name: 'JSON Viewer',
		file: 'js/main.js'
	},
	fcfcfllfndlomdhbehjjcoimbgofdncg: {
		name: 'Leap Wallet',
		file: 'injectLeap.js'
	},
	fddhonoimfhgiopglkiokmofecgdiedb: {
		name: 'RingCentral',
		file: 'content.js'
	},
	fefnkplkicihcoenmljhbihhaaagjhpp: {
		name: 'Mino',
		file: 'css/popup.css'
	},
	felcpnemckonbbmnoakbjgjkgokkbaeo: {
		name: 'Trusted Shops',
		file: 'logo_eu_b2b.3b670708.png'
	},
	ffnbelfdoeiohenkjibnmadjiehjhajb: {
		name: 'Yoroi',
		file: 'js/initialInject.js'
	},
	fpjppnhnpnknbenelmbnidjbolhandnf: {
		name: 'E.C.P',
		file: 'content_script_web_accessible/ecp_regular.js'
	},
	fpnmgdkabkmnadcjpehmlllkndpkmiak: {
		name: 'Wayback Machine',
		file: 'css/archive.css'
	},
	gcjpefhffmcgplgklffgbebganmhffje: {
		name: 'NetSupport School Student',
		file: 'oem.json'
	},
	ggaabchcecdbomdcnbahdfddfikjmphe: {
		name: 'Chrome Capture',
		file: 'images/ic_16.png'
	},
	goabeeekdabpokgoieonknlecpaoejon: {
		name: 'Great Start',
		file: 'icons/icon128.png'
	},
	hgmoccdbjhknikckedaaebbpdeebhiei: {
		name: 'Ahrefs SEO Toolbar',
		file: 'images/check.svg'
	},
	hhlhjgianpocpoppaiihmlpgcoehlhio: {
		name: 'Super Simple Highlighter',
		file: 'js/chunks/ss-rMQDD.js'
	},
	hljakogpibfgelmoegmajaeefcnefngd: {
		name: 'MyLOFT',
		file: 'icons/icon19.png'
	},
	ihpiinojhnfhpdmmacgmpoonphhimkaj: {
		name: 'Open in VLC media player',
		file: 'data/inject/index.js'
	},
	iibninhmiggehlcdolcilmhacighjamp: {
		name: 'Magical',
		file: 'assets/hands.svg'
	},
	iihkglbebihpaflfihhkfmpabjgdpnol: {
		name: '楽天ウェブ検索',
		file: 'img/rtt.png'
	},
	ikhdkkncnoglghljlkmcimlnlhkeamad: {
		name: '划词翻译',
		file: '63.js'
	},
	inlikjemeeknofckkjolnjbpehgadgge: {
		name: 'Distill Web Monitor',
		file: 'ui/lib/qs.js'
	},
	inmopeiepgfljkpkidclfgbgbmfcennb: {
		name: 'Responsive Viewer',
		file: 'main.css'
	},
	jdbnofccmhefkmjbkkdkfiicjkgofkdh: {
		name: 'Bookmarks',
		file: 'css/sidebar.css'
	},
	jiihcciniecimeajcniapbngjjbonjan: {
		name: 'Vidyard',
		file: 'camera.html'
	},
	jpefmbpcbebpjpmelobfakahfdcgcmkl: {
		name: 'Adblock for YouTube',
		file: 'assets/options.css'
	},
	kaibcgikagnkfgjnibflebpldakfhfih: {
		name: 'CS2 Trader',
		file: 'js/injectToPage/ShowTradeOffer.js'
	},
	kiilhncajadbgbmdbdcopdpnmdhlbdle: {
		name: 'CRXLauncher',
		file: 'sb.html'
	},
	kiodaajmphnkcajieajajinghpejdjai: {
		name: 'Popup Blocker Pro',
		file: 'js/inject.js'
	},
	kkkbiiikppgjdiebcabomlbidfodipjg: {
		name: 'Substital',
		file: 'css/vex/vex.css'
	},
	lgbjhdkjmpgjgcbcdlhkokkckpjmedgc: {
		name: 'DualSafe Password Manager',
		file: 'css/fail.css'
	},
	lhdoppojpmngadmnindnejefpokejbdd: {
		name: 'axe DevTools',
		file: 'highlighter.js'
	},
	lieogkinebikhdchceieedcigeafdkid: {
		name: 'Eagle',
		file: 'locales/de.json'
	},
	ljmaegmnepbgjekghdfkgegbckolmcok: {
		name: 'Horizon HTML5 Redirection',
		file: 'html5mmrPlayer.js'
	},
	mffifeinkgjdnhnamgabdknfkdnmkgmj: {
		name: 'HelloID',
		file: 'Framework/css/SSO.css'
	},
	mkpegjkblkkefacfnmkajcjmabijhclg: {
		name: 'Magic Eden',
		file: 'inapp.js'
	},
	mpiodijhokgodhhofbcjdecpffjipkle: {
		name: 'SingleFile',
		file: 'lib/single-file-infobar.js'
	},
	naciaagbkifhpnoodlkhbejjldaiffcm: {
		name: 'Get Token Cookie',
		file: 'css/media.css'
	},
	nbkomboflhdlliegkaiepilnfmophgfg: {
		name: 'Custom Progress Bar for YouTube',
		file: 'style.js'
	},
	nbllaikcjebbpdemmekhnciekkjodlla: {
		name: 'SkrivaText',
		file: 'views/login.html'
	},
	necpbmbhhdiplmfhmjicabdeighkndkn: {
		name: 'Similar Sites',
		file: 'images/close.svg'
	},
	nfadicbbecgbdbgbibgflooojfbolpgk: {
		name: 'Pie Shopping',
		file: 'assets/page/suppressAlert.js'
	},
	ocfjjghignicohbjammlhhoeimpfnlhc: {
		name: 'Flash Player Enable',
		file: 'libs/ruffle/ruffle.js'
	},
	oeicpkgdngoghobnbjngekclpcmpgpij: {
		name: 'EverBee',
		file: 'svg/bell.svg'
	},
	oiecklaabeielolbliiddlbokpfnmhba: {
		name: 'RocketReach',
		file: 'chunks/index-8ecba142.js'
	},
	ojggmchlghnjlapmfbnjholfjkiidbch: {
		name: 'Venom Wallet',
		file: 'js/popup.js'
	},
	ojjjflcdgjegkdcojbahlbgeiinpbfgf: {
		name: 'Ad Remover',
		file: 'web_accessible_resources/empty'
	},
	ojplmecpdpgccookcobabopnaifgidhf: {
		name: 'BuyHatke',
		file: 'src/ui/css/app.css'
	},
	omaabbefbmiijedngplfjmnooppbclkk: {
		name: 'Tonkeeper',
		file: 'provider.js'
	},
	onhiacboedfinnofagfgoaanfedhmfab: {
		name: 'Reverso Context',
		file: 'dist/index.html'
	},
	opmeopcambhfimffbomjgemehjkbbmji: {
		name: 'VideoPlayer MPD/M3U8/M3U/EPG',
		file: 'play-on.png'
	},
	pccckmaobkjjboncdfnnofkonhgpceea: {
		name: 'HoverZoom',
		file: 'js/gumby.js'
	},
	pdliaogehgdbhbnmkklieghmmjkpigpa: {
		name: 'Bybit Wallet',
		file: 'allChain.578a133f.png'
	},
	pidkjcapccmhpdokcjnkngcflobhopdl: {
		name: 'Flappy Bird Offline',
		file: 'img/48.png'
	},
	pmjeegjhjdlccodhacdgbgfagbpmccpe: {
		name: 'Clockify',
		file: 'assets/images/$.png'
	},
	pnhplgjpclknigjpccbcnmicgcieojbh: {
		name: 'Diigo Web Collector',
		file: 'icon16.png'
	},
	abjopieldicnknjgiplcjgepeijbealm: {
		name: 'Single Sign-on Assistant',
		file: 'ux/main.js'
	},
	aeachknmefphepccionboohckonoeemg: {
		name: 'Coin98 Wallet',
		file: 'cosmos.99a9011a.js'
	},
	aefkmifgmaafnojlojpnekbpbmjiiogg: {
		name: 'Popup Blocker',
		file: 'data/ui/index.html'
	},
	alcgpfgkdjbabelklflpfkooadcfgoao: {
		name: 'Fabasoft Client',
		file: 'register.js'
	},
	anokgmphncpekkhclmingpimjmcooifb: {
		name: 'Compass Wallet for Sei',
		file: 'injectLeap.js'
	},
	apnedodbofogffiagpekmbeflilkcbgf: {
		name: 'YouTube To Text',
		file: 'html/popup_options/index.html'
	},
	bboccnojhhoegfffpcllbeigipedjedf: {
		name: 'Automation 360',
		file: 'HTMLSAPWrapper.js'
	},
	bekkpoinfafbjglppgdobfdeckghdhlo: {
		name: 'CRX Emulator',
		file: 'sb.html'
	},
	bhbhjjkcoghibhibegcmbomkbakkpdbo: {
		name: 'OCR',
		file: 'data/engine/index.html'
	},
	bkhaagjahfmjljalopjnoealnfndnagc: {
		name: 'Octotree',
		file: 'icons/logo.svg'
	},
	bmjmipppabdlpjccanalncobmbacckjn: {
		name: 'Cursor Style',
		file: 'css/effects.css'
	},
	cdockenadnadldjbbgcallicgledbeoc: {
		name: 'VisBug',
		file: 'tuts/font.gif'
	},
	cimiefiiaegbelhefglklhhakcgmhkai: {
		name: 'Plasma',
		file: 'page-script.js'
	},
	cmcgjnlehmgilhlcnaapgmhnomdidgek: {
		name: 'Free Video Downloader',
		file: 'pageScript.js'
	},
	cnjifjpddelmedmihgijeibhnjfabmlf: {
		name: 'Obsidian Web Clipper',
		file: 'style.css'
	},
	coplmfnphahpcknbchcehdikbdieognn: {
		name: 'TripChipper',
		file: 'popup.html'
	},
	cpeaihkccbeemkfefcapijechkbfjlhb: {
		name: 'AMZ Suggestion Expander',
		file: 'images/volume.png'
	},
	cpofhfeclnhnhodbcabgcihloffdpgpd: {
		name: 'Custom Cursor Trails',
		file: 'images/sun.svg'
	},
	dbkidnlfklnjanneifjjojofckpcogcl: {
		name: 'Lumin',
		file: 'assets/icons/i-32.png'
	},
	dgmanlpmmkibanfdgjocnabmcaclkmod: {
		name: 'Just Read',
		file: 'page.css'
	},
	dhhclfjehmpacimcdknijodpjpmppkii: {
		name: 'Slido',
		file: 'oauth-callback.html'
	},
	djnhkfljnimcpelfndpcjcgngmefaobl: {
		name: 'Talk&Comment',
		file: 'share.js'
	},
	dkfhfaphfkopdgpbfkebjfcblcafcmpi: {
		name: 'MightyText SMS',
		file: 'help.html'
	},
	dldjpboieedgcmpkchcjcbijingjcgok: {
		name: 'Fuel Wallet',
		file: 'assets/index-Djgr9AUB.js'
	},
	dlepebghjlnddgihakmnpoiifjjpmomh: {
		name: 'Revision History',
		file: 'js/191.js'
	},
	ecbnojockcgfohpopbphhgefkfbigcej: {
		name: 'Flash Player Emulator 2025',
		file: 'external/player.html'
	},
	eefedolmcildfckjamddopaplfiiankl: {
		name: 'ScreenPal',
		file: 'app/pip.html'
	},
	efhlocglafmcfhkpojjbckpbonbfbgdb: {
		name: 'Operata Collector',
		file: 'operata.js'
	},
	elfaihghhjjoknimpccccmkioofjjfkf: {
		name: 'StayFree',
		file: 'icon-16.png'
	},
	fbfppoaockpecjpbdmldojdehdpepfef: {
		name: 'Schoology Plus',
		file: 'imgs/logo.ai'
	},
	fdcnegogpncmfejlfnffnofpngdiejii: {
		name: 'Razor Wallet',
		file: 'injectScript.js'
	},
	fiikommddbeccaoicoejoniammnalkfa: {
		name: 'Nightly',
		file: 'assets/v4-DpnH3Xrl.js'
	},
	fkbfgpllpbhbofnhkefnfeignnanciie: {
		name: 'NetDocuments',
		file: 'images/nd.png'
	},
	fkiljfkkceaopbpfgfmjdnkiejaifkgd: {
		name: 'Jobalytics',
		file: 'js/util.js'
	},
	fmiojochalhealflohaicjncoofdjjfb: {
		name: 'Nuance PowerMic',
		file: 'NucaPowerMicChromeAdapter.js'
	},
	gcfcpohokifjldeandkfjoboemihipmb: {
		name: 'Undetectable AdBlocker',
		file: 'images/transparent.gif'
	},
	gdfeccaioepgmgjcecjpiabelmbbpijf: {
		name: 'Cool Ad Popup Blocker',
		file: 'protection_enabled.png'
	},
	gdojjgflncpbcfmenbkndfhoamlhajmf: {
		name: 'Annotate',
		file: 'icon.png'
	},
	gfcjepjdkheiliokjanjkhfhfdmapcah: {
		name: 'NeuralWriter',
		file: 'math.js'
	},
	giihipjfimkajhlcilipnjeohabimjhi: {
		name: 'SEO Minion',
		file: 'img/on.png'
	},
	gkkdmjjodidppndkbkhhknakbeflbomf: {
		name: 'Selectext',
		file: 'login.css'
	},
	gmegofmjomhknnokphhckolhcffdaihd: {
		name: 'JSONView',
		file: 'viewer.css'
	},
	gnldpbnocfnlkkicnaplmkaphfdnlplb: {
		name: 'Test & Feedback',
		file: 'Fonts/segoe.ttf'
	},
	goficmpcgcnombioohjcgdhbaloknabb: {
		name: 'Note Board',
		file: 'NoteBoard.png'
	},
	gphandlahdpffmccakmbngmbjnjiiahp: {
		name: 'PDF Editor',
		file: 'img/loader.gif'
	},
	gplcmncpklkdjiccbknjjkoidpgkcakd: {
		name: 'Copyleaks',
		file: 'assets/icons/cl-logo.svg'
	},
	hbdkkfheckcdppiaiabobmennhijkknn: {
		name: 'Open SEO Stats',
		file: 'profile.html'
	},
	hghakoefmnkhamdhenpbogkeopjlkpoa: {
		name: 'Lean Library',
		file: 'popup.css'
	},
	hjbfbllnfhppnhjdhhbmjabikmkfekgf: {
		name: 'Koala Inspector',
		file: 'kins_stabilizer.js'
	},
	hkojjajclkgeijhcmfjcjkddfjpaimek: {
		name: 'QR Code',
		file: 'scripts/common.js'
	},
	hldjnlbobkdkghfidgoecgmklcemanhm: {
		name: 'Web Highlights',
		file: 'content.js'
	},
	hmlcjjclebjnfohgmgikjfnbmfkigocc: {
		name: 'J2TEAM Security',
		file: 'assets/chunk-d767bc7e.js'
	},
	iadokddofjgcgjpjlfhngclhpmaelnli: {
		name: 'Careerflow AI',
		file: 'content.style.css'
	},
	iapifmceeokikomajpccajhjpacjmibe: {
		name: 'Auto Fill',
		file: 'wizard.js.map'
	},
	ibefaeehajgcpooopoegkifhgecigeeg: {
		name: '壹伴',
		file: 'mpa-editor.js'
	},
	iddnbalhmdkipfcopclcnchagfbmcgjb: {
		name: 'Textio',
		file: 'setCKEData.js'
	},
	iebpjdmgckacbodjpijphcplhebcmeop: {
		name: 'Table Capture',
		file: 'clips.html'
	},
	ieldiilncjhfkalnemgjbffmpomcaigi: {
		name: 'Portal',
		file: '476.css'
	},
	ihhkmalpkhkoedlmcnilbbhhbhnicjga: {
		name: 'Bardeen',
		file: '81.js'
	},
	ilfoopambfaclfjmpiaijnccgcmbeigi: {
		name: 'FormApps',
		file: 'logoS_chrome.png'
	},
	infppggnoaenmfagbfknfkancpbljcca: {
		name: 'Automa',
		file: 'icon-128.png'
	},
	inhcgfpbfdjbjogdfjbclgolkmhnooop: {
		name: 'AI Sidebar',
		file: 'logo.svg'
	},
	iohjgamcilhbgmhbnllfolmkmmekfmci: {
		name: 'Jam',
		file: 'iui.html'
	},
	ipikiaejjblmdopojhpejjmbedhlibno: {
		name: 'SwiftRead',
		file: 'images/close.svg'
	},
	jchomknmfdaeojlimglgebnjlijedgnk: {
		name: 'Qantas Shopping Points-Prompter',
		file: 'assets/Ciutadella-Regular.woff'
	},
	jcmljanephecacpljcpiogonhhadfpda: {
		name: 'Add to Babylist Button',
		file: 'clientSide.js'
	},
	jdelodjlpgkjenhcongcfdcocmjgjbci: {
		name: 'MY AD FINDER',
		file: 'assets/sad.png'
	},
	jdkknkkbebbapilgoeccciglkfbmbnfm: {
		name: 'Apollo Client Devtools',
		file: 'hook.js'
	},
	jeehnidbmlhpkncbplipfalpjkhlokaa: {
		name: 'Poll Everywhere for Google Slides',
		file: 'fonts/pollev_assets/glyphs_kx77ruz8wzhgvwz4iuvtq.woff'
	},
	jigflhhckdjdefdjmodlkomnmdonfbbn: {
		name: 'Joko',
		file: 'assets/eye.svg'
	},
	jiiigigdinhhgjflhljdkcelcjfmplnd: {
		name: 'Mango Wallet',
		file: 'dapp-interface.js'
	},
	jiofmdifioeejeilfkpegipdjiopiekl: {
		name: 'YesCaptcha assistant',
		file: 'content/injected.js'
	},
	jipdnfibhldikgcjhfnomkfpcebammhp: {
		name: 'rikaikun',
		file: 'css/popup.css'
	},
	jlleokkdhkflpmghiioglgmnminbekdi: {
		name: 'GIPHY',
		file: 'img/up.png'
	},
	jnlgamecbpmbajjfhmmmlhejkemejdma: {
		name: 'Braavos',
		file: 'static/js/inpage.js'
	},
	jpjlphemcdmgimfmlmjlnfebflgaaoic: {
		name: 'AutoSBC',
		file: 'autosbc.js'
	},
	kajibbejlbohfaggdiogboambcijhkke: {
		name: 'Mailvelope',
		file: 'main.css'
	},
	kbbdabhdfibnancpjfhlkhafgdilcnji: {
		name: 'Screenity',
		file: 'setup.html'
	},
	kgmohllpiohdkkhhkfneojbadinddkpm: {
		name: 'Opus Advisor',
		file: 'index.html'
	},
	khpkpbbcccdmmclmpigdgddabeilkdpd: {
		name: 'Suiet',
		file: 'dapp-api.js'
	},
	kicgclkbiilobmccmmidfghnijgfamdb: {
		name: 'IG Tools',
		file: 'options.html'
	},
	lbnoedlobifdhbpjkcfhcbdcjhampmne: {
		name: 'Instant Gaming',
		file: 'images/logo.svg'
	},
	ldjkgaaoikpmhmkelcgkgacicjfbofhh: {
		name: 'Instapaper',
		file: 'img/tag.svg'
	},
	llimhhconnjiflfimocjggfjdlmlhblm: {
		name: 'Reader Mode',
		file: 'main.html'
	},
	lokjgaehpcnlmkebpmjiofccpklbmoci: {
		name: 'Toucan',
		file: 'images/star.svg'
	},
	lpfcbjknijpeeillifnkikgncikgfhdo: {
		name: 'Nami',
		file: 'icon-34.png'
	},
	lpindahibbkakkdjifonckbhopdoaooe: {
		name: '3DOS Network',
		file: 'assets/css/ui.chunk.css'
	},
	mdnleldcmiljblolnjhpnblkcekpdkpa: {
		name: 'Requestly',
		file: 'libs/cacheJson.js'
	},
	mfpddejbpnbjkjoaicfedaljnfeollkh: {
		name: 'Delinea Web Password Filler',
		file: 'popup.css'
	},
	mjdbhokoopacimoekfgkcoogikbfgngb: {
		name: 'Trancy',
		file: 'assets/hbo.svg'
	},
	nbhcbdghjpllgmfilhnhkllmkecfmpld: {
		name: 'User JS CSS',
		file: 'js-shared/jquery.min.js'
	},
	ncldcbhpeplkfijdhnoepdgdnmjkckij: {
		name: 'iGuge',
		file: 'img/128ico.png'
	},
	nfmlkliedggdodlbgghmmchhgckjoaml: {
		name: 'Spotify Ad Blocker',
		file: 'yt.js'
	},
	noojglkidnpfjbincgijbaiedldjfbhh: {
		name: 'Buffer',
		file: 'icon16.png'
	},
	nopjifljihndhkfeogabcclpgpceapln: {
		name: 'IntoWords Cloud',
		file: 'stt.html'
	},
	npnbdojkgkbcdfdjlfdmplppdphlhhcf: {
		name: 'ProWritingAid',
		file: 'index.html'
	},
	oehooocookcnclgniepdgaiankfifmmn: {
		name: 'Pancake v2',
		file: 'pancext.html'
	},
	ogadflejmplcdhcldlloonbiekhnlopp: {
		name: 'Volume Booster',
		file: 'img/32.png'
	},
	ohgndokldibnndfnjnagojmheejlengn: {
		name: 'Citavi Picker',
		file: 'shared.js'
	},
	oiaejidbmkiecgbjeifoejpgmdaleoha: {
		name: 'Stylebot',
		file: 'editor/index.css'
	},
	oibcaeeplepnjfjhokfcabnaafodppik: {
		name: 'GMB Everywhere',
		file: 'imgs/gmb.png'
	},
	onhogfjeacnfoofkfgppdlbmlmnplgbn: {
		name: 'SubWallet',
		file: 'page.js'
	},
	pdadlkbckhinonakkfkdaadceojbekep: {
		name: 'ZED',
		file: 'images/8.gif'
	},
	pfjibkklgpfcfdlhijfglamdnkjnpdeg: {
		name: 'AliRadar',
		file: 'settings.html'
	},
	pkgccpejnmalmdinmhkkfafefagiiiad: {
		name: 'FeHelper',
		file: 'background/tools.js'
	},
	pliibjocnfmkagafnbkfcimonlnlpghj: {
		name: 'ClickUp',
		file: 'popup.js'
	},
	pncfbmialoiaghdehhbnbhkkgmjanfhe: {
		name: 'uBlacklist',
		file: 'pages/options.html'
	},
	aadbahhifnekkkcbapdfandpimaoacmj: {
		name: 'AliPrice Search by image for China import',
		file: 'assets/js/popup.js'
	},
	aadiiicebnjmjmibjengdohedcfeekeg: {
		name: 'Sorftime Save',
		file: 'wmFetch.js'
	},
	aaeebnpadcfccmajghdpojkjobbpjmfj: {
		name: 'Giant ad blocker',
		file: 'filters/data.json'
	},
	aaekanoannlhnajolbijaoflfhikcgng: {
		name: 'Charcoal',
		file: 'charcoal_settings.html'
	},
	aajjgdpofhhcjmjoombjdfepplndhgcp: {
		name: 'Gemini AI',
		file: 'js/all.js'
	},
	acjecbgflnhmeldadcbblhfdimhifpki: {
		name: 'Custom Calendar Background',
		file: 'options.html'
	},
	acoebbnponmcjjdebfdkgpcjpedojflf: {
		name: 'FCM',
		file: 'popup.html'
	},
	adkbpbalabenjlfngiefoifoebjpbjjl: {
		name: 'Extract Text from Image',
		file: 'assets/x.js'
	},
	aeldeepjdhhldhbgfodleiodmeegnacm: {
		name: 'PhotoSolve',
		file: 'icons/x.png'
	},
	aggiiclaiamajehmlfpkjmlbadmkledi: {
		name: 'TransOver',
		file: 'popup.js'
	},
	aholpfdialjgjfhomihkjbmgjidlcdno: {
		name: 'Exodus',
		file: 'inapp.js'
	},
	aipkkddccajhejhkiefholbpknhmoaep: {
		name: 'Restore Old Roblox Server List',
		file: 'html/main.html'
	},
	ajiejmhbejpdgkkigpddefnjmgcbkenk: {
		name: 'Clipboard',
		file: 'ckeditor-inject.js'
	},
	ajjpfpfbgjcgghkgbcgmifkonjdldgkh: {
		name: 'Popup Blocker Max',
		file: 'ui/popup.html'
	},
	ajlcnbbeidbackfknkgknjefhmbngdnj: {
		name: 'Pixiv Toolkit Next',
		file: 'lib/ffmpeg/ffmpeg-core.wasm'
	},
	akfldeakecjegioiiajhpjpekomdjnmh: {
		name: 'Gemalto Web Signer for Barclays',
		file: 'assets/css/main.css'
	},
	akmdionenlnfcipmdhbhcnkighafmdha: {
		name: 'X (Twitter) Video Downloader',
		file: 'content.js'
	},
	akmglodbcihkcgojpdmbocmlpkfjhfof: {
		name: 'Mirror Mode for Google Meet',
		file: 'styles/body.css'
	},
	amembkpfochonfalpaelodhiaangjpih: {
		name: 'AliAssist',
		file: 'images/local.png'
	},
	amjmjholfoknokffkiolahocokcaecnc: {
		name: 'Send Anywhere',
		file: 'pdf-upload.html'
	},
	amknoiejhlmhancpahfcfcfhllgkpbld: {
		name: 'Hoppscotch',
		file: 'index.js.map'
	},
	andgibkjiikabclfdkecpmdkfanpdapf: {
		name: 'GIPHY for Gmail',
		file: 'img/up.png'
	},
	andhndehpcjpmneneealacgnmealilal: {
		name: 'HaHa Wallet',
		file: 'home.html'
	},
	appojfilknpkghkebigcdkmopdfcjhim: {
		name: 'Passwordstate',
		file: 'getpasskey.html'
	},
	baahncfnjojaofhdmdfkpeadigoemkif: {
		name: 'VoiceWave',
		file: 'index.html'
	},
	bbbiejemhfihiooipfcjmjmbfdmobobp: {
		name: 'BewlyBewly',
		file: 'assets/empty.png'
	},
	bbmolahhldcbngedljfadjlognfaaein: {
		name: 'CheerpJ Applet Runner',
		file: 'cheerpj/c.js'
	},
	bbobopahenonfdgjgaleledndnnfhooj: {
		name: 'AB Download Manager',
		file: 'assets/Config-486537b1.js'
	},
	bcellnicpceplkigjnldelfglfmomhon: {
		name: 'FEPWeb CMS Digital Signature',
		file: 'manifest.json'
	},
	bchkdkhfodkkpohjhabdgfhpgjkkgfhg: {
		name: 'AnswerAI',
		file: 'assets/add.png'
	},
	bebmphofpgkhclocdbgomhnjcpelbenh: {
		name: 'Translator',
		file: 'images/48.png'
	},
	bekopgepchoeepdmokgkpkfhegkeohbl: {
		name: 'App for Language',
		file: 'manifest.json'
	},
	bfelalhndlhoohbhiddkmkjhcaipclcn: {
		name: 'Ad Blocker Elite',
		file: 'icon.png'
	},
	bhmibpbadaengbikmoglphhlhioajdjn: {
		name: 'Sphere Lite',
		file: 'js/detect.js'
	},
	bincmiainjofjnhchmcalkanjebghoen: {
		name: 'AG Translate',
		file: 'pdf.html'
	},
	bjnkkhimoaclnddigpphpgkfgeggokam: {
		name: 'Level up for Dynamics 365/Power Apps',
		file: 'scripts/Sdk.Soap.min.js'
	},
	bkagcmloachflbbkfmfiggipaelfamdf: {
		name: 'FoE',
		file: 'js/popup.js'
	},
	bkkjeefjfjcfdfifddmkdmcpmaakmelp: {
		name: 'Truffle',
		file: 'devtools/index.html'
	},
	bnmojkbbkkonlmlfgejehefjldooiedp: {
		name: 'Otter.ai',
		file: 'offscreen.html'
	},
	bobjajapamhdnbnimmaddcceeckkoiff: {
		name: 'Total WebShield',
		file: 'app/lander/index.html'
	},
	boffdonfioidojlcpmfnkngipappmcoh: {
		name: 'FC25 Enhancer',
		file: 'js/main.js'
	},
	bohahkiiknkelflnjjlipnaeapefmjbh: {
		name: 'Note Anywhere',
		file: 'assets/css/sticky.css'
	},
	bpnedgjmphmmdgecmklcopblfcbhpefm: {
		name: 'DjVu.js Viewer',
		file: 'viewer.html'
	},
	caejcfciegnnnepdhaopdogngbmojodl: {
		name: 'Kimi Explorer',
		file: 'content-scripts/content.css'
	},
	ccnpdidcjgcdgaopacccfghmgdlipnoc: {
		name: 'Laser Cat',
		file: 'js/eye.js'
	},
	cdoblkdcnbcdlcfklmbmkapbekgfbijp: {
		name: 'Happy dog',
		file: 'images/ball.png'
	},
	cfmnkhhioonhiehehedmnjibmampjiab: {
		name: 'start.me',
		file: 'popup.html'
	},
	chkgcmmjoejpekoegkedcpifgfhpjmec: {
		name: 'Library',
		file: 'css/common.css'
	},
	chmpifjjfpeodjljjadlobceoiflhdid: {
		name: 'Outreach Everywhere',
		file: 'gmail-globals.js'
	},
	cjdnfmjmdligcpfcekfmenlhiopehjkd: {
		name: 'TwoSeven',
		file: 'web_resources/dummy.js'
	},
	cmncbfaaiogmfeelmicmaafbibedljpk: {
		name: 'Mangoboard ColorPicker',
		file: 'edropper2.js'
	},
	cmnlolelipjlhfkhpohphpedmkfbobjc: {
		name: 'Glarity ChatGPT',
		file: 'subtitle/inject.js'
	},
	cpgamigjcbffkaiciiepndmonbfdimbb: {
		name: 'Axiom Browser Automation & Web Scraping',
		file: 'jquery.js'
	},
	cpikalnagknmlfhnilhfelifgbollmmp: {
		name: 'Naoris Protocol Browser Security Node',
		file: 'icons/tick.png'
	},
	cpmkedoipcpimgecpmgpldfpohjplkpp: {
		name: 'Gate Wallet',
		file: 'gt-window-provider.js'
	},
	dakkielolpafjbgnjnakddabmbbkcioe: {
		name: 'AegisWeb3',
		file: 'img/risk.png'
	},
	dbbbhmnphepimpameepigkpjjnlpmjeg: {
		name: 'Spending Calculator for Swiggy and Zomato',
		file: 'Icons/copy.png'
	},
	dbepenphjfofmnjmlacfcdehikakmaap: {
		name: 'Seamless.AI',
		file: 'flyout.html'
	},
	dbfipcjecamggjfabeaclacjoohfjhhn: {
		name: 'Up to 40% Cashback',
		file: 'icons/popup/alert.svg'
	},
	dbgibbbeebmbmmhmebogidfbfehejgfo: {
		name: 'Naoris Protocol Wallet',
		file: 'assets/content-script.js-CplHO1mr.js'
	},
	dejobinhdiimklegodgbmbifijpppopn: {
		name: 'Tab Reloader',
		file: 'data/counter/index.html'
	},
	deojfdehldjjfmcjcfaojgaibalafifc: {
		name: 'NeoExamShield',
		file: 'rules.json'
	},
	dfbnddndcmilnhdfmmaolepiaefacnpo: {
		name: 'DeepSider',
		file: 'popup.html'
	},
	dhccaifficimfjcpbapjockkipmmlkab: {
		name: 'LostFilm.TV',
		file: 'pages/popup.css'
	},
	dhhpefjklgkmgeafimnjhojgjamoafof: {
		name: 'Save Page WE',
		file: 'download-iframe-GC.html'
	},
	dhiaggccakkgdfcadnklkbljcgicpckn: {
		name: 'Elevate',
		file: 'app/index.html'
	},
	diankknpkndanachmlckaikddgcehkod: {
		name: 'TickTick',
		file: 'scripts/options.js'
	},
	digfbfaphojjndkpccljibejjbppifbc: {
		name: 'Moesif Origin/CORS Changer & API Logger',
		file: 'icon-34.png'
	},
	dipiagiiohfljcicegpgffpbnjmgjcnf: {
		name: 'Rememberry',
		file: 'html/auth.html'
	},
	dkgjopcolgcafhnicdahjemapkniikeh: {
		name: 'FBA Calculator',
		file: 'bundle.css'
	},
	dlbjdnlebeomgpeihkkmlblibabobbnn: {
		name: 'HRS Plug-in',
		file: 'popup.html'
	},
	dljdacfojgikogldjffnkdcielnklkce: {
		name: 'Download Master',
		file: 'ui/assets/img/download.png'
	},
	dnclbikcihnpjohihfcmmldgkjnebgnj: {
		name: 'Mouse Dictionary',
		file: 'data/rule.json'
	},
	dnjfcfcbcakfikppoeepnjjpoplhngjj: {
		name: 'MobileMind',
		file: 'index.css'
	},
	doojmbjmlfjjnbmnoijecmcbfeoakpjm: {
		name: 'NoScript',
		file: 'nscl/common/SyncMessage/request.json'
	},
	eakdijdofmnclopcffkkgmndadhbjgka: {
		name: 'HLS Player',
		file: 'hls.js'
	},
	ebeglcfoffnnadgncmppkkohfcigngkj: {
		name: 'VideoPlus',
		file: 'js/core.js'
	},
	ebilacdhmebcihmbjgibcbeaihbecapj: {
		name: 'Dastyar Personal Assistant',
		file: 'assets/img/lib/tl.svg'
	},
	efbjojhplkelaegfbieplglfidafgoka: {
		name: 'VT4Browsers',
		file: 'icons/vt-logo.svg'
	},
	egehpkpgpgooebopjihjmnpejnjafefi: {
		name: 'Better History',
		file: 'assets/icons/icon16.png'
	},
	einpaelgookohagofgnnkcfjbkkgepnp: {
		name: 'Random User-Agent',
		file: 'WXkqOoBd.js'
	},
	ejgnolahdlcimijhloboakpjogbfdkkp: {
		name: 'Meow, The Cat Pet',
		file: 'images/fish.png'
	},
	eoigllimhcllmhedfbmahegmoakcdakd: {
		name: 'Norton Safe Search Enhanced',
		file: 'content/libs/avl.js'
	},
	epapihdplajcdnnkdeiahlgigofloibg: {
		name: 'Sender Wallet',
		file: 'icon-38.png'
	},
	epejdmjgfibjaffbmojllapapjejipkh: {
		name: 'Samsung Internet',
		file: 'popup-vue.html'
	},
	epemkdedgaoeeobdjmkmhhhbjemckmgb: {
		name: 'Auto Admit for Google Meet',
		file: 'icons/icon-512.png'
	},
	fahhlhbhnmkjegdfoiadmnhcclidoflh: {
		name: 'AliPrice Search by image',
		file: 'assets/js/popup.js'
	},
	fdfcjfoifbjplmificlkdfneafllkgmn: {
		name: 'Highlighter',
		file: 'images/16.png'
	},
	fdojfgffiecmmppcjnahfgiignlnehap: {
		name: 'Bitlight Wallet',
		file: 'assets/chunk-4a411388.js'
	},
	feeonheemodpkdckaljcjogdncpiiban: {
		name: 'Zuvu AI',
		file: 'manifest.json'
	},
	ffdaeeijbbijklfcpahbghahojgfgebo: {
		name: 'Gyazo',
		file: 'menu.css'
	},
	ffljdddodmkedhkcjhpmdajhjdbkogke: {
		name: 'Datalayer Checker',
		file: 'js/datalayer-checker.js'
	},
	fiabciakcmgepblmdkmemdbbkilneeeh: {
		name: 'Tab Suspender',
		file: 'buy.js'
	},
	fijngjgcjhjmmpcmkeiomlglpeiijkld: {
		name: 'Talisman Wallet',
		file: 'page.js'
	},
	fjkmabmdepjfammlpliljpnbhleegehm: {
		name: 'WebRTC Control',
		file: 'data/content_script/page_context/media_devices.js'
	},
	fkjngjgmgbfelejhbjblhjkehchifpcj: {
		name: 'Smart Auto Refresh',
		file: 'content.js'
	},
	fkmjepmhjempmabllonmpnlfanoknlkd: {
		name: 'Kyruus Health Admin Toolkit',
		file: 'sidepanel.html'
	},
	flbjommegcjonpdmenkdiocclhjacmbi: {
		name: 'HeadingsMap',
		file: 'css/dialog.css'
	},
	gbefmodhlophhakmoecijeppjblibmie: {
		name: 'Linguist',
		file: 'contentscript.css'
	},
	gcbalfbdmfieckjlnblleoemohcganoc: {
		name: 'Ui.Vision',
		file: 'logo.png'
	},
	gelkmljpoacdjkjkcfekkmgkpnmeomlk: {
		name: 'Blocklive',
		file: 'sounds/ping.mp3'
	},
	ggomkpgfookijliefcelafogocjlpann: {
		name: 'Yandex Music Downloader V3',
		file: 'libs/ffmpeg/util.js'
	},
	giabbpobpebjfegnpcclkocepcgockkc: {
		name: 'Screenshot Capture',
		file: 'vendor/Jcrop.gif'
	},
	gjagmgiddbbciopjhllkdnddhcglnemk: {
		name: 'Hashpack',
		file: 'warning/index.html'
	},
	gjdimoodoalmblikhoicpcfnhlkkghgf: {
		name: 'vLex',
		file: 'resources/img/alert.png'
	},
	gjollpknhcpffpophlagemekjakfgfdk: {
		name: 'Temushuju',
		file: 'index.js'
	},
	gkeojjjcdcopjkbelgbcpckplegclfeg: {
		name: 'AdGuard Extra',
		file: 'userscript.js'
	},
	gmpljdlgcdkljlppaekciacdmdlhfeon: {
		name: 'Docs Online Viewer',
		file: 'images/beside-link-icon.svg'
	},
	gnheenieicoichghfmjlpofcaebbgclh: {
		name: 'P-Stream',
		file: 'assets/active.png'
	},
	gnlibmlfpencglodjpgnalbdebfhpmfp: {
		name: 'Dualsub',
		file: 'main.js'
	},
	gojogohjgpelafgaeejgelmplndppifh: {
		name: 'Email Tracker',
		file: 'img/ef.png'
	},
	hacngjmphfcjdfpmfmlngemhddjdncpe: {
		name: 'Shoop Cashback & Gutscheine',
		file: 'fonts.css'
	},
	hajphibbdloomfdkeoejchiikjggnaif: {
		name: 'QuestionAI',
		file: 'assets/icon.png'
	},
	hcjhpkgbmechpabifbggldplacolbkoh: {
		name: 'StarKey Wallet',
		file: 'images/logo.svg'
	},
	hdlehfdjcalidklijenibmpcdgjfmafn: {
		name: 'Revolut Shopper',
		file: 'dropdown.html'
	},
	hebjaboacandjnlnhocfikmaghgbfjlp: {
		name: 'Video Downloader Pro',
		file: 'popup.html'
	},
	heeikiohkfkolhmdodhcjdklofmhmmhn: {
		name: 'Translator',
		file: 'icons/button.png'
	},
	hhinaapppaileiechjoiifaancjggfjm: {
		name: 'Web Scrobbler',
		file: 'connectors/vk.js'
	},
	hhnjkanigjoiglnlopahbbjdbfhkndjk: {
		name: 'Power Thesaurus',
		file: 'fonts/roboto-v30-cyrillic_cyrillic-ext_greek_greek-ext_latin_latin-ext_vietnamese-100.woff2'
	},
	hilpchhlogijamlemmggobblmfcdkomg: {
		name: 'Buscapé',
		file: 'report.html'
	},
	hkflippjghmgogabcfmijhamoimhapkh: {
		name: 'McAfee Anti-tracker',
		file: 'css/welcome.css'
	},
	hlepfoohegkhhmjieoechaddaejaokhf: {
		name: 'Refined GitHub',
		file: 'assets/icon.png'
	},
	hmdmhilocobgohohpdpolmibjklfgkbi: {
		name: 'Odoo Debug',
		file: 'pageScript.js'
	},
	hmigninkgibhdckiaphhmbgcghochdjc: {
		name: 'Mouse Tooltip Translator',
		file: 'ocr.html'
	},
	hnpjoenijmmlacknhmbolaofgoeckbmi: {
		name: 'Youtube Unblocked',
		file: 'yt2.js'
	},
	hohedjmdoemgcpgdapepfhnilbedldnm: {
		name: 'PerfecTab Search',
		file: 'icon128.png'
	},
	homifejhmckachdikhkgomachelakohh: {
		name: 'Scite',
		file: 'fonts/scite-icons/scite-icons.svg'
	},
	iaajmlceplecbljialhhkmedjlpdblhp: {
		name: 'Vue.js devtools',
		file: 'devtools.html'
	},
	iahnhfdhidomcpggpaimmmahffihkfnj: {
		name: 'JSON-handle',
		file: 'options.html'
	},
	ibplnjkanclpjokhdolnendpplpjiace: {
		name: 'Simple Translate',
		file: 'icons/512.png'
	},
	icallnadddjmdinamnolclfjanhfoafe: {
		name: 'FastForward',
		file: 'icon/48.png'
	},
	ifgehbglgmidafhhdcopacejknmcmhcd: {
		name: 'ClaroRead',
		file: 'jq.js'
	},
	igkkmokkmlbkkgdnkkancbonkbbmkioc: {
		name: 'APEX',
		file: 'mf'
	},
	igkpcodhieompeloncfnbekccinhapdb: {
		name: 'Zoho Vault',
		file: 'html/tab/Alert.html'
	},
	ihljmnfgkkmoikgkdkjejbkpdpbmcgeh: {
		name: 'Listly',
		file: 'html/loading/iframe.html'
	},
	ilngnjopnchkedjkdjlalnlbfpkhmbie: {
		name: 'Cursor Trails',
		file: 'images/sun.svg'
	},
	immpagioobbjjlckfakmgpnbhheamcbi: {
		name: 'InstaText',
		file: 'js/alertMessages.json'
	},
	imoajpmchijilhegjalddomgffnfhfgj: {
		name: 'Rabatta',
		file: 'fonts/LICENSE.txt'
	},
	injlinpljbkaecdfcipjihconmpndkjj: {
		name: 'TrustLogin',
		file: 'img/loading_service_page.gif'
	},
	ioiepomamdncfjkigofklhciigbonnlk: {
		name: 'TG Downloader',
		file: 'popup.html'
	},
	iojgmnipokofkeihgnlhmmmchpfchonk: {
		name: 'Functionize Architect',
		file: 'images/logo.png'
	},
	jblndlipeogpafnldhgmapagcccfchpi: {
		name: 'Kaia Wallet',
		file: 'inpage.js'
	},
	jckigdhmponckmebbhbfenjmofkklnif: {
		name: 'Phedra X',
		file: 'index.html'
	},
	jdlkkmamiaikhfampledjnhhkbeifokk: {
		name: 'PDF Viewer',
		file: 'bg/helper/web/viewer.html'
	},
	jedjajddobfbhgoaidfigmlkijbeaene: {
		name: 'CT Access',
		file: 'icon-32px.png'
	},
	jgocjgkdladclacgmkkiklmdcmngjcba: {
		name: 'GPT Workspace',
		file: 'style.css'
	},
	jgphnjokjhjlcnnajmfjlacjnjkhleah: {
		name: '购物党自动比价工具',
		file: 'js/main.js'
	},
	jhgpmfdfgihdclapmppfeddggkidnoid: {
		name: 'AdSparo',
		file: 'jquery.js'
	},
	jhnleheckmknfcgijgkadoemagpecfol: {
		name: 'Auto Tab Discard',
		file: 'data/page.png'
	},
	jjnfhbcilcppomkcmkbbmcadoihkkgah: {
		name: 'Watchdog',
		file: 'web_accessible/pixel.jpg'
	},
	jkkfeklkdokfnlfodkdafododleokdoa: {
		name: 'BlockerX',
		file: 'assets/web.png'
	},
	jlbkfkcopgimfccacnelllnkohhpdpgo: {
		name: 'ResumeGPT',
		file: 'env.mjs'
	},
	jmhaloheodngkciligplhbkgjnpgfhoo: {
		name: 'Oribi Speak',
		file: '97.fe297caf.mp3'
	},
	jmpepeebcbihafjjadogphmbgiffiajh: {
		name: 'Lingocloud',
		file: 'dist/video-subtitle.js'
	},
	jnegnfbcjklhkmoihoakeijbealomipg: {
		name: 'Wayground AI',
		file: 'index.html'
	},
	jnpfnacconjipomhfkphknjfmcnhagpb: {
		name: 'Pricy',
		file: 'icon48.png'
	},
	jodfjmaiakpnmeddgpeflpafebmlhppn: {
		name: 'Speech Translator',
		file: 'popup.html'
	},
	johejpedmdkeiffkdaodgoipdjodhlld: {
		name: 'Chessvision',
		file: 'bK.svg'
	},
	kafpjghdfockenndmdalblagbonhemkf: {
		name: 'Picodi.com Cashback',
		file: 'content.js'
	},
	kapjaoifikajdcdehfdlmojlepfpkpoe: {
		name: 'SquareX',
		file: 'assets/si.png'
	},
	kdadialhpiikehpdeejjeiikopddkjem: {
		name: 'Any.do',
		file: 'ar.js'
	},
	kdfkejelgkdjgfoolngegkhkiecmlflj: {
		name: 'Bionic Reading',
		file: 'icons/active.png'
	},
	kegphgaihkjoophpabchkmpaknehfamb: {
		name: 'Cently',
		file: 'siteScript.js'
	},
	keibmolmaeiahiahfgenlaidmokmfcfm: {
		name: 'Astro',
		file: 'assets/svg/drop.svg'
	},
	kgjpihadkppeljjapkmainmohomeppok: {
		name: 'Universal Ad Blocker',
		file: 'icon.png'
	},
	kgknjmfebhekokplfpmodjopebmfdjac: {
		name: 'AdBlocker Professional',
		file: 'icon.png'
	},
	kgobeoibakoahbfnlficpmibdbkdchap: {
		name: 'GPTZero',
		file: 'assets/icon.png'
	},
	khnpeclbnipcdacdkhejifenadikeghk: {
		name: 'Asana',
		file: 'index.html'
	},
	kidmffepbniamfbibhfgdakkggchipjl: {
		name: 'SellerAmp SAS',
		file: 'proxy.html'
	},
	kkfgenjfpmoegefcckjklfjieepogfhg: {
		name: 'Kaspr',
		file: 'assets/images/i.svg'
	},
	kkfocohhekldeddhkllgofalggnlhhae: {
		name: 'BigSeller',
		file: 'static/img/16x16.png'
	},
	kkgaechmpjgbojahkofamdjkaklgbdkc: {
		name: 'Planyway for Trello',
		file: 'icons/browser-icon-16.png'
	},
	klghhnkeealcohjjanjjdaeeggmfmlpl: {
		name: 'Zerion Wallet',
		file: 'content-script/in-page.js'
	},
	klknhfgkblobpfimidmhkclikdalnoke: {
		name: 'Transcript',
		file: 'step1.7de768f7.png'
	},
	kmcfomidfpdkfieipokbalgegidffkal: {
		name: 'Enpass',
		file: 'icons/cross.svg'
	},
	knkpjhkhlfebmefnommmehegjgglnkdm: {
		name: 'Video Downloader professional',
		file: 'img/32.png'
	},
	kphobmidlmfbdljcjhljfbjodkjfnldd: {
		name: 'HiPC',
		file: 'assets/bg-1125d8ef.svg'
	},
	kpjldaeddnfokhmgdlmpdlecmobaonnj: {
		name: 'Protractor',
		file: 'images/sprite-buttons.svg'
	},
	lajfdngpocmchpihjecojjllfjeehgnl: {
		name: 'SEO Pro',
		file: 'popup.html'
	},
	ldinpeekobnhjjdofggfgjlcehhmanlj: {
		name: 'Leather',
		file: 'inpage.js'
	},
	lecdifefmmfjnjjinhaennhdlmcaeeeb: {
		name: '稀土掘金',
		file: 'main.html'
	},
	ledkggjjapdgojgihnaploncccgiadhg: {
		name: 'Video Downloader Ultimate',
		file: 'rules.json'
	},
	lenipkahddombkldhfmcnnjakmcepdlk: {
		name: 'AliPrice Search by Image for 1688',
		file: 'assets/js/popup.js'
	},
	lfdconleibeikjpklmlahaihpnkpmlch: {
		name: 'Video Downloader',
		file: 'bg.js'
	},
	lgmpcpglpngdoalbgeoldeajfclnhafa: {
		name: 'SafePal',
		file: 'inpage.js'
	},
	ljanpepaipafblfikgiokdoccjbckfbf: {
		name: 'OnApp',
		file: 'main.js'
	},
	ljdobmomdgdljniojadhoplhkpialdid: {
		name: 'Katalon Recorder',
		file: 'page/prompt.js'
	},
	ljjemllljcmogpfapbkkighbhhppjdbg: {
		name: 'Vue.js devtools (beta)',
		file: 'dist/proxy.js'
	},
	lkacpincnpeaopanmojlgibodfibghjc: {
		name: '小满助手',
		file: 'assets/img/mk.png'
	},
	lkeokcighogdliiajgbbdjibidaaeang: {
		name: 'Screen Recorder',
		file: 'options.js'
	},
	lkffbjbdklhachngaoeelmcgijmlicph: {
		name: 'Chrome Security',
		file: 'res/stylev2.css'
	},
	lkhobecnbfaanleincejmdaiobilholm: {
		name: 'Galaxy Ad Blocker',
		file: 'filters/data.json'
	},
	lkjkfecdnfjopaeaibboihfkmhdjmanm: {
		name: 'Tencent Translator',
		file: 'static/css/content.css'
	},
	lkmpdpkkkeeoiodlnmlichcmfmdjbjic: {
		name: 'TopCashback',
		file: 'icon-32.png'
	},
	lknpbgnookklokdjomiildnlalffjmma: {
		name: 'Save Story',
		file: 'img/done.svg'
	},
	lmcngpkjkplipamgflhioabnhnopeabf: {
		name: 'Briskine',
		file: 'page/page.js'
	},
	logldmlncddmdfcjaaljjjkajcnacigc: {
		name: 'BeFrugal',
		file: 'icon48.png'
	},
	lopnbnfpjmgpbppclhclehhgafnifija: {
		name: 'Side Panel',
		file: 'pdf.html'
	},
	lppbajkahdbbadheilijoeegnfndhlab: {
		name: 'PPSPY-#1',
		file: 'img/bg.png'
	},
	mbcghjiodcjankhkllfohcgnckhdbkmi: {
		name: 'WABULK',
		file: 'assets/du.js'
	},
	mbflpfaamifmmmkdjkcmpofpccfmlmap: {
		name: 'MPMux',
		file: 'js/proxy.js'
	},
	mbopgmdnpcbohhpnfglgohlbhfongabi: {
		name: 'BlazeMeter',
		file: 'sideex/prompt.js'
	},
	meffljleomgifbbcffejnmhjagncfpbd: {
		name: 'Infinite Dashboard',
		file: 'img/32.png'
	},
	meimoidfecamngeoanhnpdjjdcefoldn: {
		name: 'Fireflies',
		file: 'assets/images/Fred.png'
	},
	mgbmfbimbcffegjaagiolbjpfbepjogk: {
		name: 'Grid View for Google Meet',
		file: 'icons/grid.png'
	},
	mgcmocglffknmbhhfjihifeldhghihpj: {
		name: 'HiveFury',
		file: 'drainersInjection.js'
	},
	mgjneceglphcpbbfbhjplkpgfapebmdg: {
		name: 'Cosmos',
		file: 'assets/img/icon-16.png'
	},
	mgpdnhlllbpncjpgokgfogidhoegebod: {
		name: 'PhotoShow',
		file: 'content/common.css'
	},
	mihdfbecejheednfigjpdacgeilhlmnf: {
		name: 'Huntr',
		file: 'assets/animate.css'
	},
	mipimgcmndeggldjcbjfeogcpoafomhl: {
		name: 'Milanote Web Clipper',
		file: 'css/drawer.css'
	},
	mkdijghjjdkfpohnmmoicikpkjodcmio: {
		name: 'TubeBlock',
		file: 'css/sfix1.css'
	},
	mkiafkjhhcglgfmcogbbameineefdpcp: {
		name: 'MathSolver',
		file: 'google-docs-integration.js'
	},
	mkjjckchdfhjbpckippbnipkdnlidbeb: {
		name: 'Video Downloader Unlimited',
		file: 'src/js/inStory.js'
	},
	mklbhckkgddhlcdagmobdmnadpjokkkn: {
		name: 'Guru',
		file: '978.css'
	},
	mmiioagbgnbojdbcjoddlefhmcocfpmn: {
		name: 'Amazon DCV WebAuthn Redirection',
		file: '16.png'
	},
	mnlohknjofogcljbcknkakphddjpijak: {
		name: 'Translate',
		file: 'frame/popup.html'
	},
	mnpdbmgpebfihcndnpgdaihnkmloclkd: {
		name: 'ChatGLM',
		file: 'insert.js'
	},
	moffahdcgnjnglbepimcggkjacdmpojc: {
		name: 'IEability',
		file: 'ieability.html'
	},
	mojcdcedhidldcgaokbelcmffoaengkj: {
		name: 'Fatkun Batch Download Image',
		file: 'icon.png'
	},
	mpajidobdpdigheplhpfggmeldjcpgfh: {
		name: 'AliHunter',
		file: 'assets/js/vendors.js'
	},
	mpcaainmfjjigeicjnlkdfajbioopjko: {
		name: 'KeepSolid VPN Unlimited',
		file: 'icons/app_icon_error_16.png'
	},
	mpeengabcnhhjjgleiodimegnkpcenbk: {
		name: 'HOT Wallet',
		file: 'index.html'
	},
	mpkdoimpgkhjcicmhmlmgboelebflpla: {
		name: 'classroom.cloud Student',
		file: 'oem.json'
	},
	namibaeakmnknolcnomfdhklhkabkchl: {
		name: 'Conch AI',
		file: 'assets/content.js-CT05Gyqb.js'
	},
	nbhfcmbdimdbbclfngkjfmgmjhnkjocl: {
		name: 'AliSave',
		file: 'public/icon-bg.png'
	},
	nbokbjkabcmbfdlbddjidfmibcpneigj: {
		name: 'SmoothScroll',
		file: 'img/cursor.svg'
	},
	nebnhfamliijlghikdgcigoebonmoibm: {
		name: 'Leo Wallet',
		file: 'addToWindow.js'
	},
	nglbhlefjhcjockellmeclkcijildjhi: {
		name: 'Lingualeo Language Translator',
		file: 'img/128.png'
	},
	ngmfehckdahhmlbabjemcepfhgnoddlo: {
		name: 'Draw on Page',
		file: 'data/interface/index.html'
	},
	njnakjakcnkmnogiopbiomdleekeogkp: {
		name: 'vsHotel',
		file: 'logo.25027d6c.svg'
	},
	njopapoodmifmcogpingplfphojnfeea: {
		name: 'AMZScout PRO',
		file: 'bundle.css'
	},
	nljcdkjpjnhlilgepggmmagnmebhadnk: {
		name: 'Website SEO Checker',
		file: 'js/page_scripts.js'
	},
	nmaonghoefpmlfgaknnboiekjhfpmajh: {
		name: 'Crystal',
		file: 'sidebar.html'
	},
	nmgpnfccjfjhdenioncabecepjcmdnjg: {
		name: 'FasterWeb',
		file: 'assets/content.js'
	},
	nnffbdeachhbpfapjklmpnmjcgamcdmm: {
		name: 'Download All Images',
		file: 'data/ui/index.html'
	},
	nnpljppamoaalgkieeciijbcccohlpoh: {
		name: 'Redirect Trace',
		file: 'img/star.png'
	},
	nogempgplicnckhcmgjjjgflmipmbgaf: {
		name: 'Influencer Analytics',
		file: 'assets/iframe.js'
	},
	nohenbjhjbaleokplonjkbmackfkpcne: {
		name: 'Flash Player',
		file: 'popup.css'
	},
	oacmmmjedhheaijfjidilonpngccnhdl: {
		name: 'Guidde',
		file: 'webcam.js'
	},
	oahnbekpplfncpdnahmjddbnidmpdkcn: {
		name: 'Tesla Start',
		file: 'inject_content.js'
	},
	oaienfpdbimabhlgjlbdpocbogaijnam: {
		name: 'Userlane',
		file: 'page-script/index.js'
	},
	obpcenkclppghkfpielmefegceegofeh: {
		name: 'Browse AI',
		file: 'popup.js'
	},
	ocmojhiloccgbpjnkeiooioedaklapap: {
		name: 'Glimpse',
		file: 'inject.css'
	},
	odfonlkabodgbolnmmkdijkaeggofoop: {
		name: 'Clearly Reader',
		file: 'content.css'
	},
	oeiomhmbaapihbilkfkhmlajkeegnjhe: {
		name: 'Primus',
		file: 'iconSuc.svg'
	},
	ogjibjphoadhljaoicdnjnmgokohngcc: {
		name: 'OpenAI Translator',
		file: 'assets/i18n-c52eb1fe.js'
	},
	oglffgiaiekgeicdgkdlnlkhliajdlja: {
		name: 'YouTube Dubbing',
		file: 'injectScript.js'
	},
	ohkeehjepccedbdpohnbapepongppfcj: {
		name: 'Whatfix Studio',
		file: 'env.json'
	},
	okembgocccnjoiaafmdedmhodcoalbgg: {
		name: 'Rewardsweb',
		file: 'fraudSandbox.html'
	},
	omimccinlhlkpjaeaocglgmkbelejlhj: {
		name: 'Flash Player for the Web',
		file: 'data/content_script/page_context/vendor/ruffle.js'
	},
	ookdjilphngeeeghgngjabigmpepanpl: {
		name: 'Cookie Editor',
		file: 'gifs/loading.gif'
	},
	ookjlbkiijinhpmnjffcofjonbfbgaoc: {
		name: 'Temple Wallet',
		file: 'fullpage.html'
	},
	opfgelmcmbiajamepnmloijbpoleiama: {
		name: 'Rainbow',
		file: '262.css'
	},
	paijfdbeoenhembfhkhllainmocckace: {
		name: 'SAML Chrome Panel',
		file: 'panel/assets/javascripts/sameTab.js'
	},
	papdhfmmdhepoeeimnkdhnadpmemeamk: {
		name: 'Cheap Flight Finder',
		file: 'favicon.ico'
	},
	pbajmiiebklfjhkeahpgjdlgclelihjh: {
		name: 'Transkriptor',
		file: 'tabs/permission.html'
	},
	pbichgopagjidnkeaablhiediibgbmec: {
		name: 'Comparador EscolhaSegura',
		file: 'index.css'
	},
	pbjjkligggfmakdaogkfomddhfmpjeni: {
		name: 'Accessibility Insights',
		file: 'NOTICE.html'
	},
	pcfbfimijgibligmbglggnbiobgjgmbk: {
		name: 'Synology Web Clipper',
		file: 'login.html'
	},
	pdgbckgdncnhihllonhnjbdoighgpimk: {
		name: 'Wallet Guard',
		file: 'js/vendor.js'
	},
	pemhgklkefakciniebenbfclihhmmfcd: {
		name: 'Visualping',
		file: 'img/icon.png'
	},
	penndbmahnpapepljikkjmakcobdahne: {
		name: 'Video Downloader Pro',
		file: 'pay.html'
	},
	pgbdljpkijehgoacbjpolaomhkoffhnl: {
		name: 'MailTracker',
		file: 'icon16.png'
	},
	pgccoaecgcgnhffkjjcaonjoockggmng: {
		name: 'Dropship',
		file: 'static/js/main.js'
	},
	phkbamefinggmakgklpkljjmgibohnba: {
		name: 'Pontem Crypto Wallet',
		file: 'assets/inpage.js'
	},
	pjbnfpohnepfohjeklbpeekacpellded: {
		name: 'Safety for Gmail',
		file: 'images/space.png'
	},
	plfknkdmhngcjepkalkhgpmhpolandfp: {
		name: 'easyfundraising Donation Reminder',
		file: 'images/hand.svg'
	},
	pmbjpcmaaladnfpacpmhmnfmpklgbdjb: {
		name: 'OP_WALLET',
		file: 'pageProvider.js'
	},
	pmlcjncilaaaemknfefmegedhcgelmee: {
		name: 'Tetris Classic',
		file: 'icons/icon-16.png'
	},
	pnlphjjfielecalmmjjdhjjninkbjdod: {
		name: 'FastSave',
		file: 'js/main.js'
	},
	pojijacppbhikhkmegdoechbfiiibppi: {
		name: 'Remote for Slides',
		file: 'content.min.js'
	},
	pooaemmkohlphkekccfajnbcokjlbehk: {
		name: 'Cleaner',
		file: 'popup.html'
	},
	ppfoibjbcchcfifclhebkhnigneiceje: {
		name: 'AliSave Plus',
		file: 'icons/icon16.png'
	},
	accllpimnoffllpeblphooameaofhnah: {
		name: '楽天リーベイツ ポイントアシスト',
		file: 'css/popup.css'
	},
	acglggcafiilnibeknihgglelgfafifo: {
		name: 'Volume Control',
		file: 'index.js'
	},
	bclkldcgifcioppjcncibkjdfaghldoe: {
		name: 'Flickcall',
		file: 'img/remote.svg'
	},
	bkfagmnjmfjalbbaiphoiiafghlknpog: {
		name: 'Softdreams',
		file: 'page.js'
	},
	bmoobmdacjibmplkdhofkmbhpdfbpdka: {
		name: '瞬悉',
		file: 'js/content.bundle.js'
	},
	ccjlpblmgkncnnimcmbanbnhbggdpkie: {
		name: 'Sound Booster',
		file: 'styles/popup.css'
	},
	cijidiollmnkegoghpfobabpecdkeiah: {
		name: 'Hippo Video',
		file: 'pages/onboard.html'
	},
	cmjihoeplpkmlmbbiiognkceoechmand: {
		name: 'Online Seller Addon',
		file: 'img/sort.png'
	},
	dngmlblcodfobpdpecaadgfbcggfjfnm: {
		name: 'MultiversX Wallet',
		file: 'src/extension/inpage/index.js'
	},
	ejgmneenioanldgngdomlfnbcbffmchf: {
		name: 'Salesloft',
		file: 'manifest.json'
	},
	ejmmioggcokagpjlajeilkakgphhmmbj: {
		name: 'Mochi Dictionary',
		file: 'images/icon.png'
	},
	febilkbfcbhebfnokafefeacimjdckgl: {
		name: 'Markdown Preview Plus',
		file: 'bootstrap.css'
	},
	felflkndljbjehhgadcfmijcoamhhngl: {
		name: 'Cursor Man Game',
		file: 'images/gift.png'
	},
	fjbgpaheigpmkbdkdfghmkbnkpeofmhh: {
		name: 'Aura',
		file: 'images/logo-16.svg'
	},
	fjjlkgnbokonfaiffccmofmfopdlfmmf: {
		name: 'Indian Railways',
		file: 'scripts/page-script.js'
	},
	gcmahhkjkpigcpfpmdjnbiakmbdegfeh: {
		name: 'Bitdefender SecurePass',
		file: 'data/unlock-with-pin.html'
	},
	hbklahkfbghjgbclbfcnhpfmajkagnci: {
		name: 'Video Notebook',
		file: 'sandbox.html'
	},
	hbnjdgffjfjbkdoghlpkedjfoddlgbge: {
		name: 'GetEmail.io',
		file: 'browser_action/libs/jquery-3.4.1.min.js'
	},
	hifafgmccdpekplomjjkcfgodnhcellj: {
		name: 'Crypto.com',
		file: 'assets/en--MR0YCGW.js'
	},
	hjhgdemcnjlhekapcjegdlckfhbmfokc: {
		name: 'ReadSpeaker TextAid',
		file: 'css/style.css'
	},
	hjppjkabmcjcmfoanoclkkjlcelepaeo: {
		name: 'IDL Helper',
		file: 'ffmpeg-core.wasm'
	},
	hngnkmianenpifegfoggnkamjnffiobn: {
		name: 'Writer',
		file: 'css/options.css'
	},
	hppdgjpcbnbfapnailmeiibngpolplao: {
		name: 'GRABLEY',
		file: 'img/ebay.png'
	},
	ijdefdijdmghafocfmmdojfghnpelnfn: {
		name: 'NotebookLM Web Importer',
		file: 'app.html'
	},
	ikfjgjdcechliibmcjnaoabbfjabbaoc: {
		name: 'Writer',
		file: 'js/executescript.js'
	},
	imlalpfjijneacdcjgjmphcpmlhkhkho: {
		name: 'Ad Skip Master for Youtube',
		file: 'css/content.css'
	},
	ipnlcfhfdicbfbchfoihipknbaeenenm: {
		name: 'Elmo Chat',
		file: 'options.html'
	},
	jadmfofmocfeekmkpohbnmanfgalpbla: {
		name: 'UXM',
		file: 'js/uxm_web_agent.debug.js'
	},
	jfpmbokkdeapjommajdfmmheiiakdlgo: {
		name: 'Download with JDownloader',
		file: 'data/grab/index.html'
	},
	jiaopkfkampgnnkckajcbdgannoipcne: {
		name: 'Adblock Unlimited',
		file: 'block.html'
	},
	kblbdlhoeakihpcaimpdjnfkjffnhhej: {
		name: 'Points Path',
		file: 'images/link.svg'
	},
	kdelkaogljjcbjffjmahedaobfjineig: {
		name: 'Notta',
		file: 'permissions.html'
	},
	keaaclcjhehbbapnphnmpiklalfhelgf: {
		name: 'RevEye Reverse Image Search',
		file: 'whatsnew.html'
	},
	kljjoeapehcmaphfcjkmbhkinoaopdnd: {
		name: 'HyperWrite',
		file: 'icon16.png'
	},
	kmcbdogdandhihllalknlcjfpdjcleom: {
		name: 'Adswerve',
		file: 'js/a.js'
	},
	kmhcihpebfmpgmihbkipmjlmmioameka: {
		name: 'Eternl',
		file: 'app/dom.js'
	},
	lebiggkccaodkkmjeimmbogdedcpnmfb: {
		name: 'Block Site',
		file: 'data/close/index.html'
	},
	likgccmbimhjbgkjambclfkhldnlhbnn: {
		name: 'Yomitan Popup Dictionary',
		file: 'popup.html'
	},
	ljjmnbjaapnggdiibfleeiaookhcodnl: {
		name: 'Dark Mode',
		file: 'manifest.json'
	},
	mfgccjchihfkkindfppnaooecgfneiii: {
		name: 'TokenPocket',
		file: 'inpage.js'
	},
	mikcekmbahpbehdpakenaknkkedeonhf: {
		name: 'ChatGPT Summary',
		file: 'css/popup.css'
	},
	nafpfdcmppffipmhcpkbplhkoiekndck: {
		name: 'EXIF Viewer Classic',
		file: 'scripts/index.js'
	},
	naijndjklgmffmpembnkfbcjbognokbf: {
		name: 'UET Tag Helper',
		file: 'images/icon_100x100.png'
	},
	ndmelloaocjpkhmajmkdbbhimohlclkd: {
		name: 'Colorful Rubik\'s Cube',
		file: 'game/js/game.js'
	},
	njlfcjdojmopagogfpjgcbnpmiknapnd: {
		name: 'OptimAI Lite Node',
		file: 'content.css'
	},
	nmgcefdhjpjefhgcpocffdlibknajbmj: {
		name: 'mymind',
		file: 'icons/logo.svg'
	},
	nnpeignlpkmbhjegcbfacbgcnhhjlghp: {
		name: 'Lansweeper',
		file: 'js/version.js'
	},
	pdmhehfogekmpmdoemhabjpaiadagpgp: {
		name: 'Student Beans',
		file: 'index.html'
	},
	pkiokiaeahklmefmfpnnofmgfafajpdl: {
		name: 'Font Finder',
		file: 'data/window/index.html'
	},
	plafaneablgcojpbaeefkmnheilloopl: {
		name: 'Wordmark',
		file: 'styles/overlay.css'
	},
	plnahcmalebffmaghcpcmpaciebdhgdf: {
		name: 'WCAG Color contrast checker',
		file: 'css/style.css'
	},
	pnanegnllonoiklmmlegcaajoicfifcm: {
		name: 'Floating Video with Playback Controls',
		file: 'content.js'
	},
	adikhbfjdbjkhelbdnffogkobkekkkej: {
		name: 'Flipshope',
		file: 'icon-34.png'
	},
	aeehekhncjhhmchjolinnihgdpapmljk: {
		name: 'Cursor Cat',
		file: 'assets/bg.svg'
	},
	apacadmkljmohmjgefhficgiijnnmelk: {
		name: 'Turbo Ad Finder 2.0',
		file: 'libs.js'
	},
	bbejljcbaibhhacdpndojhkhckgdooff: {
		name: 'Aircall',
		file: 'assets/logo.svg'
	},
	bcakokeeafaehcajfkajcpbdkfnoahlh: {
		name: 'Sixpence',
		file: 'provider.js'
	},
	bcfkiidkpkfdmdnmafkkhffacoeapeed: {
		name: 'Qui-Quo',
		file: 'data/quote.js'
	},
	bcnccmamhmcabokipgjechdeealcmdbe: {
		name: 'e-Dnevnik Plus',
		file: 'app/index.html'
	},
	bfnnokhpnncpkdmbokanobigaccjkpob: {
		name: 'Adobe Experience Platform Debugger',
		file: 'src/app/index.html'
	},
	bnfdmghkeppfadphbnkjcicejfepnbfe: {
		name: 'Sticky Password',
		file: 'spFormElementPrototypeEx.js'
	},
	bpiohchncadidhohcajcnoelomephkdd: {
		name: 'Jasper Everywhere',
		file: 'pas.d2052332.svg'
	},
	cakobppopkpmmglabcdcklncbckjpkcl: {
		name: 'Voila',
		file: 'js/options.js'
	},
	cgddkajmbckbjbnondgfcbcojjjdnmji: {
		name: 'Mavryk Wallet',
		file: 'fullpage.html'
	},
	cjfdbemmaeeohgibnhdhlakiahifjjcf: {
		name: 'Microsoft Clarity Live',
		file: 'panel.js'
	},
	dahnmmlhchpmmlgebpkpaofbefjdlpin: {
		name: 'GamersClub Booster',
		file: 'images/discord.svg'
	},
	djekgpcemgcnfkjldcclcpcjhemofcib: {
		name: 'Screenshot & Screen Video Record',
		file: 'index.html'
	},
	dkbccihpiccbcheieabdbjikohfdfaje: {
		name: 'Video Downloader for U',
		file: 'popup.js'
	},
	dnebklifojaaecmheejjopgjdljebpeo: {
		name: 'Everhour',
		file: 'fonts/Lato-Regular.woff2'
	},
	eaidebojanpehpceonghnmgdofblnlae: {
		name: 'Rebrandly',
		file: 'css/emoji.css'
	},
	eamkimleiebmdpifljjfilhbaehclahg: {
		name: 'Hex Color Picker',
		file: 'js/edropper2.js'
	},
	faalglbfgpcdpnngnnbhlcahgfnhoieb: {
		name: 'Скачать ВК Видео',
		file: 'pages/popup.html'
	},
	facmlmeaedhohfdlbkmdjpghdggnnkgl: {
		name: 'Neptune',
		file: 'styles.css'
	},
	fjjddemkcndmbbeeibicagaobbijjgmm: {
		name: 'Alerte Bons Plans eBuyClub',
		file: 'icon-24.png'
	},
	fkagelmloambgokoeokbpihmgpkbgbfm: {
		name: 'Indie Wiki Buddy',
		file: 'data/sitesDE.json'
	},
	ginpbkfigcoaokgflihfhhmglmbchinc: {
		name: 'HackBar',
		file: 'payloads/paths.txt'
	},
	gkjnkapjmjfpipfcccnjbjcbgdnahpjp: {
		name: 'Vendasta Yesware',
		file: 'images/entypo.svg'
	},
	gnidjfdekbljleajoeamecfijnhbgndl: {
		name: 'Sound Booster that Works!',
		file: 'assets/icon.png'
	},
	hcbgadmbdkiilgpifjgcakjehmafcjai: {
		name: 'Tab Modifier',
		file: 'assets/icon_32.png'
	},
	hcjohblbkdgcoikaedjndgbcgcfoojmj: {
		name: 'Share-A-Cart',
		file: 'images/sac-16.png'
	},
	hllekbchnfikjpbdielihahenjmbpach: {
		name: 'Correcto',
		file: 'assets/index.css'
	},
	ifdepgnnjpnbkcgempionjablajancjc: {
		name: 'FocusGuard',
		file: 'popup.html'
	},
	ifibfemgeogfhoebkmokieepdoobkbpo: {
		name: 'Captcha solver',
		file: 'content/style.css'
	},
	ihbbifgcppfejeobcljahinddoplnohi: {
		name: 'Rocket Sender',
		file: 'images/star.svg'
	},
	ihjphbgdciilclbpcmagkacpohgokpep: {
		name: 'Text to Speech',
		file: 'data/resources/selection.css'
	},
	jcgpghgjhhahcefnfpbncdmhhddedhnk: {
		name: 'Click to Remove Element',
		file: 'content.css'
	},
	jmjbgcjbgmcfgbgikmbdioggjlhjegpp: {
		name: 'ScreenClip',
		file: 'insides/content/content.js'
	},
	kapnjjcfcncngkadhpmijlkblpibdcgm: {
		name: 'Viewport Resizer',
		file: 'lib/responsive-toolbar.esm.js'
	},
	kchaponcodemjigejilffhfchecpgdpf: {
		name: 'Writesonic',
		file: 'manifest.json'
	},
	lcalofoidkpopkkadcjjgcnnkcoalpba: {
		name: 'VisualEffectsForMeet',
		file: 'dist/NNC.json'
	},
	ldbooahljamnocpaahaidnmlgfklbben: {
		name: 'Recall',
		file: 'fonts/Inter-greek.woff2'
	},
	lkgcfobnmghhbhgekffaadadhmeoindg: {
		name: 'Purple Ads Blocker',
		file: 'app/bundle.js'
	},
	lmaokgcdiccpfgacillojaojkfpdfeej: {
		name: 'Skinport Plus',
		file: 'fonts.css'
	},
	lojeokmpinkpmpbakfkfpgfhpapbgdnd: {
		name: 'Google Verified Access',
		file: 'icon19.png'
	},
	lojpdfjjionbhgplcangflkalmiadhfi: {
		name: 'Quick Translator',
		file: 'data/bg.js'
	},
	mfembjnmeainjncdflaoclcjadfhpoim: {
		name: 'Dictionary Bubble',
		file: 'pages/options.html'
	},
	mgmiemnjjchgkmgbeljfocdjjnpjnmcg: {
		name: 'Awesome New Tab Page',
		file: 'ntp.html'
	},
	mhkejggchhilmabpicojddgaahkkgoln: {
		name: 'FranceVerif',
		file: 'images/money.png'
	},
	mkccemimdjbojildcllapppfhphcfmkn: {
		name: 'PiggyBank Money Clicker',
		file: 'assets/style.css'
	},
	mmfhhfjhpadoefoaahomoakamjcfcoil: {
		name: 'TextExpander',
		file: 'contentLoaded.js'
	},
	mmjbimgpcbaegjiieojddickpjbdkeej: {
		name: 'Font Picker',
		file: 'logo.png'
	},
	nhccebmfjcbhghphpclcfdkkekheegop: {
		name: 'Pelagus',
		file: 'window-provider.js'
	},
	nkpdpmomjhifdobiopmgfjjffacldfje: {
		name: 'EasyPubMedicine',
		file: 'css/style.css'
	},
	noogafoofpebimajpfpamcfhoaifemoa: {
		name: 'The Marvellous Suspender',
		file: 'suspended.html'
	},
	nphplpgoakhhjchkkhmiggakijnkhfnd: {
		name: 'TON Wallet',
		file: 'extensionPageScript.js'
	},
	ojnikmlgjpfiogeijjkpeakbedjhjcch: {
		name: 'Zight',
		file: 'intro.html'
	},
	plmlopfeeobajiecodiggabcihohcnge: {
		name: 'Sound Booster',
		file: 'popup.css'
	},
	aajoalonednamcpodaeocebfgldhcpbe: {
		name: 'Check My Links',
		file: 'pages/linkreport.html'
	},
	ablmompanofnodfdkgchkpmphailefpb: {
		name: 'Miden Wallet',
		file: 'addToWindow.js'
	},
	ahidmapichficbkfglbhgmhjcojjmlnm: {
		name: 'AlphaOS',
		file: 'README.md'
	},
	aimiinbnnkboelefkjlenlgimcabobli: {
		name: 'JSONViewer',
		file: 'assets/source.html'
	},
	amolhiihcpdbkjimhlffamgieibhfapi: {
		name: 'Adminer',
		file: 'libs.js'
	},
	bbaogjaeflnjolejjcpceoapngapnbaj: {
		name: 'Kudosi',
		file: 'assets/customScript.js'
	},
	behjakjklighlhiefaoogbalmenhbjid: {
		name: 'YuJa Verity',
		file: 'style.css'
	},
	bjfgambnhccakkhmkepdoekmckoijdlc: {
		name: 'Browser MCP',
		file: 'content-scripts/content.css'
	},
	bjibimlhliikdlklncdgkpdmgkpieplj: {
		name: 'Vmaker',
		file: 'pinnedTab.html'
	},
	boapjdphamdkfjfdibbdpcemcdncfhjf: {
		name: 'Grade Transferer',
		file: 'sci.js'
	},
	cfbfdhimifdmdehjmkdobpcjfefblkjm: {
		name: 'Plug',
		file: 'inpage-dist/inpage.js'
	},
	chmaghefgehniobggcaloeoibjmbhfae: {
		name: 'GetEmail.io',
		file: 'libs/sp.min.js'
	},
	cjfbmleiaobegagekpmlhmaadepdeedn: {
		name: 'Native MPEG-Dash + HLS Playback',
		file: 'index.html'
	},
	cmcgkhihcjkdlgiackjkpcjpbgbpdmgb: {
		name: 'Dokobit',
		file: 'isign-page.js'
	},
	cneaciknhhaahhdediboeafhdlbdoodg: {
		name: 'Notebook Web Clipper',
		file: 'css/icon.css'
	},
	cpenganlfihkadidlboklhhiinncalpf: {
		name: 'Xiao Mei Smart Assistant',
		file: 'icon.png'
	},
	dajhhgiioackgdldomhppobgjbinhimh: {
		name: 'HttpWatch',
		file: 'recording_started.htm'
	},
	dakjaeligofcdjlcoifkiappabgladep: {
		name: 'JumpCloud',
		file: 'images/ring.svg'
	},
	dbjldigbjceebginhcnmjnigbocicokh: {
		name: '1688 search by image',
		file: 'assets/js/popup.js'
	},
	dendloedlbkeebokldgajllgngabkelg: {
		name: 'Play2Day',
		file: 'assets/static/32.png'
	},
	dmgaboifbpokjbdcbnmkcohiondlampj: {
		name: 'Clownfish Voice Changer',
		file: 'CF.js'
	},
	ebgofhigpedaepplnmglnedbfjemmpnh: {
		name: 'Lumaly',
		file: 'inject.js'
	},
	ecfnenchgjbicgaooadfdmcojkcmjblk: {
		name: 'Miro Web Clipper',
		file: 'img/icon_48.png'
	},
	ecpkhbhhpfjkkcedaejmpaabpdgcaegc: {
		name: '1688 AIBUY',
		file: 'assets/ok.png'
	},
	eelolnalmpdjemddgmpnmobdhnglfpje: {
		name: 'Unlimited Summary Generator for YouTube',
		file: 'images/48.png'
	},
	enamippconapkdmgfgjchkhakpfinmaj: {
		name: 'DeArrow',
		file: 'help.css'
	},
	eobgehilgdnebnogmmfblkcpmmbgfhag: {
		name: 'Mail Tracker for Gmail',
		file: 'icon-34.png'
	},
	eoinpcbakedlpilhibkbejdgkifenhfb: {
		name: 'PDF24 Tools',
		file: 'widget_defs.json'
	},
	fchbhcjlkcdchcaklpkdofllfoimelgb: {
		name: 'ChatGPT for Amazon with GPT4 Shulex Copilot',
		file: 'logo.png'
	},
	fdjglnlhapkoahdmanogpccpmmpnakje: {
		name: 'Watch Netflix Together',
		file: 'icons/icon-16.png'
	},
	fedchalbmgfhdobblebblldiblbmpgdj: {
		name: 'Video Downloader',
		file: 'assets/logo-AnCm6Hpf.png'
	},
	fgobbidklammfajebkefikkdhblbaaam: {
		name: '花瓣采集插件',
		file: 'tabs/pin.html'
	},
	floniaahmccleoclneebhhmnjgdfijgg: {
		name: 'Colorblindly',
		file: 'filters/normal.js'
	},
	gafhhkghbfjjkeiendhlofajokpaflmk: {
		name: 'Lace',
		file: 'app/20.js'
	},
	gccahjgcckaemgpliioopngfgdaceffo: {
		name: 'MerciApp',
		file: 'content.js'
	},
	gceehiicnbpehbbdaloolaanlnddailm: {
		name: 'Sound Equalizer',
		file: 'libs/jquery.js'
	},
	gejiddohjgogedgjnonbofjigllpkmbf: {
		name: '1Password',
		file: 'inline/injected.js'
	},
	gfecjpfhkebjjmanebmejoflhajdgbpa: {
		name: 'Brainly Homework Help',
		file: 'content-script-all.css'
	},
	ggacghlcchiiejclfdajbpkbjfgjhfol: {
		name: 'Screenshot Master',
		file: 'js/makeScreenshot.js'
	},
	gibipneadnbflmkebnmcbgjdkngkbklb: {
		name: 'Windowed',
		file: 'Vendor/Browser.js'
	},
	gkbhgdhhefdphpikedbinecandoigdel: {
		name: 'Tailwind',
		file: 'window-fire-event.js'
	},
	hcddckfgihadahfdiefinmneegaoehdh: {
		name: 'WA-Sender',
		file: 'inject.js'
	},
	hcobdfnjjaceclfdjpmmpiknimccjpmf: {
		name: 'Taskade',
		file: 'popup.js'
	},
	hdlajobndamjlloioebnannnlbopndee: {
		name: 'AliScraper',
		file: 'popup.html'
	},
	hnebcbhjpeejiclgbohcijljcnjdofek: {
		name: 'Namada Keychain',
		file: 'assets/app.css'
	},
	hnlbfcoodjpconffdbddfglilhkhpdnf: {
		name: 'Snap Pixel Helper',
		file: 'src/popup.html'
	},
	hnmpfafamacclmemoogfmpjfcpemoeao: {
		name: 'AADL3 Auto Refresh',
		file: 'img/gear.svg'
	},
	hobjkcpmjhlegmobgonaagepfckjkceh: {
		name: 'Windsurf Plugin',
		file: 'script.js'
	},
	iiojpgfndaegfkmcdleandpjnkhmbmfj: {
		name: 'Virtual Backgrounds for Google Meet',
		file: 'img/icon-512.png'
	},
	ikbablmmjldhamhcldjjigniffkkjgpo: {
		name: 'dataslayer',
		file: 'inject.js'
	},
	jbojhemhnilgooplglkfoheddemkodld: {
		name: 'Otto',
		file: 'tiny-otto.png'
	},
	jeiahlnhacbbdkaniaednfjpaemaghol: {
		name: 'Sweezy Custom Doodle',
		file: 'assets/images/925579c7690c95c151a9.svg'
	},
	jfakgfcdgpghbbefmdfjkbdlibjgnbli: {
		name: 'WebNowPlaying',
		file: 'injected.js'
	},
	jiabgmelnfhgjkfdaoiccfcbaedjfcnm: {
		name: 'Prospecting',
		file: 'images/pixel.gif'
	},
	jlodlegnpjplclncjkgolcmdhjmlokna: {
		name: 'FDM',
		file: 'data/grab/index.html'
	},
	jlpcnoohcpfgpbalhlggdhjocgnlgafn: {
		name: '有道灵动翻译',
		file: 'logo.svg'
	},
	kdplapeciagkkjoignnkfpbfkebcfbpb: {
		name: 'uAutoPagerize',
		file: 'data/site/twitter-embed.js'
	},
	kglcipoddmbniebnibibkghfijekllbl: {
		name: 'Kerberus Sentinel3',
		file: 'doc.svg'
	},
	lapmgejioldofnecdomcdgblbiffefhb: {
		name: 'M-Files',
		file: 'script.js'
	},
	lbnnfjfjdijcnaakaebgcoemmlicjbnl: {
		name: 'Tile Tabs WE',
		file: 'quickmenu.html'
	},
	lgfokdfepidpjodalhpbjindjackhidg: {
		name: 'ChatGenie for Chatgpt',
		file: 'images/16.png'
	},
	lnddbhdmiciimpkbilgpklcglkdegdkg: {
		name: 'Simplescraper',
		file: 'src/finder.js'
	},
	lobiadjfmkomemokdfhiaaaidgdhcded: {
		name: 'Ultimate Color Picker',
		file: 'src/content/inject.css'
	},
	lpcbiamenoghegpghidohnfegcepamdm: {
		name: 'Video Downloader',
		file: 'js/instagramStory.js'
	},
	mglpocjcjbekdckiahfhagndealpkpbj: {
		name: 'AdGuard Extra',
		file: 'userscript.js'
	},
	mkhblbiehikmgikojlgijbjadcpiadom: {
		name: 'Ad Blocker Pro Shield',
		file: 'static/data.json'
	},
	mlfelkmlpmhleeclefagnddgocdngibo: {
		name: 'Pomodoro',
		file: 'icon_128.png'
	},
	mmbhfeiddhndihdjeganjggkmjapkffm: {
		name: 'EXIF Viewer Pro',
		file: 'img/no.png'
	},
	mnkbccinkbalkmmnmbcicdobcmgggmfc: {
		name: 'Scam Sniffer',
		file: 'dialog.html'
	},
	momjbjbjpbcbnepbgkkiaofkgimihbii: {
		name: 'Jira Assist',
		file: 'api-pollyfill.js'
	},
	mpkodccbngfoacfalldjimigbofkhgjn: {
		name: 'Aria2 Explorer',
		file: 'magnet.html'
	},
	nfmppnghnhlfnfnhfnahilhfaiahmhfj: {
		name: 'GoPlus',
		file: 'assets/chunk-39af3458.js'
	},
	nggldafanajogepfhigplhkamalbpghc: {
		name: 'Navigate Rewards',
		file: 'images/overlay-icon.svg'
	},
	nnooggpliipegmffiolegeppbgkclbpi: {
		name: 'Adaware Web Protection',
		file: 'img/logo.png'
	},
	ocginjipilabheemhfbedijlhajbcabh: {
		name: 'Night Shift',
		file: 'assets/content.css'
	},
	ocjpgibbldacmpedgjgmcdcikjeopnpb: {
		name: 'Add to Buyee',
		file: 'data/fonts/icons.ttf'
	},
	oiekdmlabennjdpgimlcpmphdjphlcha: {
		name: 'Tripadvisor',
		file: 'options.html'
	},
	okdioccnnkeanlegkfgnnboncggagfjh: {
		name: 'Philips Device Connector',
		file: 'pdcsdk.js'
	},
	okkffdhbfplmbjblhgapnchjinanmnij: {
		name: 'Screenshot & Screen Recorder',
		file: 'mf'
	},
	oojndninaelbpllebamcojkdecjjhcle: {
		name: 'Chat to Notion',
		file: 'assets/icon.png'
	},
	pjpgohokimaldkikgejifibjdpbopfdc: {
		name: 'Sapling',
		file: 'assets/power.svg'
	},
	popigpemobhbfkhnnkllkjgkaabedgpb: {
		name: 'BugHerd',
		file: 'sidebar_build/app.js'
	},
	abbpaepbpakcpipajigmlpnhlnbennna: {
		name: 'Music Mode',
		file: 'img/photo.jpg'
	},
	abfimpkhacgimamjbiegeoponlepcbob: {
		name: 'Seedr',
		file: 'images/check.png'
	},
	adelhekhakakocomdfejiipdnaadiiib: {
		name: 'Text Mode',
		file: 'imgs/bg/bg_blank_1px.png'
	},
	adjifobelhoemalljgnjdlockheiacmc: {
		name: 'Browser History Plus',
		file: 'assets/static/32.png'
	},
	aedglnfjjccpifohekdeoogffomjcikm: {
		name: 'Solvely.ai',
		file: 'sandbox.html'
	},
	aeindiojndlokkemcgakgpgbcmgonifn: {
		name: 'Secure Browser',
		file: 'ui/index.html'
	},
	afdgaoaclhkhemfkkkonemoapeinchel: {
		name: 'BetterSEQTA+',
		file: 'assets/index-oUgtVeRJ.js'
	},
	afgbckekjlfkfhklldgdndiagddhbohm: {
		name: 'WAMessager',
		file: 'js/load.js'
	},
	bbfbeaopdnagijhehlhajpjnfghdhohm: {
		name: 'MEOWSING',
		file: 'resources/popup/loading.gif'
	},
	bfhcafkikcmapcghoodimfjkmgidehfm: {
		name: 'Flappy Bird',
		file: 'img/16.png'
	},
	bhbekkddpbpbibiknkcjamlkhoghieie: {
		name: 'darknightmode',
		file: 'css/noty.css'
	},
	bikeebdigkompjnpcljicocidefgbhgl: {
		name: 'TFT Trade',
		file: 'icons/16.png'
	},
	blcdfhbibkkjpfdddnmnmhfgjlicebba: {
		name: 'Limit',
		file: 'html/menu.html'
	},
	canbadmphamemnmdfngmcabnjmjgaiki: {
		name: 'Ban Checker for Steam',
		file: 'options.html'
	},
	cclhgechkjghfaoebihpklmllnnlnbdb: {
		name: 'Paint Online',
		file: 'assets/fonts/arial/ARIAL.TTF'
	},
	cgococegfcmmfcjggpgelfbjkkncclkf: {
		name: '셀러라이프',
		file: 'popup/popup.js'
	},
	cpdkchkkmcpnfgbpjjgfhcbcaceeandd: {
		name: 'PlePer Local SEO Tools',
		file: 'includes/xhr.js'
	},
	cpnomhnclohkhnikegipapofcjihldck: {
		name: 'Text to Speech',
		file: 'data/content_script/icons/play.png'
	},
	dnclkkkjlabdgfdjngdkaebpaahnohoo: {
		name: 'Zoom',
		file: 'report.html'
	},
	eajafomhmkipbjmfmhebemolkcicgfmd: {
		name: 'Taho',
		file: 'tab.js'
	},
	ecbedadooalalcgolmfgpnmphhccegei: {
		name: 'Jambofy',
		file: 'assets/images/1.png'
	},
	ehgmhinnhggigkogkbhnbodhbfjgncjf: {
		name: 'Salesforce DevTools',
		file: 'popup.html'
	},
	eiionlappbmidcpaabhepkipldnopcch: {
		name: 'Dark Mode',
		file: 'assets/static/logo-turn-on.png'
	},
	einnioafmpimabjcddiinlhmijaionap: {
		name: 'Wander',
		file: 'assets/animation/usd.png'
	},
	ejhkmnhjkbekmfohoipicmpmjdbofdhm: {
		name: 'Pague Menos Be!Tech',
		file: 'index.css'
	},
	epanfjkfahimkgomnigadpkobaefekcd: {
		name: 'IronVest',
		file: 'popup.html'
	},
	facoldpeadablbngjnohbmgaehknhcaj: {
		name: 'Bulk Image Downloader',
		file: 'popup.js'
	},
	fcfdgjihkdffhnfaefnbdbekafdeelio: {
		name: 'betterdeals',
		file: 'app.js'
	},
	febgikmgbjnbmpodlhljpnnoeappdeck: {
		name: 'Sense',
		file: 'page.js'
	},
	fgdaagbdeodomdnkkolfghckcjceakgb: {
		name: 'CRM para Vendas por WhatsApp',
		file: 'index.html'
	},
	flblmacldekcjcoockeoggionmhflecp: {
		name: 'Save to Collect',
		file: 'content.js.map'
	},
	fldfpgipfncgndfolcbkdeeknbbbnhcc: {
		name: 'MyTonWallet',
		file: 'extensionPageScript.js'
	},
	fmoglfedagdapnidjcbnchkiihllemip: {
		name: 'KeyController Plugin',
		file: 'icon48.png'
	},
	fnfdomooadjpfohbepiaonnbdmkdjiog: {
		name: 'Meomni Pro',
		file: 'icon_128.png'
	},
	gbiahfedloaennjklbmekkhoojlaffcc: {
		name: 'VU Quiz Firewall',
		file: 'VULogo.png'
	},
	gfkpklgmocbcbdabfellcnikamdaeajd: {
		name: 'SimplyCodes',
		file: 'content-scripts/content.css'
	},
	ggopndlojiiidkhpagipcjgdinefpoeb: {
		name: 'ClassroomGo AI',
		file: 'jquery.js'
	},
	gjdmanggfaalgnpinolamlefhcjimmam: {
		name: 'Minesweeper Original',
		file: 'icons/icon-16.png'
	},
	gpkildejogofhhobidokcjpolaikgldj: {
		name: 'Webpage to PDF Converter',
		file: 'redo.png'
	},
	hahkojdegblcccihngmgndhdfheheofe: {
		name: 'TextCortex',
		file: 'fonts/Inter-Bold.woff'
	},
	hdgloanjhdcenjgiafkpbehddcnonlic: {
		name: 'Protect My Choices',
		file: 'popup.js'
	},
	hegneaniplmfjcmohoclabblbahcbjoe: {
		name: 'Video Ad Blocker Plus for YouTube',
		file: 'img/x.svg'
	},
	henhldbgljkagjabmpjnlphncpnfggcd: {
		name: 'WA',
		file: 'js/fill.js'
	},
	hgphbmgpkindhnldhjafhfflhjodpfmn: {
		name: 'Powtoon Capture',
		file: 'camera.html'
	},
	hhimhiimpaicidimabokfbdokhpcnmoh: {
		name: 'Translate Anywhere',
		file: 'jq.js'
	},
	honjoefhlidgdidlcdbipobjnoliiaid: {
		name: 'Troywell VPN Lite',
		file: 'caa/styles.css'
	},
	iaaokenmfgahhlcfbdipjonlkeinadaa: {
		name: 'Website Downloader',
		file: 'icon/16.png'
	},
	ibbpaphbbbabnmmllpdlmcfihhkahgai: {
		name: 'Screenshot',
		file: 'assets/jquery-BbtLhie5.js'
	},
	ieepebpjnkhaiioojkepfniodjmjjihl: {
		name: 'PDF Reader and Editor',
		file: 'data/pdf.js/web/viewer.html'
	},
	ijbhcaojmmmlpkghcejkoadlfhghkkoj: {
		name: 'VaSaham',
		file: 'script/ft.js'
	},
	imopknpgdihifjkjpmjaagcagkefddnb: {
		name: 'Screen Capture and Screen Recorder',
		file: 'popup.html'
	},
	iodbnclobmalekpemjhncgfphojcgocd: {
		name: 'Mangools SEO',
		file: 'assets/kw-icon.svg'
	},
	jbfeongihppeenfnaofmdeikahaefljd: {
		name: 'Manganum',
		file: 'assets/ntp.js'
	},
	jcacnejopjdphbnjgfaaobbfafkihpep: {
		name: 'Hive Keychain',
		file: 'hive_keychain.js'
	},
	jcbjknkcpodniflhegplcmjonnfhnhmi: {
		name: 'Molly',
		file: 'content/main.js'
	},
	jcgpgjhaendighananonflfmjjefjjlp: {
		name: 'Streak Email Tracking for Gmail',
		file: 'blank.png'
	},
	jfpjkgdpgdbddknpgplfkjjfncenlmkf: {
		name: 'StoryXpress',
		file: 'tour.html'
	},
	jlnhdnbbikjkdejminhdpmejldiapdgn: {
		name: 'AliDropship 2.0',
		file: 'js/popup.js'
	},
	kafnfkonkgfgkppomkfckmkgpkfkggcp: {
		name: 'PJe+R',
		file: 'page-context.js'
	},
	kdkadcnebmokaadholinmnpjelphnghh: {
		name: 'Canvas+',
		file: 'assets/img/dim.png'
	},
	khgocmkkpikpnmmkgmdnfckapcdkgfaf: {
		name: '1Password',
		file: 'inline/injected.js'
	},
	khhapgacijodhjokkcjmleaempmchlem: {
		name: 'ESET PWM',
		file: 'src/images/icons/blank.png'
	},
	khnbclggeggefodgimdekejhipkeobnc: {
		name: 'lemlist',
		file: 'src/ui.css'
	},
	kiokdhlcmjagacmcgoikapbjmmhfchbi: {
		name: 'Web Clipper',
		file: 'js/content_scripts/inject.js'
	},
	kpecfgjcmboghimfnkpcfijmoknhipdi: {
		name: 'Img2Go',
		file: 'iframe.html'
	},
	kppclncopdimepgijfbnomckcmholela: {
		name: 'StudyBee Assess',
		file: 'src/index.css'
	},
	ldgogjlogbecagpdpfomiiebiaeilgpd: {
		name: 'Coursology',
		file: 'assets/loading.riv'
	},
	lejhbacckkdpjnllmefhlinigbngpibl: {
		name: 'Copy Text from Picture',
		file: 'engine/index.html'
	},
	lliifkldpflpgmjkpdoolkfpafbdbkoh: {
		name: 'ordbogen.com',
		file: 'content-scripts/contentscript.js'
	},
	mmhlniccooihdimnnjhamobppdhaolme: {
		name: 'Kee',
		file: 'dist/panels/panels.html'
	},
	molcibnmfbjmmfbefjfcafdeabfniobi: {
		name: 'Cici',
		file: 'route.json'
	},
	nbphjjmibhopfgkkbpoggemjnihnchhk: {
		name: 'Spekit',
		file: 'styles/all.css'
	},
	nhonfddkgankhjilponlbdccpabaaknp: {
		name: 'Legrooms+ for Google Flights',
		file: 'popup.html'
	},
	nmniboccheadcclilkfkonokbcoceced: {
		name: 'Revoke.cash',
		file: 'js/vendor.js'
	},
	nodnmpgjlnclahkmgjiinfjklgbbgecg: {
		name: 'FlashPlayer',
		file: 'data/player/ruffle/ruffle.js'
	},
	npmjjkphdlmbeidbdbfefgedondknlaf: {
		name: 'uTab',
		file: 'assets/static/32.png'
	},
	obcbigljfpgappaaofailjjoabiikckk: {
		name: 'FoxClocks',
		file: 'css/statusbar.css'
	},
	ocallppfcfgngjhoplfhlmekcdjaeapl: {
		name: 'LoveDeals',
		file: 'ad.10e07838.css'
	},
	odamfmfcmgcaghpmeppfiaaafahcnfbc: {
		name: 'Synology Office',
		file: 'js/synofficeExt.js'
	},
	oihhpemnlfdlkdhbiajjjkbbojdojchj: {
		name: 'Pixie Reader',
		file: 'reader-view.html'
	},
	okcnidefkngmnodelljeodakdlfemelg: {
		name: 'Dark Mode',
		file: 'popup.css'
	},
	omlgpaciclcjgbligehccipcikleeiea: {
		name: 'Tongyi',
		file: 'logo.svg'
	},
	oolbjiianecoijlgkhopbmhnliajjnnm: {
		name: 'Reminders by SMS',
		file: 'error.svg'
	},
	oooikipggipaohjibkmoiacmmlilgokn: {
		name: 'Manga Translator',
		file: 'images/download.svg'
	},
	pbhpcbdjngblklnibanbkgkogjmbjeoe: {
		name: 'Image Translator',
		file: 'src/content/content.js'
	},
	pbkloffickinnlnmefmjmjbacohecpbd: {
		name: 'Web Cache Viewer',
		file: 'pages/changelog/changelog.html'
	},
	pembniiibielncgmegepmgcbkieljieh: {
		name: 'ZYing',
		file: 'assets/flag/AD.svg'
	},
	pmabjgjpcbofkbbeiphkiaanogobokgg: {
		name: 'Full Page Screen Capture',
		file: 'images/crop.svg'
	},
	pnpdnibdembnnlaiibkeandepjajegoi: {
		name: 'Translator',
		file: 'js/popup.js'
	},
	aahnibhpidkdaeaplfdogejgoajkjgob: {
		name: 'Bittorrent',
		file: 'res/icon96.png'
	},
	acmbnbijebmjfmihfinfipebhcmgbghi: {
		name: 'Video Downloader Web',
		file: 'images/play.svg'
	},
	aeeninnnlhgaojlolnbpljadhbionlal: {
		name: 'Bluedot',
		file: 'camera.html'
	},
	afbcbjpbpfadlkmhmclhkeeodmamcflc: {
		name: 'MathWallet',
		file: 'assets/index.js-CSO-CXFo.js'
	},
	aikkeehnlfpamidigaffhfmgbkdeheil: {
		name: 'AI Code Finder',
		file: 'assets/icons/link.png'
	},
	akkncdpkjlfanomlnpmmolafofpnpjgn: {
		name: 'm3u8 Sniffer TV',
		file: 'player/player.html'
	},
	akpkoodohacdmlddblgnaahbbfjplcig: {
		name: 'Dark Reader',
		file: 'assets/static/32.png'
	},
	bbdhfoclddncoaomddgkaaphcnddbpdh: {
		name: 'rektCaptcha',
		file: 'models/bus.ort'
	},
	bfbnagnphiehemkdgmmficmjfddgfhpl: {
		name: 'UltraWideo',
		file: 'content-scripts/inject.css'
	},
	bgkhpibkldkmjjpikipeklkbdamlknnc: {
		name: 'Economize!',
		file: 'index.css'
	},
	bhagcmmjnakekaccjmpkmcidopfmedlm: {
		name: 'iatricSystems FlexButton',
		file: 'web_page.js'
	},
	bjkmnimffmhjbfikbempnbanngnnmknc: {
		name: 'AI Toolbar',
		file: 'svg/cog.svg'
	},
	bpjfchmapbmjeklgmlkabfepflgfckip: {
		name: 'PSR',
		file: 'img/ImageV8.svg'
	},
	canpneabbfipaelecfibpmmjbdkiaolf: {
		name: 'TagHound',
		file: 'toastContent.html'
	},
	cebmnlammjhancocbbnfcglifgdpfejc: {
		name: 'AI Blaze',
		file: 'images/bg.svg'
	},
	ceipnlhmjohemhfpbjdgeigkababhmjc: {
		name: 'I\'m not robot captcha clicker',
		file: 'options.html'
	},
	cibffnhhlfippmhdmdkcfecncoaegdkh: {
		name: 'Visual CSS Editor',
		file: 'editor/js/addons.js'
	},
	ckdogamhnmfaaikeoaoajkbillncnace: {
		name: 'Melhor Câmbio',
		file: 'css/modal.css'
	},
	ckfgjlakjcboggkbojkdoookoeogpifc: {
		name: 'Lexmark Cloud Print Management',
		file: 'callback.html'
	},
	ckpgbnnkddpiecdggjedokigklbccbgb: {
		name: 'Cookie Clicker',
		file: 'assets/style.css'
	},
	cnlaenhekjagkfjaglgfffkdblmddnnn: {
		name: 'OKIOCAM Stop Motion',
		file: 'ffmpeg/ffmpeg.wasm'
	},
	cnncmdhjacpkmjmkcafchppbnpnhdmon: {
		name: 'HAVAH Wallet',
		file: 'inpage.js'
	},
	cpnnabpklgnhjopaenljbbmkejamagel: {
		name: 'Rytr',
		file: 'images/logo.svg'
	},
	dbfoemgnkgieejfkaddieamagdfepnff: {
		name: '2FAS Auth',
		file: 'fonts/montserrat-v25-latin-600.woff2'
	},
	dbjlkjnlhjgnabhmibofkhfgcnkgloig: {
		name: 'Cashback Ninja',
		file: 'notify.html'
	},
	dbnfnbehhjknomdbfhcobpgpphnlnikp: {
		name: 'Tipli',
		file: 'serp.js'
	},
	dbnjpielondlkmdjbembloegkaabfakc: {
		name: 'Glot',
		file: 'video/iq.js'
	},
	dcaikidbolchfhcieemjijhdefmomnnh: {
		name: 'Games Blocker',
		file: 'images/icon.png'
	},
	debflmkfmkejgppfabgfcbemelmnpnho: {
		name: 'ViiTor Translate',
		file: 'worker.js'
	},
	delakdmnpanaclafnplfomddhlhlcloe: {
		name: 'Rezi.ai',
		file: 'img/source.gif'
	},
	dflhdcckcmcajgofmipokpgknmfikhej: {
		name: 'Perceptron',
		file: 'js/wasm/blockmesh_ext.js'
	},
	dhjiababgkcfbglanikgepmmdelngfon: {
		name: 'YouTube Transcriber and Summarizer',
		file: 'icon-32.png'
	},
	dimkjjladgaekdlfebknbaooicmfalke: {
		name: 'Trustpilot',
		file: 'index.css'
	},
	djlkbfdlljbachafjmfomhaciglnmkgj: {
		name: 'Motrix',
		file: 'images/16.png'
	},
	dndehlekllfkaijdlokmmicgnlanfjbi: {
		name: 'Ultrawidify',
		file: 'ext/uw.js'
	},
	eadklkgmejdhldgchbmegmljdkchcdbd: {
		name: 'monosearch',
		file: 'js/popup.js'
	},
	ebgmlfdcgihhfheckfdmhnmedjigogmm: {
		name: 'Open incognito tab',
		file: 'images/48x48.png'
	},
	ebpckmjdefimgaenaebngljijofojncm: {
		name: 'Volume Booster',
		file: 'assets/css/popup.css'
	},
	ecgllillhilocegdanfdmbfnjonmhpie: {
		name: 'Aliexpress',
		file: 'icon/icon16.png'
	},
	eedfldkdghfkhdcanjnfiklpeehbfoag: {
		name: 'CSS Viewer',
		file: 'img/body.png'
	},
	eeeningnfkaonkonalpcicgemnnijjhn: {
		name: 'eyeCare',
		file: 'icon_48.png'
	},
	eggdlmopfankeonchoflhfoglaakobma: {
		name: 'Apifox',
		file: 'adapter.js'
	},
	ehmneimbopigfgchjglgngamiccjkijh: {
		name: 'Tabrr Dashboard',
		file: 'assets/static/32.png'
	},
	eimimdbkklcfefabegnlclkfakkfdcpc: {
		name: 'KDP Spy',
		file: 'images/logo.png'
	},
	ejllkedmklophclpgonojjkaliafeilj: {
		name: 'Web paint',
		file: 'images/eraser.svg'
	},
	enokdcnimpdlohalipcbkknffnhhdnac: {
		name: 'Music Identifier',
		file: 'static/images'
	},
	enpannaocdooaplolobjfclkjefbeocn: {
		name: 'Ad Blocker',
		file: 'static/icon_active.png'
	},
	eodojedcgoicpkfcjkhghafoadllibab: {
		name: 'CoPilot',
		file: 'logo.png'
	},
	fcejkolobdcfbhhakbhajcflakmnhaff: {
		name: 'Knowee AI',
		file: 'pages/pdf/build/pdf.js'
	},
	fdnipcdebaagjpicpbkildmcefflobhn: {
		name: 'Attendance for Google Meet',
		file: 'img/16.png'
	},
	feahianecghpnipmhphmfgmpdodhcapi: {
		name: 'tweak',
		file: 'intercept.bundle.js'
	},
	ffkgggpfimdabhlfomcfhpgbmjfdbhfh: {
		name: 'Annotate pdf',
		file: 'icons/16x16.png'
	},
	fhbpmacbgklobobcieiaoibpjhdnmcfn: {
		name: 'Video CC translator',
		file: 'options.html'
	},
	fhjnbgadgmmffddcilnbmcieekimilcn: {
		name: 'Internet Download Accelerator',
		file: 'ui/assets/img/download.png'
	},
	flaeifplnkmoagonpbjmedjcadegiigl: {
		name: 'X-VPN',
		file: 'assets/main.js-596d28a2.js'
	},
	flaohdpapmmmkmfnghobgdlbiioeplhb: {
		name: 'Free Snipping Tool',
		file: 'icons/icon.png'
	},
	fldgacclkckcmflokaialbihppmndpbd: {
		name: 'Mapify',
		file: 'content-scripts/content.css'
	},
	flnheeellpciglgpaodhkhmapeljopja: {
		name: 'Altair',
		file: 'altair-app/styles.css'
	},
	fpcobpnccdedokpllpeefhkgcddaejfl: {
		name: 'Supernormal',
		file: 'popup.html'
	},
	gfgpkepllngchpmcippidfhmbhlljhoo: {
		name: 'XTranslate',
		file: 'app.js'
	},
	giahjhmjbiiopleefbmlmjfaafdihidd: {
		name: 'Prepd Fast Catch',
		file: 'index.html'
	},
	gkkmiofalnjagdcjheckamobghglpdpm: {
		name: 'YouTube FullScreen',
		file: 'index.html'
	},
	gmhgdiamihghcepkeapfoeakphffcdkk: {
		name: 'English-to-English Definitions',
		file: 'src/ui/entrypoints/content-iframe.html'
	},
	gobliffocflfaekfcaccndlffkhcafhb: {
		name: 'RevSeller',
		file: 'html/lists.html'
	},
	haafibkemckmbknhfkiiniobjpgkebko: {
		name: 'Panda New Tab',
		file: 'newtab.html'
	},
	hbkblmodhbmcakopmmfbaopfckopccgp: {
		name: 'Thunderbit',
		file: 'index.html'
	},
	hfhimnmjhalnlncfajdlbpjjoediacbf: {
		name: 'Tomato Destroyer',
		file: 'img/egg.png'
	},
	hlifkpholllijblknnmbfagnkjneagid: {
		name: 'Captcha Solver',
		file: 'static/wasm.wasm'
	},
	hnfdneofpohlkoeljnmkdocokcdkjiaa: {
		name: 'Earth',
		file: 'manifest.json'
	},
	hpmbiinljekjjcjgijnlbmgcmoonclah: {
		name: 'Previews',
		file: 'main/cd.js'
	},
	ibiipnmmlnehmeonnhbdajcfagcgihkl: {
		name: 'Passwork Self-Hosted',
		file: 'img/triangle.svg'
	},
	ihnfmldlpdipgnliolhfffenpcmjgnif: {
		name: 'OCR Editor',
		file: 'load.gif'
	},
	iidnankcocecmgpcafggbgbmkbcldmno: {
		name: 'Prompt Security',
		file: 'style/blockModal.css'
	},
	ikcgnmhndofpnljaijlpjjbbpiamehan: {
		name: 'INLoad',
		file: 'data/rate.js'
	},
	ilglobbeckliiacnbnohbbefhkoloblo: {
		name: 'Lingdys',
		file: 'pdf.js'
	},
	imlcamfeniaidioeflifonfjeeppblda: {
		name: 'NC Wallet',
		file: 'content.bundle.js'
	},
	imomahaddnhnhfggpmpbphdiobpmahof: {
		name: 'Skins for YouTube player',
		file: 'resources/js/onoff.js'
	},
	jbmmmambjlkjkinkpifefiaehflllopg: {
		name: 'Mystique Search',
		file: '128.png'
	},
	jcnfkjjanbdfabigknbedgkfjkljhbdn: {
		name: 'FatRank',
		file: 'js/google-countries.json'
	},
	jdaeekgkccdeljekhchpnkanocghccch: {
		name: 'NICE Browser Connector',
		file: 'cs/csInjectorHook.js'
	},
	jephanpkonkmnkekmlkcijdjgniikppl: {
		name: 'vknext',
		file: 'popup.html'
	},
	jjcjblcbnjhgjlnclhficglfjedhpjhl: {
		name: 'A & M viewer',
		file: 'images/close.svg'
	},
	jlcaefilcommembbekhjjkibeieffchd: {
		name: 'Widilo',
		file: 'assets/fonts/Inter.woff2'
	},
	jnhgefjoahogmkkekdnafldkdgppfehd: {
		name: 'Printix',
		file: 'azure-signin-callback.js'
	},
	kcgedkeajhbfkackhppmenimpfpnopje: {
		name: '600% Sound Volume Booster',
		file: 'assets/chunk-f3e1db63.js'
	},
	kdoofkpcjhkbhedgkdbagobockcmeoeb: {
		name: 'Laban Dict',
		file: 'img/icon16.png'
	},
	kecadfolelkekbfmmfoifpfalfedeljo: {
		name: 'Email Finder',
		file: 'script1.js'
	},
	kekjfbackdeiabghhcdklcdoekaanoel: {
		name: 'MAL-Sync',
		file: 'window.html'
	},
	kfimphpokifbjgmjflanmfeppcjimgah: {
		name: 'Inoreader',
		file: 'toast.html'
	},
	kfkdboecolemdjodhmhmcibjocfopejo: {
		name: 'CSDN',
		file: 'js/20.js'
	},
	kjfmedbganalpkohkeghhpppicoigdal: {
		name: 'iorad',
		file: 'panel/app.js'
	},
	kkpllkodjeloidieedojogacfhpaihoh: {
		name: 'Enkrypt',
		file: 'scripts/inject.js'
	},
	klgfhbiooeogdfodpopgppeadghjjemk: {
		name: '火山翻译',
		file: 'assets/uk.png'
	},
	lanchoggmnkmkehofmdonkbcdolfonmf: {
		name: 'Calculator',
		file: 'js/popup.js'
	},
	lghkkfjealjkonheilkflengobdkiaeo: {
		name: 'max PayBack',
		file: 'dev.js'
	},
	lgjinjcobiflbbnhenlfkcjpeeacklfl: {
		name: 'Copy Me That',
		file: 'exists.gif'
	},
	lmeddoobegbaiopohmpmmobpnpjifpii: {
		name: 'Open in Firefox Browser',
		file: 'data/redirect/index.html'
	},
	lmmpgfjnchldhcieiiegcpdmaidkaanb: {
		name: 'CroxyProxy',
		file: 'shared/images/test.png'
	},
	lpgajkhkagnpdjklmpgjeplmgffnhhjj: {
		name: 'Trim',
		file: 'images/fresh.png'
	},
	mdcemplfpeifcogglenloohjghjbigni: {
		name: 'ChongLuaDao',
		file: 'blocking.html'
	},
	mdjbgnpehbhpibonmjjjbjaoechnlcaf: {
		name: 'AllDebrid',
		file: 'img/fr.png'
	},
	mfacblegickmnfpaebakfnlbfhpoegin: {
		name: 'Papers',
		file: 'inject.html'
	},
	mhlppgemmcdfjonomcbgfddlgcjnghga: {
		name: 'Adblocker Fortify',
		file: 'block.js'
	},
	mkgegefmmdlpejiifolbbjjfggimnmoe: {
		name: 'PDF.ai',
		file: 'images/icon.png'
	},
	mnngaddpelmhcgkbeajnbjmkdmpkogbo: {
		name: 'Scan Translator',
		file: 'dist/contentScripts/style.css'
	},
	naipgebhooiiccifflecbffmnjbabdbh: {
		name: 'HyperChat',
		file: 'options.js'
	},
	ndbhldoclidahhoogmgklimmomnnepjg: {
		name: 'YouTube Translator & YouTube Video Dubbing',
		file: 'src/assets/128.png'
	},
	ngghlnfmdgnpegcmbpgehkbhkhkbkjpj: {
		name: 'Zapier',
		file: 'popup.html'
	},
	nibjojkomfdiaoajekhjakgkdhaomnch: {
		name: 'IPFS Companion',
		file: 'icons/ipfs-logo-on.svg'
	},
	niepmhdjjdggogblnljbdflekfohknmc: {
		name: 'AdLibNote',
		file: 'images/tg.png'
	},
	nkklhdhlfknnhmmldffbofbbomlicpig: {
		name: 'Snap VPN',
		file: 'web_accessible_resources/status_on.png'
	},
	nlfaobjnjbmbdnoeiijojjmeihbheegn: {
		name: 'Flash Player that Works!',
		file: 'icons/joy.png'
	},
	npkncdihipibabapnailakhpajlglbfk: {
		name: 'Signal Spam',
		file: 'js/options.js'
	},
	oanlehpljgeknlohgbakodejdbingjpj: {
		name: 'AliPrice Shopping Assistant for Shopee',
		file: 'assets/js/popup.js'
	},
	oedkbkpngfmjfbmmmijkogojlcddmcgf: {
		name: 'Bro-Mon',
		file: 'battle_app.css'
	},
	ofokfnlmkfghjcmppfopibknmlhadhbm: {
		name: 'Bullet Journal',
		file: 'popup.js'
	},
	ohdihpdgfenligmhnmldmiabdhflokkh: {
		name: 'VisualSP Training for Microsoft 365',
		file: 'js/bootstrap.js'
	},
	ohffmmbmebhcljgcdijjlepjaoladfag: {
		name: 'Keyword Planner',
		file: 'assets/loader.svg'
	},
	ohgodjgnfedgikkgcjdkomkadbfedcjd: {
		name: 'ReaderGPT',
		file: 'options.js'
	},
	onpkagahfdnlknakhgnegpipmhkodnlm: {
		name: 'MapQuest Search',
		file: 'manifest.json'
	},
	oplfencnkfofaoeedbmphcbplaceplim: {
		name: 'MagicSchool AI',
		file: 'assets/main.tsx-M27BHm0H.js'
	},
	pbcoegikffnadpahojjhgdladmmddeji: {
		name: 'HaramBlur',
		file: 'src/assets/premium.svg'
	},
	penohjgblobinadflplocjekaclnoemh: {
		name: 'TikTok Watermark',
		file: 'src/assets/icon/iconfont.js'
	},
	pkoccklolohdacbfooifnpebakpbeipc: {
		name: 'Allow Select And Copy',
		file: 'data/engine/index.html'
	},
	pmilcmjbofinpnbnpanpdadijibcgifc: {
		name: 'Sound Booster',
		file: 'img/rs.svg'
	},
	abbedfhgcpfnmhonjhdlmndigalhandb: {
		name: 'Power Text',
		file: 'scripts/powerTextMda.js'
	},
	acaonckckmmakfgjfkgbfeepdhmajkeg: {
		name: 'TraitSniper',
		file: 'static/js/content.js'
	},
	acehfjhnmhbmgkedjmjlobpgdicnhkbp: {
		name: 'Amplitude Event Explorer',
		file: 'inject.html'
	},
	adjgicoimjhccdcjgepkmigomegpjplg: {
		name: 'Talkdesk Click-to-Call',
		file: 'img/favicon.png'
	},
	agleiimpggapjekcdhdjbmegjbbkleie: {
		name: 'Ground News',
		file: 'frame.html'
	},
	agplbamogoflhammoccnkehefjgkcncl: {
		name: 'Gener8',
		file: 'dist/DMSans-Bold-6Z5CL2SK.ttf'
	},
	almalgbpmcfpdaopimbdchdliminoign: {
		name: 'Urban Browser Guard',
		file: 'executors/grok.js'
	},
	anbfhidldjknonaihbalghlebaijealk: {
		name: 'CCC',
		file: 'html/popup.html'
	},
	anenfchlanlnhmjibebhkgbnelojooic: {
		name: 'Blaze VPN',
		file: 'web_accessible_resources/status_on.png'
	},
	aoabjfoanlljmgnohepbkimcekolejjn: {
		name: 'Web Site blocker',
		file: '128.png'
	},
	bdgmdoedahdcjmpmifafdhnffjinddgc: {
		name: 'bittensor',
		file: 'page.js'
	},
	bebecogbafbighhaildooiibipcnbngo: {
		name: 'UI5 Inspector',
		file: 'vendor/ace.js'
	},
	befflofjcniongenjmbkgkoljhgliihe: {
		name: 'TinaMind',
		file: 'images/logo.png'
	},
	bfcdaalpeodhimbiipneeaoeogkkminc: {
		name: 'Smart SOP Generator',
		file: 'css/popup.css'
	},
	biaggnjibplcfekllonekbonhfgchopo: {
		name: 'Webpilot',
		file: 'manifest.json'
	},
	bofddndhbegljegmpmnlbhcejofmjgbn: {
		name: 'eckoWALLET',
		file: 'app/script/inpage.js'
	},
	cbfnbdgmjknfjeidohbhmpdliofaopne: {
		name: 'Fyxit AI',
		file: 'notification.html'
	},
	ccammcjdkpgjmcpijpahlehmapgmphmk: {
		name: 'BaekjoonHub',
		file: 'popup.js'
	},
	ccdgonnidaghcdicoebncgncfmpagpdk: {
		name: 'NSSignXML',
		file: 'extensionApi/xmlExtensionApi.js'
	},
	chngjgginikejcpaejphfoglpppmjfne: {
		name: 'ChiliCal',
		file: 'pageWorld.js'
	},
	cjadmgobonfhilogbdgkkhnoojpgenfg: {
		name: 'Audio Equalizer',
		file: 'data/content_script/page_context/inject.js'
	},
	cmeikcgfecnhojcbfapbmpbjgllklcbi: {
		name: 'Hive AI Detector',
		file: 'icons/info.htm'
	},
	coobjpohmllnkflglnolcoemhmdihbjd: {
		name: 'Bass Booster',
		file: 'assets/popup.css'
	},
	dbmaeobgdodeimjdjnkipbfhgeldnmeb: {
		name: 'YouTube MrBeastify',
		file: 'images/1.png'
	},
	dcfapodepbbgfaimadogodmgniepkiei: {
		name: 'Netflix Party',
		file: 'c2.js'
	},
	dcidojkknfgophlmohhpdlmoiegfbkdd: {
		name: 'WA Contacts Extractor',
		file: 'assets/w.js'
	},
	ddicoofdkbcdkkeecgafcoabogcgicfp: {
		name: 'CubeSeller',
		file: 'content/extract.js'
	},
	depnaiojakmmjcdpccbffphcgjghniol: {
		name: 'Get Weather Today',
		file: 'img/icon16.png'
	},
	djbfechcnkppbknmlhfcaoifgnicolin: {
		name: 'LuLu Translate',
		file: 'content/assets/i18n/en.json'
	},
	dlkjdkiladlnclocjpcikagojeddmkeh: {
		name: 'Convert Picture to Text',
		file: 'engine/index.html'
	},
	dnacggjlcbpfcfchkkogedlkenpnlfbi: {
		name: 'Session Share',
		file: 'scott48.png'
	},
	dpoifemdnlmkekjioonnflnacmhebnoj: {
		name: 'Bonusvarsler',
		file: 'scripts/background.js'
	},
	dpphkcfmnbkdpmgneljgdhfnccnhmfig: {
		name: 'Relingo',
		file: 'pdf.html'
	},
	eeckiajfclogcacnhgigljkcgabfcmco: {
		name: 'Bookmarks Checker',
		file: 'assets/content.js'
	},
	efifccmcdofkcjcleapkaeedlhcejcmd: {
		name: 'Web Paint',
		file: 'ui/index.html'
	},
	egcmejiaapccophafhfalaelbfgojdjf: {
		name: 'OpenText iPrint',
		file: 'assets/loading.gif'
	},
	egmennebgadmncfjafcemlecimkepcle: {
		name: 'VidHelper',
		file: 'js/core.js'
	},
	ehcanhoaekbglbenfcoeacjibmmllgjf: {
		name: 'whatsapp-web',
		file: 'lib/common.js'
	},
	epnkgfaomnlopilnejhgndcilhlimndd: {
		name: 'Shopstat',
		file: 'icon16.png'
	},
	fcbnhmalionocfajdkpnlhmekghnmbii: {
		name: 'PHT Translator',
		file: 'PHT/webar.js'
	},
	fcfdegencfkkpphgkogonmpckeofhgko: {
		name: 'RoSearcher',
		file: 'load.js'
	},
	ffoidoiaecmiamaljkhfhjacemefalec: {
		name: 'Эй, Бро!',
		file: 'icon.png'
	},
	fgomgoininjjcilkdpghijnhmlagbndk: {
		name: 'Content Site Search Guru',
		file: 'img/icon16.png'
	},
	fkemeeodmcbkppgcnpcmoihepcgdenmi: {
		name: 'SprintPlus WebSprinter',
		file: 'assets/i18next-f4h8SSSC.js'
	},
	flkdejchjaibellgdhchhjpacegdgmin: {
		name: 'n8n Chat',
		file: 'esm-browser.1baef823.js'
	},
	gbilbeoogenjmnabenfjfoockmpfnjoh: {
		name: 'Night Mode Pro',
		file: 'data/content_script/inject.css'
	},
	gbnfheoijkjfgeobhbkpgdkfabihjonj: {
		name: 'UpSeller',
		file: 'requestHooks.js'
	},
	gchcfdihakkhjgfmokemfeembfokkajj: {
		name: 'Fake Data',
		file: 'sandbox/sandbox.html'
	},
	gdfhmpjihkjpkcgfoclondnjlignnaap: {
		name: 'Private video downloader',
		file: 'popup.html'
	},
	gjlnedceigegbbmdnjgeebldeljgmhch: {
		name: 'Oracle Guided Learning Editor',
		file: 'css/spin.css'
	},
	gkdefhnhldnmfnajfkeldcaihahkhhnd: {
		name: 'Cute Tab',
		file: 'assets/static/32.png'
	},
	glpichgelkekjnccdflklcclhnoioblm: {
		name: 'SendSafely Encryption',
		file: 'images/sendsafely_banner.png'
	},
	gpilpagnmpikakpjiokkabbigneigoln: {
		name: 'Qoala',
		file: 'assets/images/icon128.png'
	},
	gpmodmeblccallcadopbcoeoejepgpnb: {
		name: 'JSON Formatter',
		file: 'css/UI.css'
	},
	hdigpgnfpockednepfiinhdjebkmpicn: {
		name: 'Clear Messages',
		file: 'popup.js'
	},
	hfhfmkmokccaciopjahpkmfdbkjbhmfp: {
		name: 'Newz Finder',
		file: 'img/icon16.png'
	},
	hfjbmagddngcpeloejdejnfgbamkjaeg: {
		name: 'Vimium C',
		file: 'lib/viewer.js'
	},
	hgipopnedpcknmapfakdedlnjjkmpnao: {
		name: 'Checkmate',
		file: 'build/popup.js'
	},
	hlambnnbnnjkabpgemeompijpdliimkm: {
		name: 'CardPointers X',
		file: 'tweaks.css'
	},
	hmlmncgagbkggdfpklpmhjcmbjadpkdo: {
		name: 'Universal Copy-Enable Copy',
		file: 'js/normal.js'
	},
	hpmllfbpmmhjncbfofmkkgomjpfaocca: {
		name: 'SeoStack',
		file: 'assets/img/h1.svg'
	},
	iccjkhpkdhdhjiaocipcegfeoclioejn: {
		name: 'Pomodoro',
		file: 'mp3/gta.mp3'
	},
	idfblidcbbfkggckamnibfbngnbgjocf: {
		name: 'Cognism',
		file: 'index.html'
	},
	imbddededgmcgfhfpcjmijokokekbkal: {
		name: 'Nanobrowser',
		file: 'icon-32.png'
	},
	imnbhbjodhdinfaifjbpgkpknejadfjk: {
		name: 'Naver dictionary',
		file: 'content.js'
	},
	iojpcjjdfhlcbgjnpngcmaojmlokmeii: {
		name: 'Smart Adblocker',
		file: 'css-block.json'
	},
	jbmbplbpgcpooepakloahbjjcpfoegji: {
		name: 'Video Downloader',
		file: 'js/instaStory.js'
	},
	jdedmecbcembcmlddbchlmmoglcldghe: {
		name: 'Kleo',
		file: 'options.html'
	},
	jepfhfjlkgobooomdgpcjikalfpcldmm: {
		name: 'NflxMultiSubs',
		file: 'nflxmultisubs.min.js'
	},
	jjpbbahenfdgofabbgcnnfejgcigadpd: {
		name: 'Alibaba Lens',
		file: 'content-scripts/content.css'
	},
	jnmbobjmhlngoefaiojfljckilhhlhcj: {
		name: 'OneKey',
		file: 'injected.js'
	},
	joioophepbodkfjcjpoeofkgdblahbfe: {
		name: 'Mango Helper',
		file: 'css/lk.css'
	},
	jphdkcjkapjfojcjajeeomimmihnghjp: {
		name: 'Dyslexie Font',
		file: 'assets/jsx-runtime.css'
	},
	kaedchgajfpgipflgbgeeiiajekblklm: {
		name: 'Trellix Endpoint Security For Mac Web Control',
		file: 'js/yahoo.js'
	},
	kdbmbkoigckegcfgcfmfpdkbbnhjcooo: {
		name: 'Xiaohongshu',
		file: 'assets/js/utils.js'
	},
	kdglfacllamekkphagegcaabjaicekin: {
		name: '来搜',
		file: 'js/http.js'
	},
	keafkoopbkbjlbbedmonhnfgfciaphdb: {
		name: 'LockSelf',
		file: 'logo.svg'
	},
	klnaejjgbibmhlephnhpmaofohgkpgkd: {
		name: 'ZilPay',
		file: 'inpage.js'
	},
	klohjdodjjeocpbpadmkcndjoadijgjg: {
		name: 'Schema Builder for Structured Data',
		file: 'icon-128.png'
	},
	kmhfkeaanbokocpddnjlocbefjcpohhl: {
		name: 'Wonde',
		file: 'brand.svg'
	},
	kmmcnncdadfmbjkoloakclhfllocaeap: {
		name: 'Saladict',
		file: 'assets/trs.js'
	},
	kngfjpghaokedippaapkfihdlmmlafcc: {
		name: 'Locale Switcher',
		file: 'override-language.js'
	},
	kojhcdejfimplnokhhhekhiapceggamn: {
		name: 'Surfe',
		file: 'assets/style.scss'
	},
	lebpbmopodkmcadehlkmghfcfmgnacdm: {
		name: 'Amazon Keyword Tool',
		file: 'icon-34.png'
	},
	ledkjiplmbjfmnblpkpckbahgphoajfb: {
		name: 'Pitch Changer',
		file: 'smartProcessor.bundle.js'
	},
	lekblhcdmlbolaelgdghnmpnlchjieod: {
		name: 'DraftSharks Sync',
		file: 'login/espn.js'
	},
	lholmjphdehllbpdoiejoolbejkjcpba: {
		name: 'Shopee Fans',
		file: 'js/popup.js'
	},
	lkjffochdceoneajnigkbdddjdekhojj: {
		name: 'Japanese Translate & Dictionary Mazii',
		file: 'favicon.ico'
	},
	lnadekhdikcpjfnlhnbingbkhkfkddkl: {
		name: 'Robots Exclusion Checker',
		file: 'config.json'
	},
	lnmbdamplioghdakbfnbbofeipjlbgpk: {
		name: 'Krisp',
		file: 'patch.js'
	},
	medapdbncneneejhbgcjceippjlfkmkg: {
		name: 'Markdown Reader',
		file: 'assets/logo.png'
	},
	mlhdnjepakdfdaabohjgegnomlgeejep: {
		name: 'Smart SOP Generator',
		file: 'css/edit.css'
	},
	mmdamlknnafgffhlobhlmiljonijdnid: {
		name: 'Titans Pro',
		file: 'content-scripts/productpage.css'
	},
	mmhpmbmabmppoeonpcclfiobhpjdcdjc: {
		name: 'Screen capture and recorder',
		file: 'index.html'
	},
	mobhfbcgjoleoljhpkkdhopdiemlocka: {
		name: 'RPass',
		file: 'oauth.html'
	},
	mpbelhhnfhfjnaehkcnnaknldmnocglk: {
		name: 'HTML Validator',
		file: 'readme.txt'
	},
	mpjjildhmpddojocokjkgmlkkkfjnepo: {
		name: 'PixieBrix',
		file: 'frame.html'
	},
	mpobacholfblmnpnfbiomjkecoojakah: {
		name: 'A11y Checker',
		file: 'assets/16x16.png'
	},
	nakcddgmfmjmdbfahkkiijejmmfkfipc: {
		name: 'Passportal',
		file: 'images/key.svg'
	},
	namkakclifhmccmkbeddddpjegmdimed: {
		name: 'Ultimate',
		file: 'svg/edit.svg'
	},
	ncidnmjpnbljffflgbchghmpnndnhali: {
		name: 'IRIS@Curtin',
		file: 'icon.png'
	},
	ndandbjhlckddblkhognpbfbhjokbplp: {
		name: 'MyRegistry Shipping Address Assist',
		file: 'data/icons/icon.png'
	},
	neigoggljhfnodeneidndcflnclldnpm: {
		name: 'Where It\'s Cheaper',
		file: 'content.js'
	},
	ngddmlfbgokkcfbmnniahfbffdohlhgf: {
		name: 'Seller Assistant',
		file: 'images/new.svg'
	},
	nhnkbkgjikgcigadomkphalanndcapjk: {
		name: 'CLV Wallet',
		file: 'inpage.js'
	},
	njggknpmkjapgklcfhaiigafiiebpchm: {
		name: 'BrowserGPT',
		file: 'img/ding.jpeg'
	},
	nomnoimacbncclfbnfaingniikblfbji: {
		name: 'Debugger for Google Analytics 4',
		file: 'build/main.html'
	},
	npbfdllefekhdplbkdigpncggmojpefi: {
		name: 'LocatorJS',
		file: 'icon-34.png'
	},
	oaikpkmjciadfpddlpjjdapglcihgdle: {
		name: 'Uvoice',
		file: 'dist/404.html'
	},
	obhceflecohdhjjomleeakkogaiclhoo: {
		name: 'Tag Explorer',
		file: 'assets/icons/tag-icons/1.ico'
	},
	oddhnidmicpefilikhgeagedibnefkcf: {
		name: 'React Context DevTool',
		file: 'mainContent.js'
	},
	ofbhiclojhjkggpnapcnjjjdjlgcikdf: {
		name: 'Maps Scraper & Map data extractor',
		file: 'cframe.html'
	},
	ohfinlfcbaehgokpmkjcmkgdcbgamgln: {
		name: 'CyberArk Secure Web Sessions',
		file: 'ca-iframe.html'
	},
	oihbmmeelledioenpfcfehdjhdnlfibj: {
		name: 'Emily',
		file: 'embed_script.js'
	},
	ojaffphbffmdaicdkahnmihipclmepok: {
		name: 'Data Scraper',
		file: 'static/README.md'
	},
	ojaiblngghaojpllefbappfeblffgiah: {
		name: 'Control de URLs para nebulaCERTagent',
		file: 'index.htm'
	},
	ojgkoajchjoafbnckklmamjcceiglmkd: {
		name: 'QuizMate',
		file: 'q.png'
	},
	okieokifcnnigcgceookjighhplbhcip: {
		name: 'Denote',
		file: 'manifest.json'
	},
	omnpnodbhognoblgbjmlagejkioccpih: {
		name: 'キーゾンv3',
		file: 'style.css'
	},
	onlmpoiokhmjmfhaaobipcafdngmppoi: {
		name: 'Hero Ad Blocker',
		file: 'filters/data.json'
	},
	ookgnahfklmejhicejjbfjifppjbfnlk: {
		name: 'sMeta',
		file: 'manifest.json'
	},
	ooopgniccpfabocbklfljmomacccjgej: {
		name: 'Beep',
		file: 'assets/icon16.png'
	},
	opnnmgopaggjpapnoknbphfpjfadbddc: {
		name: 'QSafe wallet',
		file: 'scripts/inject.js'
	},
	pamnlaoeobcmhkliljfaofekeddpmfoh: {
		name: 'Web to PDF',
		file: 'content-scripts/guide.css'
	},
	pdogihmkjobaaappfalhoagnppambhda: {
		name: 'Street View Maps',
		file: 'manifest.json'
	},
	peaiabjigdmcjiigljknblkdmllgmklp: {
		name: 'Vidline',
		file: 'logo.png'
	},
	pebeiooilphfmbohdbhbomomkkoghoia: {
		name: 'Testim Editor',
		file: 'popup2/fab/index.html'
	},
	peiobddfomnijgoblelfdmjblplojcoe: {
		name: 'Share-A-Cart for Amazon',
		file: 'images/sac-16.png'
	},
	pgojnojmmhpofjgdmaebadhbocahppod: {
		name: 'Captcha Solver',
		file: 'dom.js'
	},
	pjbkppdckhokepdfnlfmljjgnbnjfabg: {
		name: 'View Maps & Directions',
		file: 'manifest.json'
	},
	pjdbebkgllbkjfbbbbceeeenhkngnddp: {
		name: 'Video Downloader 4S',
		file: 'content.js'
	},
	ppklhnpdbmedfmgidedifnpdfcdlfijn: {
		name: 'Wanderlog',
		file: 'js/mapContent.js'
	},
	aakigomphmlnijlfonlhcobonfhfipoi: {
		name: 'Merch by Amazon Trademark Protection',
		file: 'images/cross.svg'
	},
	abhjpgicemlbiclagmlbnchinjdimkog: {
		name: 'Readvox',
		file: 'icons/icon-readvox.svg'
	},
	acaeafediijmccnjlokgcdiojiljfpbe: {
		name: 'ChatGPT Translate',
		file: 'icons/logo.svg'
	},
	aefiepimkogajhddmhcekceihikjcabd: {
		name: 'Taboola Pixel Helper',
		file: 'injected.min.js'
	},
	ahbepdkgicljkjjjnogljplljdocjjmo: {
		name: 'TwiHD',
		file: 'fonts/CyGrotesk/kobuzan-cy-grotesk-grand-dark.otf'
	},
	ahiickjmnblnnhjcomiegpdikaboegda: {
		name: 'JustCall',
		file: 'sms.png'
	},
	amkmjjmmflddogmhpjloimipbofnfjih: {
		name: 'Wombat',
		file: 'dropbox.html'
	},
	amlcmfdiddkikfmljhdhhookgjmnpedc: {
		name: 'Currency PRO',
		file: 'assets/scripts/money.js'
	},
	angpjceilobeojeaomilenbjdjdnffkn: {
		name: 'Proctortrack One v3',
		file: 'assets/icon.png'
	},
	anpkfnccdmljhdegcaonjffhjhhcalaj: {
		name: 'Read to Me',
		file: 'modal.css'
	},
	apmmpaebfobifelkijhaljbmpcgbjbdo: {
		name: 'Stylus (beta)',
		file: 'install-usercss.html'
	},
	bcpmdhffpajbbmnndnipoohmoiahbgdj: {
		name: 'Form Solver',
		file: 'tabs/logged-in.html'
	},
	bdingoflfadhnjohjaplginnpjeclmof: {
		name: 'Debugger for Adobe Analytics',
		file: 'page-script.js'
	},
	begnkfeikebdelojdklgfkbhbeboilne: {
		name: 'Alibaba Search by image',
		file: 'loader-icon.svg'
	},
	bepmaejckfhbdbikphclmnmclpiheche: {
		name: 'Record Google Meet',
		file: 'setup.html'
	},
	bfkjochdalcdahjnliojhpldoogkbglc: {
		name: 'Contentsquare',
		file: 'snapshot.js'
	},
	bflmgpechpeohjfomgfdkkfcbhfcjohl: {
		name: 'Cubox',
		file: 'css/cubox.css'
	},
	biehagnkgckkagkbpncoieiknahmngdg: {
		name: 'ASIFY',
		file: 'ma_injtd.js'
	},
	bindfabgapagoeaolcbpocelliddgbca: {
		name: 'ScreenApp',
		file: 'screenrecorder.html'
	},
	bmbdcffdhebhecemcchbkfnjlmdiiepe: {
		name: 'Tooltip Kor<->Eng Dictionary',
		file: 't.css'
	},
	bmdblncegkenkacieihfhpjfppoconhi: {
		name: 'Ember Inspector',
		file: 'scripts/in-page-script.js'
	},
	bmdpeakaalmaaflnkckhjcojpemlkjig: {
		name: 'Kixie PowerCall',
		file: 'lib/processor.js'
	},
	bmolaacbagnmpdfhgaomcfhgofgnfgif: {
		name: 'GAT Shield Personal',
		file: 'icon-128.png'
	},
	bnbmhdpijoplhmffgicopkjjhdjpoaii: {
		name: 'SkipIt Adblocker for Youtube',
		file: 'script.js'
	},
	bngfikljchleddkelnfgohdfcobkggin: {
		name: 'Stickers Packer',
		file: 'options.html'
	},
	cadokfdhfohnjpdnlnddeickjmgkoccn: {
		name: 'Vatos DLP Endpoint',
		file: 'contentInner.js'
	},
	cahhjpmdnfhfkgldefihhcgkaalllbld: {
		name: 'Fast Delete Messages',
		file: 'popup.js'
	},
	cakejefemdjbmhdjkjhibjhmhgjefidm: {
		name: 'FatCoupon',
		file: 'content/content.js'
	},
	cbemppalkfdmphifdpmfiaacghfedklf: {
		name: 'Savings Genie',
		file: 'css/slick.css'
	},
	ccdcekhamjgodmpfeahkdmjaacjimaik: {
		name: 'SearchBlox',
		file: 'start.js'
	},
	cgajiilhmpfemmdihjnodpibaffakjhj: {
		name: 'Slid',
		file: 'main.css'
	},
	cggpkbnlnicoanmphgkkcmidbpdacepn: {
		name: 'SirLinksaLot',
		file: 'src/browser_action/thanks.html'
	},
	cikpkfgjohfbacpbglmbpefgfdegoolg: {
		name: 'Ivanti Secure Access',
		file: 'extnInterfaceCode.js'
	},
	cjmkndjhnagcfbpiemnkdpomccnjblmj: {
		name: 'Finnie',
		file: 'sidebar.html'
	},
	cmkpnegkacdeagdmnbbhjbgdpndmlkgj: {
		name: 'Breez ClickOnce 4C',
		file: 'modalHelper.js'
	},
	cndglokmgjecikflojjieeeajbljgfae: {
		name: 'Axhub',
		file: 'bridge.html'
	},
	cnmamaachppnkjgnildpdmkaakejnhae: {
		name: 'Auro Wallet',
		file: 'webhook.js'
	},
	comhbfmapdepfmmiagneigokjpbohooj: {
		name: 'TNDR Likes Unblur',
		file: 'icons/icon16.png'
	},
	dadggmdmhmfkpglkfpkjdmlendbkehoh: {
		name: 'OpenVideo',
		file: 'pages/welcome/index.html'
	},
	daejfbkjipkgidckemjjafiomfeabemo: {
		name: 'ObservePoint Debugger',
		file: 'scripts/content/pageScript.js'
	},
	dbgmgldcfjjgkekaknpcfkagekmjejpg: {
		name: 'Moneyplace.io',
		file: 'app.css'
	},
	dbiiidihfliagfecijmchjmgdfgjcjhf: {
		name: 'Online Weather Forecast',
		file: 'manifest.json'
	},
	dbmjjcmdhfjbgkgigdndfnfddminlpgb: {
		name: 'Email Finder',
		file: 'css/help.css'
	},
	dbpjfmehfpcgmlpfnfilcnhbckmecmca: {
		name: 'Simkl TV Tracker',
		file: 'ico/ico_128.png'
	},
	dcbgifpfidkhblnocnmkgjglblfmefna: {
		name: 'Pin Toolbox',
		file: 'assets/icon.png'
	},
	dcchknlbddobifongmdiomhboikhebmk: {
		name: 'Transit Schedules',
		file: 'manifest.json'
	},
	dcfjmednflkgpadfgkdhphggnmmmodnb: {
		name: 'FLG',
		file: 'images/bgauth.jpg'
	},
	dcoegfodcnjofhjfbhegcgjgapeichlf: {
		name: 'Export History/Bookmarks to JSON/CSV*/XLS*',
		file: 'popup.js'
	},
	dddonmdoiepbnlieemndhohfdhjplcce: {
		name: 'eq',
		file: 'main.js'
	},
	ddehdnnhjimbggeeenghijehnpakijod: {
		name: 'Rescroller',
		file: 'images/defaults/up.png'
	},
	ddkogamcapjjcjpeapeagfklmaodgagk: {
		name: 'TVDownloader',
		file: 'content.css'
	},
	deafalnegnfhjhejolidiobnapigcfpd: {
		name: 'YT Watch Later Assist',
		file: 'image/yt_watch_later_assit_32.png'
	},
	dehgjeidddkjakjgnmpccdkkjdchiifh: {
		name: 'ARO Lite',
		file: 'tabs/offscreen.html'
	},
	denbgaamihkadbghdceggmchnflmhpmk: {
		name: 'Spector.js',
		file: 'popup.js'
	},
	denohmphfiepkgihlobkpmkbdhgmjigf: {
		name: 'HEIC to JPG',
		file: 'assets/ar.js'
	},
	dffaiikpbncahnghlfnkhagffaemhgfo: {
		name: 'Multi Find',
		file: 'popup.js'
	},
	dkkmpkpjimkollpfgbbglcikcmgmdlhn: {
		name: 'AuthoredUp',
		file: 'build.json'
	},
	dnnmgcbgmfoeifpcmlligbagoiijmepj: {
		name: 'Mitel Connect',
		file: 'images/icons/icon12.png'
	},
	doeokejknjdlpgkkmlbcahojmnpdlebm: {
		name: 'Relume',
		file: 'logo.png'
	},
	dojncllhekcfenhdnddlihekcodcming: {
		name: 'Resoomer',
		file: 'img/16.png'
	},
	eaoehmpaiecpkjibbjjgmmpkeibcgomb: {
		name: 'Video Downloader Pro',
		file: 'js/core.js'
	},
	eemjhliengnnmjmbdjagekdddmkhanna: {
		name: 'ima知识库',
		file: 'img/ima.png'
	},
	egamhjcccjiflajhhinondgonlldjgba: {
		name: 'WooCommerce AliExpress Dropshipping',
		file: 'assets/js/jquery.js'
	},
	ejcibmoopiblhpjkjfpdopfdnlaoolfc: {
		name: 'Similarweb Sales',
		file: 'icons/drag.svg'
	},
	eoicaakpmliddjnnkninphlbpjibnfmh: {
		name: 'Cute Avatar',
		file: 'assets/editor.css'
	},
	eokbbaidfgdndnljmffldfgjklpjkdoi: {
		name: 'Fluent',
		file: 'inpage.js'
	},
	fagmaopcbeobbfhkeodicjekiniefdlo: {
		name: 'Copy Text Easily',
		file: 'style.css'
	},
	fbbjijdngocdplimineplmdllhjkaece: {
		name: 'ChatGPT for Chrome',
		file: 'rules.json'
	},
	fbjmlmabammiejnfkmgjhdcnjdahblaj: {
		name: 'Pronounce',
		file: 'content.js'
	},
	fbjnnjochaopepfjpngghafgnafebkjh: {
		name: 'ghostwrite',
		file: 'dist/gmailJS.bundle.js'
	},
	fdbbkmpdjmpnebmdgbhcodhlafiicnkd: {
		name: 'TextOptimizer',
		file: 'i/icon.png'
	},
	feaonnceknijmobalipbmocbcfoilelh: {
		name: 'Online Login',
		file: 'manifest.json'
	},
	femnahohginddofgekknfmaklcbpinkn: {
		name: 'one sec',
		file: 'images/logo.png'
	},
	ffijoclmniipjbhecddgkfpdafpbdnen: {
		name: 'TMetric',
		file: 'popup/popup.html'
	},
	ffppmilmeaekegkpckebkeahjgmhggpj: {
		name: 'Complexity',
		file: 'public/img/logo-16.png'
	},
	fghhpjoffbgecjikiipbkpdakfmkbmig: {
		name: 'IDRISS',
		file: 'webpage-script.js'
	},
	fglgjmlbihnfobipoljfdgfojbehcaja: {
		name: 'Video Downloader',
		file: 'src/js/instaStoryDownloader.js'
	},
	fglmkdhomaklnckgbjfnfmbfmlkjippg: {
		name: 'Tracking Button',
		file: 'options.html'
	},
	fhjanlpjlfhhbhbnjohflphmfccbhmoi: {
		name: 'Elfster\'s Wish It!',
		file: 'index.html'
	},
	fidcileobejjkcaoalcnedmgmnegmoic: {
		name: 'History & Cache Cleaner',
		file: 'img/info.svg'
	},
	fjkpgkefceopkogemcjcnncdhbgldolm: {
		name: 'Universal Translation Assistant',
		file: 'assets/main.js'
	},
	fkjlcepnfidnfbafmacapdoncjdemlpe: {
		name: 'QR Code Scanner Online',
		file: 'tabs.html'
	},
	flejfacjooompmliegamfbpjjdlhokhj: {
		name: 'Join',
		file: 'icons/medium.png'
	},
	fobklglmhojpeijoioelpdaicagiepbf: {
		name: 'LINE購物省錢助理',
		file: 'icon-16.png'
	},
	fpelahbljekknahkcaegamhcndkfpfnc: {
		name: 'Suricata',
		file: 'iFrame.js'
	},
	fpkhgmpbidmiogeglndfbkegfdlnajnf: {
		name: 'Cosmostation Wallet',
		file: 'js/inject.js'
	},
	gagidkjllbdgggpboolfmmdpeagghjlm: {
		name: 'Arcade',
		file: 'frame-wrapper.html'
	},
	gaieenaffioioljpcocdkpphlifbhaig: {
		name: 'AskYourPDF',
		file: 'login.html'
	},
	gclgnfnkkgjammaplobpkodeojpgfdig: {
		name: 'THunt',
		file: 'icon/16.png'
	},
	gdcelkbnekfaikpbcgmaijnmclkceoeh: {
		name: 'ProTab',
		file: 'jquery.js'
	},
	gdnpkbipbholkoaggmlblpbmgemddbgb: {
		name: 'Accessible Web Helper',
		file: 'css/awebChromeHelper.min.css'
	},
	gefiflkplklbfkcjjcbobokclopbigfg: {
		name: 'AZInsight',
		file: 'js/content-script.js'
	},
	gennnndepkflndgcjajggdhclmghkpdl: {
		name: 'Web Paint',
		file: 'lib/jquery.min.js'
	},
	ghlmndacnhlaekppcllcpcjjjomjkjpg: {
		name: 'Wizz Wallet',
		file: 'pageProvider.js'
	},
	gidnphnamcemailggkemcgclnjeeokaa: {
		name: 'Tealium Tools',
		file: 'chunks/ui.js'
	},
	gipnlpdeieaidmmeaichnddnmjmcakoe: {
		name: 'Selection Search',
		file: 'img/copy.svg'
	},
	gjaklccphhffeddbigoeknakacjacein: {
		name: 'The Best Translator for WhatsApp Web',
		file: 'assets/index.1c785d90.js'
	},
	gkcdaooannhlioejchebhpkllbcackig: {
		name: 'PromptStorm',
		file: 'src/storage.ts'
	},
	gkohiokkalnklkeagfgamdnnhajjnfaf: {
		name: 'Web2Speech',
		file: 'index.html'
	},
	gmbicfpadlmgkfhfepknbmemfhahelll: {
		name: 'Backup WhatsApp Chats',
		file: 'js/lodash.js'
	},
	gnjggbjjfgjdcnognnfjgcgjbpjdephi: {
		name: 'View Manuals',
		file: 'manifest.json'
	},
	gnnfgamcecifdmmdpbppjhanfllffmdn: {
		name: 'Video download assistant',
		file: 'js/video_bilibili_accessible.js'
	},
	habajgjiodkagmalhjchegenflkoogej: {
		name: '135小助手V2',
		file: 'dist/contentScripts/135editor-webext.css'
	},
	hanjbnalcdpadfkclpliolalhgeonmfn: {
		name: 'NewTranx Subtitler',
		file: 'setting.html'
	},
	hbikchkhjggjedcpikghdfecmmcaalfm: {
		name: 'PingOne',
		file: 'js/init.js'
	},
	hclhpnhohpmlbadmeieecaandnglfodm: {
		name: 'RiteTag',
		file: 'images/red.png'
	},
	hdkbnhcgfcokjhlfiicbphafdnipnhjf: {
		name: 'New Tab Todo List',
		file: 'popup.js'
	},
	hgbbfkafecdbocpcdkoahfkbkoodcaon: {
		name: 'Moonsift',
		file: 'ui/ms_go.css'
	},
	hgcchfenipapcljbhflknmmfbaaibekj: {
		name: 'All Best Recipes',
		file: 'manifest.json'
	},
	hhclmnigoigikdgiflfihpkglefbaaoa: {
		name: 'ChatGPT Assistant Plus',
		file: 'images/48.png'
	},
	hhfnghjdeddcfegfekjeihfmbjenlomm: {
		name: 'Web Tracker',
		file: 'assets/pomodoro-sounds/1.mp3'
	},
	hhhlmhebgldhhkmlcobchafaefeeigji: {
		name: 'Auto Page Refresh',
		file: 'js/bg.js'
	},
	hicfolagolebmjahkldfohbmphcoddoh: {
		name: 'Reactions for Google Meet',
		file: 'img/16.png'
	},
	hijfnlgdhfpmnckieikhinolopcolofe: {
		name: 'GMBspy',
		file: 'js/script.js'
	},
	hjandoglibodddfdpbpcfkcldghbalhl: {
		name: '로펙 시뮬레이터 점수 분석기',
		file: 'src/ui/ui.js'
	},
	hjdmjldimjfmcaemghmjibkpdgjihplp: {
		name: 'Lanceur d\'applications ACD',
		file: 'bienvenue.html'
	},
	hjfiefolgakpndodphcgjllcojieoaak: {
		name: 'Maps & Driving Directions',
		file: 'manifest.json'
	},
	hkddcnbhifppgmfgflgaelippbigjpjo: {
		name: 'Vue.js devtools (v5)',
		file: 'devtools.html'
	},
	hkledmpjpaehamkiehglnbelcpdflcab: {
		name: 'asbplayer',
		file: 'anki-ui.js'
	},
	hklhheigdmpoolooomdihmhlpjjdbklf: {
		name: 'KasWare',
		file: 'pageProvider.js'
	},
	hnchgcelpejnpglbnaieofanfoikiepb: {
		name: 'Rakuten',
		file: 'icon-32.png'
	},
	hnlpidgbnmikgkmccephgaljihheckii: {
		name: 'AMBOSS',
		file: 'data/en/terms.json'
	},
	hoeiookpkijlnjdafhaclpdbfflelmci: {
		name: 'QR Code Generator',
		file: 'static/bg.js'
	},
	hoinmffpdlgmkhckafddjleaelkdnhhk: {
		name: 'Pwd Manager',
		file: 'images.css'
	},
	ibdcbopijgjjkihompigdaagfmdfagik: {
		name: 'Ouriginal for Google Classroom',
		file: 'panel.html'
	},
	iebboopaeangfpceklajfohhbpkkfiaa: {
		name: 'Deluminate',
		file: 'deluminate.css'
	},
	ieidddkeimflpkghaodhddcmlclcliaa: {
		name: 'ParagraphAI',
		file: 'icon.png'
	},
	ifaicffibnedodkbekogndkdfeojcofb: {
		name: 'Pets Chrome',
		file: 'assets/cats/glay/glay_512x512_8x8.png'
	},
	ifjafammaookpiajfbedmacfldaiamgg: {
		name: 'BeeLine Reader',
		file: 'templates/survey.html'
	},
	ifnkdbpmgkdbfklnbfidaackdenlmhgh: {
		name: 'PopUpOFF',
		file: 'images/stop_ads.png'
	},
	ihbdojmggkmjbhfflnchljfkgdhokffj: {
		name: 'Reedy',
		file: 'f/od.woff2'
	},
	iheanendiljegnemgmaklemiaekghofn: {
		name: 'Nuance.EHRi',
		file: 'jslib/utils.js'
	},
	iidjkmdceolghepehaaddojmnjnkkija: {
		name: 'IOTA Wallet',
		file: 'dapp-interface.js'
	},
	iipjdmnoigaobkamfhnojmglcdbnfaaf: {
		name: 'Clutter Free',
		file: 'img/cf.svg'
	},
	ikbdppgmbnfncggibmidpeoklmbbmpbb: {
		name: 'Samsung Pass',
		file: 'images/MKTlogo.svg'
	},
	ilceenfjabjiciolabkmcgommaibcnnb: {
		name: 'Veriffy Signing',
		file: 'ego-page.js'
	},
	imjkkofdknonmlapjelmafbikikbegbi: {
		name: 'Designer Daily Report',
		file: 'index.html'
	},
	inahogkhlkbkjkkaleonemeijihmfagi: {
		name: 'SPPageDiag',
		file: 'modern-injected-script.js'
	},
	inblpolgchbcgmocpnalobjmmaldkjap: {
		name: 'AutoDS Dropshipping',
		file: 'tailwind.css'
	},
	inlnjgmlcpjmbedjcmnfpolkggnamenp: {
		name: 'TRAVIC-Sign',
		file: 'gui.html'
	},
	jahmceilaidjdppihegmgblfijcadagd: {
		name: 'Slice New Tab',
		file: 'fonts/Inter-VariableFont_opsz,wght.ttf'
	},
	jdkmmjkcmjjhfegmbmaijcnlgkfnfcpm: {
		name: 'Block Websites',
		file: 'blocked.html'
	},
	jfbbgijjljfbolelfkopkhbfjajjampm: {
		name: 'Screen Ruler',
		file: 'scripts/patterns/pattern.svg'
	},
	jfoanacamkbfibjbidbmeobmnndfgpca: {
		name: 'DontPayFull',
		file: 'assets/logo/16x16.png'
	},
	jgdddeonphekfhicmnpffkfpboalmcjd: {
		name: 'Easy PDF Viewer',
		file: 'manifest.json'
	},
	jgglfdpjpddcdaeapbcfgckfheabbdpi: {
		name: 'AAMC MCAT Interface',
		file: 'fonts/index.css'
	},
	jgnfghanfbjmimbdmnjfofnbcgpkbegj: {
		name: 'KeePassHelper Password Manager',
		file: 'data/cmd/index.html'
	},
	jiepnaheligkibgcjgjepjfppgbcghmp: {
		name: 'Doge Labs Wallet',
		file: 'pageProvider.js'
	},
	jihicnfcjfaflbejkohdeodejenbldmk: {
		name: 'Chrome Tools',
		file: 'manifest.json'
	},
	jkfkhkobbahllilejfidknldjhgelcog: {
		name: 'Power Tools for ChatGPT',
		file: 'images/48.png'
	},
	jofhoojcehdmaiibilpcoofpdbbddkkl: {
		name: 'Marker.io',
		file: 'vendor/marker-widget/standalone.js'
	},
	kaibkgfibgoffomjemobnlojipabbbjd: {
		name: 'video downloader',
		file: 'static/js/ytScript.js'
	},
	kbdlpfmnciffgllhfijijnakeipkngbe: {
		name: 'Safum free VPN',
		file: 'web_accessible_resources/status_on.png'
	},
	kbobdmmjbaljcombpliahadgoafgohcd: {
		name: 'Earth 3D',
		file: 'manifest.json'
	},
	kdbgbpcphmnekmkhbcfmbdahceffhddn: {
		name: 'Netsweeper Client Filter',
		file: 'error.html'
	},
	kflmnoghmmldhkplfhanlkobnjjgikoa: {
		name: '8x8 Web Dialer',
		file: 'assets/svgs/phone.svg'
	},
	kfmgapneffipolpljmofbmonafjlodim: {
		name: 'Yodeck Web Player',
		file: 'inject.js'
	},
	kfmlopbepahlcjbkfnnklglgibbopkbk: {
		name: 'C2 Password',
		file: 'icon.html'
	},
	kgfeiebnfmmfpomhochmlfmdmjmfedfj: {
		name: '2048 Classic Game',
		file: 'icons/icon-16.png'
	},
	khmkmdkfllphcbkbkgflononijbkdgff: {
		name: 'Price Tracker 2.0',
		file: 'images/eyen.png'
	},
	kiiddchjafkgbaflgnajlogmmmiclfhm: {
		name: 'Шоппер',
		file: 'images/tg.ico'
	},
	kjnmdomccekpkjomjhapnilfmeiglkid: {
		name: 'Web for Telegram',
		file: 'img/icon.ico'
	},
	kkeakohpadmbldjaiggikmnldlfkdfog: {
		name: 'FastStream Video Player',
		file: 'player/index.html'
	},
	kkodiihpgodmdankclfibbiphjkfdenh: {
		name: 'ParrotTalks',
		file: 'options.html'
	},
	kldhhobmmejaeaiilomaibhjlcfpceac: {
		name: 'Image Search Assistant',
		file: 'icon.png'
	},
	klebcgndepdaddnadnmphbmjgfkdllke: {
		name: 'SurfEarner',
		file: 'img/logo.svg'
	},
	klggbkjfmbonefdcfkiidhcmfjdfnepa: {
		name: 'Quicker Connector',
		file: 'content/styles.css'
	},
	kodipildlgjdkoeokgibdlighekmebcg: {
		name: 'Komodo',
		file: 'static/images/logo.svg'
	},
	kpdkbemdpepjjppbfgeapjienologapa: {
		name: 'Search All',
		file: 'icon32.png'
	},
	lbhiobcniaahkfhclccbcmhihddhddch: {
		name: 'Smart Terms for Confluence and Jira',
		file: 'resources/css/jira.css'
	},
	lcdlignfoefnkcfejmlnegoobondbfjb: {
		name: 'YouDisLike',
		file: 'sdk_translations.json'
	},
	lcjfjohndknooijjhenkglbljldglnbd: {
		name: 'Alation',
		file: 'index.html'
	},
	ldfdohgfoolmacfbdekmbpoofhahcfgg: {
		name: 'Savings add-on',
		file: 'icon-32.png'
	},
	leidjgpcaiceoeebkdjfcaeboidcjiea: {
		name: 'Youtube Summary With ChatGPT',
		file: 'logo.png'
	},
	lepcfgkehgeiblekejomdmdklmjdmflp: {
		name: 'Manga Translator',
		file: 'fonts/Kalam.ttf'
	},
	lfijgegefgcgbfcgjgnhnkclenhfijhk: {
		name: 'Track24.ru',
		file: 'img/gear.svg'
	},
	lfngfmpnafmoeigbnpdfgfijmkdndmik: {
		name: 'refoorest',
		file: 'imgs/icon35.png'
	},
	lhdjgfcebdlmhphhbddcdpaegbnpbmke: {
		name: 'Places Near Me',
		file: 'manifest.json'
	},
	lhffkcbejhignakjodkneobebmkljehj: {
		name: 'ISAM ESSO',
		file: 'bg.js'
	},
	lhgadannddhdpkfhfjjgcpdjhpmjhkfm: {
		name: 'Monosnap',
		file: 'okta.html'
	},
	lhipdkibljepmfojllcfflfflhflcbgi: {
		name: 'Moonlight',
		file: 'web/pdf.html'
	},
	lidlocdecbjopdnblcplkgcojdnngdif: {
		name: 'Remove background',
		file: 'assets/rmbg-data/resources.json'
	},
	liobflkelkokkacdemhmgkbpefgaekkm: {
		name: 'AMZScout Stock Stats',
		file: 'icons.css'
	},
	ljccnonneanghhogfgkjookoghnbhiak: {
		name: 'Shein选品助手',
		file: 'inject.js'
	},
	lkihjlcipnbgeokmfnpogjfflofbfhga: {
		name: 'Are.na',
		file: 'index.html'
	},
	llmbdmomjmaeegghbkipaolieilmegld: {
		name: 'Flappy Bird Offline',
		file: 'popup.js'
	},
	lmecinlocgbbcdgbhkidmeijhdhlngjp: {
		name: 'Dialpad Chrome CTI',
		file: 'images/info.svg'
	},
	lmkncnlpeipongihbffpljgehamdebgi: {
		name: 'DPal',
		file: 'inject.js'
	},
	lndponbebpocehnoblfgdfeiegeaokcf: {
		name: 'Horizon Geolocation Redirection',
		file: 'injectGeoScript.js'
	},
	lniombipmmhhighllijmcdncnefpjloi: {
		name: 'AppBlock',
		file: 'block.html'
	},
	lpopeocbeepakdnipejhlpcmifheolpl: {
		name: 'JSON Beautifier and Editor',
		file: 'data/page/index.html'
	},
	mcgnagemenncafhpabimmooimpngdcpn: {
		name: 'Qwer PDF',
		file: 'index.html'
	},
	mdfjplgeknamfodpoghbmhhlcjoacnbp: {
		name: 'Crunchbase',
		file: 'iframe-wrapper/iframe-wrapper.js'
	},
	mfkodnlefnacmembgmkaepdghdhfgolo: {
		name: 'Genio Notes',
		file: 'src/requestPermissions/requestPermissions.ts'
	},
	mgijmfgdpljgnhcmokgeokdibogckgoj: {
		name: 'Snapchat Camera',
		file: 'inject.js'
	},
	mhfbofiokmppgdliakminbgdgcmbhbac: {
		name: 'Web Clipper',
		file: 'tool.js'
	},
	migiikaijhclkmlpnnfficpopgmcpgia: {
		name: 'Free Vimeo Downloader',
		file: 'icons/logo.png'
	},
	mjackmipnhegkhekpebhmnkhkaojdldn: {
		name: 'BK Reviews',
		file: 'assets/ui/bell.svg'
	},
	mjijaapcbpbcppapekipkdhipfcdpidb: {
		name: 'Copy and Paste more',
		file: 'img/icon16.png'
	},
	mkeimkkbcndbdlfkbfhhlfgkilcfniic: {
		name: 'Shade Dark Mode',
		file: 'js/proxy.js'
	},
	mkjplaglonhndehapbmgooicfneelkic: {
		name: 'View PDF\'s',
		file: 'manifest.json'
	},
	mndkmbnkepbhdlkhlofdfcmgflbjggnl: {
		name: 'Easy Web Data Scraper',
		file: 'css/main.css'
	},
	moombeodfomdpjnpocobemoiaemednkg: {
		name: '草料二维码',
		file: 'fonts/element-icons.ttf'
	},
	mpijoellhiljjmeeloljbehhhjkpijpb: {
		name: 'Tipli',
		file: 'serp.js'
	},
	nbcjlcokgigjfhejofmbaomcimggiafn: {
		name: 'movie-web remastered',
		file: 'assets/active.png'
	},
	ndgklmlnheedegipcohgcbjhhgddendc: {
		name: 'Linguix',
		file: 'ext-content/assets/images/flags/de.png'
	},
	ndkkpmmdfmdhnkeedoidagdbpcapgofa: {
		name: 'AI Images generator',
		file: 'math.js'
	},
	neokioeagiejddfoakliiiphcenemobk: {
		name: 'AliExpress Product Importer',
		file: 'assets/svg/chrome.svg'
	},
	nfhmofnohiiegfbnialkdlgohnjmpihg: {
		name: 'View Recipes',
		file: 'manifest.json'
	},
	ngkjielajlecigijlijjkhkhlhmmcgfh: {
		name: 'Troywell VPN Pro',
		file: 'popup.html'
	},
	ngmglcbdhomodppckpgpgpnhjcgkhhid: {
		name: 'Free Manuals Online',
		file: 'favicon.ico'
	},
	nlhpidbjmmffhoogcennoiopekbiglbp: {
		name: 'AI Assistant',
		file: 'assets/js/index.59b2ae62.js'
	},
	nlijpgankndpklfipncpkljliinbcbca: {
		name: 'Ryviu App',
		file: 'images/ryviu.png'
	},
	nmijijenojhiaohkfedfgchgbmjnfcpp: {
		name: 'Convert HEIC to JPG',
		file: 'assets/js/index.js'
	},
	nmjefghbgfcpoobigfbalocpncklkjhk: {
		name: 'ThinForms Enterprise',
		file: 'oforms_scanner_inj.js'
	},
	noagjioaihamoljcbelhdlldnmlgnkon: {
		name: 'Definer',
		file: 'inject/bubble.css'
	},
	noofnfniimcnghnkonpdlhlaeaocidbi: {
		name: 'DeepTranslate',
		file: 'icons/1.png'
	},
	nphnjjbohmfkjbphbddjmnddjfiflkme: {
		name: 'JourneyDraw',
		file: 'img/logo.png'
	},
	npimbikeicamplnnndojgkmfdejbpbin: {
		name: 'Onestart',
		file: 'assets/cart-mtM4UKjK.png'
	},
	oaaadlnghojigbibgkbalkkmbfkakkbe: {
		name: 'REminder',
		file: 'css/notification.css'
	},
	oafoojegpciffpajphojgkkdgnngigfb: {
		name: 'VPN Satoshi',
		file: 'src/pages/uninstall.html'
	},
	obkkocadgppbbgkhcgojpjhpphhcgjfa: {
		name: 'Userlytics WebRecorder',
		file: 'dom.js'
	},
	ocgmjfcfjilnmobeocoklcbpcanilpjd: {
		name: 'RightTool for QuickBooks Online',
		file: 'html/test.js'
	},
	ofgabojnfopmlfkfdclajlkgfmomijoc: {
		name: 'Lobby King',
		file: 'assets/html/popup.html'
	},
	ogbpccedpmocjdjgonecbejmgfhffngo: {
		name: 'Taobao search by image',
		file: 'assets/js/popup.js'
	},
	oghkljobbhapacbahlneolfclkniiami: {
		name: 'ProductivityTab',
		file: 'index.html'
	},
	oinkhgpjmeccknjbbccabjfonamfmcbn: {
		name: 'Cursorland',
		file: 'resources/js/popup.js'
	},
	ojhlgnehlajjgpneocngnphjellkjgch: {
		name: 'Zoho CRM for Gmail',
		file: 'css/auth.css'
	},
	ojpcfkpecldaeaafcmclkmgabiohlbnl: {
		name: 'Xerox Device Connector',
		file: 'manifest.json'
	},
	omfegkgipldobddijcpagdabgifghdgb: {
		name: 'ポップアップ辞書',
		file: 'manifest.json'
	},
	pabjfbciaedomjjfelfafejkppknjleh: {
		name: 'CapMonster Cloud',
		file: 'pageScript.js'
	},
	pabkjoplheapcclldpknfpcepheldbga: {
		name: 'Google Meet Auto Admit',
		file: 'images/8.gif'
	},
	paccmmciglpogbjdjkcnndndamcannih: {
		name: 'Stream Live News',
		file: 'manifest.json'
	},
	pagahecnnmjjlpoakhagcpnalaodfbkk: {
		name: 'Rakuten Drive',
		file: 'images/sendy_gray.svg'
	},
	pcgjkiiepdbfbhcddncidopmihdekemj: {
		name: 'Web Paint Online',
		file: 'images/pen.png'
	},
	pdebhfmknndmlfoklnkmadfbjfadjdme: {
		name: 'color-changer-youtube',
		file: 'popup.js'
	},
	pggamokfileohlopdonjmelbbghhnlah: {
		name: 'Quick View',
		file: 'bundle.css'
	},
	phealodnoblgkcfbhpdebpihdbfmggpi: {
		name: 'Snovio tech lookup',
		file: 'js/js.js'
	},
	pkhpcfoaocmmpmphhenoblggeinedlah: {
		name: 'Dupe.com',
		file: 'assets/icon-128.png'
	},
	pmekfefnodgilnnjcfkkdjlebokonhpm: {
		name: 'Trend Micro Ad Blocker',
		file: 'content.js'
	},
	ponokiofkijoolhebggofhhibnafebna: {
		name: 'Felo Subtitles',
		file: 'img/no-capture.svg'
	},
	ppbfhhgcdehhbjigifndnfmcihegokbb: {
		name: 'Bubbles',
		file: 'assets/logo.svg'
	},
	aaeapgfkbbbdpbfjmpcblemfajmkiddh: {
		name: 'tabtiles',
		file: 'tabtiles.css'
	},
	aaiolimgbncdaldgbbjkidiijidchhjo: {
		name: 'Shopper.com',
		file: 'js/jquery.js'
	},
	aamepfadihoeifgmkoipamkenlfpjgcm: {
		name: 'Stick Ninja Game',
		file: 'icons/icon-16.png'
	},
	aamnmboocelpaiagegjicbefiinkcoal: {
		name: 'HDrezka Grabber',
		file: 'src/js/injection_scripts/Blob.js'
	},
	abfbooehhdjcgmbmcpkcebcmpfnlingo: {
		name: 'Glif',
		file: 'style.css'
	},
	abkahkcbhngaebpcgfmhkoioedceoigp: {
		name: 'Casper Wallet',
		file: 'sdk.bundle.js'
	},
	acejpfahoednmngaoeimoekcepchkmlp: {
		name: 'Push To Talk for Google Meet',
		file: 'icons/grid.png'
	},
	aclbkdnphcdelflmgjgmgbahlfngidma: {
		name: 'Dropbox Dash',
		file: 'dev.html'
	},
	acnnhjllgegbndgknlliobjlekgilbdf: {
		name: 'codebox',
		file: 'gzh.b08f4d2f.jpg'
	},
	adjmjjpnbddnlcmcjmlipkbldndkhhaj: {
		name: 'stopRU',
		file: 'popup.html'
	},
	aealdhlkhncgkajfddopemnjlmggkigm: {
		name: 'Boards',
		file: 'lib.js'
	},
	aecnmadngpjbokeakinhbgfanlnjdnom: {
		name: 'Full Page Screenshot',
		file: 'assets/static/32.png'
	},
	aejdicmbgglbjfepfbiofnmibcgkkjej: {
		name: 'Flappy Bird Original',
		file: 'icons/icon-16.png'
	},
	afdfpkhbdpioonfeknablodaejkklbdn: {
		name: 'Sidebarr',
		file: 'logo.svg'
	},
	agccifdcgciljchfofenkoboeehkmjkl: {
		name: 'PriceHistory',
		file: 'assets/js/url.js'
	},
	ajaboiophmaflodkmglfpngnmiijkkle: {
		name: 'ZetaMarker',
		file: 'icons/md.svg'
	},
	ajkigpnleboodhdlminnlmldegieilfc: {
		name: 'Kalp Wallet',
		file: 'content.css'
	},
	akcljdkpppokdcbopdcbkokilfdddhoi: {
		name: 'Rippling',
		file: 'oauth.html'
	},
	akeepikolhaikilagiekmegfhefcbohd: {
		name: 'folkX',
		file: 'src/iframe.html'
	},
	akjlnngigpbekgfjcbpohdfnfjfgflpb: {
		name: 'SmartSpending',
		file: 'assets/snoozed.svg'
	},
	alddllhhoalhongghdfhelgaabcnbfej: {
		name: '웨않되',
		file: 'popup.css'
	},
	alnpfmeemhhcfephffidoflphgnneeld: {
		name: 'Confetti',
		file: 'images/icon-38.png'
	},
	amdfepljcddfmbgdnkkkfgkflgakbgjm: {
		name: 'Ad Library',
		file: 'images/#.svg'
	},
	amlpmdfkobcgnhkmajhbkphlhjodcadh: {
		name: 'MyEmailViewer',
		file: 'directemail.html'
	},
	andpjllgocabfacjlelkfpdemfklpfpo: {
		name: 'Tablerone',
		file: 'icons/favicon.svg'
	},
	aodfoiacnmepndhojccepdcpmehjbham: {
		name: 'Session Alive',
		file: 'beep.wav'
	},
	aogkkekoinpipjlolpcicigndjlcpdcn: {
		name: 'Dropified Dropshipping',
		file: 'audit.html'
	},
	aoinfihhckpkkcpholfhmkeplbhddipe: {
		name: 'CSS and XPath checker',
		file: 'popup/popup.js'
	},
	apaogbppkcinodjdpgdelancfdfmlhcn: {
		name: 'Batch Upload Tool',
		file: 'platform/intercept/index.js'
	},
	bafhgiajedliopeidkhgidpbjejkfnlm: {
		name: 'Itzuli+',
		file: 'toolbar.js'
	},
	bbomjaikkcabgmfaomdichgcodnaeecf: {
		name: 'Tiny Suspender',
		file: 'popup.html'
	},
	bbpokcagpggnekcmamgdieebhpkjmljm: {
		name: 'Hoverify',
		file: 'styles/fonts.css'
	},
	bdacnlgpemjkfhlphdhhpamgopagnlie: {
		name: 'Locker',
		file: 'images/x.svg'
	},
	bejghfnahjjdffjmbfooochffgcgofok: {
		name: 'Clique',
		file: 'js/index.js'
	},
	bfeplaecgkoeckiidkgkmlllfbaeplgm: {
		name: 'Radix Wallet Connector',
		file: 'assets/index.7ac13232.js'
	},
	bffkjdkbmldjgfibfhggllfpldoepcld: {
		name: 'Direct Search Online',
		file: 'icons/128.png'
	},
	bggfcpfjbdkhfhfmkjpbhnkhnpjjeomc: {
		name: 'Material Icons for GitHub',
		file: 'h.svg'
	},
	biggdlcjhcjibifefpchffmfpmclmfmk: {
		name: 'Dino 3D',
		file: 'icons/icon-16.png'
	},
	bjcoimpfplliplknnmgbffboiihamekf: {
		name: 'Broken Link Checker',
		file: 'data/popup/index.html'
	},
	bjekehokhpkicboifnoocieebcdbdmne: {
		name: '네이버 가격추적기 및 이미지 검색',
		file: 'assets/js/popup.js'
	},
	bjjobdlpgglckcmhgmmecijpfobmcpap: {
		name: 'DeepSeek AI',
		file: 'style.css'
	},
	bkepnpnddicncpiffoefjlgjenfjpjib: {
		name: 'Lil Rooster',
		file: '1.js'
	},
	bmcnbhnpmbkcpkhnmknmnkgdeodfljnc: {
		name: 'LighterFuel for tinder',
		file: 'resources/clarity.js'
	},
	bnfhbhgdplalghadceaceocmildbfhmn: {
		name: 'Ship Xanh',
		file: 'src/zip.js'
	},
	caejdeplfmpbnhkppbbckfiipjefepci: {
		name: 'Menores Preços Dudu Rocha',
		file: 'index.css'
	},
	cbjclclekdbohblopgleehmcmjkgeehi: {
		name: 'adirah',
		file: 'icon.png'
	},
	cbnaambdpgibknnmdnjeangmaeicmjoj: {
		name: 'MT Auto Clicker',
		file: 'popup.html'
	},
	ccbkmkkmfkimpkjlmlakmefdjebadndd: {
		name: 'net-pocket-addon',
		file: 'assets/no_logo.svg'
	},
	cefhlgghdlbobdpihfdadojifnpghbji: {
		name: 'PowerNotes Research',
		file: 'sidebar.html'
	},
	cejckpjfigehbeecbbfhangbknpidcnh: {
		name: 'Change Timezone',
		file: 'data/inject-content.js'
	},
	cfmcghennfbpmhemnnfjhkdmnbidpanb: {
		name: 'source view',
		file: 'default.css'
	},
	cgjlgmcfhoicddhjikmjglhgibchboea: {
		name: 'BPuzzle Tetris Game',
		file: 'icons/icon-16.png'
	},
	chamcglaoafmjphcfppikphgianmmbjf: {
		name: 'You.com',
		file: 'index.html'
	},
	chcbikmmlhbbdkfiaaaljabpefdfajnb: {
		name: 'Process Feedback for Google Docs',
		file: 'script.js'
	},
	ckmpibbifmcamfmfelkencbbiilpcfjg: {
		name: 'ZeroBlur',
		file: 'static/logo/favicon.ico'
	},
	clepmakjkiihmfoepipckkafafdepjne: {
		name: 'Mobile View',
		file: 'dist/extension/mobileViewWebComponent.js'
	},
	cmfhopmhaagcfnjflfppceclmkenjkpc: {
		name: 'Meomni',
		file: 'icon_128.png'
	},
	cncdmciajmaojninbopinpijdodjgfpd: {
		name: 'Trendtrack',
		file: 'content-scripts/content.css'
	},
	comhknhgkhbecfolehchaemllofaeppb: {
		name: 'Dubb Video',
		file: 'assets/beep.wav'
	},
	cphhlgmgameodnhkjdmkpanlelnlohao: {
		name: 'NeoLine',
		file: 'dapi.js'
	},
	cpnjplgolcfhabpjcnfopcmhbbciglif: {
		name: 'Chat4Data',
		file: 'injected.js'
	},
	dajlhodahakobmgdiglkajjgbchiiccf: {
		name: 'Handy Screenshot',
		file: 'capture.js'
	},
	dbgnhckhnppddckangcjbkjnlddbjkna: {
		name: 'Fin Wallet For Sei',
		file: 'inpage.bb889182.js'
	},
	dcembjiicioienepbaldihjhmkedagee: {
		name: 'DataTool-Video Downloader',
		file: 'assets/js/ext.js'
	},
	dcjdhicepiklefpimapdkbaeoocniemc: {
		name: 'FontAra Font Changer',
		file: 'assets/icon.png'
	},
	dcmindjgpiimpmkgmabhkflfaiimioea: {
		name: 'IP Alert',
		file: 'images/tick.png'
	},
	ddmhlmdockeihjdpbkcnnfnlcgjhccgk: {
		name: 'Popup Blocker',
		file: 'ui/ui.js'
	},
	decehdgnikepnangkendclmiomkcnpjh: {
		name: 'timeOS',
		file: 'index.html'
	},
	deebiaolijlopiocielojiipnpnaldlk: {
		name: 'My Online Learning Downloader',
		file: 'wa.min.js'
	},
	dehnhmdfcnknoboopcbdckoepijmofem: {
		name: 'Cross-border Product Collection',
		file: 'platform/intercept/index.js'
	},
	dfdkfkighakfgihcffnpboebfifbeddl: {
		name: 'Easy How To',
		file: 'manifest.json'
	},
	dhpfcgilccfkodnhbllpiaabofjbjcbg: {
		name: 'Circle Reader',
		file: 'assets/128.png'
	},
	dijhcpbkalfgkcebgoncjmfpbamihgaf: {
		name: 'Discoverly',
		file: 'mixpanel.min.js'
	},
	djpeecijcbigpoijldkimmkilekocdao: {
		name: 'Scribens',
		file: 'js/main.js'
	},
	dkkdakdkffippajmebplgnpmijmnejlh: {
		name: 'CaptchaSonic',
		file: 'guide.html'
	},
	dlpimjmonhbmamocpboifndnnakgknbf: {
		name: 'Night Shift Mode',
		file: 'assets/popup.css'
	},
	dmgkiikdlhmpikkhpiplldicbnicmboc: {
		name: 'Spell checker and Grammar checker',
		file: 'js/main.js'
	},
	dmlmcpcjndojhbflolmdgfpojnjfdlbj: {
		name: 'Annotator',
		file: 'html/zcopy.html'
	},
	dngacpgmjhcjdeccndpdpnlckjihoflp: {
		name: 'Shop TODAY Savings',
		file: 'build/popup.js'
	},
	doiiaejbgndnnnomcdhefcbfnbbjfbib: {
		name: 'Paint',
		file: 'images/logo_not.png'
	},
	dojcmakgodofecjmdnncjkbhmddlmnpf: {
		name: 'CapCut screen recorder',
		file: 'iframe.html'
	},
	dopdchianoijndklgjkckfcpdoaabcab: {
		name: 'Picture-In-Picture',
		file: 'active-icons/active_16.png'
	},
	dphoaaiomekdhacmfoblfblmncpnbahm: {
		name: 'ChromeKeePass',
		file: 'images/key.png'
	},
	eabmbhjdihhkdkkmadkeoggelbafdcdd: {
		name: 'EGGHEADS',
		file: 'src/index.js.map'
	},
	eaoelafamejbnggahofapllmfhlhajdd: {
		name: '空降助手',
		file: 'popup.css'
	},
	ecjkcanpimnagobhegghdeeiagffoidk: {
		name: 'Virtual Keyboard',
		file: 'style.css'
	},
	edbchgkbejkdkdkpgenlaciegoidmjoh: {
		name: 'Fontiran',
		file: 'assets/scripts/jquery-3.5.1.min.js'
	},
	edkibgpollgbhnjalcdlpmbjmdgohjko: {
		name: 'HS Social',
		file: 'manifest.json'
	},
	edoacekkjanmingkbkgjndndibhkegad: {
		name: 'Obsidian Web',
		file: 'options.html'
	},
	edpcocadldfbbpllhfkfcebnpigleamn: {
		name: 'SocialiQ',
		file: 'popup.js'
	},
	eebchbokmimedlkmnaknibgmdjkgmoff: {
		name: 'Fatkun Image Editor',
		file: 'images/logo16.png'
	},
	eelacikjiplnmdingehjfdjcfegclmkg: {
		name: 'SpoilerProtection',
		file: 'assets/fonts/fontawesome-webfont.ttf'
	},
	efaadoiclcgkpnjfgbaiplhebcmbipnn: {
		name: 'AdLibNote',
		file: 'images/example.png'
	},
	efbfmikjamhlinlenkkcdkbmlmhiobka: {
		name: 'Speed Test',
		file: 'listener.js'
	},
	efbobpikdmjaaklfkdlgfopochnjadab: {
		name: 'Urban Safe Browsing',
		file: 'content/safecheck-notification/index.html'
	},
	egmhoeaacclmanaimofoooiamhpkimkk: {
		name: 'Scroll Capture',
		file: 'content.js'
	},
	egmlbimojingfmchokcniklnhnecdecf: {
		name: 'Unseen',
		file: 'assets/icon/64.png'
	},
	ehgcekpdldhgfjpionbkilpnaahjiejj: {
		name: 'NetSuite Advanced Field Help',
		file: 'functions.js'
	},
	ehoomjebcggkfbkeddldagdjgdpepamh: {
		name: 'SVG downloader',
		file: 'img/logo-16.png'
	},
	ekpgflponjmfenfbmpnnjngomooccbdk: {
		name: 'GoLink',
		file: 'assets/icons/16x16.png'
	},
	emghchaodgedjemnkicegacekihblemd: {
		name: 'Flashback Flash Player',
		file: 'js/libs/ruffle/ruffle.js'
	},
	empjidjbllcmlgaobahepkijkfmfkjdb: {
		name: 'cool-cursor',
		file: 'Icon-512.png'
	},
	eobbhoofkanlmddnplfhnmkfbnlhpbbo: {
		name: 'ChatGPTBox',
		file: 'logo.png'
	},
	fbnbeocmafoobaeodhmcgnammdeaoglg: {
		name: 'Felo',
		file: 'content-scripts/content.css'
	},
	fcdljeapnidkmbicfjocoeoiaacigcfe: {
		name: 'FaniMani.pl Donation Reminder',
		file: 'assets/css/serp.css'
	},
	fcgmpkgcecbkkcbbbafppfhdcffecile: {
		name: 'EO.workspace Integration',
		file: 'inject-clipboard.js'
	},
	fdchdcpieegfofnofhgdombfckhbcokj: {
		name: 'Puzzle',
		file: 'src/scripts/inpage.ts'
	},
	fdfemjpbhpcjeadhbblfifdldedefnhe: {
		name: 'Password Boss',
		file: 'frame/index.html'
	},
	feclmkildkjpmmmleiafjpedhefnbbif: {
		name: 'Myfxbook',
		file: 'img/paybackfx_logo.png'
	},
	ffhabonelknmejmdnekedmijlhebpcio: {
		name: 'DWithEase',
		file: 'js/popup.js'
	},
	fficfkginiidknkbmlcdiojphhkokggh: {
		name: 'Bloomberg Terminal',
		file: 'view/screenshot.js'
	},
	ffikidnnejmibopbgbelephlpigeniph: {
		name: 'tabExtend',
		file: 'assets/fx/addFx.mp3'
	},
	fgadldooeamdpekomjcdfgofahnplbde: {
		name: 'Cornerstone Guide Player',
		file: 'common/audio/audio.js'
	},
	fgbhbfdgdlojklkbhdoilkdlomoilbpl: {
		name: 'Just-One-Page-PDF',
		file: 'ct.html'
	},
	fgkbkiibnhcjhnclbgkfjdlnikocmgkh: {
		name: 'Conductor',
		file: 'heap.js'
	},
	fhkhedgjlkcgdaldodbhmcldjglpabmf: {
		name: '百度AI-浏览器助手',
		file: 'js/content.js'
	},
	ficfmibkjjnpogdcfhfokmihanoldbfe: {
		name: 'File Icons for GitHub and GitLab',
		file: 'fonts/mfixx.woff2'
	},
	fkeaekngjflipcockcnpobkpbbfbhmdn: {
		name: 'Copy as Markdown',
		file: 'dist/iframe-copy.html'
	},
	flfminafiamnggnldfpilnfnmbgmiegn: {
		name: 'simpleGestures',
		file: 'font/Flaticon.ttf'
	},
	flohijcknfmanaelbcplbehnjhjffaeo: {
		name: 'Automate Bing Rewards Searches',
		file: 'popup.html'
	},
	fmkhjeeeojocenbconhndpiohohajokn: {
		name: 'BrowserStack Accessibility Toolkit',
		file: 'assets/js/v4-D56SuKyV.js'
	},
	fnpeooemaihkgkfdpdpipikehmceplfl: {
		name: 'Soliton PasswordManager',
		file: 'notification_dialog.html'
	},
	fokgeblncoeecbckmeieogmkiabpimga: {
		name: 'DIBE',
		file: 'image/nik-2x.gif'
	},
	fokkbgoglgfjicalddihnfdfolnhoebb: {
		name: 'ClassroomGo Teachers',
		file: 'timer.html'
	},
	fpeoodllldobpkbkabpblcfaogecpndd: {
		name: 'Webrecorder ArchiveWeb.page',
		file: 'pdf/pdf.min.js'
	},
	gbdacbnhlfdlllckelpdkgeklfjfgcmp: {
		name: 'GIF Scrubber',
		file: 'popup.html'
	},
	gbhoepimmkeinmlojkmkpipcooeennmk: {
		name: 'MillionPugs',
		file: 'icon-16.png'
	},
	gcplhmogdjioeaenmehmapbdonklmdnc: {
		name: 'Fleeting Notes',
		file: 'popup.html'
	},
	gdhbaoemgglcgmkidhnhcellgnehaeol: {
		name: 'Nabla',
		file: 'logo.png'
	},
	gdnhngmilhhebigaokmniikdlcjbcbhg: {
		name: 'Moolah',
		file: 'assets/logo.png'
	},
	gdnpnkfophbmbpcjdlbiajpkgdndlino: {
		name: 'Infy',
		file: 'app/content/ajax.js'
	},
	gdpgagmlpgilibfadpifdmpfopknkanf: {
		name: 'My Sidex',
		file: 'web/logo_search.png'
	},
	gfbliohnnapiefjpjlpjnehglfpaknnc: {
		name: 'Surfingkeys',
		file: 'api.js'
	},
	gfplodojgophcijhbkcfmaiafklijpnf: {
		name: 'Spark blocker',
		file: 'css/content.css'
	},
	gghdfkafnhfpaooiolhncejnlgglhkhe: {
		name: 'Gemini AI Sidebar',
		file: 'assets/js/index.a4962feb.js'
	},
	ggjakfijchdkbmmhbfemjciidhnipgoe: {
		name: 'Search Commands',
		file: 'img/icon16.png'
	},
	ggnikicjfklimmffbkhknndafpdlabib: {
		name: 'Social Share Preview',
		file: 'icons/icon16.png'
	},
	ghcblfjepeeocokmmjjdfcigdbfgbejp: {
		name: 'AliSave Pro',
		file: 'assets/js/utils.js'
	},
	ghhapdfndmlhligpkofeppifkgddkonj: {
		name: 'Click2Call',
		file: 'assets/js/main.js'
	},
	ghncoolaiahphiaccmhdofdfkdokbljk: {
		name: 'DIAM Wallet',
		file: 'src/injector/injector.js'
	},
	gideponcmplkbifbmopkmhncghnkpjng: {
		name: 'AD Skipper for Youtube',
		file: 'content.js'
	},
	giofhmdgihebfjkdadokickedgbbglcf: {
		name: 'Brave Browser',
		file: 'img/64.png'
	},
	gjkfnalkblnjkalnipilmaacibikciin: {
		name: 'Geek Sidebar',
		file: 'content-scripts/esm/capture.js'
	},
	gjneklbanpnnjdeddbnkkgeljkhpblhp: {
		name: 'Hope Chest',
		file: 'images/up.png'
	},
	gkaaffkabfmjaekemimgnajfboopmpom: {
		name: 'Скриншотер, Запись Экрана, ChatGPT',
		file: 'js/popup.js'
	},
	gkgpbobdiaaodjbmgdankimklclnagio: {
		name: 'Cheese-PIP',
		file: 'popup.html'
	},
	glkplndamjplebapgopdlbicglmfimic: {
		name: 'PixGrid Ruler',
		file: 'css/content.css'
	},
	gnkkimhkpmldcibibpdhegbjcgdpiakc: {
		name: 'Telegram Downloader',
		file: 'js/myApi.js'
	},
	gnncjalmnfmdilagegplkkckngolohof: {
		name: 'Grasp',
		file: 'js/app.js'
	},
	gobpkdmjnhpopmpddhmhmbhkiienpfdo: {
		name: 'Quick Translate',
		file: 'css/popup.css'
	},
	gpmjpkmohjgaimfhebdjebpgdnpcadji: {
		name: 'Edit with Notepad++',
		file: 'data/editor/core.html'
	},
	gppahjpnghmiacfkbahpdnakchdkgodo: {
		name: 'The RebatesMe Cash Back Button',
		file: 'insert.js'
	},
	hbdnoadcmapfbngbodpppofgagiclicf: {
		name: 'SnipCSS',
		file: 'js/tidy.js'
	},
	hbkkncjljigpfhghnjhjaaimceakjdoo: {
		name: 'Dino Rush',
		file: 'icons/icon-16.png'
	},
	hegiignepmecppikdlbohnnbfjdoaghj: {
		name: 'Scroll To Top',
		file: 'icons/pratikabu-stt-16.png'
	},
	hfjnppljknigdnnpocjjgdcfmnodoafe: {
		name: 'Browserflow',
		file: 'assets/logo.svg'
	},
	hfojakphgokgpbnejoobfamojbgolcbo: {
		name: 'Ogame Infinity',
		file: 'main.js'
	},
	hfollkhbdmgdnakpgocoldgdjaoahhni: {
		name: 'Linkclump Pro',
		file: 'pages/test_area.html'
	},
	hhmokalkpaiacdofbcddkogifepbaijk: {
		name: 'Bookmark Search',
		file: 'icon48.png'
	},
	hielpjjagjimpgppnopiibaefhfpbpfn: {
		name: 'Symantec Browser Protection',
		file: 'sep.png'
	},
	hjnjkiddcmpamechmdjonecfjckboean: {
		name: 'TextUs',
		file: 'content.css'
	},
	hklmffdokpefcfabkmkpjnkoakehigjg: {
		name: 'AppSheet Toolbox',
		file: 'qrew-logo-hires.png'
	},
	hlbdmmifbcfpccdnoknhdfcifiglaihb: {
		name: 'DAP',
		file: 'data/grab/index.html'
	},
	hlcfpgkgbdgjhnfdgaechkfiddkgnlkg: {
		name: 'Bomberman Classic Game',
		file: 'icons/icon-16.png'
	},
	hlcgjogehgfjdkkdpnhnlmhnmacaemle: {
		name: 'WebDefender',
		file: 'assets/img/logo.png'
	},
	hmgehpjpfhobbnhhelhlggjfcaollidl: {
		name: 'MWP',
		file: 'images/options-loader.gif'
	},
	hmmohkncibpklokbkagphdagkibkjkmk: {
		name: 'qTest Integration',
		file: 'injected-script.js'
	},
	hmpbiickdfmcdlcpjegamgnjjkaiackl: {
		name: 'AliPrice Search by image for AE',
		file: 'assets/js/options.js'
	},
	hnbdgfongnkfgnbpamndfiiedhapfecn: {
		name: '语雀浏览器插件',
		file: 'lakex/katex.min.js'
	},
	hnfabcchmopgohnhkcojhocneefbnffg: {
		name: 'Web Translate',
		file: 'javaScripts/popup.js'
	},
	hoceldjnkcboafconokadmmbijbegdkf: {
		name: 'LibrusPro',
		file: 'librus.js'
	},
	hpbdhanjafnpeeobgejmdaajkiamfdpi: {
		name: 'Tzofar',
		file: 'alert.html'
	},
	iameapkpimeeenlmglodmdpbdponlhhd: {
		name: 'Talent Eye',
		file: 'libs/inject-script.js'
	},
	ibamclpibpnhmkaphhemfbljmenlpbch: {
		name: 'Otsledit',
		file: 'not.mp3'
	},
	ibeabbjcphoflmlccjgpebbamkbglpip: {
		name: 'Superpowers for Chatgpt',
		file: 'images/16.png'
	},
	ibjbdljnechfamiabmolmojegeindnpc: {
		name: 'VWO',
		file: 'js/noop.js'
	},
	icceojeancmncflpknhmfbfaleindgmi: {
		name: 'Email Scraper for Ins',
		file: 'injected.js'
	},
	iceonohalfbfcldenclcjafcpboiplfo: {
		name: 'What html font',
		file: 'wf.css'
	},
	ickdpignpmjcahkjfbmfljhiglmcmchn: {
		name: 'CheaperThere',
		file: 'img/url.svg'
	},
	idoejinhmhkammopnhekeohabblidioi: {
		name: 'Font Finder',
		file: 'data/window/index.html'
	},
	iedbphhbpflhgpihkcceocomcdnemcbj: {
		name: 'AI Webcam Effects + Recorder',
		file: 'icon.png'
	},
	ifijiokgalnlacohanefljklpbfoeipl: {
		name: 'GRIN Creator Discovery',
		file: 'assets/Storage-cDh9pLBt.js'
	},
	igajbpknpbdaknnmhpbolfidbhcdfokg: {
		name: 'Unicorn Smasher',
		file: 'popup.html'
	},
	igimfdmnnijclcfdgimooedbealfpndj: {
		name: 'xMetaCene',
		file: 'inpage.js'
	},
	iigobcdpmngdgiacebgenbccmdacnjhp: {
		name: 'Google Apps Script Tools',
		file: 'js/library.js'
	},
	iihamopomflffiecicbgelncanmfionp: {
		name: 'Writingmate',
		file: 'chat.html'
	},
	iiikmhonbbmbdjfokdmmncdohjionkmf: {
		name: 'Homework Solver',
		file: 'images/x.svg'
	},
	iimcimpbdndjaidollhipbkjilpnmfnh: {
		name: 'Course Hero',
		file: 'img/icon-72.png'
	},
	iinbhdejcemjafkabjokgeaffgnmijbh: {
		name: 'Audio to Text in WhatsApp',
		file: 'third_party/ort/ort.webgpu.min.js'
	},
	ijfcmmkkmogaclaafpgcjdfcfibmhcfa: {
		name: 'Furiganator',
		file: 'dict/cc.dat.gz'
	},
	ijkddggkehmcohpinjgofdnelhididfi: {
		name: 'Mass Friends Deleter',
		file: 'popup.js'
	},
	ijlpijnplhhbggppiebkfakonpjdikhl: {
		name: 'Quiz Solver AI',
		file: 'assets/16.png'
	},
	ikaoafechdeidffgniffdhdckeclcdhf: {
		name: 'HyperIntelligence',
		file: 'popup/main.css'
	},
	ilamopeagajnekeaogejpdmffneankjf: {
		name: 'Duey.ai Auto Typer for Google Docs',
		file: 'logo.svg'
	},
	inejiiekmjkmphgjjehhcmkpjncboodn: {
		name: 'Web3 Antivirus',
		file: 'tracing.html'
	},
	infdcenbdoibcacogknkjleclhnjdmfh: {
		name: 'reCAPTCHA Solver',
		file: 'content/style.css'
	},
	inlkhilmjmjomfcpdifpfgllhhlpnbej: {
		name: 'Unielon',
		file: 'pageProvider.js'
	},
	ipkbbcamfcnlflkedfdaokofdmfgocfp: {
		name: 'Mudfish',
		file: 'html/staticnodes.json'
	},
	jaaajddkaoldkiajncgakhmogoboijoo: {
		name: 'PopAi',
		file: 'assets/font-f2b037f5.js'
	},
	jblacjfeljfigeglloiclnoehlhnmgne: {
		name: 'Ethos Everywhere',
		file: 'assets/Small-blue.png'
	},
	jblbcpkejogbghfdglhfjlplchcnmohm: {
		name: 'Supademo',
		file: 'fonts/Inter-Bold.woff2'
	},
	jcpbllkjfpgkigjgaojmmhmcmafblcca: {
		name: 'Epub Reader',
		file: 'script.js'
	},
	jdpdpdkkofoclmgbopofhlmoikpfamao: {
		name: 'SEOSpace',
		file: 'injectScript.js'
	},
	jeablngoapekimaeoeclgcefdcpjhjcg: {
		name: 'hireEZ',
		file: 'pageWorld.js'
	},
	jeaepbakacaiplhmkdpjkbpjcpeenfdf: {
		name: 'Add to WishList.com Button',
		file: 'background.js'
	},
	jedomfgjdjlongbkplcnhlbneepckceb: {
		name: 'Pinterest Dark Mode',
		file: 'assets/icon128.png'
	},
	jgckjhiolmelfpdofcbfnkkapeblcfdh: {
		name: 'Sugoi Shimeji',
		file: 'media/sprites/sprite0.webp'
	},
	jgpjphkbfjhlbajmmcoknjjppoamhpmm: {
		name: 'Blue Blocker',
		file: 'assets/chunk-dfef9856.js'
	},
	jilgamolkonoalagcpgjjijaclacillb: {
		name: 'TTNote',
		file: 'assets/tg.png'
	},
	jincbkepokdimkkecpcmjjfhjepllkdj: {
		name: '2chRevival',
		file: 'style.css'
	},
	jkapbnoclmpnedficnpggdkobboijimp: {
		name: 'QuickSkip',
		file: 'js/background.js'
	},
	jkcpodicdboheakkkoblnflccfihcblb: {
		name: 'Flowith Web Clipper',
		file: 'icon/48.png'
	},
	jkoeaghipilijlahjplgbfiocjhldnap: {
		name: 'Mask Network',
		file: 'js/gun.js'
	},
	jljicfihpdcimopabpijdhhjbmenjala: {
		name: 'Gmail Unsubscribe',
		file: 'assets/css/main.css'
	},
	jmkaieepcjnofkicafdelmdpigjdankd: {
		name: 'Pure motion',
		file: 'img/ajax-loader.gif'
	},
	jnefaihbaohechagcjhebbjofkiolgan: {
		name: 'Passei Direto',
		file: 'crop.88d1e2ef.svg'
	},
	jnldfbidonfeldmalbflbmlebbipcnle: {
		name: 'Bitfinity Wallet',
		file: 'up_/src/Inpage/index.js'
	},
	jphoeefokmhkfljjhlpbndhikhjpencm: {
		name: 'Smarty.Sale',
		file: 'content-scripts/content.css'
	},
	jplochopoaajoochpoccajmgelpfbbic: {
		name: 'Twake Pass',
		file: 'images/icon38.png'
	},
	kadokpknocdadnipihnphaaabanedjnb: {
		name: 'DragApp',
		file: 'assets/img/48.png'
	},
	kamiaabbnpncbobdiblhfogafnoefkae: {
		name: 'FoundersCard',
		file: 'icon_16.png'
	},
	kaojpaiamdloeidjmdonckhfefggpflp: {
		name: 'BuxMoney',
		file: 'icon48.png'
	},
	kbgfilncepjeoodogmebahnloidgaibg: {
		name: 'JobFill',
		file: 'interceptor.js'
	},
	kblengdlefjpjkekanpoidgoghdngdgl: {
		name: 'AI GPT',
		file: 'icons/logo.svg'
	},
	kdkgijnijnbincicbnopccopncfedgba: {
		name: 'Panda Helper',
		file: 'icons/16.png'
	},
	kdngfaamkbbkdbemejnlkmjfpmndjdmb: {
		name: 'Originality.ai',
		file: 'src/tab.html'
	},
	kebcmemidpndhlgigmoghdocfodempah: {
		name: 'Cuponation',
		file: 'public/chunks/caa.js'
	},
	kegildkgkfimaeddknomlnfjckeajean: {
		name: 'Product Copy',
		file: 'platform/intercept/index.js'
	},
	kejhpkmainjkpiablnfdppneidnkhdif: {
		name: 'Sprint Reader',
		file: 'src/graphics/icon16.png'
	},
	kekkjfalendfifgchoceceoahjnejmgf: {
		name: 'Bulk Image Downloader From Url List',
		file: 'sidepanel.js'
	},
	kfnboibnjcpldbmeielppdepcpliogeb: {
		name: 'Quizard AI',
		file: 'icon32.png'
	},
	kgakmojcjdelgadjdjlhpnejmeaphhgg: {
		name: 'NoLang',
		file: 'assets/content.js-EqjiQbMU.js'
	},
	kheeipganhdcpkecibbpgggianpodhkc: {
		name: 'SpyHunter Web Security',
		file: 'extension/data/webapp/blocked.html'
	},
	khepfpojckhooicloeheemlhcljpjcjg: {
		name: 'Tab Translate',
		file: 'images/bubbles/copy.png'
	},
	khgfhiclgilifjfblcjfcefbhjlponpm: {
		name: 'playauto',
		file: 'manifest.json'
	},
	khjklhhhlnbeponjimmaoeefcpgbpgna: {
		name: 'GPT for Ecom',
		file: 'icon/BG.svg'
	},
	kinfihfgknmecicjmadebldjeknakbpj: {
		name: 'Mouse Cursor',
		file: 'assets/icon32.png'
	},
	kjfhlbghiagglcldmlfmpkdgmehmhfjc: {
		name: 'EpubPup',
		file: 'reader.html'
	},
	kkhpnmhogcfeboepoempiimfbonppocg: {
		name: 'Copilot',
		file: 'console.html'
	},
	klchnmggepghlcolikgaekpibclpmgcm: {
		name: 'Make America Kittens Again',
		file: 'kittens/1.jpg'
	},
	kmklnaljhcfcancckobnbafdhkbigfkk: {
		name: 'AskmeOffers AI',
		file: 'askmeoffers/meta.js'
	},
	knagohkjeeacioncgplacilibbkijkho: {
		name: 'iLink',
		file: 'img/128ico.png'
	},
	knjbgabkeojmfdhindppcmhhfiembkeb: {
		name: 'Matter',
		file: 'index.html'
	},
	kopggmlhnhalanhapdmflfmboikpjjmn: {
		name: '윈들리',
		file: 'contentScripts/features/scrap/temu/spy.js'
	},
	kpjcpmaacfdihmaahddoljcnapcniemh: {
		name: 'Clipper',
		file: 'content.css'
	},
	laameccjpleogmfhilmffpdbiibgbekf: {
		name: 'Tab Suspender',
		file: 'assets/options.css'
	},
	lbfofpndjldbnhnhibhmggblcbpoomon: {
		name: 'Beep for Google Docs',
		file: 'assets/icon16.png'
	},
	lcefjaknjehbafdeacjbjnfpfldjdlcc: {
		name: 'Roblox URL Launcher',
		file: 'script.js'
	},
	lcmofkcgjjagmhodenahpocfkpopjdci: {
		name: 'ScamAdviser',
		file: 'images/Shield.png'
	},
	lfdmeeegepbbjaopiekcnmenhmcpjhhg: {
		name: 'Online PDF Converter',
		file: 'index.html'
	},
	lfepbhhhpfohfckldbjoohmplpebdmnd: {
		name: 'Find WhatsApp Link',
		file: 'popup.html'
	},
	lfjcgcmkmjjlieihflfhjopckgpelofo: {
		name: 'gas-github',
		file: 'options/options.html'
	},
	lfjnnkckddkopjfgmbcpdiolnmfobflj: {
		name: 'Custom New Tab',
		file: 'options.html'
	},
	lfmmjkfllhmfmkcobchabopkcefjkoip: {
		name: 'LootRush Wallet',
		file: 'inpage.js'
	},
	lhehchebjnjcaeklbpoanpogkggnhadk: {
		name: 'Magic Button',
		file: 'js/hh.js'
	},
	liihfcjialakefgidmaadhajjikbjjab: {
		name: 'alphaXiv',
		file: 'icon-34.png'
	},
	ljakpkpdcahaniompbhpabnaafelhdol: {
		name: 'Salesforce Dark Theme',
		file: 'css/style.css'
	},
	ljbhddngkkppbbkknjldoikonnolgafd: {
		name: 'NoteExpress网络捕手',
		file: 'js/test.js'
	},
	lkafdfakakndhpcpccjnclopfncckhfn: {
		name: 'Link Blanker',
		file: 'html/notify-close-tabs.html'
	},
	lkhiljgmbeecmljiogckofcalncmfnfo: {
		name: 'Migaku',
		file: 'core/es.db'
	},
	lkmnoeojcpmcpjlbhbjbilpmccfljdoj: {
		name: 'Douban Book+',
		file: 'img/no-book.png'
	},
	lkpmkhpnhknhmibgnmmhdhgdilepfghe: {
		name: 'Prax wallet',
		file: 'manifest.json'
	},
	llbkdcpbiogplgmefnkbgcdfiopfphbc: {
		name: 'MarkUp.io',
		file: 'user-info-poll.html'
	},
	lmbnfoinlgcmombooibkgiihldajgnmk: {
		name: 'Smart Nexus',
		file: 'assets/icon.png'
	},
	lmilalhkkdhfieeienjbiicclobibjao: {
		name: 'Run Javascript',
		file: 'sandbox.html'
	},
	lmjkddpocmpfpfelefmjeikplccmchaj: {
		name: 'ImageRight PDF Import',
		file: 'images/icon150.png'
	},
	lmlkbclipoijbhjcmfppfgibpknbefck: {
		name: 'AliNiche',
		file: 'img/VIP.svg'
	},
	lnhbnkmlkgeebjfimnbceakepeiandgg: {
		name: 'Houzz Pro Clipper',
		file: 'ivy-thumbnail.svg'
	},
	lobgmjplponpghhahhmpfhnaiegjipaf: {
		name: 'Easy QR Code',
		file: 'modal.html'
	},
	lpanlmnkaioofmijifhpadfcafphopin: {
		name: 'iPacket SalesHub',
		file: 'dist/arcactions.js'
	},
	lpcacagdanaollekchlniifnnflbamep: {
		name: 'xPet.tech',
		file: 'img/1.png'
	},
	lpkjmgldcglmfilmnkcacbolkpkghdaa: {
		name: 'PitchBook',
		file: 'index.js'
	},
	lppjdajkacanlmpbbcdkccjkdbpllajb: {
		name: 'Online Dictionary Helper',
		file: 'fg/js/frame.js'
	},
	lppmahciboilaokklohhhdlaadkobgpc: {
		name: 'Change My Cursor',
		file: 'img/cat.png'
	},
	mahfncngjcmmhemjlbdiogjnngdcajab: {
		name: 'VisualSP',
		file: 'js/bootstrap.js'
	},
	mapjgeachilmcbbokkgcbgpbakaaeehi: {
		name: 'Omni',
		file: 'newtab.html'
	},
	mbdojfbhgijnafkihnkhllmhjhkmhedg: {
		name: 'Volume & Bass Booster',
		file: 'window.css'
	},
	mbgjopdedgonlbpikjfibkccpmhjbnag: {
		name: 'SpeedyApply',
		file: 'options.html'
	},
	mcdigjbnihajokfiolophengnjlcgeeb: {
		name: 'Bonusway',
		file: 'assets/img/a.png'
	},
	mdpelimehdooponahfdneckpfnooebii: {
		name: 'WAXP',
		file: 'client.bundle.js'
	},
	mehmbceeoajoljjbcodcbjlhmopjmlmf: {
		name: 'PEXA Digital Signing',
		file: 'scripts/constants.js'
	},
	mfaepkdaodjclepbclabjbigjeohfdje: {
		name: 'Gifs autoplay for Google',
		file: 'inject/xhr.js'
	},
	mfmpnnhnknadgoafpindapobelgkblbk: {
		name: 'Cat-In-Tab',
		file: 'main.css'
	},
	mgfcnnpakbfcefgphceolkjldjfpieff: {
		name: 'Symbolab',
		file: 'images/sy.svg'
	},
	mhchmhfecfdpaifljcfebnlaiaphfkmb: {
		name: 'Shopify Theme File Search',
		file: 'icon-34.png'
	},
	mibmplgflabdmnnoncnedjfdpidjblnk: {
		name: 'Aliexpress Seller Check',
		file: 'bg.js'
	},
	mifjkjljbbnepicdbbemkaafcjmplkaj: {
		name: 'Save image as PDF',
		file: 'images/48x48.png'
	},
	mipeohjjimeknlkekbemdjbjniogbgel: {
		name: 'Hubstaff Time Tracker',
		file: 'css/popup.css'
	},
	mkkicnlinnjfgjkegiomemdeleniiojl: {
		name: 'MySignature',
		file: 'src/assets/app.css'
	},
	mmcjkncamaomjlfjkifjpcklcddfdhgb: {
		name: 'KOI PET',
		file: 'content.css'
	},
	mmmjbcfofconkannjonfmjjajpllddbg: {
		name: 'Fluvi Wallet',
		file: 'inpage.bundle.js'
	},
	mnfchpadaikneonajggpooeppnmdolhc: {
		name: 'TorGuard VPN',
		file: 'images/bg.png'
	},
	mnjclpmbklnceaoeochkhckaphjhnpib: {
		name: 'Data Dive',
		file: 'assets/add.svg'
	},
	mofcmpgnbnnlcdkfchnggdilcelpgegn: {
		name: 'Feishu Clip',
		file: 'app.js'
	},
	moicohcfhhbmmngneghfjfjpdobmmnlg: {
		name: 'LiveTL',
		file: 'lite.js'
	},
	nakohbfkcebgehahpebfpnnhgojgeopc: {
		name: 'Suika Game',
		file: 'icons/icon-16.png'
	},
	nbdpmlhambbdkhkmbfpljckjcmgibalo: {
		name: 'Halo',
		file: 'inpage.js'
	},
	nbnadmpkgmmampijfdadgadjookahkbc: {
		name: 'Gong Anywhere',
		file: 'src/iframes/shared/generic-iframe.html'
	},
	ncbhkghndhoddmbfgddpgafhbnijdadj: {
		name: 'VLMarketInt',
		file: 'popup/popup.js'
	},
	ndbnmjocnckdijnlnkoponigbnfmalpi: {
		name: 'PubmedX',
		file: 'resources/Twitter_Logo_Blue.webp'
	},
	ndchmakhfaakbkhnkdgambadneloplnn: {
		name: 'Cenafy',
		file: 'cena.mp4'
	},
	neaebjphlfplgdhedjdhcnpjkndddbpd: {
		name: 'Vue Telescope',
		file: 'injected.js'
	},
	necbalcggglceeioaehdbkpbldmoabii: {
		name: 'Lavender',
		file: 'react/init.js'
	},
	nedimkoolcnedillajmobdhlmeibokgp: {
		name: 'Chrome Cat',
		file: 'sounds/bb_meow.mp3'
	},
	nfhnknijidlahaoemjlbpfpgpheakoph: {
		name: 'Synthesia',
		file: 'jb0facby.js'
	},
	nggoojkpifcfgdkhfipiikldhdhljhng: {
		name: 'Spelunky Classic',
		file: 'icons/icon-16.png'
	},
	nhdkblgjckgbdpjbohjepdakoioldloe: {
		name: 'Virtru for Drive',
		file: 'js/popup.js'
	},
	nifeadedgedikheglfngocdgfidiiimi: {
		name: 'Link Checker',
		file: 'img/star.png'
	},
	njincahdjloohmjeonojgjeihkgbjfko: {
		name: 'USPS Tracking',
		file: 'manifest.json'
	},
	njommheeefdkhenodpfoflmeoampaggk: {
		name: 'MindStudio',
		file: 'images/floating-button.png'
	},
	nkipnpoebmbpljbmiijjnmkolichinpi: {
		name: 'Consensus SNAP',
		file: 'index.html'
	},
	nlaealbpbmpioeidemdfedkfmglobidl: {
		name: 'signNow',
		file: 'content/web/viewer.html'
	},
	nlgfplihjpoagjkcnmfiefhhbpfeibch: {
		name: 'ANNEXX',
		file: 'popup/img/logo.svg'
	},
	nlkobfbkblfhlcobdomlhmpbbhmcbkfd: {
		name: 'PHPView',
		file: 'error.gif'
	},
	nmldldceedhpaljnghjfdpledpdmkjek: {
		name: 'Cashback',
		file: 'dev.js'
	},
	nnkkgbabjapocnoedeaifoimlbejjckj: {
		name: 'Block Site Ex',
		file: 'css/block.css'
	},
	npamdkabjncnnoaofdjcaipmnccofeem: {
		name: 'pCloud',
		file: 'options.html'
	},
	npbjhobkibekbklkghlhfhieggcggpdb: {
		name: 'Rovo',
		file: 'compiled-css.css'
	},
	npfcikmknnpnilnlmapapegahabkfinp: {
		name: 'Serviceware Knowledge Integrator',
		file: 'page/froala-support.js'
	},
	oabphaconndgibllomdcjbfdghcmenci: {
		name: 'RTA',
		file: 'assets/icons/BitTorrent16.png'
	},
	oadjckehgdokecialgdhjkjdmjonfkkf: {
		name: 'BG Remaker',
		file: 'img/logo.png'
	},
	oaimmbbnnhmibhbocchkfcakiankbnlk: {
		name: 'Messages Saver for Facebook',
		file: 'css/emoji.css'
	},
	obdhcplpbliifflekgclobogbdliddjd: {
		name: 'Paint Tool',
		file: 'assets/content.css'
	},
	ochakbabgibkngiacohpppcpmjbfmafm: {
		name: 'Heimdall',
		file: 'chunk-CCCC0qBe.js'
	},
	ocllfmhjhfmogablefmibmjcodggknml: {
		name: 'Recent Tabs',
		file: 'images/document.png'
	},
	oddbjmjgpaofommagnbfednbdifaakfb: {
		name: 'Nastaleeq',
		file: 'src/inject/MehrUrdu.ttf'
	},
	odjkephjckgpjidmglobijkgdfeplhkp: {
		name: 'Ускорить Ютуб Бесплатно',
		file: 'assets/icn.png'
	},
	odkfginmjmeaoggmbainlfacibmhhbbd: {
		name: 'Hamatata.com Helper',
		file: 'img/loader.gif'
	},
	odmmidbmgkkbabilcljmljbeopneabkn: {
		name: 'Enable Right Click',
		file: 'worker.js'
	},
	oeajaacbejdppgamncfdboaiipnncnmj: {
		name: 'Read it',
		file: 'assets/main.css'
	},
	oiillickanjlaeghobeeknbddaonmjnc: {
		name: 'RECAP',
		file: 'assets/images/icon-16.png'
	},
	ojcijjdchelkddboickefhnbdpeajdjg: {
		name: 'Funkify',
		file: 'content/audio/bus.mp3'
	},
	ojkchikaholjmcnefhjlbohackpeeknd: {
		name: 'OWASP PTK',
		file: 'ptk/inject.js'
	},
	okkijechcafgdmbacodaghgeanecimgd: {
		name: 'Pac Man Tribute',
		file: 'icons/icon-16.png'
	},
	okmokimdgjhndamggnkdojhbofdmepno: {
		name: 'InsExporter IG Follower Export Tool',
		file: 'assets/icon-16.png'
	},
	okphadhbbjadcifjplhifajfacbkkbod: {
		name: 'SABconnect++',
		file: 'css/common.css'
	},
	olioanlbgbpmdlgjnnampnnlohigkjla: {
		name: 'Web Disability Simulator',
		file: 'simulations/sunshine/css/main.css'
	},
	omdailfkkflmmjpeijgmepjpkaicbman: {
		name: 'Communicator Call',
		file: 'detectAjax.js'
	},
	ongmhighpnfpojfidgigcjflgdkjfdeb: {
		name: 'Storylane',
		file: 'fonts/Poppins-Bold.woff'
	},
	oohipoojgodobmpkcebmmkffpbckijoc: {
		name: 'Zoho Show',
		file: 'html/inject.html'
	},
	pbcpfbcibpcbfbmddogfhcijfpboeaaf: {
		name: 'Amino',
		file: 'amino-inspect.min.js'
	},
	pcbdjfbemhiapdadgbfmdcokholpinfk: {
		name: 'SealSend',
		file: 'style.css'
	},
	pccbghdfdnnkkbcdcibchpbffdgednkf: {
		name: 'Propbar',
		file: 'auth.html'
	},
	pdeldjlcnhallaapdggcmhpailpnnkmg: {
		name: 'Ultimate Web Scraper',
		file: 'public/icon.png'
	},
	pfgnfdagidkfgccljigdamigbcnndkod: {
		name: 'MobX Developer Tools',
		file: 'panel.html'
	},
	pgnfaifdbfoiehcndkoeemaifhhbgkmm: {
		name: 'LazyApply',
		file: 'images/panda1.png'
	},
	pgoeobojimoocdnilcajmjihiabcmabn: {
		name: 'Site Blocker',
		file: 'popup.html'
	},
	phgiabfbjodhgckcffppiboooeiecgeg: {
		name: 'DefiLlama',
		file: 'icon-34.png'
	},
	phpllnjdcoiijcpgcbhlocjgcegjfnhb: {
		name: 'CoMo Inspector',
		file: 'index.html'
	},
	piepdojghinggmddebidfkhfbdaggnmh: {
		name: 'shortfuts',
		file: 'injected.js'
	},
	pjcoahgaemafbolmcnlchnbegigekbil: {
		name: 'Translator for WhatsApp Web',
		file: 'assets/index.1c785d90.js'
	},
	pjdbofhiijhapnmpgilkeammkanglfdj: {
		name: 'Heurio',
		file: 'style/fonts.css'
	},
	pkgejkfioihnchalojepdkefnpejomgn: {
		name: 'Colorway',
		file: 'index.html'
	},
	pnbabdldpneocemigmicebglmmfcjccm: {
		name: 'Authenticator App',
		file: 'popup.css'
	},
	pnmaklegiibbioifkmfkgpfnmdehdfan: {
		name: '10ten Japanese Reader',
		file: 'css/selection.css'
	},
	pnpapokldhgeofbkljienpjofgjkafkm: {
		name: 'Best Cursors',
		file: 'bc-logo192.png'
	},
	ppoekdaclagjhfdjckangfblildnahka: {
		name: 'AMZ Downloader',
		file: 'csv.svg'
	},
	aakkhbloifflgelkkikmbakldbhllbfj: {
		name: 'GMB Crush',
		file: 'icons/mobile.svg'
	},
	aamaonobacmhfnfbiihlmelncgefbhma: {
		name: 'Subtitles for Youtube',
		file: 'subtitleBox.html'
	},
	abafaagbfhobgjkcepckbnadafflkdea: {
		name: 'EData Filler',
		file: 'contentScript11.js'
	},
	abbhcfgheggicbgjihahnikcijgodmbd: {
		name: 'Seismic for Gmail',
		file: 'popup.js'
	},
	abebconmjhhbcjofpchjkbbimgkhdmbe: {
		name: 'Translater',
		file: 'content-scripts/esm/content.js'
	},
	abjfbanhppgiflmobebfffbijcfoeiao: {
		name: 'Kontos',
		file: 'kontos.png'
	},
	abkfbakhjpmblaafnpgjppbmioombali: {
		name: 'Memex',
		file: 'img/key.svg'
	},
	acfmgdlfkkookcaeophipjkbnaglpcoo: {
		name: '友鹰数据',
		file: 'index.html'
	},
	ackcbipakokckcokomiffcmkgpckkjhf: {
		name: 'Ekoru Search',
		file: 'image/logo_xsmall.png'
	},
	acmfeacjdhhlkkiedpfkkhbnddjanphf: {
		name: 'GIF Maker',
		file: 'popup.js'
	},
	acmfklpkefjlldbkdgmjoiknfgidadoh: {
		name: 'Clay',
		file: 'popup.html'
	},
	adiiaeaejlpneikcmkihnimenppopden: {
		name: 'Chrome Reader Mode',
		file: 'styles.css'
	},
	aeehapalakdoclgmfeondmephgiandef: {
		name: 'LazyCat Bookmark Cleaner',
		file: 'index.js'
	},
	afhokbldaaeggpigpijmomaooflpikji: {
		name: 'MakeTime',
		file: 'assets/fonts/Optima.ttf'
	},
	afnkbjdolconnacdloghhenaochkafoi: {
		name: 'Floating Picture-in-picture',
		file: 'web_accessible_resources/on.svg'
	},
	agchmcconfdfcenopioeilpgjngelefk: {
		name: 'eBesucher Addon',
		file: 'addon.js'
	},
	aglfipclnglindmcgmihmeljjfejjhdf: {
		name: 'Chandler',
		file: 'fullpage.html'
	},
	ahgakckdonjmnpnegjcamhagackmjpei: {
		name: 'Save as MHTML',
		file: 'data/toolbar/index.html'
	},
	ahnhkdjjonmjlhbbgaaoehdnhlgcgbab: {
		name: 'SearchAtlas SEO',
		file: 'js/script.js'
	},
	aielbbnajdbopdbnecilekkchkgocifh: {
		name: 'Enlargify Magnifying Glass',
		file: 'images/magnifier.svg'
	},
	aihgkhchhecmambgbonicffgneidgclh: {
		name: 'Email Finder & Email Hunter',
		file: 'icons/16.png'
	},
	aklijicmhlmfioogfbemefilfdffijcl: {
		name: 'Media Downloader',
		file: 'css/radio.css'
	},
	akommlakkhgbjbidpkkdcgbjgbeemdik: {
		name: 'crumbs',
		file: 'crumbs-email-relay-menu.html'
	},
	albjlmhakjdfaemnnmpjddfmcadbpgpf: {
		name: 'Hanzii',
		file: 'favicon.ico'
	},
	algkcnfjnajfhgimadimbjhmpaeohhln: {
		name: 'Secure Shell',
		file: 'html/nassh.html'
	},
	alnaklamobemdmneodhdgcpcimolihfc: {
		name: 'Eye Guardian',
		file: 'sounds/first-notification.mp3'
	},
	ambjmopdihmdndfenlecimbfdbgngeea: {
		name: 'uTorrent',
		file: 'res/icon96.png'
	},
	amcccnldajjnngnaoinemnaloklogjak: {
		name: 'HTML to Figma',
		file: 'src/assets/search.webm'
	},
	amciopbgphikbcmaffbmmibnbpiokfic: {
		name: 'Liner',
		file: 'images/19.png'
	},
	amfkipihkmaplngfikedhgfmjndaboep: {
		name: 'Scratchpad',
		file: 'iframeNotesList.html'
	},
	amjaoklkeffceamacmpblhhhfajdoihl: {
		name: 'Influencer Analytics',
		file: 'manifest.json'
	},
	amlpnkfionniifnajgcalfndolieichk: {
		name: 'Dex',
		file: 'assets/dex-icon.png'
	},
	aoananblbpkihfolfalanokhfbgloifd: {
		name: 'Kofax PDF Create',
		file: 'content-frame.html'
	},
	aocppmckdocdjkphmofnklcjhdidgmga: {
		name: 'taba11y',
		file: 'img/sun.png'
	},
	aopiblpdipgmiiafojaigmoalfmboidh: {
		name: 'TecWorld Descontos',
		file: 'index.css'
	},
	aphligncnahhmlmcndcpmadohdgngfjf: {
		name: 'Mute All for Google Meet',
		file: 'styles/body.css'
	},
	apjpmocfcdmmjcgcbipfhjfcjhlkfhmc: {
		name: 'ECGO',
		file: 'src/styles/logo.css'
	},
	baaibngpibdagiocgahmnpkegfnldklp: {
		name: 'Smart Web Paint',
		file: 'images/eraser.png'
	},
	baeacoakglpckmhkmpgkdgoclgcjpkoc: {
		name: 'nicopip',
		file: 'assets/inject.ts-B_MVn9Jd.js'
	},
	baganeegkidlaebaigikopklmhkdkkbk: {
		name: '智译网页翻译',
		file: 'setting.html'
	},
	baigfnhcfjaehfeihnpghahhaceapfme: {
		name: 'IQ Robot',
		file: 'content.js'
	},
	bapdkmlgodmfeddcbminmghfndolfdcf: {
		name: 'Dynamics 365 Power Pane',
		file: 'ui/pane.html'
	},
	bbcmnbnmngpeofmpcdlcfalbniefegbp: {
		name: 'Trinka AI',
		file: 'sdkBridge.js'
	},
	bbhcinnacieofapkejehoacofpdimlcf: {
		name: 'OptimAI',
		file: 'content.css'
	},
	bcbomnojalacmkgalembldegajchajdd: {
		name: 'Dr.eye Embedded Translation',
		file: 'images/16/chs.png'
	},
	bdnmbmckbekibamnoenjkgmllboffdca: {
		name: 'Malwarebytes Browser Guard Beta',
		file: 'app/app.html'
	},
	becedogggoaicbphcoimgpmhodofcfck: {
		name: 'InFormEnter+',
		file: 'img/informenter-marker-1.png'
	},
	bedogdpgdnifilpgeianmmdabklhfkcn: {
		name: 'VESPR Wallet',
		file: 'lib/cip30/injected.web.js'
	},
	bejnkpeokbmilompefleppmlblpblbok: {
		name: 'UserGuiding+',
		file: 'fonts.css'
	},
	bflmnoacgfmbdfinmbiapbanfobpglba: {
		name: 'Chat AI',
		file: 'inject.js'
	},
	bfncmfmdadhimlnpeecppaimgmeeppan: {
		name: 'Google Sheets Excel Shortcuts & Trace Formula',
		file: 'popup.html'
	},
	bgbecoklnfhhckmjjkooiaacmkfbgddo: {
		name: 'CNFans Warm Warning Reminder Remover',
		file: 'disclaimer.js'
	},
	bgdfagapkongbjnklaabbmgpppgfccbg: {
		name: 'Eureka Shopping',
		file: 'widget/index.html'
	},
	bghceahjdhjncoohgobeohgnmfnooibd: {
		name: 'HAR/JSON viewer',
		file: 'connection.js'
	},
	bgnhamkjgjnjfieadagbccalaiehmaca: {
		name: 'Cross Identity',
		file: 'icon.png'
	},
	bgpipimickeadkjlklgciifhnalhdjhe: {
		name: 'Gero Dashboard',
		file: 'public/logo.png'
	},
	bhcafamaagaonkhnbnnjjfekddfllpgc: {
		name: 'cloud print',
		file: 'toolbar/toolbar.js'
	},
	bhmpidliobdjgkohacnkgfagkdmckcia: {
		name: 'Find and replace',
		file: 'images/close.png'
	},
	bjojfeillmmoeadgobbcknkgdkngbcdb: {
		name: 'Trocker',
		file: 'img/tl.png'
	},
	bkngajpcccjlgebicocmdadpoglfaeib: {
		name: 'Pugo',
		file: 'site.js'
	},
	blglfmihmnbhfgfbomofeljmididgfhe: {
		name: 'DataLayer Checker Plus',
		file: 'scripts/vendor.js'
	},
	blimjkpadkhcpmkeboeknjcmiaogbkph: {
		name: 'Sendspark Video and Screen Recorder',
		file: 'camera.html'
	},
	blipofpggfakgagkjjofilbjenenheaa: {
		name: 'Login Online',
		file: 'manifest.json'
	},
	blndbjkicjhcbpldeamfbdoeekcbampi: {
		name: 'Markdown Nice',
		file: 'ueditor.js'
	},
	bmejkpgaonmggfkbmbljdiapjnpbopcp: {
		name: 'Toolsy.io',
		file: 'assets/ui-icons/X.tsx'
	},
	bnacincmbaknlbegecpioobkfgejlojp: {
		name: 'MaxFocus',
		file: 'content-scripts/content.css'
	},
	bnebanooamokkihfjepphafoekheipfh: {
		name: 'Plus',
		file: 'content/index.js'
	},
	bnflmljpbmkjeahgjakmjdanmhldjhbk: {
		name: 'Claap',
		file: 'camera.html'
	},
	bniadokhddgdbbcpolbgjcnmaphkbpni: {
		name: 'Thieve AliExpress Tools',
		file: 'content-script.js'
	},
	bnkaaocadlimipknmjoebcfnjfffdnif: {
		name: 'Storm Tracker',
		file: 'assets/wind-3.svg'
	},
	bnmdedmhngbeofnafobjmcihealecgnf: {
		name: 'Copy-n-Paste',
		file: 'init.js'
	},
	boljogbhdlnglpadhgaecnmecdnhnjpe: {
		name: 'Similar Product Search on Temu',
		file: 'css/main.css'
	},
	bpoadpcobdbakpgkgpfhlggfapdkiijm: {
		name: 'Getemail.io legacy',
		file: 'browser_action/libs/jquery-3.4.1.min.js'
	},
	bpppldnipnppkmongnkihlioaojpmine: {
		name: 'DataGalaxy',
		file: 'index.html'
	},
	cadiboklkpojfamcoggejbbdjcoiljjk: {
		name: 'Binance Wallet',
		file: 'inpage.js'
	},
	camnmdjjfkcplbdlofbndmkmnfeegjoi: {
		name: 'Keep Aware',
		file: 'msghand.css'
	},
	cancngpbjlfnkdfeigpododikkpelmfg: {
		name: 'HistoryDate',
		file: 'ext.css'
	},
	canipghmckojpianfgiklhbgpfmhjkjg: {
		name: 'Crossmark',
		file: 'static/js/inject.bundle.js'
	},
	cbdfphadkkilbophkiniofgadollfoae: {
		name: 'Sunrise Backgrounds',
		file: 'sources/app.js'
	},
	cbohbbfalnakfabmclapcglchjnpljdm: {
		name: 'Cointimes',
		file: 'info.json'
	},
	ccdooaopgkfbikbdiekinfheklhbemcd: {
		name: 'Namso Validator',
		file: 'systemFunc.js'
	},
	cceclgeciefpanebkfkogecbjjchmico: {
		name: 'Force Copy',
		file: 'lnCW8VD8ab.js'
	},
	ccemhgcpobolddhpebenclgpohlkegdg: {
		name: 'Lumina Night Mode',
		file: 'js/proxy.js'
	},
	cdblaggcibgbankgilackljdpdhhcine: {
		name: 'rflookup',
		file: 'scripts/pdfjs.js'
	},
	cdbldfdikpkmfcnpidikieafacjkchbg: {
		name: 'Winston AI',
		file: 'popup.css'
	},
	cdgbjhkjjghbjjikgjkkpljlmnpcakco: {
		name: 'Reverse Image Search',
		file: 'post-form.js'
	},
	cdkhibgadomdghgnknpmgegpjjmfecfk: {
		name: 'JsCIN',
		file: 'i18n.js'
	},
	cdmbeofnbhgdgnijieodggfmfpamfifg: {
		name: 'AMZScout PRO',
		file: 'styles.css'
	},
	cdnlfphfngnfhjcnoikfhaomaaflaiie: {
		name: 'Video Maximizer',
		file: 'videomax_inject.css'
	},
	cejddnmmppcemhgenpcacdipichjjeme: {
		name: 'PiP',
		file: 'img/icon.ico'
	},
	cfegchignldpfnjpodhcklmgleaoanhi: {
		name: 'Sidegram',
		file: 'rules_1.json'
	},
	cfkejojncmolgahkabegcdbcbmnghhcp: {
		name: 'Fantia downloader',
		file: 'jszip.js'
	},
	cfkhjljibkblnlhbaemeopmhkpmahhac: {
		name: 'YouTube Transcription',
		file: 'icons/16x16.png'
	},
	cflakfhockilljdbofnanaijpmpmfcol: {
		name: 'Từ điển Anh Việt ENVI',
		file: 'ocr.html'
	},
	cgdelbjbpigakkmnampgkeigekpacodn: {
		name: 'UPS Tracking',
		file: 'manifest.json'
	},
	cgeeodpfagjceefieflmdfphplkenlfk: {
		name: 'EVER Wallet',
		file: 'js/popup.js'
	},
	cgejkofhdaffiifhcohjdbbheldkiaed: {
		name: 'Minyami',
		file: 'assets/scripts/inject_core.js'
	},
	cgicnmnonpkpbgmboekkjdbckihlhajf: {
		name: 'MatPatify',
		file: 'images/1.png'
	},
	cgojmfochfikphincbhokimmmjenhhgk: {
		name: 'WhoX VPN',
		file: 'on.png'
	},
	chfhddogiigmfpkcmgfpolalagdcamkl: {
		name: 'var_masterpiece',
		file: 'images/info.svg'
	},
	chjblpopkoelbkolfboniibdhjmlkphf: {
		name: 'Desktop Screen Recorder',
		file: 'data/window/index.html'
	},
	chmicphoaiifenjibjabgnhpilccfilo: {
		name: 'IExporter',
		file: 'icon-48.png'
	},
	cidalejakfnmkeioolifplbocphngkhl: {
		name: 'Admitad',
		file: 'assets/icons/19x19.png'
	},
	cjfempcnipbjiigappmofndiliohlpan: {
		name: 'WuCai',
		file: 'views/sc.html'
	},
	cjiinmicahhdcmfpdohhaahgkdiehfga: {
		name: 'Skipper',
		file: 'logo.svg'
	},
	cjpmpjddogcacgckmamjhmjlflfjikdh: {
		name: 'Quizwiz',
		file: 'index.html'
	},
	ckcdnopgiijkcoejjophlljlfommgihi: {
		name: 'Temp Mail',
		file: 'css/index.css'
	},
	ckdcieaenmejickienoanmjbhcfphmio: {
		name: 'Lensify Zoom Magnifying Glass',
		file: 'images/magnifier.svg'
	},
	ckfdjapnpbkafkkbimifjeohlemamoal: {
		name: '店查查',
		file: 'injected.js'
	},
	cklapigolmgodbfjbickflddedbdieka: {
		name: 'Custom Cursor',
		file: 'assets/static/32.png'
	},
	clccplmaaeihbagbefjinmclielobnkb: {
		name: 'Cerby',
		file: 'menu.html'
	},
	cmfdaldondfeihfgblhhjpaoddmmopgl: {
		name: 'Tali AI',
		file: 'negative.wav'
	},
	cmplbmppmfboedgkkelpkfgaakabpicn: {
		name: 'Gridman',
		file: 'icon/icon-gridman.svg'
	},
	cncllbaocdclnknlaciemnogblnljeej: {
		name: 'What Font Spotter',
		file: 'css/content.css'
	},
	cneomjecgakdfoeehmmmoiklncdiodmh: {
		name: 'XPath Tester',
		file: 'icons/icon_64.png'
	},
	coeeccnnaonnljjhoonkmmoihpibgane: {
		name: 'RingDNA',
		file: 'images/logo.png'
	},
	cofoinjfjcpgcjiinjhcpomcjoalijbe: {
		name: 'Leetcode Explained',
		file: 'src/assets/images/copy-icon.png'
	},
	cokngoholafkeghnhhdlmiadlojpindm: {
		name: 'Video Roll',
		file: 'inject/index.js'
	},
	copnnlbbmgdflldkbnemmccblmgcnlmo: {
		name: 'Zukeeper',
		file: 'js/contentScript.js'
	},
	cpggpmmbmacgemcffkapmeadpnfnmkbm: {
		name: 'AI Sider',
		file: 'rules.json'
	},
	cpnkcffhllafbdbljkmhebnpbnlhapmd: {
		name: 'CSS Selector Capture Pro',
		file: 'common/app.min.css'
	},
	dagflnpdebeejnminpgebkallhcgeklm: {
		name: 'SmmBox',
		file: 'smmbox.html'
	},
	dalcafimefnkcnhhlbceoedffpkfehoe: {
		name: 'Search by image on Amazon',
		file: 'ic.png'
	},
	dbbopjndlaginbghfoibbndhlbpdpapd: {
		name: 'IGPlus',
		file: 'assets/img/dev.png'
	},
	dccefjeoofjkdjodbkkbncjcipagdnad: {
		name: 'Japanese IO',
		file: 'images/logos/japanese-io-logo.svg'
	},
	dcjbilopnjnajannajlojjcljaclgdpd: {
		name: 'StopSurf',
		file: 'css/block.css'
	},
	dclnfogoojlodlkdfnmghfbeloeojken: {
		name: 'AppstoreSpy for Play Store',
		file: 'ru.svg'
	},
	dcmdiknbnpjcbecpfpipeadobeldbijh: {
		name: 'Clear Pip View',
		file: 'web_accessible_resources/on.svg'
	},
	dcpelmafllhhdcbiegigphjnbgnolkgm: {
		name: 'MediaHarvest',
		file: 'callback.html'
	},
	dcpmkllpnpfpojkjildgeoedikjbhodm: {
		name: 'Web for TikTok',
		file: 'img/icon.ico'
	},
	ddbjkeokchfmmigaifbkeodfkggofelm: {
		name: 'Popup Blocker',
		file: 'src/layouts/modal.html'
	},
	ddlkpghofgnckhcipgmbdeeejgehckbj: {
		name: 'Nyan Cat',
		file: 'nyanimated.gif'
	},
	ddoijapfgfbaaehaegnddlbnmcbngkpi: {
		name: 'Canned Replies',
		file: 'index.html'
	},
	dfjbpjcgbmpmjacdgflidcbdojphlhmd: {
		name: 'NSSignPDF',
		file: 'fonts/material-icons.woff2'
	},
	dfjejaldnpbdkacoehinpjplnmfahhop: {
		name: 'Local Media Player',
		file: 'libs/notification/index.html'
	},
	dfjghhjachoacpgpkmbpdlpppeagojhe: {
		name: 'OMOcaptcha',
		file: 'configs.json'
	},
	dfmneckodhidoicepmbegcjifhmhhppg: {
		name: 'Advanced Auto Logout',
		file: 'icons/icon128.png'
	},
	dgbcohbjchndmjocioegkgdniaffcaia: {
		name: 'Lever Hire',
		file: 'panel.js'
	},
	dgcfkhmmpcmkikfmonjcalnjcmjcjjdn: {
		name: 'CurlWget',
		file: 'images/options.png'
	},
	dgeiaiglmhdhajbpfbmajaajdlfdinpi: {
		name: '会译:沉浸式翻译',
		file: 'video.js'
	},
	dgenbagabmmjpfjlbcnnlmpopipdapjo: {
		name: 'Notebook LM',
		file: 'content.css'
	},
	dghbbbhgdfcfmbjclbfcdhekdkkmaign: {
		name: 'SiteBlockers',
		file: 'der.html'
	},
	didfpaehajfbjnamladanbocmdhahfch: {
		name: 'Logalty ClickOnce',
		file: 'images/blank.png'
	},
	didkfdopbffjkpolefhpcjkohcpalicd: {
		name: 'AH',
		file: 'img/db.svg'
	},
	difjajjajoeppdgbcbbhbdblblmkcbhp: {
		name: 'BuzzStream Buzzmarker',
		file: 'flags.json'
	},
	dioapkekjoidbacpmfpnphhlobnneadd: {
		name: 'Math AI',
		file: 'content-scripts/main.css'
	},
	djbbokpfbbipcdnodgadkidppckgajgp: {
		name: 'Copy Text from Videos',
		file: 'login.css'
	},
	djhndpllfiibmcdbnmaaahkhchcoijce: {
		name: 'Casper Signer',
		file: 'logo64.png'
	},
	dkdeafhmbobcccfnkofedleddfbinjgp: {
		name: 'Dungeon Dodge',
		file: 'icons/icon-16.png'
	},
	dkdfaikjbcicjbjejichilcfidbifjdl: {
		name: 'Safqa Coupons',
		file: 'app.html'
	},
	dkmialecpnehmacfikflbjkdnkiccmnk: {
		name: 'クリックポスト',
		file: 'options/options.js'
	},
	dlbfbjkldnioadbilgbfilbhafplbnan: {
		name: 'Scope Master Page Ruler',
		file: 'css/content.css'
	},
	dmfjonjeonmaoehpjaonkjgfdjanapbe: {
		name: 'Capios',
		file: 'css/ocr.css'
	},
	dmhljjnonlhapikmelaefohecogokhio: {
		name: 'Apidog',
		file: 'adapter.js'
	},
	dndlogdahhepeejieppcfccajdbmeajd: {
		name: 'tkm-gchat-ext',
		file: 'icon-128.png'
	},
	dnnmaoecogobjdiieopljefemjdkkaja: {
		name: 'Burner Emails',
		file: 'images/loader.gif'
	},
	dnociedgpnpfnbkafoiilldfhpcjmikd: {
		name: 'Livewire devtools',
		file: 'devtools.html'
	},
	docdmgijbdlobilamkipaleciekbgbgl: {
		name: 'BuyBotPro',
		file: 'content-app.css'
	},
	dogdgmomajhncdopjdijiabedklfampi: {
		name: 'RingCentral for HubSpot',
		file: 'popup.html'
	},
	dokdlgjaaaijndfajoknjbelmadhomca: {
		name: 'YouTube High Definition',
		file: 'style/style.css'
	},
	dpajfcckdohlcidmbjledcaenfkjaddo: {
		name: 'Saima',
		file: 'assets/js/main.js'
	},
	dpjfjjogncmalibegalebgbnfigonomb: {
		name: 'darkmode',
		file: 'css/noty.css'
	},
	dpjiaamadbcfheiamdaamhgpomlkohbn: {
		name: 'VideoTogether',
		file: 'load.en-us.js'
	},
	eacfcoicoelokngmcgkkdakohpaklgmk: {
		name: 'NoteGPT',
		file: 'logo.png'
	},
	eadjllodfjkbljlihgiflhapafcigoee: {
		name: 'Hero Wallet',
		file: 'assets/main-DWaWCno8.js'
	},
	eaedglemlchhplocegehpjfeganapaij: {
		name: 'Pleasant Password Server Auto-Filler',
		file: 'jquery.js'
	},
	eafjmnaiohflfhelegodfedimibnjpgp: {
		name: 'svg-grabber',
		file: 'svg-manager.js'
	},
	eagkigdnclikabndlojagifehppodooi: {
		name: 'LRT SEO Toolbar',
		file: 'img/red.png'
	},
	ebbdkledlkjpgbbmmopgbnnjmklnkcef: {
		name: 'Download Station',
		file: 'panel.html'
	},
	ebennojnciifnigfpjnagolafflmgilp: {
		name: 'Delinea Credential Manager',
		file: '48-icon-active.png'
	},
	ebgihmollhfickaopoldkikdnipmdemg: {
		name: 'PIP screen for html5 video',
		file: 'pip34.png'
	},
	eblbmdomppeajmpblgeppodbkfnonppc: {
		name: 'SEO META 1 COPY',
		file: 'js/font.js'
	},
	ebmngdnanegibbkmmihlonnoddhfooga: {
		name: 'BlueSales',
		file: 'built/0.chunk.js'
	},
	ecblfcmjnbbgaojblcpmjoamegpbodhd: {
		name: 'SP Editor',
		file: 'index.html'
	},
	eccidpbmllnjfhhnjhaaopeeldnlokbi: {
		name: 'QPush',
		file: 'images/ajax-loader.gif'
	},
	ecdbmkcphlholpojdglodopmlaficcji: {
		name: 'DSM Auto-Paste',
		file: 'resources/fonts/Ruda-Regular.ttf'
	},
	ecmjjdafjebhegfhjincbdhgfonpibfm: {
		name: 'Userpilot',
		file: 'sdk.js'
	},
	ecofkipcicjifkppbgnkaghcfofmpkia: {
		name: '跨境ERP助手',
		file: 'env.json'
	},
	ecokmcackgiahnhklacojckhjmgkgcdi: {
		name: 'Sebaran',
		file: 'assets/js/core.js'
	},
	edkgpjhfpfpgkohafpaliolcfnijnibh: {
		name: 'Online Dropshipping and Arbitrage',
		file: 'bundle.css'
	},
	edoiodnmpjehmemkkfmnefmkboeaahlf: {
		name: 'MOJi辞書',
		file: 'panel.html'
	},
	eeanibgekifamcnnieknbhjcoocnpipe: {
		name: 'コメント増量',
		file: 'lib/tf.js'
	},
	eediamimojgbnjfaalcnlonenfdcogop: {
		name: 'GRCRT',
		file: 'GrepolisReportConverterV2.user.js'
	},
	efdfjhpgndbmnbihmegnpkeeiabjmcoh: {
		name: 'Securden',
		file: 'images/logo16.png'
	},
	egbbninofojfeabmcanakgkkimghnjhc: {
		name: 'Redirecionamento Cálculo Seguradora',
		file: 'jquery.js'
	},
	egbeiaidfnjbliaaoijfcnopfopcnkbd: {
		name: 'Kwai Pixel Helper',
		file: 'inject.js'
	},
	egikgfbhipinieabdmcpigejkaomgjgb: {
		name: 'Feedly Notifier',
		file: 'images/icon128.png'
	},
	egmbomekcmpieccamghfgjgnlllgbgdl: {
		name: 'jira-helper',
		file: 'assets/content.ts-D49evxYf.js'
	},
	ehaanimekcjndnhnkojcckjcgalkfgee: {
		name: 'StudyBuddy',
		file: 'icon/screenshot-cursor.svg'
	},
	ehbnpceebmgpanbbfckhoefhdibijkef: {
		name: 'Privacy Sandbox Analysis Tool',
		file: 'data/PSInfo.json'
	},
	ehmpejjklcibliopgbghpgfinhbjopnn: {
		name: 'Moon',
		file: 'app.js'
	},
	ehoknmhmadiboejdbinglmbnlghnbldc: {
		name: 'Phia',
		file: 'popup.html'
	},
	eiejadjdcchfommckmikpcdnihljbpai: {
		name: 'Edit with Sublime Text',
		file: 'data/native/index.html'
	},
	eienihkhapninadhneligjdemdpkakme: {
		name: 'Zendesk QA',
		file: 'iframe.html'
	},
	ejjohjoianmepamafhpdbbaghdjkfeoe: {
		name: 'Translate',
		file: 'js/popup.js'
	},
	ejkboneafcafckbjhnfhehlcanejlgmc: {
		name: 'Fanberry',
		file: 'base.js'
	},
	ekpodilfhicbbljplepockanjjnndcai: {
		name: 'VPN for Discord',
		file: 'assets/icn.png'
	},
	eljbmlghnomdjgdjmbdekegdkbabckhm: {
		name: 'Dart Debug',
		file: 'debug_info.dart.js'
	},
	eljmjmgjkbmpmfljlmklcfineebidmlo: {
		name: 'Psono',
		file: 'data/js/web-accessible.js'
	},
	ellkdbaphhldpeajbepobaecooaoafpg: {
		name: 'ASI Alliance Wallet',
		file: 'blocklist.html'
	},
	elmpkhkdonhdbkeaigkblbgckcihahoc: {
		name: 'Gist AI',
		file: 'pdf.worker.js'
	},
	eloemnahbeeiekllcfeombpkokhinkpn: {
		name: 'Mayday',
		file: 'assets/style.css'
	},
	enejkfhimljloggnimhebadbjajhgkad: {
		name: 'Tella',
		file: 'graph.png'
	},
	enhnhpibeofnhkhcakhmlbmhplfjhnjd: {
		name: 'Instant Games',
		file: 'img/icon.ico'
	},
	enkmmegahkfbohjlnmmmkiicmhoglnne: {
		name: '小結',
		file: 'logo.png'
	},
	eopgniffanmbfaeadkhigcmonfdljldn: {
		name: 'OpenWallet',
		file: 'js/injectScript.js'
	},
	faieahckjkcpljkaedbjidlhhcigddal: {
		name: 'Aliexpress Dropshipping',
		file: 'assets/images/logo.png'
	},
	fbccnclbchlcnpdlhdjfhbhdehoaafeg: {
		name: 'InstaNote',
		file: 'logo.png'
	},
	fbhjaehnpccniaiedddkbdhgicmcmgng: {
		name: 'Visualping',
		file: 'img/icon.png'
	},
	fbjdfhinnhahheghjajajniekpnghdfa: {
		name: '淘宝购物助手极速版',
		file: '0648cd6c01951b3a123a.svg'
	},
	fbopfffegfehobgoommphghohinpkego: {
		name: 'Inspect CSS',
		file: 'icon-34.png'
	},
	fcekakhpgmlaihglgajajbceajnhlgfn: {
		name: 'Color Picker and Eye Dropper',
		file: 'images/clogo.png'
	},
	fchhipkldmfpfiocdoehmnnkcclmhbpg: {
		name: 'WA Contact Extractor & Groups Link Finder',
		file: 'assets/types-CFQlDXDB.js'
	},
	febaefghpimpenpigafpolgljcfkeakn: {
		name: 'IITC Button',
		file: 'jsview.html'
	},
	fedmdabgnkfghjplejeilojikdaopkpm: {
		name: 'Magictool AI',
		file: 'images/icon.png'
	},
	feflcgofneboehfdeebcfglbodaceghj: {
		name: 'Urban Ad blocker',
		file: 'executors/grok.js'
	},
	fehcbmngdgagfalpnfphdhojfdcoblgc: {
		name: 'Airtable web clipper',
		file: 'index.html'
	},
	ffondjhiilhjpmfakjbejdgbemolaaho: {
		name: 'VeWorld',
		file: 'index.html'
	},
	fgfiokgecpkambjildjleljjcihnocel: {
		name: 'Casper AI',
		file: 'close-small.51582dd7.svg'
	},
	fgkhimnkbaccbhigaeoggfbmggdidjjj: {
		name: 'Keyword Tracker',
		file: 'question.svg'
	},
	fheifbcbhmbfbebmidanhpeebappbfpd: {
		name: 'Ninja Adult Porn Blocker',
		file: 'blocked.html'
	},
	fhhnbmkllifmckbpacekbajjhhonakci: {
		name: 'HEIC to JPG Converter',
		file: 'assets/img/icons/logo-48.png'
	},
	fhiiiglcdobdeaenhmdlodmmjghhmeja: {
		name: 'Watch TV',
		file: 'manifest.json'
	},
	fiejnpolkeifcohdoehpckibdhgjalgo: {
		name: 'UAR_SKT',
		file: 'icon.png'
	},
	fifaampimdjablpkjapdjehjcfloecjp: {
		name: 'How Many?',
		file: 'images/info.png'
	},
	fifbkhhgkgphkjjnjkgdfknbkkgapnca: {
		name: 'Fanatical PC Game Price Comparison',
		file: 'topper.html'
	},
	fifmamcgakmdooafeplohbidenfjhmhm: {
		name: 'Fun Cursors',
		file: 'cursors/cute/1.cur'
	},
	fipadnnmmoiomfllhbbnhjnghopkgfpb: {
		name: 'Web Monitor',
		file: 'img/add.png'
	},
	fjfeeonbeiocojnpfboldpckcgcfknll: {
		name: '.torrent to Transmission',
		file: 'img/icon-large.png'
	},
	fjohbkcfdceimhfkdcbldnjgdjndnbeg: {
		name: '美编助手',
		file: 'img/qq.svg'
	},
	fkaokedhimpifhfadmgjpfjimkogdlcm: {
		name: 'Snippet Highlighter',
		file: 'images/close.png'
	},
	fkfaapnmfippddbeemjjbclenphooipm: {
		name: 'Stark Accessibility Checker',
		file: 'scan-illo.png'
	},
	fkhgpeojcbhimodmppkbbliepkpcgcoo: {
		name: 'MetaSuites',
		file: 'src/assets/images/ETH.png'
	},
	flacajjkcnlngpeapmnmignmjgddamah: {
		name: 'Jira Product Discovery',
		file: 'content.css'
	},
	fldcmoidjiplehfmbmhfdpmcgoacjhgc: {
		name: 'URL shortener',
		file: 'favicon.ico'
	},
	fldmohhnmnjloglcpmclkemepnogaplf: {
		name: 'M3U8 Downloaders',
		file: 'popup.js'
	},
	fmhbdohlogekfmknbhfpbeiphcldcfji: {
		name: 'Red Shield VPN',
		file: 'rsvcontent.js'
	},
	fmiefmaepcnjahoajkfckenfngfehhma: {
		name: 'Translate Man Plus',
		file: 'assets/js/main.js'
	},
	fodkehlogjohjggkggflokciallanhmo: {
		name: 'Visma LogBuy',
		file: 'icons/logo_white.png'
	},
	fogenijnedmmmofgaifofnihbalehpdg: {
		name: 'Từ điển tiếng Nhật JP',
		file: 'opencvHandler.html'
	},
	folgjbfgejcliggchmhbbbmdanjjpnai: {
		name: 'ChatTube',
		file: 'offscreen.js'
	},
	folnjigffmbjmcjgmbbfcpleeddaedal: {
		name: 'LogMeOnce',
		file: 'ui/ui.html'
	},
	fonaoompfjljjllgccccgjnhnoghohgc: {
		name: 'JetBrains Grazie',
		file: 'fonts/fonts.css'
	},
	fopaemeedckajflibkpifppcankfmbhk: {
		name: 'Alpine.js devtools',
		file: 'index.html'
	},
	fpbdcofpbclblalghaepibbagkkgpkak: {
		name: 'Lazy Scholar',
		file: 'infobar.html'
	},
	fpfgglfemmnflnmjminpghmeiajcajoi: {
		name: 'Libron',
		file: 'images/logo.png'
	},
	fplgihadlmhndfcccdojmblkdilfgkad: {
		name: 'DeepSeek to PDF',
		file: 'assets/css/Index.chunk.css'
	},
	gafchcnohalkhohnedifhjblhdhoppkg: {
		name: 'СуперКнопка от СберПодбор',
		file: 'content.css'
	},
	gahikeojfodidijbfjdfigekphlkcpjm: {
		name: 'MyCoub',
		file: 'js/gif/index.js'
	},
	gbcfdjgipmpinkahpiambcikjkijimhi: {
		name: 'Sapling AI Detector',
		file: 'assets/power.svg'
	},
	gbcidhndggjlgichmgddokokdfinjaop: {
		name: 'Gmail Email Thread Reverse',
		file: 'js/runtime/content.js'
	},
	gbdnkkaljjonpfgjhdfolnddpeecheak: {
		name: 'ShopLook Clipper',
		file: 'templates/events.js'
	},
	gbeiplkijfihbcieiihmeemjejohbiho: {
		name: 'Undetectable AI',
		file: 'off.ccead607.svg'
	},
	gbldofcpkknbggpkmbdaefngejllnief: {
		name: 'Midscene.js',
		file: 'static/wasm/9e906fbf55e08f98.module.wasm'
	},
	gbmplbdmlkcemkcocjoklgoajgbfilnf: {
		name: 'Hoyoverse Check-in',
		file: 'assets/index-D9nB_WGj.js'
	},
	gbnebpdekafhpcipejfhabfghccgfnbh: {
		name: 'ReClipped',
		file: 'help/index.js'
	},
	gccfnphpieojibjmnodiiobdapckkkfb: {
		name: 'Hamty.cz doplněk',
		file: 'favicon.png'
	},
	gdeceopaalhefhbplbibdcmjfkdmkggp: {
		name: 'Convert File',
		file: 'manifest.json'
	},
	gdhpobnkinppekiaabcndnleaejeddod: {
		name: 'Coupert Pure',
		file: 'css/font.css'
	},
	gdjldebhilhckhblmhklofdebemiahhi: {
		name: 'Enable UI3 Beta for Figma',
		file: 'src/format.js'
	},
	gdocioajfidpnaejbgmbnkflgmppibfe: {
		name: 'Easy Folders',
		file: 'browser.b1666d77.js'
	},
	gdokollfhmnbfckbobkdbakhilldkhcj: {
		name: 'Alephium Wallet',
		file: 'inpage.js'
	},
	gdppneahgoimmcphlekpanoekkefhjhc: {
		name: 'Lootup Deal Finder',
		file: 'icons/logo.png'
	},
	gecfhmlaldelfoeahjahajoooenmnlnd: {
		name: 'Download with FlashGet',
		file: 'data/grab/index.html'
	},
	gehplcbdghdjeinldbgkjdffgkdcpned: {
		name: 'Cookie Clicker Mod Manager',
		file: 'src/mainModLoader.js'
	},
	gfecljmddkaiphnmhgaeekgkadnooafb: {
		name: 'Summary with ChatGPT for Google and YouTube',
		file: 'logo.png'
	},
	ggbnpjdgbjkbcbohgcndmalbdenlfjcl: {
		name: 'Privacy Extension for WhatsApp Web',
		file: 'pics/icon.png'
	},
	gghlgcihlfpfbibgaffggbmidpfejbbb: {
		name: 'Alibaba search by image',
		file: 'assets/js/popup.js'
	},
	ggiihlkbikggfknjgbocmogobagckdpc: {
		name: 'URL Extractor',
		file: 'icons/16x16.png'
	},
	ggojliohohbachojmcgelnjmnjmjgidn: {
		name: 'Password Depot',
		file: 'icons/16.png'
	},
	ghabekkoaicdmfgggmocafcdllmdhamb: {
		name: 'Mindomo',
		file: 'images/icon-16.png'
	},
	ghdoangbdengbkokhihepcjgdkdogcdi: {
		name: 'Cashdo',
		file: 'images/16.png'
	},
	ghjakbehlhkjdiehaeffedomkakcenjo: {
		name: 'Browse.live Web Safety',
		file: 'notification.js'
	},
	ghnjojhkdncaipbfchceeefgkkdpaelk: {
		name: 'ESale',
		file: 'icons/home.png'
	},
	ghomhhneebnpahhjegclgogmbmhaddpi: {
		name: 'Flash Player EmuFlash',
		file: 'js/libs/ruffle/ruffle.js'
	},
	gieabiemggnpnminflinemaickipbebg: {
		name: 'CSS Scan',
		file: 'icon.png'
	},
	gjbbmdlgdiammllkjmpfmdjnbdllgjip: {
		name: 'Fullstar guide editor',
		file: 'iframe_content.html'
	},
	gjikiofhelajcmedmillinbcmhmjcnpe: {
		name: 'Shorts scroller, works with Youtube',
		file: '36YoutubeScroller.png'
	},
	gjkdbeaiifkpoencioahhcilildpjhgh: {
		name: 'Parti Wallet',
		file: 'dom.js'
	},
	gjlmehlldlphhljhpnlddaodbjjcchai: {
		name: 'Nautilus',
		file: 'src/extension/content-scripts/injected.js'
	},
	gjnhndokinnjflffkoppgkphkpipojgm: {
		name: 'WebBrush',
		file: 'images/eraser.png'
	},
	gjoimbbkllocghfkbjdfjeakcgnkglgd: {
		name: 'VisiOS',
		file: 'index.css'
	},
	gjponoohlplibjdnjnbnhbjljffpkkok: {
		name: 'CraftyCursor',
		file: 'css/fontawesome-webfont.woff'
	},
	gklhghenemaeogngbnjdheklnnonajoc: {
		name: 'Minea',
		file: 'assets/icon.png'
	},
	glclhpipfpfammoflcfnknnlddkgpdoe: {
		name: 'NaverCafe video downloader',
		file: 'icons/download_button.png'
	},
	glklbjgdbdmlmjomcdhmjjklkeoghihh: {
		name: 'Speak!',
		file: 'iframe.js'
	},
	gmechnknnhcmhlciielglhgodjlcbien: {
		name: 'SessionBox One',
		file: 'pages/frame.html'
	},
	gmgldnaadbkmkanlgdhohbfddgkhjfng: {
		name: 'Custom Progress Bar for YouTube',
		file: 'assets/content.css'
	},
	gmpconpjckclhemcaeinfemgpaelkfld: {
		name: 'Music Enhancer',
		file: 'assets/popup.css'
	},
	gneobebnilffgkejpfhlgkmpkipgbcno: {
		name: 'Death To _blank',
		file: 'lib/jquery-3.2.1.min.map'
	},
	gnpglhdhioifppkjdpmlmolgeanpaofi: {
		name: 'ZDialer',
		file: 'images/sms.svg'
	},
	gofbkgfgjgkmphjcfgbmdelmamlnhcnh: {
		name: 'Black Friday de Verdade',
		file: 'index.css'
	},
	gojmmkhaiojimnnjhhilmhjmhdbdagod: {
		name: 'Ad Library downloader',
		file: 'ig.js'
	},
	gplomcegacfeolmacnhpopbindboipfl: {
		name: 'Team Password Manager',
		file: 'img/key.png'
	},
	gpmgkanebgbahkpdkiamedclngmdbbdd: {
		name: 'AliExpress Business',
		file: 'src/public/ok.svg'
	},
	gpolcofcjjiooogejfbaamdgmgfehgff: {
		name: 'Web Scraper',
		file: 'pixel.gif'
	},
	haafigbapbpbpnmgcknnmilaaaimggpk: {
		name: 'FuseBase Assistant',
		file: 'assets/flex.css'
	},
	hamhaljjdpcgkelbadepgmnocknejief: {
		name: 'Grammar.com',
		file: 'popup.html'
	},
	hapcnpnopbmifahnnehfcncojejoiefn: {
		name: 'Tailored Notion',
		file: 'assets/popup.css'
	},
	hapgiopokcmcnjmakciaeaocceodcjdn: {
		name: 'ReCaptcha Solver',
		file: 'icons/icon.png'
	},
	hbbgbephgojikajhfbomhlmmollphcad: {
		name: 'Rise',
		file: 'inpage.js'
	},
	hblfamjdifnhiioifbfamlnkjfenhfed: {
		name: 'AI-Powered DealDazzle',
		file: 'inpage.js'
	},
	hbpkaaahpgfafhefiacnndahmanhjagi: {
		name: 'Kiosk',
		file: 'modules/CascadiaCode.woff2'
	},
	hcmiiaachajoiijecmakkhlcpagafklj: {
		name: 'ChatsNow',
		file: 'pay.html'
	},
	hdhclckbeelgahmklefjjnpmhbljhcmd: {
		name: 'Istoric Preturi',
		file: 'img/icon.png'
	},
	hdpfnbgfohonaplgnaahcefglgclmdpo: {
		name: 'Shopify Raise',
		file: 'img/tip.png'
	},
	hdpoplemgeaioijkmoebnnjcilfjnjdi: {
		name: 'LiveHosts',
		file: 'popup/popup.html'
	},
	hfajfpbjlmembfdlhakjmefnbhjddofb: {
		name: 'ION Wallet',
		file: 'provider.js'
	},
	hgajpakhafplebkdljleajgbpdmplhie: {
		name: 'Console Importer',
		file: 'assets/importer.js'
	},
	hgjcdbncdjkhpmdijaigkmgbkjecpopj: {
		name: 'YouTube Subtitle Dubbing and Web Page Reader',
		file: 'settings.css'
	},
	hhaepbijcbdhljbjocbilefdhnkngehp: {
		name: 'Screenshot',
		file: 'editor.html'
	},
	hhbnckjhjihjangdepdebbnooibiphge: {
		name: 'InterSub',
		file: 'main.js'
	},
	hhcnhfijbipicmidjbommlhmnehkocik: {
		name: 'Search & Chat AI',
		file: 'js/toolbar.js'
	},
	hhkifldlehcekplhapbconmjjmddpbdf: {
		name: 'HEXcolorPick',
		file: 'img/icon.png'
	},
	hhneckfekhpegclkfhefepcjmcnmnpae: {
		name: 'Companion Window',
		file: 'pip.css'
	},
	hhnhckmflikggaddmmcpgoehmnpnlglk: {
		name: 'Streak Mail Merge for Gmail',
		file: 'blank.png'
	},
	hifamcclbbjnekfmfgcalafnnlgcaolc: {
		name: 'Free Download telegram story',
		file: 'content-inject.js'
	},
	hjdcpbokggnjjmcmbmhkbkmibdekodmk: {
		name: 'Appcues+',
		file: 'static/open.html'
	},
	hjglipkneddkikocdjfhmnachfjoccjn: {
		name: 'WordUp',
		file: 'img/Knew.png'
	},
	hjkacojcnmnchcllgdfiepfjfplnofol: {
		name: 'Benable',
		file: 'iframe.html'
	},
	hlbaohedidomedckdalfaggpbcmnajdh: {
		name: 'CCDub',
		file: 'js/injected.js'
	},
	hlfkpachlhdpphhleifjkllcmklbaljp: {
		name: 'Write on PDF',
		file: 'icons/16x16.png'
	},
	hlkapcocmflflbmafddbicdnnmnpbfeg: {
		name: 'Verified First',
		file: 'src/app/tat.js'
	},
	hloenmdpelegipdbonkepcnbapniondo: {
		name: 'DealCloud',
		file: 'environments.js'
	},
	hmioicehiobjekahjabipaeidfdcnhii: {
		name: 'Inline Lingo Translator',
		file: 'icons/copy.svg'
	},
	hnjjdepbmnadojpcicgkiffnlpmbhkpn: {
		name: 'Spoon AI',
		file: 'icons/icon16.png'
	},
	hnlnjfenbaiflgkdncofionfhnhmoono: {
		name: 'Visual Web Scraper',
		file: 'main.js'
	},
	hohjiogaaddpcpakfaegfacbaggphald: {
		name: 'TextRecruit',
		file: 'iframe.html'
	},
	homkgeanmijgmjnompbahpmphaiflehl: {
		name: 'Convert webpage to PDF',
		file: 'content-scripts/content.css'
	},
	honncbpobidomdmanehocfaodmomdhie: {
		name: 'AI Translate',
		file: 'assets/logo.svg'
	},
	hpclkefagolihohboafpheddmmgdffjm: {
		name: 'Flow Wallet',
		file: 'script.js'
	},
	hpekbddiphlmlfjebppjhemobaopekmp: {
		name: 'PAGENOTE',
		file: 'index.html'
	},
	hpenfopogkamibjfobmdbdclpefokejk: {
		name: 'superReply',
		file: 'img/logo.png'
	},
	hpfndbeelpjpdgeaoknoeggagglgelhp: {
		name: 'Humanlinker',
		file: 'options.html'
	},
	iaalpfgpbocpdfblpnhhgllgbdbchmia: {
		name: 'Asciidoctor.js Live Preview',
		file: 'js/loader.js'
	},
	iaanigfbldakklgdfcnbjonbehpbpecl: {
		name: 'Habitica Pomodoro SiteKeeper',
		file: 'audio/Sound1.mp3'
	},
	iakojhpeaoimjhbaelkgbdahchckiieg: {
		name: 'Coquette Bows',
		file: 'images/bow.png'
	},
	ibahpmhifmnedoegjcgdcidnmnpnbgmp: {
		name: 'SmartVision',
		file: 'lib/iframe.html'
	},
	ibefjagfpcdefiapiapnhleogifimklb: {
		name: 'Equalizer',
		file: 'popup.html'
	},
	ibmhijpaejbhbhdddifhgpdogoapclgj: {
		name: 'Watch Movies Online',
		file: 'manifest.json'
	},
	icbjhddacebbblejjeanbacenkopkple: {
		name: 'Rewards Search Automator Old',
		file: 'style.css'
	},
	icblpoalghoakidcjiheabnkijnklhhe: {
		name: 'PIP',
		file: 'js/854.js'
	},
	icchadngbpkcegnabnabhkjkfkfflmpj: {
		name: 'Translator',
		file: 'js/core.js'
	},
	icfnljfpacimpcbpammmbclmhenimhfc: {
		name: 'ScTranslator',
		file: 'static/css/content.css'
	},
	ichmnigkjinmjedillldopaolidofben: {
		name: 'Findymail',
		file: 's_inj.js'
	},
	icllkfleeahmemjgoibajcmeoehkeoag: {
		name: 'Adyen Test Cards',
		file: 'data/ibans.json'
	},
	icpldamjhggegoohndlphlchjgjkdifd: {
		name: 'AI Copilot for Sheets',
		file: 'icons/close.svg'
	},
	idipjdgkafkkbklacjonnhkammdpigol: {
		name: 'Crowdly',
		file: 'src/styles.css'
	},
	ieclmcodiiodchgppgmdponbgpbfnbkj: {
		name: 'FindThatLead 2.0',
		file: 'xhr.js'
	},
	iefankigbnlnlaolflbcopliocibkffc: {
		name: 'Wavenet',
		file: 'assets/styles.css'
	},
	ieimachclakgpglmhafclnfklklomfeh: {
		name: 'Read Pronunciation',
		file: 'WinkTagger.js'
	},
	iejcbdponpipehjlchccknbmnkonnmji: {
		name: 'Kimi 阅读助手',
		file: 'tabs/sidepanel.html'
	},
	ifckdpamphokdglkkdomedpdegcjhjdp: {
		name: 'ONTO Wallet',
		file: 'icon16.png'
	},
	ifiaikfdhcagbagdeflffjdammidpbio: {
		name: 'Voicenter Contact Center',
		file: 'src/phoneEditModal.html'
	},
	ifoggbfaoakkojipahnplnbfnhhhnmlp: {
		name: 'Wizmage',
		file: 'eye.svg'
	},
	igbgibhbfonhmjlechmeefimncpekepm: {
		name: 'Pieces',
		file: 'index.html'
	},
	igcjdamjhkmdccbmbilbpabpofenchge: {
		name: 'iGive Button',
		file: 'fonts.css'
	},
	igiofjnckcagmjgdoaakafngegecjnkj: {
		name: 'Debug CSS',
		file: 'styles.css'
	},
	ihgfdecdmhcckcnlhgfciplpbpmmjmdl: {
		name: 'cxai',
		file: 'assets/images/dockLogo.png'
	},
	ihoajedonhepnplmfgdkdjohbmadckdk: {
		name: 'qTest Web Explorer',
		file: 'common/context.js'
	},
	ihphookhabmjbgccflngglmidjloeefg: {
		name: 'TSA',
		file: 'wa/mgknz.gif'
	},
	iiekfaemafmplemocgimeccahephhdgf: {
		name: 'VratnePenize.cz',
		file: '16x16.png'
	},
	iiljidcefnbhbpamageahhblhbbhhopm: {
		name: 'Twitch Live',
		file: 'images/icon.png'
	},
	ijdolajanhahfboifbajbgiofkmgkljn: {
		name: 'Tipli',
		file: 'serp.js'
	},
	ijfmjempkpegmlhcacclfckeimbfgabp: {
		name: 'Powerlead',
		file: 'vk.png'
	},
	ijkboaojikgaanlgigobkmbpnjgjljnc: {
		name: 'SpoPlus',
		file: 'assets/js/init.js'
	},
	ijppdlihjndajogkppnfohojdbpaaian: {
		name: 'Promptimize AI',
		file: 'index.html'
	},
	ikikpappoglnioaajmamaadkbbhghamg: {
		name: 'Blue Light Card',
		file: 'icon.png'
	},
	ilmoodhbpigjdbegjgocjildgajgmema: {
		name: 'Sound Booster VMax',
		file: 'assets/switcher.css'
	},
	imeedihedcjeieaokdpgandbgpjmadoh: {
		name: 'EnglishXYZ',
		file: 'icon.png'
	},
	imemciokfejbnonkkinhcdfigdilcllg: {
		name: 'EqualWeb Accessibility Checker',
		file: 'popup.html'
	},
	imhbnbhffmfkipopfgdbgbkhcmfelkjg: {
		name: 'WalterPicks League Sync',
		file: 'assets/js/root.BwofpW08.js'
	},
	indcipieilphhkjlepfgnldhjejiichk: {
		name: 'NoteGPT',
		file: 'logo.png'
	},
	indpljpndioefdhmhafebdcddigbogbn: {
		name: 'Privacy Tweaks',
		file: 'data/content_script/tweaks/font.js'
	},
	inhblbknkkniipjdaijonkmdmbndgdjl: {
		name: 'bestprice.com',
		file: 'app.css'
	},
	inledacgphbcoihlbhmnkkbkgmjldbbi: {
		name: 'Auto Clicker',
		file: 'popup.html'
	},
	ioimcileegaodabmbcnadppghhakneae: {
		name: 'MindPane',
		file: 'styles/print.min.css'
	},
	ioleaeachefbknoefhkbhijdhakaepcb: {
		name: 'Gloom Dark Mode',
		file: 'js/proxy.js'
	},
	ipafcflbnpkfahilfblbenfabkoaaiid: {
		name: 'URL Shortener for Amazon',
		file: 'assets/content.ts-CWTQ20qx.js'
	},
	ipfnfcbfkddglfeiplmmfkcidaeaenjk: {
		name: 'LKTips',
		file: 'dictionary.json'
	},
	jadkpbgjjkffbpijalbeoaacjppljnld: {
		name: 'DropKiller',
		file: 'src/assets/libs/chart.min.js'
	},
	jafhnonicoamhlkkpnmidenllpcccake: {
		name: 'Package Tracker',
		file: 'manifest.json'
	},
	jajoopnifcliapcngocgiidifkmboemc: {
		name: 'PS Utilities',
		file: 'options.html'
	},
	jbchhcgphfokabmfacnkafoeeeppjmpl: {
		name: 'vlayer',
		file: 'src/injected/js-api.js'
	},
	jbcklblmgdbpagndcggcjnhnoocibnmk: {
		name: 'Twitch Stats by Streams Charts',
		file: 'src/content-script/index.ts'
	},
	jbeooomlnkgbokicnpcabkpnacabjnbm: {
		name: 'Copy To Notion',
		file: 'ScreenCapture.js'
	},
	jbnammhjiplhpjfncnlejjjejghimdkf: {
		name: 'Anytype Web Clipper',
		file: 'iframe/index.html'
	},
	jcbfebakonmpfdgeflcomgpgefmbhlck: {
		name: 'Summary Box',
		file: 'main.css'
	},
	jcdheojflbakgpllgipljegddpfaofec: {
		name: 'Shop for a Cause',
		file: 'auth.html'
	},
	jdbliieklfhihjpmhhekcoldpcemlafj: {
		name: 'block site',
		file: 'data/interface/redirect.html'
	},
	jdepgjdjpmpjljfdcmnbjmafkbckkhko: {
		name: 'TradingView Strategy Finder',
		file: 'js/functions.js'
	},
	jdjbiojkklnaeoanimopafmnmhldejbg: {
		name: 'Copycat',
		file: 'copycat.js.map'
	},
	jdliiagcaloddeneiaofnaifmckpgccd: {
		name: 'Capacities',
		file: 'popup.html'
	},
	jdplopdpfhclmeobebhjcehomoofhfpg: {
		name: 'Autofill Taobao Tracking',
		file: 'assets/js/popup.js'
	},
	jebapbhanimlfnddnammimbopafiddkd: {
		name: 'Zia Search',
		file: 'js/ja.js'
	},
	jedldboappegkmmkkmgempjffkpbopcg: {
		name: 'Follower Exporter',
		file: 'injected.js'
	},
	jeebpgmphhagpecfiophljpkhncoajcg: {
		name: 'Pesticide',
		file: 'pesticide.min.css'
	},
	jefmonmbihnpfebehladbckmmfjncabp: {
		name: 'STUDY4',
		file: 'frame.html'
	},
	jejkgijkhbdnekbbdonkikkfdmlfmdol: {
		name: 'Email Finder',
		file: 'images/icons/icon_16_dark.png'
	},
	jekdojekbpnbboecmcokodmpgkkeogaj: {
		name: 'PromptBox',
		file: 'icon-128.png'
	},
	jfcmjbboehfdmgbhheahjlnoimbgfdbn: {
		name: 'Zapier Agents',
		file: 'central-logo.png'
	},
	jfcnoffhkhikehdbdioahmlhdnknikhl: {
		name: 'SnapTrans Translate',
		file: 'icons/copy.svg'
	},
	jfdlamikmbghhapbgfoogdffldioobgl: {
		name: 'Hana Wallet',
		file: 'contentInpageSui.js'
	},
	jfdnobinilkkcklfcailkeengkcgbnii: {
		name: 'SAP Enable Now, browser application recorder',
		file: 'manifest.json'
	},
	jffaiidojfhflballoapgofphkadiono: {
		name: 'eesel',
		file: 'box.png'
	},
	jfkaiopedjohkgccocjchpbpekbfnidc: {
		name: 'Link Grabber',
		file: 'libs/ratepop/rate-bad.png'
	},
	jgchgjafcgjngogbfljkiclifglkemgj: {
		name: 'CSGOFLOAT',
		file: 'listing.js'
	},
	jgcndlaikgkhpbcekabcmnfeiaelgaon: {
		name: 'MeetGeek',
		file: 'recorder.bundle.js'
	},
	jgmgecncmjklkabkejnjfgfkglapfgek: {
		name: 'Nightfall DLP',
		file: 'assets/google_logo.png'
	},
	jhajnkdohbhjfffcdlchmmicikobmiaj: {
		name: 'Sticker Mania',
		file: 'js/content.js'
	},
	jhcpefjbhmbkgjgipkhndplfbhdecijh: {
		name: 'Country Flag Fixer',
		file: 'assets/TwemojiCountryFlags.woff2'
	},
	jhebmnhkiibndelgcgpgcacgckcbaail: {
		name: 'AvaImport',
		file: 'index.html'
	},
	jhjpjhhkcbkmgdkahnckfboefnkgghpo: {
		name: 'toolbox',
		file: 'data/images/balloon.png'
	},
	jhkeieglkjflimimljpaenphjhkbcieh: {
		name: 'MyWallPaper',
		file: 'css/style.css'
	},
	jhmpcopkebhhagjfmobglpohomllacfd: {
		name: '구매대행 이미지 다운로더',
		file: 'logo.png'
	},
	jjeflhibndgkdaglkbdeiomkobggoipf: {
		name: 'CoreTax PDF Downloader',
		file: 'styles.css'
	},
	jjlelpahdhfgabeecnfppnmlllcmejkg: {
		name: 'Umbra Dark Mode',
		file: 'js/proxy.js'
	},
	jjplpolfahlhoodebebfjdbpcbopcmlk: {
		name: 'Nily',
		file: 'src/assets/logo.png'
	},
	jkennnbhkennnbeebfonckakbodfaldk: {
		name: 'Duden-Mentor',
		file: 'main.bundle.js.map'
	},
	jkmpbdjckkgdaopigpfkahgomgcojlpg: {
		name: 'Clear cache and cookies',
		file: 'images/48x48.png'
	},
	jlcdjppbpplpdgfeknhioedbhfceaben: {
		name: '퍼센티',
		file: 'Stop.svg'
	},
	jlkmjnjncpcplnajcbibddpkmbficecj: {
		name: 'Telegram Blur',
		file: 'css/name.css'
	},
	jlmkillmemkjkinffglnffekacoogndm: {
		name: 'LinkFox',
		file: 'js/popup.js'
	},
	jmbjlhnlibdfompahnfionljdfeeipdb: {
		name: 'Mais Barato PROTESTE',
		file: 'index.css'
	},
	jmdcpkpoebniclenaegfhbmlaadkgdhm: {
		name: 'Подборка-Туров.ру',
		file: 'css/tour-row.css'
	},
	jmefikbdhgocdjeejjnnepgnfkkbpgjo: {
		name: 'Material DevTools',
		file: 'assets/icons/Space.svg'
	},
	jmgdfadbljfhdjjkbofjnflaigadpdid: {
		name: 'YouTube Dark Mode',
		file: 'data/icons/disabled/32.png'
	},
	jmogjacildaeibcnaadplhciblohkiff: {
		name: 'Savvy',
		file: 'content.js'
	},
	jnffopdghacfibgkllcbgfnldclpnbbb: {
		name: 'OZONBIGSELL',
		file: 'icon/16.png'
	},
	jnjgljhkgipcggegpgfipdedpihbfgfn: {
		name: 'PLANERGY CheckOut',
		file: 'config/config.js'
	},
	jnkelfanjkeadonecabehalmbgpfodjm: {
		name: 'Goby',
		file: 'pageProvider.js'
	},
	joflojehbdajphljkcggpmajnoibdaio: {
		name: 'Email Extractor',
		file: 'injected.js'
	},
	joggkdfebigddmaagckekihhfncdobff: {
		name: 'Le Git Graph',
		file: 'js/authInject.js'
	},
	jojhfeoedkpkglbfimdfabpdfjaoolaf: {
		name: 'Polymesh',
		file: 'page.js'
	},
	jolajcnbcjbfmlkccdppfjpbnlfgejpn: {
		name: 'Google Sheets Dark Mode',
		file: 'styles/dark.css'
	},
	jonlhhmennanlmjjamfllhlcklggpjkj: {
		name: 'Rocketrip',
		file: 'assets/icon.png'
	},
	jpapacafnlibgcdaeaefjfeipibmdngh: {
		name: 'Qwintry Shophelp',
		file: 'scripts/md5.js'
	},
	jpkmkgajcahdjphlgkmkladhhighjmlk: {
		name: 'ImprivataPAM',
		file: 'js/injector.js'
	},
	kabbfhmcaaodobkfbnnehopcghicgffo: {
		name: 'CVR',
		file: 'setup.html'
	},
	kajbojdeijchbhbodifhaigbnbodjahj: {
		name: 'SimplyTrends',
		file: 'entry.js'
	},
	kaocoehllbimbaphfmhajjhegdmhjaib: {
		name: 'Browser Performance Monitoring',
		file: 'extensionWASM_1.0.54.0.wasm'
	},
	kbamkiopkpgmcdggnogblondddcgabji: {
		name: 'Saleshandy Connect',
		file: 'index.html'
	},
	kbhaffhbhcfmogkkbfanilniagcefnhi: {
		name: 'Jarvis AI',
		file: 'buildDomTree.js'
	},
	kbhgdbfkbgkokgkkdhnnlmkhnokjmfib: {
		name: 'JobWizard',
		file: 'js/iframe.js'
	},
	kbpfgmdeadapkkgjealalfgkmoaehiic: {
		name: 'Custom Cursor',
		file: 'assets/logo_32.png'
	},
	kchgllkpfcggmdaoopkhlkbcokngahlg: {
		name: 'DFTube',
		file: 'css/home.css'
	},
	kchocjcihdgkoplngjemhpplmmloanja: {
		name: 'IPBurger Proxy & VPN',
		file: 'icons/flags/ad.png'
	},
	kchofibfnlabofiejaeodpgnhhcajjlj: {
		name: 'YouLearn',
		file: 'public/logo.png'
	},
	kcijjmomofpdcpeiagibojhjifhegepj: {
		name: 'flomoplus',
		file: 'js/inject.js'
	},
	kcjeghjjjjdpeaoemlhdhnbbkpgncpfc: {
		name: 'Dedalium',
		file: 'icons/icon_1.png'
	},
	kcjkmcmcpompphkoaokebhhhindnfpnp: {
		name: 'Vento',
		file: 'favicon.png'
	},
	kdamfjkjgaidaigdfelkpgdnbigclccc: {
		name: 'Lingvanex',
		file: 'frame/popup.html'
	},
	kddaagffkajgikddjngfbfblhcgmmlid: {
		name: 'Friend Maker',
		file: 'popup.html'
	},
	kdfngfkkopeoejecmfejlcpblohnbael: {
		name: 'CpyOnSlc',
		file: 'Res/copied.svg'
	},
	kdnllijdimhbledmfdbljampcdphcbdc: {
		name: 'Professor Prebid',
		file: 'app.html'
	},
	kdojjbmaidnebdjancpcgajkgeboebpe: {
		name: 'Guestbook',
		file: 'templates/images/logo.png'
	},
	kdpbamlhffmfbgglmaedhopenkpgkfdg: {
		name: 'Eztrackr',
		file: 'css/script.css'
	},
	kennjipeijpeengjlogfdjkiiadhbmjl: {
		name: 'PWR Wallet',
		file: '1x1.png'
	},
	kfdniefadaanbjodldohaedphafoffoh: {
		name: 'Typhon Wallet',
		file: 'assets/typhon.png'
	},
	kfidecgcdjjfpeckbblhmfkhmlgecoff: {
		name: 'Svelte DevTools',
		file: 'courier.js'
	},
	kfjafldijijoaeppnobnailkfjkjkhec: {
		name: 'WA Contacts Extractor',
		file: 'assets/du.js'
	},
	kfkcgdiimmaafjbljhbjejocjignnajn: {
		name: 'CharityTree',
		file: 'js/helper.js'
	},
	kfmlkgchpffnaphmlmjnimonlldbcpnh: {
		name: 'TimeYourWeb',
		file: 'popup.html'
	},
	kgekdppfhdacjmnogfkklnljiglcphip: {
		name: 'Font Inspector',
		file: 'data/content_script/resources/popup.css'
	},
	kghbmcgihmefcbjlfiafjcigdcbmecbf: {
		name: 'heylogin',
		file: 'page.js'
	},
	kgmjjkfjacffaebgpkpcllakjifppnca: {
		name: 'Adobe Experience Cloud Visual Editing Helper',
		file: 'assets/hold.js'
	},
	khafmmhhbaabgdjdhnjkcfbfhadioocp: {
		name: 'ShopifyHunt',
		file: 'img/tip.png'
	},
	khggnjoomjjihbjjkpbhmpelgcdodjpj: {
		name: 'Storytell',
		file: 'content-scripts/text-selection.css'
	},
	khjgklaeknnibmeeanmbfjcnjablcpil: {
		name: 'Recent Tabs',
		file: 'img/ext_icons/icon-48.png'
	},
	khpdiolbjggapokjloppdibgapcfkojd: {
		name: 'Enable Right Click & Copy',
		file: 'options.html'
	},
	kigfbkddbfgbdbdekajodpggpkpfdjfp: {
		name: 'Prompt Perfect',
		file: 'auth_error.html'
	},
	kijmncepdjeabghcjppndcgbogkfhbje: {
		name: 'TG Content Downloader',
		file: 'index.html'
	},
	kjdgcemdlnbdohbcmnamlnnfkjoijfol: {
		name: 'Whering',
		file: 'index.css'
	},
	kjfmmgpfhdohhcodbkaodgkidbenkgog: {
		name: 'NFC Reader',
		file: 'ufr_content.js'
	},
	kjgenhkjjjldgneijakjlhdfkmjmedbj: {
		name: 'Chrome Step ToolBox',
		file: 'step1.json'
	},
	kjlbbjicboihbikbjbbmkimccoeccoon: {
		name: 'Copy History +',
		file: 'sounds/1_bloop.mp3'
	},
	kjmhgpfnhmjgohbjmdnogcdfocihnahg: {
		name: 'Shopee选品助手',
		file: 'popup.css'
	},
	kjmnmnfcpbmimkdomkfifidfhpihgbne: {
		name: 'Zingy Reader',
		file: 'images/Jcrop.gif'
	},
	kkgpdmegkhdheglikjleejknplhdpbck: {
		name: 'Video Blocker',
		file: 'img/icon.png'
	},
	kkjfobdnekhdpmgomkpeibhlnmcjgian: {
		name: 'website broken link and 404 error checker',
		file: 'icon/icon128.png'
	},
	klfkmphcempkflbmmmdphcphpppjjoic: {
		name: 'Avatar Maker Studio',
		file: 'icons/icon-16.png'
	},
	kljkjamilbfohkmbacbdongkddmoliag: {
		name: 'telegram downloader',
		file: 'main.js'
	},
	klokphhomfboclhpijjcgbpdjoccaagc: {
		name: 'Flash Copilot',
		file: 'insert.js'
	},
	klopcieildbkpjfgfohccoknkbpchpcd: {
		name: 'TypeScan What Font Finder',
		file: 'css/content.css'
	},
	kmdgaoalcjcefbgaiookdaigjeepoldf: {
		name: 'AnswersAi',
		file: 'img/icon.png'
	},
	kmfmeaiiknkodohkpnnjmldipbilojma: {
		name: 'Alibaba Downloader',
		file: 'popup-init.js'
	},
	kmijeangnajdcaomdfjohhbmnbhnhjjd: {
		name: 'Pinbox',
		file: 'save.html'
	},
	kmmpkhpajpecmpdmmbpjmkmcmfdahkcj: {
		name: 'Price.com',
		file: 'img/icon.png'
	},
	kmnlmpjaimmhjobjklicabkfmjfpnjhh: {
		name: 'PocketOptionRobot',
		file: 'img/svg/po.svg'
	},
	kmpjiibmaciallljhjabcfbhdbhcebhm: {
		name: 'EasyYa',
		file: 'css/popup.css'
	},
	kobncfkmjelbefaoohoblamnbackjggk: {
		name: 'YouTube to NotebookLM',
		file: 'icon/4.png'
	},
	kofcedljghienfpkfmdaadpafepbhifl: {
		name: 'Baxter',
		file: 'assets/css/main.css'
	},
	kofkhnkdmpbngifdgbjeedlppjilcaei: {
		name: 'GigaBrain',
		file: '60.png'
	},
	kokedonacomdbdeokjgkhhoacmpjhdnb: {
		name: 'ZeeDrop',
		file: 'script.js'
	},
	kpcbjghknfclbkejkdllpjhhheppaoca: {
		name: 'zkPass Schema Validator',
		file: 'manifest.json'
	},
	kpeiaadmoncdloljkoeeppndaaomafnb: {
		name: 'Translate',
		file: 'icons/copy.svg'
	},
	kpjdchaapjheajadlaakiiigcbhoppda: {
		name: 'ZBD',
		file: 'app/nostr-provider.js'
	},
	lbcbipoloacjakecofjkohgllhojdhhp: {
		name: 'Talent',
		file: 'video/video.html'
	},
	lbecioncobbndebbfdopnpinnibemoon: {
		name: 'Navattic',
		file: 'static/index.html'
	},
	lbeieofginbjinflccjechojbmlbcdjj: {
		name: 'Programa Web Clipper',
		file: 'clipper.html'
	},
	lbfjfamhbgbaldijoohdfbdfkgmpdbni: {
		name: 'TVD',
		file: 'popup.js'
	},
	lbmokfklpmlklngnbmfiafnaoncadldc: {
		name: 'Secure Shield by Secure Shell',
		file: 'img/icon16.png'
	},
	lcgpdbficokndjodlcgflbhaibicompp: {
		name: 'GPT-Prompter',
		file: 'history.html'
	},
	ldampcdnpgokadoofhhdjjklcfoiplbh: {
		name: 'Charlize',
		file: 'images/flagbe.png'
	},
	ldfcglbfhoiicnnidjcjiialjjcbhllg: {
		name: 'Web Guard Plus',
		file: 'css/ntabmin.css'
	},
	ldhkneiheabejbefhgjddpamijajabmm: {
		name: 'StatsHunters',
		file: 'statshuntersRouteOverlay.js'
	},
	leamnhmoommgnllbfchimmjblecjgoad: {
		name: 'Amazon Quick View',
		file: 'icons/icon-16.png'
	},
	lefbdkondfcnlfplglcnjjncgdficmhc: {
		name: 'SiteAnalyzer SEO Tools',
		file: 'graph.html'
	},
	lekngdckcfhbhnalcglagkfjaeckabfn: {
		name: 'Skillwise.ai Proctoring',
		file: 'js/sources.js'
	},
	lfabkiipmidkmhplochgpbaeekjjfbch: {
		name: 'SN Utils Onprem',
		file: 'inject.js'
	},
	lflhpoaghkcebhmikolpdhdikknpmbod: {
		name: 'Pi Reminder',
		file: 'index.html'
	},
	lhaopfkppdccofghkhiijjjbakjeblgp: {
		name: 'airmiles',
		file: 'assets/css/popup.chunk.css'
	},
	lhkaiconcchjcnnikjdphljgfpjelpnj: {
		name: 'Avro',
		file: 'js/main.js'
	},
	lilckelmopbcffmglfmfhelaajhjpcff: {
		name: 'Anything Copilot',
		file: 'js/bg.js'
	},
	ljfdccdjpfjpfjbpdiihanpodilolofh: {
		name: 'Pause',
		file: 'html/menu.html'
	},
	ljfjnlcnpmabfcgcmffkmgainghokdpl: {
		name: 'Burning Vocabulary',
		file: 'dashboard.html'
	},
	ljobcbehhifehkmamikmchekbbljopao: {
		name: 'ICS2GCal',
		file: 'snackbar.js'
	},
	lkennebljmnnpimcgdjlocbncpamgipp: {
		name: 'Bearly.ai',
		file: 'google.99cd0dab.svg'
	},
	lkfaknngnekohfmljebdikgefjfhkgkp: {
		name: 'GlossaryTech',
		file: 'main.css'
	},
	lkignmdgfllplgaabepannhkjbenhmak: {
		name: 'ZClickToCall',
		file: 'static/js/inpage.js'
	},
	llflfcikklhgamfmnjkgpdadpmdplmji: {
		name: 'Mokku',
		file: 'js/inject.js'
	},
	llindcahmibpekmcgchfjlnpljjeeeoe: {
		name: 'コンテキストガジェット',
		file: 'images/border.png'
	},
	llllflgakifpdcmoanonghipldcpaggn: {
		name: 'Webex Calling',
		file: 'assets/tooltip.png'
	},
	llodbjghkcfegnhbggjllfoeombjjdhe: {
		name: 'Matador.ai',
		file: 'img/logo-13.png'
	},
	llojfncgbabajmdglnkbhmiebiinohek: {
		name: 'ChatGPT',
		file: 'assets/js/index.e83da286.js'
	},
	lmgdfnogocfflibblgddikbdncebighm: {
		name: 'SUSCHEGG Unlocker',
		file: 'icons/icon-512.png'
	},
	lmgpiaemoiikocplohpngneppgfmphfh: {
		name: 'DealDrop',
		file: 'assets/string-52dbe240.js'
	},
	lmmjippldopejmpalgcinbgmmjaikcch: {
		name: 'Savier',
		file: 'main.js'
	},
	lmppdpldfpfdlipofacekcfleacbbncp: {
		name: 'Jump Cutter',
		file: 'chunks/22.js'
	},
	lnnnmfcpbkafcpgdilckhmhbkkbpkmid: {
		name: 'Koala Wallet',
		file: 'dist/injected.js'
	},
	loedohmkociaomkgggggnoogiahfinme: {
		name: 'Augnito',
		file: 'images/Logo.png'
	},
	lofnjlciokhgalebinnlfhkicepmmceh: {
		name: 'BBViewer',
		file: 'assets/index-cce0fb26.js'
	},
	lpepilhibhaofjfjaikofinbbjcnhpfk: {
		name: 'Progressive Shopper',
		file: 'index.html'
	},
	lpfegdkicphlldcdfeomhdochopplghk: {
		name: 'Fontstorage',
		file: 'img/copy.svg'
	},
	lpilbniiabackdjcionkobglmddfbcjo: {
		name: 'Keeper',
		file: 'inpage.js'
	},
	lpmlfjjccfdcnfplffgcmnkaafcigoil: {
		name: '比價狗',
		file: 'js/main.js'
	},
	lpnhifgofkablmicbhngmdmjmajgcced: {
		name: 'AliSold卖家助手',
		file: 'popup.css'
	},
	maalhdjdholkapibniiddlgkddigiooj: {
		name: 'TrustPlugin',
		file: 'includes/system.js'
	},
	madmbegfpbmnngkiappcjgighagdggid: {
		name: 'smrtPhone.io Chrome Dialer',
		file: 'icon_16.png'
	},
	maogiolhkdhjobnlobpkcpnmamnmilno: {
		name: 'مدرستي بلس',
		file: 'js/minfo.js'
	},
	mbfnbhfjnjeedaknilkfegfnnmmmmpmn: {
		name: 'Calculator',
		file: 'assets/icon-min.svg'
	},
	mbheeaapbjpckahhciogfdodofjjldem: {
		name: 'Moonbounce',
		file: 'assets/servers-0295e06d.js'
	},
	mbhjcnabhdgkfaobjclmgifoeemcnoio: {
		name: 'PredictionHealth Sidekick',
		file: 'dist/images/loading.svg'
	},
	mbklgpngoohbbagagdfoccaclpdhgihd: {
		name: '爱搜资源助手',
		file: 'css/index.css'
	},
	mcfncmgpoefggbpeloigfonenlmamgjf: {
		name: 'Tab Manager',
		file: 'assets/content.css'
	},
	mcjihhgddailfldjgkjjokalgmhidmnm: {
		name: 'Promptalot Helper',
		file: 'js/paApp.js'
	},
	mcldgfkcaapkhccpbhjjchamjfbpbgcp: {
		name: 'Importify',
		file: 'icons/btn.png'
	},
	mdaaadlpcanoofcoeanghbmpbdbhladd: {
		name: 'DeepSRT',
		file: 'lib/full.js'
	},
	mdhellggnoabbnnchkeniomkpghbekko: {
		name: 'Page Manipulator',
		file: 'receiver.js'
	},
	mdoelcifdkcimkdbfkjjnedabmjlkokc: {
		name: 'Video Image Control',
		file: 'help.html'
	},
	mdplmiioglkpgkdblijgilgebpppgblm: {
		name: 'BrowserStack Bug Capture',
		file: 'popup.html'
	},
	mejjgaogggabifjfjdbnobinfibaamla: {
		name: 'SidebarGPT',
		file: 'chat.js'
	},
	mekddbdjhjmlapihhjlekijamjiakcdk: {
		name: '玻尔 Copilot',
		file: 'contents.04ff201a.js'
	},
	meppipoogaadmolplfjchojpjdcaipgj: {
		name: 'WA Number Checker',
		file: 'assets/du.js'
	},
	mfdjdcehbbppoogkamldmbihomamhmca: {
		name: 'Search Obituaries',
		file: 'manifest.json'
	},
	mfdlhoackihplokjehpiiffnedbeokod: {
		name: 'AIR MATH',
		file: 'tutorial.f0ac83f2.gif'
	},
	mgoefoagpgnjkgnfcpkgpnccgnocpoeo: {
		name: 'HunterSales',
		file: 'icon16.png'
	},
	mhmpepeohaddbhkhecaldflljggicedf: {
		name: 'Salesforce Interactions SDK Launcher',
		file: 'debugger.html'
	},
	mhncgbfifjnhlilpnccgbimimkjejada: {
		name: 'GoTranslate',
		file: 'icons/512.png'
	},
	miefikpgahefdbcgoiicnmpbeeomffld: {
		name: 'Blackfire Profiler',
		file: 'toolbar.html'
	},
	miepjgfkkommhllbbjaedffcpkncboeo: {
		name: 'Dyslexia Friendly',
		file: 'fonts/OpenDyslexicMono-Regular.ttf'
	},
	mijpgljlfcapndmchhjffkpckknofcnd: {
		name: 'Gopeed',
		file: 'assets/icon.png'
	},
	mimlajjiaebnfdbbcgjekdkkgjgoinkk: {
		name: 'Textune',
		file: 'modules/ext1-linker/linker/settings.json'
	},
	mjgkpalnahacmhkikiommfiomhjipgjn: {
		name: 'Reef Chain',
		file: 'page.js'
	},
	mkdjegdakgimmckobdnfiimhgmabbido: {
		name: 'Simple Data Layer Viewer',
		file: 'inject.js'
	},
	mkpoonlmiaknmcdcmdhbnehhglndcolf: {
		name: '6sense',
		file: 'pendo.js'
	},
	mlbgnlemejoeocmncpolejmdbimkoiol: {
		name: 'Barracuda Chromebook Security',
		file: 'block.html'
	},
	mlkgonfgckifcicdldcjkpbjfdmpdhad: {
		name: 'Hix',
		file: 'icons/cross.svg'
	},
	mlkjjjmhjijlmafgjlpkiobpdocdbncj: {
		name: 'ChatGPT for Google',
		file: 'js/sw.js'
	},
	mlkplhocljobcbmokjlehlminmnfaddn: {
		name: 'Exa RIS/PACS Multi-monitor',
		file: 'favicon_16.ico'
	},
	mlnpcceaeigcohdpaddmkllbgnkgeoed: {
		name: 'MyAwin',
		file: 'img/app/awin.png'
	},
	mmdmglmkoblcdgndchbohenfoglomjfk: {
		name: 'SEOwallet',
		file: 'tabs/demo.html'
	},
	mmjbociiiafjimjiddoegfljjomglfoc: {
		name: 'AliCompare',
		file: 'images/magnifier.png'
	},
	mnfkepfkbemjhmpijcepabfhkldegbga: {
		name: 'Affinity Pathfinder',
		file: 'pageWorld.js'
	},
	mnkjlpcdfdkekiojedblbhfobachjoof: {
		name: 'Flash Kart',
		file: 'css/css2.css'
	},
	mnldnbhgfocmkehnlkeanlhfmopepnko: {
		name: 'YtcFilter',
		file: 'setup.js'
	},
	mnmnmcmdkigakhlfkcdimghndnmomfeo: {
		name: 'Anti Anti Debug',
		file: 'content.js'
	},
	mnplmcgaklbhpennjinecnkjpedmfejc: {
		name: '品聘插件',
		file: 'css/versions/v1/default/lpt.css'
	},
	momjomajgginjihadffjamkianflepdp: {
		name: '3D Street View',
		file: 'manifest.json'
	},
	mpebbageafacikpcpinonhfbkbpfhipn: {
		name: 'Canva Automation',
		file: 'ijsource.js'
	},
	mpfgfcgaecedikelhdfgjknikdhfdbhb: {
		name: 'TopCash',
		file: 'images/16.png'
	},
	mpfhimfooelblffmiddjmpnpndeldikg: {
		name: 'Screenshot to Text',
		file: 'ocr.html'
	},
	mphkdfmipddgfobjhphabphmpdckgfhb: {
		name: 'Obsidian Clipper',
		file: 'lib/clip.js'
	},
	mpjeakdcffkpmcfamnmbjggejmanckho: {
		name: 'Zecento',
		file: 'script.js'
	},
	mpnckpmpddjcgkpjkmmakcamjhceadne: {
		name: 'AntiRickRoll',
		file: 'warn/warn.html'
	},
	nbccjeeblefkmoohdiipbghgikopimnd: {
		name: 'Ezoic',
		file: 'src/consts.js'
	},
	nbdlmbalmemeafnibbnjbddkclefkkkn: {
		name: 'QNB eSolutions',
		file: '128.png'
	},
	nbfhegiidojdmnahegkphdoabohfmoof: {
		name: 'yomichan',
		file: 'img/icon.png'
	},
	nchidjaafkcjdgdbbdpkpokodiehhcdg: {
		name: 'ReadPaper Importer',
		file: 'content-script/style.css'
	},
	ncjkkfbddfkkemiejpfdgjcifjmbcloc: {
		name: 'Font Identifier',
		file: 'img/tag.png'
	},
	nckcbkihecjfcdddhgkpobnpahgjjojn: {
		name: 'Web Downloads For Instagram website',
		file: 'js/story.js'
	},
	ncncagnhhigemlgiflfgdhcdpipadmmm: {
		name: 'FB AIO',
		file: 'scripts/popup/main.js'
	},
	nddfhonnmhcldcbmhbdldfpkbfpgjoeh: {
		name: 'Screen Reader',
		file: 'src/content/audio.js'
	},
	negakbijaemdgbhklopmghphgaeadmpo: {
		name: 'Chromoji',
		file: 'data/images/icon-16.png'
	},
	nennaecdimadgdlboiianfpidnnhncjj: {
		name: 'OKIOCAM Time-Lapse',
		file: 'ffmpeg/ffmpeg.wasm'
	},
	nepihmimcmflogaoaejjoeodldogidjk: {
		name: 'SYF Apty Client',
		file: 'config.json'
	},
	nfbacikojbiejmiioolkbolofiegidda: {
		name: 'RoFinder',
		file: 'foundAudio.mp3'
	},
	nfdhjpliieckopfcpeglebihglikgojn: {
		name: 'Debrid-Link',
		file: 'player.html'
	},
	nffjckgmpigfpkmamacllkakieaphfnm: {
		name: 'Viio',
		file: 'assets/index.ts-D0XEDFsx.js'
	},
	ngdjlkacliphopkcgcffflancnlbebnc: {
		name: 'RevDriver',
		file: 'index.html'
	},
	ngigoeagdgecjjbmielklflkmnlnddop: {
		name: 'SandVPN',
		file: 'logo192.png'
	},
	ngmmnefnjobcdhhodadfhbnkhfcpjjhd: {
		name: 'Amazon Dark Mode',
		file: 'src/images/icon128.png'
	},
	ngnfcfdjhdkiohcmiakmjkjlfgigopob: {
		name: 'Fitkun Batch Download Image',
		file: 'handler.html'
	},
	nhhldecdfagpbfggphklkaeiocfnaafm: {
		name: 'Password Manager',
		file: 'src/images/orca-18.png'
	},
	nhildbfbblldjpmlhopajgbcfjcepcoe: {
		name: 'MemeRadar',
		file: 'images/ico_x.png'
	},
	nhpjggchkhnlbgdfcbgpdpkifemomkpg: {
		name: 'Ajax Modifier',
		file: 'iframe/index.html'
	},
	nidnkjmnncelpfjholeonlbclfkgngcg: {
		name: 'CAVA',
		file: 'images/icon-copy.png'
	},
	ninanjeenomfmcihkpoaelaoddaboica: {
		name: 'Random',
		file: 'img/icon.png'
	},
	njimencmbpfibibelblbbabiffimoajp: {
		name: 'TotalPass',
		file: 'src/images/icons/blank.png'
	},
	njlppnciolcibljfdobcefcngiampidm: {
		name: 'Amazon Reviews Exporter',
		file: 'public/icons/icon-16.png'
	},
	nkabooldphfdjcbhcodblkfmigmpchhi: {
		name: 'Pinterest Love',
		file: 'grid/grid.html'
	},
	nkcelicpnkfoljdjomhgialiopkchkpm: {
		name: 'SocialGood',
		file: 'images/new/mail.svg'
	},
	nldojjdlhkfalipikhhnhhidfhgoopig: {
		name: 'Subtly',
		file: 'training-hint.mp4'
	},
	nlgmicoooapgmaaplbkjnhjbeojeoaha: {
		name: 'Volume Booster',
		file: 'assets/popup.css'
	},
	nlhaleloflnhpemagojabiikkkejjlgp: {
		name: 'Mettl Proctoring',
		file: 'assets/tick.png'
	},
	nlpnopimcnncncmmjdijebhlmkfandpl: {
		name: 'Time Tracker',
		file: 'auth.html'
	},
	nmaekpmealpjglikpijiegglabclhefp: {
		name: '夸克',
		file: 'qk-content.css'
	},
	nmejbbhnolhkmecdmippejfondppbgen: {
		name: 'Zoho Mail Bookmarks',
		file: 'src/pages/popup/index.html'
	},
	nmidcdbnmhggenoknphfaanmphbbfkid: {
		name: 'RevROI',
		file: 'src/browser_action/browser_action.html'
	},
	nnaaobbghcgbefbkhinikgdolfkgnhfj: {
		name: 'Pro Sender',
		file: 'js/inject.js'
	},
	nnbklmljghpjjibbnialdmiogbjohlod: {
		name: 'Website Destroyer',
		file: 'img/cur.png'
	},
	nnbpmneplkfgkmjmdicnhngallnbmcef: {
		name: 'SuiteFiles',
		file: 'popup.html'
	},
	nnhifpoojdlddpnhjbhiagddgckpmpfb: {
		name: 'Pixel Perfect Pro',
		file: 'runtime.js'
	},
	nnpflimcjgcocialildlehejbmmmlkno: {
		name: 'Zoho BluePencil',
		file: 'properties.json'
	},
	nolibfldemoaiibepbhlcdhjkkgejdhl: {
		name: 'WAContactSaver',
		file: 'assets/wa.js'
	},
	npaagbeceoeomlblpmcpfbeakmpgdpnl: {
		name: 'Logi Weather',
		file: 'options.html'
	},
	npapojppkmfhefbokolngnomlgkkpcnc: {
		name: 'Website Ranking and SEO Checker',
		file: 'popup.html'
	},
	npcfccjbkefemjkfogefnhojohpdjflg: {
		name: 'Scrab.in',
		file: 'parser.js'
	},
	npehdolgmmdncpmkoploaeljhkngjbne: {
		name: 'NetSuite Field Finder',
		file: 'fieldfinder.js'
	},
	nphnhlhdlbonnekhjlmphinfnmekiifk: {
		name: 'Invisible scrollbar',
		file: 'img/smile.png'
	},
	oadkgbgppkhoaaoepjbcnjejmkknaobg: {
		name: 'DetectGPT',
		file: 'images/ai32.png'
	},
	oahjfinghkkolgfkbfanpmhpiafmnepn: {
		name: 'Swordfish AI',
		file: 'frame.html'
	},
	obghampgaenjefbchkhkhbkdimjhgnjk: {
		name: 'Pop in Hotel',
		file: 'images/close26.png'
	},
	obiomemfgclpnflokpjjfokafbnoallb: {
		name: 'Spotify Ad Blocker',
		file: 'bg.js'
	},
	ocgghcnnjekfpbmafindjmijdpopafoe: {
		name: 'Selocity',
		file: 'index.html'
	},
	ocjobpilfplciaddcbafabcegbilnbnb: {
		name: 'XPLA Vault Wallet',
		file: 'inpage.js'
	},
	odibekjfjfdkobinlcghejhjgbbeegon: {
		name: 'SafetyNet GO',
		file: 'config/envconfig.json'
	},
	odinmjjdainghmojdffgpjmkefajhlbn: {
		name: 'Dubble',
		file: 'nunito.ttf'
	},
	oedcflfijnmdnkllbeoacabinnlgplmb: {
		name: 'Video Speed Controller',
		file: 'assets/messages-BTt0Firn.js'
	},
	oefooeopdahbeimdgamlblnpegijmdem: {
		name: 'Fast OCR',
		file: 'ocr.html'
	},
	oehppfijdgkgmfjnecnliihfdepegejk: {
		name: 'Bulk File Downloader',
		file: 'jszip.min.js'
	},
	ofidhibmldckbehmlhliopoikmaocoma: {
		name: 'G Business Explorer',
		file: 'cframe.html'
	},
	ogonnpiabgolmonfpfbnkbjkaljgkeok: {
		name: 'Unblock YouTube',
		file: 'offscreen-view.html'
	},
	ohdkdaaigbjnbpdljjfkpjpdbnlcbcoj: {
		name: 'FocusShield Site Blocker',
		file: 'css/block.css'
	},
	ohipjedcccbnmbmnadcgpakeebpcdpgb: {
		name: 'RoSaver',
		file: 'load.js'
	},
	oiecpgbfcchalgdchgoplichofjadhmk: {
		name: 'History & Cache Cleaner',
		file: 'img/info.svg'
	},
	oiedehaafceacbnnmindilfblafincjb: {
		name: 'BugBug Automation Testing',
		file: 'overlay.js'
	},
	ojbcfhjmpigfobfclfflafhblgemeidi: {
		name: 'Glow',
		file: 'realms/inpage.js'
	},
	ojecmeaghlcaiekkffhblonfnlcbepbl: {
		name: 'Công cụ đặt hàng Naipot',
		file: 'site.js'
	},
	ojiighldhdmahfdnhfdebnpmlbiemdfm: {
		name: 'Access Assistant',
		file: 'app.js'
	},
	okanoajihjohgmbifnkiebaobfkgenfa: {
		name: 'ChatGPT Toolkit',
		file: 'images/ai.png'
	},
	okckmdcaaieknndlpbpjjnfmbakdjnbe: {
		name: 'Cookie Manager',
		file: 'contentScript/style.css'
	},
	okdollcfhjnnclfiphoioajnjoaplilm: {
		name: 'OKIOCAM Live',
		file: 'assets/resolutions.json'
	},
	okekkfbjgdmfmogicbhdechdmkfhfphc: {
		name: 'Teamwork.com',
		file: 'images/plus.svg'
	},
	okpadhgilncoodafepkdmlneojcehclf: {
		name: 'DivMagic',
		file: 'blockRegistration.bundle.js'
	},
	olafhgbhkkgkbbonieapkchffalihpic: {
		name: 'Video Downloader Global',
		file: 'assets/images/pops/img_bg.png'
	},
	olenolhfominlkfmlkolcahemogebpcj: {
		name: 'FastSave & Repost for Instagram',
		file: 'js/inject.js'
	},
	omlcfkdfjaidfgbnjaefnplnpjcghgpk: {
		name: 'Influencer Searcher Engagement Calculator',
		file: 'content.js'
	},
	oncaapliomaamlbopdmhmdompfemljhm: {
		name: 'Webcam-Droplr',
		file: 'public/logo.svg'
	},
	ondecobpcidaehknoegeapmclapnkgcl: {
		name: 'JSON Formatter',
		file: 'fonts/MonoLisaVariableNormal.woff2'
	},
	oohfffedbkbjnbpbbedapppafmlnccmb: {
		name: 'Vue force dev',
		file: 'detectorExec.js'
	},
	oolmdenpaebkcokkccakmlmhcpnogalc: {
		name: 'Toy.new Website Builder',
		file: 'img/l.svg'
	},
	oonalfdoahlmjaoloddjenihohbfodme: {
		name: '英辞郎',
		file: 'img/pin_on.png'
	},
	opfppjjpcgojicomghpdjanjpeobaajo: {
		name: 'Image to Prompt',
		file: 'paddle.js'
	},
	oppdbdefikkkihgbliidckokhgcmmiga: {
		name: 'Cloaked',
		file: 'popup.html'
	},
	pabamgafdnanldcgdhpfohfdpjjbekom: {
		name: 'Recruit CRM Sourcing',
		file: 'views/home.html'
	},
	pampamgoihgcedonnphgehgondkhikel: {
		name: 'DotGit',
		file: 'content_script.js'
	},
	papnkgoggccbbpadcjndgfjgaaekgekm: {
		name: 'Product Importer',
		file: 'main.html'
	},
	pbgjdmhnccgmehkpkjhknmlpolkdfbpo: {
		name: 'Cisdem Web Blocker',
		file: 'popup.js'
	},
	pbpnngfnagmdlicfgjkpgfnnnoihngml: {
		name: 'NG Spelling and Grammar Checker',
		file: 'dic.pt.txt'
	},
	pccilkiggeianmelipmnakallflhakhh: {
		name: 'Wordle Timeless',
		file: 'icons/icon-16.png'
	},
	pcicppminbpfkkfnnkkhfknalhelbabn: {
		name: 'Cute Cat',
		file: 'images/fish_1.png'
	},
	pcndjhkinnkaohffealmlmhaepkpmgkb: {
		name: 'Meteor Wallet',
		file: 'assets/constants_theme-DBpwduVV.js'
	},
	pdmgonafkgopgipcmgfpfobgknbofnpn: {
		name: 'PaperPop',
		file: 'icons/doi.png'
	},
	peihjafefjfiagbbphhjbepceocnnagh: {
		name: 'Zoho Recruit\'s Resume Extractor',
		file: 'from.html'
	},
	pejhbjnfifdecpkgcjhgmcaphdobmiie: {
		name: 'Toast',
		file: 'embed/embed.css'
	},
	penjlddjkjgpnkllboccdgccekpkcbin: {
		name: 'OpenMask',
		file: 'provider.js'
	},
	pfbdfjaonemppanfnlmliafffahlohfg: {
		name: 'Tradingview assistant',
		file: 'page-context.js'
	},
	pfblclopmfndegcljgcjbhkpclhepeod: {
		name: 'Uniqkey',
		file: 'images/icon16.png'
	},
	pgapfmffencbcimgokjghhlkolckkomb: {
		name: 'Sugar',
		file: 'libs/requests.js'
	},
	pgiaagfkgcbnmiiolekcfmljdagdhlcm: {
		name: 'stargazer-wallet-ext',
		file: 'js/injectedScript.bundle.js'
	},
	phgmdiohjekdjkkknfgibohccckjjilp: {
		name: 'Site Blocker',
		file: 'blocked.html'
	},
	piajkpdbaniagacofgklljacgjhefjeh: {
		name: 'APF',
		file: 'audio/beep.mp3'
	},
	pigcoaliboahgcijpogmfhkjjampmidm: {
		name: 'サテライトAI',
		file: 'src/assets/images/m-365.png'
	},
	pilehkefiejmhdldhbajgajlcgggohkj: {
		name: 'NordLayer',
		file: 'assets/back.svg'
	},
	pjhcpooacdljimmmkpbknccbedoaagai: {
		name: 'Microsoft Bing InPrivate',
		file: 'images/bgextn.png'
	},
	pjldgnhfobpnhbdmfmofkfppdilefnjj: {
		name: 'U-Eyes',
		file: 'images/beta.png'
	},
	pklcojlgnoaahjchjbiilfgjehinajmd: {
		name: 'Paknevis',
		file: 'assets/icons/favicon-16.png'
	},
	pkocgelcaeljjcodajmlnemibikaengn: {
		name: 'Easy Keywords for AdobeStock',
		file: '69.js'
	},
	pkomojeklgbndilokjedodpebdbekiod: {
		name: 'Flash Player',
		file: 'manifest.json'
	},
	plcabbfeeokakkmdecdccmibahigjkno: {
		name: 'Chrome Close Lock',
		file: 'ccl.html'
	},
	plifocdammkpinhfihphfbbnlggbcjpo: {
		name: 'Metric Spy Page Ruler',
		file: 'css/content.css'
	},
	pliinlgkmncfmfifeepmhlbpklanflpd: {
		name: 'Pratik Modül',
		file: 'www/js/app.js'
	},
	plkdnpjpnhhnmigmekaocdfokkmebdnm: {
		name: 'AirReview',
		file: 'list.js'
	},
	plnnpndcgjokianndhalbgnpcbkbehmp: {
		name: 'ApowerREC Screen Recorder',
		file: 'digital-display.woff2'
	},
	plpkmjcnhhnpkblimgenmdhghfgghdpp: {
		name: 'The Great-er Tab Discarder',
		file: 'img/edge.svg'
	},
	plplcdpfeknmlciiohlgpjoonjmadlbc: {
		name: 'MyLogin',
		file: 'brand.svg'
	},
	pmdghmdjjojjeajflmpgnambocpnpiea: {
		name: 'Gmail Dark Mode',
		file: 'css/popup.css'
	},
	pmeccjlemeohcobimhbphjnlokdmiilo: {
		name: 'Copy Text from Image',
		file: 'ocr.js'
	},
	pmfifcbendahnkeojgpfppklgioemgon: {
		name: 'DCRefresher Reborn',
		file: 'assets/pin.webp'
	},
	pmmnimefaichbcnbndcfpaagbepnjaig: {
		name: 'FoxWallet',
		file: 'injector.js'
	},
	pnenkehbcheoblhjckkkadmcigpjlbpn: {
		name: 'KHALED BOUCHAREB-CEM',
		file: 'js/us.js'
	},
	pnhnfjbdadnnicpliempeidfminbflon: {
		name: 'Quick Eqs',
		file: 'icon.png'
	},
	pnibcoleffbpdiohejiinidocmklphde: {
		name: 'Clippings.io',
		file: 'assets/images/logo.svg'
	},
	pnpkconejgobbdijdlkjgohgeldfdlhg: {
		name: 'Picture in Picture',
		file: 'assets/content.css'
	},
	pohibamcjdinnoefmcggajbcblnodgoe: {
		name: 'Dashy New Tab Dashboard and Side Panel',
		file: 'assets/bg.webp'
	},
	ppcgokfjhdfiinomggddeeaomecakllo: {
		name: 'Adminer Analytics',
		file: 'icon.png'
	},
	ppjhoknoadhakhhdbbjjinlopefmehik: {
		name: 'Phantom',
		file: 'assets/icon.png'
	},
	aaekdmjipccamkpkcijaeljfniagapap: {
		name: 'Unblur',
		file: 'assets/alert.css'
	},
	aakmllddlcknkbcgjabmcgggfciofbgo: {
		name: 'Google Apps Script Copilot',
		file: 'add.png'
	},
	abiklfpogpkkcelofcplnokkehjgmchc: {
		name: 'Canned Responses',
		file: 'content.js'
	},
	aegeclnpeaicklknkpcjbldnpkkkhkid: {
		name: 'Clipboard Tool',
		file: 'tabs/delta-flyer.html'
	},
	aelljdlolpakdoeongoklpkheedfjkio: {
		name: 'Career.io Job Auto Apply',
		file: 'app.html'
	},
	ahfbjljipkpgbknoognlpekjkpmibgkf: {
		name: 'Total Privacy For WhatsApp Web',
		file: 'css/name.css'
	},
	ajcehnjdfokbfoagekhphhnjdfcokmii: {
		name: 'PDF Editor',
		file: 'icons/16x16.png'
	},
	akaghbppajebgbeaikhobgbifkcigami: {
		name: '比一比',
		file: 'js/main.js'
	},
	akdiolpnpplhaoedmednpobkhmkophmg: {
		name: 'Bloom',
		file: 'src/overrides/neo.js'
	},
	amaolbgbfgklobchidoilonnapdcdcki: {
		name: 'Alerte Bons Plans Emrys la carte',
		file: 'popup/styles.css'
	},
	ameajnciachbdcneinbgnehihjolepkd: {
		name: 'Voice Mode for AI Chatbots',
		file: 'index.html'
	},
	amndpakmdficmebaknminpdbgdccfkjn: {
		name: 'Auto History Wipe',
		file: 'js/help.js'
	},
	bbnlmjmabffkmgdidgknggloohdoadfi: {
		name: 'ACCELQ',
		file: 'common/icons/recording-red.png'
	},
	bbogkgdmnolaegffcdilhgjpgdhckhcc: {
		name: 'Stefanini',
		file: 'images/bookmark.png'
	},
	bdfjjoodmmlkfjfcfflhlidjilkmaiif: {
		name: 'Classifieds List',
		file: 'manifest.json'
	},
	bedebpfmdganddijhfbbaabedpmlokdk: {
		name: 'Pinduoduo Search by Image',
		file: 'assets/js/popup.js'
	},
	beelkklmblgdljamcmoffgfbdddfpnnl: {
		name: 'Unstoppable Domains',
		file: 'index.html'
	},
	bgonpegbhnjepleakgjdbaepkfedhhnf: {
		name: 'Cookie Killer for Facebook',
		file: 'images/icon.64.png'
	},
	boifpkpigipnfpgncajoceoglolmjmni: {
		name: 'Mi Chat 浏览器助手',
		file: 'assets/v7-fF1JkrmY.js'
	},
	ccngfcpmkbeoecmobmdoonoicfenjnkk: {
		name: 'EasyView',
		file: 'pages/reader/index.html'
	},
	cedckdcmlfabmjkangihdbimghccobhp: {
		name: 'resizePhotos',
		file: 'menu.html'
	},
	cgelaojeiipaehoiiabkbickcpmpanel: {
		name: 'Learn languages with Netflix & YouTube',
		file: 'youtubeScript.js'
	},
	cjdkbdckofhgekglchbeaacbodmfdglg: {
		name: 'Dealer Inspire Conversations',
		file: 'installation-check.txt'
	},
	cmkeochlgegefkeclhnedcolbphbkhke: {
		name: 'Easy Driving Directions',
		file: 'manifest.json'
	},
	cppopffhjdgeijpkpaoebneockpeehdo: {
		name: 'Translate Netflix Subtitles',
		file: 'icon-34.png'
	},
	dakokilaokefbgcflhljhhbpppfdndik: {
		name: 'AdScan',
		file: 'cleanData.js'
	},
	dggmapjanngfjjakfgeoegfmgpmcamfh: {
		name: 'Meta Explorer',
		file: 'root.css'
	},
	dhphdklknbffcgahfpiipdmafoncnndi: {
		name: 'Quizonator',
		file: 'vendor/katex/katex.min.js'
	},
	dibilcjfahbokhiodajibcajcabfjein: {
		name: 'Catchpoint User Experience',
		file: 'rum.js'
	},
	dmbjafgplanbfngeocfdheanncchaanf: {
		name: 'Papago Plus',
		file: 'background.js'
	},
	doocmbmlcnbbdohogchldhlikjpndpng: {
		name: 'Ctrls4Utube',
		file: 'yts-util.js'
	},
	eebmbhmhoemlagcefiogcdipocebgalg: {
		name: 'CallSwitch Call',
		file: 'detectAjax.js'
	},
	ehaaocefdhppmemaaeedemaokjooldgm: {
		name: 'ICommentExporter',
		file: 'icon-48.png'
	},
	ejeeoonlleiljffabooidiebffmlmigi: {
		name: 'Hudu',
		file: 'index.html'
	},
	ejlibkcnbaelmmgmhfklbdmklijneofi: {
		name: 'Familycard.be',
		file: 'assets/close.png'
	},
	ejocgomhimjbhmpbjphkikodfplbemjb: {
		name: 'Tipli',
		file: 'serp.js'
	},
	fbkkmbebblifoifknelgfijhbpodmlmo: {
		name: 'Shopdora',
		file: 'config.json'
	},
	fbmgjeedfjegmpjglddhemjjgnfkmkfb: {
		name: 'Trading Tools',
		file: 'sounds/1.mp3'
	},
	fekofipodopncnlomnghaaebmohagjho: {
		name: 'Insight',
		file: 'html/menu.html'
	},
	ffhafkagcdhnhamiaecajogjcfgienom: {
		name: 'Smarter RSS',
		file: 'app/images/16x16.png'
	},
	fflgpaejocnobejfanekjilflogejjch: {
		name: 'Group Leads',
		file: 'assets/icons/icon32.png'
	},
	fhogkjponmmfhiffnefhpehmaignblce: {
		name: 'Sell The Trend',
		file: 'content.css'
	},
	fhpgggnmdlmekfdpkdgeiccfkignhkdf: {
		name: 'YiNote',
		file: 'installed.png'
	},
	fnpmldckjbgpcdagndpgbjmflmlgmgnm: {
		name: 'Narrate Ext',
		file: 'web_accessible/dolbeyHelpers.js'
	},
	fpjmalheeikilmmhlhjmgopcmplhbbla: {
		name: 'E-Mükellef Toolbar',
		file: 'content.js'
	},
	ganicjnkcddicfioohdaegodjodcbkkh: {
		name: 'Media Bias Fact Check',
		file: 'assets/icon.png'
	},
	gaoiegipmllaihldahegfmgnlnkcplbp: {
		name: 'Sidekick',
		file: 'hubspot_in_page.js'
	},
	gaophljmnnggiehnkkjnmpbbcfhelflh: {
		name: 'Push Notifications Blocker',
		file: 'notification.css'
	},
	gblgfbgdhlkjnkfdbpmdhdkhhbbhfkca: {
		name: 'ZTSmartInv',
		file: 'lib/jquery-3.7.1.min.map'
	},
	ghomdadknicogbgmflkamaligpfalfng: {
		name: '蜗牛下载助手',
		file: 'ffmpeg/util.js'
	},
	ghppfgfeoafdcaebjoglabppkfmbcjdd: {
		name: '豆伴',
		file: 'media/meow.mp3'
	},
	giaeafdicekjpckngfbdnehblmamlhpa: {
		name: 'Shopee Save Plus',
		file: 'sspmPatch.js'
	},
	gjobaaakoefjgpnocgminccbdcggohnl: {
		name: 'Dictionary',
		file: 'data/panel/inject.css'
	},
	gkkhkniggakfgioeeclbllpihmipkcmn: {
		name: 'SeaMeet',
		file: 'assets/drop.png'
	},
	gldadickgmgciakdljkcpbdepehlilfn: {
		name: 'Addy AI',
		file: 'assets/icon.png'
	},
	gmfcchdbgideoiehadmlmpnbhdcjoaih: {
		name: 'Skimlinks Editor tool',
		file: 'bundle.css'
	},
	hengddlmmobpckpmaalbmdlofpiljnon: {
		name: 'Ask Gemini',
		file: 'src/search_popup/popup.html'
	},
	hepadpmfkndambfklhlhihoojmcbeicg: {
		name: 'Font finder',
		file: 'assets/pictos/logo.svg'
	},
	hglnindfakmbhhkldompfjeknfapaceh: {
		name: 'AuRo',
		file: 'content/index.js'
	},
	hhpldjjbomfnbahejbendgdhgjejhopo: {
		name: 'Youtube Thumbnailify',
		file: 'assets/cats/8.png'
	},
	hkhjfcfonfkhnpcpkhpbpmplnlcpcldh: {
		name: 'Web for Google Messages',
		file: 'img/icon.ico'
	},
	hkpciegbnpmpbpodnloafnoinjpbmakp: {
		name: 'Buzz*',
		file: 'buzz-api.js'
	},
	hldkiepdcdeibnadnpiekpbdgbgbalob: {
		name: 'JSON格式化工具',
		file: 'js/utils.js'
	},
	hohnpmioogigogdedhigjpjjjonkojbk: {
		name: 'Image Downloader',
		file: 'icons/logo.png'
	},
	hopiakbbpmgkihbkehgdabadnikcgjlg: {
		name: 'МТС Линк',
		file: 'images/icon16.png'
	},
	iadffjigiclimjimlfcpfedjomjapnhf: {
		name: 'Medallia DXA',
		file: 'content/hmScripts.js'
	},
	icmjegjggphchjckknoooajmklibccjb: {
		name: 'Tomba',
		file: 'icons/16.png'
	},
	igkmdomcgoebiipaifhmpfjhbjccggml: {
		name: 'AEM Sidekick',
		file: 'log.js'
	},
	igoginokckmjjoaohbimmglmbbdnhfoi: {
		name: 'CapturePro Camera',
		file: 'popup.css'
	},
	ihebciailciabdiknfomleeccodkdejn: {
		name: 'WME Toolbox',
		file: 'images/B.png'
	},
	iheecpmppehgghpjbhdpgjdllemcmdnk: {
		name: 'Reforge',
		file: 'pages/tasks.html'
	},
	ihkbncennjhofkohbibnbgappjbncnoc: {
		name: 'LabelResizer',
		file: 'img/ups-24.png'
	},
	ilkodijinjhpdnnfpccijledlapkfmhc: {
		name: 'Next Experience Developer Tools',
		file: 'worker.js'
	},
	iloddidemhbedaopmipajgclofjocogb: {
		name: 'PT Depiler',
		file: 'pt-depiler.css'
	},
	imcfjlaadnlgoipeponeoggcgdonkbjo: {
		name: 'CR7 MeaVana',
		file: '128x128.png'
	},
	inabndbiklomhjaljieihbhigmeoicbg: {
		name: 'Economize! Mundo Conectado',
		file: 'index.css'
	},
	inobjcmbajbmllkgkigemcfnikdmlidn: {
		name: 'RPost for Gmail',
		file: 'images/icon-eye.png'
	},
	ipocdfgahhjaigldllakopnkofpcpahn: {
		name: 'Qsirch Helper',
		file: 'inject/frame.html'
	},
	jbhnejndccdjigppalbbiphlbaaehpln: {
		name: 'Inspector',
		file: 'content-scripts/content.css'
	},
	jgabolakboecklnmocdljjcdkkhjigck: {
		name: 'Corgi AI',
		file: 'start.html'
	},
	jgilkmapjeaikiboajahmeiadceioobc: {
		name: 'AI课代表',
		file: 'logo.png'
	},
	jjjlikhinlnggfgmjhcnhibkmcjcmiej: {
		name: 'FoxyClick',
		file: 'icon128.png'
	},
	jkjgekcefbkpogohigkgooodolhdgcda: {
		name: 'BitPay',
		file: 'popup.html'
	},
	jkokgpghakemlglpcdajghjjgliaamgc: {
		name: 'Anti phising safer browsing',
		file: 'assets/icon.png'
	},
	jojaomahhndmeienhjihojidkddkahcn: {
		name: 'Forensic OSINT Full Page Screen Capture',
		file: 'assets/images/progress-spinner.gif'
	},
	jppnahnlneednhaefhbfgpamgbecpfdd: {
		name: 'Autolingo',
		file: 'popup.js'
	},
	kajgpmmnnohnlajonknigghinhjmmehc: {
		name: 'Clear cookies for one site',
		file: 'images/48x48.png'
	},
	keghdcpemohlojlglbiegihkljkgnige: {
		name: 'metacert-internet-security',
		file: 'images/spinner.gif'
	},
	khbjbchkedopfbhiafhaacomekdgnhbh: {
		name: 'AI Translate',
		file: 'icons/icon-32.png'
	},
	kjlghdmljfgngjdpeaiogebkiilpiimk: {
		name: 'Yawas',
		file: 'localedit.html'
	},
	kjmfnmpklmilhfbdiephghndfdjahneb: {
		name: 'Video Downloader Plus',
		file: 'javaScript/instagram.js'
	},
	kkhkjhafgdlihndcbnebljipgkandkhh: {
		name: 'RingCentral App Connect',
		file: 'c2d/index.js'
	},
	knfhdmkccnbhbgpahakkcmoddgikegjl: {
		name: 'Crosslist',
		file: 'img/arrow-down.svg'
	},
	kngiafgkdnlkgmefdafaibkibegkcaef: {
		name: 'MCP SuperAssistant',
		file: 'content.css'
	},
	lbaenccijpceocophfjmecmiipgmacoi: {
		name: 'Wizardshot',
		file: 'style.css'
	},
	linoficihfeojfefmhfaacpglllecagm: {
		name: 'DeepSeek R1',
		file: 'popup.js'
	},
	lldknhffmfbndpbknmcckoelpidapidf: {
		name: 'Cashback beruby',
		file: 'templates/index.html'
	},
	llkcpjgllfpfbcddhgbpnpppjbefkcpe: {
		name: 'XenonHunt',
		file: 'assets/window.js'
	},
	lobcjkdmlmilmhiadfdlbapfcmbnbple: {
		name: 'HowNow',
		file: 'popup.html'
	},
	loinekcabhlmhjjbocijdoimmejangoa: {
		name: 'Glass wallet',
		file: 'welcome.html'
	},
	lphngfbnndkhdbmbgnlnhngihcpofkno: {
		name: 'NOKA FUT FC 25',
		file: 'icon16.png'
	},
	mckfdaahjhmnchjihljdiakamamondld: {
		name: 'HTML Elements Screenshot',
		file: 'data/content_script/inject.css'
	},
	mfcaadoifdifdnigjmfbekjbhehibfel: {
		name: 'BOJ Extended',
		file: 'css/user.css'
	},
	mlpbdkpkicfkhgagnoamdcimmhdkakni: {
		name: 'productboard',
		file: 'popup.html'
	},
	mncaahedchkhclokjmfjbennhbeceecl: {
		name: 'Tab Renamer',
		file: 'assets/icon16.png'
	},
	mnmlipalillmakdiildpclhocfgcddnp: {
		name: 'R7 Plugin',
		file: 'appScript.js'
	},
	mnndkablndpiopejbklhgngmpoibmkle: {
		name: 'Google Maps Button Search',
		file: 'cs.css'
	},
	naokfdgdgffhhcooogamafjfpmeknkla: {
		name: 'Eyedropper',
		file: 'assets/fonts/avenir.otf'
	},
	ncodfadkoblpfngolndehmjpjepepdao: {
		name: 'Farts Link',
		file: 'main.css'
	},
	nhbgpipnadhelnecpcjcikbnedilhddf: {
		name: 'OGame UI++',
		file: 'main.js'
	},
	njdflbldikgkfimenejnjkekmmgengcc: {
		name: 'Gemalto WebSigner for NatWest',
		file: 'assets/css/main.css'
	},
	njmhcidcdbaannpafjdljminaigdgolj: {
		name: 'Noise Cancelling App',
		file: 'index.html'
	},
	nknhiehlklippafakaeklbeglecifhad: {
		name: 'Nabox Wallet',
		file: 'js/inPage.js'
	},
	nmcnaajhcdnlfoooebjbjoinjhlppdpd: {
		name: 'Ranorex Automation',
		file: 'msgport.js'
	},
	nmcpliniiebkbdehpgicgfcidgkpepep: {
		name: 'Auto Fill',
		file: 'wizard.js.map'
	},
	nmfjkeiebceinkbggliapgfdjphocpdh: {
		name: 'Draft',
		file: 'sandbox.html'
	},
	npjfcmocnmkipbffpdpeemppbmbgkhle: {
		name: 'UNISPY',
		file: 'assets/logo.png'
	},
	oagcjjlppahikhfgnjeeahceohjckdgh: {
		name: 'CloudCapcha',
		file: 'popup.html'
	},
	obpicmhmbfddhkcbiapfeginbafnjmmm: {
		name: 'Drift Email',
		file: 'cal.png'
	},
	ocabfdicbcamoonfhalkdojedklfcjmf: {
		name: 'Jupyter Notebook Viewer',
		file: 'themes/radar.css'
	},
	odgmdojokcjkabaafmajcoacjkknlgnk: {
		name: 'Citeasy',
		file: 'js/getSource/kci.js'
	},
	oficbncopphljnpdgcccjiffknmhniao: {
		name: 'Elevate',
		file: 'popup/index.html'
	},
	onihkkbipkfeijkadecaafbgagkhglop: {
		name: 'OpenMemory',
		file: 'icons/add.svg'
	},
	oodajhdbojacdmkhkiafdhicifcdjoig: {
		name: 'Themes for Facebook',
		file: 'iframe.html'
	},
	opjebobgkipcdimgofkboimilnchghpd: {
		name: 'PrettyPrompt',
		file: 'content.css'
	},
	pdcdbpcmjffmfmcolgnnigdadkhiadlo: {
		name: 'Berrycast',
		file: 'content.js'
	},
	pdcgcjhkiiclnlfmgomijaihjhacnnbc: {
		name: 'Xtab',
		file: 'search-icon.svg'
	},
	pdlnaniemlhepmcaijljdcbgbeklagjm: {
		name: 'KDP Miner',
		file: 'icons/16.png'
	},
	phpgakpokidfdngbcfipndjcdgaoipna: {
		name: 'Day.io',
		file: 'generated/web-app/index.html'
	},
	pjdcehojcogjpilmeliklfddboeoogpd: {
		name: 'Timing71',
		file: 'logo_32.png'
	},
	pmkoilojjepdgnbhnbfmbpjbcgfgbaoe: {
		name: 'Spending Calculator for Amazon and Flipkart',
		file: 'Icons/copy.png'
	},
	pndkifgjmlfcdeookinhfogbfhjmmhml: {
		name: 'Previdenciarista',
		file: '128-cinza.png'
	},
	aaojgabhhamejdlcenggjjcimjgbljin: {
		name: 'TSETMC PLUS',
		file: 'assets/img/16.png'
	},
	abpickdkkbnbcoepogfhkhennhfhehfn: {
		name: 'Universal Profiles',
		file: 'js/inpage.js'
	},
	acbjeolbnaiecolebdcopocflkljjmhi: {
		name: 'MyMemo web clipper',
		file: 'js/sdk.js'
	},
	acgekcnaajgndgpkkkmojgdidgipaplh: {
		name: 'GRAVITY Personal Help System',
		file: 'config.json'
	},
	akmajmemkohkcmgcnbeeifciiahhfiid: {
		name: 'Captcha Solver',
		file: 'content/script.js'
	},
	alkcnclapbnefkodhbkpifdkceldogka: {
		name: 'PO',
		file: 'dist/0.js'
	},
	baglkjackdnhdpjjcjpkhmemggiklhid: {
		name: 'Tapicker',
		file: 'src/app/index.html'
	},
	bbdefjbkdegboapdmjgehondplmfinek: {
		name: 'LightPDF',
		file: 'manifest.json'
	},
	bfjihladgnccpchokgeeicpjcakdmkbe: {
		name: 'OhBridge',
		file: 'popup.js'
	},
	blckodkdfiedapfpjiobdkedmocgihco: {
		name: 'TTS Reader',
		file: 'unlock.js'
	},
	blfcndbglccbobmkepikmbmobcehhkkf: {
		name: 'Product Fruits Editor',
		file: 'aigen-layer.html'
	},
	bmdiaadnpgbbfepggiiajgadlhhcphgk: {
		name: 'YouTube Rewind&Forward Buttons',
		file: 'web-components/support-links.css'
	},
	bnongocfekaonhomdobnhlgieoelaakf: {
		name: 'MP4 to MP3 converter',
		file: 'assets/js/index.4d3fbb76.js'
	},
	cbhljnnfpomfkmhefapcjmjignigcfpn: {
		name: 'SuperCopy Pro',
		file: 'EDzMc92pfi.js'
	},
	cfaihfocdnniaholfnjcemnfhcjchohb: {
		name: 'JSON Formatter',
		file: 'js/inject_json_listener.js'
	},
	cggaenglmghpmhjcmogcacipdmfblobp: {
		name: 'Download svg',
		file: 'pages/index.html'
	},
	cgigbdaddgndbofikanbfmkpfoonlbpp: {
		name: 'Save to Koofr',
		file: 'content_script.js'
	},
	cgkeahkghplhgmhhjdiincncbkppgjld: {
		name: 'Paradox',
		file: 'assets/svg/loading.svg'
	},
	chejfhdknideagdnddjpgamkchefjhoi: {
		name: 'VertiTab',
		file: 'css/pip.css'
	},
	cimelnkhnffcenamjdjhjdieknlcbeaj: {
		name: 'Unlimited Video Downloader',
		file: 'payment.html'
	},
	ckdjadjpndnpnghpingmnoonmejdidga: {
		name: 'Suki Assistant',
		file: 'assets/css/index.css'
	},
	cpfjfmpepjihhfkdjnabkpbglaljciel: {
		name: 'Change Background for Google Meet',
		file: 'styles/body.css'
	},
	cppbcbfkedkkgoconajccohfcmmgjffi: {
		name: 'Lilo',
		file: 'vite.svg'
	},
	defjbhlehbkebaifofnaalipneaeaick: {
		name: 'TikTok Ads Video Downloader & Data Export',
		file: 'js/content.js'
	},
	dfckileffglgodofacjbhbglplojmcfl: {
		name: '치지직 광고 스키퍼',
		file: 'js/common/utils.js'
	},
	dfnjbajjfnchnhohhllcjafnfhbcnppa: {
		name: 'BTS Cursor',
		file: 'cur/0.cur'
	},
	diifcbhhodecmbglfjdgpfdamonhlcbd: {
		name: 'Meltwater',
		file: 'index.html'
	},
	djhjckkfgancelbmgcamjimgphaphjdl: {
		name: 'DeepSeek',
		file: 'assets/js/index.df6cf4789437.js'
	},
	ebaagncgaginjlpgecnclpbbagkkoglk: {
		name: 'TDC',
		file: 'shared/API.js'
	},
	efbmlkodbdhahiljghapjcbofehkhpie: {
		name: 'Aliexpress search by image',
		file: 'assets/js/options.js'
	},
	eilpgeiadholnidgjpgkijfcpaoncchh: {
		name: 'Noota',
		file: 'editor.html'
	},
	ejdmegbgihgjnfdpmieagjmoekkohnhd: {
		name: 'Canvas Easy Grader',
		file: 'static/js/table.js'
	},
	emeeapjkbcbpbpgaagfchmcgglmebnen: {
		name: 'Surf Wallet',
		file: 'js/inpage-script.js'
	},
	epmomlhdjfgdobefcpocockpjihaabdp: {
		name: 'Testsigma',
		file: 'img/icon.png'
	},
	fajmnddnafkmfdeekbkjcpohhoodhgjj: {
		name: 'Click2Dial',
		file: 'images/logo20.png'
	},
	fbmlcbhdmilaggedifpihjgkkmdgeljh: {
		name: 'Reader Mode',
		file: 'html/reader.html'
	},
	feooibaaamcllnmdojchjccjljdbdmfb: {
		name: 'VUBuddy',
		file: 'assets/app.css'
	},
	ffbcniciodlhjgnpapbokhmeglnefekh: {
		name: 'AI Math Solver',
		file: 'icons/ai.svg'
	},
	fflhlefcdbiidoncgmndlpkmbdiipilf: {
		name: 'Help me write',
		file: 'edit.svg'
	},
	fghbfikeodjkbajmokiekipabfckcpgc: {
		name: 'AroundDeal',
		file: 'popup.html'
	},
	fikhliccflabbhhgdpmnbdbeeacecncl: {
		name: 'KISer Web Clipper',
		file: 'pick/pick.js'
	},
	fkakfklkhmjkkehkjchemdgeoldekdml: {
		name: 'Free Chess Analysis',
		file: 'img/48.png'
	},
	flbkoklcepefekfcdjlabencimigaahd: {
		name: 'Steganos Password Manager',
		file: 'web/style.css'
	},
	fmblappgoiilbgafhjklehhfifbdocee: {
		name: 'Forbole X',
		file: 'scriptToInject.js'
	},
	fnliebffpgomomjeflboommgbdnjadbh: {
		name: 'Sublime',
		file: 'pdf'
	},
	fpdmlanpbgokpkcmkojldkjlajcnajko: {
		name: 'UchiHelper',
		file: 'html/ex.html'
	},
	gbdfmlkiafpjocliomeeabjikgbjgian: {
		name: 'Kinopoisk Player',
		file: 'metric.js'
	},
	gcjdagaoojgeilcobhibkgbodajcojda: {
		name: 'Work Offline',
		file: 'data/offline/index.html'
	},
	gcmemiedfkhgibnmdljhojmgnoimjpcd: {
		name: 'GPT Sidebar',
		file: 'assets/img/1.svg'
	},
	gddoffnommfblacbelhdogaooiediiol: {
		name: 'OKKI io',
		file: 'assets/img/icon.png'
	},
	geemhpgkjffenbpinjhghbilojbokmhl: {
		name: 'Remote Desktop',
		file: 'index.html'
	},
	gengdkfcffpnjfolbcbhfiocemfinkem: {
		name: 'PalestinePact',
		file: 'logo.png'
	},
	gfmkiampcljcdhgcalhgjhojfejlkhnn: {
		name: 'WonderSwitcher',
		file: '48x48-warn.60d9a594.png'
	},
	ggdggkhbmmgnogbcciencemciapnpeij: {
		name: 'OnlineSub',
		file: 'icon.png'
	},
	ghibhnffgbldpjefpicbgcnbelfjkcjb: {
		name: '이커머스 AI 솔루션',
		file: 'popup.html'
	},
	gholhpojkalnpdkohpdemfebhccfegnd: {
		name: 'Aceify.ai',
		file: 'getGood.js'
	},
	giljefjcheohhamkjphiebfjnlphnokk: {
		name: 'Gitako',
		file: 'content.css'
	},
	gjhodfmodljmmndflcilhkbikpcclkjn: {
		name: 'SAML Tracer',
		file: 'lib/amplitude.js'
	},
	gkdekajjngdkocgiealohleibhdjhoed: {
		name: 'Torii Image Translator',
		file: 'css/main.css'
	},
	gkkkcomfmldkigajkmljnbpiajbpbgdg: {
		name: 'TWP',
		file: 'icons/icon-32.png'
	},
	gngbpbolfnmlgjjonmfokgbfhebcbodn: {
		name: 'Language IO',
		file: 'languageio.png'
	},
	gommajbfaholfodlhddhaonphdhonjgj: {
		name: 'Ries',
		file: 'assets/ries.png'
	},
	gpdfpljioapjogbnlpmganakfjcemifk: {
		name: 'Translator',
		file: 'icons/48.png'
	},
	gpnihlnnodeiiaakbikldcihojploeca: {
		name: 'NuFi',
		file: 'assets/c-bn-C_f2Ex4d.js'
	},
	haaojocoaiflahnbiogmkkbbihfnffpd: {
		name: 'Olhar Digital Ofertas',
		file: 'index.css'
	},
	hbccbgmealblckcpgmchokcngmlaadmo: {
		name: 'CouponBind',
		file: 'images/icon/webLogo128.png'
	},
	hcghlfjkhaigchnbbkbcgadlnckobaei: {
		name: 'TwitterFollwr',
		file: 'img/icon16.png'
	},
	hcilfaknmnnhkmmojdhfilelmdebclig: {
		name: 'Gift Hero',
		file: 'fonts/Montserrat/OFL.txt'
	},
	hhedjnckjdclgflodngblaiepkpedeab: {
		name: 'AltText.ai',
		file: 'options/options.js'
	},
	hjdmhfbgpdkkdfgjfiknaacjfjljpblc: {
		name: 'Language Reactor transformed',
		file: 'manifest.json'
	},
	hkdjjdiilggppjhhlgfbiedplbneomen: {
		name: '数字酋长',
		file: 'images/icon16.png'
	},
	hkknejecoekbededhhhmencnobomannp: {
		name: 'weblock',
		file: 'login.html'
	},
	hkpdeailbnbffkgcepljgkcfjghmacdj: {
		name: 'Studio Designer Capture',
		file: 'index.js'
	},
	hmdinepahgmfhgojoglndlhllogdceli: {
		name: 'Copycat Ads',
		file: 'config/config.js'
	},
	hoknogdfolliknmnnglffgmfflcdpdih: {
		name: 'OCR Image to text',
		file: 'data/engine/index.html'
	},
	ibpblblmnbacppfjpbihbbfocconkelo: {
		name: 'Color Code Finder',
		file: 'js/index.js'
	},
	iccafhamlplmkmobidnbmehnmeonakli: {
		name: 'CloudGate UNO',
		file: 'options.html'
	},
	icgjkmnbaohfkpoddadimgiekfokiell: {
		name: 'Zoof',
		file: 'js/a.js'
	},
	ifimcneililngppkpddcliecbpcgdjag: {
		name: 'Movie Subtitles',
		file: 'icons8-settings-32.png'
	},
	ijaopicbldggjdgbnfdlkljeggibmcha: {
		name: 'Print Notion',
		file: 'pages/index.css'
	},
	iklfaeffcjjbpoholableanfikgndnhc: {
		name: 'SquarespaceWebsites Tools PRO',
		file: 'images/add.svg'
	},
	ilpgiemienkecbgdhdbgdjkafodgfojl: {
		name: 'Telegram Group and Channel Search Tool',
		file: 'popup.html'
	},
	imhlnhlbiencamnbpigopiibddajimep: {
		name: 'LeadContact',
		file: 'Montserrat-Bold.ttf'
	},
	infdegpbaoaebllngceboapplllecfpc: {
		name: 'Extrabux-Cash Back, Rebates & Deals Assistant',
		file: 'assets/16.png'
	},
	injanakciaoflbhcecmnpdekfflnllfd: {
		name: 'Vidami',
		file: 'js/popup.js'
	},
	injnkmmecojnjiiojgfgonihjpejklik: {
		name: 'Zoom Contact Center CTI',
		file: 'script.js'
	},
	ipajmhlcmempmnedocmbalcbbmhgheca: {
		name: 'Passwork',
		file: 'own.js'
	},
	jbjkingkpiakebpokhndnnmniaafoobe: {
		name: 'SharpSports',
		file: 'lib/pusher.js'
	},
	jbkgjmpfammbgejcpedggoefddacbdia: {
		name: 'Parallel wallet',
		file: 'js/page.js'
	},
	jechbjkglifdaldbdbigibihfaclnkbo: {
		name: 'Three.js DevTools',
		file: 'bridge.js'
	},
	jgnejnfdbomaelibbccppknilnnhklnk: {
		name: 'CamFlip',
		file: 'filter_cam.js'
	},
	jhinkdokgbijplmedcpkjdbcmjgockgc: {
		name: 'Kaguya',
		file: 'icon16.png'
	},
	jihpdpemfgeiadejflpafaghifggjcod: {
		name: 'SALMI TAHAR AMATTI v2',
		file: 'core/db/conn.js'
	},
	kaeigipjcamcanmmhgpniimjagdleoee: {
		name: 'NetHunt CRM',
		file: 'gmData.js'
	},
	kbgpolnipdcfiobjgldjjhdcfpbkfdja: {
		name: 'Tansa',
		file: 'js/common.js'
	},
	kegeajllnfkfhcljjebedaeedpmkcbpe: {
		name: 'Awesome Custom Cursor',
		file: 'libs/order.js'
	},
	kfdocpnoiimdgjglhkbbbfholbibhgmh: {
		name: 'ContactEditor',
		file: 'static/image/favicon/favicon.png'
	},
	khgnimehiiohfhdjbailflcfgjjlgamo: {
		name: 'AI Cover Letter Generator',
		file: 'fonts/Henk-Work-Regular.woff'
	},
	kjdgohfkopafhjmmlbojhaabfpndllgk: {
		name: 'Auto Login',
		file: 'js/tab.js'
	},
	kklgkbdijlcaihafjlofkdcmdbejmeic: {
		name: 'Alignerr Connect',
		file: 'assets/index-DIo8Vxj0.js'
	},
	kljaoemdpokllbbkoijpbgdoangcjead: {
		name: 'Công cụ đặt hàng order.baogam.com',
		file: 'logo.png'
	},
	klkckidpelgokgleimknappemeclljlk: {
		name: 'FedEx Tracking',
		file: 'manifest.json'
	},
	knefbmffdlieahakpjimbdkcaoomncje: {
		name: 'sellerboard Amazon FBA Profit Calculator',
		file: 'src/assets/icon-16-notactive.png'
	},
	kofmimpajnbhfbdlijgcjmlhhkmcallg: {
		name: 'Telegram downloader',
		file: 'popup.html'
	},
	ledhmcolmgjbkplfmppjfglgfpefmpbe: {
		name: 'KE',
		file: 'images/Logo.png'
	},
	lpopfncaoeljgopgbdcgaklafemlbjbe: {
		name: 'Timer Countdown',
		file: 'js/state.js'
	},
	mbjlobpodpimgbkmlmjiblnmfgajmebm: {
		name: 'FluentTyper',
		file: 'icon/icon24.png'
	},
	mbooipheihllljlmdencnhllhjonione: {
		name: 'Ladders Apply4Me',
		file: 'assets/icons/upgrade.svg'
	},
	meekeganelaaeijimakghhbiphjbfgdn: {
		name: 'Walles.AI',
		file: 'logo.png'
	},
	mgkjfmoolpkdchcocgfiiplpcmmfjohc: {
		name: 'Rahavard',
		file: 'public/icons/48.png'
	},
	mhgineegmgpjljjpmocmnlaonmegjkdg: {
		name: 'VR Dashboard I.T.Y.C.',
		file: 'img/foil.png'
	},
	mhnnbdhhncjkfbkbkapifcmfjdgifpld: {
		name: 'IPTV / HLS player',
		file: 'm3u8.js'
	},
	mhpjgcccinlocgiklkfllehilgmcnimp: {
		name: 'Paperpal AI Writing & Research Assistant for Overleaf & Web BETA',
		file: 'dist.5fb4a35b.js'
	},
	miccfnlbijkmbckaagllchcfknjhgfnk: {
		name: 'Speed Wallet',
		file: 'popup.html'
	},
	mkebkjahadmflkecndjlokjodhmleiia: {
		name: 'AFL',
		file: 'manifest.json'
	},
	mompiecabddeaogfabickfokcianmckn: {
		name: 'Spatio Stopwatch',
		file: 'popup.js'
	},
	nahbabjlllhocabmecfjmcblchhpoclj: {
		name: 'Danmaku mini player',
		file: 'css.js'
	},
	nckbjfbeinhdadepgkajgmdijmdmahhk: {
		name: 'GMB Scraper',
		file: 'help.html'
	},
	nenecpncmjnembdcemieinlflpjlhfai: {
		name: 'Special Characters',
		file: 'main.js'
	},
	nhlnehondigmgckngjomcpcefcdplmgc: {
		name: 'FW',
		file: 'page.js'
	},
	ninkobkbpfmfemolepdagihmfmbpbino: {
		name: 'UXM',
		file: 'js/uxm_web_agent.debug.js'
	},
	nkpcllmdbloacfoajbdahinnlfmeinlo: {
		name: 'Rogue Dex',
		file: 'inject.js'
	},
	nmoaohajaodpioogcmmjladclkanidif: {
		name: 'Auto WhatsApp Translator',
		file: 'chat.html'
	},
	nnjedgoddpdneldhlbhaalfalipjpemi: {
		name: 'Cisco Web Communicator',
		file: 'extProps.json'
	},
	npngfddkncjgkckldddkmechfcbpgfkm: {
		name: 'DMM Etsy Helper',
		file: 'scripts/core.js'
	},
	oenijgdfkimddokafknnoedmenkdakeb: {
		name: 'NanoInfluencer.ai',
		file: 'sidebar.html'
	},
	ohbkdjmhoegleofcohdjagmcnkimfdaa: {
		name: 'Time Tracker',
		file: 'images/loader.gif'
	},
	ohepmjcobcbjaoffkejjlbbabdbjlejp: {
		name: 'Telegram Video Downloader',
		file: 'index.html'
	},
	ojeajjlkhfghfjinebghlfimdicholpb: {
		name: 'Dextension',
		file: 'browser.bc4bddf7.js'
	},
	ojndmmhmgappgmabkojhkondgimifaac: {
		name: 'Metricool',
		file: 'img/metricool.png'
	},
	onoihpdjgfmiceignbghnlilcbibjmhk: {
		name: 'SellerStats',
		file: 'images/icon.png'
	},
	opemhndcehfgipokneipaafbglcecjia: {
		name: 'GrowthBook DevTools',
		file: 'js/logo128.png'
	},
	padffmpicdplkgpeaapimbeggnmfelin: {
		name: 'Photo Editor',
		file: 'index.html'
	},
	pbjjdhghffpemcglcadejmkcpnpmlklh: {
		name: 'Salesforce Navigator for Lightning',
		file: 'images/ajax-loader.gif'
	},
	pdeebkpgdaflejgihpbniammmelkdnac: {
		name: 'Roblox JobId Join',
		file: 'launch.js'
	},
	pehdnkgobeiakkmmkodeocbggajggfam: {
		name: 'PICK2SELL',
		file: 'Close.svg'
	},
	pfaldlkkohfdnmlcladmhlihpbhlkolm: {
		name: 'Livescratch',
		file: 'sounds/ping.mp3'
	},
	pkhmoinpecjngkokbmjfdhgecfljcegi: {
		name: 'Faceit Stats',
		file: 'img/logo.png'
	},
	pleldliknijeecdjckmcbcmgijjfkake: {
		name: 'Recipes',
		file: 'manifest.json'
	},
	abnnemjpaacaimkkepphpkaiomnafldi: {
		name: 'Qualys Browser Recorder',
		file: 'prompt.js'
	},
	abokklkondgpdlcajcjiobegghjfccih: {
		name: 'Save Email Template by SendPulse',
		file: 'images/eye.svg'
	},
	ademeajfjdhnjabjbamofoppjoefikbl: {
		name: 'Bankybee',
		file: 'images/tag.svg'
	},
	afcejlnmkkpphfjdpkidbgkjodnkcbmj: {
		name: 'Image Upscaler',
		file: 'assets/js/index.js'
	},
	afebilemcaepdkmhmibgmnpfppnjimjf: {
		name: 'Speed Tweaks',
		file: 'data/content_script/tweaks/scroll.js'
	},
	afpggcpmimlknonanaomkdlebdpeaicg: {
		name: 'AliInvoice️',
		file: 'invoice.js'
	},
	agklnagmfeooogcppjccdnoallkhgkod: {
		name: 'Save my Chatbot',
		file: 'files/updateNotes.md'
	},
	ajkifnllfhikkjbjopkhmjoieikeihjb: {
		name: 'Moso',
		file: 'assets/deal.svg'
	},
	ajmoajhghochmponojnjididjabohili: {
		name: 'Chat AI',
		file: 'src/styles/prism.css'
	},
	akhckkpbjonlaacapohphmdfoikibkbg: {
		name: 'X Media Downloader',
		file: 'injected.js'
	},
	anehaijgfhlkchmihoaklaimlclnomag: {
		name: 'CXone Agent Click-to-Dial',
		file: 'assets/images/cxoneLogo.png'
	},
	aohgbidimgkcolmkopencknhbnchfnkm: {
		name: 'YouTube Summary with Bing Chat',
		file: 'images/48.png'
	},
	banepeeclciljgfbpcjgnkfecnafnngg: {
		name: 'Total Defense Traffic Light',
		file: 'img/atf.svg'
	},
	bhdhompadhkjjcalkhplcfdbjegnkegh: {
		name: 'Add to Wishlistr',
		file: 'change-user.html'
	},
	bhmadppkfhoofholcdndbcodfomajacf: {
		name: 'Downloadyze',
		file: 'shr/picker/picker.html'
	},
	bifmfjgpgndemajpeeoiopbeilbaifdo: {
		name: 'External Application Launcher',
		file: 'data/redirect/index.html'
	},
	bilnclmjkfmghedjcipccipllpophckh: {
		name: 'Hyros',
		file: 'content/index.css'
	},
	bmkgbgkneealfabgnjfeljaiegpginpl: {
		name: 'Screenshot',
		file: 'layouts/editor.html'
	},
	bnmifaggmbajabmgbgolcapebogbejkn: {
		name: 'Anti-Captcha Blocker',
		file: 'content/script.js'
	},
	bpakimmhdmcbgbcnhanfcpelcnookihi: {
		name: 'Pomodoro Timer PRO',
		file: 'img/red/icon48.png'
	},
	ccmkpknjfagaldcgidgcipbpdipfopob: {
		name: 'Visual Python for Colab',
		file: 'icon.png'
	},
	cdfapchcmhgppdpmojilmopbjjlcpkjg: {
		name: 'SourceBreaker App',
		file: 'index.js'
	},
	cegegihhnhnoickhccocmaeilcdndpjm: {
		name: 'Macro',
		file: 'index.js'
	},
	cfaicdlgblgdchnpdilihjmfnogpjakl: {
		name: 'amoCRM',
		file: 'preset_docs.html'
	},
	cgbeoilpeagnpjjhfoomncafmnebikmb: {
		name: 'StealthGPT',
		file: 'assets/content-BNY6rG4M.js'
	},
	cgdogkoldofookodmiipcakaejpgocgc: {
		name: 'Handla Smart',
		file: 'assets/match-DOsTFFuB.js'
	},
	ckklhkaabbmdjkahiaaplikpdddkenic: {
		name: 'Internet Money',
		file: 'static/js/IMInjectedProvider.js'
	},
	cndhhgffdiojjdbdaaahcfocndpfpgkg: {
		name: '스피드 서치',
		file: 'popup.html'
	},
	cnnenlbocdcjnmpkkbbdgjfejinfffjc: {
		name: 'YouMind',
		file: 'scripts/build.js'
	},
	cokmophcenlaoacgnanhfjoihjcpkibm: {
		name: 'Salee',
		file: 'pen.svg'
	},
	cphibdhgbdoekmkkcbbaoogedpfibeme: {
		name: 'GoToWebinar & GoToMeeting Download Recordings',
		file: 'images/8.gif'
	},
	daajafhilgdopgffhkoalglfpghbenai: {
		name: 'Henry Luxe Rewards',
		file: 'browser.fa05fdaf.js'
	},
	dbchgeokljmcmdjbpfiaagmjdkohknec: {
		name: 'Foxit PDF Editor Cloud',
		file: 'icon/19.png'
	},
	dgafcidlgmbcehokgdeghmfnbpbfhihh: {
		name: 'WhenX',
		file: 'icons/16.png'
	},
	dgdbnfkjgaelelgdkfoiiinbengnking: {
		name: 'IEmail',
		file: 'icon-48.png'
	},
	dkdhhcbjijekmneelocdllcldcpmekmm: {
		name: 'Time Tracker',
		file: 'static/popup.html'
	},
	dkodhhfojohfonoidpcheichdjbicnfg: {
		name: 'GfG to LeetCode',
		file: 'icons/lc.png'
	},
	dlmdffmkcggiicjbfnjcnikkpahgplmd: {
		name: 'Flylighter',
		file: 'scripts/content.js'
	},
	edkhpdceeinkcacjdgebjehipmnbomce: {
		name: 'NZBDonkey',
		file: 'icon/16.png'
	},
	efbjomaifkkegoiioihfcallbkfgibbo: {
		name: 'Grid Lines Ruler',
		file: 'settings.html'
	},
	egfkhocobmgeafdbjbphhfdfbmlobgdc: {
		name: '大学搜题酱插件',
		file: 'lib/TyprMd5.js'
	},
	egfphncmmcmmadobgnjmagdljdeghamj: {
		name: 'Google Maps Route Optimization',
		file: 'icon-48.png'
	},
	ehpooiiliclnhifgkngbeghbkcllolko: {
		name: 'Guide Creator',
		file: 'css/popup.css'
	},
	elakilelipikijgcejjfdiiogcjpnngl: {
		name: 'Fable',
		file: 'drawer.html'
	},
	elhilnoieekbkpccphknjbihnccdbefj: {
		name: 'B2BHELP',
		file: 'public/vite.svg'
	},
	enbnpdbkfjdnhlepfeaaahegcggljhdh: {
		name: 'Side Wallet',
		file: 'pageProvider.js'
	},
	eobkhgkgoejnjaiofdmphhkemmomfabg: {
		name: 'AutoAny',
		file: 'img/broken.png'
	},
	fgdngdmdannpbikmoidmblmaaheeohec: {
		name: 'ネットショップまとめ検索',
		file: 'icon-48.png'
	},
	fiimimfkppnhjbgkhlanfimploepnpfl: {
		name: 'Stat4Market',
		file: 'img/logo.png'
	},
	fngpibmhccdaokelgaccddiehlggihlo: {
		name: 'BitBit',
		file: 'offscreen.html'
	},
	gamgpnolibdghflagmlghmpncjgonchn: {
		name: 'Keyword Planner',
		file: 'assets/loader.svg'
	},
	gcniklopcjcohhkeldmfbjocjmngakne: {
		name: 'LineupExperts',
		file: 'page_lue.js'
	},
	gdkbclbkmeggbekkkddcfjbcaapojihk: {
		name: 'UTAKU image downloader',
		file: 'icon34.png'
	},
	gdniinfdlmmmjpnhgnkmfpffipenjljo: {
		name: 'Web Component DevTools',
		file: 'nydus.js'
	},
	gfdldleopmcdjppengcjkpfafjhcabpj: {
		name: 'Trackerbot',
		file: 'images/trackerbot_croppedV2.png'
	},
	gflobokeglbgdhdelipppigfncpnfgbh: {
		name: 'Dyslexic Browser',
		file: 'img/play.svg'
	},
	gkompgmhhdflejbdgfjlmipjpjfdoclm: {
		name: 'SerpWorx',
		file: 'assets/images/flags/flags.png'
	},
	gnemoflnihonmkiacnagnbnlppkamfgo: {
		name: 'Word Replacer Max',
		file: 'assets/img/wand-icon.png'
	},
	gngckpdhcngilcedefiiiapkhocojghm: {
		name: 'Faircado',
		file: 'save.html'
	},
	gogoldpiecllojciifelebipkpfdhcil: {
		name: 'Overlayer',
		file: 'main.js'
	},
	hcgejekffjilpgbommjoklpneekbkajb: {
		name: 'Kibisis',
		file: 'client.js'
	},
	heghedjicmbkemhgkclendfkjhfdambh: {
		name: 'Snipe Tool',
		file: 'icons/icon48.png'
	},
	heodojceeinbkfjfilnfminlkgbacpfp: {
		name: 'Furigana Maker',
		file: 'content-scripts/autoMark.css'
	},
	hgapfodjjnkkoebpfbcfhhenkklchngn: {
		name: 'Steamify',
		file: 'images/lvl_1.svg'
	},
	hhblpocflefpmmfibmajdfcjdkeafpen: {
		name: 'Spider',
		file: 'images/power.svg'
	},
	hhefhkepfnmcgalemmofagaioeegonbc: {
		name: 'Savee',
		file: 'content-scripts/content.css'
	},
	hhfpmfhdaokfgnecalgnogganpjiehkb: {
		name: 'SherpaDesk',
		file: 'icon-48.png'
	},
	himepoeelnlpnhphkplaeknfejmpemll: {
		name: 'Elia',
		file: 'lib/sbd.min.js'
	},
	hjpiaciaipkcfelgboiijjgpeoocjmdh: {
		name: 'VetRec',
		file: 'browser.e061e11b.js'
	},
	hkmgmmaopoofgchofbngplopnhajbojc: {
		name: 'Kabeen',
		file: 'assets/img.png'
	},
	hmeagocbdamaidjkjjmlekajhgigppjf: {
		name: 'RECEPTIONIST',
		file: 'analytics.js'
	},
	hmhimiebkjjhdnjlkjeolgeogdlackea: {
		name: 'Công cụ đặt hàng nhaphang.com',
		file: 'logo.png'
	},
	hncfkjkbikpgeicjhcipbjcdjejokbek: {
		name: 'SUPDropshipping',
		file: 'lib/popup.js'
	},
	hnfdibcbmlppjlkefinedeffoiomlecc: {
		name: 'letmeout',
		file: 'after.inject.js'
	},
	ibckhpijbdmdobhhhodkceffdngnglpk: {
		name: 'Unclutter',
		file: 'modal/dark.css'
	},
	ihcaopdjcjhmjlnocckpbhkmdamhalii: {
		name: 'VidDown',
		file: 'assets/bus.js'
	},
	ihplgdgihkkniiddfjgdamnallecjkja: {
		name: 'Rabattcorner',
		file: 'bar.html'
	},
	ijalkjdhnpnjlhhcebglepaokobbaikc: {
		name: 'Video Recorder',
		file: 'camera.js'
	},
	ilcajpmogmhpliinlbcdebhbcanbghmd: {
		name: 'Preact Developer Tools',
		file: 'preact-devtools-page.css'
	},
	imbdabdbipefiieekabpncjcambojjdg: {
		name: 'Shulex Copilot',
		file: 'logo.png'
	},
	ioebechakfmaoboaimphhmmjkjjanamn: {
		name: 'Browser Locker',
		file: 'img/logo.png'
	},
	jamphegminpokpnalkjiecfoobdnlmfb: {
		name: 'Sitemap Explorer',
		file: 'images/link.png'
	},
	jblbdklppkompnbobkpncbmbjkaeaeah: {
		name: 'Reeader',
		file: 'images/logo.png'
	},
	jdanedhdmcbkheljojpdcnonnbdbohng: {
		name: 'autoTranslate',
		file: 'scripts/util.js'
	},
	jdecachbikbkppkpjjgdmdghgdfffibi: {
		name: 'NetSuite Utils',
		file: 'Util Modules/SuiteQL Runner/Libs/sql.js'
	},
	jdfghifofmbjplibeldibgjkhojgdpdf: {
		name: 'Screen Sizes',
		file: 'src/css/grid.css'
	},
	jhmjlpdljfogaclolecijklcicciafaj: {
		name: 'Amplecap Beta',
		file: 'sidebar.html'
	},
	jiikabmboknibiohmgaapgbmdopklnmn: {
		name: 'X-Alpha',
		file: 'assets/x_new.png'
	},
	jllbemjkkabaohnjcnajhflahlkehmlf: {
		name: 'Odoo Utility',
		file: 'pageScript.js'
	},
	jocnlahnjacckbiffghcopjfbifdjocj: {
		name: 'Search AliExpress by Image',
		file: 'popup.js'
	},
	kafpnhpkhahnneolfnkpjfoigfcjafne: {
		name: 'Operative IQ',
		file: 'operativeiq.png'
	},
	kbcknkijhfdjheggbdnhlbgeinfaldbf: {
		name: 'FindSCI',
		file: 'assets/img/icon.png'
	},
	kckakcdglnklfekbjcghcogpohmdammg: {
		name: 'Attention Insight',
		file: 'tooltip.svg'
	},
	keeadpdalpdcbbflbkcegcgkepadgahn: {
		name: 'image to prompt',
		file: 'assets/flux.jpg'
	},
	kiaeafdamnhlnpljacdedjgiiplfbnhe: {
		name: 'iTour chat translation',
		file: 'fonts/element-icons.ttf'
	},
	kiniklbpicchjlhhagjhchoabjffogni: {
		name: 'FindNiche',
		file: 'img/tip.png'
	},
	kkofobmbmgcdiepkdjgnffdlecjpekaj: {
		name: 'xTiles Web Clipper',
		file: 'icon-32.png'
	},
	kmeijfochmidimcngicjabokhkeifmmj: {
		name: 'Invitation',
		file: 'dist/contentScripts/style.css'
	},
	kodajckmdnamjlagjhjahccimgjanigg: {
		name: 'SuperRefresh',
		file: 'contentScript/style.css'
	},
	kpgefcfmnafjgpblomihpgmejjdanjjp: {
		name: 'nos2x',
		file: 'nostr-provider.js'
	},
	lbdjpmmladpghbcpadpeaiiopkcejpnf: {
		name: 'Spark SEO',
		file: 'page/sidebar.html'
	},
	ldcoohedfbjoobcadoglnnmmfbdlmmhf: {
		name: 'Frame Companion',
		file: 'frame.js'
	},
	ldohbgcnonoffldimgdngkojkejibina: {
		name: '塔塔网申神器',
		file: 'images/qr.svg'
	},
	lfckcgkphfglcodbedlpkkkkjicbngpe: {
		name: 'Chameleon Builder',
		file: 'images/icon.png'
	},
	lgndjfkadlbpaifdpbbobdodbaiaiakb: {
		name: 'Authenticator App',
		file: 'images/new.svg'
	},
	ljnmedkgcgidbbjhbkdonempgcgdhjfl: {
		name: 'Dual Subtitles for Netflix',
		file: 'settings_box.html'
	},
	lkgdbimigeeehofgaacanklgmfkilglm: {
		name: 'Галерея поздравлений',
		file: 'js/id3.js'
	},
	llfdaleknghepofjcleahemgndnaghhk: {
		name: 'BlockP',
		file: 'dashboard.html'
	},
	llkgpihjneoghmffllamjfhabmmcddfh: {
		name: 'Article Summary with ChatGPT and Take Notes',
		file: 'popup.css'
	},
	mbakineghcpagjflcabbakaobioigenf: {
		name: 'Facebook Ad Video Downloader & Ad Data Export',
		file: 'images/#.svg'
	},
	mfmmmefogmfphgopniobajppgnpdmmde: {
		name: 'Lionel Messi MeaVana',
		file: '128x128.png'
	},
	mgfijldnaehpnoobkafgcamlifodcbca: {
		name: 'Color Picker',
		file: 'icon-34.png'
	},
	miedbfijmibcgjjmhdccocldliepbfng: {
		name: 'Video Note & Screenshot',
		file: 'index.html'
	},
	mjllncbijgeccmolnikpkbkpbjggcgij: {
		name: 'Emails on Google Maps for free',
		file: 'js/content.js'
	},
	mnhidfdmcdhjlmdopehepplijapmcapc: {
		name: 'SparxSolver',
		file: 'main.js'
	},
	mnilpkfepdibngheginihjpknnopchbn: {
		name: 'Strongbox',
		file: 'iframe.html'
	},
	mnlhchinncppkmahmlcminlgodhkjkmd: {
		name: '1-Tap-Picker',
		file: 'assets/images/loupe.png'
	},
	nkaliaagdnbgadcpnkdbmnigkalbihlb: {
		name: 'List Opened Tabs',
		file: 'images/logo_16.png'
	},
	nlfkaldinolmacagmiddfpnfaeclfibn: {
		name: 'Gemini to PDF',
		file: 'assets/js/index.2540b607.js'
	},
	nlgkbpcannbahibpdnonjpnndpeffhmh: {
		name: 'ASO',
		file: 'index.html'
	},
	nlmagkccjhkidhigbdiappekidmijmgk: {
		name: 'KDROI',
		file: 'chunks/121.js'
	},
	noeilkljmfafbfcdoieialchglebbcea: {
		name: 'FOP2',
		file: 'images/telephone19.png'
	},
	npilhaamcjahflafelbfpmmfcihoiian: {
		name: 'Refine',
		file: 'lib/fonts/lato-bold.woff2'
	},
	occohfgiljdagdmklhpplgmcnliljmgi: {
		name: 'dewey.',
		file: 'style/injected.css'
	},
	ogfhebakocdbenmnkaajmckmbcnnafmm: {
		name: 'File Centipede',
		file: 'config.js'
	},
	oidjnlhbegipkcklbdfnbkikplpghfdl: {
		name: 'Mermaid Previewer',
		file: 'mermaid.min.js'
	},
	ojaikjnmjbcmmdanhgankifjjepbkekn: {
		name: 'PJe+R Tester',
		file: 'page-context.js'
	},
	ojbompffhdcndgndakoghndckimkohca: {
		name: 'Userflow',
		file: 'node_modules/userflow.js-self-hosted/ui.js'
	},
	olldcfahdgfhnnmkjapmnlngmnhdimid: {
		name: 'Urdu',
		file: 'src/inject/Mehr.ttf'
	},
	onnmbokhmpeheaggdmglfffafmioikfi: {
		name: 'Color Finder',
		file: 'js/index.js'
	},
	oobnhmioebnddcabnngemmjjdffhiphf: {
		name: 'Overprice',
		file: 'content-scripts/any.css'
	},
	ooidoifienlnlebfedjenmfaneglghfl: {
		name: 'ArtGenius',
		file: 'img/logo.png'
	},
	pckodmjhkabfmljinocgadlpmlefefoi: {
		name: 'PDF Manuals',
		file: 'manifest.json'
	},
	peikmglknpoodfkejhlfejhjpjijikml: {
		name: 'Kvalood Tools',
		file: 'js/page.js'
	},
	pfccjkejcgoppjnllalolplgogenfojk: {
		name: 'Tomo Wallet',
		file: 'pageProvider.js'
	},
	phdlikmfdicjbgbeppbffcgidpneifbp: {
		name: 'SecureSafe Password Manager',
		file: 'ui/index.html'
	},
	pjlgnkagacolagkphmoehkblhmmfabmo: {
		name: 'LUX',
		file: 'lux.66610d7e.svg'
	},
	acfcbfkjgnbfglpnlfipdohfdgpgpogh: {
		name: 'Image Duke',
		file: 'assets/env-Cda982MR.js'
	},
	acmdbomkcpamfjlnbefdomoldfdibekp: {
		name: 'Tele on GPM Login',
		file: 'js/replacement.js'
	},
	aelnobklpdknaaohkkionkkaakjlolbh: {
		name: 'Netwrix EPP Browser Connector',
		file: 'src/common.js'
	},
	agpbjhhcmoanaljagpoheldgjhclepdj: {
		name: 'TwinMind',
		file: 'popup.js'
	},
	ahkmpgpdcneppdhhdgmmmcgicgfcfmka: {
		name: 'CareerOS',
		file: 'assets/index.js'
	},
	aicjpengcdgnlhgdhmemfgoddmmhaddm: {
		name: 'Scanguard',
		file: 'app/sidebar/index.html'
	},
	ajdehnbmilfnjbfhffbjdmkohamimpjo: {
		name: 'Innfinergy v5.06',
		file: 'faList.txt'
	},
	akckefnapafjbpphkefbpkpcamkoaoai: {
		name: 'Galaxy Station Wallet',
		file: 'keplr.js'
	},
	alkcfedbkhjolgpgpnbnlaggfnkifhlb: {
		name: 'PSS',
		file: 'popup.html'
	},
	amaencbkhcpbgpnphohjnacnpfcfpaij: {
		name: 'Goldfire Highlighting',
		file: 'find-popup.css'
	},
	ancooclifmcdfafbgjmgpmcembfaknka: {
		name: 'Elink',
		file: 'popup.html'
	},
	andfohanhajengikbobaoblbdkmlkicp: {
		name: 'Meditate',
		file: 'manifest.json'
	},
	anlfldbcimgngaghpocmngggcbigcpdn: {
		name: 'Cat Tab Cursor',
		file: 'cur/0.cur'
	},
	aogldndldipgagdpmlgpplfdjdlgahke: {
		name: 'Dark Google Maps',
		file: 'logo.png'
	},
	apajoicibffbcimdbemlbbgphfofkmee: {
		name: 'Online protractor',
		file: 'images/sprite-buttons.svg'
	},
	banojpgedjnmhklbggjekijlfckjodlh: {
		name: 'What Font',
		file: 'css/in.css'
	},
	bbbnbmpdkfkndckfmcndgabefnmdedfp: {
		name: 'DearFlip',
		file: 'dearflip.html'
	},
	bbjnnajeogkkmljfdoengamaiomfhbch: {
		name: 'Telegram Video Downloader',
		file: 'inject.js'
	},
	bcefgmhpbmghjcenbklchobmogjhaagl: {
		name: 'Popup View for Google Translate',
		file: 'data/inject/selector.png'
	},
	bebgccbfedcfmpidjcjoomapnmlhhmlk: {
		name: 'Modjo',
		file: 'assets/js/app.js'
	},
	biailfjhlmalakjackgpekkbmljelldc: {
		name: 'Sprout Social',
		file: 'scripts/bookmarklet.js'
	},
	bjjjdfkmchhojjkgbnhhlpoaeehpjjhi: {
		name: 'TL Kiosk',
		file: 'images/home.png'
	},
	bjobgelaoehgbnklgcaaehdpckmhkplk: {
		name: 'SuperX',
		file: 'js/listener.js'
	},
	bkahonfnnidbeekmmfklgfmodagnngfb: {
		name: 'Timeneye widget',
		file: 'css/popup.css'
	},
	bkfagmnilllacgphpepbdmialglfjjpi: {
		name: 'Chartnote',
		file: 'src/assets/img/cog.webp'
	},
	bkfbelfdnfgjggjodebaikmjagdfodnh: {
		name: 'Playbook',
		file: 'src/client.js'
	},
	blbjnedpmjikmgjjbmihgbaplihinojl: {
		name: 'Ranorex Automation',
		file: 'msgport.js'
	},
	bmbfkoeaaglglffehmikaljbkaiaioac: {
		name: 'Unicorn Smasher Pro',
		file: 'popup.html'
	},
	bmiphdgjjjgkjhlfhlbbpkmdokichnhn: {
		name: 'WA Contacts',
		file: 'logo/logo_16.png'
	},
	bnlbikbnkhjncbnalhnbehfahbgnlppp: {
		name: 'Jira Persian improver',
		file: 'fonts/Samim.woff'
	},
	bobhjedlciclpchpelkgiojkmmfgnihg: {
		name: 'Dropshipman',
		file: 'logo128.png'
	},
	bonpnaaomhiopalpccfjddpghldoojih: {
		name: 'Кнопка WorkHere',
		file: 'icon-34.png'
	},
	bpfdbfnkjelhloljelooneehdalcmljb: {
		name: 'hektCaptcha',
		file: 'dist/ort-wasm.wasm'
	},
	bphnmjlejonaeiapcnimchlmhbpbdiip: {
		name: 'Social Media Downloader',
		file: 'js/popup.js'
	},
	ccgngdpmfjecdgijjjnbbndeahobokhj: {
		name: 'Color Dropper',
		file: 'icons/icn128.png'
	},
	cchjdgbabijeikbdgldplhhbbbkeeaei: {
		name: '쿠팡 쇼핑 도우미',
		file: 'assets/js/popup.js'
	},
	cgpmofepeeiaaljkcclfldhaalfpcand: {
		name: 'Assistant RGAA',
		file: 'dist/minimap-component.js'
	},
	cjggdkhenhgccghmgbjclonbdfdpmfje: {
		name: 'Textmetrics',
		file: 'main.js'
	},
	clpoilnjjdbfjinifhmcfddhjgneajle: {
		name: 'AP',
		file: 'css/sb.css'
	},
	cmihhekbihecfajbiokajdiajnffdfpn: {
		name: 'Motorwatch',
		file: 'images/motorly-small.png'
	},
	cnlnnpnjccjcmecojdhgpknalcahkhio: {
		name: 'Salesforce.com Enhanced Formula Editor',
		file: 'regexp.js'
	},
	cokmobldpihbibodplbdfhkbiibganfh: {
		name: 'Plerdy SEO Analyzer',
		file: 'stem.js'
	},
	cpliknnmgllhifnomnldjhcambhpdino: {
		name: 'Netflix Party',
		file: 'content/index.js'
	},
	dboboillnhldihjigadainihehfoackd: {
		name: 'PM-Chrome',
		file: 'pdf/pdf.js'
	},
	dcdpkefhmpgpnogeddkpjjmioaeopche: {
		name: 'Nimble Prospector',
		file: 'frame/frame.js'
	},
	ddafdejlekcmnafgnbllcfkebabhabcl: {
		name: 'zShare',
		file: 'html/tpc.html'
	},
	dfaldmjkfklnkenddjpikfkdnkinheke: {
		name: 'DingDoc Flash Save',
		file: 'icon.png'
	},
	diojcfpekhhnndfmggknljpnfpcccbhc: {
		name: 'Dictionariez',
		file: 'test.html'
	},
	dladanhaondcgpahgiflodhckhoeohoe: {
		name: 'Intention',
		file: 'assets/icon.svg'
	},
	dnohamccnpiapcadmokckehgebdednko: {
		name: 'Sheet Monkey',
		file: 'public/tweet.png'
	},
	dobielmofoebpnaijanlimppdhjbfpcp: {
		name: 'AI Summary Generator',
		file: '16x16.png'
	},
	dpbaboapnbnifbekhhjggaolbnncfjfe: {
		name: 'Cortico Plug-in',
		file: 'cortico-min.js'
	},
	ebgcanfjipfcdnjgpbagblmgebkpbhoo: {
		name: 'Print Easily',
		file: 'manifest.json'
	},
	ebpiondkhkldijolgmhfenknngkkjola: {
		name: 'ps-wasm',
		file: 'viewer.html'
	},
	edpijhdhpmccflkdobmpggibhbmppmdn: {
		name: 'Seerfar',
		file: 'img/wb.ico'
	},
	egbncdggdomnmpkngingeacgmlbcneif: {
		name: 'Zopi',
		file: 'images/cj.png'
	},
	ehliocfmgnkdcgigclppnodpgkiodfco: {
		name: 'ContentBot AI Writer',
		file: 'tools.json'
	},
	einfacogeelpbhdlmiglhpbkicknhpla: {
		name: 'TinyIMG Shopify SEO',
		file: 'popup.html'
	},
	ejbidfepgijlcgahbmbckmnaljagjoll: {
		name: 'Salmon Wallet',
		file: 'script.js'
	},
	ejcmfianlbiiafmcnhmnpndoddnimjki: {
		name: 'Stopaganda Plus',
		file: 'sources/sources.json'
	},
	ejhkkbilnpifailgngpkgmiofhioacjd: {
		name: 'eesel AI',
		file: '354.bundle.js'
	},
	ekfkopmgnijagfmjgcjkbffcnmggekec: {
		name: 'SafeToOpen',
		file: 'js/enc.js'
	},
	ekiejpimpidhnjebfecllpnpiphndggn: {
		name: 'Kitty',
		file: 'kitty.js'
	},
	elkkekiononmpeeknaehjbjkeabbmbkd: {
		name: 'Record Zoom Meeting',
		file: 'setup.html'
	},
	emcpjechgmpcnjphefjekmdlaljbiegp: {
		name: 'The Optimiser',
		file: 'selector.json'
	},
	eoagmdboiealblmpaahjlhajggndaahi: {
		name: 'Productivity Owl',
		file: 'js/popup.js'
	},
	epjbmmchkjlgmogfoamcleeikmfaffjm: {
		name: 'TTCommentExporter',
		file: 'icon-48.png'
	},
	falajmifjcihbmlokgomiklbfmgmnopd: {
		name: 'Reject Service Worker',
		file: 'content_scripts/chrome-main.js'
	},
	fbaccmibmbdppbofdglbfakjalaepkna: {
		name: '网易外贸通助手',
		file: 'tabs/sidebar.html'
	},
	fcdibhhcebjndgimaclicpbjhnpmmonc: {
		name: 'ALM Coupon Codes Finder',
		file: 'assets/imgs/logo.svg'
	},
	fdnbhgmdmneheakaoicpfephhfcpgele: {
		name: 'vpn-rice',
		file: 'index.html'
	},
	felcheipcdolkjejhodkggkgjljkipfe: {
		name: 'Netflix party with video chat',
		file: 'videoScript.js'
	},
	fhejipbjcgegljiajehkkinlegflifeg: {
		name: '凌风TEMU工具箱',
		file: 'assets/xhr.js'
	},
	fhpgalaaijcopnfhiicpnmldphafpkfa: {
		name: 'Duobot Tools',
		file: 'gemify/index.js'
	},
	filjhgipogkkmalceianiopidelcacam: {
		name: 'Tetri. Classic Brick Game',
		file: 'bg.png'
	},
	flmcglmalcnabfaalkomeaohklknbbhg: {
		name: 'Meeting Timer',
		file: 'icon.png'
	},
	fnagkefgadepjfbpdijgiadiohgnjhml: {
		name: 'Signspaces',
		file: 'img/bg.svg'
	},
	fncgbdbkhdhdcfiohjnbdfebholmhnkh: {
		name: 'YouGears',
		file: '128x128.png'
	},
	fogcpfhkppaffphabnmapoopakjbfnbb: {
		name: 'PixelPal',
		file: 'embed.js'
	},
	fogdlgjnkolhbefbbpghbafdkhcdgdnk: {
		name: 'Stock Analysis Overlay',
		file: 'content.js'
	},
	foilkalbafoifklkphdkijdcnkgcjefn: {
		name: 'Switch',
		file: 'newtab.html'
	},
	fondjoepdngpdimiojnpikbajiakobhb: {
		name: 'Visual Enhancements for Google Meet',
		file: 'styles/body.css'
	},
	fpacnfdkffpkpdlacnfckafdogfjefje: {
		name: 'AnkerLink',
		file: 'icon.png'
	},
	gbcmfinnjfigkegmhplcpfflfkkjpgbm: {
		name: 'ScribbleVet Browser Companion',
		file: 'purify.686cb281.js'
	},
	gcjikeldobhnaglcoaejmdlmbienoocg: {
		name: 'SpanTree',
		file: 'icons/icon16.png'
	},
	gcokaajpfngffiofmmgadkjhopjaklhj: {
		name: 'Health Reminder',
		file: 'css/notice.css'
	},
	gemcgnkghpnfbmlfimdbdgfepcgenphf: {
		name: 'Ebsta For Salesforce',
		file: 'js/bar.js'
	},
	gggnmagjmfbiedajbiccdpfffjljpepg: {
		name: 'MIB',
		file: 'elements.js'
	},
	ggngddfdaahilohaenpbmogmlokbdifb: {
		name: 'Content Filter',
		file: 'html/block.html'
	},
	ghpkofodokpkakhbdbbeofmnomfikgon: {
		name: 'Volume Mixer',
		file: 'icon-34.png'
	},
	giibhjmljpmnaiadfpghpajecbpbifob: {
		name: 'FreeServer',
		file: 'load.js'
	},
	giidlnpcdhcldhfccdhkaicefhpokghc: {
		name: 'FlyMSG AI',
		file: 'css/fms.css'
	},
	gjchkclnmcncgghabinakceociblfoik: {
		name: 'Pixefy',
		file: 'iframe.css'
	},
	gjjhmphibjpmjbeghgjgecennojdohgc: {
		name: 'Quick Snip',
		file: 'newTab.html'
	},
	gkkcgbepkkhfnnjolcaggogkjodmlpkh: {
		name: 'React Inspector',
		file: 'assets/constants-DFTnBvsf.js'
	},
	glelnofehkiolecgdagikdfkfhoafogd: {
		name: 'Document Scanner',
		file: 'README.md'
	},
	gljombomchjbpjchjdimmfnhilmgocjn: {
		name: 'Zoho Sheet',
		file: 'web_accessible_resources/ZSNewFile.js'
	},
	gmegpkknicehidppoebnmbhndjigpica: {
		name: 'Web2FA',
		file: 'inline/toast.css'
	},
	gmfaoihlkhopieoibopcponemocgbloj: {
		name: 'SaveDay',
		file: 'js/index.html'
	},
	godiecgffnchndlihlpaajjcplehddca: {
		name: 'GhostText',
		file: 'options.js'
	},
	gpfcnnilcblkdfjdjlgnclllbbhbeijb: {
		name: 'Ibai te Ayuda a Estudiar',
		file: 'images/quemirasamigo.mp4'
	},
	hcihcignkpajeehfnomlncinacagapdf: {
		name: 'Open Selected Links',
		file: 'html/popup.html'
	},
	hgcfiedlifphndjalijbccglopbpclaj: {
		name: 'Voice Control for Gemini',
		file: 'icon-34.png'
	},
	hhejbopdnpbjgomhpmegemnjogflenga: {
		name: 'OWallet',
		file: 'assets/icon-128.png'
	},
	hhkjhadndjgmdlcoikhkmihddopjcach: {
		name: 'Marfeel Copilot',
		file: 'assets/types-e3f3adcb.js'
	},
	hhoblekomblecenhpocenhkmhjioehig: {
		name: 'PRDKDP',
		file: 'assets/audio.js'
	},
	hicfhcdjmhagejklchaeplmndmmapfph: {
		name: 'Text Zen',
		file: 'icons/logo.svg'
	},
	hjlknhokmbkhaaifmhakglldciallloh: {
		name: 'ESB Window Positioner',
		file: 'images/switch.png'
	},
	hkmpnondmidmfdlaphahbalnmphelnfo: {
		name: 'Optimizely Assistant',
		file: 'js/jquery.js'
	},
	hmbjohbggdnlpmokjbholpgegcdbehjp: {
		name: 'shikicinema',
		file: 'main.js'
	},
	hnfgakkbiefcdbkonflgfkadncclmpme: {
		name: 'Clueso',
		file: 'requester.html'
	},
	hnpeicdjmdhaojkeflcnmnpgmcffjlcm: {
		name: 'NetSupport Notify Agent',
		file: 'js/modules/log.js'
	},
	hpkeijgchoedhhdfjdjlaimanpmbnhjm: {
		name: 'Gumloop',
		file: 'images/x.webp'
	},
	iaillabiiidlmolhemgpkokehaiadhli: {
		name: 'VOTOBO',
		file: 'main.html'
	},
	ibjkchlgohjlooedohknollbncbejgdn: {
		name: 'vk downloader',
		file: 'src/background/jszip.js'
	},
	icpikagpkkbldbfjlbefnmmmcohbjije: {
		name: 'Z3US',
		file: 'assets/types-c157500c.js'
	},
	ifahhglhacgndllhcinedlhkedehdiec: {
		name: 'Keeper',
		file: 'pdf.worker.min.9b40d155.js'
	},
	ifegknpoffmhhjnlifkcjmngmjidjkph: {
		name: 'X Video Downloader',
		file: 'js/myApi.js'
	},
	iifbdohpebbkdjakbkiebapfifndlgah: {
		name: 'Search by Image & Price Tracker for eBay',
		file: 'assets/js/popup.js'
	},
	ijlpmpplkkhpkhgpingckadmlohkgddg: {
		name: 'OnceHub for Gmail',
		file: 'index.html'
	},
	ilkdmekogmmllhlakbcmfpbagepbdbgj: {
		name: '划词翻译',
		file: 'assets/main.js'
	},
	imkpffdfmokmclnamadkndmjkhpbolgn: {
		name: 'MyCashBack',
		file: 'dev.js'
	},
	imoljjojcgjocfglobcbbhfbghpdjlfn: {
		name: 'FollowFox',
		file: 'assets/icn-vip.png'
	},
	jciiedcbmlondhnlflidopjlhjkkogln: {
		name: 'MOV to MP4',
		file: 'content.js'
	},
	jfdmjjaaabgoamceejigdchflioaljha: {
		name: 'NiceCapture',
		file: 'assets/icons/record.svg'
	},
	jgnjpnmofkalfliddjelaciggjgnphgm: {
		name: 'ChatGPT ️',
		file: 'lib/ui.js'
	},
	jikhbokinakhjbhoifafpbaemffhomjl: {
		name: 'Alerta de ofertas e descontos',
		file: 'style/showdiv.css'
	},
	jjplaeklnlddpkbbdbnogmppffokemej: {
		name: 'CrowdScrape',
		file: 'content.js'
	},
	jleonlfcaijhkgejhhjfjinedgficgaj: {
		name: 'CapCut Video Editor & Downloader',
		file: 'app.js'
	},
	jlkikimlceonbmfjieipbonnglnlchhl: {
		name: 'SuperDev Pro',
		file: 'icons/icon16.png'
	},
	jpfccmafeibjhgmfpmahibdaegpefjab: {
		name: 'Emojis for Google Meet',
		file: 'styles/body.css'
	},
	jpodanhbbpcdfgpafdjhkojjbagbcmno: {
		name: 'Usetiful',
		file: 'edit.png'
	},
	kablckeallljpgnkaifaeckgkaejhpjp: {
		name: 'Page Marker',
		file: 'main.css'
	},
	kcbaglhfgbkjdnpeokaamjjkddempipm: {
		name: 'MarkSnip',
		file: 'contentScript/pageContext.js'
	},
	kdkckejnngdmlcephpnfaggaeofloode: {
		name: 'ChessHelper',
		file: 'assets/img/logo.svg'
	},
	kedahopbcbdppafmfmilachnkehnagbm: {
		name: 'HelloScreen',
		file: 'pdf.css'
	},
	keiealdacakpnbbljlmhfgcebmaadieg: {
		name: 'Python Code Runner',
		file: 'pyodide/ffi.d.ts'
	},
	kfdkgfifhmnmplmlglbjamphjdahhbbn: {
		name: 'Kolsquare Analytics Sidebar',
		file: 'images/go_away.gif'
	},
	kgdlkkikggjhckdodghipinhceacbfhf: {
		name: 'heymax',
		file: 'assets/extension/check.svg'
	},
	kkpllbgjhchghjapjbinnoddmciocphm: {
		name: 'Ninji Wallet',
		file: 'inpage.be9fe2f5.js'
	},
	kmafmhimenmmjnpkodojnacmlabacmid: {
		name: 'JobDiva',
		file: 'img/star.png'
	},
	kmilnphpamalmmmadicopjjknmpcfigd: {
		name: 'NetVerify Suite',
		file: 'icons.png'
	},
	kmkagoolneedcbnifoloebjkdomdngdn: {
		name: '96编辑器小工具',
		file: 'assets/img/close.png'
	},
	kmmcaankjjonnggaemhgkofiblbjaakf: {
		name: 'Tab Manager',
		file: 'manifest.json'
	},
	kngbfhjgalofkbfkfkbjbkhjmbfkkhoj: {
		name: 'Sourcescrub Vitals',
		file: 'popup.html'
	},
	knlfobadedihfdcamebpjmeocjjhchgm: {
		name: 'WA Number Checker',
		file: 'assets/w.js'
	},
	kpeogckcmkdchekkibjolbcnamomhneo: {
		name: 'Hona',
		file: 'icon-16.png'
	},
	lakehkoheloifeelmimhhbeikghlpjgi: {
		name: 'Sovrn Commerce',
		file: 'public/fonts/lineto-circular-bold.woff'
	},
	lbanojlcfgehondfpeipfpmdfipbjlhh: {
		name: 'Instagram Unfollow AI',
		file: 'analyzer.html'
	},
	lbfjbappcgpjejkcdjponeobdcnldlkc: {
		name: 'G2T',
		file: 'inject.js'
	},
	ldaenkbmmnehilpkmnigoaodoiicdlje: {
		name: 'Image DP',
		file: 'img/logo.png'
	},
	ldakoiaiecpakeneelfihlfefaabbebh: {
		name: 'Track Your Order',
		file: 'manifest.json'
	},
	lfbajboiahaecepobmkcpadfeojchmmf: {
		name: 'Cloze Sidebar',
		file: 'dynamic/gmail.js'
	},
	lghnjiiijkmgpgafgehpahncpcpfmkbp: {
		name: 'EasyKOL',
		file: 'content-scripts/AIFilterScript.css'
	},
	lheehdbcfgapcfcnhncidpmcmdodiidd: {
		name: 'Demandbase for Sales',
		file: 'index.html'
	},
	lidhbccbajehjnpfjpnamoiemcnhhnki: {
		name: 'Easy Cookie Editor',
		file: 'icon-34.png'
	},
	lkjldebnppchfbcgbeelhpjplklnjfbk: {
		name: 'Crosslist Magic',
		file: 'web_accessible_resources/images/copy.png'
	},
	lmajkdcdknelgehdmcldckonhndcodco: {
		name: 'CV import',
		file: 'config.json'
	},
	lojpifiihcmbngjbhpmggclejpeofoil: {
		name: 'Dark Mode',
		file: 'data/content_script/custom/dark.css'
	},
	lppjagimhbcnimbjpjkpkhlmdngckjlk: {
		name: 'SugarQC',
		file: 'images/icon16.png'
	},
	mbgbeafnenfaffpbpkincpgpepjhekbm: {
		name: 'CloudTalk Click-to-Call',
		file: 'images/inPageLogo.png'
	},
	mbmlkjlaognpikjodedmallbdngnpbbn: {
		name: 'WA Bulk Sender',
		file: 'assets/w.js'
	},
	mcjjomjpjfaaaiieieaecenabgidlhid: {
		name: 'Convert Experience Tools',
		file: 'injectedScripts/extensionId.js'
	},
	mcplkbacfdjapifgiidjidmnfilipnep: {
		name: 'Tracxn',
		file: 'popup.html'
	},
	mdbahoikmdbalfgbblinaiojgmliinbh: {
		name: 'WAGrab',
		file: 'dom.js'
	},
	medeknkggnkeffoahbphecmjoakbpiab: {
		name: 'Options',
		file: 'css/v3DV.css'
	},
	menhdcpmknncjfdihkjoinfdelnnllfe: {
		name: 'Intermedia Unite',
		file: 'popup/index.html'
	},
	mgbcjnnpnnjbbaodcldjngehbfibdfpb: {
		name: 'Snipe Tool',
		file: 'icons/icon48.png'
	},
	mgffkfbidihjpoaomajlbgchddlicgpn: {
		name: 'pali',
		file: 'js/pali.bundle.js'
	},
	mgpjobdchiggokhnaajapklalckojolh: {
		name: 'SCTPextension',
		file: 'icon-128.png'
	},
	mimblplopkjaomdgamffaolcogmnfkfh: {
		name: 'Shopify Analyzer',
		file: 'js/font.js'
	},
	mkhdiephfhifcgpmkaaboknnbdpjlneg: {
		name: 'DeepSeek Assistant',
		file: 'js/toolbar.js'
	},
	mmdidpkgkknffjbnnbpcdpchhbmdmbga: {
		name: 'Savewise',
		file: 'images/Citi.svg'
	},
	mnakbpdnkedaegeiaoakkjafhoidklnf: {
		name: 'Vortimo OSINT-tool',
		file: 'icon-16.png'
	},
	mohjajgdccdncohjeglnacfdchccegcg: {
		name: 'UpAlerts',
		file: 'Assets/bootstrap.css'
	},
	mpkkpkdbheikpcgpiacppmbnpmepibac: {
		name: 'Etsy Analyzer',
		file: 'img/img.png'
	},
	nafkdopjabijmpmfnogbnccgipnocljm: {
		name: 'Swooped',
		file: 'assets/firebase-f329b3d6.js'
	},
	najpnfmjndlimkajheonmcdhheppahmn: {
		name: 'Closefox',
		file: 'assets/icn-vip.png'
	},
	napifcagjkgokhhgfbagpcaedfdmikfk: {
		name: 'PriceTip',
		file: 'img/logo.svg'
	},
	ncedobpgnmkhcmnnkcimnobpfepidadl: {
		name: 'Relay Developer Tools',
		file: 'main.html'
	},
	nfpngpgicoflhemmfebjahmjfcbnfobi: {
		name: 'PageOptimizer Pro',
		file: 'img/POP.png'
	},
	ngemfjkmfjalbpfdinpgfdkikilclhbn: {
		name: 'VORON',
		file: 'helpers/va.js'
	},
	nhbchcfeodkcblfpdjdhelcfbefefmag: {
		name: 'Dictionary',
		file: 'assets/logo-24x24.png'
	},
	nhhfoaoafpdjengjbndbdojlnfjlafpc: {
		name: 'Recruitee Talent Sourcing',
		file: 'images/add.svg'
	},
	njnaggoebacjnbklkcccmbnpfmeagcmp: {
		name: 'Web Color Filter',
		file: 'filters.xml'
	},
	nkfpegmmhcipdkgoiimdegfaicbdnndh: {
		name: 'Permission Agent',
		file: 'content-scripts/chat-bubble.css'
	},
	nkjiffgankhjcemjlikehngfajkdgfgd: {
		name: 'Trustifi',
		file: '735.js'
	},
	nmaifnjhioogfcdidhimgjdhahgaibko: {
		name: 'Export Followers free',
		file: 'style/popup.css'
	},
	nmdenlkgkkgncmibclhckkhclilpfjap: {
		name: 'Beamery',
		file: 'index.html'
	},
	nnjcoododbeemlmmhbfmmkbneniepaog: {
		name: 'ChatGPT Summary Assistant',
		file: 'js/utils.js'
	},
	noekmgopfaldnjbckdddjbnjcdklcadb: {
		name: 'Zoho Books Timer',
		file: 'js/mainmenu.js'
	},
	obnconamomcfmombecmjpcbdhndahnfa: {
		name: 'Video Downloader Professional',
		file: 'story.js'
	},
	ocbakdkmdijnkhlahjihbnjpkjepieio: {
		name: 'Block these URLs, Domains or Keywords',
		file: 'settings.html'
	},
	odfgjmajnbkiabjnfiijllkihjpilfch: {
		name: 'Syrup (Open Beta)',
		file: 'icons/Syrup.png'
	},
	odiekacofiehnpbmihmebnglcopgalfh: {
		name: 'SmarterHumans.ai',
		file: 'main.css'
	},
	ofmdcdkoaoamflggkifhcckojmnhbaap: {
		name: 'Cookie Clicker Advisor',
		file: 'script.js'
	},
	ofncgcgajhgnbkbmkdhbgkoopfbemhfj: {
		name: 'Web Scraper',
		file: 'images/logo-a.png'
	},
	ogeioigdojeopaaecebhaihbhimdbnmg: {
		name: 'Avif to jpg',
		file: 'icons/side.png'
	},
	ogofgdciigpmncnkameolnkpnnlfhkap: {
		name: 'Clip AI',
		file: 'images/Jcrop.gif'
	},
	ohjehnjdpnambhdcalhoabplbiclekhp: {
		name: 'YouTube SubSound',
		file: 'main.js'
	},
	oihfhipjjdpilmmejmbeoiggngmaaeko: {
		name: 'NoteGPT',
		file: 'logo.png'
	},
	oihpodnimjebpjcdfhipjfmpmcbmedoe: {
		name: 'Jarvis',
		file: 'images/icon-16.png'
	},
	ombjflplbadmkbbhhdekeaofjibkongn: {
		name: 'Email Extractor',
		file: 'content-scripts/content.css'
	},
	opicconnaaeilbjfnebkobanjobmnife: {
		name: 'Tiplino',
		file: 'serp.js'
	},
	pamhglogfolfbmlpnenhpeholpnlcclo: {
		name: 'JsonDiscovery',
		file: 'app.js'
	},
	pdnloikhmiklhhankbkbkfhmlnnkgfmk: {
		name: 'Fintest Pro',
		file: 'pictures/flags.png'
	},
	peicogickckfonilbopkkilgllhhkbbb: {
		name: 'cat-catch',
		file: 'catch-script/i18n.js'
	},
	pemlmekccdbjmfeehbmbehbjpcnppcef: {
		name: 'Infomon',
		file: 's.d049c692.png'
	},
	pfcacfgohgdodgmahbjkbndbdkmfknlo: {
		name: 'IT\'S TIME TO STOP!',
		file: 'assets/1.webm'
	},
	pfjninionlecmhganagpckidcmhgjlhd: {
		name: 'WordsMine!',
		file: 'static/img/tick.png'
	},
	pheccebhjjlenlidbnddkjgpgfhokmio: {
		name: 'X-notifier Neo',
		file: 'res/gmail/0.png'
	},
	pjdkmeabgpggjenaichdfjhdckcejjik: {
		name: 'SimpleFill',
		file: 'assets/autocomplete.css'
	},
	pkckbkheblnpnlnmkldeikhkfddhnkah: {
		name: 'OUI9 HLS PLAYER M3U8',
		file: 'hls.js'
	},
	poeodakgiedndmmkabehagjgpbjkcfgg: {
		name: 'Abookmark',
		file: 'a.html'
	},
	aabfpcmijdbilcmhnakjmoebdnmkoiii: {
		name: 'Face Swap',
		file: 'img/logo.png'
	},
	aafjjocpcjgbdkcfblcaejddeemlfjej: {
		name: 'Satsback.com',
		file: 'banner.html'
	},
	aanpkkmackhljjnbcopdoidpdjngfooc: {
		name: 'Elevar GTM Event Builder',
		file: 'InterVariable.woff2'
	},
	achggfpaahjmndigmakfebpjlmfjmmfj: {
		name: 'HG Focus',
		file: 'popup.html'
	},
	acnamgmgmbamffefgplhkplaanebgkac: {
		name: 'Vertical Tabs',
		file: 'icons/tab.png'
	},
	adcbaggcjppnkmhfmjcdgagmggnfeikh: {
		name: 'Server IP',
		file: 'data/ip/ip.js'
	},
	admidbamafmdejfidoeijgghcffngbmp: {
		name: 'Next DevTools',
		file: 'src/popup.html'
	},
	aielpkmgjjaddochapclgdhakecjloih: {
		name: 'NIXZ Plugin',
		file: 'index.html'
	},
	ajhidbbpmnhjjffefekncbdbeopghnnn: {
		name: 'Reelia Record',
		file: 'layout/webcam.html'
	},
	akkmagafhjjjjclaejjomkeccmjhdkpa: {
		name: 'Nintondo Wallet',
		file: 'pageProvider.js'
	},
	anfgglggipbhpklbnbolpbgnpjampiaf: {
		name: 'Knovel',
		file: 'assets/images/on.svg'
	},
	apkkllhahggfkhfdlmpopcncnaiclfdm: {
		name: 'The ABC of Faith',
		file: 'bible/be/mf'
	},
	baemjgbkbdldejgjceijnbkigkgkppoa: {
		name: 'SnapMagic',
		file: 'assets/img/chip.svg'
	},
	bcppghiggoobhkjlkfpmonlcigffpime: {
		name: 'Score App',
		file: 'main.css'
	},
	behnabjcooikinkcebobgcdcpbmkoldm: {
		name: 'Better Pronote',
		file: 'assets/name.png'
	},
	bfafhgjcljndbkjgnfdmdeeidhmpmenk: {
		name: 'Temu Seller Assistant',
		file: 'icon/16.png'
	},
	bfeaaehafjdpepdhnnagicdmompoldal: {
		name: 'Pro-Study Online',
		file: 'appsettings/appsettings.json'
	},
	bhkmpbjlggghmgknebaonpnbdbljfpcn: {
		name: 'Minera Ads',
		file: 'static/close.svg'
	},
	bjlegmanlfckekanijakdoeedcjlihbn: {
		name: 'Hindi Dictionary',
		file: 'imgs/plus.png'
	},
	bjmgfifmindcopelajhaahpibmmojkga: {
		name: 'OD MFA',
		file: 'common.js'
	},
	bjnaoodhkicimgdhnlfjfobfakcnhkje: {
		name: 'VideoTG',
		file: 'popup.html'
	},
	bkabpllkghhddkikpelcmjklipifickd: {
		name: 'Font Finder',
		file: 'assets/imgs/Close_round.png'
	},
	bkokmlhcdmoeobdcabifliikflimplol: {
		name: 'Vepaar',
		file: 'assets/icons/48.png'
	},
	bncmdklijpjfpmpdmobeafcegnnkkjff: {
		name: 'Crazy Compare For Salesforce',
		file: 'images/icon16.png'
	},
	bncpjddkbppnnfbdogmilhecbjoccpci: {
		name: 'H264ify With Auto 1080',
		file: 'inject.js'
	},
	bopcbmipnjdcdfflfgjdgdjejmgpoaab: {
		name: 'BlockWallet',
		file: 'offscreen.js'
	},
	bpbbdkcbhmgmkhbneldocmlndddhkpec: {
		name: 'Competition Meter',
		file: 'icons/16.png'
	},
	cacalbbpkmcjpnlcjanfmmnffddhibhc: {
		name: 'Click To Call',
		file: 'js/jquery.js'
	},
	camilcgaojjnemdajaipbjjkehleclnf: {
		name: 'Ptengine-Assistant',
		file: 'js/_sid.js'
	},
	cedomiiokkcmbeoekchahgmfcppnclal: {
		name: 'X Twitter Scraper',
		file: 'icon-34.png'
	},
	cflgahhmjlmnjbikhakapcfkpbcmllam: {
		name: 'OORT Wallet',
		file: 'home.html'
	},
	cfmeoknomhdgcbcmgmpbbjiggfboniie: {
		name: 'DoubleSubs',
		file: 'index.css'
	},
	chdmkeeecofpljchimdkliaknhaibkgm: {
		name: 'Search by image on Aliexpress',
		file: 'ic.png'
	},
	cmfmhegpbogfmojekmidappigcfbgbcb: {
		name: 'ModeSens',
		file: 'img/link.png'
	},
	cmnkijnpijccccpcdfpjfccnojmckihl: {
		name: 'Twitter Video Downloader',
		file: 'static/main.js'
	},
	cncajhnkbignallkkklloalnkbdigome: {
		name: 'OR Channel Bridge',
		file: 'img/icon16.png'
	},
	cnhikhicflgjbfnllpmbbdpjcfmfnkii: {
		name: 'ChatGPT RTL',
		file: 'assets/img/16.png'
	},
	cnlfgddhlclkgeljeaecehinfmjegmkp: {
		name: 'Mindgrasp AI',
		file: 'favicon-1.png'
	},
	coknkdplmddfgoggddpienehfhdgegna: {
		name: 'Newmoney.AI',
		file: 'src/content/injector.js'
	},
	cplhlgabfijoiabgkigdafklbhhdkahj: {
		name: 'Vidnoz Flex',
		file: '3rd/lib/base.js'
	},
	cpndclgiioidaongmkcammhiffagogpi: {
		name: 'mdpi_home',
		file: 'extra/bg/blue.png'
	},
	dbkmhaamlapkjabaieclhlofhnaoccmb: {
		name: 'Read Time Estimator',
		file: 'manifest.json'
	},
	dbofniohnfjigodceiebfkcfdhncnici: {
		name: 'Scroll buttons',
		file: 'img/arrow-up.svg'
	},
	deelhmmhejpicaaelihagchjjafjapjc: {
		name: 'MEGA Pass',
		file: 'lang/ar.json'
	},
	deeppkmgnnimofmekmncjmncpcbodmbl: {
		name: 'OD SSO',
		file: 'common/common.js'
	},
	deifcolkciolkllaikijldnjeloeaall: {
		name: 'Audible Library Extractor',
		file: 'assets/icons/16.png'
	},
	dfnhlnnmcjnmlihpjbkdefpnfdpgedbn: {
		name: 'Full Picture',
		file: 'popup/index.html'
	},
	dgboealbpckjkjfhabahfgnjlaeghglh: {
		name: 'HTML Tag Error Checker',
		file: 'img/32.png'
	},
	dgibbaokhfpninakmmnpmgedoabcmnpd: {
		name: 'TCMB Döviz Kurları Excel',
		file: 'lib/jquery.min.js'
	},
	dhgffppaghichiohafmjjikabhkdeodk: {
		name: 'MyEasy86',
		file: 'image/icon.png'
	},
	dhkbjdnlhahnffncheehbnoaecncdpdk: {
		name: 'Criminal IP',
		file: 'data/only_hashed_100K.csv'
	},
	didjghlckjhcmaehijhnndpmagpakkkm: {
		name: 'Found',
		file: 'icons/over.svg'
	},
	djdnajgjcbjhhbdblkegbcgodlkkfhcl: {
		name: 'Sporran',
		file: 'js/injectedScript.js'
	},
	dkhkiafhbiibnjpdmklikeliallmapgj: {
		name: 'TheGuarantors',
		file: 'assets/img/logo.png'
	},
	dknfgdeknchipilffmnpinhocfegkmmh: {
		name: 'Superpower Google',
		file: 'img/clover.svg'
	},
	dlkffcaaoccbofklocbjcmppahjjboce: {
		name: 'PixiJS DevTools',
		file: 'inject/index.js'
	},
	doedeaghekakhljnkpgpgcgpmecdomhh: {
		name: 'Mojo',
		file: 'css/popup.css'
	},
	doedlfgeilocafjipkkhegndbhlkoedo: {
		name: 'Trupeer AI Screen Recorder & Video Editor',
		file: 'setup.html'
	},
	dpcklmdombjcplafheapiblogdlgjjlb: {
		name: 'OrdiFind Wallet',
		file: 'inject.js'
	},
	dpindoafffjhbnhbdgjibhdoklelcfdn: {
		name: 'DocHero AI',
		file: 'copy.svg'
	},
	eagmgpbjpedchliifpgfgogdknnmkaej: {
		name: 'IDmelon WebLogin',
		file: 'ui/pin/index.html'
	},
	eahmbdmdglmjpaadmkceijlpgknheoko: {
		name: 'Sound EQ',
		file: 'resources/64.png'
	},
	ebjhengpaamjfjpmmdldganmhmcbhohg: {
		name: 'Informatica QuickLook',
		file: 'scripts/ca.js'
	},
	eblnlelbhacfliafbpolhdeogpolchoi: {
		name: 'Dark Mode for Google Meet',
		file: 'styles/body.css'
	},
	ecbeanbjdpjfmckloplgmfmlpcakbmjo: {
		name: 'Editorify',
		file: 'libs/icons/edit.png'
	},
	ecimajhdpmekchahaiomfdacajcehnil: {
		name: 'Loopio',
		file: 'js/annotate.js'
	},
	ecpkkfgllianigfeoonafccgbfeglmgb: {
		name: 'Focus',
		file: 'html/menu.html'
	},
	edkmbojkflfanganifkkajmldejmhlec: {
		name: 'GoCashBack',
		file: 'styles/serp.css'
	},
	eehllckaggechnoimeokmdgmljlmhkma: {
		name: 'Pinterest Save',
		file: 'save/save.html'
	},
	efmcpiahjmffjhdkllmnfehdgabepjbb: {
		name: 'Avaya Cloud Office for Google',
		file: 'client.html'
	},
	eggeglpgocmdjooigdckjjkbaflgjbbp: {
		name: 'SellerSpace',
		file: 'img/logo.png'
	},
	ehfgnibbcikohadnbkbdollhbphgeoki: {
		name: 'Invenias',
		file: 'index.html'
	},
	ejblanogjchhnpkbplblcmdpgfahhpdi: {
		name: 'LearnWithAI',
		file: 'main.js'
	},
	eldbleboehdlpegkocggjhmjncbippgl: {
		name: 'GrabIt',
		file: 'popup.js'
	},
	eninbjdhgaccikhclpomppfcclammnoc: {
		name: 'Frejun',
		file: 'mic.js'
	},
	eocobhdapiaeehkkeondnhbppmbeeoic: {
		name: 'MeasuringU-IQ survey',
		file: 'assets/muiq-38.png'
	},
	eoobcaeojdpjfnnndkphhlpopkaeicho: {
		name: 'Video to mp3',
		file: 'content.js'
	},
	epbjhopaefahnekpoieicafdbhbgokoc: {
		name: 'Search New Tab',
		file: 'index.html'
	},
	epechikapdipcpfihonkhmnknbjmnlmi: {
		name: 'Olymp Robot',
		file: 'content.js'
	},
	eppedlbobmdflmhleafebmahnbphgipb: {
		name: 'Locus',
		file: 'assets/icons/icon-16.png'
	},
	fbemknilbghlokgjhomnikdkljnbpgmo: {
		name: 'Freed',
		file: 'wrapper.html'
	},
	fcdofhdgjfhmlfiblcojepdniopclapk: {
		name: 'Translate Mi',
		file: 'css/dark.css'
	},
	fdidojpjkbpfplcdmeaaehnjfkgpbhad: {
		name: 'OdooTerminal',
		file: 'dist/pub/loader.mjs'
	},
	feapmagcaclnifojeninfmpdedbiafdd: {
		name: 'Crunchyroll Comments',
		file: 'patch.js'
	},
	febckhheheicjbhjcbippbgjdcblbdhd: {
		name: 'Surround sound for music and film',
		file: 'noaudio.html'
	},
	ffhhjklgcfabkpholngojpkijlafjooc: {
		name: 'CMP Validator',
		file: 'index.html'
	},
	fglmbimcliplbccgiemkffkbphlbanlg: {
		name: 'VidMad Video Downloader',
		file: 'images/play.svg'
	},
	fhdipaglhpjenbjmkopdhddkncphmcol: {
		name: 'Sora Video Downloader',
		file: 'popup.js'
	},
	flimmmpmnckngfehcfmkfcnpojbofokd: {
		name: 'EasyBoss ERP',
		file: 'images/logo16.png'
	},
	fmjbhmhmfanpmdhpjjemafjlgomdccnm: {
		name: 'Blueprint',
		file: 'assets/bp.png'
	},
	fmnhijmajiagcpknfmmncahjbphjmbif: {
		name: 'BinoBot',
		file: 'content.js'
	},
	fomgcolbgdjbmnabgijnbmmmoimhlidi: {
		name: 'Workable',
		file: 'images/logo.png'
	},
	gakkobdjiifadnllomenhnpojjdaoaad: {
		name: 'Mega-Debrid',
		file: 'assets/icon.png'
	},
	gcaiimgaiohlnlflkjjmcohobkpbbnfi: {
		name: 'AdsPower Assistant',
		file: 'dist/security/index.html'
	},
	gcdeggbbhghacnodhgdffajmijjkknbi: {
		name: 'Detect Auto',
		file: 'icon/16.png'
	},
	gdlphfgigkboncdlkjcamelidhkcgpie: {
		name: 'Recruiterflow',
		file: 'img/icon.png'
	},
	geloalmhkebhlgbdfaipnoonmolahpki: {
		name: 'SBee',
		file: 'manifest.json'
	},
	gfjgjekaeebjccpnaeeeleeadfiledpm: {
		name: 'Joom Pulse',
		file: 'assets/index-BokU_JNq.js'
	},
	ggccncbmbjgfaffceagiijgmjcdjchmn: {
		name: '亚马逊选品助手',
		file: 'inject.js'
	},
	ggjmjkeaeojfdcbafefloifeaepeaeah: {
		name: 'Emoji Swap',
		file: 'options.js'
	},
	gglcalnjbighdaklagfdkclchfildlal: {
		name: 'Chat and Meet for Google',
		file: 'img/icon.ico'
	},
	gnmokfnnmiogbienadgnimmgpjgollen: {
		name: '易用侧边栏 Pro',
		file: 'rules.json'
	},
	gpeoanngekmaamggfdklbbhakcohppll: {
		name: 'AliExpressNewUserPriceDisplay',
		file: 'img/qr.jpg'
	},
	hbhejhbegnlejblphomgobfbjgobjkmf: {
		name: 'ControlUp Enrich',
		file: 'assets/urls-7fe39071.js'
	},
	hdlfamnpialfmlkddnmijnimciflhbjo: {
		name: 'Shade Calendar',
		file: 'assets/images/wave.png'
	},
	henoooadlnkicamlpjbkenolnhgnochc: {
		name: 'GTMFixer',
		file: 'js/choices.min.js'
	},
	hfhfhmjmahcmfnpoheijkhhlicgjabmk: {
		name: 'SEO Checker',
		file: 'content.js'
	},
	hgegmplalfpnkfahiikedaghinbocfdd: {
		name: 'Voicy',
		file: 'src/images/google.ico'
	},
	hhcfeikmmkngnnaogpodbggmcjcebfba: {
		name: 'Briefy',
		file: 'fonts.css'
	},
	hjknhpdppgbbademebbiagbnohjgbbin: {
		name: 'EMB Tools',
		file: 'bootstrap/bootstrap.bundle.min.js'
	},
	hkbhjllliedcceblibllaodamehmbfgm: {
		name: 'Prism',
		file: 'inject.js'
	},
	hkccefhopobjcapedjbobimahkpcppnc: {
		name: 'Toggl Plan',
		file: 'jira.css'
	},
	hloekinecmafifaghekdjepphlabepkl: {
		name: 'Arweave.app',
		file: 'wrapper.js'
	},
	hobgigdbbobngdogaleppndendfpnnpa: {
		name: 'Sur.ly Surfguard',
		file: 'popup.html'
	},
	hokefmefppdgmlgeigcmjdlcdnkclbgo: {
		name: 'UniTalk Web Dialer',
		file: 'preview.html'
	},
	hpibfnhnogcgalnademehbgcpllmgdil: {
		name: 'Scrollshot',
		file: 'img/preparation.png'
	},
	hpjimioijmfpedllbemdjdjjhkaoifaj: {
		name: 'Netflix Game Remover',
		file: 'ngr-main.css'
	},
	iacmkikjodakeidnjgibjajdfippnmhh: {
		name: 'Heidi',
		file: 'heidi.png'
	},
	ibhegccigccbgpjjmkofhobdnhpinacb: {
		name: 'CraftyZoom',
		file: 'css/evenZoom.css'
	},
	ibniinmoafhgbifjojidlagmggecmpgf: {
		name: 'Meteor DevTools Evolved',
		file: 'dist/inject.js'
	},
	idgchoknbblfldifahagmnpdldknnheh: {
		name: 'Browsershield',
		file: 'assets/icon.png'
	},
	ieoljnibpcpfkljlmamklclnbinngide: {
		name: 'Easy Shop',
		file: 'app.js'
	},
	ifclboecfhkjbpmhgehodcjpciihhmif: {
		name: 'Klever Wallet',
		file: 'public/bridge/inject.js'
	},
	igjbikakmdaeecjpgcdpihkbciggnjpo: {
		name: 'ProNoto',
		file: 'popup.html'
	},
	ignachbibbeengfepmkeogegpfkigljc: {
		name: 'SEO Render Insight Tool',
		file: 'heart.png'
	},
	iiamdhkongjbodlgiofmclneebnocnki: {
		name: 'Jiminny Sidekick',
		file: 'icons/sms.svg'
	},
	ilbkkhmnmnehcicempfpekgcpneeekao: {
		name: 'Mockiato',
		file: 'mockiato.js'
	},
	iokmjpkdnkhnihbahocbjohhdnkkiphh: {
		name: 'EaseMate',
		file: 'assets/arc-DMIti5Wn.js'
	},
	ipgahklhmkcajgelkfombkolodahigco: {
		name: 'Cordial',
		file: 'resources/Welcome.js'
	},
	ipmmohddmgcjpochjcedmhallbofeefm: {
		name: 'Canvas Chart',
		file: 'icon-128.png'
	},
	jaclholjkcdapeppngdgepndkjpomlfe: {
		name: 'Japanese Dictionary JP',
		file: 'opencvHandler.html'
	},
	jaeoaaennpljipamineocgopmncgfnpj: {
		name: 'Dark Mode for YouTube',
		file: 'js/rate.js'
	},
	jekfpdkgiikjidpemceljpobcakfbiij: {
		name: 'qTest Explorer',
		file: 'engine/dojo.js'
	},
	jenlhondkkckfmehobgliecmdngfdkbo: {
		name: 'React Scan Toggle',
		file: 'react-scan.js'
	},
	jgemokhiblmkgicejlcpkoaohfpcgehj: {
		name: 'GoodLinks',
		file: 'images/apple.svg'
	},
	jglleggplbpnldiciklliilcphefponm: {
		name: 'fontDownloader',
		file: 'scripts/content.js'
	},
	jhhafkobmfjlcfppjenldjalejnfhcfk: {
		name: 'Secure Kit',
		file: 'img/eye.svg'
	},
	jkklhhheomgefgljanpobgabooknjlbf: {
		name: 'Rove Shopping (Short)',
		file: 'auth.html'
	},
	jkncjfiaifpdoemifnelilkikhbjfbhd: {
		name: 'n8n Workflow Builder Ai (Beta)',
		file: 'tally-embed.js'
	},
	jnbamieaacddlfcoanmbkclnpoafhmie: {
		name: 'ElementHider',
		file: 'src/browser_action/guide.html'
	},
	jndgjmiigkfgngemhobhnibilojkkfhi: {
		name: 'WAexport',
		file: 'js/lodash.js'
	},
	jnhiookaaldadiimlgncedhkpmhlmmip: {
		name: 'Tabme',
		file: 'auth/callback.js'
	},
	jonkgaipjeenhoccenhhccmofokbpanl: {
		name: 'Open Access Helper Web',
		file: 'js/popup.js'
	},
	kapoabaoamgiilmlanmfejgfomlnccph: {
		name: 'GPT Sidebar',
		file: 'icons/tag.png'
	},
	kekchpijkaijdcppfehiplaghiokpcld: {
		name: 'Waldo',
		file: 'manifest.json'
	},
	kgbcoelgfffkmkpfnldemdinmcbpjlaa: {
		name: 'MeaVana',
		file: '128x128.png'
	},
	kgnnlaamhmjmhkeegiaimkfojcagjcml: {
		name: 'Accops NativeClient',
		file: 'manifest.json'
	},
	khjlfjpicfdbnpogpcfcflkffkmadihf: {
		name: 'Ploomes para WhatsApp',
		file: 'index.html'
	},
	khkpfminnhkjeabcnhpjcfhegbbodpjk: {
		name: 'BrowserStack Testing Toolkit',
		file: 'icons/drag.svg'
	},
	kihnnjkmbhhockopicpjhalcbchpmkkh: {
		name: 'AdBlocker Lite',
		file: 'data/content_script/inject_b.css'
	},
	kmcfjchnmmaeeagadbhoofajiopoceel: {
		name: 'Solid Devtools',
		file: 'assets/web-pnJ8ILBB.js'
	},
	kocnjkachacifcgiboaphjkmohggmpmh: {
		name: 'Shopify Custom Fields',
		file: 'icon.png'
	},
	kpfalnccljfmbogklbbgbhcldihafcpp: {
		name: 'Also Boughts Downloader',
		file: 'ajax-loader.gif'
	},
	lcmlgggklanaobiobonnciffdplommbl: {
		name: 'DesignFiles Product Clipper',
		file: 'assets/js/utils/url.js'
	},
	ldadolhckmdcpiodmjjgilbbmiakbhgp: {
		name: 'Marter',
		file: 'bootstrap.css'
	},
	ledcljjhlgnpecmppjmganlmoppekkff: {
		name: 'Bitcashback',
		file: 'images/star.svg'
	},
	lejiahlknapicagjldmkeoccbgmimkgo: {
		name: 'AIS Visa Portal',
		file: 'popup.html'
	},
	liencdcnkiopkjihmekmlnjkcajjppnf: {
		name: 'Language Learning with Disney Plus(Beta)-AFL',
		file: 'disney/354.js'
	},
	lklimgabcbcgnpdmhcgeomcpigimjdfe: {
		name: 'VPN Bunny',
		file: 'payment-success.html'
	},
	lnmbffkdpinhcccidngekokeidglicic: {
		name: 'Responsive LookUp',
		file: 'frame.html'
	},
	lpkcglgkpkloheddkmehdapeclclnecm: {
		name: 'Prime Connect',
		file: 'logo/cc.png'
	},
	mahpbcfolnblioiakoidcnmhghjijdaa: {
		name: 'Copy Paste URLs',
		file: 'src/ui/setup/index.html'
	},
	mbclkgocofhagldefeogoionalbpckoo: {
		name: 'Publer',
		file: 'dashboard.html'
	},
	mbnakgcjfddknegppggflmbjmahndkjf: {
		name: 'Random wallpaper',
		file: 'newtab.js'
	},
	mcecffeookkllgkbflcdlbicolmfgifj: {
		name: 'ChatPage',
		file: 'core/environment.js'
	},
	mhgiefelomcdfcdbknkkohpibdpbdhmo: {
		name: 'Tab Notes',
		file: 'common/notesStorage.js'
	},
	mihgbgcojjjcgckpoclhjoneafcmfpng: {
		name: 'JoyCode',
		file: 'token.js'
	},
	mjfahldkpjhcnfbbmdhpjolcjpcfhcpj: {
		name: 'Toolbox',
		file: 'popup.html'
	},
	mkbkgdiaaofcpbaicmdfbhmagihlmpef: {
		name: 'BiRead',
		file: 'biread_logo_32.png'
	},
	mkoegjeakpnbjklhimnimkgokbifeaoh: {
		name: 'ExtraSound',
		file: 'icons/logo_128.png'
	},
	mlakcjhcfmdpimbmpjjmdemfcjpeghgm: {
		name: 'CompanyCam',
		file: 'images/logo.png'
	},
	mmmfofondapflhgbdidadejnechhjocm: {
		name: 'Link Previews',
		file: 'assets/logo-24x24.png'
	},
	mnmmbiifajmgbpnbknbhnjclafhijgbn: {
		name: 'Power Mouse X',
		file: 'mute.svg'
	},
	mnngnbmkiabhobdmeolcnjidongapoba: {
		name: 'Passwd',
		file: 'images/dots.png'
	},
	nahdggilmmpnphekajnpckogaeibnfci: {
		name: 'タオタロウ Order Assistant',
		file: 'src/assets/logo.png'
	},
	nbaoekflajgicpkiddljpmbpfgnkefdi: {
		name: 'X/Twitter DM Downloader',
		file: 'html/popup.html'
	},
	ndabodbljahojbefpjklnmkghopppccg: {
		name: 'Lazy Felix',
		file: 'assets/imgs/paw.svg'
	},
	ndbfannaibelbknpfdikeochfnlhjmpb: {
		name: '大作采集器',
		file: 'js/pinall.js'
	},
	nejbhaabfihgocbacojonoekogiklfja: {
		name: 'Bongo Cat Typing',
		file: 'bongo-cat-typing-1.png'
	},
	nfciaicdjmilipnlpkdmpplabgomgfmk: {
		name: 'Abit',
		file: 'abpage.html'
	},
	nfihojoiaipdjchgdbkknlaodibopnpf: {
		name: 'Save As Image',
		file: 'libs/avif.js'
	},
	nflbalmkceonkkhifbifebanhladdgcp: {
		name: 'JSON Pretty',
		file: 'font/Mono-Bold.woff2'
	},
	nfnjemoofkhppjhjcehbddolbalmibkg: {
		name: 'Auto Cleaner',
		file: 'img/info.svg'
	},
	niaagjifaifoebkdkkndbhdoamicolmj: {
		name: 'Universal Keyword Planner box',
		file: 'content/index.js'
	},
	nikjkfpkdchpheoilbeekhbimcofegkl: {
		name: 'Cashbe',
		file: 'content/styles.css'
	},
	nklehcoamlgpnlljogplljnidlciimgo: {
		name: 'AUNライブキャプチャ',
		file: 'views/capture.html'
	},
	nllnakkoanoloffpgpglbkijkdmiohmi: {
		name: 'Customer Meetings',
		file: 'icon-16.png'
	},
	nlmoemlbohbcjdobfebkmjpkkdbgnbki: {
		name: 'Amazon Price Alert',
		file: 'css/injectable.css'
	},
	npifianbfjhobabjjpfdjjihgbdnbojh: {
		name: 'Text Summarizer',
		file: 'wall.2.0.3.js'
	},
	npojienggkmiiemiolplijhfdmppacik: {
		name: 'WA Audio & Voice Message to Text',
		file: 'logo/logo_16.png'
	},
	obabcjddknfnjjeblajgnlflppnpgdhi: {
		name: 'SEO Schema Visualizer',
		file: 'newtab.html'
	},
	obgopghdefjihikoknnjfooahlleabno: {
		name: 'start.me Bookmarker',
		file: 'popup.html'
	},
	obpnfefhfgcoodmdacdmeefknpkdekpn: {
		name: 'GrowthBar',
		file: 'js/fb.js'
	},
	ocibfjgeibhjhjpkdidnjmegkddihdok: {
		name: 'S.コンテキストガジェット＆ウェブメニュー',
		file: 'images/Logo.gif'
	},
	ofnmkjeknmjdppkomohbapoldjmilbon: {
		name: 'SocialPlus',
		file: 'popup.html'
	},
	ogcoelhdhiklkfpdnbknmgeaakhghjkg: {
		name: 'Night Sun',
		file: 'themes.js'
	},
	ogggcdigdmbnngkgkdkagajklmfkabmf: {
		name: 'SpeedUpVideo',
		file: 'css/inject.css'
	},
	ohndmfaecddmecehfdidjhncfdajjeed: {
		name: '领星ERP助手',
		file: 'images/logo.png'
	},
	oljojjbekeiblhfioiimibheleoedbcb: {
		name: 'YuJa Panorama',
		file: 'panorama-starter.js'
	},
	omblejblkjafdgejjnjmhkjcakhglmke: {
		name: 'TechLink',
		file: 'store.js'
	},
	onglbklimdjicpdadjieknodkkmjldoa: {
		name: 'Reddit Enhancer',
		file: 'RE_font.css'
	},
	ooppbalbkbdabcmaijemiaekfpnhijcl: {
		name: 'Stonly',
		file: 'icon38.png'
	},
	pbomhlnclnkljppaaaioedckboaeggih: {
		name: 'Nametag',
		file: 'assets/img/eth.png'
	},
	pcmopeooniljomkngcpdnijhdkimldpo: {
		name: 'GladMail',
		file: 'sdk.js'
	},
	pgamkpjkbfldnmemhcbekimfdnjcgkco: {
		name: 'Tailwind CSS Devtools',
		file: 'fonts/FiraCode-VF.woff'
	},
	pinjghhmldainbadpbmjhcjefadbmnck: {
		name: 'Turn off sleep mode',
		file: 'images/sleep-mode-on.png'
	},
	pjcoeodfcijljpnpimnohlcbhpedgpoe: {
		name: 'Identity Guard',
		file: 'images/logo-24.svg'
	},
	pjhdflpjemjalkidecigcjcamkbllhoj: {
		name: 'ChatGPT for Google',
		file: 'one.svg'
	},
	pljdghaomjmmleolekcgcamfpbhekbmc: {
		name: 'FuseBase PRO AI',
		file: 'assets/flex.css'
	},
	pnndeikagpndnokododcjjmmaahmjlhb: {
		name: 'Leads Generator on Google Maps & Email Scraper',
		file: 'icons/16.png'
	},
	abllalcelecmcopjgejfbmkhphcmpmae: {
		name: 'Kick.com & Twitch.tv VOD Downloader',
		file: 'content.css'
	},
	adiafdcdgijidhafcchahkbaaidcohda: {
		name: 'Airnomad',
		file: 'popup.js'
	},
	adodeopedjkoofdbblibackjdklbnepe: {
		name: 'Oald',
		file: 'icon.gif'
	},
	afpgkkipfdpeaflnpoaffkcankadgjfc: {
		name: 'supermemory',
		file: 'icon-16.png'
	},
	ahkidgegbmbnggcnmejhobepkaphkfhl: {
		name: 'GIF Blocker',
		file: 'data/block.svg'
	},
	ajceemkmbgjolpocnkfccjmplcbbppel: {
		name: 'Springboard JobTracker',
		file: 'index.html'
	},
	ajenepebkdbgemdaiijnfpdfiglijpag: {
		name: 'Yaka Sinhala English Dictionary',
		file: 'assets/icon.svg'
	},
	ajgehecfkfhindkhdcjmifbngkfdflla: {
		name: 'Yoti Password Manager',
		file: 'popup/popup.html'
	},
	ajhkehblebieocfkddeeikfkcecbcijn: {
		name: '1min.AI',
		file: 'assets/flags/ad.svg'
	},
	ajofhbfomojicfifgoeeimefklkfdkfn: {
		name: 'Litescribe Wallet',
		file: 'pageProvider.js'
	},
	akedoggjiebfbfgkmdcgchkkknefnnbe: {
		name: 'Tênis Certo Descontos',
		file: 'index.css'
	},
	akobgmenldnlbglcoaekkiolkjkfhmam: {
		name: 'Máquina de Leads',
		file: 'js/aes.js'
	},
	amkahembcklobdkoaaepgfpmdnobmdkh: {
		name: 'Search with DuckDuckGo',
		file: 'src/search_popup/popup.html'
	},
	annajfchloimdhceglpgglpeepfghfai: {
		name: 'TanStack Query DevTools',
		file: 'injected.js'
	},
	annoaihhfdegphdkkkbahheignkgigpd: {
		name: 'FollowUp.cc for Gmail',
		file: 'images/icon16.png'
	},
	aodleelklmlppabmpdecbogjogklhlgi: {
		name: 'Similar Inc',
		file: 'images/key.png'
	},
	aohfenpemkefcdchmonkodnkdnkejegd: {
		name: 'Screen recorder',
		file: 'setup.html'
	},
	apojloehfppelokhjbachonhgpkonhgo: {
		name: 'Tiktok Auto Scroll',
		file: 'src/images/icon128.png'
	},
	bbfnidnhpngjjbmmlakaogggmdnnjbnm: {
		name: 'Linnk AI',
		file: 'logo.png'
	},
	bbiljflfafkaejgdebbnmcohpidgkejj: {
		name: 'Add Sense',
		file: 'injected.js'
	},
	bckkboajpcaejmbajljhebicnflhdajc: {
		name: 'Layerpath',
		file: 'assets/icon.png'
	},
	bcoflheaejlhhhcemjdkacefpepddljn: {
		name: 'Etsy Downloader',
		file: 'assets/gou.png'
	},
	bdlmjfkblpjnkienagkgljcodcgjjjml: {
		name: 'SuperSmashBrowser',
		file: 'images/wand2.png'
	},
	beenkcmmckdpbfbdaegofdokmkiciigl: {
		name: 'Appsheet Translate',
		file: 'popup.js'
	},
	bffmkleioghafggghlaeemdgjpmbppii: {
		name: 'AdBlock Detector Bypass',
		file: 'icon48.png'
	},
	bgadbfbglghghbbiaifneokpapebncmk: {
		name: 'EasyJobs',
		file: 'style.css'
	},
	bgjogpoidejdemgoochpnkmdjpocgkha: {
		name: 'Ecto Wallet',
		file: 'js/inpage.js'
	},
	bgopmpphpeghjpififijeoaojmmaiibh: {
		name: 'Twitch Chat for Full Screen',
		file: 'js/overlay.js'
	},
	biamdbghcfnhfomoeoofijhgbaconohn: {
		name: 'Voice control for chatGPT',
		file: 'logo.png'
	},
	bjbenndabachhhddadcekdalkhfkikmk: {
		name: 'Captcha Solver',
		file: 'content/global.js'
	},
	bjmgcelbpkgmofiogkmleblcmecflldk: {
		name: 'Briefly',
		file: 'src/i18n.js'
	},
	bkhdlfmkaenamnlbpdfplekldlnghchp: {
		name: 'JPEG XL Viewer',
		file: 'worker.js'
	},
	bknaiihbekigjeginplhehfiekeeodme: {
		name: 'Activity Map v3',
		file: 'sate.js'
	},
	blfabmcjenebgankcigjloaibmpcoopn: {
		name: 'Auto Full Screen for Google Meet',
		file: 'styles/body.css'
	},
	bmabahhenimmnfijaiccmonalfhpcndh: {
		name: 'Relation ONE',
		file: 'web/index.js'
	},
	bmbpecojbbccmjmllncnajipkclmnclh: {
		name: 'Яндекс.Метрика',
		file: 'metrika-counters.js'
	},
	bmcnakllnfgdjlalfffanmfhampcoalm: {
		name: 'Jive Anywhere',
		file: 'Extension/options.html'
	},
	bmheaicmcnedjkbkidcfegibipknddga: {
		name: 'ChatPlayground',
		file: 'src/assets/logo.png'
	},
	bnblmfafhphijgdplnefciaffabgmboo: {
		name: 'Zoho PageSense',
		file: 'injected-scripts/script-loader.js'
	},
	cabldpgmkejdhjbgmeooocablkljdbcg: {
		name: 'SocialPilot',
		file: 'icon/16.png'
	},
	cbdgkflbadceflcbbogjkldbnjddnhbl: {
		name: 'KAERU',
		file: 'src/assets/images/16.png'
	},
	cbfllaanijkpjgnolhfhephemiccnacj: {
		name: 'Bublup',
		file: 'data/js/lib/q.js'
	},
	cbjgpemimjmpbldgimfocbanmmkoefbi: {
		name: 'Click-to-Call',
		file: 'js/fsm.js'
	},
	cbmhmapejkobbbmhdlpjmiljbfgnfknc: {
		name: 'Ye Scraper',
		file: 'help.html'
	},
	cdafelflmnppkmabioccepjnelidmgkn: {
		name: 'SIPOUT',
		file: 'css/main.css'
	},
	cdbneippcpjnpjenabkgfljgpjmamobg: {
		name: 'Plerdy UX & Usability Testing',
		file: 'editor.html'
	},
	cedgonoljngcmgghepnhclmlknbhhdko: {
		name: 'Translator for Telegram Web',
		file: 'assets/index.6e42ac10.js'
	},
	cgjkfhodbbeidhhfbjnjhcpjdimpfjaj: {
		name: 'IG follower Export Tool',
		file: 'icons/logo_128.png'
	},
	chgkpfgnhlojjpjchjcbpbgmdnmfmmil: {
		name: '有道划词',
		file: 'style/content.css'
	},
	chkigklfmceaafjchflihcklkjhkallb: {
		name: 'Sechify',
		file: 'assets/images/8.PNG'
	},
	cigjjnkjdjhhncooaedjbkiojgelfocc: {
		name: 'Sales Sort for eBay Advanced Search',
		file: 'assets/img/home.png'
	},
	cinalcbancbfnkeajghjljhmaanjekgl: {
		name: 'sendencrypted',
		file: 'dist/extension.js'
	},
	cjabmkimbcmhhepelfhjhbhonnapiipj: {
		name: 'simple-virtual-keyboard',
		file: 'content_scripts/contentScript.3a8356c2.css'
	},
	ckmkiohpkfmbdpmoeekpoimknkmjnjnn: {
		name: 'Google Metronome',
		file: 'images/icon-16.png'
	},
	clhmnbpdboilpogpmojknkopklkfggpa: {
		name: 'LeadRocks for LinkedIn',
		file: 'icons/copy.svg'
	},
	cmibkdkcjkhjinfeobpnfgpafbjdgbke: {
		name: 'WA Web Sender',
		file: 'logo/cc.png'
	},
	cmoakldedjfnjofgbbfenefcagmedlga: {
		name: 'Nest Wallet',
		file: 'injected.js'
	},
	cnfmojhcmleelapdiapckcdlkgbmdolh: {
		name: 'KWS Everywhere',
		file: 'pages/settings.html'
	},
	cniohcjecdcdhgmlofniddfoeokbpbpb: {
		name: 'EME Logger',
		file: 'trace-anything.js'
	},
	cpjinncdhahoifeafejhlfohlomhkmkf: {
		name: 'AIPrompter',
		file: 'resources/images/tip.png'
	},
	cpmjnpalighpdecgankobogpcmbceaig: {
		name: 'Easy Login',
		file: 'manifest.json'
	},
	dcbmjjachokjjbofinpakpebaeckdhbc: {
		name: 'Forethought Assist',
		file: 'zaf.min.js'
	},
	dchjcpaccnemnmhnnmkcpapjieaknljk: {
		name: 'Prayer Times',
		file: 'donate.js'
	},
	ddaigcnbmdcdkfocmgkpbbnhmfekglkp: {
		name: 'DingTalk AI',
		file: 'views/popup.html'
	},
	dejblhmebonldngnmeidliaifgiagcjj: {
		name: 'Quick Find',
		file: 'images/sprites/close.png'
	},
	dejmgcinmidgfjbnfkeeopfmfmcggdhj: {
		name: 'Studylib New Tab',
		file: 'assets/img/star.png'
	},
	dfgdlkjpipgemdjaggbaponjifbnekhj: {
		name: 'PCR Capture',
		file: 'assets/uno.css'
	},
	dfmahbmljohdkjopniglmkehnkpkmcoi: {
		name: 'xPrice',
		file: 'assets/logo.svg'
	},
	dfmneaiofkanmpaglhkflhdppdjpjfpj: {
		name: 'Show Api Name',
		file: 'assets/js/utils.js'
	},
	dghkonilohohljaaadfgilonemgkoack: {
		name: 'Temp Gmail',
		file: 'assets/html/popup.html'
	},
	dgijgfdodcankfloblhnngmlkdaahbco: {
		name: 'Google Transcribe & Summarize Live',
		file: 'meet_helper.js'
	},
	dhkkimcelcgopfjblmblfhbihlihhppe: {
		name: 'Hilton ResSmart Click to Dial',
		file: 'images/bg.svg'
	},
	djdfdgpbbieoekodflodcagmnjnineji: {
		name: 'Vận chuyển Việt Trung',
		file: 'style.css'
	},
	djldgekfnmbecjgdfnbnilgoojfihfli: {
		name: 'AsoSpy for Google Play Store ASO',
		file: 'icons/ads.png'
	},
	dmfbmenkapmaoldfgacgkoaoiblkimel: {
		name: 'Adobe Content Authenticity',
		file: 'adobe.png'
	},
	dmlmenebejdemdbmgldkpckfbmijlchh: {
		name: 'Zillow Redfin Realtor',
		file: 'lib/jquery.js'
	},
	dmnffcicegjjhjaekeloefipmjlokill: {
		name: 'AI Response',
		file: 'icons/logo.svg'
	},
	doklnekkemmhclakfekoccilofpdcncb: {
		name: 'Codatta Clip',
		file: 'signin.js'
	},
	dpkbdbpmahebenenkkjenihgfophknbm: {
		name: 'Overloop',
		file: 'lib/dist/domain.js'
	},
	dpleccoifgoflihlgpjlkeigjemckbgn: {
		name: 'Simple Posher',
		file: 'bell.mp3'
	},
	ebgflkobfhjpflbgafeagfghohihmljb: {
		name: 'TacticalExpander',
		file: 'images/icon-16.png'
	},
	edkkcpojmipkpbiaiggldpoiefhnikmc: {
		name: 'Boycat',
		file: 'Boycat.png'
	},
	efakcomgmimcekdejnoafmmbgnpdhdfm: {
		name: 'Video Library Search',
		file: 'icon.png'
	},
	eghoepajpakgokngemfopchhjadobffk: {
		name: 'Find Color Code from Image',
		file: 'assets/palette'
	},
	ehdgefjodihkpljimhcikjflmikgggap: {
		name: 'BarnumPT',
		file: 'apps/apps.css'
	},
	ehedpkhlaonkccedaciehcihdmmglbkl: {
		name: '推广助手',
		file: 'src/assets/js/snArea.js'
	},
	ehekffhhobjogdcdafcfhkfpcpaeagnd: {
		name: 'GPTOnline',
		file: 'README.md'
	},
	eidehbdehdaggoophgjhkplcbjhelfkc: {
		name: 'Muses Wallet',
		file: 'pageProvider.js'
	},
	eiioekmbhhpgbljomeellckfbehjmhnf: {
		name: 'Screen Shot',
		file: 'js/dialog.js'
	},
	eijfgedfkehblhdaiommcibimdgfgbop: {
		name: 'Winning Hunter',
		file: 'static/js/main.js'
	},
	ejcciljmcobakbcljagiadhbholnahja: {
		name: 'VipIP.ru',
		file: 'assets/img/logo.png'
	},
	ejolmkmnegbamafoknjamlggejcikonk: {
		name: 'Enhanced Outlook',
		file: 'js/mainCS.js'
	},
	engdhlnghkdaoccckbbglafcanmpohob: {
		name: 'Export WhatsApp Surveys',
		file: 'script.js'
	},
	enhjjhkhjenjnanplmdkahkbkoeeljjp: {
		name: 'FuseBase Clarity',
		file: 'assets/flex.css'
	},
	enhpjjojmnlnaokmppkkifgaonfojigl: {
		name: 'trellus',
		file: 'recorder.js'
	},
	ennfiiedhgpkgfknpaggcammgfohgfap: {
		name: 'Shopee Image Downloader',
		file: 'js/contentScript.js'
	},
	faaknmkjnigkoehjkgeenmafoacngiif: {
		name: 'ZingProxy',
		file: 'flags/hn.svg'
	},
	faldnoiigniimnhfjoaddcfoaoenkkgo: {
		name: '블로그 글자수세기',
		file: 'src/scripts/main.js'
	},
	fcnadghcijkmdhjdgiehgfpadojilfoa: {
		name: 'Snip',
		file: 'images/x.png'
	},
	femogemiolfjofilbccdokahgohlokha: {
		name: 'Voice Changer',
		file: 'icon-34.png'
	},
	fepohihpoobnpbgnnndppkbmloaohhco: {
		name: 'MiCloud Connect',
		file: 'images/icons/icon12.png'
	},
	fhbhfcoaaflofffbnmjffkbcjhpafanb: {
		name: 'Spoak',
		file: 'index.html'
	},
	fhdmbhgpabjkadpaafomaabbdckofphm: {
		name: 'HoverNotes',
		file: 'hn-inject.css'
	},
	fikmdgdekfjikohjnjabmmefbkmkahgj: {
		name: 'Chatgot',
		file: 'content.js'
	},
	fjidjgneljagnakdcijilikbmgoajeln: {
		name: 'Windy',
		file: 'stubs/prefixed.css'
	},
	fkpngmoodfpnnnnbabhnnbemglnphncc: {
		name: 'QR Code Scanner',
		file: 'src/popup.html'
	},
	flhpobcpjeilaheadnpdkkinakogbdhb: {
		name: 'HashPass Wallet',
		file: 'pageProvider.js'
	},
	fmeenkjnbikclpgbonadanhnipgmofhn: {
		name: 'gloCOM Call',
		file: 'detectAjax.js'
	},
	fmnaobbfmjaaaebelkacpmmmpaaefbod: {
		name: 'WebSocket DevTools',
		file: 'src/content/injected.js'
	},
	fofjdonkemjmfkaapekcfakjocelcejk: {
		name: 'VKnow',
		file: 'dtree.js'
	},
	fopgafjdjlongoeblobbafbnapafcicg: {
		name: 'Twemoji',
		file: 'options.js'
	},
	gaibhhiogjpncmcehohlmcikfgbcacbl: {
		name: 'Phone On Web',
		file: 'assets/index.js'
	},
	gbpjnjieenljpncojgiboejmolbihdob: {
		name: 'Thumbnail Grabber',
		file: 'src/content-script.css'
	},
	gclnfffacbjpclfenjgefpfnafmjghhk: {
		name: 'AvailableReads',
		file: 'icons/icon25.png'
	},
	gedoaajonjaiigaefeaanpfmhnadkgkm: {
		name: 'Breeze',
		file: 'images/close.png'
	},
	gfepljemgkegiccegjbclmhmnodpieoj: {
		name: 'Hire3x Proctoring',
		file: 'README.md'
	},
	gfjkkccgjogpdhmhdinjngakpajljhba: {
		name: 'Dynu Dynamic DNS Client',
		file: 'icon48.png'
	},
	ghijcjpcgppajgljcdpddjkmeoonphcm: {
		name: 'I-Play',
		file: 'constants/donation.jpg'
	},
	ghlpdbkhlenlfiglgphledhfhchjfjfk: {
		name: 'Inssman',
		file: 'options/options.html'
	},
	ghnnkkhikjclkpldkbdopbpcocpchhoi: {
		name: 'Shein Images Downloader',
		file: 'injected.js'
	},
	glhpeoijpjagckhmieidipcekdmmhofn: {
		name: 'FatfoxTab',
		file: 'content.js'
	},
	gllmkcahdekdbapmdfnffclacbpnicaj: {
		name: 'MSA',
		file: 'images/logo.png'
	},
	gmkblbmghnolinkhfmkidocbojcfiejm: {
		name: 'Jump To Recipe',
		file: 'popup.html'
	},
	gmkgbihnjmflaahgkhlmenngplbinkji: {
		name: 'Phone-C',
		file: 'img/x.png'
	},
	gnbafbeabkbkecmbedfgebgboicpnkpp: {
		name: 'Pixelay for Figma',
		file: 'css/content.css'
	},
	gndcbndejfodldbldgjlbceailbadmni: {
		name: 'TasteWP',
		file: 'images/logo.svg'
	},
	gnkoofidpbkdoejdloidmbdefjpgpjdi: {
		name: 'Walution',
		file: 'app/pwmClient.js'
	},
	gnogdcplfkjnmnapmdheajijmmoooion: {
		name: 'Bonk Leagues Client',
		file: 'client/js/injector.js'
	},
	goflchmdpidhhepjfpdmjoklebbjggje: {
		name: 'Tab Suspender',
		file: 'suspend.js'
	},
	haddgijkelkjimhdhgaopfcjhnoipimj: {
		name: 'typedesk Canned Responses',
		file: 'logo_icon.svg'
	},
	haigaafonckooggfpmjplfpbkafelcfe: {
		name: 'dmitlichess',
		file: 'ogg/completed'
	},
	haikmmmjkcejaalkjbfobneapigfmldp: {
		name: 'CMeter',
		file: 'addonParams.js'
	},
	hbghjfaenddmdpbkobgdcgkmcdcdjjko: {
		name: 'FluentAI',
		file: 'main.css'
	},
	hbihkmdifofjofeoaoppajjpcjcpgndk: {
		name: '股票基金管家',
		file: 'options/options.html'
	},
	hbnbcapieoandchfgacedlkjpdbbejgb: {
		name: 'NoCaptcha AI',
		file: 'temp.js'
	},
	hbneiaclpaaglopiogfdhgccebncnjmc: {
		name: 'TanglePay IOTA Wallet',
		file: 'js/inject.js'
	},
	hbnpcbochkgodkmmicbhfpmmkhbfbhim: {
		name: 'Mojito',
		file: 'mojito.js'
	},
	hdbnkdbhglahihjdbodmfefogcjbpgbo: {
		name: 'OptMeowt',
		file: 'content-scripts/injection/gpc-dom.js'
	},
	heakbijbjdlpkklmplhmnhieollhoicg: {
		name: 'VK video downloader',
		file: 'popup.js'
	},
	heamnjbnflcikcggoiplibfommfbkjpj: {
		name: 'Zeal',
		file: 'zwidget.html'
	},
	hekemgbiebopgohbhcheiibcpelbbfon: {
		name: 'CAD SCOUT 3Dfindit',
		file: 'images/bim.svg'
	},
	heojonaoafggmjonoicpcknmamoepjha: {
		name: 'Arc XP',
		file: 'inject.js'
	},
	hiikgabmcoakjhhodkajjkgdhpkmfcbp: {
		name: 'Spotify Transcript Extractor',
		file: 'no_transcript.html'
	},
	hjcdffalgapcchmopkbnkljenlglloln: {
		name: 'ENO-M',
		file: 'dist/contentScripts/style.css'
	},
	hloeehlfligalbcbajlkjjdfngienilp: {
		name: 'Steps Recorder',
		file: 'Images/Like.svg'
	},
	hlofigcdgjlnalbkeeinfcjceabpamci: {
		name: 'The Great Suspender Reloaded',
		file: 'js/tgs.js'
	},
	hmckjkoaomjipiplhjmihgdjgkjedfjg: {
		name: 'Merch Dominator For Merch',
		file: 'img/logo.png'
	},
	hnffjpappohfnmhdimbpeljbnokjagdd: {
		name: 'Click-to-call для MANGO OFFICE',
		file: 'images/call.svg'
	},
	hopgpglmfiggpmklcakbdjfimfbfchck: {
		name: 'Nobi Pro',
		file: 'offscreen.js'
	},
	hpglfhgfnhbgpjdenjgmdgoeiappafln: {
		name: 'Guarda',
		file: 'src/provider.js'
	},
	ibkcolodejfkapecfacofdibcaoldbjf: {
		name: 'OneVnet',
		file: 'js/popup.js'
	},
	iccjbccjppdhlmnicgjkabhapcmilpog: {
		name: 'BP Assistant',
		file: 'ga/analytics.js'
	},
	icpgekloenpkdgbbjnmjddbcmjglflkj: {
		name: 'Proxy Switcher',
		file: 'popup.css'
	},
	idffaipgnlkhfhibgnodeiogpgojcmfm: {
		name: 'Duolingo Solution Viewer',
		file: 'src/ui.js'
	},
	idnejmodeepdobpinkkgpkeabkabhhej: {
		name: 'AgentQL Debugger',
		file: 'src/dom_inspector.js'
	},
	ifnlkhhhhklpmjjbdpnpenpgbndniedg: {
		name: 'Super Highlighter',
		file: 'images/16.png'
	},
	ihbpmnmphkggmijhpofecgepllfmliki: {
		name: 'Cursor Trails',
		file: 'popup.js'
	},
	ijdelikbohnbiacoipaclicioknnihni: {
		name: 'JP English Dictionary',
		file: 'opencvHandler.html'
	},
	ikgahaiijeoaeeknbphnnjklapmpojpg: {
		name: 'Exams4Zoom',
		file: 'script.js'
	},
	ikmpcihcohdjammgkopfgohojdelmfoi: {
		name: 'Lichess enhancement',
		file: 'ressources/js/arrive.js'
	},
	ilhaljfiglknggcoegeknjghdgampffk: {
		name: 'Beam Web Wallet',
		file: 'inpage.js'
	},
	ilocfjnmkngcmoonmlpmdiigiddlloea: {
		name: 'РешуОГЭ/ЕГЭ+',
		file: 'script.js'
	},
	inipbahbdjhjifmangkoieefplnkcckn: {
		name: 'Công cụ đặt hàng của Báo Gấm',
		file: 'logo-small.png'
	},
	iogidfihemjcepgbcaccmickojidjhlf: {
		name: 'GMB Audit',
		file: 'assets/style.css'
	},
	ipkhkglhpmngdkgclngmlpkekkpplbgm: {
		name: 'Prayer Times',
		file: 'solemn.mp3'
	},
	jbfkkljambdhjlkcfkcbpjfkkamkccfm: {
		name: 'Onoff Business',
		file: 'widget.html'
	},
	jbnlcgeengmijcghameodeaenefieedm: {
		name: 'Snowplow Debugger',
		file: 'config.json'
	},
	jcmgaoihheikehfhnhjdedbnbaipdpkf: {
		name: 'Ambition',
		file: 'dist/contentScripts/style.css'
	},
	jdfkagmmfcpkkapheeidelffnligiekb: {
		name: 'RightClick',
		file: 'popup.html'
	},
	jeiknhbgbecfmponmblcpaimhhdoleca: {
		name: 'Masterschool',
		file: 'static/css/main.e5ab261a.css'
	},
	jgbmahcekagncippgbmfipnjkonnhbkd: {
		name: 'SpellCheckerGE',
		file: 'popup.js'
	},
	jhllfdbccclcdiafljibcabipbmkfoem: {
		name: 'ChatGPT History Search',
		file: 'google.svg'
	},
	jifommjndpnefcfplgnbhabocomgdjjg: {
		name: 'ScrollMaps',
		file: 'images/permission_icon.png'
	},
	jijophmdjdapikfmbckmhhiheghkgoee: {
		name: 'AmzGPT',
		file: 'icon/icon.png'
	},
	jilkhjfakcninakdpdaphnljmkibpmki: {
		name: 'Zippi',
		file: 'injectScript.js'
	},
	jkeolmadidncndcbnajhaojepbolajag: {
		name: 'Lunabot',
		file: 'index.html'
	},
	jlcldhpjcgmbiohpehggoadbpkfminpe: {
		name: 'Volume Booster',
		file: 'assets/fonts/Inter-VariableFont_opsz,wght.ttf'
	},
	jlffehhlfkdbdheffcaekpmkhfphmhpg: {
		name: 'Wildmonkey',
		file: 'main.js'
	},
	jlhmjkajbdaelbnigkpegbkcnbpmggab: {
		name: 'FRAK',
		file: 'index.html'
	},
	jljkolhigfenknpcjgcjkkafofcgcead: {
		name: 'AI Chat',
		file: 'icons/logo.svg'
	},
	jmiljbojpfggbcbjkphaocldmfghdjmp: {
		name: 'Mega Ad Blocker',
		file: 'static/filters_data/data.json'
	},
	jmlaohefegdedjnmgpedcoococlpdida: {
		name: 'Zoho Expense',
		file: 'loader.html'
	},
	jmmcaedcfanikacagdjdhdjcekckdpom: {
		name: 'Color Name Finder',
		file: 'logo.png'
	},
	jmohbogdcndleclcgnmjnfmghegbdfma: {
		name: 'Our Mouse Gesture',
		file: 'js/content.js'
	},
	jnfhbofpfodjehahbofdnaliphmjngnf: {
		name: 'Vajehyab',
		file: 'src/images/x.svg'
	},
	jnhibbjmekoijdjaopflcjbjieamifhh: {
		name: 'vREST',
		file: 'options.html'
	},
	jnphifhadlaidikiafjceeogookkpgll: {
		name: 'FASHIONGO Style Match+',
		file: 'img/loading.png'
	},
	joioghagfpnpmdfdjijibfbfeolkddlf: {
		name: 'Fabrie Web Clipper',
		file: 'assets/js/index.js'
	},
	kbcomfmcakpckijlmbkglflflmokhgof: {
		name: 'Trade Token Sync',
		file: 'content-scripts/universal.js'
	},
	kbhghidlilegihmipoohlboebekiigli: {
		name: 'SEO Pilot',
		file: 'main.js'
	},
	kbppfmkmcilakibigimbnohnbefifaao: {
		name: 'Scope360 for Jira',
		file: 's360.css'
	},
	kcgmbngghfpnddnfccnabnioiidenipc: {
		name: 'Beep for Gmail',
		file: 'assets/icon48.png'
	},
	kcoefldjifkfeclbjicapcenpknedhnf: {
		name: 'Payscore',
		file: 'Images/download.svg'
	},
	kddlnbejbpknoedebeojobofnbdfhpnm: {
		name: 'RideShare Trip Stats',
		file: 'assets/_commonjsHelpers-CUmg6egw.js'
	},
	kfngooidkiiljlbpaafgcfjddkgnhjkl: {
		name: 'xLaw',
		file: 'img/rk.png'
	},
	kgbmammdmhpmpjhlnelelcdmomlbidkd: {
		name: 'Give Freely',
		file: 'shoppay.js'
	},
	kgidpmgjombekdkhnlkbhaoenldlpmeb: {
		name: 'Sitemap Generator',
		file: 'pages/tooltip.js'
	},
	kgjaddbcmpmacilgaekjfelhdebfjgib: {
		name: 'Dropdown Search',
		file: 'select2.full.js'
	},
	kgmbjoakninmbejgngppphhlbcjelcif: {
		name: 'nDocuSoft',
		file: 'thirdParty/font1.ttf'
	},
	khggpfckdcbplckilngofklijfifinmj: {
		name: 'Codeium Enterprise',
		file: 'script.js'
	},
	khppfbnjbaampmeeiocjhcodkklkcfjf: {
		name: 'MIDI Player',
		file: 'inject.js'
	},
	kilnpioakcdndlodeeceffgjdpojajlo: {
		name: 'Aurox Wallet',
		file: 'inject_script.js'
	},
	kjlehednpnfgplekjminjpocdechbnge: {
		name: 'MainWP',
		file: 'js/mainwp.js'
	},
	kkaohflldandkklonkginlamccaknkok: {
		name: '샵플링 플러그인',
		file: 'config.json'
	},
	klddneocmcmoacnnemmelgeilnedcpjj: {
		name: 'BPM Changer',
		file: 'mainContentScript.bundle.js'
	},
	klohmfhfijipahknljjelpfgjpmandmg: {
		name: 'Human Reader',
		file: 'images/play.svg'
	},
	kmchiimcbhaaadgpnelddelgiaeahobi: {
		name: 'Aloware Click-To-Call',
		file: 'img/call.png'
	},
	kmhjedddeligclkfcfbghcgngkhokdee: {
		name: 'THunt image search',
		file: 'icon/icon16.png'
	},
	kmmefoagengbhadldokpjbkppebklema: {
		name: 'iKorektor',
		file: 'img/bolt.svg'
	},
	knnmlfjaelcpgldncmbcpcpamlikabbl: {
		name: 'Smart Video & Audio Downloader',
		file: 'modal.html'
	},
	knofkelobfihppebfpbcbnfeeifldfgf: {
		name: 'Jenni Web Importer',
		file: 'single-file-bundle.js'
	},
	kocklgpfjooneciijedkjhbclookilfb: {
		name: 'Qalam',
		file: 'icons/16.png'
	},
	kofahhnmgobkidipanhejacffiigppcd: {
		name: 'LT Debug',
		file: 'index.html'
	},
	kolfcecahpbgbilkdkalabnfjjklkkae: {
		name: 'XPLA GAMES Wallet',
		file: 'inpage.js'
	},
	kpflbjbcnmdmcahhdjhgbjfaclgefdbd: {
		name: 'waboxapp MV3',
		file: 'client.js'
	},
	kphegobalneikdjnboeiheiklpbbhncm: {
		name: 'Ajax Interceptor Tools',
		file: 'pageScripts/index.js'
	},
	laooinkgdapbcbjchpmihliljfnakkdh: {
		name: 'cssPicker',
		file: 'img/logo-16.png'
	},
	lbjapbcmmceacocpimbpbidpgmlmoaao: {
		name: 'Metalet',
		file: 'content.js'
	},
	lchpepnpfkooehfcdnlaklepfiedhipi: {
		name: 'BeyondTrust Workforce Passwords',
		file: 'version.js'
	},
	lckdbjbebjjkogahablhggjbekaepogf: {
		name: 'Dream ChatOS chat message sender',
		file: 'js/tawk.js'
	},
	lfaifjhjdolnpnlgeohohaalbeidhlpj: {
		name: 'Commanders Act Assistant',
		file: 'icons/48.png'
	},
	lfeanemcbooflodhblonkcpjgmdkoepf: {
		name: 'Translator for Messenger Web',
		file: 'assets/index.6e42ac10.js'
	},
	lfkdmdnfepkebjblbleflfeilnhllpae: {
		name: 'Coupongogo',
		file: 'media/css/base.css'
	},
	lgkfjdlfhjdjcmkdgmciobikpjakpgjn: {
		name: 'Twos',
		file: 'content.styles.css'
	},
	lgkipoadghdedmdaheacnjcfabmheeck: {
		name: 'H1B Sponsor Checker',
		file: 'index.html'
	},
	lhdjjndpipjcmlbkglbaphamfpjiiipo: {
		name: 'Chapax',
		file: 'chat.html'
	},
	lhhocifdmhogpekeppdjamkelohahbop: {
		name: 'Downloads',
		file: 'img/icons/icon-48x48.png'
	},
	lhifbnmampdmdadbhpeeoikkljhiaohn: {
		name: 'WebInk',
		file: 'dist.95dd2b81.js'
	},
	lhnmlndglclegompodlkifbmkhedoing: {
		name: 'eNewie Cloud AI Subtitle',
		file: 'images/icon48.png'
	},
	lieifjiddifccacnhgcafeebpahodebe: {
		name: 'Kimi Sidebar',
		file: 'icon-34.png'
	},
	liembfglbhoaacklkmapenocnhckgcdk: {
		name: 'CB Insights',
		file: 'main.js'
	},
	ljmncfcjgfjogaelciimcgnogdbpbkoh: {
		name: 'NeetoRecord',
		file: 'chunks/tabs-BZ9gVNwI.js'
	},
	lkhmjelfhkidbekjkghmbacoaolbcmep: {
		name: 'Shoot the Messenger',
		file: 'submitSearch.js'
	},
	lmebfikckidfjlkdajghlcmcmkefdkah: {
		name: 'Executive Road Warrior Web Defender',
		file: 'icons/icon128.png'
	},
	lmgopblphifhibefhjehacdnngaohdoe: {
		name: 'CI',
		file: 'img/icon48.png'
	},
	lmjdeimbphcbnfekpgblhlbhknpmaoij: {
		name: 'Hello Kitty Cursor',
		file: 'cursors/local.json'
	},
	lmldakdjelendidnmaieidggbffljlle: {
		name: 'Senja',
		file: 'assets/storage-JVAJO15L.js'
	},
	lmmbbhmbabdipogenjcndkkjjphkacpo: {
		name: 'myparcels.app',
		file: 'img/no.png'
	},
	lmmpjincoilkndipbbpaojcpamfacbel: {
		name: 'Autify Recorder',
		file: 'static/js/autifyGlobal.js'
	},
	lobgnfjoknmnlljiedjgfffpcbaliomk: {
		name: 'WA Number Checker',
		file: 'assets/wa.js'
	},
	lodbfhdipoipcjmlebjbgmmgekckhpfb: {
		name: 'Harper',
		file: 'wasm/harper_wasm_bg.wasm'
	},
	loipjegagmfjcbofhmigjemdfcahcggm: {
		name: 'Arabic Dictionary',
		file: 'tooltip.js'
	},
	lpnnhhkdbmobjiheokoonjlmaffljcng: {
		name: 'RemNote Clipper',
		file: 'assets/icons/X.svg'
	},
	madglblnbddpkecoihhnkohnofachcgn: {
		name: 'XPath Helper',
		file: 'res/icons/ui/drag.png'
	},
	madmnbedogbppkndfjkhmkklikhoimdo: {
		name: '玄奘百宝箱',
		file: 'insert.js'
	},
	maibneeahfkanhakkogkbcakcadjejkl: {
		name: 'Better Classroom',
		file: 'html/dropdown_list.html'
	},
	makmhllelncgkglnpaipelogkekggpio: {
		name: 'Litmus',
		file: 'inject.js'
	},
	mbgcfldceiogelfphfjdlbhbofcobcco: {
		name: '전화번호안심로그인',
		file: 'web/alert.html'
	},
	mcbhalpamcihagflkpllacdcfmmnjemn: {
		name: 'markClipper',
		file: 'scripts/func-script.js'
	},
	mccegadjoafkdahijbbincjlicfjjibd: {
		name: 'Walnut',
		file: 'vendor/fs.js'
	},
	mcplhmdgjcnoopibapjpbhnjfoainmac: {
		name: 'Rayst',
		file: 'icon-34.png'
	},
	mdhaadeocjnpjkpecinmaokfmbcgocgn: {
		name: 'Ringostat click-to-call',
		file: 'favicon.ico'
	},
	meeeiblldcmbdhhaibnbpdiiknkoaakl: {
		name: '패스트컷AI',
		file: 'images/x.png'
	},
	memnnheiikbfdcobfkghhfihnegkfici: {
		name: 'Chat Memo',
		file: 'icons/logo.svg'
	},
	mfalklfpognjpjfbfllclbfjieknodid: {
		name: 'Athene Wallet',
		file: 'keep-alive'
	},
	mgceiehcajpibpoeiddepnnmfkgiipdd: {
		name: 'Convert JPG to PDF',
		file: 'assets/css/Index.chunk.css'
	},
	mhfodjdadffkgglbjdlnfakpohhemdga: {
		name: 'Eye Saver',
		file: 'src/util.js'
	},
	mhojlnjhellbccabnfnlgebjnopdmdph: {
		name: 'Page Analytics',
		file: 'assets/css/700.chunk.css'
	},
	mjmjgaclkoadgkgpaaclfajeffcoochp: {
		name: 'CiJiang-AMZ massive keyword operation',
		file: 'assets/icon.png'
	},
	mkfgeifgmfnklgfhdblfeeemhkhgigee: {
		name: 'Crypto-Cardholder',
		file: 'sidebar/style.css'
	},
	mljponncmhdlacmjbophphkbgcgjdnff: {
		name: 'MyDoge',
		file: 'assets/bg.png'
	},
	mlniogmfpplklfllojkdfgfjiiibcmma: {
		name: 'Stylar',
		file: 'assets/img/0001.png'
	},
	mmlghgaenodejbokcogohcjelnogcckl: {
		name: 'HackerRank QuickApply',
		file: 'main.css'
	},
	mncjlogojblmjaapdhpbihnkdbffdcgp: {
		name: 'Wordvice AI Writing Assistant',
		file: 'popup.css'
	},
	mnkpjcgdlhenamhcbempiogjamdkbbgi: {
		name: 'Tagbird',
		file: 'inpage.js'
	},
	mnnkpffndmickbiakofclnpoiajlegmg: {
		name: 'Concordium Wallet',
		file: 'inject.js'
	},
	modkelfkcfjpgbfmnbnllalkiogfofhb: {
		name: 'Read Frog',
		file: 'content-scripts/side.css'
	},
	mohdgdcdkibdljkppnmnihdacpbpllmj: {
		name: 'Font Detector',
		file: 'assets/icons/font-detector-logo-38.png'
	},
	najkpicijahenooojdcnfdfncbaidcei: {
		name: 'Chats Backup for wa',
		file: 'injected.js'
	},
	nbmibeplmlgngdlophigpneidnekoceo: {
		name: 'WallySmarter',
		file: 'login.html'
	},
	ncaknkaehhieldhnmimbjnfgneaiijbd: {
		name: 'AI Homework Helper',
		file: 'images/sun48.png'
	},
	ndcehhfhbobpfbnkigpomgbaomabgcoa: {
		name: 'Apollo Scraper',
		file: 'photos/vv.png'
	},
	nepeemhbchedjbebdekhpkhknljppmif: {
		name: 'Modelpress Image Downloader',
		file: 'images/gear.svg'
	},
	nfgdckhmemppdbmhhhioindkickfknad: {
		name: 'Dutycast',
		file: 'static/assets/bag.svg'
	},
	ngbebejjbijmijmhbbpkllcnjpgkjikl: {
		name: 'Depth Translator',
		file: 'Deepl40.png'
	},
	ngcickocpcongeagbpkejabhkgmcildo: {
		name: 'FACEIT Visuals',
		file: 'pro.png'
	},
	nggpkpfmdkbaakpndblpandmldendooa: {
		name: 'Jinno',
		file: 'inject/Jinno.js'
	},
	ngmlmeaknfjiomiklcdjmoajhdompmii: {
		name: 'POS & Label Printer Manager',
		file: 'tabs/index.html'
	},
	nhjdkmpfplnhgdehbcdpiapecnfodbln: {
		name: 'crawl sitemap generator',
		file: 'content.css'
	},
	nhomcdhhlpjelhmjppkcdhoejehbkodd: {
		name: 'meetXcc',
		file: 'meet_helper.js'
	},
	niiahgnkkalkindhghjcaojcpbkhfbbp: {
		name: 'Global Privacy Control (GPC) Inspector',
		file: 'inject.js'
	},
	njcnagohlmamfijimejlnelenhahnoce: {
		name: 'Piwik PRO',
		file: 'js/app.css'
	},
	njmimaecgocggclbecipdimilidimlpl: {
		name: 'Reddit Comment Collapser',
		file: 'image/expand.png'
	},
	njolgcnddhepjpplfifbmagdgkidikpj: {
		name: 'Color Picker from Image',
		file: 'logo.png'
	},
	nljfdifffnfijpidnjfbibbdeipnnlln: {
		name: 'Guidejar',
		file: 'fonts.css'
	},
	nnclkhdpkldajchoopklaidbcggaafai: {
		name: 'VB Sender',
		file: 'logo/cc.png'
	},
	noeifmogdcakcepkkgpgpfmfjkpjembc: {
		name: 'Tóm Tắt Văn Bản',
		file: 'css/sct.css'
	},
	noglbipnalamijcpdffjihmepadieajn: {
		name: 'Arvin',
		file: 'tabs/index.html'
	},
	nopflpjffmdlioccdjkhkdgbgfmkcpbd: {
		name: 'TradeWiz',
		file: 'src/lib/injected.js'
	},
	oacfincmbjdddohpjgjjnhocgljhpeda: {
		name: 'Twitch DM',
		file: 'icon-64.png'
	},
	oaenllollgdmpdfhohchhnalkjpogepl: {
		name: 'SearchGPT',
		file: 'js/chat_ai.js'
	},
	oaodbbeaklbdmjcghbkcfgmioafnjbfe: {
		name: 'grateful-grabber',
		file: 'stealie-128.png'
	},
	ocelmccppkcibiflhhepafdjjomimddf: {
		name: 'EasySubs',
		file: 'icon-34.png'
	},
	odkdoekijebogaiopbjgkgogkgifjfnk: {
		name: 'Angular Inspector',
		file: 'dist/detector.js'
	},
	oecglhldbofcklanmhckefiflhfhabdd: {
		name: 'やっぱり Noto Sans',
		file: 'css/replacefont-extension-bold.css'
	},
	oefjnfpageadahlgfklncpebmanopcoj: {
		name: 'ELMessenger Pro',
		file: 'images/elm.png'
	},
	ofeanjpmjdifbpdcjakglfiphhdibokg: {
		name: 'DeftGPT',
		file: 'static/453.js'
	},
	ofhlminijomemliahkjjbgcbfoimjiaj: {
		name: 'PordaAI',
		file: 'src/readme.txt'
	},
	ogcopdaeipjphchggpacpamopkdehdgg: {
		name: 'EBSCOhost Passport',
		file: 'static/Institution.png'
	},
	ogfaopdbhmafgcmoaefekfhdkghhealf: {
		name: '3-2-1 Revolver',
		file: 'js/background_script.js'
	},
	ojifjnngghhagndjdfeemiccjppainil: {
		name: 'SalesHood',
		file: 'assets/auth-c13ebfc8.js'
	},
	okchldnojljcfhjhjmeibjpflepmnkaf: {
		name: 'Asin Gadget',
		file: 'icons/128.png'
	},
	okejgpcglnpafnfnmgekpfnddicfhddo: {
		name: 'Group Extractor',
		file: 'img/pay-secure.jpg'
	},
	olkajojhnkcmkfpkblpicjmhcajamncd: {
		name: 'AwardTravel',
		file: 'ihg.js'
	},
	olleimfechlneaefjoobiicamefinhhf: {
		name: 'Penny AI',
		file: 'content.js'
	},
	olmmaccabblmaegeofmeidedoahadlkp: {
		name: 'Wordeep',
		file: 'wordeep.css'
	},
	ongmhdpacmehecbiabpknpdfkjolbpbk: {
		name: 'Облачный парсер',
		file: 'styles/ico_48.png'
	},
	oopkfefbgecikmfbbapnlpjidoomhjpl: {
		name: 'BewlyCat',
		file: 'assets/empty.png'
	},
	opaohckmjkaakaaacfamchijckiagnbi: {
		name: 'Better Flight Finder',
		file: 'interceptor.js'
	},
	opihcipckemolhojbblphpfegfbimhgo: {
		name: 'Simply Best Coupons',
		file: 'content/styles.css'
	},
	padcpabfckdbahodkfkincpaaeinejik: {
		name: 'Ask Gene',
		file: 'front_end/docs/docs.js'
	},
	pahfpfcfakjnfjgknppagnmajidhakea: {
		name: 'darkmode',
		file: 'css/noty.css'
	},
	pajinnhelbahlkakdibkhfcnnoflloff: {
		name: 'Browser Redirection',
		file: 'bcr.html'
	},
	pakmpbenpabdjjgpieichnpkmedcnpne: {
		name: 'BestStore Printer Launcher',
		file: 'ping.js'
	},
	panpgppehdchfphcigocleabcmcgfoca: {
		name: 'Desig Wallet',
		file: 'static/js/injectedscript.sol.js'
	},
	pbbiianacjodglafeohjdipcjnmbbhbd: {
		name: 'Page Camera',
		file: 'tabs.js'
	},
	pcidanpimdgppoffjgbknephlpehfmfb: {
		name: 'Zoom Phone For Outreach',
		file: 'images/logo.png'
	},
	pdebmboeclmkhcbldifomfpekphdmlgb: {
		name: 'DeepSeek',
		file: 'images/icon16.png'
	},
	pejfngbeemalmomekgadijpgafjjocnn: {
		name: 'Mereos',
		file: 'options.html'
	},
	pemdbnndbdpbelmfcddaihdihdfmnadi: {
		name: 'SelectON',
		file: 'assets/icons/button-icons/cut.svg'
	},
	pfcikkcgjmkajmladjaalbcheeakeiap: {
		name: 'SEO Broken Link Checker',
		file: 'main.js'
	},
	pinjkilghdfhnkibhcangnpmcpdpmehk: {
		name: '微博图床',
		file: 'scripts/env.js'
	},
	pjhgdolnnlcjdngllidooanllmcagopf: {
		name: 'history & web cache cleaner',
		file: 'img/info.svg'
	},
	pkkmgcildaegadhngpjkklnbfbmhpdng: {
		name: 'ChatSearch',
		file: 'pay.html'
	},
	plkaaldfeolmpbeahghnndlphopbpcfm: {
		name: 'Whale CoPilot',
		file: '300.js'
	},
	plnpanokbgeabagnmbcamehkcninjbac: {
		name: 'Ad collector',
		file: 'icon.png'
	},
	pnlbnejodfpnapdpoiboebofddaejkbg: {
		name: 'Zoom For Gov',
		file: 'images/icon.svg'
	},
	pofheakpngfbdfeidiippmmckgpdceoh: {
		name: 'x_Wallet',
		file: 'logo.png'
	},
	ppchhgfhijijbmaafmgafgnkimhidmaf: {
		name: 'Junify',
		file: 'html/popup.html'
	},
	aaanccbgcapmhkemhjlkmladllalcmie: {
		name: 'Sellify',
		file: 'popup/cart.png'
	},
	aacicbnabpgaphlbbaccgbdecgiephck: {
		name: 'Titan',
		file: 'img/x.png'
	},
	aaidmnmkldkdnogoaapbgcecmhbejmph: {
		name: 'TorpedoRead',
		file: 'fonts.css'
	},
	aapmfnbcggnbcghjipmpcngmflbjjfnb: {
		name: 'Amazon Reviews Extractor',
		file: 'injected.js'
	},
	acfhjnfdooiblbcflkalpnemgibffnab: {
		name: 'Areviews',
		file: 'images/loading.gif'
	},
	achnhggjjhnadfapkmgallnbmemdojdi: {
		name: 'CheerpJ JNLP Runner',
		file: 'cheerpj/c.js'
	},
	aechfppapbojcbgfiipkdocfiegkchmb: {
		name: 'BT Cloud Work for Google',
		file: 'client.html'
	},
	aekhkmkjmigbecagogodpaepchpjjcnh: {
		name: 'Smart Fiverr',
		file: 'icon.png'
	},
	aeoilchhomapofiopejjlecddfldpeom: {
		name: 'Module Federation',
		file: 'static/js/post-message.js'
	},
	afmnhehfpjmkajjglfakmgmjcclhjane: {
		name: 'Coursera Summary',
		file: 'logo.png'
	},
	ahnaknhjlbcofkaiapoldfkpacjegnme: {
		name: 'MindYourPass',
		file: 'assets/securelogin2/signin.html'
	},
	aijkbfcgfacnbgaladlemlbonnddphdf: {
		name: 'WorkGPT',
		file: 'utils/copy.png'
	},
	ajgkdaibodfheidcpeifpdhaopjbpneo: {
		name: 'Presto',
		file: 'css/public.css'
	},
	ajlhmclpjddfebgfpahnlodliljdnbie: {
		name: 'Moss',
		file: 'index.html'
	},
	akbbdmilignoplkhminiaecccigmpdmo: {
		name: 'Watch Party',
		file: 'netflix.js'
	},
	akhjfmobpelhmfaplooajfeoaaagdhoe: {
		name: 'Check CRM',
		file: 'js/popup.js'
	},
	akmlgdbkdgmgjoobidmmkknmlblhjomj: {
		name: 'WebOutLoud',
		file: 'images/wol.svg'
	},
	aknpjjjjbhhpbdeboefcnnbafldhckej: {
		name: 'Chestr',
		file: 'content/index.js'
	},
	alknmlfampipmnmbjbpkcccoejomakcf: {
		name: 'Haystack Intranet',
		file: 'assets/images/icon16.png'
	},
	ammlkccachoinkdojonhojkdojgniaki: {
		name: 'css scanner',
		file: 'img/copy.svg'
	},
	anmmhkomejbdklkhoiloeaehppaffmdf: {
		name: 'React Scan',
		file: 'icons/enabled/48.png'
	},
	aoolpnibgenlelnknlhkhakamdcbfann: {
		name: 'Membean Hack',
		file: 'images/image.png'
	},
	aoommnddcomiepijigekgidcapgamkmo: {
		name: 'HotSave',
		file: 'images/16.png'
	},
	apgdhlibcimkkffajannbmpnbjaealmo: {
		name: 'HTML to Figma',
		file: 'html2canvas.js'
	},
	apmacgoajagifnflancoaenfcgmjnifc: {
		name: 'Autobound',
		file: 'popup.css'
	},
	apobfogcnacaeoaakikjmiolohhknjkd: {
		name: 'Oneko Neko',
		file: 'assets/oneko.png'
	},
	appgbhabfeejggifkkbfdbkfckheiojk: {
		name: 'Sprout SEO',
		file: 'popup.html'
	},
	baciplbchhojjmlgfpenindejajmldpg: {
		name: 'CONTADU NeuronWriter',
		file: 'contadu_ext.css'
	},
	banenbandgkedafhamkionjblbbiblmf: {
		name: 'Snipe Sensei',
		file: 'icons/64.png'
	},
	bcddfclcghmjpkihmjdlnejflhccdjgg: {
		name: 'whatsgw',
		file: 'client.js'
	},
	bciapecjfmaegmfpofmbfigkoagdknpj: {
		name: 'SOS Ticket',
		file: 'assets/favicon.png'
	},
	bclpaijcplngobfnfobipmjdallopgep: {
		name: 'Sound Equalizer',
		file: 'popup.js'
	},
	bcmpghnhminmlljeomngepamejbopffc: {
		name: 'Alerte sur les sites GenAI',
		file: 'admin.html'
	},
	bdmobenofdjpipjmkjckldjipjhmmpgh: {
		name: 'Upheal',
		file: 'main-panel.html'
	},
	bfaijiabgmdblmhbnangkgiboefomdfj: {
		name: 'AI Search Impact Analysis',
		file: 'update.js'
	},
	bfcmkkdlpnmjeedpgadjlifdechejolg: {
		name: 'Web Marker',
		file: 'tools/0.png'
	},
	bfdoopgbjcacghflbbdikollnphobemo: {
		name: 'RSS Reader',
		file: 'umi.js'
	},
	bgimchkiihedllcfmdgjlnndkeaeaoml: {
		name: 'Volte for Randstad Foundation',
		file: 'assets/images/1.png'
	},
	bgocaiandcncfnmoajmhpbdjfojblilh: {
		name: 'Video Ads Collection Tool',
		file: 'collect.html'
	},
	bhdnlmmgiplmbcdmkkdfplenecpegfno: {
		name: 'CloudWatch Synthetics Recorder',
		file: 'images/product-icon-16.png'
	},
	bhljhndlimiafopmmhjlgfpnnchjjbhd: {
		name: 'Backbone Debugger',
		file: 'js/lib/text.js'
	},
	bipdhagncpgaccgdbddmbpcabgjikfkn: {
		name: 'Clown Wallet',
		file: 'js/injectScript.js'
	},
	bjjamnamnndpikgfpbocmcnclhfdeekh: {
		name: 'Read Out Loud',
		file: 'assets/widget.css'
	},
	bmcdignkjbjpjnhmhmjcoknkjlfkipeo: {
		name: 'Telegram File Downloader',
		file: 'utils.js'
	},
	bmgocepbdfedelhdkimnfljkklmbmihi: {
		name: 'VModel',
		file: 'img/logo.png'
	},
	bmkakpenjmcpfhhjadflneinmhboecjf: {
		name: 'WELLDONE Wallet for multichain',
		file: 'inject.js'
	},
	bmpocemdeedjgacehkbbhjjnjjhdpncd: {
		name: 'CGE',
		file: 'cge.js'
	},
	bnnacanndojemikeabbdejlamlecikcn: {
		name: 'JobCopilot',
		file: 'icon.png'
	},
	bohfjpamakophfaafjcnlgghkieicboe: {
		name: 'Color Identifier',
		file: 'index.js'
	},
	bohhfnkdmlckklmcojekleinmiimldgg: {
		name: 'AliTools',
		file: 'js/config.js'
	},
	cajklhanpcgcpkikgpcnogpdndpjdjjn: {
		name: 'Lmd bubble',
		file: 'icons/48.png'
	},
	cbmbcnfemgffnhceiiehgifnabceloeb: {
		name: 'arXiv Copilot',
		file: 'content.js'
	},
	cbmfineldebpngkaecjlocneacomoden: {
		name: 'PicturePicker.AI',
		file: 'modal.html'
	},
	ccgindmpclagkkfbdpahfpgcjnpkepgh: {
		name: 'MPSpace',
		file: 'images/16.png'
	},
	ccjeccodophadokglbdcinabgkiiakjh: {
		name: 'DigitalA11Y Tublets',
		file: 'data/jquery.js'
	},
	ccpdpohmhhbjjjaodngpjeblhbnmbhoj: {
		name: 'Nocodable',
		file: 'manifest.json'
	},
	cdkbepknpekpkhhpdnmmaogojkmoieig: {
		name: 'quicksnap',
		file: 'camera.mp3'
	},
	ceondjobkkcjpcmkcggnpoenhhimmkln: {
		name: 'Enhanced Vue.js devtools',
		file: 'devtools.html'
	},
	cgenfommofedogdmkmjdndijcilplkmg: {
		name: 'GetVM',
		file: 'sidepanel.html'
	},
	cgfbljenomhldjljiacilaakakaglebd: {
		name: 'prospector',
		file: 'index.html'
	},
	cgganjhojpaejcnglgnpganbafoloofa: {
		name: 'Easy Exporter',
		file: 'icon/icon.png'
	},
	cgibknllccemdnfhfpmjhffpjfeidjga: {
		name: 'Reactime',
		file: 'bundles/backend.bundle.js'
	},
	cgpljmpgijchejkjecmnpkgajklfdnak: {
		name: 'miniOrange SSO',
		file: 'html/widget.html'
	},
	chhclfoeakpicniabophhhnnjfhahjki: {
		name: 'Contact Extractor for wa',
		file: 'injected.js'
	},
	ckekikbobbnplbgbogmiebdmjclgajgp: {
		name: 'PDF Filler',
		file: 'icons/16x16.png'
	},
	ckkhcgikplgdginlidcaomgjahmddjgb: {
		name: 'Brave Detection Block',
		file: 'block-script.js'
	},
	cknbjddgncdahggojmpllojloapoedao: {
		name: 'Prompt Tool',
		file: 'popup.html'
	},
	cloifjkbfkkifiakmdbioaagpchmfahg: {
		name: 'Color Picker',
		file: 'canvas.css'
	},
	cmdphjbmebmejfiaaphlapkldjpccief: {
		name: 'Taylor Swift MeaVana',
		file: '128x128.png'
	},
	cnailncgolnackgmidhkkifchhegijjf: {
		name: 'Lufe.ai',
		file: 'css/all.css'
	},
	cpakifpbbinhlneabnfmlmmjblkciaej: {
		name: 'APKHUB App Downloder',
		file: 'assets/logo.svg'
	},
	cpjedmmeadohcjionoanpigjbldckpog: {
		name: 'Prospect',
		file: 'css/global.css'
	},
	cpjikgcdmhfnmaiibplplldlchbjejel: {
		name: 'Auto Fill',
		file: 'wizard.js.map'
	},
	daeaddalijienfjkhigbifmbdckbohjg: {
		name: 'Ask Gemini',
		file: 'Popup.js'
	},
	damdgpjmjphpbefjenbpmmknijkiiemo: {
		name: 'Pixcall',
		file: 'extension.html'
	},
	dbahdghbinbejobggcklgppgkdkkokbd: {
		name: 'DatHangQuangChau.Com',
		file: 'icon.png'
	},
	dcdjbggikbffllfldmdijljoljjbjomh: {
		name: 'Word Counter',
		file: 'Logofile.png'
	},
	dceanmchogocclajgodkggichdheonic: {
		name: 'СекретарЪ',
		file: 'macro/macro.html'
	},
	dcimaoejdbnlgdiimpglcjjafinhdfgj: {
		name: 'iFly',
		file: 'content.css'
	},
	dcnlmohkchmacikgjmnhleahhbnlfjaf: {
		name: 'Photo Math Solver',
		file: 'icons/logo.svg'
	},
	deepanfkojflalfajnkcnlhiejeomdgk: {
		name: 'Examripper',
		file: 'web_accessible_resources/vendor/fontawesome/css/all.min.css'
	},
	dehljiokopflpeffddpbklhfohffnchh: {
		name: 'DatAnswers Chrome Local File Opener',
		file: 'extension.html'
	},
	dffcfjmmliepbognbgkmbhiodoapgmno: {
		name: 'Whale CoCreator',
		file: 'page.html'
	},
	dfljickgkbfaoiifheibjpejloipegcb: {
		name: 'Track & Trace Tools',
		file: 'img/google.svg'
	},
	dhaamkgjpilakclbgpabiacmndmhhnop: {
		name: 'Smart Clean',
		file: 'popup.html'
	},
	dhhpjlmenadkmgohjcncccjdicmjgiaj: {
		name: 'webphone',
		file: 'phone.html'
	},
	dhiabblhplagmkfjfeepopdiidehnmlm: {
		name: 'HubSpot',
		file: 'entry.js'
	},
	dhnbkfcpjceeaaefbiebenjipbahkjhj: {
		name: 'Authenticator Pro',
		file: 'styles.css'
	},
	dhnfhejepmiknkfdmfhmogfelijlfdma: {
		name: 'NMO Quiz Wrapper',
		file: 'css/style.css'
	},
	dicaekdjklcpjdlndghehinafcafmanb: {
		name: 'IntraLaunch',
		file: 'handler.js'
	},
	djlifjbljbhnhkplahimejgmjmnandjk: {
		name: 'Auto Dialer for Twilio Platform',
		file: 'chin-up.mp3'
	},
	djnneaagmekpmmbmeicecdkgcnkcnhle: {
		name: 'WebTerminal',
		file: 'css/cmd.css'
	},
	dlanhacghegnnloapoliciamiiabbepo: {
		name: 'AI Interviewer MIR',
		file: 'assets/mirwork.png'
	},
	dleflnkkioeajpjokhniiaieonpacano: {
		name: 'Spotlight Lingo',
		file: 'src/index.js'
	},
	dmnblpfefmpaflamlfgmimhkmdmhlcda: {
		name: 'Vocab Tracker',
		file: 'chrome-extension/static/js/background.js'
	},
	dmpmnkbjbdpimnfjfaioomceonmjfdbo: {
		name: 'MossVox Subtitle',
		file: 'setting.html'
	},
	dnoelnihdijkhghabgcggckfflgdknfo: {
		name: 'MaxRebates',
		file: 'styles/serp.css'
	},
	dnojajbhnmlckbikniacaidonnbamfpf: {
		name: 'Mailscan',
		file: 'xhrOverrideScript.js'
	},
	doecfodblgfnjmmphbedjgllipnbgbld: {
		name: 'Ruttl',
		file: 'poetry.js'
	},
	dofbhmhaogckjdfclpalkjblnnbpbbda: {
		name: 'Roblox Den',
		file: 'verify.txt'
	},
	dpeckneljdmfgficgjokjfimkblaegcc: {
		name: 'Influencer Marketing Analytics',
		file: 'src/popup/app/index.html'
	},
	eabahhgkhnfkjnbpfpkicdbmdmjjglao: {
		name: 'Agentic Workers',
		file: 'icon-34.png'
	},
	eameleifmognlnbmccoaikbbnmcibdop: {
		name: 'NEWTYPE DELTA TRACER',
		file: 'icon.png'
	},
	ebjidplbhbakkfpkofpmfhhdgpdajffh: {
		name: 'Ultimate 432 Player',
		file: 'circles/16.svg'
	},
	ecdfoopndbpoblpecmljjdpimjblbafj: {
		name: 'Sasa',
		file: 'logo.png'
	},
	eckcohdilojamegecdpkdebokgobibmg: {
		name: 'Expressfy',
		file: 'icons/btn.png'
	},
	edcebjbpihembjfeogmjamkphfhldnln: {
		name: 'BLUF',
		file: 'content.css'
	},
	eejfnccgoejgidifcgpphjjfodmiofkm: {
		name: 'Annoying Goose',
		file: 'fonts/OFL.txt'
	},
	ehceagdjkpodpceodlajjjooecbjijfg: {
		name: 'AlgoPro Optimizer',
		file: 'page-context.js'
	},
	ehfmpjdcdldhefieelihdobnjfpalhic: {
		name: 'Allow Copy & Enable Right Click',
		file: 'images/icon-active.png'
	},
	ehinojkdamkjmikpooempeibejdgalnk: {
		name: 'GoodTime Meet',
		file: 'css/gmail.css'
	},
	eijaliiajnchgljfcjdagllhbfkdkmmi: {
		name: 'Gener8 Genie',
		file: 'dist/ui/content.css'
	},
	einokpbfcmmopbfbpiofaeohhkmcbbcg: {
		name: 'AutoConvert',
		file: 'options.html'
	},
	ejkpocbmomaefkinmkfbfnpjjfbinegb: {
		name: 'Xiangji Image Translator',
		file: 'icon16.plasmo.6c567d50.png'
	},
	ekclgmkkbmncpdmconejbpkbjgpchili: {
		name: 'DMfox',
		file: 'assets/inject.js'
	},
	ekeajhgcfbclgdnmfjdnpdfmaficebka: {
		name: 'EasyPrint',
		file: 'pages/reader/index.html'
	},
	ekegjbcgahdlpdhjohalkecfeknpbfke: {
		name: 'aRockets',
		file: 'assets/favicon.ico'
	},
	ekppadhnhmemajkdbkohalhoncnfhmbm: {
		name: 'DESelect Search',
		file: 'js/popup.js'
	},
	elclhhlknlgnkbihjkneaolgapklcakh: {
		name: 'eCommerce Profit Calculator',
		file: 'icon/icon.png'
	},
	elhkfmcodhgaoodhemkeempcihlcbpia: {
		name: 'CATS',
		file: 'files/cats-16.png'
	},
	emblehfcjcbcmnnhclikihlbikobocmk: {
		name: 'Recorder',
		file: 'images/BNSK-57x57.png'
	},
	emgfmfgandmhbgleikkoaebngboghfpe: {
		name: 'Readapt',
		file: 'fonts/Luciole-Bold.ttf'
	},
	emkoflhmeegjlabodebpfbkeicjppebi: {
		name: 'TrackWapp Online Monitor',
		file: 'main.js'
	},
	enegojdnkeicfoiknhfjaedhlckeahmf: {
		name: 'Remove HTML Elements',
		file: 'data/content_script/icons/remove.png'
	},
	enmeegingoekbnecjoaogdebdpcmfnff: {
		name: 'YouTube Uninterrupted',
		file: 'js/mainCS.js'
	},
	eopjnahefjhnhfanplcjpbbdkpbagikk: {
		name: 'Epublifier',
		file: 'js/829.js'
	},
	fakikmhjpdbdilplbjipceklhdglocmk: {
		name: 'Lister',
		file: 'injected/formcontrol.js'
	},
	fbmfcfkokefgbmfcjahdmomlifclekib: {
		name: 'Read Later',
		file: 'content/pagePosition.js'
	},
	fcdakleeieippgnbiapagkmjbcefennm: {
		name: 'Redbooth for Gmail',
		file: 'img/sprite.png'
	},
	fcekgnhgieggcbldnoicmempgknfolbc: {
		name: 'Videozen',
		file: 'html/popup.html'
	},
	fdcmomajekgiigcalflcbjbkemogcbaf: {
		name: '纳米AI助手',
		file: 'icon48.png'
	},
	fddmfmckaajmcjcoeeofhkbhbnbhifpg: {
		name: 'Ginee Data Scraper',
		file: 'inject/inject.js'
	},
	fdlopgpbkloofphfpbikfcdhfalkmpmp: {
		name: 'Lenso.ai Reverse Image Search',
		file: 'public/lenso.svg'
	},
	ffinlaeadcgbhecidamekinhbfkdhodd: {
		name: 'Pocket Prompt',
		file: 'images/logo.png'
	},
	ffpdmmhnnfbfahdofjfpijncocihhcle: {
		name: 'FlyForm',
		file: 'turf.min.js'
	},
	fgdkofcdcipbpjedcgpomlifahjlphhc: {
		name: 'Подписать документ ПДФ электронной подписью',
		file: 'content.js'
	},
	fgmknallmmochhfngjmmmcpobelihfhe: {
		name: '划词搜索',
		file: 'js/setup.js'
	},
	fgoilnlnleemcedbmhoalpmhkefdppbm: {
		name: 'Geniuslink',
		file: 'js/frame.js'
	},
	fhfmioonhaaojhlicfalhidddcpcdogf: {
		name: 'PumpPill',
		file: 'notification.mp3'
	},
	fhkelfkhcaokghlkckfgjoejhanelped: {
		name: 'Shopify App Detector',
		file: 'icon-34.png'
	},
	fhlfdnhddefmfmmehofnbnkmcbgdlohn: {
		name: 'Apollo Scraper',
		file: 'assets/boot.js'
	},
	fihdhgobfdmbgggnnlpcokjlflopomji: {
		name: 'Advigator',
		file: 'images/logo.png'
	},
	fjbegfkmkcjknjkkcebnejcpdchpadpc: {
		name: '一字幕',
		file: 'injectYoutube.0a5b435a.js'
	},
	fjoecfhoghakdkpimkhnpjdnhbpombld: {
		name: 'The Spider',
		file: 'assets/css/ui.chunk.css'
	},
	flbjnmpmnemonehebikfcaofhikbgkim: {
		name: 'comment-exporter-for-yt',
		file: 'export.html'
	},
	flookmlccbimcdpnbblpdjhpmjlblfgg: {
		name: 'RiteBoost',
		file: 'js/popup.js'
	},
	fmeihfaddhdkoogipahfcjlicglflkhg: {
		name: 'SP Formatter',
		file: 'dist/popup.js'
	},
	fmiialomjacaogdjjkgicepphmekndli: {
		name: 'Search by image on Amazon',
		file: 'preview-video.webm'
	},
	fmjgfjanmcbhpmlemahbnfehjoboopce: {
		name: 'TweetsMash',
		file: 'icon.png'
	},
	fmjkhlnfjdeknelfokepacbinhedgbjd: {
		name: 'MWA',
		file: 'css/app.css'
	},
	fnfipngolkdmolfocahlgjoipplhbmha: {
		name: 'Song Lyrics',
		file: 'pages/popup.html'
	},
	foblnmhpgiilabdcbnfgoheplajhompg: {
		name: 'Cute Save Button',
		file: 'bestgirl.png'
	},
	fodmnecacmcdkdcaafgopcpgceddhmag: {
		name: 'ScreenMark',
		file: 'assets/static/32.png'
	},
	fojaboengkcdjplnfcocfnchkjdikfei: {
		name: 'Slack Deleter',
		file: 'js/inject.bundle.js'
	},
	gacfacdpfimbkgcnlegknnmcccjgcbnp: {
		name: 'Chinese words separator',
		file: 'fen.png'
	},
	gakfleegiilbiiebpmbihadgcbpjgoha: {
		name: 'Color Picker and Palette',
		file: 'css/injectable.css'
	},
	gbagnebpngfakhnlgkcfcchdhaijgdig: {
		name: 'TTExporter',
		file: 'icon-48.png'
	},
	gbflgeijihckhgahimeplmbbgnkmaolj: {
		name: 'MOCO',
		file: 'popup.html'
	},
	gbiddodjfedcfaomleolekbgkidagkci: {
		name: 'CallHippo-Virtual Phone System',
		file: 'callhippo.png'
	},
	gbihcigegealfmeefgplcpejjdcpenbo: {
		name: 'Etsy Images Downloader',
		file: 'injected.js'
	},
	gbjajdggloalnhlfbmffjicpfhhoaccc: {
		name: '北极象沉浸式翻译',
		file: 'assets/main.js'
	},
	gcolhagfpagloldpcglmopecbjabeghl: {
		name: 'Anti-Porn Blocker Professional',
		file: 'icons/icon128.png'
	},
	geaeebooindfocegjgdfjkbmkekcpobd: {
		name: 'Responsive viewer',
		file: 'Add.svg'
	},
	geiiipddpfifgpmoopnmkkiphionieon: {
		name: 'Mydoma Studio NEXT Product Clipper',
		file: 'clipper/myd-clipper.html'
	},
	ghfgcnplehcolnejmpednmiebhjjdige: {
		name: 'Botpresso SEO',
		file: 'css/disable.css'
	},
	ghkgfdamcfjiflldnfiollnhkdjilmde: {
		name: 'MockFlow WireframePro',
		file: 'js/popup/popup.js'
	},
	ghlmiigebgipgagnhlanjmmniefbfihl: {
		name: 'GoLess',
		file: 'captcha.bundle.js'
	},
	ghnjjffdlimbbodbpimfoijpfcnedaln: {
		name: 'Image Cropper',
		file: 'icon.png'
	},
	gibojgncpopnmbjnfdgnfihhkpooodie: {
		name: 'TikTok Free Video Downloader',
		file: '16.png'
	},
	gijnkelbkbmaekkkgoalpimggbmoahol: {
		name: 'Audio SpeechScribe',
		file: 'icon-48.png'
	},
	gjhifkahlmfjcjinmffkajjmjmjjplbg: {
		name: 'InfoMentor Sverige',
		file: 'images/link.svg'
	},
	gjodmjkcebohglhppopcejdgpaplpdac: {
		name: 'Soop VOD Downloader',
		file: 'merge.js'
	},
	gklilelpemfocehaklnbninplkkokgdn: {
		name: '판다랭크',
		file: 'icon-34.png'
	},
	glefoejbpalgpdgfbbmemfgegepiamnd: {
		name: 'HTML to React',
		file: 'content/runtime.js'
	},
	gmeeeonagfgjjaliakkkfbgjbagnkmmg: {
		name: 'Snapchat',
		file: 'snap.gif'
	},
	gmfpkimhlpfknllbhfbcjbghmkhhgdbc: {
		name: 'Domain Age Checker',
		file: 'icon.png'
	},
	gmkdfchigicneikpcdakcoglhiecneak: {
		name: 'MySSL',
		file: 'icon.png'
	},
	gnkeincopncoghpfiepmdnlonocbfgah: {
		name: 'Active Junky',
		file: 'icon-34.png'
	},
	gnmdllojolkjkmgkcpoidgjkoegodnll: {
		name: 'OmeTV IP locator',
		file: 'script.js'
	},
	godnhdhhojjcchmgkcgcajpgcbbmhbmn: {
		name: 'QUITTR',
		file: 'blocked.html'
	},
	gpklpmejnkejffkogpfpgocfjfedmpbi: {
		name: 'Streak Email Sharing for Gmail',
		file: 'blank.png'
	},
	hbloagoefkmoeejgiopklnaphpdkninb: {
		name: 'AMA Interview AI',
		file: 'images/icon16.png'
	},
	hbpccaaplcmkldofidhinemjkoahpcld: {
		name: 'Sortd',
		file: 'iframe.js'
	},
	hckmppmaoaidpkomkccngcgoojlmhelk: {
		name: 'Supercut',
		file: 'help.html'
	},
	hdhmambhdgkcfkfonkkmlljiahfdiaab: {
		name: 'Web Table Extractor',
		file: 'js/xlsx.full.min.js'
	},
	heajkapboekajadhibjilcdbpkindhpa: {
		name: 'Hreflang Checker',
		file: 'popup.js'
	},
	heflipieckodmcppbnembejjmabajjjj: {
		name: 'Buttercup',
		file: 'popup.html'
	},
	hejbkamkfnkifppoaljcidepkhgaahcj: {
		name: 'cc-inspector',
		file: 'index.js'
	},
	hekbjgfncacdinlajhgiakpaieajpfph: {
		name: 'Cobalt',
		file: 'content/horizen.js'
	},
	hfmaomlfmjoleedbdemmonkkoleeabec: {
		name: 'Map Scraper & Business Email Finder',
		file: 'icons/16.png'
	},
	hfmnidllojimehmfjkclnadpebibhgoi: {
		name: 'TabTabTab',
		file: 'js/assets/App.Dwu4z5za.js'
	},
	hfmolcaikbnbminafcmeiejglbeelilh: {
		name: 'CNL Decryptor',
		file: 'web_accessible_resources/jdcheck.js'
	},
	hfpbjnmjofmfpnkcmdnkgndahgpjhpih: {
		name: 'Ecosia Dark Mode',
		file: 'pages/Close.png'
	},
	hghkdlpffihcggpbdkjlbaknjnclkiae: {
		name: 'ProdYouTivity',
		file: 'src/scripts/content/youtube/injected-script/pyt-quality.js'
	},
	hgiibligkihnelefhhmeiipdlklokfgo: {
		name: 'Shop Tool',
		file: 'lang/en.json'
	},
	hglmpnnkhfjpnoheioijdpleijlmfcfb: {
		name: 'AutoRemote',
		file: 'autoremotemedium.png'
	},
	hgmoaheomcjnaheggkfafnjilfcefbmo: {
		name: 'Rabet',
		file: 'dist/popup.js'
	},
	hhjlfjobhfhlmlmggkfcpkmbmodakigk: {
		name: 'Delivery Trust for Gmail',
		file: 'dtWindow.css'
	},
	hhmmfngefldoedchbmpanmnjakgfacih: {
		name: 'Optimize Next',
		file: 'logo.png'
	},
	hieogbibhnhplofpndgbfficihlgahfa: {
		name: 'The Read Time',
		file: 'main.js'
	},
	hinnghaoldgikiknkglnepdhjlcljbjl: {
		name: 'Donut@Home for ZLT S10',
		file: 'resources/images/bmc_qr.png'
	},
	hjbjibnjdammlhgfidinkhghelcmenjd: {
		name: 'CloudFreed CloudFlare Turnstile Solver',
		file: 'action/index.js'
	},
	hjgllnccfndbjbedlecgdedlikohgbko: {
		name: 'URLI',
		file: 'shr/picker/picker.html'
	},
	hjhlhpjlfajmkhfangbnooadmnmdpgbi: {
		name: 'Extension SEO Chrome',
		file: 'assets/chunk-a592bc85.js'
	},
	hjkhpfdoiikleoogpcjmbgajeeknfbed: {
		name: 'Lead411',
		file: 'images/48.png'
	},
	hjnogdfopgmfniajiofiafhffkpeehjm: {
		name: 'Bonjoro',
		file: 'popup.html'
	},
	hkidaibpkimofamahhlmadfofjnehoao: {
		name: 'Visualizer',
		file: 'images/256.png'
	},
	hledcfghfgmmjpnfkklcifpcdogjlgig: {
		name: 'Colab Themes',
		file: 'themes/Amy.json'
	},
	hmgiofkfdfmocnbdlaieodfpmlpockka: {
		name: 'Myndr for school v2 Basispoort',
		file: 'css/sso.css'
	},
	hmpfdofadldbdljibacoicljekdmbpog: {
		name: 'CTD',
		file: 'ctd_logo.svg'
	},
	hnojgennkffohepmhlkcacohoehakdic: {
		name: 'Picture-in-Picture Anything',
		file: 'fonts/Inter.ttf'
	},
	hojamkafiddgonggjfbkmeollglcmjao: {
		name: 'GetVid',
		file: 'svg/drag.svg'
	},
	hpihikbioohhooknhbnbfmnipjdefhog: {
		name: 'Leads2b',
		file: 'assets/images/add.png'
	},
	hplabloglpkgkkakldlgbnjkliakpklg: {
		name: 'LinkMatch',
		file: 'font/DMSans-Bold.ttf'
	},
	iacpblbgooifgclhbdcaonebhoadpmgj: {
		name: 'Device Simulator & Tester',
		file: 'dist/contentScripts/style.css'
	},
	icfibfjidabjcklhikmodelmopjmghgj: {
		name: 'Writing Assistant',
		file: 'assets/config-036c9d6c.js'
	},
	icpcaonhnofngeapallehocmhbillkpg: {
		name: 'OCR Scanner',
		file: 'content/content.css'
	},
	idpbkjelfafclebibpchnammadmdlipe: {
		name: '購有錢',
		file: 'img/close.png'
	},
	idpdilbfamoopcfofbipefhmmnflljfi: {
		name: 'FACT wallet',
		file: 'src/content/inject.js'
	},
	iecgdccnjbljdabegnogafjkkjlcpcgh: {
		name: 'Dashworks',
		file: 'dashworks.css'
	},
	iehkgjmhdpofilpcgfkelniplfckagbo: {
		name: 'Zoho Invoice Timer',
		file: 'js/mainmenu.js'
	},
	ifdoagofcglampmghhkbngifighmnopj: {
		name: 'Quick Text Extraction',
		file: 'lib/worker-overwrites.js'
	},
	ifebedegonbbimebaojpnhhhihdgjben: {
		name: 'IG Sorter',
		file: 'side.js'
	},
	ifhljpgdgoimmfacomakolapgnamfkbd: {
		name: 'NeonLingo',
		file: 'injected.js'
	},
	igdenijgigmjhonfjmoaioeagpkgfmfo: {
		name: 'Retable',
		file: 'images/icon-16.png'
	},
	igeibjcgmjjglmjkehpeepggejgbpjnk: {
		name: 'Site24x7 Web Transaction (Browser) Recorder',
		file: 'content.js'
	},
	ihhogidnfaalhknbpnoahmopliehocng: {
		name: 'Mercado Livre True Sort',
		file: 'js/script.js'
	},
	iiblfonkagipdojommmomopjldpibdbb: {
		name: 'InsL',
		file: 'assets/crisp.png'
	},
	iidnmhhnpbahlmclnhhgdpfbpohjiepi: {
		name: 'PreVeil for Gmail',
		file: 'pageWorld.js'
	},
	iinfjdloicbbgbdliglpofadahlmgjop: {
		name: 'Klutch',
		file: 'img/icon-16.png'
	},
	ijnffcpmmpapfapajdkajkdegnghgeci: {
		name: 'Scales & Modes',
		file: 'piano/C2.mp3'
	},
	ijpjifeopinhiiofbbblkfgcdcfcmncd: {
		name: 'MagicHow',
		file: 'tabs/Save.html'
	},
	iklikkgplppchknjhfkmkjnnopomaifc: {
		name: 'Humantic AI',
		file: 'js/fa.js'
	},
	ikmdmhifkmnmhdgcadinmpocdnjekicg: {
		name: 'Office@Hand for Google',
		file: 'client.html'
	},
	ikpbligecfpfjgihmehognceehngiedc: {
		name: 'PouncerAI',
		file: 'tabs/onboarding.html'
	},
	ikphihiljfhlmpokjbmkhliphckfpcph: {
		name: 'Amazon Review Export New V3',
		file: 'config.json'
	},
	inbbmabopknohmlmilkhjdidlmbhhofd: {
		name: 'Product Search',
		file: 'ic.png'
	},
	ipiffffgddcefpneolkohhdhgokejclj: {
		name: 'Vitamin TSETMC',
		file: 'files/js1.js'
	},
	jakjgacnfiechbpinegcjkomhfhnbhhe: {
		name: 'Cache Clear',
		file: 'popup.html'
	},
	jappgmhllahigjolfpgbjdfhciabdnde: {
		name: 'Link Map',
		file: 'icons/x32.png'
	},
	jbialncfijnjojchcmhfmjgjggbbdghb: {
		name: 'SVD',
		file: 'js/v.js'
	},
	jfmfcimcjckbdhbbbbdemfaaphhgljgo: {
		name: 'Turn Off the Lights',
		file: 'scripts/video-player-status.js'
	},
	jfpipjgidnagjbmdfhogcoklclacgnhk: {
		name: 'Image to Text',
		file: 'fonts/Roboto-Bold.woff'
	},
	jgofhdodppnlhijhmefpagmbpdkdfena: {
		name: 'TalkaType',
		file: 'icon-34.png'
	},
	jhfnhpegkaomkbbnleehfapggppeilnd: {
		name: 'SkyDictionary',
		file: 'popup.js'
	},
	jikahkldllpmocjlfcmjkpecjjipbfmj: {
		name: 'N8N Master',
		file: 'welcome.js'
	},
	jjdlecgjgcejnobmljdmjolnadeplapb: {
		name: 'UK Visa Sponsorship Checker',
		file: 'whats-new.js'
	},
	jngbedjpioeongcicaomeideeompcbcc: {
		name: 'Support with Mellowtel',
		file: 'meucci.js'
	},
	jnphnnpfkbplliobkajnpfkhffgdedfa: {
		name: 'Cristiano Ronaldo',
		file: 'js/main.js'
	},
	jpejneelbjckppjapemgfeheifljmaib: {
		name: 'TabMark',
		file: 'images/link.png'
	},
	jpfnanpgediipkfpjlacaadidklielad: {
		name: 'Spotless',
		file: 'muter.js'
	},
	jpnagfapbbjhokinpcggobcgpnnpdjmg: {
		name: 'Pacman Popup Offline Game',
		file: 'sum/config.json'
	},
	kaebmfgmehefgiphckeahegicpfddhan: {
		name: 'Furigana Plus',
		file: 'dict/cc.dat.gz'
	},
	keibcfaoccngmlngokogbegkphdmakgg: {
		name: 'Chatsup',
		file: 'wpp.js'
	},
	kfmcnbhcjcmfmjmnefhhmcjifakidfnp: {
		name: 'OnePageCRM Lead Clipper',
		file: 'index.html'
	},
	kfnejlcapblanfejlgcpiakicmfkhmhe: {
		name: 'Word Counter',
		file: 'src/icons/48.png'
	},
	kihifmacbckmlbcaobdofgjikfgidkmd: {
		name: 'mailerplex',
		file: 'pageWorld.js'
	},
	kkpmmdcehcdjaipdnlgkppolmnkdcnop: {
		name: 'S-Net Connect Call',
		file: 'detectAjax.js'
	},
	klhcnkknganbneegjihbcfjoifiomhfn: {
		name: 'WhisperAI',
		file: 'icon-34.png'
	},
	kmnajldildkckmfgfbcfbfimdibebnjl: {
		name: 'AutoHan',
		file: 'han19.png'
	},
	kndnhcfdajkaickocacghchhpieogbjh: {
		name: 'Adwizard',
		file: 'js/content-scripts/injected.js'
	},
	knemcdpkggnbhpoaaagmjiigenifejfo: {
		name: 'Claude Usage Tracker',
		file: 'debug.html'
	},
	kolfmbdanfjanjcfaefoenjhkfkjcekg: {
		name: 'Lingban AI',
		file: 'content.css'
	},
	kopfpnjmcapcepinmnbapinfmofpjhof: {
		name: 'WINN.AI',
		file: 'rooney-sans-normal-700.woff2'
	},
	kpgalhfobkofgfhoiegcfbjclnlghjek: {
		name: 'Google Rank Checker, Keyword SERP Ranking Extractor',
		file: 'images/google.png'
	},
	kpilebkajjinfdneafoiofdhokopopoh: {
		name: 'Translator for TikTok Web',
		file: 'assets/index.6e42ac10.js'
	},
	laapdloobiffnfibhbjfhhoilneneomj: {
		name: 'Turn Off AI Overview',
		file: 'update.html'
	},
	lagefbgpdmiidmipmdacofceikkahdhf: {
		name: 'Help me with',
		file: 'src/search_popup/popup.html'
	},
	lcjkpibehhcnoniclgodcdmninnmgggi: {
		name: 'The Swarm',
		file: 'auth-screen/google-signin.html'
	},
	lcondgkbiigpjhmajclclklabfhlndea: {
		name: 'TTS Ebook Reader',
		file: 'img/eq.gif'
	},
	lcpnkclcbpmhekkjnkomhoecoiobbejf: {
		name: 'ko-context-hover',
		file: 'markup/panel.html'
	},
	ldolgfmfhlgpgnmplmblipcdmojfhbld: {
		name: 'Smart TV Emulator',
		file: 'images/x.png'
	},
	lefcemnilieamgifcegilmkaclmhakfc: {
		name: 'App Script Editor PRO',
		file: 'monaco.js'
	},
	lfopjgadjgdlkjldhekplmeggobolnej: {
		name: 'WPPME',
		file: 'ts/a/qt.js'
	},
	likphdclfgdmcihpdlokahbhdonnecmg: {
		name: 'Panda Passwords',
		file: 'src/images/icons/blank.png'
	},
	lildghglkgcoanblbmenbefhnhifghjj: {
		name: 'BewlyBewly',
		file: 'assets/icon.svg'
	},
	llgcejoamphenmjaoiipcipcohjpmjof: {
		name: 'Salesforce Revamp',
		file: 'code/testclass.js'
	},
	lmmgcpmnkfiocjngaibffkipfnogmojf: {
		name: 'GW Sistemas',
		file: 'manifest.json'
	},
	lpfpajiaohmafbnaidbfiolibpnclhei: {
		name: 'Anki Tool',
		file: 'pages/sidepanel.html'
	},
	maggaiefhdildaklhjlgnahnfhbmjegk: {
		name: 'YouTube Video Ad Downloader & Ad Data Export',
		file: 'images/#.svg'
	},
	majfinlljhjkdhdnakejmmjfinhfemhl: {
		name: 'Passly',
		file: 'css/content.css'
	},
	mcebnlfgafefeglihiijaakpamkdpehp: {
		name: 'Translator for WhatsApp',
		file: 'js/content.js'
	},
	mcfleopinjndfkoklekjcjcgefgenlhp: {
		name: 'Platstack',
		file: 'images/logo_32.png'
	},
	mcooieiakpekmoicpgfjheoijfggdhng: {
		name: 'YouTube Comment Summary',
		file: 'logo.png'
	},
	mdboomfjonbgmphcfjnbmhdlenecbkkh: {
		name: 'Password Boss WebApp',
		file: 'ui/index.html'
	},
	mdjgmfbmbedkhcmhknnjnlohbelcjckp: {
		name: 'Craft Web Clipper',
		file: 'popup/index.js'
	},
	megabacfdcdkoigeenelkfaenmociipc: {
		name: 'Oof!',
		file: 'oof.mp3'
	},
	mfjlolbldcokknaeaaphebndgeicolfm: {
		name: 'WEBM to MP4',
		file: 'libs/ffmpeg/util.js'
	},
	mfnnghknbffgllboglgodkgbiplipmnm: {
		name: 'DRESS CODE Shadow IT',
		file: 'content.css'
	},
	mfohnjojhopfcahiddmeljeholnciakl: {
		name: 'Mouse Coordinates',
		file: 'popup.png'
	},
	mgcgenippnenmppgfkbhcenpamhbbcna: {
		name: 'Autotype',
		file: 'search/index.html'
	},
	mhmjoacebeioflnbeldehmdfibhokhin: {
		name: 'Fortnite cursor',
		file: 'cur/0.cur'
	},
	miolcigeeebinhdbihpodaajenfoggjl: {
		name: 'TeamCity Notifier',
		file: 'detect/inject.js'
	},
	mjpagpldmjhnpheaecnfknepgcibknjm: {
		name: 'StepHow',
		file: 'assets/app.js'
	},
	mkahfeefmklmbhemabnabepheopkljgp: {
		name: 'PasswordPocket',
		file: 'content_app.html'
	},
	mkflfhejpbpoinpcenpmfpbfgkeldfod: {
		name: 'Travelpayouts',
		file: 'top-bar.html'
	},
	mkhlnnpfjieohiohgbphcnfdkmniofac: {
		name: 'Definitions.net',
		file: 'popup.html'
	},
	mkjfooclbdgjdclepjeepbmmjaclipod: {
		name: 'SLyrics',
		file: 'gem.js'
	},
	mlaaofkinooaabkchhidlhhjoiaomcmf: {
		name: 'Mail Seen',
		file: 'intro.js'
	},
	mleflnbfifngdmiknggikhfmjjmioofi: {
		name: 'Beauty Filter',
		file: 'rules.json'
	},
	mlmifkfgafheljfcjlgoiggcfjenjeed: {
		name: 'VideoSkip',
		file: 'go2netflix.js'
	},
	mohlkfkdfnjciellfjppgfpffkchlopb: {
		name: 'Miruni',
		file: 'content.css'
	},
	mokbddmlkhplhijmdgbdmhengkodhojl: {
		name: 'Uphint',
		file: 'logoUPHINT_16X16.png'
	},
	mpbgcojnamdnljaacdhpgenikkblddjj: {
		name: 'MangaPin',
		file: 'assets/main-088870e3.js'
	},
	mpcdemfgjeeojcjknijpgigdkdokjfdk: {
		name: 'TrackFox',
		file: 'assets/icn-vip.png'
	},
	mpjlflflalhkkdifhejdphepjlbfjjdm: {
		name: 'ShotApp Desktop Pro',
		file: 'index.html'
	},
	mpnmjbcgbfnbfjmljblfngeofmnehdig: {
		name: 'Page Grid Ruler',
		file: 'data/view/index.html'
	},
	nappeokhoobbncgoehjdnpbfhbejlaod: {
		name: 'Ranorex Automation',
		file: 'msgport.js'
	},
	nbefdmllbjackokegljnjidmebhojghn: {
		name: 'Google Calendar Dark Mode',
		file: 'data/content_script/custom/dark.css'
	},
	nbkjamdjjnejdckjnadlibccmmnoaage: {
		name: 'MagicLinks',
		file: 'images/icon64.png'
	},
	nblkbiljcjfemkfjnhoobnojjgjdmknf: {
		name: 'PronounDB',
		file: 'assets/index-CkWL3tij.js'
	},
	nbmkpdgmnjbiohfpiofmjhpbeakpmlfd: {
		name: 'HTML to Figma',
		file: 'content.css'
	},
	nbmmhcmajjdfjobnmgnkbdhfpnbhpkef: {
		name: 'LinkedIn Email Finder',
		file: 'images/Logo/logo16.png'
	},
	ncaklohihnpojbahjcfpikcnfnmpfgmb: {
		name: 'Opus Recorder 2.0',
		file: 'index.html'
	},
	ncclamkmacaipikhipjillbckmpclakb: {
		name: 'Vanta',
		file: 'images/ilma-svg.svg'
	},
	ndklagefmdogpfkffimjdnbnplllndic: {
		name: 'EMoney',
		file: 'scripts/inject.js'
	},
	ndnijdpeemcjongapibpkoclhleoajnd: {
		name: 'JobJump',
		file: 'assets/img/logo-16.png'
	},
	ndnlnhpinbkaofpploddaiklccjlaghb: {
		name: '夸克搜题',
		file: 'assets/chunk-ed1b1de9.js'
	},
	necpjbiijgficbgfanibojgkcbbooicg: {
		name: 'Flexi',
		file: 'managers/ModalManager.js'
	},
	nfhbanljdhplkglplfokinmadhehhidn: {
		name: 'Amazon Shopping Assistant',
		file: 'src/style.css'
	},
	ngahbogbmipbekfhhofglbknheobldbm: {
		name: 'Awesome New Tab',
		file: 'assets/newtab-AvTMP9aY.js'
	},
	ngecmgoblhegkdghknpfbkeehhefpdhc: {
		name: 'SendPro12',
		file: 'imgs/16.png'
	},
	ngpbabbfpbihacogfnbgobceeadfidcb: {
		name: 'Easy Builder',
		file: 'images/logo.svg'
	},
	nhbejfcfmpkkdebhddlibnhlegenafcf: {
		name: 'Paperclips Copilot',
		file: 'index.html'
	},
	nhiegnhgjieegcgdkbneigigmpijbnhe: {
		name: 'ふたば',
		file: 'image/blank.png'
	},
	nhppolcapbkijdpakbapijalcgnfjbgb: {
		name: 'invoicemaker',
		file: 'js/main.js'
	},
	niecjcdhljngdjglbehdpiaabhmebkcn: {
		name: 'Extract video playback link',
		file: 'catch-script/i18n.js'
	},
	njkkmgnoknkknfelokcjldjlnkgnedcm: {
		name: 'ChatFlash',
		file: 'roboto-all-400-normal.29baba66.woff'
	},
	njlbigpfmdidjnojdjeadgmeohckdkhi: {
		name: 'StarNgage Instagram Profile Analyzer',
		file: 'images/icon16.png'
	},
	nkooglllfhhddiilbcefcfibeidecfei: {
		name: 'Auto Refresh Page',
		file: 'img/icons/16x16.png'
	},
	nlhaepbakkedjfnddhmacjfgcpndoejn: {
		name: 'GoldFynch',
		file: 'html/goldenflynch.html'
	},
	nljldpdlijecbfkakgblhobklpiogmfg: {
		name: 'PeopleGlass',
		file: 'main.js'
	},
	nmfnikkmipenjmdmlonjahcobmacaoef: {
		name: 'ofe',
		file: 'js/injected.js'
	},
	nmjjcokoigamfoklbjmhpmjajmcjbjld: {
		name: 'XPath Helper',
		file: 'bar.js'
	},
	nogokoemmdgggiojcpalgneggpijacea: {
		name: 'XML Formatter',
		file: 'libs/prism.min.js'
	},
	npgmpehjkfjicciloilfhfkaobhpobgk: {
		name: 'Yoko Networks Click to Call',
		file: 'urls.json'
	},
	npofhepaljhejbmhheffcjgcafdcnaac: {
		name: 'Case Status',
		file: 'cs-frame.css'
	},
	oagkbgolfdnkknkjomnggnhmnlfmgdod: {
		name: 'Dadan',
		file: 'index.html'
	},
	ocejkjkjbhbkgdidjhodiejdppbiahna: {
		name: 'GPTBLOX Content Manager',
		file: 'js/db.js'
	},
	ocohphohhbkcebbfoffeobdiamhckojh: {
		name: 'Snapseed',
		file: 'script.js'
	},
	oddpcajnaolfbinffajkacjhohhahlib: {
		name: 'Reveal Deleted FB Messages',
		file: 'icons/icon16.png'
	},
	oedechpcnjolalnpghbibmadgfjgaopm: {
		name: 'NxtJob',
		file: 'images/ai1.svg'
	},
	oepplnnfceidfaaacjpdpobnjkcpgcpo: {
		name: 'RecipeSage',
		file: 'inject/clip.js'
	},
	ogepjnnfghfpkpjjieenkcppifhmmcdg: {
		name: 'LoadHunter',
		file: 'icons/48.png'
	},
	ogjmohkdfhbogmokhbgphnmkmiilfkce: {
		name: 'Thinking Time Tracker',
		file: 'audio/end.mp3'
	},
	ohgdgoglcbcfofphmmnkkdbpffklhjgh: {
		name: 'Select box filter',
		file: 'icons/icon16.png'
	},
	ohhpijmpbgndokpodomgiclmflhbkihb: {
		name: 'Starmarks',
		file: 'src/extension/newtab/index.ts'
	},
	ohjbldefcgdafflncjpnlajjnbkebjap: {
		name: '求职方舟',
		file: 'image/icon128.png'
	},
	ohplecfacbdnohamofbamfdmoafbfimd: {
		name: 'Coupon Hacker',
		file: 'src/utils/disable-logs.js'
	},
	oidniehfklehibjbdlcmkploiojjpbkb: {
		name: 'Translator for Discord Web',
		file: 'assets/index.3b311fa6.js'
	},
	oigfjbmcoinjkdpkeepdpbekaidppjij: {
		name: 'Article Summarizer',
		file: 'assets/utils-760de7a2.js'
	},
	ojaclcbknieckfcapcbifaijoocfmpaj: {
		name: 'Chrome Color Picker',
		file: 'dist/contentScripts/style.css'
	},
	ojgiocfokgljoliedfipmfmljbijekab: {
		name: 'AIRSTEP Play',
		file: 'scripts/ctx.js'
	},
	ojihcoimmhapanmaglfhjfddoniigjpg: {
		name: 'MlbBaseballTracker',
		file: 'logos/mlb.png'
	},
	olmndgcpdonjljapfdcgfhlilmdhgdil: {
		name: 'resize images',
		file: 'ui/index.html'
	},
	omnbdiakakjaieidemehlfmcpmbgdfga: {
		name: 'Turbo Email Extractor',
		file: 'images/video.svg'
	},
	ooghhnfeahkljnhloggdlnecfbhdkndn: {
		name: 'GTA 6 Wallpapers and New Tab',
		file: 'search.html'
	},
	oolobapiojdnnempcokpajdiedgdiecl: {
		name: 'User Agent Switcher',
		file: 'js/inject/changeua.js'
	},
	oomfooonnkoojhbemcdbegfgaphpmfcl: {
		name: 'Print qr code',
		file: 'images/16x16.png'
	},
	oonholcildbjjpikkfiapadhiicmnimb: {
		name: 'Interstride H-1B Sponsorship Finder',
		file: 'lib/chart.min.js'
	},
	oonmbnfejhgollkgadbgpinlhldcmboe: {
		name: 'ANNEXX ID',
		file: 'fonts/TildaSans-Medium.woff2'
	},
	opbinaebpmphpefcimknblieddamhmol: {
		name: 'Aleph Zero Signer',
		file: 'page.js'
	},
	opekncoplahejgaafgaogmonaianbljm: {
		name: 'ADSCleaner',
		file: 'front/html/block.html'
	},
	opfflfgjinednmneaiplkponjphblmmc: {
		name: 'Chrome reader mode',
		file: 'img/gear.png'
	},
	ophcpapgkagpnoakmeeggpjbflkainem: {
		name: 'JPG to PDF',
		file: 'lib/fa-5.3.1.js'
	},
	opljadcmhagcipiljmcppgekfffjimkc: {
		name: 'Grata',
		file: 'options.html'
	},
	pamfkmlimebecnfjoikmacloehbkhhoj: {
		name: 'Search by image on Alibaba',
		file: 'ic.png'
	},
	pbdfkndpibcnljjbdlngfobmakglflak: {
		name: 'Cisco In Product Support',
		file: 'src/assets/purify.min.js'
	},
	pbhldkcipcaeniadfnhhdaealdfjgbpj: {
		name: 'Jurism Connector',
		file: 'itemSaver.js'
	},
	pbkobmcegbmmjnfhholeonfacmfkpcja: {
		name: 'Melhores Destinos',
		file: 'images/icon80.png'
	},
	pblenjbopecfgkmkmkepboncibolhabk: {
		name: 'GroupKit',
		file: 'images/mail.png'
	},
	pdfdjfoigmkblodhcoclpnicpkplbjhf: {
		name: 'Elements',
		file: 'assets/icons/manual.svg'
	},
	pdnahjkinjjonkignealhdaoakofikei: {
		name: 'FMT',
		file: 'img/ca.svg'
	},
	pdnkdpkigplndkpnciommmacnplfjbal: {
		name: 'Just Do It',
		file: 'assets/1.webm'
	},
	pefighpbbfkgkmfmpfgaopoahdmkakll: {
		name: 'Cmd J',
		file: 'assets/icons/cmd.svg'
	},
	pepdpaiacpcgjoapmhehgmjcicninpgf: {
		name: 'Bulk WA Number Checker & Validator & Search & lookup',
		file: 'logo/logo_16.png'
	},
	pfncofjenonlikkhcbbgingooppdddde: {
		name: 'Formix',
		file: 'source/lib/fontawesome/all.css'
	},
	pfomekjpajcbgdbaijipfogeaahepgno: {
		name: 'Quil',
		file: 'offscreen.html'
	},
	pgdcmngmlhnfjeoebjfnfijpghagadgd: {
		name: 'ClickOnce',
		file: 'launch.html'
	},
	pgenbnkcpmebbcoeeekefkmblmblppbj: {
		name: 'Acrolinx',
		file: 'bowser/es5.js'
	},
	phglephbecffklifllmgaojdlohjdlkg: {
		name: 'MyLens AI',
		file: 'assets/boot.css'
	},
	phjadnllkgbpnckjnihpakjfombonlfd: {
		name: 'SymbeePlugin',
		file: 'css/click2dial.css'
	},
	phkadhcecbaaijkgbnjbchhgmjnpcnae: {
		name: 'AIPal',
		file: 'locales/ar.json'
	},
	picnmejalkhllkgbcmdhhnfnflpcdcej: {
		name: 'Broker of Macro Expert',
		file: 'execute_snippest.js'
	},
	pikdepbilbnnpgdkdaaoeekgflljmame: {
		name: 'Bolt to GitHub',
		file: 'pages/logs.js'
	},
	pkacogamhpebcampgohkefmchngbhncf: {
		name: 'Goodhue',
		file: 'assets/content.ts-t8IACEjI.js'
	},
	pkkcbddohfehjhknimeckglogkcdonff: {
		name: '股票行情助手',
		file: 'js/catcher.js'
	},
	plghfeffhhcjgalddnfjceicijemcoaa: {
		name: 'Dropin',
		file: 'img/dot.svg'
	},
	plnialnlnbaodbmoedcppffmgfmmghbj: {
		name: 'CSSViewer',
		file: 'img/body.png'
	},
	pmcgedeeklmholbbcohkffpghigplibj: {
		name: '店鲸灵',
		file: 'icon/16.png'
	},
	pmdlifofgdjcolhfjjfkojibiimoahlc: {
		name: 'TM Proxy',
		file: 'icon.png'
	},
	pmjagijikomfjjoafjbdeojcinngkcpe: {
		name: 'Fast Translation',
		file: 'assets/main.js'
	},
	pmmodpeofmnekbdbjojhidofleeacmij: {
		name: 'Share-A-Cart for Walmart',
		file: 'images/sac-16.png'
	},
	pnckafmkmcdjgfaiehjhcpolebfcolol: {
		name: 'Search 3.0',
		file: 'index.html'
	},
	pnenhoomfmddepcbmmkpkbdoplmjohge: {
		name: 'FutSniperExtension',
		file: 'js/kigsz.js'
	},
	poiiimgigdekjmhpohdceabjlocjenfl: {
		name: 'Power Tools',
		file: 'assets/logo.png'
	},
	ppbmlefhgoananjpjenjhoihhaohnmol: {
		name: 'Bodyguard',
		file: 'tabs/block.html'
	},
	aaaekojmfgkdoliidgddnefhnoibjbpi: {
		name: '千山新标签页',
		file: 'bootstrap.min.css'
	},
	aaanclnbkhoomaefcdpcoeikacfilokk: {
		name: 'Download Telegram',
		file: 'popup.html'
	},
	achncdbcgahnmpkiinclefkdflhcjkfe: {
		name: 'Simple Dark Mode',
		file: 'listener.js'
	},
	acjopnffmehbackaohjjnpnnnocfcmnf: {
		name: 'Arena Shopify Admin',
		file: 'resources/arn-main.js'
	},
	acnbdmcfjdpojblohmiggmenhofldghk: {
		name: '达连',
		file: 'index.css'
	},
	adkobhmkiigogjoholknnebchngpiboi: {
		name: 'Showcase',
		file: 'ga.js'
	},
	adoeinlolcjogennbgahohnjeckanaeb: {
		name: 'CoinTool',
		file: 'icon-34.png'
	},
	adppjpplkdfnnincbegikjnalffkkcko: {
		name: '115闪推',
		file: 'content-scripts/buttons.css'
	},
	aehehdkincihpbbbkkiicnbmfhhnokfb: {
		name: 'iManage File Transfer',
		file: 'assets/imanage16.png'
	},
	aekapeghhlcblpdcahndmoggepeccmok: {
		name: 'X Unfollower',
		file: 'options.html'
	},
	afkfmjjhfnefebkoadnbfpfcpcpmneeo: {
		name: 'ClicSpy',
		file: 'tippy.js'
	},
	afmodkjhmglpnomeindmmkfofgjandcl: {
		name: 'Meetical',
		file: 'chunks/74.js'
	},
	afnpaldkfdjklpjphnpaokdafmgpidhn: {
		name: 'TrollFaceEverywhere',
		file: 'trollface.webp'
	},
	agdddnmdjmljkjeglnidfpmpenbimmmn: {
		name: 'LinkedGPT',
		file: 'imgs/final.png'
	},
	agfcdegbapplhinejbaadfhmohblaldj: {
		name: 'Ventrilo.ai',
		file: 'squircle.js'
	},
	aghmgfkjfbkcockededacdhemkpgdcko: {
		name: 'Investigate',
		file: 'app.css'
	},
	agpjllgcceliiblmebkbiccaaldfedbc: {
		name: 'Tunable Image Block',
		file: 'js/api.js'
	},
	ahigdeeepecbhcmdcnlhiojdggilpkog: {
		name: 'Stocks',
		file: 'img/logo.png'
	},
	ahkpfejaeoepmfopmbhjgjekibmfcfgo: {
		name: 'zkID Wallet',
		file: 'inpage.js'
	},
	ahoojfimakdgphmpnmkkajpcmmaphhao: {
		name: 'HeyGen Screen Recorder & Capture',
		file: 'permissions.html'
	},
	aidgalgknmlipfnekllphkpignegfmid: {
		name: 'ExpertBot',
		file: 'content.js'
	},
	aidjbcadkohfjgbikjiechlafmiifpfm: {
		name: 'KeepChatGPT',
		file: 'assets/inject.js'
	},
	ajabpfgngbkodbhcfjhmmedgnaojinnn: {
		name: 'FontXplorer',
		file: 'assets/tip.svg'
	},
	ajiejgobfcifcikbahpijopolfjoodgf: {
		name: 'Xget Now',
		file: 'icons/icon16.png'
	},
	ajjhglddifjgmjilgjlcgafhjbhapebp: {
		name: 'Made in Where',
		file: 'assets/spinner.gif'
	},
	ajmcpdllaaklaocodbnllhkaflncmlog: {
		name: 'doqment',
		file: 'pdfjs/web/viewer.html'
	},
	ajppjggkpcpiignpmdinfacapgffemhd: {
		name: 'Mizfa Tools SEO',
		file: 'html/popup.html'
	},
	akekmdbhpcllngkclondhoffopndiofn: {
		name: 'QR Code Scanner',
		file: 'css/style.css'
	},
	akmgkiagajiaaopnealbkppagompbegg: {
		name: 'Twitter Unfollow Assistant',
		file: '_locales/ja/messages.json'
	},
	aleoomdhnjddjlmfocibikjdpkdpadko: {
		name: 'Breakcold',
		file: 'assets/index-KL5sMVSR.js'
	},
	amikeononomkhphopbflomhnmdijjpmb: {
		name: 'ChatGPT Infinity',
		file: 'lib/ui.js'
	},
	amikgkkhclafondlhjpmmhmacibjphnf: {
		name: 'Color Wheel Chart',
		file: 'popup.js'
	},
	amjjglmomeodglgclcnjdjbhhcfnbnpd: {
		name: 'Listening.com',
		file: 'imgs/voices/voice-Amy.jpeg'
	},
	anfjigoimfhbhkcpggoomegmafgmnada: {
		name: 'NoTab',
		file: 'popup.js'
	},
	apfohijllfhnblfljmdalceabnebpagn: {
		name: 'audioSuite',
		file: 'platinum.png'
	},
	apnhcckmbmofaneogehcfnghabafpeej: {
		name: 'Chatbot Manager',
		file: 'assets/fonts.js'
	},
	bacpgelchdkdpdhpfejnckhmnodlkfik: {
		name: 'PopVerse',
		file: 'chap.js'
	},
	bbjdllcbfjcaokkmeidgoefbddahbofo: {
		name: 'Sparos',
		file: 'src/assets/images/logo.png'
	},
	bbmihgkbffpkmcpgcnoleggpmbghndgh: {
		name: 'Telegram Saver',
		file: 'utils.js'
	},
	bbnemobkpbncbpklloncaljndkagjfeh: {
		name: 'Grips',
		file: 'icon-128.png'
	},
	bbnngmmocfegjkekebllkaijmfoelofn: {
		name: 'Custom Scrollbar',
		file: 'assets/fonts/inter.woff'
	},
	bcagnbmncmeliaknnhmbkkgackfipoic: {
		name: 'ReadLite',
		file: 'src/styles/tailwind.output.css'
	},
	bcbpabgcmmmofaddaliomhdpnbpnkhid: {
		name: 'InsComment',
		file: 'assets/icon-16.png'
	},
	bcogakegjkeopbkokbkkaopnclmhhfmp: {
		name: 'YouTube Default Playback Speed',
		file: 'html/time_ui.html'
	},
	bdeapcnahigpibeoehandgaiijljkdnl: {
		name: 'Ringover VoIP Phone for Odoo',
		file: 'missing_cookies_alert/missing_cookies_alert.html'
	},
	bdehmbdbcnaodfmjjgkgkcekomeijdoh: {
		name: 'Favourites.io',
		file: 'public/templates/popup.html'
	},
	bdiohckpogchppdldbckcdjlklanhkfc: {
		name: 'Nighthawk',
		file: 'static/media/qr-code.181c8eeb065bb04f416d.png'
	},
	bdljmpplpbibfkejhafjkngnhkenpnoi: {
		name: 'ModernLoop',
		file: 'panel.html'
	},
	bdngfgjiioghlobpnibipeeaejhgipnd: {
		name: 'Lead Talk CRM',
		file: 'icon16.png'
	},
	bebloogeelkcpmflbhdhdkppjjbifiih: {
		name: 'Image Metadata Viewer',
		file: 'json5.js'
	},
	benpolaabjjganjkmhbdppijcfimlgdb: {
		name: 'Abbreviations.com',
		file: 'popup.html'
	},
	bfcegiickjkkfnfkaahogfaacjhkfphi: {
		name: '360 Ribbon',
		file: 'cancelnew.png'
	},
	bfcoofacbpockpcfeeckliogafkkjkpk: {
		name: 'ChromeGPT',
		file: 'css/menu.css'
	},
	bfkiphdpanhdnjbekkjigbjjmllhndch: {
		name: 'Sugar Connect',
		file: 'main.js'
	},
	bflldjbbpcjgooclhpmhdhioebmnnkcm: {
		name: 'Deloitte Credentials Wallet',
		file: 'js/injectedScript.js'
	},
	bfpogemllmpcpclnadighnpeeaegigjk: {
		name: 'Peek',
		file: 'img/gear.svg'
	},
	bgeejdmhoicoclcgdbcoggbigdlpfahl: {
		name: 'Lightfunnels Domain Connector',
		file: 'popup.html'
	},
	bhfhdidbcclahddgkikdccfidjbcmibi: {
		name: 'Jumpshare',
		file: 'js/popup.js'
	},
	bhkmchipjcnljhlablgoommejanegoif: {
		name: 'Atomseo Broken and Redirect Links Checker',
		file: 'img/on.png'
	},
	bhkobcgijlfcgnkamhbndpdiiigefoph: {
		name: 'Dehelper',
		file: 'content/assets/i18n/en.json'
	},
	bhoocdffjjnclofbhdejeicidimoidhh: {
		name: 'SmartCopy All-in-One Copy Tool',
		file: '_locales/en/messages.json'
	},
	bidcnmfhffpamjhgkemdmjdmnchjnmdf: {
		name: 'RussianGram',
		file: 'js/popup.js'
	},
	bigfgeehfoenaimkoohnokeeideaomnd: {
		name: 'MockMan',
		file: 'app/bundle.js'
	},
	biohbbbijnpljcdhobbjakhgpkelmjpg: {
		name: 'Vocus.io',
		file: 'css/app.css'
	},
	bjfjkjhibpmaimoapdkgcflpjlbbmind: {
		name: 'RoboProfit',
		file: 'img/ca.webp'
	},
	bjilalbcjkmilhhkfagmblkoekicmcnf: {
		name: 'AI for Math',
		file: 'icon/16.png'
	},
	bjmnahkhkillpfpjhbjjjnpjchgodbdj: {
		name: 'UMich Course Calendar',
		file: 'program-icon.png'
	},
	bkgplkpdgidlgmnlhdfakhcjfpfgjjkb: {
		name: 'Ancient8 Wallet',
		file: 'inpage.5a171c4c.js'
	},
	blcaacmeglnfblclocdgaomhopnfobof: {
		name: 'TAP Wallet',
		file: 'assets/tap-script.js'
	},
	bmcjeckemmdkoapcmpmffabkelgknlme: {
		name: 'Cashclub',
		file: 'content.css'
	},
	bmedieedfkbmedbfgjehehmhfhkknoij: {
		name: 'サテライトAI',
		file: 'lib/md5.js'
	},
	bmninhlkpnllbioeiflnedibkeifpmkm: {
		name: 'Drawboard PDF',
		file: 'loader.js'
	},
	bnaofpgjajbimmicdiipemhmheafhgkb: {
		name: 'ServiceNow Web Automation',
		file: 'lib/water-flow.js'
	},
	bndkfmmbidllaiccmpnbdonijmicaafn: {
		name: 'vksaver',
		file: 'js/main.js'
	},
	bneepngbmdnjodaceeffcodionfphgcb: {
		name: 'Ebsta for Bullhorn',
		file: 'js/bar.js'
	},
	bneijclffbjaigpohjfnfmjpnaadchdd: {
		name: 'Indeed Scraper',
		file: 'injected.js'
	},
	bnicgleoempcdjoinaolcflaacjaldco: {
		name: 'View Forms',
		file: 'manifest.json'
	},
	bnlanfoeolmminabanfaomlpacadfkie: {
		name: '云神价-购物点点',
		file: 'js/area.js'
	},
	bnnhpohpnamnjhajbkgpmblleljodlhd: {
		name: 'Flagmoji',
		file: 'settings.js'
	},
	boaldbonhjahlifomlfompdicecodccc: {
		name: 'StyleGuard Pro',
		file: 'js/common.js'
	},
	bpcliekjnopcagpekljnkpicfdpjfbkc: {
		name: 'Chinese Learning',
		file: 'copy.png'
	},
	bphiihopjpbcbahfpngldhoafegggeab: {
		name: 'Marsello',
		file: 'jquery.min.js'
	},
	cacoibopgjlodngfokahhkphgcohakai: {
		name: 'gRPC-Web Developer Tools',
		file: 'inject.js'
	},
	cadlpkhdkhlecgchhgaclpnbahfckppp: {
		name: 'Research Notes',
		file: 'images/rn128.png'
	},
	caeolfomomlibhkmjaoohnglpnpdfjkg: {
		name: 'Freevpn',
		file: 'icons/logo.png'
	},
	cahanjnhpgjbnhjemgfohkgfjkbhpbdc: {
		name: 'UI Replicator',
		file: 'icon.png'
	},
	calljomlmakockpdlhfjenbphgnngkad: {
		name: 'Helpjuice',
		file: 'style.css'
	},
	capganbaogpgmmlkboomnkdaoghepcng: {
		name: 'Skuowner',
		file: 'images/icon16.png'
	},
	capgbfgnklakdedfbjkacmjpkebanifk: {
		name: 'Acedit',
		file: 'offscreen.html'
	},
	cblhedkfmbhcikepclfiehohcpfpbmnb: {
		name: 'ESMART Token',
		file: 'assets/browser-polyfill.f4591fc4.js'
	},
	cbmmciaanapafchagldbcoiegcajgepo: {
		name: 'EbayGPT',
		file: 'icon/icon.png'
	},
	cdekmndccoppabcjlfflndphloafcgpf: {
		name: 'Driveway',
		file: 'icons/eye.svg'
	},
	cejhlkhieeooenehcfmcfgpcfjdhpkop: {
		name: 'Volume Booster',
		file: 'assets/popup.css'
	},
	cffpojocacfloplffkpecnmhfldddegd: {
		name: 'Screen Capture Recorder 4K',
		file: 'editor.html'
	},
	cgmllohkcppmnkfpijpngkplpdbikhlf: {
		name: 'Safe Surf',
		file: 'img/atf.svg'
	},
	cgnokfdencgajdahelpddddkbgmjafnc: {
		name: 'ElmiilloR Points',
		file: 'content.js'
	},
	cgpcmjlbbminbhmmhodnhihbabgnbaji: {
		name: 'GenTech',
		file: 'logo.png'
	},
	cgphfnglahpambfhocchajalljaeegef: {
		name: 'JSONView',
		file: 'css/jsonview.css'
	},
	chdpdcmianoeafncndadkpmklicedlkl: {
		name: 'HolyTrick',
		file: 'content-scripts/ui.css'
	},
	cifkbafiiegeimphnpgcomajaciffdgb: {
		name: 'Emoji Keyboard',
		file: 'img/icon.ico'
	},
	ciholhjpbfhkdgbjhdefoaiibpmkhonk: {
		name: 'Chirpyest',
		file: 'icons/mail.svg'
	},
	cipnpfcceoapeahdgomheoecidglopld: {
		name: 'Virtual Json Viewer',
		file: 'assets/jq.wasm'
	},
	cjiopambhobomjcdkimcfmdfobmaicgg: {
		name: 'Shopdora-Shopee Data',
		file: 'inject/main.js'
	},
	ckedkkegjbflcfblcjklibnedmfjppbj: {
		name: 'BeraSig',
		file: 'src/scripts/injectedscripts/injectedscript.evm.js'
	},
	ckgeffpapoiemciaenjgbelealaekgic: {
		name: 'Zeus',
		file: 'darkmode.css'
	},
	ckhdepimeomofedoiebgmklphncjnfhe: {
		name: 'Warehouse Job Scheduler',
		file: 'alert.wav'
	},
	cklfipcjofdnmdolnfngpmokdaejidim: {
		name: '不背单词查词',
		file: 'lookup.html'
	},
	clalpejhefalfblnijneiplagklnifee: {
		name: 'SHEINImage',
		file: 'icon-48.png'
	},
	clmkmffdbohhicjlhkcdghlgflpoabfj: {
		name: '边写边搜',
		file: 'icons/del.svg'
	},
	cmbihlcgenpbmdkipolfghkplheignfe: {
		name: 'ABlock',
		file: 'js/injected.js'
	},
	cmdooepdomcdmmdjgjohkkeajegcngfb: {
		name: 'PDF Viewer Pro',
		file: 'content/web/pdf-viewer-pro-intro.pdf'
	},
	cmjdehjikiahgapkmkfnnehieokpgpej: {
		name: 'Composite',
		file: 'modules/select-replacer.css'
	},
	cmncoolckhinjbfghfbiionapeanngep: {
		name: 'Pinterest extra',
		file: 'icon-34.png'
	},
	cnephjboabhkldgfpdokefccdofncdjh: {
		name: 'HackMD-it',
		file: 'popup.js'
	},
	cnkodomhnmnbmiehakpmaabjjbjifhel: {
		name: 'Sparklane',
		file: 'script.js'
	},
	coolkkbfjkkpfbkifcmdjmmfkdhfopml: {
		name: 'Daily Bible Reflection Search',
		file: 'images/ok.svg'
	},
	coonllecklpiahhjkmnjidiaccefopli: {
		name: 'Stackable',
		file: 'index.html'
	},
	coppgeobilocdhiclhgmadabblhfjgpm: {
		name: 'ToolCat',
		file: 'json-format.html'
	},
	cpebggobaenfndpoddkdindknnpbjdfc: {
		name: 'SCPper',
		file: 'constants.js'
	},
	dafimblndlbfdhmdnefmmnjdpbbnflgd: {
		name: 'Ad Observer',
		file: 'webpage/bundle.js'
	},
	dahgndeklkpppijkgeejmflpiachffig: {
		name: 'Omegle Alternatives',
		file: 'config.js'
	},
	dbbcealbkponjcfeafmabmjjkffclpgf: {
		name: 'Night XML',
		file: 'css/popup.css'
	},
	dbdemkocknedkigkocjlackhcmlfhjih: {
		name: 'X情报查询助手',
		file: 'images/pin.png'
	},
	dcbebomificokapbopjhihlhjobeincb: {
		name: 'In-Page Piano Analytics',
		file: 'assets/font/Graphik-Light-Web.woff'
	},
	dcddjkhomebafjbaleonddmfdbdagojb: {
		name: 'Couponuts',
		file: 'images/logo.png'
	},
	dcfmgfgnkhcehmdgpoekllfmnbpbgkha: {
		name: 'MU² Web Unicode Converter',
		file: 'YoeYar-One.ttf'
	},
	dclfbcpopdggpbinijdfionpoljgbaep: {
		name: 'eCaresConnect',
		file: 'apiUrls.js'
	},
	ddmiifbfkjgacpkjkobphimckkpcempd: {
		name: 'Telegram Downloader',
		file: 'index.html'
	},
	deachoodakeofjlfikfkohihnpcgiaim: {
		name: 'Font Tester',
		file: 'content.js'
	},
	dfbpjijneaihingmldgpgcodglkoamoe: {
		name: 'Google Calendar',
		file: 'icons/wp1.png'
	},
	dgfnbmfhjioifionnlcklnpfkkjjglbj: {
		name: 'GPA Calculator',
		file: 'GPACalc.js'
	},
	dghndapbehjdbhiffbckojkhoennbofg: {
		name: 'Push Go for Pushbullet',
		file: '_locales/ar/messages.json'
	},
	dglhlgljkmbceajpnbkkaangdkjfkdbb: {
		name: 'Theater Mode',
		file: 'data/content_script/page_context/theater_1.css'
	},
	dhaoijcpieaecjobjmpfjnblfhjonnmm: {
		name: 'AI QR Code Reader',
		file: 'sandbox/opencv.js'
	},
	dhembjhhmbbhhjcmidflhicmeaghgnji: {
		name: '오마이집',
		file: 'popup.html'
	},
	diggedafpdocbgcamamledcjfmckeaeh: {
		name: 'Magic Assistant Workspace',
		file: 'assets/icon.png'
	},
	diinamlcdbbpfebknmhajjaijpflnaoe: {
		name: 'LeetTest',
		file: 'scripts/companies.json'
	},
	dimpmploihiahcbbdoanlmihnmcfjbgf: {
		name: 'LINE Chat',
		file: 'static/js/uts.js'
	},
	djkhfbkhdgochjlobjaiephkgbihogjk: {
		name: 'StreamPod',
		file: 'src/pages/popup/index.html'
	},
	djmienebkjmfcelnfkcnlbdomapjbgfh: {
		name: 'OKKI助手',
		file: 'assets/img/mk.png'
	},
	djpehmepgepfpoiaendmglmnjmmfalio: {
		name: 'CroxyProxy Lite',
		file: 'shared/images/test.png'
	},
	dkcgdknimgiffognmpiheegpfkkmcapk: {
		name: 'Sundial',
		file: 'images/copy-times.mp4'
	},
	dkgmjefaaffbdcjlfelfjgfnddckcokf: {
		name: 'Tiktok Voice Generator',
		file: 'src/images/icon128.png'
	},
	dkibpfneinleinbaakbaolmhkgfckjcn: {
		name: 'Простые звонки',
		file: 'img/card.png'
	},
	dlbghamflkonfnlclaiggcajlbkigejg: {
		name: 'Unblocked Games Premium',
		file: 'popup.js'
	},
	dljchadmceknaijmdmnaaodjkkidhakh: {
		name: 'Comfortable Sakai',
		file: 'img/logo.png'
	},
	dlomoooljpceboafkelgjgnlpjaignhe: {
		name: '던템',
		file: 'content.css'
	},
	dmajilfknankpppoomabobggpnpdlbnl: {
		name: 'markerNote',
		file: 'icon.png'
	},
	dmcddloohffhmjngiieikfifpfneadcc: {
		name: 'ContentStudio',
		file: 'js/content.js'
	},
	dmhgdnbkjkejeddddlklojinngaideac: {
		name: 'Nudge',
		file: 'hider-menu.css'
	},
	dmmildkgnkpdfiabjoddfdoodneaklhm: {
		name: 'CAIPA POC 2.0',
		file: 'about.html'
	},
	dnaodehopbbgbddbaojmfahnhlacjegi: {
		name: 'oneClipper',
		file: 'scripts/screenshot/crop-box.js'
	},
	dncmnmelaadhdoihlcbegdjfgkpaianf: {
		name: 'PlayMax',
		file: 'js/e_f.js'
	},
	dngcajjmbmmghjlhakccphaikekoieig: {
		name: 'YouTube Video Dubbing',
		file: 'src/assets/128.png'
	},
	dninfcoeoeoplchmcleglkelmofmaeho: {
		name: 'Enhancer for YouTube',
		file: 'media/css/rate.css'
	},
	dnofffnpfhkjcnicnbikofkmgckebdpm: {
		name: 'Meet Assistant',
		file: 'scripts/swal.min.js'
	},
	dnomhejcghecjcjckenhjpidfeiibgnp: {
		name: 'Virat Kohli MeaVana',
		file: '128x128.png'
	},
	docbjomeilnhbjmeopieaimdegaglaio: {
		name: 'Snip-tool',
		file: 'assets/snip-16.png'
	},
	dogbmklcnehaooiadgndpdklmcmoddpe: {
		name: 'R Discovery',
		file: 'assets/icon.png'
	},
	doobkkcnlfiglhoafllloikhabjgblae: {
		name: 'Google AI Citation Analysis',
		file: 'images/copy.png'
	},
	dpeojhmhickhklcpkpllbjcpobdnjhha: {
		name: 'I4Y',
		file: 'img/icon.png'
	},
	dphhcbhnnmpgnfimjdccmjagngkeoikh: {
		name: 'Exoprise Service Watch',
		file: 'images/reload-32.png'
	},
	dpldldnidchlckjfjalcbipblbajcjbd: {
		name: 'Foresee ESP',
		file: 'host.js'
	},
	eabpolgjfkpchgffbkiedgfemcgbnbde: {
		name: 'SF Explorer',
		file: 'panel.html'
	},
	eaeaddaoioikiaokcmjfeghddidmmfhc: {
		name: 'Kommo',
		file: 'preset_docs.html'
	},
	ebagjefpiapkaedjbgkjmjcgjdnbhdnp: {
		name: 'Voice Master',
		file: 'panel.js'
	},
	ebhapiodakbafkjhegnfcmohjccfedkm: {
		name: 'SourcedCode',
		file: 'icon-34.png'
	},
	ebjdocdkgbmhdjllmdoecahimoealjjo: {
		name: 'ATIV Playground',
		file: 'assets/images/Logo.svg'
	},
	ecnknpjoomhilbhjipoipllgdgaldhll: {
		name: 'ChatSider AI Copilot',
		file: 'pay.html'
	},
	edeaffpifpnlcemnfjieocmhbcffchhh: {
		name: 'Strava Enhanced Maps',
		file: 'style.css'
	},
	eeadaochfaalhdgkgejdfalcpdddcpea: {
		name: 'Quden',
		file: 'tabs/embed-view.html'
	},
	eedddkchnanecgbmnkdaaaopbiejldkc: {
		name: 'Smm-helper',
		file: 'assets/js/index.dc6a6b30.js'
	},
	eefggkocimjcilikhofpbinipkcllphd: {
		name: 'Saby HR',
		file: 'popup.css'
	},
	eehollfmncbbcckmibfgapkmganaeena: {
		name: '애드센스팜 황금비서',
		file: 'popup.html'
	},
	efcnkaeocmkpckkenjinmdgkbjhajoca: {
		name: 'X Word Replacer',
		file: 'assets/types-BzRs3UaO.js'
	},
	efeikkcpimdfpdlmlbjdecnmkknjcfcp: {
		name: 'Ad Library & Ad Finder & Adspy Tool',
		file: 'icons/logo_128.png'
	},
	egjonoicjpecjmnegjogdpnagopdkdej: {
		name: 'Crawl date checker for Google',
		file: 'assets/logo_16.png'
	},
	ehhncnkhbchjllmnbcfebjllhnkgnfpc: {
		name: 'Jira Metrics Plugin',
		file: 'board-selector.js'
	},
	ehjjfmgnkkkhaeeocejeimgjgepajkeh: {
		name: 'Nepeto',
		file: 'bootstrap.css'
	},
	ehlmgkidbfjedfdanfechlikaolobpgh: {
		name: 'WProofreader',
		file: 'page/page.js'
	},
	eicepgnmeaipepaieeecfdmnnkhidlkj: {
		name: 'Яндекс Вордстат',
		file: 'assets/index.css'
	},
	eiflpppdaikieggdeojonknijogibjhh: {
		name: '랭플릭스',
		file: 'content.css'
	},
	eigpceijfgcoknincjhkomfodneifcnp: {
		name: 'FlowChat',
		file: 'assets/media/ghl.png'
	},
	ejagiilfhmflpcohicichiokfoofeljp: {
		name: 'Captcha solver',
		file: 'content/script.js'
	},
	ejklmdggogcbjpehmmjnebehjafnkiaj: {
		name: 'Conversion.com Optimizely',
		file: 'options.html'
	},
	ejmjgconpnjnepaldnabahnbndcbdkac: {
		name: 'Công cụ đặt hàng của orderhang',
		file: 'logo-small.png'
	},
	ekaikenfcpochobnfnjiidbaopmofegp: {
		name: 'Smart Redemptions',
		file: 'interceptor.js'
	},
	ekmpjilfjeghbjgddfgfbakkjmobfhhm: {
		name: 'Wander BETA',
		file: 'assets/animation/usd.png'
	},
	elfdoindoanbfgpjkmgfenelmhlpjhci: {
		name: 'PicHound',
		file: 'resources/iqdb.ico'
	},
	elfmiplccfnohmbbpdehiflablbfeijh: {
		name: 'CÔNG CỤ ĐẶT HÀNG LASERSHIP',
		file: 'js/test.js'
	},
	elfmpgajdjmknldbbicgpdiaalbkkioc: {
		name: 'ChatGPT context companion',
		file: 'images/icon16.png'
	},
	emhjndcjncnpgdlogdkeichobfnenebi: {
		name: 'Snap for Merch on Demand',
		file: 'snap-rep.js'
	},
	emlejidncokahfahckdjdofakebjfagm: {
		name: 'KeyGuard',
		file: 'index.html'
	},
	enhcifgjnffebdckpjiohlcelmobbicb: {
		name: 'MP4 to GIF converter',
		file: 'assets/js/index.98d5cbb1.js'
	},
	enmecoidnopldfilbnncjecohoppgafp: {
		name: 'Sign Learner',
		file: 'icon-34.png'
	},
	ennmnfichkhmcecpnllkjklgmfdcenlc: {
		name: 'ChatYY',
		file: 'content.js'
	},
	eojfohkjmcigemmccnbkkpmpnomdagbf: {
		name: 'Whatsapp Bulk Message',
		file: 'images/icon16.png'
	},
	epadnmckjchpoedgecdghpmaicnklagd: {
		name: 'Bilibili Summary with ChatGPT OpenAI',
		file: 'logo.png'
	},
	epbeeejaipcljihofkpdjhfmmbigodjp: {
		name: 'Wildhero',
		file: 'popup.html'
	},
	epellgielojfhbjhdnplcnmndnifbien: {
		name: '青葉のカメラ',
		file: 'logic/MyMenu.html'
	},
	fadefoaoccmlhenbfcjkeipniieoioja: {
		name: 'dSender',
		file: 'assets/inject.js'
	},
	fbfldogmkadejddihifklefknmikncaj: {
		name: 'Phantom Shuttle MV3',
		file: 'assets/img/logos/logo.png'
	},
	fbholmgghhfhbbigpcolkfmegpojfpei: {
		name: 'Магічний телепорт',
		file: 'css/main.css'
	},
	fchghbfimckdiapkacfaljimmkojgfhi: {
		name: 'Extract Links from PDF',
		file: 'help.html'
	},
	fcjjdbmegeocgffpjihgaodhglknopag: {
		name: 'WARP',
		file: 'app.js'
	},
	fdfaeedddmmbalhbhghlnnlhddmffbai: {
		name: 'Matomo Helper',
		file: 'mt-helper.js'
	},
	fdjminldlpednddoeokglgpjiibncfpe: {
		name: 'Selling.com',
		file: 'images/logo.png'
	},
	fdnbeafickafiocjpfpioapepifdfkhj: {
		name: 'Trending Products',
		file: 'ali.png'
	},
	fecibmlbfjpemepjjdenacplfohleoaf: {
		name: '智能销售-客户雷达',
		file: 'inject.js'
	},
	feocfomniclchbgaioedfhccgckmlbed: {
		name: 'Panda Video',
		file: 'sidepanel.js'
	},
	ffjbejplhhgfbhckieoklhaoibhckbed: {
		name: 'Clifl',
		file: 'content_scripts/task.js'
	},
	ffjncjpkoanpjjmcdonkhfammlhfapll: {
		name: 'Quantcast',
		file: 'consent-check.js'
	},
	ffncmmojkoefikplldmnhnogbakllmhg: {
		name: '小乌龟多播',
		file: 'pages/livecode.js'
	},
	fgcpkofcgicoihkkpfmbjgllkgkbpkpe: {
		name: 'Fiidom',
		file: 'static/js/custom-script.js'
	},
	fhdhabioobmdidfhaldhdbleeeigkadn: {
		name: 'BlueConic',
		file: 'copyright.txt'
	},
	fhmgmglbnkddnkkcglfahocfahmjplbj: {
		name: 'AI Fox',
		file: 'popup.html'
	},
	fhmlmcbfjnegdoafmfcfmhpahfegdjlp: {
		name: 'Wistia Video Downloader Plus',
		file: 'popup.html'
	},
	fihbdpohplcdnhllhliaeapefmmpcdjo: {
		name: 'TrashMail',
		file: 'api.js'
	},
	fjdnpmenmpfadeojgkhgiogiclmcjgbp: {
		name: 'ArqSign Certificado Digital',
		file: 'popup/bootstrap/jquery.js'
	},
	fkekkoekkbdfhkifdadejlofdilbcdel: {
		name: 'Web2PDF',
		file: 'templates/hintLimitAlert.html'
	},
	flcepldelhbmffkfanfhoodoahamikkp: {
		name: 'GamesGrandma',
		file: '16x16.png'
	},
	fleifcognemdgekfknmnbelghpgbpkek: {
		name: 'hangve.com',
		file: 'site.js'
	},
	flnkfbknlpooopiejmcejcldfcffkkcf: {
		name: 'Table Detection & Extraction',
		file: 'logo.png'
	},
	fmkcdnhkhfnbaomihadamoendclmjglb: {
		name: 'Area360',
		file: 'assets/icon.png'
	},
	fmolkclgdnbgkcgofmgbhgjklmjkhnel: {
		name: 'Quick Table for Gmail',
		file: 'panel.js'
	},
	fndgllkjbjkfnkjfcpnajbmgaedokmdo: {
		name: 'Templify',
		file: 'action.html'
	},
	fnlodpokkmdkbfdpndggldifechbglbf: {
		name: 'AliPrice Search by image for Shein',
		file: 'assets/js/popup.js'
	},
	fnpagnmajaopjagdhmdplmojfolmfkaf: {
		name: 'PassWatch',
		file: 'src/images/icons/blank.png'
	},
	fpbbmgkekkdgipkngmlgcfgadhnapdle: {
		name: 'One Click Add Parcel',
		file: 'injected.min.js'
	},
	fpggfghfmngphoamhjllcdkfdpjpnbko: {
		name: 'Pronounce Words',
		file: 'img/logo-16.png'
	},
	fpieolagnlkejcpejlbjgbdpaglffacj: {
		name: 'Salesforce Dependent Picklist Matrix Export/Import',
		file: 'js/clickjs.js'
	},
	gadbifgblmedliakbceidegloehmffic: {
		name: 'Paragon',
		file: 'pageProvider.js'
	},
	gagmnmenidmghmppkbadhgmhnjeaglan: {
		name: 'Bulk image background remover',
		file: 'tabs/home.tsx'
	},
	gakjlgabbpdkoilkncmlolaampjadjbj: {
		name: 'CTiContRol',
		file: 'config.json'
	},
	gbakppfkjgpeingibhfgkeddlahonikc: {
		name: 'Pricing',
		file: 'Icon.woff'
	},
	gbekpmgddajechkkbejdchehpmheinme: {
		name: '免费TEMU自动抢发货台助手',
		file: 'css/main.css'
	},
	gbgnhpjhopjdoocmdofdlogbjdnlkkka: {
		name: 'AITab',
		file: 'NewYork.8331ae6b.otf'
	},
	gbjocelfmcapnmcocncmheabfhdhmadl: {
		name: 'Allow copy',
		file: 'enable.js'
	},
	gcflfnendjincoakmpkdgkocaoojjnbc: {
		name: 'OpenDyslexic Font for Chrome',
		file: 'fonts/OpenDyslexic-Bold.otf'
	},
	gchllbbiiaaofhgjpnbnmfpiflahnghl: {
		name: 'TwiPlay',
		file: 'js/popup.js'
	},
	gdbemlfgncdmmljmkkcemfedbbfgghcp: {
		name: 'Pulsedive',
		file: 'options.html'
	},
	gdjccbjidgfgoemlndecafmdefbgjcjg: {
		name: 'RentScout',
		file: 'dist/popup.html'
	},
	gdohlamndfcekefffgioemfjdjlpjbec: {
		name: 'Ecommerce Image Downloader',
		file: 'assets/images/download.png'
	},
	gdpfgejmikpgbnbhbhjegjfglhodfloa: {
		name: 'Easy! Show Title Plus',
		file: 'options.html'
	},
	geopmmjhgiigoelgcgnpcfmblameojce: {
		name: 'Silver',
		file: 'assets/Images/svg.svg'
	},
	gfakplbimkgohgmoaoapfckkccbompod: {
		name: 'Twitter Video Downloader',
		file: 'injected.js'
	},
	gfbiiepahoibecndlolalkhkcpfdddjk: {
		name: 'Recast Right Click Tools for Intune',
		file: 'resources/menu.json'
	},
	gfgacgecfchldicemecobpoafkoimpbp: {
		name: 'Escape Goose',
		file: 'door.gif'
	},
	gfmbbcakoflhbbamcfcfgclgjibaodgc: {
		name: 'Teleparty-pro',
		file: '128.png'
	},
	ggbadcghmcpofonkoeepddbabdkfbbia: {
		name: 'Map Overlays',
		file: 'scripts/page.js'
	},
	ggfbnokkgmbogfddacambpdajihbjmki: {
		name: 'Công cụ mua hàng SaboMall.com',
		file: 'popup.html'
	},
	ghgojagblcngfmngghgndhcogdceogoi: {
		name: 'Script Injector',
		file: 'popup.js'
	},
	ghmbpcmonklliphfbkdbedkdkilfbngm: {
		name: 'Anomali Copilot',
		file: 'tab.css'
	},
	ghmjdagapadakjaffiimogiecdnjdaac: {
		name: 'Webutler.AI',
		file: 'static/README.md'
	},
	gidpkdpdnngpfohekcfkfjbkieeihekj: {
		name: 'BTC Ticker',
		file: 'assets/images/icon-48.png'
	},
	giiemjoccofnggceldeendokfcehnobc: {
		name: 'ChatGPT Print and Save',
		file: 'content/content.js.map'
	},
	ginchbkmljhldofnbjabmeophlhdldgp: {
		name: 'PolkaGate',
		file: 'page.js'
	},
	gipdjalmbiackhnmpjlpafmiaciejfdf: {
		name: 'Volley',
		file: 'mic.js'
	},
	gjddlbmkbmjhhdhkhldpkdelbefkilkk: {
		name: 'Grandstream Wave',
		file: 'content.js'
	},
	gjdjododfnfpmdolaoaiihepkcjpfiob: {
		name: 'Truly',
		file: 'style/fonts/icomoon..eot'
	},
	gklihgcnchjjfcmihmpgennnemkkpnen: {
		name: 'Diccionario RAE en bocadillo',
		file: 'img/tic.png'
	},
	gldebcpkoojijledacjeboaehblhfbjg: {
		name: 'Ask Steve',
		file: 'popup.html'
	},
	glgcbdbnacmlgjaabjliokbnklbpdlno: {
		name: 'Easyamz',
		file: 'img/icons/img16.png'
	},
	glieaboaghdnlglpkekghloldikefofo: {
		name: 'Fuskr',
		file: 'assets/images/1x1.png'
	},
	gljimdoibfdibckkdmcciihdkbmdjmbc: {
		name: 'Slowed',
		file: 'tapeHiss.mp3'
	},
	gmgmmjabnmigondjggpcjmhicekiognh: {
		name: 'Steam Plus',
		file: 'bridge.bundle.js'
	},
	gmjbokljijbegndgfhbmobaniejnaali: {
		name: 'Smart Paste',
		file: 'app.js'
	},
	gnjjmhdcbgjopfodapfecjlgedgimebj: {
		name: 'JD Data Scrapper Tool',
		file: 'js/free.js'
	},
	gnlpiibempcekeipifhpeejgfihbjmpo: {
		name: 'Gemalto Web Signer for Lloyds Banking Group',
		file: 'assets/css/main.css'
	},
	gnobmiceibhknbpgkacoceabpealjnom: {
		name: 'NoteGPT',
		file: 'assets/log-B9hwTMNS.js'
	},
	gnpppldhfbbagiaalkddddajadhlgofm: {
		name: 'Timestamped YouTube Comments',
		file: 'ding.wav'
	},
	goecghjfhmlckpbnhoaliaolfhgmemal: {
		name: 'Access to Notion',
		file: 'scripts/lib/widget/content.js'
	},
	gohemgflodfhnlmbimcgefjnnmjmgnka: {
		name: 'Profitario',
		file: 'util/jquery.js'
	},
	gpaoonmjikbnoedbnnmihhichnjlojji: {
		name: 'PitchMeAI',
		file: 'drawer-iframe.html'
	},
	gpedngacoldidijhikfopjbkidpjobim: {
		name: 'FlipHTML5 Flipbook to PDF Downloader',
		file: 'lib/jspdf.umd.min.js'
	},
	habonpimjphpdnmcfkaockjnffodikoj: {
		name: 'ArchiveBox',
		file: 'popup.js'
	},
	hacnbapajkkfohnonhbmegojnddagfnj: {
		name: 'Tolgee Tools',
		file: 'icons/active.png'
	},
	haepcjhchonagnpkeaijnbfeldaikjjm: {
		name: 'Quick Search for YouTube',
		file: 'icon-play-34.png'
	},
	hagcapmimfcbfdhgmdnabeifnfbicmij: {
		name: 'BitTorrent',
		file: 'icon96.png'
	},
	haminfolhoibklkkjmkjmmgnmbkgmehe: {
		name: 'Change Google Calendar Background',
		file: 'assets/js/utils.js'
	},
	hbfbfmnfkingjgomkgopabedgfpgobkg: {
		name: 'Crosshair Plus',
		file: 'images/icon-48.png'
	},
	hbpgkphoidndelcmmiihlmjnnogcnigi: {
		name: 'DocuViz',
		file: 'css/global.css'
	},
	hccdinmmjkeedfibholbilopaklebdcm: {
		name: 'Fast-eInvoice Token Signing V3',
		file: 'page.js'
	},
	hclkdpaahnpfenlibcmjnajjccpkhoak: {
		name: 'H-E-B Credit',
		file: 'auth.html'
	},
	hcmjeljnhadbmagohaliefekhgaidijn: {
		name: 'WeLoop.ai',
		file: 'resources/weloopai.js'
	},
	hcnffmpopoelpggikahccdfenoobjigj: {
		name: 'Quiver Web Clipper',
		file: 'overlay/index.js'
	},
	hdbmiffpbgklodjfljddiliopfniidco: {
		name: 'Mymeet.ai',
		file: 'offscreen.html'
	},
	hdlmphmmpjldffeiokafhkchgelphphf: {
		name: 'Get Facebook Cookies & Access Token',
		file: 'libs/bootstrap/css/bootstrap.min.css'
	},
	hdoplfhlfoagdghmfamhnakmjjffeila: {
		name: 'close_tab(s)',
		file: 'img/edit.png'
	},
	hehieakgdbakdajfpekgmfckplcjmgcf: {
		name: 'Prompt Catalyst',
		file: 'icons/logo.png'
	},
	helpjbehgodflkpbifaolbjmkjffmeop: {
		name: 'Crossbeam Copilot',
		file: 'icon-34.png'
	},
	hfhghglengghapddjhheegmmpahpnkpo: {
		name: 'WooCommerce Dropshipping',
		file: 'html/popup_in.html'
	},
	hfpokjeoalngkknelljbenaobinichjf: {
		name: 'Guides',
		file: 'images/hruler.png'
	},
	hgdnbhdgboglidilhoipggepjlmmmaae: {
		name: 'Shopify Product Info',
		file: 'js/content.js'
	},
	hgihfkmoibhccfdohjdbklmmcknjjmgl: {
		name: 'Impersonator',
		file: 'static/js/impersonator.js'
	},
	hhcfhpgkpmlbmncciaeanehopjhnbdoi: {
		name: 'HEIC to PDF',
		file: 'assets/css/Index.chunk.css'
	},
	hhodeijkemcdbelkfdhglgmgpmgkfekk: {
		name: 'Gramatika',
		file: 'popup.html'
	},
	higfkiojenkggbdbiilfidjfcgdjpijp: {
		name: 'Shopify Checker and Detector',
		file: 'styles.css'
	},
	hjdcnhcldlclkloongmklmonejnaohek: {
		name: 'TravelMonkey',
		file: 'js/newtab.js'
	},
	hjpbnkkeihnknafkdbglklgmblkgdkki: {
		name: 'Basket',
		file: 'assets/fonts/Be-Vietnam-Pro/BeVietnamProv2-Bold.ttf'
	},
	hkfgnnpbnglaeejogkfacndfcobllped: {
		name: '타오바오 이미지 검색',
		file: 'aww.css'
	},
	hkiecfigipbfbmkbpjhmejjhiffdgmok: {
		name: 'HTML Validator',
		file: 'readme.txt'
	},
	hlkajbcfhlhkdhpkmbcopjooblpmmaka: {
		name: 'ARCON Browser Extension',
		file: 'images/up.svg'
	},
	hmcjlhohmgiacepomkemidchgogegoak: {
		name: 'Paragraph Rewriter',
		file: 'js/main.e2eac33cda761c79e3aa.js'
	},
	hmeohemhimcjlegdjloglnkfablbneif: {
		name: 'XHSPlus',
		file: 'icons/16.png'
	},
	hmfpdofehnmfnoaneplbcpejindkoafd: {
		name: 'CasperDash',
		file: 'static/js/scripts/content/inpage.js'
	},
	hnjepanannlajhppemgdmcjjpimlhkgm: {
		name: 'Callvoip C2D',
		file: 'i18n/en/en.json'
	},
	holiffefjdehbfhliggafhhlecphpdof: {
		name: 'Add Remote Torrent',
		file: 'js/theme.js'
	},
	hpiljnaahbpfebfinmobpchoenlphghg: {
		name: 'TacticalBucket.com One-Click Installer',
		file: 'images/icon-16.png'
	},
	hpinghefcjjgfegpbpcigbgcdmboadjc: {
		name: 'Covideo',
		file: 'options.js'
	},
	hpmolahefgjbmidmoifolgpjkmhdmalf: {
		name: 'Close Tab',
		file: 'js/share.js'
	},
	ialfjajikhdldpgcfglgndennidgkhik: {
		name: 'Ctrl+Tab MRU',
		file: 'content.js'
	},
	icbnjddomcacgkbfikejkkcbjpfdbkcg: {
		name: 'Pinterest Search',
		file: 'img/icons/64x64.png'
	},
	icekdmlfmjngcpakbdjpjiikhofmenia: {
		name: 'snapAddy Helper',
		file: 'scripts/page-scripts/shared/proxy.js'
	},
	icgjkfebljaiiccoeeihocdmjnojmeal: {
		name: 'Mano',
		file: 'src/fonts/avenir-light.woff'
	},
	idnackiimdohbfkpcpoakocfkbenhpdf: {
		name: 'Shopee Images Downloader',
		file: 'injected.js'
	},
	iemhbpcnoehagepnbflncegkcgpphmpc: {
		name: 'Novalya',
		file: 'assets/image/italy.png'
	},
	ifcljmkcponiminmkdhpfiidbijpnljb: {
		name: 'ChatSilo',
		file: 'assets/icons/32.png'
	},
	ifedpjnndppciiodbhmaohidoocmiomp: {
		name: 'Meta Earth Wallet',
		file: 'images/app.png'
	},
	ifihdndmhcceaghgjfdnbmikeabbcbpf: {
		name: 'Screen Recorder',
		file: 'assets/icon.png'
	},
	igfcoofpmcdpcocfofdobneaileiogmo: {
		name: 'Send web articles to Kindle',
		file: 'icon-48.png'
	},
	iglhjjaalhoebkpbceimidnjjbcigdhn: {
		name: 'videostep',
		file: 'contents.js'
	},
	ihafdbecgnhendhckoknblmcminoikdb: {
		name: 'Udemy Video Playback Speed Controls',
		file: 'icon-1024.png'
	},
	ihkdflhmhcaldfmliekcmbbfhfeeemie: {
		name: 'Group Posting PRO',
		file: 'popup.js'
	},
	ihlkclcengelgcfkkmpkhgadepmgijkk: {
		name: 'YoinkUI',
		file: 'signin.html'
	},
	ihoengccmhdfpgeajdljjnalhdjncbbp: {
		name: 'IDX Privacy',
		file: 'src/ab.js'
	},
	iignnndcdkoehloecaaeemlkpcfnhbme: {
		name: 'ITONICS Web Clipper Enterprise',
		file: 'icons/plus.png'
	},
	ijdbgcbejbmcfcglmbahkfpadjbebgal: {
		name: 'Beastnotes',
		file: 'vendor/katex.js'
	},
	ilbgkfmhfigfdabdhjpjcabmfplmomld: {
		name: 'Gan.AI',
		file: 'emailFlow.css'
	},
	illkpkffnkfiipoglfmhalijmcakbhjh: {
		name: 'StudyX',
		file: 'index.html'
	},
	imnghkiliggemhkejgppikbgocegpjec: {
		name: 'Simplified Traditional Chinese Converter',
		file: 'STPhrases.txt'
	},
	inmachhhbcehlpklfjgenplmgffbiiaf: {
		name: 'Templates',
		file: 'assets/icons/icon16.png'
	},
	inmogmmafcadkabkapjmpikbciiplajf: {
		name: 'Boss Hub',
		file: 'logo.png'
	},
	inpjhnjfkjaibkkpcdhibhiccnndljnf: {
		name: 'Devyce Softphone',
		file: 'assets/js/links.js'
	},
	iodpjkpedoapnempbhpokpcphopooacg: {
		name: 'Gaya',
		file: 'images/add.png'
	},
	iojjaiaojbgmnnnhlkbnnhmabngphhjh: {
		name: 'Image to Prompt Generator',
		file: 'popup.html'
	},
	iolfinldndiiobhednboghogkiopppid: {
		name: 'a11y.css',
		file: 'icons/ko.svg'
	},
	ipagkohmdolaedkefjhfkkmjbibdimbp: {
		name: 'Gather Web Clipper',
		file: 'popup.html'
	},
	ipaloicnjcpbhbbdffpbfgnabnmniikk: {
		name: 'Cricket Live Notifications',
		file: 'cricket48.png'
	},
	ipamilanfplehicbibebipjnfopiagkp: {
		name: 'Jio Cinema Watch Party',
		file: 'avatar1.svg'
	},
	ipanmolgobfbmpggfgpjjojjmbndafhn: {
		name: 'GA4-Event Monitor',
		file: 'contentScript.js'
	},
	ipnnnfpakpkpilpeilkombmkjfhaggkb: {
		name: 'YTHACKS PRO',
		file: 'prompts.json'
	},
	jabedmlinbfplldopcakhecaolbdjgda: {
		name: 'Crosshair',
		file: 'assets/images/winnercross.png'
	},
	jafognbanchcefpohggjafiolgfddbmd: {
		name: 'YouTube Pearify',
		file: 'images/9.png'
	},
	jbfpcjllonidndiapmpfidjdekgcjnmc: {
		name: 'AskCuddy',
		file: 'spinner.svg'
	},
	jbikjaejnjfbloojafllmdiknfndgljo: {
		name: 'Ajax Proxy',
		file: 'document.js'
	},
	jblnigcjemkcmeidalliajcnplejfbcf: {
		name: 'text to speech ai',
		file: 'config.js'
	},
	jcejahepddjnppkhomnidalpnnnemomn: {
		name: 'RSC Devtools',
		file: 'assets/fetchPatcherInjector.js'
	},
	jclfbeldkgmnifbmojndnlmaajbohfea: {
		name: 'Click to Call',
		file: 'icon/call.png'
	},
	jcphgophoinpfmbnfecgekaeaoocbogd: {
		name: 'WeBWorK MathView',
		file: 'lib/katex/fonts/KaTeX_Main-Bold.eot'
	},
	jdjdmckkcfmjhhnabfjkhpnjcmekkala: {
		name: 'VU TALK',
		file: 'update_notice.html'
	},
	jdoccfgelddlaopeahgpoffmafnmhpdo: {
		name: 'structal',
		file: 'public/viewer.html'
	},
	jeahjoailalchnofjkkejadigcfnoipj: {
		name: 'Timeko Messaging',
		file: 'company.html'
	},
	jeanmjmahboccfhjjkhlmmabngnjbmeb: {
		name: 'Language Learning with YouTube-AFL',
		file: 'popup.js'
	},
	jeegejabenlmpidohngdaafimapnkiab: {
		name: 'Travel Mapper',
		file: 'css/react-datepicker.css'
	},
	jeibidfaelmiiioohfplflcpnelgipei: {
		name: 'OpenWardrobe',
		file: 'icons/more.png'
	},
	jengodbfljjhgafbimgofjpjjfnikaha: {
		name: 'Seller Pro Analytics',
		file: 'style.css'
	},
	jfcbmnpfbhhlhfclmiijpldieboendfo: {
		name: 'Segment Inspector',
		file: 'broker.js'
	},
	jfdmjhlfnfkohmglkagecammcjkcbnoi: {
		name: 'Belasis Booster',
		file: 'custom.css'
	},
	jgbhioialphpgjgofopnplfibkeehgjd: {
		name: 'DemoMonkey',
		file: 'COMMITHASH'
	},
	jgcpgphpmecnbepkigkioamkdiallnai: {
		name: '115网盘离线下载',
		file: 'dist/mta.entry.js'
	},
	jgeibpcndpjboeebilehgbpkopkgkjda: {
		name: 'Shadertoy Custom Texures',
		file: 'myscript.js'
	},
	jgnbklefkgedfbpjebhjgibfnobjcbli: {
		name: 'Crowdfire',
		file: 'images/pin.png'
	},
	jhhdnfchpbcaeafgmdlijhhpandanbnl: {
		name: 'CloudCall',
		file: 'img/logo.svg'
	},
	jhmfofkpljgmilikdmkglcmekjnlekda: {
		name: 'SquadsX',
		file: 'realms/injected/index.js'
	},
	jhmjglmjdlhbipdigfldhednnlnmemkl: {
		name: 'subgadget',
		file: 'scripts.63d7b23a029294ad.js'
	},
	jibgindchlbfjhhhnlkplcibdmkdnkji: {
		name: 'Atomic Fusion',
		file: 'icons/icon32.png'
	},
	jicmdohfhmaaaifikjmjafcflgochgnc: {
		name: '超级助理',
		file: 'js/newtab.js'
	},
	jikanmlokejbknkfemnbhaebmmibgmmb: {
		name: 'Sidebar Bookmarks',
		file: 'share.html'
	},
	jjbbbilphinkehpmgcmaeeodlffedica: {
		name: 'IG Email Extractor',
		file: 'icons/logo_128.png'
	},
	jjnlhhhmaidobmeghnnmkbhkebpjhohp: {
		name: 'Google Meet',
		file: 'hid_dialog.html'
	},
	jkklfgkjlakgkbhhopifahgbpogdkkpm: {
		name: 'AutoEDClub',
		file: 'AutoEDClub/core.js'
	},
	jkoihbmmdnnciboklipeogheldkngigc: {
		name: 'ideaocam',
		file: 'js/193.d3a7728d.js'
	},
	jmakaoiamffmcilmpdndjpjdanjhfheh: {
		name: 'Tracking Number',
		file: 'assets/chunk-c4d7d122.js'
	},
	jmcllpdchgacpnpgechgncndkfdogdah: {
		name: 'BrainyAI',
		file: 'options.html'
	},
	jnapejkpdpoacdgankigcbaekfgpkfcb: {
		name: 'pFinTools.com',
		file: 'assets/BMC.png'
	},
	jnjnledlnjnkfgepmadpfdljbmdhcihi: {
		name: 'NetMeter Web',
		file: 'public/icon-34.png'
	},
	jnmdcbmpmfhnlchjdkcngihpjmgofajm: {
		name: 'Laya Tree',
		file: 'core/index.js'
	},
	jodnncgnhfdaoikfecnjiehncbnhcpki: {
		name: 'Meta Ads Manager Helper',
		file: 'logger.js'
	},
	jojgmnkcojhiajdkjjdgehhoemadgmgf: {
		name: 'CompareAI',
		file: 'inject.js'
	},
	jojjlkfeofgcjeanbpghcapjcccbakop: {
		name: 'Bias Finder',
		file: 'Icons/icon.png'
	},
	jpafaidkicnfcohbcfegbokibbghpnee: {
		name: 'Mobicip',
		file: 'css/common.css'
	},
	jpicbecmemdfmocdocikjbihejgkmnpi: {
		name: 'StoriesHub',
		file: 'img/ig.svg'
	},
	kaamlhinjaceanpdanmagllfeoelcfhl: {
		name: 'Verifee',
		file: 'sources.txt'
	},
	kahnhlonadjlllgnilndafpajaiepdag: {
		name: 'Sonatype',
		file: 'static/js/main.js'
	},
	kbgffjjeekfafdbjlghgcgchkiocfokn: {
		name: 'Авито аналитика',
		file: 'lib/jszip.min.js'
	},
	kbkbfefhhabpkibojinapkkgciiacggg: {
		name: 'Manga Translator',
		file: 'static/auto.svg'
	},
	kcfngchpkhomalnkmdenkagploidkdld: {
		name: 'Amazonショッピングフィルター',
		file: 'sakura.png'
	},
	kchnhmpeopknjdjejognciimepllkacb: {
		name: 'BGA',
		file: 'js/bgaApi.js'
	},
	kcleeabpbbmbcfgfdhobcincoeliffba: {
		name: 'GPT Formula',
		file: 'auth.js'
	},
	kdaafcdfdmmkickmajigjaicaclnhbgi: {
		name: 'Multi AI Sidebar',
		file: 'img/icon.ico'
	},
	kdadfibngmakkjckcaidihibnkkchjnh: {
		name: 'Alchemy',
		file: 'vanilla/inject.js'
	},
	kdfdijodcdipljclcgifekbfdolociob: {
		name: 'Hide Location',
		file: 'js/content/inject.js'
	},
	kdgdohgdbempjoicceeaaglaioadgfhe: {
		name: 'Rio',
		file: 'html/chat.html'
	},
	keioddmkdnaghickjojalofmgkgafjfo: {
		name: 'DataMask',
		file: 'material.woff2'
	},
	kelnjkckgoidifjnpldnhhamcmhhachc: {
		name: 'Image Grabber',
		file: 'scripts/lib.js'
	},
	kgdbcpllbbnimjgoiomfdebldcofmlbl: {
		name: 'Environment Indicator',
		file: 'background.js'
	},
	kgfnifoledgeaphonbpbpfaepckpdgkg: {
		name: 'Mem Web Clipper',
		file: 'assets/nodefs-CWdW3iGI.js'
	},
	kgggfelpkelliecmgdmfjgnlnhfnohpi: {
		name: 'FindNiche',
		file: 'img/tip.png'
	},
	kgnigbfnfjgpfaiaafcbgdkpalapiinb: {
		name: 'Tab Snooze',
		file: 'offscreen.html'
	},
	khjdmjcmpolknpccmaaipmidphjokhdf: {
		name: 'WorkFlowy MultiFlow',
		file: 'icon/16.png'
	},
	khnfhmfjinkcecdibcpfjeaocmpejmin: {
		name: 'Sustained Choice',
		file: 'icons/48.png'
	},
	kihpomglkbgbhdhogikhpbgakniddmfj: {
		name: 'Bandcamp Volume',
		file: 'js/bandcamp-volume.js'
	},
	kiobaaahafliibpjmfngkcbgogkbfcen: {
		name: 'Q-Stats',
		file: 'images/icon.png'
	},
	kjcdlmnkdkeegmfmdidkogmlinkbkfgo: {
		name: 'Opkey',
		file: 'Login.html'
	},
	kjhigpfcihnpjchpfnboofeecckigbmb: {
		name: 'Video Quality Enhancer',
		file: 'sidebar.css'
	},
	kjmamngookndcomlilkjckmbcneipnop: {
		name: 'tabOS',
		file: 'assets/images/logo.png'
	},
	kjnhiadmccnbfbfjkmkhinglkaolnhcj: {
		name: 'CoCites [Beta]',
		file: 'images/16x16.png'
	},
	kkakhdcmdocechjnnfhihpjkancfmnbf: {
		name: 'Помощник OZON',
		file: 'assets/js/options.js'
	},
	kkgicbgpgfcbhcbmifmfagggnpkebdaj: {
		name: 'Gitoqlok',
		file: 'img/project.svg'
	},
	kkkepmdbeomenffemkijoebfpigebmgg: {
		name: 'ROSSK SEO',
		file: 'modifyNavigator.js'
	},
	kkphlbgphimpedeckcepigahenlmpggc: {
		name: 'NoCaptcha Solver',
		file: 'inject-msg.js'
	},
	klgbkjchnaoaajcapfhahabjnelipjei: {
		name: '192.168.188.1 Login Admin',
		file: 'popup.html'
	},
	kllcbfkocjikpefnnmdfpaaaoafknglg: {
		name: 'AImReply',
		file: 'js/app.min.js'
	},
	klmgadmgadfhjgomffmpamppmkajdloc: {
		name: 'Go European',
		file: 'html/support.html'
	},
	klocpindgcfbgcnhoafnjphjnimpipdf: {
		name: 'AliExpressCategorieDisplay',
		file: 'img/qr.jpg'
	},
	klpomafbcmlgbpmkiafbiifkklipbinf: {
		name: '讯飞星火',
		file: 'insert.js'
	},
	kmmagknmkdgbkbdiidjjpgokoecobhik: {
		name: 'RingCentral RingCX',
		file: 'popup.html'
	},
	kmphamhphplpcjcabjdjjklfjmgkmpba: {
		name: 'Mock',
		file: 'scripts/overrideRequest.js'
	},
	knegaeodgehajemjpfbhlgjdcloklkal: {
		name: 'Myanimelist Redesign',
		file: 'images/logo.png'
	},
	knekpacpcgkieomkhhngenjeeokddkif: {
		name: 'LinkCollect',
		file: 'failed.png'
	},
	knghginpaijcnoellplleakgcedckhod: {
		name: 'Custom Cursor App',
		file: 'content.js'
	},
	knpbmoflfeeokanhpkiofaoaohpgfbjh: {
		name: 'Comment Exporter',
		file: 'main-world.js'
	},
	knpckkifmkioijpoejgngbghdpacfajp: {
		name: 'SumBuddy',
		file: 'mermaid/mermaid.esm.min.mjs'
	},
	koccpomgiggapkmlccpahgiickhacdch: {
		name: 'Image to Prompt By Robi Technology',
		file: 'style.css'
	},
	kocebhffdnlgdahkbfeopdokcoikipam: {
		name: 'The wall',
		file: 'public/3d/wall.glb'
	},
	koddbhkhginnhnfnhgldkampappgmmje: {
		name: 'Reader Mode Pro',
		file: 'app.html'
	},
	kojlkoompagohabokhpanhcjannalmbh: {
		name: 'Convert Label',
		file: 'img/icon.png'
	},
	komohkkfnbgjojbglkikdfbkjpefkjem: {
		name: 'Recruiters\' integration tool',
		file: 'bundle.js'
	},
	konbmllgicfccombdckckakhnmejjoei: {
		name: 'Salesforce Toolkit',
		file: 'scripts/app.js'
	},
	koojdnkakmfajklapicpcjnnkmidcjbb: {
		name: 'Nesine.com Tam Ekran',
		file: 'video.min.js'
	},
	kpfjgpajjeadhkmchkhfpejnhkpeapei: {
		name: 'Ultra',
		file: 'index.html'
	},
	kpinkllalgahfocbjnplingmpnhhihhp: {
		name: 'WA Group Link Finder',
		file: 'assets/w.js'
	},
	kpmomkdjbjegllmkphagalfjaphhfgof: {
		name: 'freetree',
		file: 'data/css/popup.css'
	},
	lacpoilajjhfefkbcjbgmiicefamegmk: {
		name: 'Squid Game Cursor',
		file: 'cur/2.cur'
	},
	laejdmahdkleahgkdpiapfdcmleedhca: {
		name: 'ChatGPT for Google Calendar',
		file: 'logo.png'
	},
	lalmkfklfomdgoibcpiglaokmmfdbhid: {
		name: 'One Piece Wallpaper',
		file: 'js/main.js'
	},
	lbdojbfpomlnfadfoodgmgmaneeefhei: {
		name: 'WA Video Download',
		file: 'logo/logo_16.png'
	},
	lbelfipebhopddchngmplikbbdibjlmm: {
		name: 'NotebookLM YouTube Turbo',
		file: 'icons/icon16.png'
	},
	lbenhokjibnlmfdhbgeacnocgmjegfab: {
		name: 'EternalWallet',
		file: 'scripts/inject.js'
	},
	lbmeghcehlmclgjmnefeflchpbdblamd: {
		name: 'Sutherland Robility WebSpy',
		file: 'css/general.css'
	},
	lbndmgmpidplehmebcfkokbappanjmip: {
		name: 'Capture X',
		file: 'html/msg.js'
	},
	lceichhhobiacakfgcceclahjchbfoee: {
		name: 'Kindred',
		file: 'icons/logo.png'
	},
	lcigdkbkpmhcdjefmbjlgenpgcfjadee: {
		name: 'MM Ofertas',
		file: 'index.css'
	},
	ldfboinpfdahkgnljbkohgimhimmafip: {
		name: 'Handsfree for Web',
		file: 'app.css'
	},
	ldhjpljmgnggmkpcgaicmocfoefbcojl: {
		name: 'Comments Exporter',
		file: 'injected.js'
	},
	ldlogbmoofpmjhkccjhajjkkkjojenip: {
		name: 'Bulletchat for YouTube',
		file: 'icon-white.svg'
	},
	ldopchajhlkkpdpbfejaneknjdgnlcca: {
		name: '表答AI',
		file: 'content.css'
	},
	lgbplgjemdkhdcpghphggeflnhnbbjba: {
		name: 'DesignSpec Web Clipper',
		file: 'add.png'
	},
	lgmnomldfahgdpkbmlegninjpokgmoob: {
		name: 'Discord Batch Deleter',
		file: 'inject.js'
	},
	lhbblbgmkofcjgjcabcfbbajimafbich: {
		name: 'ОТВЕТО',
		file: 'icon16.png'
	},
	lhbojnmdenknginchionjabhdiphnemp: {
		name: 'Web for WhatsApp',
		file: 'icons/logo.png'
	},
	lhdkpgngfiagclieobnhbcljckhelbjh: {
		name: 'InTab',
		file: 'font/bold.eot'
	},
	liffgpoanmhdajkjgdmackedjeneoodc: {
		name: 'Pixel Combat 2 Unblocked',
		file: 'icons/32.png'
	},
	liijobbiponnejejcfpbbmkanlnhhkoo: {
		name: 'CS2 Case Stats',
		file: 'templates/pulled-item.html'
	},
	lijbnhoniejpjjgemoifpjklobhakinb: {
		name: 'Mark My Search',
		file: 'icons/pin.svg'
	},
	lilheebcgalohleheomgkolgmbbpgldp: {
		name: 'Easy Scroll',
		file: 'src/options.js'
	},
	limfjbmhffigfaeeomdijgabjghlgkkp: {
		name: 'Paiger',
		file: 'images/reed.png'
	},
	ljmjlgpdkdjifcjichoaadpjdfklmnhk: {
		name: 'GuinRank',
		file: 'js/popup.js'
	},
	ljocciecfbheeombinlcliibmogahcpf: {
		name: 'Hex Code Finder',
		file: 'js/index.js'
	},
	lknndikjjjcjafcdmooambbgmankibol: {
		name: 'avif to png',
		file: 'icons/icon_16.png'
	},
	lljlidmjadaibchdnjlchinbdemkonlm: {
		name: 'Teemo Ai Auto Apply',
		file: 'models/car.ort'
	},
	lnbknopcbaaajalpagleljjonlblliim: {
		name: 'Cartifind Importer',
		file: 'inject.js'
	},
	lneboljabfampolnnlifcldfoaegpmgl: {
		name: 'Французский экспресс',
		file: '1.json'
	},
	lnjampkehdeoilenmkceiganjofpahbb: {
		name: 'Learn languages with Netflix & YouTube',
		file: 'youtubeScript.js'
	},
	lnjjcckgbpppdjcijhakcbnkggbdhccj: {
		name: 'Auto Post',
		file: 'domselector.config.json'
	},
	lnkaeokffpieenanlbjfjboidmhmdief: {
		name: 'Gemoo Snap',
		file: 'lib/gtag.js'
	},
	lpcfhggocdlchakbpodhamiohpgebpop: {
		name: 'SocialDeck',
		file: 'icons/logo_128.png'
	},
	lpdfdheclggihiflmodagaccofobklje: {
		name: 'TooSlow?',
		file: 'assets/js/c.js'
	},
	lpeapnpcmiabnlfbclinjkejebpgfnei: {
		name: 'EqualFill',
		file: 'options.js'
	},
	lplhclpeegjedapdliokcacmphgcnlnd: {
		name: 'js_error',
		file: 'popup.html'
	},
	lpmmcjhefcghagdhnpbodfdamfmlicfn: {
		name: 'Storage Editor',
		file: 'public/logo_128.png'
	},
	maojkkhnfbodbgbjmnnidflhkolhmfab: {
		name: 'Time Limit',
		file: 'modal.html'
	},
	mapbhaebnddapnmifbbkgeedkeplgjmf: {
		name: 'Biport Wallet',
		file: 'js/inpage.bundle.js'
	},
	mcdjmnipdjjlmjmcdegeeloekjlfiadd: {
		name: 'Better Regex in Search Console',
		file: 'assets/patterns.json'
	},
	mcnjnnkpahkmohlocmkfmkndnlcakfio: {
		name: 'Offsite',
		file: 'monday.css'
	},
	megchchilhekbbnfcklodmndefbhkbco: {
		name: 'ShopSavvy',
		file: 'css.css'
	},
	meippelgkegmikkmofjfedjggnldnebn: {
		name: 'Weekday!',
		file: 'assets/images/weekday.svg'
	},
	mejipmepackdookdfigbkhlkmfnafeih: {
		name: 'Zonify',
		file: 'icons/btn.png'
	},
	menngjohfmmcpcljplgioeoejblcfegc: {
		name: 'Racoon SEO Link Checker',
		file: 'report.js'
	},
	meocbidedjibjdlhfjgplpogklmbhbko: {
		name: 'sipgate',
		file: 'wxt.svg'
	},
	mfnihmhpikbpioclaalnljadjbmbcppo: {
		name: 'Vaam',
		file: 'tabs/Camera.html'
	},
	mfomlgiblphhoiogcdgfdbdgaclgnkng: {
		name: 'Sharewell',
		file: 'assets/cross.png'
	},
	mgchaojnijgpemdfhpnbeejnppigfllj: {
		name: 'NativeMind',
		file: 'main-world-injected.js'
	},
	mgcoclekpjhdpobdgdajbaeiombgkjni: {
		name: '询盘云智能助手',
		file: 'img/AI.png'
	},
	mgijkcklpcaokmpejjcmchocpmkjdged: {
		name: 'Classmate AI',
		file: 'assets/vite.svg'
	},
	mhballnbcieehgglecpjocnbggoogbge: {
		name: 'kimchi-reader',
		file: 'static/data/words.json'
	},
	mhegkajebdbbdkenohlnboijhghpicjf: {
		name: 'Kiroku',
		file: 'assets/constants-DicVx7Vp.js'
	},
	mhhincgnohhopnakokkcoifmnahapihn: {
		name: 'Open TortoiseSVN',
		file: 'images/en/tooltip_log.svg'
	},
	mhnnkoiolmjhfkcjppolhbmobkbjfbdi: {
		name: 'TexTra',
		file: 'icons/dic.png'
	},
	mihpkpgpdkbjjlfhepkjljiiilmbkaeg: {
		name: 'Resolver',
		file: 'tailwind.css'
	},
	mippleannbnchhhacnchpankapalncke: {
		name: 'Frhelper',
		file: 'content/assets/i18n/en.json'
	},
	mjbjdgajnigneaoankmolkojdbbnmjpm: {
		name: 'eMiner',
		file: 'js/aes.js'
	},
	mjecmfhofeojemjhbecidfkfpopikokg: {
		name: 'OnPageSEO.ai',
		file: 'assets/content.js-D_O4zpDi.js'
	},
	mjiajfkepfnfejlebbbkdplpdhhemboo: {
		name: 'Instagram Downloader',
		file: 'content.js'
	},
	mjkojjodijpaneehkgmeckeljgkimnmd: {
		name: 'Drizzle Studio',
		file: 'unsupported.js'
	},
	mjpaeljbciakgnigdligmdihfhnpbfla: {
		name: 'Blackboard',
		file: 'favicon.ico'
	},
	mjppgjgkobfocjgbfdmdfcepknibgbae: {
		name: 'Houzz Pro CRM for Gmail',
		file: 'icons/128.png'
	},
	mkelefdcdcnnkjaihpcfabbcabccogac: {
		name: 'ShopBuddy for Canada',
		file: 'icons/20x20.png'
	},
	mkfhgagoddnhjojmopafgdlllahamifi: {
		name: 'GTJ',
		file: '0.js'
	},
	mkjdcoeddifgnbbafjppfcabiggcfhmo: {
		name: 'ChargeDesk',
		file: 'resources/frame.js'
	},
	mlahdfgjbidfdlhmpmfnikheobfeibeg: {
		name: 'CanvasCape',
		file: 'adders/stats.js'
	},
	mlbnicldlpdimbjdcncnklfempedeipj: {
		name: 'Yours Wallet',
		file: 'inject.js'
	},
	mlhimllheakianplccjmedmiabppmeaj: {
		name: 'With A View',
		file: 'offscreen.html'
	},
	mlkemaonopiomkepkdchdmhhpmhlllaf: {
		name: 'Moodle GPT Quiz Solver',
		file: 'geco2.png'
	},
	mlpknngnojgniobijmbodnjdkikajelj: {
		name: 'Tab Session',
		file: 'html/tab.html'
	},
	mmbfjiakfgpnpannoknhdbmoammbpdeh: {
		name: 'AdTech Ad Inspector',
		file: 'loader.js'
	},
	mmdclkcghbikhhjcbjlnhgnnkeaolhek: {
		name: 'SteamAuth',
		file: 'public/notification.mp3'
	},
	mnddginionlghpblkimpdalcecpnbjln: {
		name: 'Responsive Image Linter',
		file: 'collector.js'
	},
	monfhkhegpjfhcmjaklhnckkhlalnoml: {
		name: 'TKCommentExport',
		file: 'injected.js'
	},
	mpapkmgkphbggmlekkfnoilmafnbfile: {
		name: 'PixieBrix BETA',
		file: 'frame.html'
	},
	mpcimhkpmbilcgnafkkdanemdmjpipjc: {
		name: 'Premium Sender Pro',
		file: 'logo/cc.png'
	},
	mpcplcmhkechjfdbljgomdeechoppmng: {
		name: 'BGU Spark',
		file: 'images/tosaf.png'
	},
	mpemnhhdaakahghnfhidcimfcjmbkakm: {
		name: 'Dark theme VK',
		file: 'dark.css'
	},
	mphkinhcenmlkpfddjojkoncjjpdjeal: {
		name: 'avatar maker from photo',
		file: 'config.js'
	},
	mpifhmmgeeofnfpehedbokjmlcgnlhbn: {
		name: 'Eye-Able',
		file: 'popup.js'
	},
	mpnhboifpcngcoilgolajnnlfeoafefa: {
		name: 'Epryx',
		file: 'icon.png'
	},
	naclfbjhhmgjjabhalmdpgifbhjeblib: {
		name: 'Chega de BBB',
		file: 'images/icon16.png'
	},
	nbbinpgfldgjgbmfnjlhglpaihlhmdho: {
		name: 'Proxy SwitchyOmega Pro',
		file: 'icons/16x16.png'
	},
	nbeghbnelcdncbbgniiokocdinabgofp: {
		name: '雪球双语',
		file: 'assets/icon.png'
	},
	nbkmhgpijnbbmfdjpmnebmgkdoiocglc: {
		name: 'InstaVue',
		file: 'insta-vue.js'
	},
	nboacbjmjmdlelkdepdkgmlgjjnpganb: {
		name: 'iScribe AirMic',
		file: 'img/HoverIcon-Red.png'
	},
	ncekbecnpnoiapeghdneaihmeokakpdp: {
		name: 'Friend Exporter',
		file: 'img/pay-secure.jpg'
	},
	ncokhechhpjgjonhjnlaneglmdkfkcbj: {
		name: 'Habit Tracker',
		file: 'content-scripts/wgt.css'
	},
	nfcedcdobkdklbamclcgmccocjpdijhe: {
		name: 'GegevensDelen',
		file: 'resources/logo80X80.png'
	},
	nfmkfpoaomgnnomijeolbkjffdildobk: {
		name: 'Lot Size Calculator',
		file: 'oauth2.html'
	},
	nfnjjegaecebjpkblfedlbefnnheookl: {
		name: 'No More 404',
		file: 'js/sw.js'
	},
	nglkbfgmfiojfiopeamadheagaiaofnb: {
		name: 'Yet Twitter',
		file: 'dist/contentScripts/injected.js'
	},
	nhdpeaeaafgbncmionfngamhohnngabl: {
		name: '2TOOL',
		file: 'img/running.gif'
	},
	nhhchicejoohhbnhjpaaoajhbbghhfgh: {
		name: 'JustParty',
		file: 'lib/watch.css'
	},
	nhijejfjieloehdlkicfakfjfmnkgnlf: {
		name: 'HTL Debug',
		file: 'extension/bridge.js'
	},
	nibcpadmgplbioagpknbbeabnidndcic: {
		name: 'Kadiska',
		file: 'popup.html'
	},
	niiaamnmgebpeejeemoifgdndgeaekhe: {
		name: 'Cypher Wallet',
		file: 'icon16.png'
	},
	niipedbmjiopjpmjcpigiflabghcckeo: {
		name: 'Breathhh',
		file: 'popup.html'
	},
	nikhaokjeplnpmiacenkhmbfoeondkga: {
		name: 'Savely',
		file: 'styles.css'
	},
	nimhpogohihnabaooccdllippcaaloie: {
		name: 'WA Quick Group',
		file: 'assets/wa.js'
	},
	nimncjjomfcjmfnghgaopccmdggjfoam: {
		name: 'Kameleoon Debug Assistant',
		file: 'popup.html'
	},
	ninjhiamekocpfhnaidinipdocmbiikp: {
		name: 'Recipe Cart',
		file: 'media/cart.png'
	},
	njbgkalfmgkchikknmaimfjmfjpnbnpm: {
		name: 'Style Cursor',
		file: 'js/background.js'
	},
	njboehnbpagnlfpegjnffaehdjfdhiao: {
		name: 'HTML to 设计',
		file: 'src/assets/import.mp4'
	},
	njhgppihgleonhgjanbjojnpgjkfmijo: {
		name: 'AKColor',
		file: 'pipette.html'
	},
	njoicpmnlbhcinacogofeincbglclloi: {
		name: 'mei\'s lens',
		file: 'mjs/he.js'
	},
	nkchpnhcngcimheadoeelngjpigcbpie: {
		name: 'WA Chat Translator',
		file: 'logo/logo_16.png'
	},
	nkkjdpdmojaobchjkhhlfgeopllbldcg: {
		name: 'Furigana Toggle',
		file: 'furigana-toggle.css'
	},
	nlagodpbpbdgiekgdjlajdgjelbjleaj: {
		name: 'net2phone',
		file: 'js/injected.js'
	},
	nlejafdphaoialgmeabdbjhmbifdompb: {
		name: 'Desktop Lux',
		file: 'images/effects/heart.png'
	},
	nmbegeoebipgkcpgjjghhhcmafklifob: {
		name: 'TITANIUM PROXY',
		file: 'assets/chunk-CbHz5-TW.js'
	},
	nmbngkjfkglbmmnlicoejhgaklphedcg: {
		name: 'ScreenShot Tool',
		file: 'preview.html'
	},
	nmchfccapedknmhbonfllacohfaofghm: {
		name: 'TwBoost',
		file: 'assets/icn-vip.png'
	},
	nmjfijfmhcjlamhcgaogchfacdgknmdn: {
		name: 'Superbuy',
		file: 'js/box.js'
	},
	nnbeepdmhiimdmeifpkbeinmbafaedja: {
		name: 'ConcertPal',
		file: 'injected.js'
	},
	nnbidkcdajgfolmmdghdaoamfddgaeph: {
		name: 'DealCatcher',
		file: 'icons/48.png'
	},
	nnojeiieeadneaihajanmppohlibagaj: {
		name: 'Image Parser',
		file: 'font/santana-black.woff'
	},
	nnoknbhinidmlidfbhcikejmpfdlbpnj: {
		name: 'Reprise Product Capture',
		file: 'styles.css'
	},
	nnpdpbjoioeijoaplmdmnnfeenkacfon: {
		name: 'WeChat Web Open SideBar',
		file: 'iframe_page.html'
	},
	nnplkdokacnobmlbeolphcbloomcodpe: {
		name: 'Store Detector',
		file: 'apps.js'
	},
	nofokiljieeapdoglnabhbpgeddcjmda: {
		name: 'Import AliExpress/Amazon reviews to Woo',
		file: 'assets/js/jquery.js'
	},
	nohjijligchgbabiimogbigfkjmhekdm: {
		name: 'Pack It',
		file: 'outer-frame.html'
	},
	nohphjepbjannpjpmodlcgdlialokkpd: {
		name: 'ChatGPT Webpage Summarizer',
		file: 'ExtPay.js'
	},
	npacijjmogbimdkdpccgbnejfaheocpn: {
		name: 'KeyHub',
		file: 'index.html'
	},
	npiiinidjjddnffoiopbkncedkkhhbia: {
		name: 'Flowchart Maker',
		file: 'index.html'
	},
	nplkdkbfnfheognggghkckpgngbjkahe: {
		name: 'YouTube Subtitle Reader',
		file: 'content.js'
	},
	oaceoebbkmkgfjhmngdinoclnionlgoh: {
		name: 'Duplicate Tab Helper',
		file: 'js/ui.js'
	},
	oaknkllfdceggjpbonhiegoaifjdkfjd: {
		name: 'Clippy Assistant',
		file: 'assets/img/clippy.map.png'
	},
	obegkpmjkhpjfhmdjdojmenmlbepenme: {
		name: '1stream Client',
		file: 'iframePage.html'
	},
	obkjdmniaggmapkigjdcgghanhbcfpma: {
		name: 'MapsLeads',
		file: 'inj/inj.js'
	},
	ocbdbfgioaohinjejhibklaoikhlodne: {
		name: 'TVExtBot',
		file: 'images/error.png'
	},
	ocdhefklmpnflbbdmlhgeknhjajmnbff: {
		name: 'CIMCON Prerequisite',
		file: 'logo.png'
	},
	ocinlljpgedeimebndedmhjmbiigmoga: {
		name: 'Meu Dim Dim',
		file: 'styles.css'
	},
	ockmipfaiiahknplinepcaogdillgoko: {
		name: 'Accelerator',
		file: 'earcon-alert.mp3'
	},
	odlfokfcmbpcbehnlfcjmbkbbalffahc: {
		name: 'Sunnah',
		file: 'dist/index.html'
	},
	odlncglkkpdcbefpneoelgcopkmgajbh: {
		name: 'floik',
		file: 'icon-34.png'
	},
	oeadnackbbpmhlefkdcpeknplmcbhnbj: {
		name: 'Yellow Tomato',
		file: 'block.html'
	},
	oedcimpodglmiiikihcklcgepfpphplb: {
		name: 'UTSniper',
		file: 'js/main.js'
	},
	oefglhbffgfkcpboeackfgdagmlnihnh: {
		name: 'Adena',
		file: 'inject.js'
	},
	ofaccdedcjcdbkjgjepbnacoekoeoepf: {
		name: 'EyeCare Assistant',
		file: 'settings/settings.html'
	},
	ofikakkdpjlipbnhbfloclbkcabdhjah: {
		name: 'SmartCopy',
		file: 'images/icon.png'
	},
	ofkgndjljeccdgmehefcijojnaagopbn: {
		name: 'Phantom',
		file: 'index.html'
	},
	ogbnplgfglcjlbplclgejnmfkccollba: {
		name: 'SERP Checker',
		file: 'data/countries.json'
	},
	ogpkegjebcammkmepihcpempnhklkgjp: {
		name: 'Ad Dimmer',
		file: 'js/s.min.js'
	},
	ohaljbdkibikebnonmblcmpjobjncpcn: {
		name: 'Ad Skip for YouTube',
		file: 'js/rate.js'
	},
	ohjlfnhjabflkiocjhchhogighnpbelg: {
		name: 'Bridge',
		file: 'src/assets/icons/icon-16.png'
	},
	oifmahnepecgegpdiomjikkmfmnlbdjo: {
		name: 'Take a Break',
		file: 'assets/audio/breakover.mp3'
	},
	oinaejchlfdgmpamifbjnjcjadgfdhng: {
		name: 'Medtel Cloud',
		file: 'src/misc/dist.js'
	},
	ojeagliladediodhljoaiieahplfchef: {
		name: 'FREE Upgrades for Netflix!',
		file: 'js/i18n.js'
	},
	ojgaknagnojclcnmenmickjcnpbijill: {
		name: 'AliEHelper',
		file: 'images/AliHelper_icon.png'
	},
	okeampldbdmpachkggljgpngbooaclal: {
		name: 'Google Maps Extended Routes',
		file: 'pages/bookmarks/bookmarks.html'
	},
	olmlgedphnhncbcchpglfmcjgibaleah: {
		name: 'Hotmail',
		file: 'manifest.json'
	},
	omdilgkadhcoliihkpbgpkdcpogkbhah: {
		name: 'Design Mode',
		file: 'data/toolbar/index.html'
	},
	omgfpihdadclmbmmdjlopimfjlndicna: {
		name: 'Currency converter app',
		file: 'currency_config.json'
	},
	omnfacodbbkglgkpngfdcoobnaemnddd: {
		name: 'Spot N Paste',
		file: 'icon.png'
	},
	oniajgpocamknkleaaflnhgddjlbkidc: {
		name: 'Real Madrid wallpaper',
		file: 'js/main.js'
	},
	onlebljiolgmajcgmhnlpddfedichgcf: {
		name: 'Roblox Characters Custom Cursor',
		file: 'assets/js/common.js'
	},
	oojlbdpkehgpegkkkoboiomjfcdlolkl: {
		name: '字狐AI',
		file: 'images/eva.png'
	},
	ooopjlaooieldchgiblaoicbpjofloci: {
		name: 'SocialDeck',
		file: 'icons/logo_128.png'
	},
	ooplafalnjanalchifpohefplpjkejjj: {
		name: 'Hoopla',
		file: 'icon-32.png'
	},
	opdoghpdlmeghifopkcedmlpnkampeac: {
		name: '2Ring',
		file: 'dialogs/v1/reloadDialog.html'
	},
	opefegokalblljhkomgkkbkdpemnccpl: {
		name: 'Auto Text Replacer',
		file: 'assets/chunk-DlQF-wbZ.js'
	},
	oppacfhojhdjcgkjeeonghmolpjhgcec: {
		name: 'Ntro.io',
		file: 'interceptor.bundle.js'
	},
	pahjcficmhfgjkdcdadnacjdiinpilmd: {
		name: 'Responsive Website Testing Toolkit',
		file: 'favicon.svg'
	},
	paiilnohppponakpjeamailmlmgdbdll: {
		name: 'Kilkaya toolbar',
		file: 'help.html'
	},
	pbajmkgfblpcnmbceefnjbhbhkflameh: {
		name: 'TwExtract',
		file: 'js/inject.js'
	},
	pbgbkaiaeaoehbphelhidlkjjfefcfdf: {
		name: 'Maps Hub Search',
		file: 'images/fb.png'
	},
	pblhkfkpppcpjihglfgjcmjjldmahdci: {
		name: 'Your starting point',
		file: 'popup.html'
	},
	pbnfhkmfddkhbenbjbajgonmbdaclbak: {
		name: 'Blaawk',
		file: 'blaawk.jpg'
	},
	pcbkpkgjcobgakenfeckiaodbopnjjbg: {
		name: 'Synonyms.com',
		file: 'popup.html'
	},
	pchacppeelclfhfcoehbbpgbgjhglocc: {
		name: 'qr code decoder',
		file: 'vendor/Jcrop.gif'
	},
	pcoagofepldellfpomggmnmkjgdpkcmg: {
		name: 'CloudCall',
		file: 'app.html'
	},
	pdhaalepogdcfdkbhgphjppjcmjbjfkd: {
		name: 'RCP',
		file: 'assets/floatingIcon.ts-CJpmuZwW.js'
	},
	pdmhpiiaheknhfbnnmhfkghioikbailf: {
		name: 'Cross',
		file: 'tooltip.html'
	},
	pebnpgoaniejancjohabmmjjecfmggai: {
		name: 'D&B Hoovers Everywhere',
		file: 'images/DB_AMPERSAND_Pantone.svg'
	},
	pfbjijkemboimlmngimalfbnianfcfdd: {
		name: 'IDL Helper',
		file: 'ffmpeg-core.wasm'
	},
	pfgcdkekglglgapgigkpckjpmcopbmbj: {
		name: 'StudentDPA Analytics',
		file: 'content.js'
	},
	pfnbphkjiefendhkdadcnblkeooimida: {
		name: 'Realtime Content Insights',
		file: 'css/popup.css'
	},
	pgaabedmnacicfkgnbfdodgmdmpbcnpk: {
		name: 'WZone Import Manifest V3',
		file: 'js/inject.js'
	},
	pgenicongmjoccdhkdclfoimdnecpikb: {
		name: 'QR Code Generator for Gmail',
		file: 'panel.js'
	},
	pgfabgncjjnknojglnhjlcfjhgjlocog: {
		name: 'MuseDAM Collector',
		file: 'static/css/index.css'
	},
	pgliecfpaeiicbmadehhbhdcjmpjonam: {
		name: 'Screen Search',
		file: 'welcome.js'
	},
	pgllgjmdkgjjafcdjbigellollokilon: {
		name: 'Sneeit Spot',
		file: 'assets/img/icon.png'
	},
	pgnlnpfeedgjhkhdokjjkjhbmkdajoik: {
		name: 'Summarize AI',
		file: 'icons/icon16.png'
	},
	phjnilkjjfbilopeodkkclehigebkdhg: {
		name: 'Teem',
		file: 'info.html'
	},
	phlkkkjnkdlmoadecifealfblgllmaop: {
		name: 'Circle to Search',
		file: '48.png'
	},
	pijagnpcnegcogimkghghdihobbeaicn: {
		name: 'ChatGPT-The Future',
		file: 'content.js'
	},
	pijkopmmbakjnkbhlhmoiakmdjomjppo: {
		name: 'snapAddy DataQuality',
		file: 'scripts/page-scripts/shared/proxy.js'
	},
	pjngiaibdlbkddlmpilmojpemfdchkdj: {
		name: 'CEPC',
		file: 'js/vendor.js'
	},
	pjnkabicgidoflkilpobciceedcamkpo: {
		name: 'Blue Canoe Pronunciation Dictionary',
		file: 'icons/red.png'
	},
	pkagojnmikckmbhldmdeadklmndfofjh: {
		name: 'Tahrirchi',
		file: 'img/home.svg'
	},
	pkdcpohhilpdgdooafpjnenmnhgbmdmh: {
		name: 'ChatGPT Plus',
		file: 'content.css'
	},
	pkfflefpojeaachfheeokfbgkgkbjhmj: {
		name: 'All-Inclusive CRM',
		file: 'data/buttons.css'
	},
	pkghjinojggjcpfnbpncpkbmpdijldla: {
		name: 'AliPrice',
		file: 'assets/js/popup.js'
	},
	pkheafpccjdmpppcifdkccnllpclbonk: {
		name: 'Fohlio Plugin',
		file: 'plugin.html'
	},
	pkklhocebkkoglfnghnfnpokjanbbcfo: {
		name: 'Email signature generator',
		file: '16x16.png'
	},
	pknjnbclnhgjjeabdckldmnhchjihede: {
		name: 'Myfone',
		file: 'gfx/shared/ms-logo.png'
	},
	pliilpflcmabdiapdeihifihkbdfnbmn: {
		name: 'Azguard Wallet',
		file: 'assets/lock-DP5aXMQp.js'
	},
	pllhgmakfbbbbaelhhoompbffgknkodc: {
		name: 'Business Leads Scrapper Tool',
		file: 'js/free.js'
	},
	pmhpdlmhembafjlpohanpgkpmnpanbcd: {
		name: 'Merk.cz',
		file: 'img/icon-19.png'
	},
	pnbllofomdnncapklolkeplmhflalhei: {
		name: 'TwFollowExporter',
		file: 'inject.js'
	},
	pnnmjhghimefjdmdilmlhnojccjgpgeh: {
		name: '2FA Authenticator',
		file: 'icon-34.png'
	},
	poadogbppaepbjmllhodbnpcefpcjkgb: {
		name: '55海淘',
		file: 'styles/serp.css'
	},
	pphkfapdogfpoemjlhhadfcmeeogemjo: {
		name: 'Teads Pixel Helper',
		file: 'assets/1x1.png'
	},
	pphmkfkacgdidnohnpepahgnjobofhgd: {
		name: 'TemuStockHelper',
		file: 'yiyi.mp3'
	},
	ppmokamipefokigaccoiefenhgokncle: {
		name: 'DM Saver for Instagram',
		file: 'buy.html'
	},
	aalfhpnibomagmpkoljjlblbbkmedcli: {
		name: 'Voiceitt',
		file: 'icons/icon-128.png'
	},
	aaoccafneaocbhgbhkagdhlmgmagbagn: {
		name: 'Page Load Stats',
		file: 'icon128.png'
	},
	abagkbkmdgomndiimhnejommgphodgpl: {
		name: 'AI Chat Bot',
		file: 'icons/logo.svg'
	},
	abdljfgddilapkcefolbagomojjkkhih: {
		name: 'ChadView',
		file: 'recorder.js'
	},
	abofkimhphnmiaphlfbciebjmdckcjhm: {
		name: 'UtilEngine',
		file: 'styles/app.css'
	},
	abpkahdagjdghamgfepehlapignjdpkh: {
		name: 'TextNow',
		file: 'txt.html'
	},
	acafodflmigcgodaikhfieheibdaepbc: {
		name: 'extractor.plus',
		file: 'img/logo.png'
	},
	acbgggmodknkhllpnhjdogppjejleade: {
		name: 'PumpPill Pro',
		file: 'icon.png'
	},
	aceananohppnfepjfhiodaladhlimjeh: {
		name: 'click to call',
		file: 'popup.html'
	},
	acfkledaichkaimkfcnbkipemjbbaeke: {
		name: 'PageOptimus',
		file: 'img/shared/eye-on.svg'
	},
	aclgcfmciekojimhckimdcapkejceili: {
		name: 'Outboundly',
		file: 'l1.png'
	},
	acnogbaldkeemneolhfnmcghconcmjna: {
		name: 'RevenueHero',
		file: 'images/rh-16.png'
	},
	adahoneonjbcodnbkdngadoffhdekhnf: {
		name: 'Publicate',
		file: 'dist/extension_gmail.js'
	},
	adiegjggfpcnpdpoopbjjfclalfmjcgi: {
		name: 'Tuttodati',
		file: 'assets/js/index.8f239df0.js'
	},
	adngnfeecellefelipgneogimgljchbf: {
		name: 'Change Color of Image',
		file: 'src/images/icon128.png'
	},
	aecjfhgljhbdgphmhdkdgfhbdfnkmfmh: {
		name: 'Yandex Practicum',
		file: 'uploader.js'
	},
	aeedmjhchkfdihlhngofokjmmielhjle: {
		name: 'Arex',
		file: 'interceptor.js'
	},
	aehofphooenabolflanfidbhjmgmchpb: {
		name: 'Webtop.com',
		file: 'passwordSelect.html'
	},
	aeijenbcnhhmcgknnimiddbdgpndfcpn: {
		name: 'RORR',
		file: 'fonts/Roboto-Regular.ttf'
	},
	aennlhiijkmahiflpdglbknpecfgnile: {
		name: 'Wazo extension',
		file: 'popup.js'
	},
	aeofjocnhdlleichkjbaibdbicpcddhp: {
		name: 'SnapTest',
		file: 'injected.js'
	},
	aeojbjinmmhjenohjehcidmappiodhjm: {
		name: 'Api Capture',
		file: 'icon-34.png'
	},
	afjaifocdahgfpfgepaniahacjjoeeli: {
		name: 'Mastermind',
		file: 'mm16.png'
	},
	afmemjjekcdkgpnladhmgglocgfkaali: {
		name: 'Bunken Checker for Gmail',
		file: 'images/icon.png'
	},
	agbklapacbpooaenpbmboiodiphfcjnh: {
		name: 'Anomi VPN',
		file: 'icons/cart.png'
	},
	agcepmkdnfaglcenjnfkcabdfcekjfcb: {
		name: 'TTS',
		file: 'settings.html'
	},
	agfkhaofhamaepkmikhpadjgijljbhcn: {
		name: 'eBay Fee Calculator',
		file: 'images/icon.png'
	},
	aghfgppmefneeefhpmgboigbfkcnmkcd: {
		name: 'Eshelper',
		file: 'content/assets/i18n/en.json'
	},
	agianfbobdbglakalonhgoiajlmlnkoh: {
		name: 'shoopit',
		file: 'js/popup.html'
	},
	agndfoikbihjcifcfnnbiffconjgofoe: {
		name: 'faceit-extender',
		file: 'icon-34.png'
	},
	ahkbicmdpaknajbgefiolmhakkkojaml: {
		name: 'HYU LMS HELPER',
		file: 'src/content.js'
	},
	ahldiccakfmoigoeojmmoeahecgnejmg: {
		name: 'Lasso',
		file: 'external/confetti.js'
	},
	aibfeemadfncnhephomomdicckopkgoe: {
		name: 'Gemini AI Assistant',
		file: 'sidePanel.js'
	},
	aijecocmefcagpmbpjcfjjbcclfmobgf: {
		name: 'SparX Wallet',
		file: 'js/popup.js'
	},
	ailkhjklbmefaidepjigcalcjdachpfp: {
		name: 'AliPrice',
		file: 'assets/js/popup.js'
	},
	aioheomkldpmjlfdjnookgcpekdegamn: {
		name: 'Brex',
		file: 'auth.html'
	},
	aioimldmpakibclgckpdfpfkadbflfkn: {
		name: 'Source Detector',
		file: 'popup/index.js'
	},
	ajalggifhapngpgfbbpbfnciehmihham: {
		name: 'Photo Collage Maker',
		file: 'src/images/icon128.png'
	},
	ajbdencgojbanpbmjaafdleiadnabndg: {
		name: 'Vtiger for Gmail',
		file: 'js/helper.js'
	},
	ajbpdaapcfffcgibknjbphaloaogfgnd: {
		name: 'Memobot',
		file: 'popup.js'
	},
	ajgfnlfggljmdkepjeaicepbokhemmhd: {
		name: 'ReachUC',
		file: 'assets/content-CKKcJaHm.js'
	},
	ajhcbjjgonogiifldoofdeonjclcehkh: {
		name: 'GotDibbs Toolbox',
		file: 'toolkit.js'
	},
	ajkgnokoigbiimpgoibiaghdcoiegfgp: {
		name: 'Lionel Messi Wallpapers',
		file: 'js/main.js'
	},
	ajmkldlbkpbhbnblgfadgebkaoadnfld: {
		name: 'Table as CSV',
		file: 'icons/128.png'
	},
	akccggdgggleflhhinmemopglmnjhkho: {
		name: 'Ring.io Web Phone',
		file: 'icon-16.png'
	},
	aklnkkbopjjemjlkffhamaepagbmblbg: {
		name: 'Playlist Maker',
		file: 'resources/icons/1v.png'
	},
	akmmhbokbfhghenajahbcmogcbghiamg: {
		name: 'YouTube Liberation',
		file: 'icon-256.png'
	},
	akpfeajollobofjloonfnljgkdfeoibj: {
		name: 'VINCUE',
		file: 'css/print.css'
	},
	alaclngadohenllpjadnmpkplkpdlkni: {
		name: 'Airbnb Images Downloader',
		file: 'injected.js'
	},
	albfhllpljifkmplbcmmfppfcfdlpdcf: {
		name: 'Futrich',
		file: 'Logo.png'
	},
	aleailbhikempmbpdgleoaiemaioamgj: {
		name: 'Gladiatus Helper Bot',
		file: 'main/index.iife.js'
	},
	algbkiepdpcjnhgagoddfcicdeaiimba: {
		name: 'hackbar',
		file: 'icon-34.png'
	},
	alkiaengfedemppafkallgifcmkldohe: {
		name: 'Flamingo',
		file: 'icon-34.png'
	},
	allahbfbjenjbgjihmjnjcafiebdjgck: {
		name: 'Hello YaHei',
		file: 'font.css'
	},
	alngaojhoejljemhkbnhenblnpalgifb: {
		name: 'Search by image on Ebay',
		file: 'ic.png'
	},
	alpjkkbjnbkddolgnicglknicbgfahoe: {
		name: 'FOLDING AT HOME IN THE DARK',
		file: 'fah_custom.html'
	},
	ambfnpmanbfkcfoocddoicfaodljjahb: {
		name: 'New Status Colors PRO for JIRA Cloud',
		file: 'assets/url-utils-7EQPJnak.js'
	},
	amhpammgffnhofdboeeihjhlcgchhphg: {
		name: '跨境魔方领英助手',
		file: 'kf.c18a801d.png'
	},
	amjldpjobjpiflbdejcidlkmhllhnnnm: {
		name: 'Dictozo',
		file: 'css/font.css'
	},
	amompibekeoilojklkcchfklkjoclhig: {
		name: 'AI Watch Later',
		file: 'tabs/index.html'
	},
	angipbimgemcngiinfnmidalapaeajlh: {
		name: 'GM Bot',
		file: 'options.html'
	},
	anhmcblpecaabfbedccbofmjodfdjcdj: {
		name: 'WhatsApp Translator',
		file: 'icons/logo.png'
	},
	anjdeafahmohgbdmpildijdgodchjgog: {
		name: 'Totango',
		file: 'index.html'
	},
	anjhbpfdlolipmhnnlhoeieljmndilad: {
		name: 'WebFill',
		file: 'assets/icons/info.png'
	},
	anjikclblkfdigpmbjckiampdojgjecn: {
		name: 'Icon Changer',
		file: 'utils.js'
	},
	anlmfajfhajafleocbgpmlkdjlkpnbpd: {
		name: 'Vi Subtitle',
		file: 'src/utils/recorder_worklet.js'
	},
	aoclhcccfdkjddgpaaajldgljhllhgmd: {
		name: 'Sitecore',
		file: 'sc_ext/Application.js'
	},
	aoejhhnjefoodboboghlpjkfnknkkngj: {
		name: 'Inter-University Media Study',
		file: 'externalScript.js'
	},
	aoiogfieipljfbeapbfaegmngkoiclbf: {
		name: 'AI Speakeasy Microphone',
		file: 'fontawesome.css'
	},
	aojgcjojneegldjkimenjdmdhnhkkdki: {
		name: 'StratusLINK',
		file: 'icons/logo.svg'
	},
	aokdahpjojkcjlnlbjlecolfcnhjndnd: {
		name: 'FastApply',
		file: 'utils/utils.js'
	},
	aokodfkpgklodahhlcnneehpbojjaabf: {
		name: 'MoneyNex',
		file: 'image/ld/b.gif'
	},
	aopnnccplbmphndiljkpkcnnihfdfnpm: {
		name: 'Auto Furigana',
		file: 'kuromoji/dict/cc.dat.gz'
	},
	aopodabomkfakmjghlkojpknemlileil: {
		name: 'EqualWeb Accessibility Crawler',
		file: 'scripts/content/chart.js'
	},
	apbbkgiadnodlonfadecfkpjkfakklnf: {
		name: 'PaperSpan',
		file: 'js/toastr.js'
	},
	apcpkjbcmhnknpbfjkkpmnedhkbbillc: {
		name: 'Syncboard',
		file: 'offscreen.981262d7.js'
	},
	apkbhelmjopppdciodiacpabiklegojp: {
		name: 'Botify',
		file: 'assets/dm.svg'
	},
	apkbmdonlbkacgjglgpmchbagjildcol: {
		name: '苏维Yandex引擎找客户',
		file: 'index.html'
	},
	apogailbefogonabpcdihagcplbljiog: {
		name: 'TutorEva',
		file: 'assets/js/App.acfc1446.js'
	},
	apojppknlejabllfcepalckcnafnplkc: {
		name: 'Volume Booster Pro',
		file: 'assets/popup.css'
	},
	bacfpgdobkabjplplikbcjacepkjndji: {
		name: 'Vertical Tabs',
		file: 'icon_128.png'
	},
	balmedpdkadboceldfojnnlcpfolbeoa: {
		name: 'EB集运仓',
		file: 'image/icon.png'
	},
	bbidpgoneibefablhfcnaennjkfbflmk: {
		name: 'React code finder',
		file: 'icon-34.png'
	},
	bbioibipebcopenpbhfceogfjknmjbpl: {
		name: 'Dealfront Connect',
		file: 'src/app/index.js'
	},
	bbmbgnakcfbkpfppacnnpooflflimkmk: {
		name: 'Tubelator',
		file: 'logo.png'
	},
	bbojnefnecffoabbniaoboefbffbbimi: {
		name: 'Demodesk.com',
		file: 'fonts/Roboto-Bold.ttf'
	},
	bcbfalkgcdnejkdjacfpgcoanadljgoe: {
		name: 'Vocal Remover',
		file: 'mainContentScript.bundle.js'
	},
	bcgmniaoakfcmjbhcjpknnegmfddobla: {
		name: 'OneProxy',
		file: 'pages/index.html'
	},
	bchkeljpaneffcdpbglmgdhlemdcpdhb: {
		name: 'Simpsons cursor',
		file: 'cur/0.cur'
	},
	bcjlaaocogjkkhbmjhlhonmpnngnlogn: {
		name: 'Steam Web Integration',
		file: 'css/content.css'
	},
	bdcdjfoindheggeigmgocjlglbphnkdn: {
		name: 'Airplus',
		file: 'scripts/utils.min.js'
	},
	bdgbhdnmgjkbpedemhmphgfjabmoagbk: {
		name: 'Vocal Remover, Music Separator',
		file: 'content.js'
	},
	bdgjkkdfafbckdafophnhkhldcdbijfp: {
		name: 'Kopy',
		file: 'assets/client-Dxn_vZUZ.js'
	},
	bdjlkpmifpfahoefpjkmaiggmpbelfdi: {
		name: 'Zistemo',
		file: 'css/common.css'
	},
	bdmbdemclleffkpgfamlhheioepbfbgd: {
		name: 'dLcompare',
		file: 'content/iframe.css'
	},
	begbicabkddhcmhemihdnmdhadfkmdkf: {
		name: 'OreoWallet',
		file: 'injector.js'
	},
	bekjlhfdjnggolmglphobmeigmcajnfe: {
		name: 'Gmail.com Login',
		file: 'config.js'
	},
	beongpingjcjghpgfcngccpkpmhgldjm: {
		name: 'ScrapeBot',
		file: 'views/output.html'
	},
	bepabeobdmmefhhhkonppcppgodhjdno: {
		name: 'Open Graph debugger',
		file: 'assets/index.prod.tsx-raPkgUAm.js'
	},
	bfheaockklhhdaohopnlkbohdadlfdjo: {
		name: 'Colleague AI',
		file: 'click.mp3'
	},
	bfknpbdaakipbjfghpmdnfahdekkjdkm: {
		name: 'Blur Background for Google Meet',
		file: 'styles/body.css'
	},
	bgbigmlncgkakhiaokjbhibkednbibpf: {
		name: 'SignETS plugin',
		file: 'assets/pavillonE.jpg'
	},
	bgdbjlghcpajcnpbpchcpffmbjibbebc: {
		name: 'noCRM',
		file: 'popup.html'
	},
	bgfalbljifeicggidnbkdicbkhboggmg: {
		name: 'YTExplore',
		file: 'icon/playlist_32.png'
	},
	bgfhmafjampalkbjicjcjiikhlaggdnm: {
		name: 'Noone Wallet',
		file: 'js/injected.js'
	},
	bgiapcpcleefnmmkhaakokfbjnjjjeap: {
		name: '百宝箱 AI 助手',
		file: 'lakex/katex.min.js'
	},
	bgjjglhjkffkglfaeboklkoommniefgk: {
		name: 'Get Apc',
		file: 'icon-16.png'
	},
	bgjmdikbohnimpajkchcefnolfiekdgj: {
		name: 'Mathway Screenshot Support',
		file: 'script.js'
	},
	bgljoepmlacldealfkmfohenjekflpdn: {
		name: 'Helper',
		file: 'popup.html'
	},
	bhaaofjcbafngjjneehlganleamobkke: {
		name: 'wireframe-page',
		file: 'lib/wave.woff'
	},
	bhadlmjencobfbdjhpocebojhhnpemam: {
		name: 'Wildberries search by image',
		file: 'assets/js/options.js'
	},
	bhdoiapekbepjecanoicbbnlmcfdcmoh: {
		name: 'Screen Capturing No Domain Restriction',
		file: 'icon.png'
	},
	bhgocaboiejjaddkenndiccocpbpajnf: {
		name: 'SearchManualz',
		file: 'checkbox.png'
	},
	bibbfboplacbgnobiebieficdenamhmd: {
		name: 'TikTok Downloader',
		file: 'assets/js/content.js'
	},
	biddiaplldhhnkmkjjiehlojebppjifh: {
		name: 'Extract Text From Picture',
		file: 'content/Jcrop.js'
	},
	bieffgacahgffgjoehgamaomcpcelmfb: {
		name: 'WebStickies',
		file: 'contentScript/main.css'
	},
	bijkhhcgjhgdddmppajndjgpogecfghn: {
		name: 'Yandex Map Editor',
		file: 'lock.svg'
	},
	bikepkadinmcegcmajclcdknamijmfgo: {
		name: 'SEON Intelligence',
		file: 'templates/ip.html'
	},
	binamioddebkgapafhckcomlljmagkcp: {
		name: 'Cursor Space',
		file: 'assets/reload.svg'
	},
	bjahjijchjnokbgbahdmfcjoblkicank: {
		name: 'Email Finder',
		file: 'index.js'
	},
	bjdiocojjlclafjbeafkjoifogenbbbp: {
		name: 'Oliv',
		file: 'js/idb.js'
	},
	bjfghcpakkaedbehchpedekdlmbmaakd: {
		name: 'Prompt Blaze',
		file: 'chunks/269.js'
	},
	bjfmponplngnbafhafealgkdbjjbpmco: {
		name: 'BDFAST',
		file: 'logo.f36f1ced.png'
	},
	bjgihidachainhhhilkeemegdhehnlcf: {
		name: 'BBOalert',
		file: 'iframe/init.js'
	},
	bjjfalkhedjloclpigcpeckofnifkhck: {
		name: 'Etshop',
		file: 'images/best.svg'
	},
	bjkanngacobjmdfgpdegpgdnmpedajag: {
		name: 'Tipli',
		file: 'serp.js'
	},
	bkbkakcdolgpfecbdoniemalpghmgpii: {
		name: 'ChatGPT',
		file: 'html/options.html'
	},
	bkgpghomdfnideecfbacopckdepkcloc: {
		name: 'Notebook LM Source Getter',
		file: 'css/styles.css'
	},
	bkkjjgdcaijdpemgehojkekcliienhac: {
		name: '棵岩阅读',
		file: 'css/baidu.css'
	},
	bkmgmifiajfbmjpmpijemifaaplcbdff: {
		name: 'WorldGuessr',
		file: 'tabs/worldguessr.tsx'
	},
	bkofbedceemlfhnooknifhdobpgdfmjc: {
		name: 'Rhubarb',
		file: 'styles.css'
	},
	bkpjjpjajaogephjblhpjdmjmpihpepm: {
		name: 'eBay Images Downloader',
		file: 'downloader.html'
	},
	blecebkjfbkpannnmajllilknpccheak: {
		name: 'SFocus',
		file: 'css/images/bg.jpg'
	},
	blljpkobmadahidjcappomekbkpnnbaf: {
		name: 'Purchr',
		file: 'icons/add.svg'
	},
	blmjpihalepofbadijebmekdfecfldgm: {
		name: 'Chat GPT Reply',
		file: 'img/warn.png'
	},
	bmdgagkmkpkdknbkfaabnafnaemokmlh: {
		name: 'Gyazo Teams',
		file: 'menu.css'
	},
	bmdlblkcnngnjahdbgiehfddgppkhdep: {
		name: 'AutoFill Forms',
		file: 'icon-128.png'
	},
	bmhllieeinkpmabkjlplllpeknfakgmj: {
		name: 'DOJO',
		file: 'icon-34.png'
	},
	bmjlmnhdmfpkdhjfichjfciedemjaobb: {
		name: 'Prompt book',
		file: 'options.html'
	},
	bmmbmlcnghehdpemfobefkmnahgdadbo: {
		name: 'Facebook Ad Library Insights',
		file: 'popup.js'
	},
	bmnbmnemfpcjabgdljjanmloeciofedg: {
		name: 'Gmail-GPT',
		file: 'assets/images/bg2.png'
	},
	bniifnajcfhipaemdbbodnegpdhegkik: {
		name: 'VibeGrade',
		file: 'img/ga.png'
	},
	bnpjledobdcjaahppbiiooamdlclgfen: {
		name: 'Chess Free Online',
		file: 'config.js'
	},
	bpdlomdbmhipfcjacpgpnhbnckhiipdh: {
		name: 'Strava Auto Kudo',
		file: 'css/autokudo.css'
	},
	bpfihnmkglfdgimfkahnnipnllhelkke: {
		name: 'emtracker',
		file: 'gmail.js'
	},
	bpfnegmcopgmjchmcpahhgmlkjgfblii: {
		name: 'Selenium Click Recorder',
		file: 'icons/normal.png'
	},
	bphljipbmphlijnccpkcgjoncfaaihjo: {
		name: 'Transcriber',
		file: 'images/icon.svg'
	},
	bplepbelihejfpcjoeialhjpamgpnfln: {
		name: 'Titan Wallet',
		file: 'inpage.main.js'
	},
	bpnffccnbopjjgkcffmgcbhjiahiebbk: {
		name: 'ChatGPT-Box',
		file: 'static/img/ch-16.png'
	},
	cahgnhelilbgaekiffkppobhbojddoeb: {
		name: 'Dubsy',
		file: '16.png'
	},
	cahmajcpiilipcdkbplihchpgojaldpn: {
		name: 'YIMA',
		file: 'images/Yima.png'
	},
	cajpfncojbfhppoebogbdkkdkfbjkdjf: {
		name: 'luckykoi',
		file: 'common.js'
	},
	cancljbppfaghiangdombkgjhbfcoomf: {
		name: 'Scholarometer',
		file: 'Media/Images/key.png'
	},
	cbcpebonnklbnemkgkmofpkebonjifff: {
		name: 'Dynamics SideKick',
		file: 'icons/favicon.ico'
	},
	cbegoaefmneaieaaikkmbkjhklkglagf: {
		name: 'Temp Mail',
		file: 'assets/html/popup.html'
	},
	cbjhifphajilffhlebmcmmomcfmgjlli: {
		name: 'GBP',
		file: 'js/login.js'
	},
	cbngnnhgfljncoliddifmkgklphlojnf: {
		name: 'Polygraf AI Content Detector',
		file: 'icon-32.png'
	},
	ccfancffpeacbblhcdfgigdeccceipon: {
		name: 'DrivePasswrd',
		file: 'res/images/icons/eye.png'
	},
	ccfhnokjphdkbbpcfolpllaoaclnpjmp: {
		name: 'LeaderX',
		file: 'images/logo.svg'
	},
	cckggnbnimdbbpmdinkkgbbncopbloob: {
		name: '公众号内容编辑器',
		file: 'mpmd/logo.svg'
	},
	ccnfadfagdjnaehnpgceocdgajgieinn: {
		name: 'Justdial Scraper',
		file: 'injected.js'
	},
	cdcjmkiabmominbckhhcbjleidhddjfc: {
		name: 'Twitter Enhanced',
		file: 'content.css'
	},
	cdhljjahkpnlcajclppdkojdomlialbj: {
		name: 'Roamer',
		file: 'dist/images/up.svg'
	},
	cdkjljpfeodbkfkhhehmhgdleojloemj: {
		name: 'Language Lab Interactive Sub',
		file: 'src/assets/icon.png'
	},
	ceaaomihllbckdndacmplkneclfebmgn: {
		name: 'Screen Recorder',
		file: 'js/content.js'
	},
	cehhldibjedpegllpigjjcckemnpekld: {
		name: 'LoadFocus Cloud Load Testing',
		file: 'js/jquery-3.5.1.min.js'
	},
	cekebjfebnajphajaemjhgjhpmdjepdo: {
		name: 'WriteMe.ai',
		file: 'images/logo.svg'
	},
	celhojiplcoiojnmgjoenklfgghifncp: {
		name: 'Scroll To Top',
		file: 'css/popup.css'
	},
	cemkfacfpffpnpfacineaojofenihdlf: {
		name: 'tema++',
		file: 'img/eksilogo.png'
	},
	cenebmbnfldkhfnhfgjamahgfoclcoie: {
		name: 'Song Maker Toolkit',
		file: 'perc-noise.svg'
	},
	cfgmcamlcehdcoegmngjofiafnglhkgo: {
		name: 'Clean Reader',
		file: 'js/reader.js'
	},
	cfnnfecmcnfcjohnkmaojedpmnjpeoik: {
		name: 'Images Reloader',
		file: 'img/done.gif'
	},
	cfpndkefbadcphfgdphaejnmidcobhmk: {
		name: 'Keplr-中文',
		file: 'assets/icon-128.png'
	},
	cfppnjkmonaidnemfamopfflbcnecfco: {
		name: 'SmartCue',
		file: 'png/logo.png'
	},
	cgdjipjplklipnlfbglgkjlnhfkpihfd: {
		name: 'Tarss',
		file: 'framework/dotnet.js'
	}
}; 