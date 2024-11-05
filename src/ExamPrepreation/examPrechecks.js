import i18next from 'i18next';
import '../assets/css/modal.css';
import { runSystemDiagnostics } from './systemdiagnostic';
import { IdentityVerificationScreenOne } from './identityVerificationScreenOne';
import { IdentityVerificationScreenTwo } from './identityVerificationScreenTwo';
import { IdentityVerificationScreenThree } from './identityVerificationScreenThree';
import { IdentityVerificationScreenFour } from './identityVerificationScreenFour';
import { IdentityVerificationScreenFive } from './IdentityVerificationScreenFive';
import { ExamPreparation } from './examPreprationScreen';
import { addSectionSessionRecord, convertDataIntoParse, getSecureFeatures, handlePreChecksRedirection, registerEvent, updatePersistData, updateThemeColor } from '../utils/functions';
import { PrevalidationInstructions } from './PrevalidationInstructions';
import { languages, preChecksSteps, prevalidationSteps, systemDiagnosticSteps } from '../utils/constant';
import { MobileProctoring } from './mobileProctoring';
import dropDownIcon from '../assets/images/dropdown-btn.svg';

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

const navigate = (newTabId) => {
	showTab(newTabId);
};

const openModal = (callback) => {
	document.body.appendChild(modal);
	modal.style.display = 'block';

	const activeTab = handlePreChecksRedirection(callback);
	const preChecksStep = JSON.parse(localStorage.getItem('preChecksSteps'));

	if (preChecksStep === null) {
		localStorage.setItem('preChecksSteps', JSON.stringify(preChecksSteps));
	}
	// if (schoolTheme === null) {
	// 	localStorage.setItem('schoolTheme', JSON.stringify(defaultTheme));
	// }

	showTab(activeTab, callback);
	const session = convertDataIntoParse('session');
	startSession(session);

	const modalHeader = document.createElement('div');
	modalHeader.className = 'header';

	const languageContainer = document.createElement('section');
	languageContainer.className = 'dropdown';

	const defaultLanguage = schoolTheme?.language || 'en';
	let selectedLanguage = languages.find(lang => lang.keyword === defaultLanguage);

	const selectContainer = document.createElement('div');
	selectContainer.className = 'select';
	selectContainer.onclick = () => languageDropdown.classList.toggle('active');

	const flagImg = document.createElement('img');
	flagImg.src = selectedLanguage.src;
	flagImg.alt = selectedLanguage.alt;
	selectContainer.appendChild(flagImg);

	const label = document.createElement('label');
	label.className = 'language';
	label.textContent = i18next.t(selectedLanguage.value);
	selectContainer.appendChild(label);

	const dropdownIcon = document.createElement('img');
	dropdownIcon.src = dropDownIcon;
	selectContainer.appendChild(dropdownIcon);

	languageContainer.appendChild(selectContainer);

	const languageDropdown = document.createElement('section');
	languageDropdown.className = 'dropdown-content';

	languages.forEach((lang, index) => {
		const optionDiv = document.createElement('div');
		optionDiv.key = index;
		optionDiv.className = `dropdown-option ${lang.keyword === selectedLanguage.keyword ? 'selected' : ''}`;
		optionDiv.onclick = () => onTrigger(lang);

		const optionFlag = document.createElement('img');
		optionFlag.src = lang.src;
		optionFlag.alt = lang.alt;
		optionDiv.appendChild(optionFlag);

		const optionText = document.createElement('div');
		optionText.className = 'text';
		optionText.textContent = i18next.t(lang.value);
		optionDiv.appendChild(optionText);

		languageDropdown.appendChild(optionDiv);
	});

	languageContainer.appendChild(languageDropdown);
	modalHeader.appendChild(languageContainer);
	modalContent.insertBefore(modalHeader, modalContent.firstChild);

	function onTrigger(selectedLang) {
		selectedLanguage = selectedLang;
	
		i18next.changeLanguage(selectedLang.keyword)
			.then(() => {
				flagImg.src = selectedLang.src;
				label.textContent = i18next.t(selectedLang.value);
	
				languages.forEach(lang => {
					const optionDiv = Array.from(languageDropdown.children).find(
						option => option.textContent.trim() === i18next.t(lang.value)
					);
					if (optionDiv) {
						const optionText = optionDiv.querySelector('.text');
						optionText.textContent = i18next.t(lang.value);
					}
				});
			})
			.catch(err => console.error(err));
	
		languageDropdown.classList.remove('active');
		updatePersistData('schoolTheme', { language: selectedLang.keyword });
	}
	
};

export const setLanguage = (lang) => {
	i18next.changeLanguage(lang, (err) => {
		if (err) return console.error(err);
		updateTranslations();
	});
};

function closeModal() {
	if (typeof window.globalCallback === 'function' && localStorage.getItem('mereosToken')) {
		window.globalCallback({ message: 'precheck_completed' });
	}

	if(window.sharedMediaStream){
		window.sharedMediaStream?.getTracks()?.forEach(track => track.stop());
	}
	
	modal.style.display = 'none';
	modal.remove();
}

const showTab = async (tabId, callback) => {
	try {
		console.log('tabId',tabId);

		updateThemeColor();
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
	const activeTab = handlePreChecksRedirection(window.globalCallback);
	showTab(activeTab,window.globalCallback);
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

function checkToken() {
	if (!localStorage.getItem('mereosToken')) {
		closeModal();
	}
}

checkToken();

const checkInterval = 2000;
setInterval(checkToken, checkInterval);

export { openModal, closeModal, modalContent, showTab };
