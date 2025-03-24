import i18next from 'i18next';

import { getDateTime, logger, registerEvent, updatePersistData } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { showTab } from '../ExamsPrechecks';
import '../assets/css/exam-preparations.css';
import welsLanguage from '../assets/locales/cy/translation.json';

export const ExamPreparation = async (tabContent) => {
	if (!tabContent) {
		return;
	}
	logger.error('tabContent',tabContent);
	tabContent.innerHTML = '';
	let tncRead = false;
	let errMsg = false;

	const container = document.createElement('div');
	container.className = 'exam-preparation-container';

	const wrapper = document.createElement('div');
	wrapper.className = 'exam-preparation-wrapper';
	container.appendChild(wrapper);

	const headerImg = document.createElement('img');
	headerImg.className = 'exam-preparation-header-img';
	headerImg.src = `${ASSET_URL}/camera-icon.svg`;
	headerImg.alt = 'camera-icon';
	wrapper.appendChild(headerImg);

	const headerTitle = document.createElement('div');
	headerTitle.className = 'exam-preparation-header-title';
	logger.success('i18next.t',i18next.t('exam_preparation'),'i18next',i18next);
	headerTitle.textContent = i18next.t('exam_preparation');
	wrapper.appendChild(headerTitle);

	const preparationMsg = document.createElement('div');
	preparationMsg.className = 'exam-preparation-msg';
	preparationMsg.textContent = i18next.t('exam_preparation_msg');
	wrapper.appendChild(preparationMsg);

	const tncBlock = document.createElement('div');
	tncBlock.className = 'exam-preparation-tnc-block';
	wrapper.appendChild(tncBlock);

	const tncCheckbox = document.createElement('input');
	tncCheckbox.className = 'exam-preparation-tnc-checkbox';
	tncCheckbox.type = 'checkbox';
	tncCheckbox.addEventListener('change', (e) => {
		tncRead = e.target.checked;
		if (errMsg) {
			tncBlock.style.color = '';
			tncBlock.style.fontWeight = '';
			errMsg = false;
		}
	});
	tncBlock.appendChild(tncCheckbox);

	const tncText = document.createElement('div');
	tncText.className = 'exam-preparation-tnc-txt';
	tncText.textContent = i18next.t('exam_preparation_tnc');
	tncBlock.appendChild(tncText);

	const sdContainer = document.createElement('div');
	sdContainer.className = 'exam-preparation-sd-container';
	sdContainer.innerHTML = `
    ${i18next.t('view_our')} <a
      class="exam-preparation-sd-link"
      href="https://mereos.eu/conditions-générales"
      target="_blank"
    >${i18next.t('security_document')}</a> ${i18next.t('for_more_information')}.
  `;
	wrapper.appendChild(sdContainer);

	const btnContainer = document.createElement('div');
	btnContainer.className = 'exam-preparation-btn-container';
	wrapper.appendChild(btnContainer);

	const button = document.createElement('button');
	button.className = 'orange-filled-btn';
	button.textContent = i18next.t('continue');
	button.style.padding = '11px 32px';
	button.addEventListener('click', () => {
		if (tncRead) {
			registerEvent({ eventType: 'success', notify: false, eventName: 'terms_and_conditions_read', eventValue: getDateTime() });
			showTab('IdentityCardRequirement');
			updatePersistData('preChecksSteps',{ examPreparation:true });
		} else {
			errMsg = true;
			tncBlock.style.color = '#E95E5E';
			tncBlock.style.fontWeight = '700';
		}
	});
	btnContainer.appendChild(button);

	tabContent.appendChild(container);
};
i18next.on('languageChanged', () => {
	console.log(i18next.options.resources);
	console.log(i18next.hasResourceBundle('cy', 'translation'));
	i18next.options.resources={
		...i18next.options.resources,
		cy:{
			translation:welsLanguage
		}
	};
	const activeTab = document.querySelector('.tab-content.active');
	if (activeTab && activeTab.id === 'ExamPreparation') {
		ExamPreparation(activeTab);
	}
});

