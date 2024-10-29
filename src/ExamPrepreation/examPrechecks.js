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
import { preChecksSteps, prevalidationSteps, systemDiagnosticSteps } from '../utils/constant';
import { MobileProctoring } from './mobileProctoring';
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

const ExamPreparationContainer = document.createElement('div');
ExamPreparationContainer.className = 'tab-content';
ExamPreparationContainer.id = 'ExamPreparation';

const SystemDiagnosticsContainer = document.createElement('div');
SystemDiagnosticsContainer.className = 'tab-content';
SystemDiagnosticsContainer.id = 'runSystemDiagnostics';

const IdentityVerificationScreenOneContainer = document.createElement('div');
IdentityVerificationScreenOneContainer.className = 'tab-content';
IdentityVerificationScreenOneContainer.id = 'IdentityVerificationScreenOne';

const IdentityVerificationScreenTwoConatiner = document.createElement('div');
IdentityVerificationScreenTwoConatiner.className = 'tab-content';
IdentityVerificationScreenTwoConatiner.id = 'IdentityVerificationScreenTwo';

const IdentityVerificationScreenThreeContainer = document.createElement('div');
IdentityVerificationScreenThreeContainer.className = 'tab-content';
IdentityVerificationScreenThreeContainer.id = 'IdentityVerificationScreenThree';

const IdentityVerificationScreenFourContainer = document.createElement('div');
IdentityVerificationScreenFourContainer.className = 'tab-content';
IdentityVerificationScreenFourContainer.id = 'IdentityVerificationScreenFour';

const IdentityVerificationScreenFiveContainer = document.createElement('div');
IdentityVerificationScreenFiveContainer.className = 'tab-content';
IdentityVerificationScreenFiveContainer.id = 'IdentityVerificationScreenFive';

const PrevalidationinstructionContainer = document.createElement('div');
PrevalidationinstructionContainer.className = 'tab-content';
PrevalidationinstructionContainer.id = 'Prevalidationinstruction';

const identitySteps = document.createElement('div');
identitySteps.className = 'steps-container';
identitySteps.id = 'modal-steps-container';

const mobileProctingConatiner = document.createElement('div');
identitySteps.className = 'mobile-procting-conatiner';
identitySteps.id = 'mobileProctingConatiner';

tabContentsWrapper.appendChild(identitySteps);
tabContentsWrapper.appendChild(ExamPreparationContainer);
tabContentsWrapper.appendChild(SystemDiagnosticsContainer);
tabContentsWrapper.appendChild(IdentityVerificationScreenOneContainer);
tabContentsWrapper.appendChild(IdentityVerificationScreenTwoConatiner);
tabContentsWrapper.appendChild(IdentityVerificationScreenThreeContainer);
tabContentsWrapper.appendChild(IdentityVerificationScreenFourContainer);
tabContentsWrapper.appendChild(IdentityVerificationScreenFiveContainer);
tabContentsWrapper.appendChild(PrevalidationinstructionContainer);
tabContentsWrapper.appendChild(mobileProctingConatiner);

modalContent.appendChild(tabContentsWrapper);
const schoolTheme = JSON.parse(localStorage.getItem('schoolTheme'));

if(schoolTheme){
	document.documentElement.style.setProperty('--theme-color', schoolTheme?.theming);
}

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
	];

	languages.forEach(lang => {
		const option = document.createElement('option');
		option.value = lang.keyword;
		option.textContent = lang.name;
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
	if (typeof window.globalCallback === 'function') {
		window.globalCallback({ message: 'precheck_completed' });
	}

	modal.style.display = 'none';
	modal.remove();
}

const showTab = async (tabId, callback) => {
	try {
		console.log('tabId',tabId);
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

		if (tabId === 'ExamPreparation') {
			if (!secureFeatures?.find(entity => entity.key === 'exam_perparation')) {
				navigate('runSystemDiagnostics');
				return;
			}
			await ExamPreparation(ExamPreparationContainer);
		} else if (tabId === 'runSystemDiagnostics') {
			if (!secureFeatures?.filter(entity => systemDiagnosticSteps.includes(entity.key))?.length) {
				navigate('Prevalidationinstruction');
				return;
			}
			runSystemDiagnostics(SystemDiagnosticsContainer);
		} else if (tabId === 'Prevalidationinstruction') {
			if (!secureFeatures.filter(entity => prevalidationSteps.includes(entity.key))?.length) {
				navigate('IdentityVerificationScreenOne');
				return;
			}
			await PrevalidationInstructions(PrevalidationinstructionContainer);
		} else if (tabId === 'IdentityVerificationScreenOne') {
			if (!secureFeatures?.find(entity => entity.key === 'verify_candidate')) {
				navigate('IdentityVerificationScreenTwo',callback);
				return;
			}
			await IdentityVerificationScreenOne(IdentityVerificationScreenOneContainer,callback);
		} else if (tabId === 'IdentityVerificationScreenTwo') {
			if (!secureFeatures?.find(entity => entity.key === 'verify_id')) {
				navigate('IdentityVerificationScreenThree');
				return;
			}
			await IdentityVerificationScreenTwo(IdentityVerificationScreenTwoConatiner);
		} else if (tabId === 'IdentityVerificationScreenThree') {
			if (!secureFeatures?.find(entity => entity.key === 'record_audio')) {
				navigate('IdentityVerificationScreenFour');
				return;
			}
			await IdentityVerificationScreenThree(IdentityVerificationScreenThreeContainer);
		} else if (tabId === 'IdentityVerificationScreenFour') {
			if (!secureFeatures?.find(entity => entity.key === 'record_room')) {
				navigate('IdentityVerificationScreenFive');
				return;
			}
			await IdentityVerificationScreenFour(IdentityVerificationScreenFourContainer);
		} else if (tabId === 'MobileProctoring') {
			if (!secureFeatures?.find(entity => entity.key === 'mobile_proctoring')) {
				navigate('IdentityVerificationScreenFive');
				return;
			}
			await MobileProctoring(mobileProctingConatiner);
		} else if (tabId === 'IdentityVerificationScreenFive') {
			if (!secureFeatures?.find(entity => entity.key === 'record_screen')) {
				closeModal(callback);
				return;
			}
			
			await IdentityVerificationScreenFive(IdentityVerificationScreenFiveContainer,callback);
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

	try {
		const resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);
		if (resp?.data) {
			updatePersistData('session', { sessionId: resp?.data?.session_id, id: resp?.data?.id });
			registerEvent({ eventType: 'success', notify: false, eventName: 'session_initiated' });
		}
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
	console.log('Translations updated');
};

i18next.init({
	lng: schoolTheme?.language.split('-')[0] || 'en',
	resources: {
		en: {
			translation: require('../assets/locales/en/translation.json')
		},
       
		fr: {
			translation: require('../assets/locales/fr/translation.json')
		},
		it: {
			translation: require('../assets/locales/it/translation.json')
		},
		pt: {
			translation: require('../assets/locales/pt/translation.json')
		},
		nl: {
			translation: require('../assets/locales/nl/translation.json')
		},
		es: {
			translation: require('../assets/locales/es/translation.json')
		},
		de: {
			translation: require('../assets/locales/de/translation.json')
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
