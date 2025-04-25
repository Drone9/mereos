import i18next from 'i18next';
import { getDateTime, logger, registerEvent, updatePersistData } from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { showTab } from '../ExamsPrechecks';
import '../assets/css/exam-preparations.css';

export const ExamPreparation = async (tabContent) => {
	if (!tabContent) {
		logger.error('tabContent is not defined or is not a valid DOM element');
		return;
	}
	
	logger.error('tabContent', tabContent);
	tabContent.innerHTML = '';
	let tncRead = false;
	let errMsg = false;
	logger.success('in the ExamPreparation');

	tabContent.insertAdjacentHTML('beforeend', `
		<div class="exam-preparation-container">
			<div class="exam-preparation-wrapper">
				<div class="exam-preparation-header-title">${i18next.t('exam_preparation')}</div>
				<div class="exam-preparation-msg">${i18next.t('exam_preparation_msg')}</div>
				<img class="exam-preparation-header-img" src="${ASSET_URL}/camera-icon.svg" alt="camera-icon">
				
				<div class="exam-preparation-tnc-block">
					<input type="checkbox" class="exam-preparation-tnc-checkbox" id="tncCheckbox">
					<div class="exam-preparation-tnc-txt">${i18next.t('exam_preparation_tnc')}</div>
				</div>
				
				<div class="exam-preparation-sd-container">
					${i18next.t('view_our')} <a class="exam-preparation-sd-link" href="https://mereos.eu/conditions-générales" target="_blank">${i18next.t('security_document')}</a> ${i18next.t('for_more_information')}
				</div>
				
				<div class="exam-preparation-btn-container">
					<button class="orange-filled-btn" style="padding: 11px 32px">${i18next.t('continue')}</button>
				</div>
			</div>
		</div>
	`);

	const tncCheckbox = tabContent.querySelector('.exam-preparation-tnc-checkbox');
	const tncBlock = tabContent.querySelector('.exam-preparation-tnc-block');
	const tncText = tabContent.querySelector('.exam-preparation-tnc-txt');
	const continueButton = tabContent.querySelector('.orange-filled-btn');

	tncCheckbox.addEventListener('change', (e) => {
		tncRead = e.target.checked;
		if (errMsg) {
			tncBlock.style.color = '';
			tncBlock.style.fontWeight = '';
			errMsg = false;
		}
	});

	tncText.addEventListener('click', () => {
		tncCheckbox.checked = !tncCheckbox.checked;
		tncRead = tncCheckbox.checked;
		if (errMsg) {
			tncBlock.style.color = '';
			tncBlock.style.fontWeight = '';
			errMsg = false;
		}
	});

	continueButton.addEventListener('click', () => {
		if (tncRead) {
			registerEvent({ 
				eventType: 'success', 
				notify: false, 
				eventName: 'terms_and_conditions_read', 
				eventValue: getDateTime() 
			});
			showTab('IdentityCardRequirement');
			updatePersistData('preChecksSteps', { examPreparation: true });
		} else {
			errMsg = true;
			tncBlock.style.color = '#E95E5E';
			tncBlock.style.fontWeight = '700';
		}
	});
};

i18next.on('languageChanged', () => {
	const activeTab = document.querySelector('.tab-content.active');
	if (activeTab && activeTab.id === 'ExamPreparation') {
		ExamPreparation(activeTab);
	}
});