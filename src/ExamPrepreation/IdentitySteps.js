import { t } from 'i18next';
import { getSecureFeatures } from '../utils/functions';
import '../assets/css/identityStep.css';

const UNVERIFIED = 'UNVERIFIED';
const VERIFIED = 'VERIFIED';
const VERIFING = 'VERIFING';

// Function to render a single step
const renderStep = (stepStatus, stepText) => {
	const container = document.createElement('div');
	container.className = 'ivs-instruction-step-container';

	let stepClass = 'ivs-instruction-txt';
	if (stepStatus === VERIFING) {
		stepClass = 'ivs-instruction-txt-orange'; 
	} else if (stepStatus === VERIFIED) {
		stepClass = 'ivs-instruction-txt-orange'; 
	}

	const span = document.createElement('span');
	span.className = stepClass;
	span.textContent = t(stepText);

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

	// if (findEntity('Mobile Proctoring')) {
	// 	const div = document.createElement('div');
	// 	div.className = 'ivs-instruction';
	// 	const fifthStepStatus = stepStatus(5); // 5th step
	// 	div.appendChild(renderStep(fifthStepStatus, 'synchronisation_mobile', fifthStepStatus === VERIFING));
	// 	mainContainer.appendChild(div);
	// }

	if (findEntity('record_screen')) {
		const div = document.createElement('div');
		div.className = 'ivs-instruction';
		const fifthStepStatus = stepStatus(5); // 6th step
		div.appendChild(renderStep(fifthStepStatus, 'screen_record', fifthStepStatus === VERIFING));
		mainContainer.appendChild(div);
	}

	container.appendChild(mainContainer);
};
