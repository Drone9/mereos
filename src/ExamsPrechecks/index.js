import i18next from 'i18next';
import '../assets/css/modal.css';
import { addSectionSessionRecord, cleanupZendeskWidget, convertDataIntoParse, getAuthenticationToken, getSecureFeatures, handlePreChecksRedirection, initializeI18next, loadZendeskWidget, logger, normalizeLanguage, registerEvent, showToast, updatePersistData, updateThemeColor } from '../utils/functions';
import { ASSET_URL,examPreparationSteps,examPreprationCss,identityCardCss,identityStepsCss,IdentityVerificationScreenFiveCss,IdentityVerificationScreenFourCss,IdentityVerificationScreenOneCss,IdentityVerificationScreenThreeCss,IdentityVerificationScreenTwoCss,languages,  MobileProctoringCss,  modalCss,  preChecksSteps, preValidationCss, prevalidationSteps, spinner, SYSTEM_REQUIREMENT_STEP, systemDiagnosticCss, systemDiagnosticSteps, systemRequirementCss } from '../utils/constant';
import 'notyf/notyf.min.css';
import 'notyf/notyf.min.css';
import { IdentityCardRequirement } from '../IdentityCardRequirement';
import { SystemDiagnostics } from '../SystemDiagnostic';
import { IdentityVerificationScreenOne } from '../IdentityVerificationScreenOne';
import { IdentityVerificationScreenTwo } from '../IdentityVerificationScreenTwo';
import { IdentityVerificationScreenThree } from '../IdentityVerificationScreenThree';
import { MobileProctoring } from '../MobileProctoring';
import { IdentityVerificationScreenFive } from '../IdentityVerificationScreenFive';
import { IdentityVerificationScreenFour } from '../IdentityVerificationScreenFour';
import { PrevalidationInstructions } from '../PrevalidationInstructions';
import { ExamPreparation } from '../ExamPreparation';
import Talk from 'talkjs';
import interact from 'interactjs';
import '../assets/css/modal.css';
import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';
import { SystemRequirement } from '../SystemRequirement';
import { stop_prechecks } from '../..';

const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'precheck-modal';

export const shadowRoot = modal.attachShadow({ mode: 'open' });
const mainStylying = document.createElement('style');
mainStylying.textContent = `
	${spinner}
	${examPreprationCss} 
	${modalCss} 
	${systemDiagnosticCss} 
	${preValidationCss} 
	${IdentityVerificationScreenOneCss} 
	${identityStepsCss} 
	${IdentityVerificationScreenTwoCss} 
	${IdentityVerificationScreenThreeCss} 
	${IdentityVerificationScreenFourCss} 
	${IdentityVerificationScreenFiveCss} 
	${MobileProctoringCss}
	${identityCardCss}
	${systemRequirementCss}`;

shadowRoot.appendChild(mainStylying);

shadowRoot.innerHTML += `
  <div class="modal-content">
    <div class="tabs-container"></div>
    <div class="tab-contents-wrapper">
      <div class="tab-content" id="ExamPreparation"></div>
      <div class="tab-content" id="IdentityCardRequirement"></div>
      <div class="tab-content" id="runSystemDiagnostics"></div>
      <div class="tab-content" id="SystemRequirements"></div>
      <div class="tab-content" id="IdentityVerificationScreenOne"></div>
      <div class="tab-content" id="IdentityVerificationScreenTwo"></div>
      <div class="tab-content" id="IdentityVerificationScreenThree"></div>
      <div class="tab-content" id="IdentityVerificationScreenFour"></div>
      <div class="tab-content" id="IdentityVerificationScreenFive"></div>
      <div class="tab-content" id="Prevalidationinstruction"></div>
      <div class="tab-content" id="MobileProctoring"></div>
    </div>
  </div>
`;

const modalContent = shadowRoot.querySelector('.modal-content');

const ExamPreparationContainer = shadowRoot.querySelector('#ExamPreparation');
const IdentityCardRequirementContainer = shadowRoot.querySelector('#IdentityCardRequirement');
const SystemDiagnosticsContainer = shadowRoot.querySelector('#runSystemDiagnostics');
const SystemRequirementContainer = shadowRoot.querySelector('#SystemRequirements');
const IdentityVerificationScreenOneContainer = shadowRoot.querySelector('#IdentityVerificationScreenOne');
const IdentityVerificationScreenTwoConatiner = shadowRoot.querySelector('#IdentityVerificationScreenTwo');
const IdentityVerificationScreenThreeContainer = shadowRoot.querySelector('#IdentityVerificationScreenThree');
const IdentityVerificationScreenFourContainer = shadowRoot.querySelector('#IdentityVerificationScreenFour');
const IdentityVerificationScreenFiveContainer = shadowRoot.querySelector('#IdentityVerificationScreenFive');
const PrevalidationinstructionContainer = shadowRoot.querySelector('#Prevalidationinstruction');
const mobileProctingContainer = shadowRoot.querySelector('#MobileProctoring');

const initializeLiveChat = () => {
	const isLoggedIn = !!getAuthenticationToken();
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const hasChatBot = secureFeatures?.some(entity => entity.key === 'live_chat');

	if (!isLoggedIn || !hasChatBot) return;

	const existingChatIcon = document.getElementById('chat-icon');
	const existingChatContainer = document.getElementById('talkjs-container');
	
	if (existingChatIcon) {
		existingChatIcon.style.display = 'block';
		if (existingChatContainer) {
			existingChatContainer.style.display = 'block';
		}
		return;
	}

	const chatIcon = document.createElement('img');
	chatIcon.className = 'chat-icon';
	chatIcon.id = 'chat-icon';
	chatIcon.style.position = 'fixed';
	chatIcon.style.bottom = '20px';
	chatIcon.style.right = '20px';
	chatIcon.style.zIndex = '99999999';
	chatIcon.style.cursor = 'grab';
	chatIcon.src = `${ASSET_URL}/mereos.svg`;
	chatIcon.alt = 'Chat Icon';
	chatIcon.style.width = '50px';
	chatIcon.style.height = '50px';
	chatIcon.style.userSelect = 'none';

	const chatContainer = document.createElement('div');
	chatContainer.id = 'talkjs-container';
	chatContainer.className = 'live-chat-container';
	chatContainer.style.width = '400px';
	chatContainer.style.height = '500px';
	chatContainer.style.position = 'fixed';
	chatContainer.style.bottom = '100px';
	chatContainer.style.right = '20px';
	chatContainer.style.zIndex = '9999';
	chatContainer.style.backgroundColor = 'white';
	chatContainer.style.border = '1px solid #ccc';
	chatContainer.style.borderRadius = '8px';
	chatContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
	chatContainer.style.display = 'none';

	document.body.appendChild(chatIcon);
	document.body.appendChild(chatContainer);

	const positions = {
		icon: { x: 0, y: 0 },
		container: { x: 0, y: 0 }
	};

	interact(chatIcon).draggable({
		cursorChecker: () => 'grabbing',
		modifiers: [
			interact.modifiers.restrict({
				restriction: 'parent',
				endOnly: false,
				elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
			})
		],
		listeners: {
			start() {
				chatIcon.style.cursor = 'grabbing';
			},
			move(event) {
				positions.icon.x += event.dx;
				positions.icon.y += event.dy;
				positions.container.x += event.dx;
				positions.container.y += event.dy;

				chatIcon.style.transform = `translate(${positions.icon.x}px, ${positions.icon.y}px)`;
				chatContainer.style.transform = `translate(${positions.container.x}px, ${positions.container.y}px)`;
			},
			end() {
				chatIcon.style.cursor = 'grab';
			}
		}
	});

	interact(chatContainer).draggable({
		enabled: false
	});

	let clickStartTime = 0;
	chatIcon.addEventListener('mousedown', (e) => {
		e.stopPropagation();
		clickStartTime = Date.now();
	});

	chatIcon.addEventListener('click', (e) => {
		e.stopPropagation();
		if (Date.now() - clickStartTime < 200) {
			chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
		}
	});

	chatContainer.addEventListener('click', (e) => {
		e.stopPropagation();
	});

	document.addEventListener('click', (e) => {
		if (!chatIcon.contains(e.target) && !chatContainer.contains(e.target)) {
			chatContainer.style.display = 'none';
		}
	});

	Talk.ready.then(() => {
		const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');

		const me = new Talk.User({
			id: candidateInviteAssessmentSection?.candidate?.id,
			name: candidateInviteAssessmentSection?.candidate?.name,
			email: candidateInviteAssessmentSection?.candidate?.email,
			photoUrl: candidateInviteAssessmentSection?.candidate?.photo || `${ASSET_URL}/profile-draft-circled-orange.svg`,
		});

		const session = new Talk.Session({
			appId: 'tl1lE0Vo',
			me: me,
		});

		const other = new Talk.User({
			id: candidateInviteAssessmentSection?.school?.id,
			name: candidateInviteAssessmentSection?.school?.name,
			email: candidateInviteAssessmentSection?.school?.email,
			photoUrl: `${ASSET_URL}/profile-draft-circled-orange.svg`,
		});

		const conversationId = localStorage.getItem('conversationId');
		const conversation = session.getOrCreateConversation(conversationId);
		conversation.setParticipant(me);
		conversation.setParticipant(other);

		const chatbox = session.createChatbox();
		chatbox.select(conversation);
		chatbox.mount(chatContainer);
	});
};

const navigate = (newTabId) => {
	showTab(newTabId);
};

const createLanguageDropdown = () => {
	const existingHeader = modalContent.querySelector('.header');
	if (existingHeader) {
		existingHeader.remove();
	}

	const schoolTheme = localStorage.getItem('schoolTheme') !== undefined ? JSON.parse(localStorage.getItem('schoolTheme')) : {};
	const defaultLanguage = schoolTheme?.language || 'en';
	const filterLanguage = normalizeLanguage(defaultLanguage);
	let selectedLanguage = languages.find(lang => lang.keyword === filterLanguage.trim());

	const headerHTML = `
    <div class="header">
      <section class="dropdown">
        <div class="select">
          <img src="${selectedLanguage.src}" alt="${selectedLanguage.alt}" class="flag-icon-img">
          <label class="language">${i18next.t(selectedLanguage.value)}</label>
          <img src="${ASSET_URL}/dropdown-btn.svg">
        </div>
        <section class="dropdown-content">
          ${languages.map((lang, index) => `
            <div data-index="${index}" class="dropdown-option ${lang.keyword === selectedLanguage.keyword ? 'selected' : ''}">
              <img src="${lang.src}" alt="${lang.alt}" class="flag-icon-img">
              <div class="text" id="dropdown-text-language">${i18next.t(lang.value)}</div>
            </div>
          `).join('')}
        </section>
      </section>
    </div>
  `;

	modalContent.insertAdjacentHTML('afterbegin', headerHTML);

	const selectContainer = modalContent.querySelector('.select');
	const languageDropdown = modalContent.querySelector('.dropdown-content');
	const flagImg = modalContent.querySelector('.select .flag-icon-img');
	const label = modalContent.querySelector('.language');
  
	selectContainer.addEventListener('click', () => {
		languageDropdown.classList.toggle('active');
	});

	const optionDivs = languageDropdown.querySelectorAll('.dropdown-option');
	optionDivs.forEach(optionDiv => {
		optionDiv.addEventListener('click', function() {
			const index = parseInt(this.getAttribute('data-index'));
			const selectedLang = languages[index];
      
			i18next.changeLanguage(selectedLang.keyword)
				.then(() => {
					flagImg.src = selectedLang.src;
					label.textContent = i18next.t(selectedLang.value);
          
					optionDivs.forEach((div, i) => {
						const optionText = div.querySelector('.text');
						optionText.textContent = i18next.t(languages[i].value);
					});
				})
				.catch(err => logger.error(err));
      
			languageDropdown.classList.remove('active');
			updatePersistData('schoolTheme', { language: selectedLang.keyword });
		});
	});
};

const openModal = async (callback) => {
	document.body.appendChild(modal);
	modal.style.display = 'block';
	const existingHeader = document.querySelector('.header');
	if (existingHeader) {
		existingHeader.remove();
	}	
	const activeTab = handlePreChecksRedirection(callback);
	const preChecksStep = JSON.parse(localStorage.getItem('preChecksSteps'));

	if (preChecksStep === null) {
		localStorage.setItem('preChecksSteps', JSON.stringify(preChecksSteps));
	}
	showTab(activeTab, callback);
	createLanguageDropdown();
};


function closeModal() {
	if (typeof window.globalCallback === 'function') {
		window.globalCallback({ type:'success',message: 'precheck_completed',code:50001 });
		window.precheckCompleted = true;
	}

	modal.style.display = 'block';
	modal.remove();

	if(!getAuthenticationToken()){
		cleanupZendeskWidget();
	}
}

const showTab = async (tabId, callback) => {
	try {
		initializeI18next();
		const getSecureFeature = getSecureFeatures();
		const secureFeatures = getSecureFeature?.entities || [];

		const featureMap = {
			'IdentityCardRequirement':'verify_id',
			'ExamPreparation': examPreparationSteps,
			'runSystemDiagnostics': systemDiagnosticSteps,
			'SystemRequirements': SYSTEM_REQUIREMENT_STEP,
			'Prevalidationinstruction': prevalidationSteps,
			'IdentityVerificationScreenOne': 'verify_candidate',
			'IdentityVerificationScreenTwo': 'verify_id',
			'IdentityVerificationScreenThree': 'record_audio',
			'IdentityVerificationScreenFour': 'record_room',
			'MobileProctoring': 'mobile_proctoring',
			'IdentityVerificationScreenFive': 'record_screen',
		};

		const featureKey = featureMap[tabId];
		const isFeatureAllowed = Array.isArray(featureKey)
			? secureFeatures.some(entity => featureKey.includes(entity.key))
			: secureFeatures.some(entity => entity.key === featureKey);

		if (isFeatureAllowed || !featureKey) {
			let navHistory = JSON.parse(localStorage.getItem('navHistory')) || [];
    
			let filterNav = navHistory.filter(item => item !== 'IdentityVerificationScreenSix');
    
			if (!filterNav.includes(tabId)) {
				filterNav.push(tabId);
			}
    
			localStorage.setItem('navHistory', JSON.stringify(filterNav));
		}

		initializeLiveChat();
		loadZendeskWidget();
		updateThemeColor();

		const tabs = shadowRoot.querySelectorAll('.tab');
		const tabContents = shadowRoot.querySelectorAll('.tab-content');

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

		if (tabId === 'ExamPreparation') {
			if (!isFeatureAllowed) {
				navigate('IdentityCardRequirement');
				return;
			}
			await ExamPreparation(ExamPreparationContainer);
		} else if (tabId === 'IdentityCardRequirement') {
			if (!isFeatureAllowed) {
				navigate('runSystemDiagnostics');
				return;
			}
			await IdentityCardRequirement(IdentityCardRequirementContainer);
		} else if (tabId === 'runSystemDiagnostics') {
			if (!isFeatureAllowed) {
				navigate('Prevalidationinstruction');
				return;
			}
			SystemDiagnostics(SystemDiagnosticsContainer);
		}  else if (tabId === 'SystemRequirements') {
			if (!isFeatureAllowed) {
				navigate('Prevalidationinstruction');
				return;
			}
			await SystemRequirement(SystemRequirementContainer);
		} else if (tabId === 'Prevalidationinstruction') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenOne');
				return;
			}
			await PrevalidationInstructions(PrevalidationinstructionContainer);
		} else if (tabId === 'IdentityVerificationScreenOne') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenTwo', callback);
				return;
			}
			await IdentityVerificationScreenOne(IdentityVerificationScreenOneContainer, callback);
		} else if (tabId === 'IdentityVerificationScreenTwo') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenThree');
				return;
			}
			await IdentityVerificationScreenTwo(IdentityVerificationScreenTwoConatiner);
		} else if (tabId === 'IdentityVerificationScreenThree') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenFour');
				return;
			}
			await IdentityVerificationScreenThree(IdentityVerificationScreenThreeContainer);
		} else if (tabId === 'IdentityVerificationScreenFour') {
			if (!isFeatureAllowed) {
				navigate('MobileProctoring');
				return;
			}
			await IdentityVerificationScreenFour(IdentityVerificationScreenFourContainer);
		} else if (tabId === 'MobileProctoring') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenFive');
				return;
			}
			await MobileProctoring(mobileProctingContainer);
		} else if (tabId === 'IdentityVerificationScreenFive') {
			if (!isFeatureAllowed) {
				closeModal(callback);
				return;
			}
			await IdentityVerificationScreenFive(IdentityVerificationScreenFiveContainer, callback);
		} else {
			closeModal(callback);
			return;
		}
	} catch (e) {
		logger.error('error in showTab', e);
	}
};

export const startSession = async () => {
	const session = convertDataIntoParse('session');
	const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
	try {
		const resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);
		if (resp?.data) {
			updatePersistData('session', { sessionId: resp?.data?.session_id, id: resp?.data?.id });
			if(!session?.browserEvents.filter(item => item.name === 'session_initiated')?.length){
				registerEvent({ eventType: 'success', notify: false, eventName: 'session_initiated' });
			}
		}
		updatePersistData('session',
			{
				id: resp.data.id,
				sessionStatus: 'Attending'
			});
			
		await changeCandidateAssessmentStatus({
			status: 'Attending',
			id:session?.candidate_assessment
		});

	} catch (e) {
		const callBackFunc = () => {
			if(e.response?.data?.detail === 'Token not found'){
				window.globalCallback({
					type: 'error',
					code: 40025,
					message: 'token_expired_login_again_to_perform_this_action',
				});
			}
		};
		stop_prechecks(callBackFunc);
		showToast('error',e.response?.data?.detail);
		logger.error('Error in start Session', e.response?.data?.detail);
	}
};

let isModalClosed = false;

window.addEventListener('storage', (event) => {
	if (event.key === 'mereosToken' && event.newValue === null && !isModalClosed) {
		closeModalOnce();
	}
});

function checkToken() {
	if (!getAuthenticationToken() && !isModalClosed) {
		closeModalOnce();
	}
}

function closeModalOnce() {
	isModalClosed = true;
	closeModal();
}

window.onload = checkToken; 

const checkInterval = 2000;
setInterval(() => {
	checkToken();
}, checkInterval);

export { openModal, closeModal, modalContent, showTab };
