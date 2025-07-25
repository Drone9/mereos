import i18next from 'i18next';
import { addSectionSessionRecord, cleanupZendeskWidget, convertDataIntoParse, getAuthenticationToken, getSecureFeatures, handlePreChecksRedirection, initializeI18next, loadZendeskWidget, logger, normalizeLanguage, registerEvent, showToast, updatePersistData, updateThemeColor } from '../utils/functions';
import { examPreprationCss,identityCardCss,identityStepsCss,IdentityVerificationScreenFiveCss,IdentityVerificationScreenFourCss,IdentityVerificationScreenOneCss,IdentityVerificationScreenThreeCss,IdentityVerificationScreenTwoCss,  MobileProctoringCss,  modalCss, preValidationCss, spinner, startRecordingCSS, systemDiagnosticCss, systemRequirementCss } from '../utils/styles';
import 'notyf/notyf.min.css';
import 'notyf/notyf.min.css';
import { ASSET_URL, SYSTEM_REQUIREMENT_STEP, examPreparationSteps, languages, systemDiagnosticSteps, preChecksSteps } from '../utils/constant';
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
import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';
import { SystemRequirement } from '../SystemRequirement';
import { stop_prechecks } from '../..';
import interact from 'interactjs';

export const initShadowDOM = () => {
	if (!document.getElementById('mereos-library')) {
		const libraryDOM = document.createElement('div');
		libraryDOM.className = 'mereos-library';
		libraryDOM.id = 'mereos-library';

		window.mereos.shadowRoot = libraryDOM.attachShadow({ mode: 'closed' });

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
			${systemRequirementCss}
			${startRecordingCSS}`;

		window.mereos.shadowRoot.appendChild(mainStylying);

		const modal = document.createElement('div');
		modal.className = 'modal';
		modal.id = 'precheck-modal';

		const modalContent = document.createElement('div');
		modalContent.className = 'modal-content';

		const tabsContainer = document.createElement('div');
		tabsContainer.className = 'tabs-container';

		const tabContentsWrapper = document.createElement('div');
		tabContentsWrapper.className = 'tab-contents-wrapper';

		const tabConfigs = [
			'ExamPreparation',
			'IdentityCardRequirement',
			'runSystemDiagnostics',
			'SystemRequirements',
			'IdentityVerificationScreenOne',
			'IdentityVerificationScreenTwo',
			'IdentityVerificationScreenThree',
			'IdentityVerificationScreenFour',
			'IdentityVerificationScreenFive',
			'Prevalidationinstruction',
			'MobileProctoring'
		];

		tabConfigs.forEach(tabId => {
			const tabContent = document.createElement('div');
			tabContent.className = 'tab-content';
			tabContent.id = tabId;
			tabContentsWrapper.appendChild(tabContent);
		});

		modalContent.appendChild(tabsContainer);
		modalContent.appendChild(tabContentsWrapper);
		modal.appendChild(modalContent);
		window.mereos.shadowRoot.appendChild(modal);

		window.mereos = window.mereos || {};
		window.mereos.dom = {
			libraryDOM,
			modal,
			containers: {
				ExamPreparation: window.mereos.shadowRoot.querySelector('#ExamPreparation'),
				IdentityCardRequirement: window.mereos.shadowRoot.querySelector('#IdentityCardRequirement'),
				SystemDiagnostics: window.mereos.shadowRoot.querySelector('#runSystemDiagnostics'),
				SystemRequirement: window.mereos.shadowRoot.querySelector('#SystemRequirements'),
				IdentityVerificationScreenOne: window.mereos.shadowRoot.querySelector('#IdentityVerificationScreenOne'),
				IdentityVerificationScreenTwo: window.mereos.shadowRoot.querySelector('#IdentityVerificationScreenTwo'),
				IdentityVerificationScreenThree: window.mereos.shadowRoot.querySelector('#IdentityVerificationScreenThree'),
				IdentityVerificationScreenFour: window.mereos.shadowRoot.querySelector('#IdentityVerificationScreenFour'),
				IdentityVerificationScreenFive: window.mereos.shadowRoot.querySelector('#IdentityVerificationScreenFive'),
				Prevalidationinstruction: window.mereos.shadowRoot.querySelector('#Prevalidationinstruction'),
				MobileProctoring: window.mereos.shadowRoot.querySelector('#MobileProctoring')
			}
		};

		document.body.appendChild(libraryDOM);
	}
};

const initializeLiveChat = () => {
	let unreadCount = 0;

	const isLoggedIn = !!getAuthenticationToken();
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const hasChatBot = secureFeatures?.some(entity => entity.key === 'live_chat');

	if (!isLoggedIn || !hasChatBot) return;

	const existingChatIcon = document.getElementById('chat-icon-wrapper');
	const existingChatContainer = document.getElementById('talkjs-container');
  
	if (existingChatIcon) {
		existingChatIcon.style.display = 'block';
		if (existingChatContainer) {
			existingChatContainer.style.display = 'none';
		}
		return;
	}

	document.body.insertAdjacentHTML('beforeend', `
    <div id="chat-icon-wrapper" class="chat-icon-wrapper" style="position: fixed; bottom: 20px; right: 20px; z-index: 999999999999999999999; cursor: grab; width: 50px; height: 50px; user-select: none;">
      <img id="chat-icon" class="chat-icon" src="${ASSET_URL}/mereos.svg" alt="Chat Icon" style="width: 100%; height: 100%;">
      <div id="notification-badge" class="notification-badge" style="position: absolute; top: -5px; right: -5px; background-color: #FF4136; border-radius: 50%; width: 12px; height: 12px; display: none; box-shadow: 0 0 0 2px white;"></div>
    </div>
  `);

	document.body.insertAdjacentHTML('beforeend', `
    <div id="talkjs-container" class="live-chat-container" style="width: 350px; height: 400px; position: fixed; bottom: 100px; right: 20px; z-index: 999999999999999999999; background-color: white; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); display: none;"></div>
  `);

	const chatIconWrapper = document.getElementById('chat-icon-wrapper');
	const notificationBadge = document.getElementById('notification-badge');
	const chatContainer = document.getElementById('talkjs-container');

	const positions = {
		icon: { x: 0, y: 0 },
		container: { x: 0, y: 0 }
	};

	interact(chatIconWrapper).draggable({
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
				chatIconWrapper.style.cursor = 'grabbing';
			},
			move(event) {
				positions.icon.x += event.dx;
				positions.icon.y += event.dy;
				positions.container.x += event.dx;
				positions.container.y += event.dy;

				chatIconWrapper.style.transform = `translate(${positions.icon.x}px, ${positions.icon.y}px)`;
				chatContainer.style.transform = `translate(${positions.container.x}px, ${positions.container.y}px)`;
			},
			end() {
				chatIconWrapper.style.cursor = 'grab';
			}
		}
	});

	interact(chatContainer).draggable({
		enabled: false
	});

	let clickStartTime = 0;
	let isDragging = false;

	chatIconWrapper.addEventListener('mousedown', (e) => {
		e.stopPropagation();
		clickStartTime = Date.now();
		isDragging = false;
	});

	chatIconWrapper.addEventListener('mousemove', () => {
		if (Date.now() - clickStartTime > 50) {
			isDragging = true;
		}
	});

	chatIconWrapper.addEventListener('click', (e) => {
		e.stopPropagation();
		if (!isDragging && Date.now() - clickStartTime < 200) {
			chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
      
			if (chatContainer.style.display === 'block') {
				notificationBadge.style.display = 'none';
				unreadCount = 0;
				updateNotificationBadge(0);
			}
		}
	});

	chatContainer.addEventListener('click', (e) => {
		e.stopPropagation();
	});

	document.addEventListener('click', (e) => {
		if (!chatIconWrapper.contains(e.target) && !chatContainer.contains(e.target)) {
			chatContainer.style.display = 'none';
		}
	});

	if (!existingChatContainer) {
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

			window.unreadConversation = conversation;      
      
			session.onMessage(event => {
				if (event.conversation && event.conversation.id === conversationId && 
            !event.isByMe &&
            chatContainer.style.display === 'none') {
					unreadCount++;
					updateNotificationBadge(unreadCount);
				}
			});
			
			const chatbox = session.createChatbox();
			chatbox.select(conversation);
			chatbox.mount(chatContainer);
		});
	}
  
	function updateNotificationBadge(count) {
		const badge = document.getElementById('notification-badge');
    
		if (count > 0) {
			badge.style.display = 'block';
		} else {
			badge.style.display = 'none';
		}
	}
};

const navigate = (newTabId) => {
	showTab(newTabId);
};

const createLanguageDropdown = () => {
	const modalContent = window.mereos.shadowRoot.querySelector('.modal-content');
	if(modalContent){
		const existingHeader = modalContent.querySelector('.header');
		if (existingHeader) {
			existingHeader.remove();
		}
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
			if (typeof window?.mereos?.globalCallback === 'function') {
				window.mereos.globalCallback({ 
					type:'success',
					message: 'language_changed',
					code:50005, 
					details:selectedLang.keyword 
				});
			}
			updatePersistData('schoolTheme', { language: selectedLang.keyword });
		});
	});
};

const openModal = async (callback) => {
	if(!window.mereos.dom){
		return;
	}
	if (!document.getElementById('mereos-library')) {
		initShadowDOM();
	}
	const { modal } = window.mereos.dom;

	if(modal){
		modal.style.display = 'block';
		modal.style.zIndex = '2147483647';
	}
	
	document.body.classList.add('modal-active');

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
	if(modal){
		modal.style.transform = 'translateZ(0)';
	}
};

function closeModal() {
	if(!window.mereos.dom){
		return;
	}
	const { modal } = window.mereos.dom;
	if (typeof window?.mereos?.globalCallback === 'function') {
		window.mereos.precheckCompleted = true;
		window.mereos.globalCallback({ type:'success',message: 'precheck_completed',code:50001 });
	}
	if(modal){
		modal.style.display = 'none';
	}

	if(!getAuthenticationToken()){
		cleanupZendeskWidget();
	}
}

const showTab = async (tabId, callback) => {
	try {
		if(!window.mereos.dom){
			return;
		}
		const { containers } = window.mereos.dom;
		console.log('tabId', tabId);
		initializeI18next();
		const getSecureFeature = getSecureFeatures();
		const secureFeatures = getSecureFeature?.entities || [];

		const featureMap = {
			'ExamPreparation': examPreparationSteps,
			'IdentityCardRequirement': 'verify_id',
			'runSystemDiagnostics': systemDiagnosticSteps,
			'SystemRequirements': SYSTEM_REQUIREMENT_STEP,
			'Prevalidationinstruction': 'verify_multiple_devices',
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

		const tabs = window.mereos.shadowRoot.querySelectorAll('.tab');
		const tabContents = window.mereos.shadowRoot.querySelectorAll('.tab-content');

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
			await ExamPreparation(containers.ExamPreparation);
		} else if (tabId === 'IdentityCardRequirement') {
			if (!isFeatureAllowed) {
				navigate('runSystemDiagnostics');
				return;
			}
			await IdentityCardRequirement(containers.IdentityCardRequirement);
		} else if (tabId === 'runSystemDiagnostics') {
			if (!isFeatureAllowed) {
				navigate('SystemRequirements');
				return;
			}
			SystemDiagnostics(containers.SystemDiagnostics);
		} else if (tabId === 'SystemRequirements') {
			if (!isFeatureAllowed) {
				navigate('Prevalidationinstruction');
				return;
			}
			await SystemRequirement(containers.SystemRequirement);
		} else if (tabId === 'Prevalidationinstruction') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenOne');
				return;
			}
			await PrevalidationInstructions(containers.Prevalidationinstruction);
		} else if (tabId === 'IdentityVerificationScreenOne') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenTwo', callback);
				return;
			}
			await IdentityVerificationScreenOne(containers.IdentityVerificationScreenOne, callback);
		} else if (tabId === 'IdentityVerificationScreenTwo') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenThree');
				return;
			}
			await IdentityVerificationScreenTwo(containers.IdentityVerificationScreenTwo);
		} else if (tabId === 'IdentityVerificationScreenThree') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenFour');
				return;
			}
			await IdentityVerificationScreenThree(containers.IdentityVerificationScreenThree);
		} else if (tabId === 'IdentityVerificationScreenFour') {
			if (!isFeatureAllowed) {
				navigate('MobileProctoring');
				return;
			}
			await IdentityVerificationScreenFour(containers.IdentityVerificationScreenFour);
		} else if (tabId === 'MobileProctoring') {
			if (!isFeatureAllowed) {
				navigate('IdentityVerificationScreenFive');
				return;
			}
			await MobileProctoring(containers.MobileProctoring);
		} else if (tabId === 'IdentityVerificationScreenFive') {
			if (!isFeatureAllowed) {
				closeModal(callback);
				return;
			}
			await IdentityVerificationScreenFive(containers.IdentityVerificationScreenFive, callback);
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
				window.mereos.globalCallback({
					type: 'error',
					code: 40023,
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

export { openModal, closeModal, showTab };
