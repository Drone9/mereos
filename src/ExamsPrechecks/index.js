import i18next from 'i18next';
import { addSectionSessionRecord, cleanupZendeskWidget, convertDataIntoParse, getAuthenticationToken, getSecureFeatures, getVideoIdForStep, handlePreChecksRedirection, initializeI18next, loadNotyfJS, loadZendeskWidget, logger, normalizeLanguage, registerEvent, sentryExceptioMessage, setChatOpenState, showToast, updatePersistData, updateThemeColor } from '../utils/functions';
import { browserSecurityCss, examPreprationCss,identityCardCss,identityStepsCss,IdentityVerificationScreenFiveCss,IdentityVerificationScreenFourCss,IdentityVerificationScreenOneCss,IdentityVerificationScreenThreeCss,IdentityVerificationScreenTwoCss,  MobileProctoringCss,  modalCss, preValidationCss, spinner, startRecordingCSS, systemDiagnosticCss, systemRequirementCss } from '../utils/styles';
import 'notyf/notyf.min.css';
import 'notyf/notyf.min.css';
import { ASSET_URL, SYSTEM_REQUIREMENT_STEP, examPreparationSteps, languages, systemDiagnosticSteps, preChecksSteps, BROWSER_SECURTIY_STEP } from '../utils/constant';
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
import { BrowserSecurity } from '../BrowserSecurity';

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
			${startRecordingCSS}
			${browserSecurityCss}`;

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
			'MobileProctoring',
			'BrowserSecurity'
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
				BrowserSecurity: window.mereos.shadowRoot.querySelector('#BrowserSecurity'),
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


export const initializeLiveChat = () => {
	let unreadCount = 0;
	let chatContainer = null;
	let isChatOpen = false; // Track chat open state

	const isLoggedIn = !!getAuthenticationToken();
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];
	const hasChatBot = secureFeatures?.some(entity => entity.key === 'live_chat');

	if (!isLoggedIn || !hasChatBot) return;

	const existingChatIcon = document.getElementById('chat-icon-wrapper');
	const existingChatContainer = document.getElementById('talkjs-container');
  
	if (existingChatIcon) {
		existingChatIcon.style.display = 'flex';
		if (existingChatContainer) {
			existingChatContainer.style.display = 'none';
		}
		return;
	}

	document.body.insertAdjacentHTML('beforeend', `
    <div id="chat-icon-wrapper" class="chat-icon-wrapper" style="position: fixed; bottom: 20px; right: 20px; z-index: 999999999999999999999; cursor: grab; width: 50px; height: 50px; user-select: none;background: var(--theme-color);padding: 5px;display: flex;border-radius: 50%;justify-content: center;align-items: center;display:flex">
      <img id="chat-icon" class="chat-icon" src="${ASSET_URL}/live-chat-icon.svg" alt="Chat Icon" style="width: 70%; height: 94%;">
      <div id="notification-badge" class="notification-badge" style="position: absolute; top: -5px; right: -5px; background-color: #FF4136; border-radius: 50%; width: 12px; height: 12px; display: none; box-shadow: 0 0 0 2px white;"></div>
    </div>
  `);

	document.body.insertAdjacentHTML('beforeend', `
    <div id="talkjs-container" class="live-chat-container" style="width: 350px; height: 400px; position: fixed; bottom: 100px; right: 20px; z-index: 999999999999999999999; background-color: white; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); display: none;"></div>
  `);

	const chatIconWrapper = document.getElementById('chat-icon-wrapper');
	const notificationBadge = document.getElementById('notification-badge');
	chatContainer = document.getElementById('talkjs-container');

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
			isChatOpen = chatContainer.style.display === 'none';
			chatContainer.style.display = isChatOpen ? 'block' : 'none';
			
			if (typeof setChatOpenState === 'function') {
				setChatOpenState(isChatOpen);
			}
      
			if (isChatOpen) {
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
			if (chatContainer.style.display === 'block') {
				isChatOpen = false;
				chatContainer.style.display = 'none';
				
				if (typeof setChatOpenState === 'function') {
					setChatOpenState(false);
				}
			}
		}
	});

	const handleDocumentClick = (e) => {
		if (chatContainer && chatIconWrapper) {
			if (!chatContainer.contains(e.target) && !chatIconWrapper.contains(e.target)) {
				if (isChatOpen) {
					isChatOpen = false;
					if (typeof setChatOpenState === 'function') {
						setChatOpenState(false);
					}
				}
			}
		}
	};

	document.addEventListener('mousedown', handleDocumentClick);

	const cleanup = () => {
		if (typeof setChatOpenState === 'function') {
			setChatOpenState(false);
		}
		document.removeEventListener('mousedown', handleDocumentClick);
	};

	window.addEventListener('beforeunload', cleanup);
	window.addEventListener('unload', cleanup);

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

const createLanguageDropdown = (currentStep) => {
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

	const videoId = getVideoIdForStep(currentStep);
	const hasVideo = !!videoId;
	const themeColor = schoolTheme?.theming || '#FF961B';
	
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
      
      ${hasVideo ? `
      <div class="help-container">
        <button class="help-btn">
          <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_help)">
              <circle cx="37.5" cy="35.5" r="17.5" fill="${themeColor}"/>
            </g>
            <g clip-path="url(#clip0_help)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M45.6885 38.3593C45.5823 38.6712 45.4581 38.9782 45.3153 39.2794L46.1328 43.3677C46.2248 43.8276 45.8729 44.2593 45.4018 44.2593C45.3929 44.2593 45.3873 44.2598 45.3817 44.2601C45.3224 44.2632 45.262 44.2461 41.1185 43.4269C39.9572 43.9777 38.7119 44.2574 37.4127 44.2592C32.6228 44.2522 28.7285 40.3538 28.7285 35.5624C28.7285 30.6266 32.8589 26.646 37.8304 26.8751L37.8307 26.876C43.6085 27.1556 47.5223 32.8968 45.6612 38.3593H45.6885ZM38.9215 35.4573C38.6807 35.6899 38.4743 35.8893 38.328 36.1538C38.2044 36.3762 38.1581 36.522 38.1581 37.2353H36.7526C36.7526 37.1842 36.7514 37.1286 36.7502 37.0695C36.7425 36.6941 36.7318 36.1738 36.992 35.7166C37.2014 35.3472 37.515 35.0601 37.824 34.7771C38.0732 34.5489 38.3194 34.3234 38.5056 34.0597C38.9458 33.4384 38.6987 32.2725 37.4476 32.2725C36.629 32.2725 36.2275 32.8861 36.0576 33.4077L34.7833 32.8708C35.1309 31.843 36.0653 30.9609 37.4322 30.9609C38.5751 30.9609 39.3551 31.4748 39.7567 32.1268C40.0965 32.679 40.2973 33.7146 39.7721 34.4893C39.4703 34.9272 39.1766 35.2109 38.9215 35.4573ZM37.4476 40.1654C36.907 40.1654 36.4746 39.7359 36.4746 39.199C36.4746 38.6544 36.907 38.2402 37.4476 38.2402C37.9959 38.2402 38.4129 38.6544 38.4129 39.199C38.4052 39.7282 37.9959 40.1654 37.4476 40.1654Z" fill="white"/>
            </g>
            <defs>
              <filter id="filter0_d_help" x="0" y="0" width="75" height="75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="10"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.898507 0 0 0 0 0.928207 0 0 0 0 0.954167 0 0 0 1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_help"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_help" result="shape"/>
              </filter>
              <clipPath id="clip0_help">
                <rect width="17.7012" height="17.7011" fill="white" transform="translate(28.4473 26.8506)"/>
              </clipPath>
            </defs>
          </svg>
          <p>${i18next.t('need_help')}</p>
        </button>
        <div class="help-dropdown" style="display: none;">
          <div class="help-dropdown-content">
            <h3>${i18next.t('need_help')}</h3>
            <div class="video-wrapper">
              <div class="new-spinner video-spinner">
								<div class='bounce1'></div>
								<div class='bounce2'></div>
								<div class='bounce3'></div>
              </div>
              <iframe
                class="help-video-iframe"
                src=""
                title="Help Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="display: none;"
              ></iframe>
            </div>
            <button class="open-tab-btn" type="button">
              <span>${i18next.t('open_in_new_tab')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="display: inline-block; margin-left: 8px; vertical-align: middle;">
                <path d="M12 8.667V12.667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.667 14H3.33301C2.97967 14 2.64058 13.8595 2.39053 13.6095C2.14048 13.3594 2 13.0203 2 12.667V5.33301C2 4.97967 2.14048 4.64058 2.39053 4.39053C2.64058 4.14048 2.97967 4 3.33301 4H7.33301M10 2H14M14 2V6M14 2L6.66699 9.33301" 
                      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      ` : ''}
    </div>
  `;

	if(modalContent){
		modalContent.insertAdjacentHTML('afterbegin', headerHTML);
	}

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

	if (hasVideo) {
		const helpButton = modalContent.querySelector('.help-btn');
		const helpDropdown = modalContent.querySelector('.help-dropdown');
		const helpIframe = modalContent.querySelector('.help-video-iframe');
		const videoSpinner = modalContent.querySelector('.video-spinner');
		const openTabButton = modalContent.querySelector('.open-tab-btn');
		let isHelpDropdownOpen = false;
		let isVideoLoaded = false;

		const stopVideo = () => {
			if (helpIframe.src && helpIframe.contentWindow) {
				helpIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
			}
		};

		helpButton.addEventListener('click', (e) => {
			e.stopPropagation();
			isHelpDropdownOpen = !isHelpDropdownOpen;
			helpDropdown.style.display = isHelpDropdownOpen ? 'block' : 'none';
			
			if (isHelpDropdownOpen) {
				if (!isVideoLoaded) {
					videoSpinner.style.display = 'flex';
					helpIframe.style.display = 'none';
					helpIframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
				} else {
					videoSpinner.style.display = 'flex';
					helpIframe.style.display = 'none';
					setTimeout(() => {
						videoSpinner.style.display = 'none';
						helpIframe.style.display = 'block';
					}, 300);
				}
			}
		});

		helpIframe.addEventListener('load', () => {
			if (helpIframe.src) {
				setTimeout(() => {
					videoSpinner.style.display = 'none';
					helpIframe.style.display = 'block';
					isVideoLoaded = true;
				}, 500);
			}
		});

		openTabButton.addEventListener('mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			
			setTimeout(() => {
				window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
			}, 0);
		});

		openTabButton.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			return false;
		});

		let closeTimeout;
		const handleOutsideClick = (event) => {
			const helpContainer = modalContent.querySelector('.help-container');
			if (helpContainer && !helpContainer.contains(event.target) && isHelpDropdownOpen) {
				if (closeTimeout) clearTimeout(closeTimeout);
				
				closeTimeout = setTimeout(() => {
					isHelpDropdownOpen = false;
					helpDropdown.style.display = 'none';
					// Stop video when closing the dropdown
					stopVideo();
				}, 10);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick, true); // Use capture phase

		helpDropdown.addEventListener('mousedown', (e) => {
			e.stopPropagation();
		});

		const cleanup = () => {
			document.removeEventListener('mousedown', handleOutsideClick, true);
			// Stop video on cleanup
			stopVideo();
		};

		if (window.mereos) {
			window.mereos.cleanupLanguageDropdown = cleanup;
		}
	}
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
		modal.style.zIndex = '9999';
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
		logger.success('tabId',tabId);
		const { containers } = window.mereos.dom;
		initializeI18next();
		createLanguageDropdown(tabId);
		loadNotyfJS();

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
			'BrowserSecurity':BROWSER_SECURTIY_STEP
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
				navigate('BrowserSecurity');
				return;
			}
			await SystemRequirement(containers.SystemRequirement);
		} else if (tabId === 'BrowserSecurity') {
			if (!isFeatureAllowed) {
				navigate('Prevalidationinstruction');
				return;
			}
			await BrowserSecurity(containers.BrowserSecurity);
		}else if (tabId === 'Prevalidationinstruction') {
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
		sentryExceptioMessage(e,{
			type: 'error', 
			message: 'Error in Show Tab', 
		});
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
		return 'data_saved';
	} catch (e) {
		sentryExceptioMessage(e);
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
		showToast('error',e.response?.data?.detail || 'something_went_wrong_please_contact_support');
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
	const session = convertDataIntoParse('session');
	
	if (!getAuthenticationToken() && !isModalClosed && 
		(session?.sessionStatus.toLowerCase() !== 'completed' && 
			session?.sessionStatus.toLowerCase() !== 'terminated')) {
		closeModalOnce();
	}
}

function closeModalOnce() {
	if (isModalClosed) return;
	
	isModalClosed = true;
	
	if (window.mereos.checkTokenIntervalId) {
		clearInterval(window.mereos.checkTokenIntervalId);
		window.mereos.checkTokenIntervalId = null;
	}
	
	if (window.mereos?.checkTokenInterval) {
		clearInterval(window.mereos.checkTokenInterval);
		window.mereos.checkTokenInterval = null;
	}
	
	closeModal();
}

window.onload = checkToken;

const checkInterval = 2000;

function initializeWhenReady() {
	if (window.mereos) {
		window.mereos.checkTokenIntervalId = setInterval(() => {
			checkToken();
		}, checkInterval);
		
		window.mereos.checkTokenInterval = window.mereos.checkTokenIntervalId;
	} else {
		setTimeout(initializeWhenReady, 100);
	}
}

initializeWhenReady();

export { openModal, closeModal, showTab };
