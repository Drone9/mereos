import '../assets/css/exam-prepration.css';
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

export const ExamPreparation = async (tabContent,callback) => {
	if (!tabContent) {
		logger.error('tabContent is not defined or is not a valid DOM element');
		return;
	}

	const nextPage = () => {
		registerEvent({ eventType: 'success', notify: false, eventName: 'terms_and_conditions_read', eventValue: getDateTime() });
		showTab('runSystemDiagnostics',callback);
		updatePersistData('preChecksSteps',{ examPreparation:true });
	};
	
	tabContent.innerHTML = '';

	let mobileContainer = document?.getElementById('mobile-proctoring');
	if(mobileContainer){
		mobileContainer.innerHTML = '';
	}

	const container = document.createElement('div');
	container.className = 'exam-preparation';

	const examPreparationContainer = document.createElement('div');
	examPreparationContainer.className = 'exam-preparation-container';

	const headerImg = document.createElement('img');
	headerImg.className = 'header-img';
	headerImg.src = `${ASSET_URL}/oc-reading-book.png`;
	headerImg.alt = 'header-img';
	examPreparationContainer.appendChild(headerImg);

	const title = document.createElement('h1');
	title.textContent = i18next.t('exam_preparation');
	examPreparationContainer.appendChild(title);

	const msgLabel = document.createElement('label');
	msgLabel.className = 'ep-msg';
	msgLabel.textContent = i18next.t('icc_msg');
	examPreparationContainer.appendChild(msgLabel);

	const continueButton = document.createElement('button');
	continueButton.className = 'orange-filled-btn';
	continueButton.textContent = i18next.t('continue');
	continueButton.style.marginTop = '10px';
	continueButton.style.justifyContent = 'center';
	continueButton.addEventListener('click', nextPage);
	examPreparationContainer.appendChild(continueButton);

	container.appendChild(examPreparationContainer);

	const bgImagesContainer = document.createElement('div');
	bgImagesContainer.className = 'bg-images';

	vectors.forEach((vector) => {
		const vectorImg = document.createElement('img');
		vectorImg.className = vector.name;
		vectorImg.src = vector.src;
		vectorImg.alt = vector.alt;
		bgImagesContainer.appendChild(vectorImg);
	});

	container.appendChild(bgImagesContainer);

	tabContent.appendChild(container);

	const styleElement = document.createElement('style');
	styleElement.textContent = `
    .exam-preparation {
        /* Define your CSS styles here */
    }
    .exam-preparation-container {
        /* Define your CSS styles here */
    }
    /* Define other classes as needed */
  `;
	document.head.appendChild(styleElement);
	
	i18next.on('languageChanged', () => {
		title.textContent = i18next.t('exam_preparation');
		msgLabel.textContent = i18next.t('icc_msg');
		continueButton.textContent = i18next.t('continue');
	});
};

i18next.on('languageChanged', () => {
	const activeTab = document.querySelector('.tab-content.active');
	if (activeTab && activeTab.id === 'ExamPreparation') {
		ExamPreparation(activeTab);
	}
});
