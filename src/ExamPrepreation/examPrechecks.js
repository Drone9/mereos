import i18next from 'i18next';
import '../assets/css/modal.css';
import { runSystemDiagnostics } from './systemdiagnostic';
import { IdentityVerificationScreenOne } from './identityVerificationScreenOne';
import { IdentityVerificationScreenTwo } from './identityVerificationScreenTwo';
import { IdentityVerificationScreenThree } from './identityVerificationScreenThree';
import { IdentityVerificationScreenFour } from './identityVerificationScreenFour';
import { IdentityVerificationScreenFive } from './IdentityVerificationScreenFive';
import { ExamPreparation } from './examPreprationScreen';
import { addSectionSessionRecord, convertDataIntoParse, getSecureFeatures, handlePreChecksRedirection, registerEvent, updatePersistData } from '../utils/functions';
import { PrevalidationInstructions } from './PrevalidationInstructions';
import { preChecksSteps } from '../utils/constant';
// import { changeCandidateInviteAssessmentSectionStatus } from '../services/candidate-invite-assessment-section.services';
// import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';
// import germanyFlag from '../assets/images/flag-of-germany.svg';
// import UKFlag from '../assets/images/flag-of-uk.svg';
// import spainFlag from '../assets/images/flag-of-spain.svg';
// import franceFlag from '../assets/images/flag-of-france.svg';
// import brazilFlag from '../assets/images/flag-of-brazil.svg';
// import italyFlag from '../assets/images/flag-of-italy.svg';
// import whalesFlag from '../assets/images/flag-of-whales.svg';

const modal = document.createElement('div');
modal.className = 'modal';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';

modal.appendChild(modalContent);

const tabsContainer = document.createElement('div');
tabsContainer.className = 'tabs-container';

modalContent.appendChild(tabsContainer);

const tabContentsWrapper = document.createElement('div');
tabContentsWrapper.className = 'tab-contents-wrapper';

const tabContent1 = document.createElement('div');
tabContent1.className = 'tab-content';
tabContent1.id = 'ExamPreparation';

const tabContent2 = document.createElement('div');
tabContent2.className = 'tab-content';
tabContent2.id = 'runSystemDiagnostics';

const tabContent3 = document.createElement('div');
tabContent3.className = 'tab-content';
tabContent3.id = 'IdentityVerificationScreenOne';

const tabContent4 = document.createElement('div');
tabContent4.className = 'tab-content';
tabContent4.id = 'IdentityVerificationScreenTwo';

const tabContent5 = document.createElement('div');
tabContent5.className = 'tab-content';
tabContent5.id = 'IdentityVerificationScreenThree';

const tabContent6 = document.createElement('div');
tabContent6.className = 'tab-content';
tabContent6.id = 'IdentityVerificationScreenFour';

const tabContent7 = document.createElement('div');
tabContent7.className = 'tab-content';
tabContent7.id = 'IdentityVerificationScreenFive';

const tabContent8 = document.createElement('div');
tabContent8.className = 'tab-content';
tabContent8.id = 'Prevalidationinstruction';

const identitySteps = document.createElement('div');
identitySteps.className = 'steps-container';
identitySteps.id = 'modal-steps-container';

tabContentsWrapper.appendChild(identitySteps);
tabContentsWrapper.appendChild(tabContent1);
tabContentsWrapper.appendChild(tabContent2);
tabContentsWrapper.appendChild(tabContent3);
tabContentsWrapper.appendChild(tabContent4);
tabContentsWrapper.appendChild(tabContent5);
tabContentsWrapper.appendChild(tabContent6);
tabContentsWrapper.appendChild(tabContent7);
tabContentsWrapper.appendChild(tabContent8);

modalContent.appendChild(tabContentsWrapper);

const navigate = (newTabId) => {
	showTab(newTabId);
};

function openModal(callback) {
	document.body.appendChild(modal);
	modal.style.display = 'block';
	const activeTab = handlePreChecksRedirection(callback);
	console.log('activeTab', activeTab);
	const preChecksStep = JSON.parse(localStorage.getItem('preChecksSteps'));
	console.log('typeof',typeof preChecksStep);

	if(preChecksStep === null){
		console.log('in the if preChecksSteps');
		localStorage.setItem('preChecksSteps',JSON.stringify(preChecksSteps));
	}

	showTab(activeTab,callback);
	const session = convertDataIntoParse('session');

	startSession(session);

	const modalHeader = document.createElement('div');
	modalHeader.className = 'header';

	const languageSelect = document.createElement('select');
	languageSelect.id = 'languageDropdown';
	languageSelect.style.position = 'absolute';
	languageSelect.style.padding = '10px';
	languageSelect.className = 'langauge-dropdown';
	languageSelect.style.top = '10px';
	languageSelect.style.right = '10px';
	languageSelect.style.width = '120px';

	// Language options
	const languages = [
		{ name: 'English', value: 'english', keyword: 'en' },
		{ name: 'Spanish', value: 'spanish', keyword: 'es' },
		{ name: 'German', value: 'german', keyword: 'de' },
		{ name: 'French', value: 'french', keyword: 'fr' },
		{ name: 'Portuguese (Brazil)', value: 'portuguese_brazil', keyword: 'pt' },
		{ name: 'Italian', value: 'italian', keyword: 'it' },
		{ name: 'Welsh', value: 'welsh', keyword: 'cy' },
	];

	languages.forEach(lang => {
		const option = document.createElement('option');
		option.value = lang.keyword; // Use the language keyword as the value
		option.textContent = lang.name; // Set the display name
		languageSelect.appendChild(option);
	});

	languageSelect.addEventListener('change', (event) => {
		const selectedLanguage = event.target.value;
		console.log('Selected language:', selectedLanguage);
		setLanguage(selectedLanguage);
	});

	modalHeader.appendChild(languageSelect);
	modalContent.insertBefore(modalHeader, modalContent.firstChild);
}

export const setLanguage = (lang) => {
	i18next.changeLanguage(lang, (err) => {
		if (err) return console.error(err);
		updateTranslations();
	});
};

function closeModal() {
	console.log('closeModal called', window.globalCallback);

	if (typeof window.globalCallback === 'function') {
		window.globalCallback({ message: 'precheck_completed' });
	}

	modal.style.display = 'none';
	modal.remove();
}

const showTab = async (tabId, callback) => {
	try {
		console.log('showTab callback',callback);

		const tabs = document.querySelectorAll('.tab');
		const tabContents = document.querySelectorAll('.tab-content');

		tabs.forEach(tab => {
			tab.classList.remove('active');
			if (tab.dataset.tab === tabId) {
				tab.classList.add('active');
			}
		});

		tabContents.forEach(content => {
			content.classList.remove('active');
			if (content.id === tabId) {
				content.classList.add('active');
			}
		});

		const getSecureFeature = getSecureFeatures();
		const secureFeatures = getSecureFeature?.entities || [];
		console.log('secureFeatures', secureFeatures);

		const systemDiagnosticSteps = ['Verify Desktop', 'Record Video', 'Record Audio', 'Verify Connection', 'Track Location', 'Enable Notifications', 'Upload Speed'];
		const prevalidationSteps = ['record_video', 'record_audio','identity_card_requirement','record_room'];

		console.log('exam_perparation', secureFeatures?.find(entity => entity.key === 'exam_perparation'));
		if (tabId === 'ExamPreparation') {
			if (!secureFeatures?.find(entity => entity.key === 'exam_perparation')) {
				navigate('runSystemDiagnostics');
				return;
			}
			await ExamPreparation(tabContent1);
		} else if (tabId === 'runSystemDiagnostics') {
			if (!secureFeatures?.filter(entity => systemDiagnosticSteps.includes(entity.name))?.length) {
				navigate('Prevalidationinstruction');
				return;
			}
			runSystemDiagnostics();
		} else if (tabId === 'Prevalidationinstruction') {
			if (!secureFeatures.filter(entity => prevalidationSteps.includes(entity.key))?.length) {
				navigate('IdentityVerificationScreenOne');
				return;
			}
			await PrevalidationInstructions(tabContent8);
		} else if (tabId === 'IdentityVerificationScreenOne') {
			if (!secureFeatures?.find(entity => entity.key === 'verify_candidate')) {
				navigate('IdentityVerificationScreenTwo',callback);
				return;
			}
			await IdentityVerificationScreenOne(tabContent3,callback);
		} else if (tabId === 'IdentityVerificationScreenTwo') {
			if (!secureFeatures?.find(entity => entity.key === 'verify_id')) {
				navigate('IdentityVerificationScreenThree');
				return;
			}
			await IdentityVerificationScreenTwo(tabContent4);
		} else if (tabId === 'IdentityVerificationScreenThree') {
			if (!secureFeatures?.find(entity => entity.key === 'record_audio')) {
				navigate('IdentityVerificationScreenFour');
				return;
			}
			await IdentityVerificationScreenThree(tabContent5);
		} else if (tabId === 'IdentityVerificationScreenFour') {
			if (!secureFeatures?.find(entity => entity.key === 'record_room')) {
				navigate('IdentityVerificationScreenFive');
				return;
			}
			await IdentityVerificationScreenFour(tabContent6);
		} else if (tabId === 'IdentityVerificationScreenFive') {
			if (!secureFeatures?.find(entity => entity.key === 'record_screen')) {
				closeModal(callback);
				return;
			}
			
			await IdentityVerificationScreenFive(tabContent7,callback);
		} else {
			closeModal(callback);
			return;
		}
	} catch (e) {
		console.error('error in showTab', e);
	}
};

const startSession = async (session) => {
	const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
	console.log('candidateInviteAssessmentSection',candidateInviteAssessmentSection,'session',session);

	try {
		const resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);
		if (resp?.data) {
			updatePersistData('session', { sessionId: resp?.data?.session_id, id: resp?.data?.id });
			registerEvent({ eventType: 'success', notify: false, eventName: 'session_initiated' });
		}
		// const candidateAssessmentResp = await changeCandidateAssessmentStatus({ id: candidateInviteAssessmentSection?.candidate_assessment?.assessment?.id, status: 'Attending' });

		// const candidateInviteAssessmentSectionResp = await changeCandidateInviteAssessmentSectionStatus({ id: candidateInviteAssessmentSection.id, status: 'Initiated' });

		// console.log(resp, candidateAssessmentResp, candidateInviteAssessmentSectionResp);
		updatePersistData('session',
			{
				id: resp.data.id,
				sessionStatus: 'Initiated'
			});
	} catch (e) {
		console.log('error', e);
	}
};

export const updateTranslations = () => {
	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const key = element.getAttribute('data-i18n');
		element.textContent = i18next.t(key);
	});
	console.log('Translations updated'); // Debugging log
};

i18next.init({
	lng: 'en',
	resources: {
		en: {
			translation: require('../assets/locales/en/translation.json')
		},
       
		fr: {
			translation: require('../assets/locales/fr/translation.json')
		},
       
	}
}, (err) => {
	if (err) return console.error(err);
	updateTranslations();
});


document.addEventListener('DOMContentLoaded', () => {
	updateTranslations();
});

export { openModal, closeModal, modalContent, showTab };
