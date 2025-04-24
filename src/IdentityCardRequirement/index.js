import '../assets/css/identity-card.css';
import { logger, registerEvent, updatePersistData } from '../utils/functions';
import i18next from 'i18next';
import { ASSET_URL } from '../utils/constant';
import { showTab } from '../ExamsPrechecks';

const vectors = [
	{ name: 'img1', src: `${ASSET_URL}/oc-address.svg`, alt: '' },
	{ name: 'img2', src: `${ASSET_URL}/oc-lightbulb.svg`, alt: '' },
	{ name: 'img3', src: `${ASSET_URL}/oc-megaphone.svg`, alt: '' },
	{ name: 'img4', src: `${ASSET_URL}/stacked-up-books.svg`, alt: '' },
	{ name: 'img5', src: `${ASSET_URL}/vector-2.png`, alt: '' },
	{ name: 'img6', src: `${ASSET_URL}/vector-1.png`, alt: '' },
	{ name: 'img7', src: `${ASSET_URL}/vector-3.png`, alt: '' },
	{ name: 'img8', src: `${ASSET_URL}/vector-1.png`, alt: '' }
];

const getDateTime = () => new Date().toISOString();

export const IdentityCardRequirement = async (tabContent, callback) => {
	if (!tabContent) {
		logger.error('tabContent is not defined or is not a valid DOM element');
		return;
	}

	const nextPage = () => {
		registerEvent({ eventType: 'success', notify: false, eventName: 'identity_card_requirement_read', eventValue: getDateTime() });
		showTab('runSystemDiagnostics', callback);
		updatePersistData('preChecksSteps', { identityConfirmation: true });
	};
    
	tabContent.innerHTML = '';

	let mobileContainer = document?.getElementById('mobile-proctoring');
	if (mobileContainer) {
		mobileContainer.innerHTML = '';
	}

	// Get school theme data
	const schoolTheme = localStorage.getItem('schoolTheme') !== undefined ? 
		JSON.parse(localStorage.getItem('schoolTheme')) : {};
    
	// Create background images HTML
	const vectorsHTML = vectors.map(vector => 
		`<img class="${vector.name}" src="${vector.src}" alt="${vector.alt}">`
	).join('');

	// Create the main HTML using insertAdjacentHTML
	tabContent.insertAdjacentHTML('beforeend', `
        <div class="exam-preparation">
            <div class="exam-preparation-container">
                <img class="header-img" 
                     src="${schoolTheme?.mode === 'dark' ? `${ASSET_URL}/oc-reading-book.svg` : `${ASSET_URL}/oc-reading-book.png`}" 
                     alt="header-img">
                <h1>${i18next.t('exam_preparation')}</h1>
                <label class="ep-msg">${i18next.t('icc_msg')}</label>
                <button id="continue-button" class="orange-filled-btn" style="margin-top: 10px; justify-content: center;">
                    ${i18next.t('continue')}
                </button>
            </div>
            <div class="bg-images">
                ${vectorsHTML}
            </div>
        </div>
    `);
    
	// Add CSS styles if needed
	if (!document.getElementById('identity-card-styles')) {
		const styleElement = document.createElement('style');
		styleElement.id = 'identity-card-styles';
		styleElement.textContent = `
            /* Define your CSS styles here if needed - these could also be moved to your CSS file */
        `;
		document.head.appendChild(styleElement);
	}
    
	// Add event listener to the continue button
	document.getElementById('continue-button').addEventListener('click', nextPage);
    
	// Handle language changes only for this component
	const languageChangeHandler = () => {
		const titleElement = tabContent.querySelector('h1');
		const msgElement = tabContent.querySelector('.ep-msg');
		const continueButtonElement = tabContent.querySelector('#continue-button');
        
		if (titleElement) titleElement.textContent = i18next.t('exam_preparation');
		if (msgElement) msgElement.textContent = i18next.t('icc_msg');
		if (continueButtonElement) continueButtonElement.textContent = i18next.t('continue');
	};
    
	// Store the language change handler reference on the tabContent for cleanup later if needed
	tabContent.languageChangeHandler = languageChangeHandler;
    
	// Add language change listener
	i18next.on('languageChanged', languageChangeHandler);
};

// Global language change handler for when this tab becomes active
i18next.on('languageChanged', () => {
	const activeTab = document.querySelector('.tab-content.active');
	if (activeTab && activeTab.id === 'IdentityCardRequirement') {
		IdentityCardRequirement(activeTab);
	}
});