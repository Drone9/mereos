import '../assets/css/exam-prepration.css';
import readingBook from '../assets/images/oc-reading-book.png';
import addressIcon from '../assets/images/oc-address.svg';
import lightBulb from '../assets/images/oc-lightbulb.svg';
import megaphone from '../assets/images/oc-megaphone.svg';
import stackBook from '../assets/images/stacked-up-books.svg';
import vector1 from '../assets/images/vector-1.png';
import vector2 from '../assets/images/vector-2.png';
import vector3 from '../assets/images/vector-3.png';
import { showTab } from './examPrechecks';
import { registerEvent, updatePersistData } from '../utils/functions';
import i18next from 'i18next';

const vectors = [
	{ name: 'img1', src: addressIcon, alt: '' },
	{ name: 'img2', src: lightBulb, alt: '' },
	{ name: 'img3', src: megaphone, alt: '' },
	{ name: 'img4', src: stackBook, alt: '' },
	{ name: 'img5', src: vector2, alt: '' },
	{ name: 'img6', src: vector1, alt: '' },
	{ name: 'img7', src: vector3, alt: '' },
	{ name: 'img8', src: vector1, alt: '' }
];

const getDateTime = () => new Date().toISOString();

const nextPage = () => {
	registerEvent({ eventType: 'success', notify: false, eventName: 'terms_and_conditions_read', eventValue: getDateTime() });
	showTab('runSystemDiagnostics',callback);
	updatePersistData('preChecksSteps',{ examPreparation:true });
};

export const ExamPreparation = async (tabContent,callback) => {
	if (!tabContent) {
		console.error('tabContent is not defined or is not a valid DOM element');
		return;
	}

	tabContent.innerHTML = '';

	const container = document.createElement('div');
	container.className = 'exam-preparation';

	const examPreparationContainer = document.createElement('div');
	examPreparationContainer.className = 'exam-preparation-container';

	const headerImg = document.createElement('img');
	headerImg.className = 'header-img';
	headerImg.src = readingBook;
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
