import i18next, { t } from 'i18next';

import { getSecureFeatures } from '../utils/functions';

import '../assets/css/identityStep.css';

const UNVERIFIED = 'UNVERIFIED';
const VERIFIED = 'VERIFIED';
const VERIFING = 'VERIFING';

const renderStep = (stepStatus, stepTextKey) => {
	const container = document.createElement('div');
	container.className = 'ivs-instruction-step-container';

	let stepClass = 'ivs-instruction-txt';
	if (stepStatus === VERIFING || stepStatus === VERIFIED) {
		stepClass = 'ivs-instruction-txt-orange';
	}

	const span = document.createElement('span');
	span.className = stepClass;
	span.setAttribute('data-i18n-key', stepTextKey); // Store key for dynamic updates
	span.textContent = t(stepTextKey);

	container.appendChild(span);
	return container;
};


export const renderIdentityVerificationSteps = (identitySteps, currentStep) => {
	const container = identitySteps;
	const getSecureFeature = getSecureFeatures();
	const secureFeatures = getSecureFeature?.entities || [];

	const findEntity = (entityName) => secureFeatures.find(entity => entity.key === entityName);
	const mainContainer = document.createElement('div');
	mainContainer.className = 'steps-container';

	const stepStatus = (stepOrder) => {
		if (stepOrder === currentStep) return VERIFING;
		if (stepOrder < currentStep) return VERIFIED;
		return UNVERIFIED;
	};

	if (findEntity('verify_candidate')) {
		const div = document.createElement('div');
		div.className = 'ivs-instruction';
		const firstStepStatus = stepStatus(1); // 1st step
		div.appendChild(renderStep(firstStepStatus, 'take_a_photo', firstStepStatus === VERIFING));
		mainContainer.appendChild(div);
	}

	if (findEntity('verify_id')) {
		const div = document.createElement('div');
		div.className = 'ivs-instruction';
		const secondStepStatus = stepStatus(2); // 2nd step
		div.appendChild(renderStep(secondStepStatus, 'photo_id', secondStepStatus === VERIFING));
		mainContainer.appendChild(div);
	}

	if (findEntity('record_audio')) {
		const div = document.createElement('div');
		div.className = 'ivs-instruction';
		const thirdStepStatus = stepStatus(3); // 3rd step
		div.appendChild(renderStep(thirdStepStatus, 'sound_check', thirdStepStatus === VERIFING));
		mainContainer.appendChild(div);
	}

	if (findEntity('record_room')) {
		const div = document.createElement('div');
		div.className = 'ivs-instruction';
		const fourthStepStatus = stepStatus(4); // 4th step
		div.appendChild(renderStep(fourthStepStatus, '360_video', fourthStepStatus === VERIFING));
		mainContainer.appendChild(div);
	}

	if (findEntity('mobile_proctoring')) {
		const div = document.createElement('div');
		div.className = 'ivs-instruction';
		const fifthStepStatus = stepStatus(5);
		div.appendChild(renderStep(fifthStepStatus, 'synchronisation_mobile', fifthStepStatus === VERIFING));
		mainContainer.appendChild(div);
	}

	if (findEntity('record_screen')) {
		const div = document.createElement('div');
		div.className = 'ivs-instruction';
		const fifthStepStatus = stepStatus(6);
		div.appendChild(renderStep(fifthStepStatus, 'screen_record', fifthStepStatus === VERIFING));
		mainContainer.appendChild(div);
	}

	container.appendChild(mainContainer);
};

const updateTranslations = () => {
	document.querySelectorAll('[data-i18n-key]').forEach(element => {
		const key = element.getAttribute('data-i18n-key');
		element.textContent = t(key);
	});

	// Update button text if applicable
	const textChange = document.querySelector('.orange-filled-btn');
	if (textChange) {
		textChange.textContent = i18next.t('continue');
	}
};


i18next.on('languageChanged', () => {
	console.log(`Language changed to: ${i18next.language}`); // Debugging
	updateTranslations();
});