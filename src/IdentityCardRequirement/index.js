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
		registerEvent({ 
			eventType: 'success', 
			notify: false, 
			eventName: 'identity_card_requirement_read', 
			eventValue: getDateTime() 
		});
		showTab('runSystemDiagnostics', callback);
		updatePersistData('preChecksSteps', { identityConfirmation: true });
	};
    
	tabContent.innerHTML = '';

	let mobileContainer = document?.getElementById('mobile-proctoring');
	if (mobileContainer) {
		mobileContainer.innerHTML = '';
	}

	const schoolTheme = localStorage.getItem('schoolTheme') !== undefined 
		? JSON.parse(localStorage.getItem('schoolTheme')) 
		: {};
    
	const headerImgSrc = schoolTheme?.mode === 'dark' 
		? `${ASSET_URL}/oc-reading-book.svg`
		: `${ASSET_URL}/oc-reading-book.png`;

	tabContent.insertAdjacentHTML('beforeend', `
        <div class="exam-preparation">
            <div class="exam-preparation-container">
                <img class="header-img" src="${headerImgSrc}" alt="header-img">
                <h1>${i18next.t('exam_preparation')}</h1>
                <label class="ep-msg">${i18next.t('icc_msg')}</label>
                <button class="orange-filled-btn">
                    ${i18next.t('continue')}
                </button>
            </div>
            <div class="bg-images">
                ${vectors.map(vector => 
		`<img class="${vector.name}" src="${vector.src}" alt="${vector.alt}">`
	).join('')}
            </div>
        </div>
    `);

	const continueButton = tabContent.querySelector('.orange-filled-btn');
	continueButton.addEventListener('click', nextPage);

	const updateTexts = () => {
		const title = tabContent.querySelector('h1');
		const msgLabel = tabContent.querySelector('.ep-msg');
		const continueBtn = tabContent.querySelector('.orange-filled-btn');
        
		if (title) title.textContent = i18next.t('exam_preparation');
		if (msgLabel) msgLabel.textContent = i18next.t('icc_msg');
		if (continueBtn) continueBtn.textContent = i18next.t('continue');
	};

	i18next.on('languageChanged', updateTexts);
};

i18next.on('languageChanged', () => {
	const activeTab = document.querySelector('.tab-content.active');
	if (activeTab && activeTab.id === 'IdentityCardRequirement') {
		IdentityCardRequirement(activeTab);
	}
});