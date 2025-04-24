import i18next, { t } from 'i18next';
import { getSecureFeatures } from '../utils/functions';
import '../assets/css/identityStep.css';

const UNVERIFIED = 'UNVERIFIED';
const VERIFIED = 'VERIFIED';
const VERIFING = 'VERIFING';

const getStepHTML = (stepStatus, stepTextKey) => {
	let stepClass = 'ivs-instruction-txt';
	if (stepStatus === VERIFING || stepStatus === VERIFIED) {
		stepClass = 'ivs-instruction-txt-orange';
	}

	return `
    <div class="ivs-instruction-step-container">
      <span class="${stepClass}" data-i18n-key="${stepTextKey}">${t(stepTextKey)}</span>
    </div>
  `;
};

export const renderIdentityVerificationSteps = (identitySteps, currentStep) => {
	const container = identitySteps;
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];

	const findEntity = (entityName) => secureFeatures.find(entity => entity.key === entityName);
  
	const stepStatus = (stepOrder) => {
		if (stepOrder === currentStep) return VERIFING;
		if (stepOrder < currentStep) return VERIFIED;
		return UNVERIFIED;
	};

	// Build HTML for all steps at once
	let stepsHTML = '<div class="steps-container">';

	if (findEntity('verify_candidate')) {
		const firstStepStatus = stepStatus(1);
		stepsHTML += `
      <div class="ivs-instruction">
        ${getStepHTML(firstStepStatus, 'take_a_photo')}
      </div>
    `;
	}

	if (findEntity('verify_id')) {
		const secondStepStatus = stepStatus(2);
		stepsHTML += `
      <div class="ivs-instruction">
        ${getStepHTML(secondStepStatus, 'photo_id')}
      </div>
    `;
	}

	if (findEntity('record_audio')) {
		const thirdStepStatus = stepStatus(3);
		stepsHTML += `
      <div class="ivs-instruction">
        ${getStepHTML(thirdStepStatus, 'sound_check')}
      </div>
    `;
	}

	if (findEntity('record_room')) {
		const fourthStepStatus = stepStatus(4);
		stepsHTML += `
      <div class="ivs-instruction">
        ${getStepHTML(fourthStepStatus, '360_video')}
      </div>
    `;
	}

	if (findEntity('mobile_proctoring')) {
		const fifthStepStatus = stepStatus(5);
		stepsHTML += `
      <div class="ivs-instruction">
        ${getStepHTML(fifthStepStatus, 'synchronisation_mobile')}
      </div>
    `;
	}

	if (findEntity('record_screen')) {
		const sixthStepStatus = stepStatus(6);
		stepsHTML += `
      <div class="ivs-instruction">
        ${getStepHTML(sixthStepStatus, 'screen_record')}
      </div>
    `;
	}

	stepsHTML += '</div>';
  
	container.innerHTML = stepsHTML;
};

const updateTranslations = () => {
	document.querySelectorAll('[data-i18n-key]').forEach(element => {
		const key = element.getAttribute('data-i18n-key');
		element.textContent = t(key);
	});

	const textChange = document.querySelector('.orange-filled-btn');
	if (textChange) {
		textChange.textContent = i18next.t('continue');
	}
};

i18next.on('languageChanged', () => {
	updateTranslations();
});