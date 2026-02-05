import i18next from 'i18next';

import { 
	getCPUInfo, 
	getNetworkDownloadSpeed, 
	getNetworkUploadSpeed, 
	getRAMInfo, 
	getSecureFeatures, 
	logger, 
	registerEvent, 
	sentryExceptioMessage, 
	updatePersistData 
} from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { showTab } from '../ExamsPrechecks';

const ramGreen = `${ASSET_URL}/ram-icon-green.svg`;
const cpuGreen = `${ASSET_URL}/cpu-icon-green.svg`;
const uploadSpeedGreen = `${ASSET_URL}/upload-speed-green.svg`;
const downloadSpeedGreen = `${ASSET_URL}/download-speed-green.svg`;
const ramRed = `${ASSET_URL}/ram-icon-red.svg`;
const cpuRed = `${ASSET_URL}/cpu-icon-red.svg`;
const uploadSpeedRed = `${ASSET_URL}/upload-speed-red.svg`;
const downloadSpeedRed = `${ASSET_URL}/download-speed-red.svg`;

const statusIconMap = {
	ram: 'ram-icon-gray.svg',
	cpu: 'cpu-icon-gray.svg',
	upload_speed: 'upload-speed-gray.svg',
	download_speed: 'download-speed-gray.svg'
};

const successIconMap = {
	ram: ramGreen,
	cpu: cpuGreen,
	upload_speed: uploadSpeedGreen,
	download_speed: downloadSpeedGreen,
};

const failureIconMap = {
	ram: ramRed,
	cpu: cpuRed,
	upload_speed: uploadSpeedRed,
	download_speed: downloadSpeedRed
};

const createDiagnosticItemHTML = (id, label) => {
	return `
    <div class="requirement-item grey-box" id="${id}RequirementItem">
        <div class="grey-box-right">
            <img id="${id}StatusIcon" src="${ASSET_URL}/${statusIconMap[id]}" alt="">
            <label>${label}</label>
        </div>
        <div class="grey-box-left">
            <img id="${id}StatusLoading" src="${ASSET_URL}/loading-gray.svg" alt="">
        </div>
    </div>
    `;
};

const renderUI = (tab1Content) => {
	const candidateAssessment = getSecureFeatures();
	const secureFeatures = candidateAssessment?.entities || [];

	let verifyRam = secureFeatures.find(entity => entity.key === 'verify_ram');
	let verifyCPU = secureFeatures.find(entity => entity.key === 'verify_cpu');
	let verifyUploadSpeed = secureFeatures.find(entity => entity.key === 'verify_upload_speed');
	let verifyDownloadSpeed = secureFeatures.find(entity => entity.key === 'verify_download_speed');

	let diagnosticItemsHTML = '';

	if (verifyRam) diagnosticItemsHTML += createDiagnosticItemHTML('ram', i18next.t('ram'));
	if (verifyCPU) diagnosticItemsHTML += createDiagnosticItemHTML('cpu', i18next.t('cpu'));
	if (verifyUploadSpeed) diagnosticItemsHTML += createDiagnosticItemHTML('upload_speed', i18next.t('upload_speed'));
	if (verifyDownloadSpeed) diagnosticItemsHTML += createDiagnosticItemHTML('download_speed', i18next.t('download_speed'));

	const html = `
    <div class="system-requirement-test-screen">
        <h1 class="system-requirement-heading">${i18next.t('system_requirements')}</h1>
        <div class="diagnostic-status container-box">
            <div class="container">
                <label class="system-requirement-description">${i18next.t('system_requirement_checking_msg')}</label>
                <div class="container-middle box-section">
                    ${diagnosticItemsHTML}
                </div>
                <div class="button-section">
                    <button class="orange-hollow-btn" id="requirementRefreshBtn" style="display: none;">
                        ${i18next.t('refresh')}
                    </button>
                    <button class="orange-filled-btn" id="requirementContinueBtn" disabled>${i18next.t('continue')}</button>
                </div>
            </div>
        </div>
    </div>
    `;

	tab1Content.innerHTML = html;

	window.mereos.shadowRoot.getElementById('requirementRefreshBtn')?.addEventListener('click', async () => {
		await retryAllFailedRequirements();
	});

	window.mereos.shadowRoot.getElementById('requirementContinueBtn').addEventListener('click', () => {
		registerEvent({ eventType: 'success', notify: false, eventName: 'system_requirement_passed' });
		updatePersistData('preChecksSteps', { requirementStep: true });
		showTab('BrowserSecurity');
	});

	addDiagnosticItemClickHandlers();
};

const addDiagnosticItemClickHandlers = () => {
	const ids = ['ram', 'cpu', 'upload_speed', 'download_speed'];
	const checkFunctions = {
		'ram': getRAMInfo,
		'cpu': getCPUInfo,
		'upload_speed': getNetworkUploadSpeed,
		'download_speed': getNetworkDownloadSpeed
	};

	ids.forEach(id => {
		if (checkFunctions[id]) {
			handleDiagnosticItemClick(id, checkFunctions[id]);
		}
	});
};

const setElementStatus = (id, status, isSuccess) => {
	const statusIcon = window.mereos.shadowRoot.getElementById(`${id}StatusIcon`);
	const statusLoading = window.mereos.shadowRoot.getElementById(`${id}StatusLoading`);
	if (!statusIcon || !statusLoading) {
		return;
	}

	statusIcon.src = isSuccess ? status.success : status.failure;
	statusLoading.src = isSuccess ? `${ASSET_URL}/checkmark-rounded-green.png` : `${ASSET_URL}/x-circle.png`;

	// Remove click event listener if check passed successfully
	if (isSuccess) {
		removeDiagnosticItemClickListener(id);
	}
};

const removeDiagnosticItemClickListener = (id) => {
	const element = window.mereos.shadowRoot.getElementById(`${id}RequirementItem`);
	if (!element) return;

	// Clone the element to remove all event listeners
	const newElement = element.cloneNode(true);
	element.parentNode.replaceChild(newElement, element);

	// Update references in the new element
	const labelElement = newElement.querySelector('label');
	if (labelElement) {
		labelElement.textContent = i18next.t(id);
	}
};

const handleDiagnosticItemClick = (id, checkFunction) => {
	const element = window.mereos.shadowRoot.getElementById(`${id}RequirementItem`);
	if (!element) {
		return;
	}
	
	// Check if element already has success status
	const statusIcon = window.mereos.shadowRoot.getElementById(`${id}StatusIcon`);
	if (statusIcon && statusIcon.src.includes(successIconMap[id].split('/').pop())) {
		return; // Don't add click listener if already successful
	}

	const candidateAssessment = getSecureFeatures();
	const profileSettings = candidateAssessment?.settings;

	const clickHandler = async () => {
		const statusIcon = window.mereos.shadowRoot.getElementById(`${id}StatusIcon`);
		const statusLoading = window.mereos.shadowRoot.getElementById(`${id}StatusLoading`);
		const continueButton = window.mereos.shadowRoot.getElementById('requirementContinueBtn');
		const refreshButton = window.mereos.shadowRoot.getElementById('requirementRefreshBtn');

		if (!statusIcon || !statusLoading) {
			return;
		}
		
		// Check if already in success state
		if (statusIcon.src.includes(successIconMap[id].split('/').pop())) {
			return;
		}
		
		continueButton.disabled = true;
		if (refreshButton) {
			refreshButton.disabled = true;
			refreshButton.style.display = 'none'; // Hide refresh button during processing
		}
		statusLoading.src = `${ASSET_URL}/loading-gray.svg`;
		statusIcon.src = `${ASSET_URL}/${statusIconMap[id]}`;

		const resp = await checkFunction();

		const ram_info = (parseInt(resp?.capacity) / (1024 ** 3)).toFixed(0);
		const isGoodRam = Number(ram_info) >= profileSettings?.ram_size;

		const isGoodCpu = Number(resp?.noOfPrcessor) >= profileSettings?.cpu_size;

		const isGoodUpload = Number(resp?.speedMbps) >= profileSettings?.upload_speed;
		const isGoodDownload = Number(resp?.speedMbps) >= profileSettings?.download_speed;

		let finalResult;
		switch (id) {
			case 'ram':
				finalResult = isGoodRam;
				break;
			case 'cpu':
				finalResult = isGoodCpu;
				break;
			case 'upload_speed':
				finalResult = isGoodUpload;
				break;
			case 'download_speed':
				finalResult = isGoodDownload;
				break;
			default:
				finalResult = resp;
		}

		setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, finalResult);
		updateContinueButtonState();
		updateRefreshButtonVisibility();
		if (refreshButton) refreshButton.disabled = false;
	};

	element.addEventListener('click', clickHandler);
	
	// Store reference to the handler for removal
	element._clickHandler = clickHandler;
};

const retryAllFailedRequirements = async () => {
	const refreshBtn = window.mereos.shadowRoot.getElementById('requirementRefreshBtn');
	const continueBtn = window.mereos.shadowRoot.getElementById('requirementContinueBtn');
	
	if (refreshBtn && continueBtn) {
		refreshBtn.disabled = true;
		refreshBtn.style.display = 'none'; // Hide refresh button during batch retry processing
		continueBtn.disabled = true;
		
		const originalText = refreshBtn.textContent;
		refreshBtn.textContent = i18next.t('retrying');
		
		try {
			const candidateAssessment = await getSecureFeatures();
			const secureFeatures = candidateAssessment?.entities || [];
			const profileSettings = candidateAssessment?.settings;
			
			const failedRequirements = getFailedRequirements();
			
			const retryPromises = [];
			
			if (failedRequirements.includes('ram') && secureFeatures.find(entity => entity.key === 'verify_ram')) {
				retryPromises.push(retryRequirementItem('ram', getRAMInfo, profileSettings));
			}
			
			if (failedRequirements.includes('cpu') && secureFeatures.find(entity => entity.key === 'verify_cpu')) {
				retryPromises.push(retryRequirementItem('cpu', getCPUInfo, profileSettings));
			}
			
			if (failedRequirements.includes('upload_speed') && secureFeatures.find(entity => entity.key === 'verify_upload_speed')) {
				retryPromises.push(retryRequirementItem('upload_speed', getNetworkUploadSpeed, profileSettings));
			}
			
			if (failedRequirements.includes('download_speed') && secureFeatures.find(entity => entity.key === 'verify_download_speed')) {
				retryPromises.push(retryRequirementItem('download_speed', getNetworkDownloadSpeed, profileSettings));
			}
			
			await Promise.all(retryPromises);
			
			registerEvent({ 
				eventType: 'info', 
				notify: false, 
				eventName: 'requirements_retry_attempted' 
			});
			
		} catch (error) {
			sentryExceptioMessage(error,{type:'error',message:`Error retrying requirements`});
			logger.error('Error retrying requirements:', error);
		} finally {
			refreshBtn.textContent = originalText;
			refreshBtn.disabled = false;
			updateContinueButtonState();
			updateRefreshButtonVisibility();
		}
	}
};

const retryRequirementItem = async (id, checkFunction, profileSettings) => {
	const statusIcon = window.mereos.shadowRoot.getElementById(`${id}StatusIcon`);
	const statusLoading = window.mereos.shadowRoot.getElementById(`${id}StatusLoading`);
	
	if (!statusIcon || !statusLoading) {
		return false;
	}
	
	statusIcon.src = `${ASSET_URL}/${statusIconMap[id]}`;
	statusLoading.src = `${ASSET_URL}/loading-gray.svg`;
	
	try {
		const resp = await checkFunction();
		const ram_info = (parseInt(resp?.capacity) / (1024 ** 3)).toFixed(0);
		
		let finalResult;
		switch (id) {
			case 'ram':
				finalResult = Number(ram_info) >= profileSettings?.ram_size;
				break;
			case 'cpu':
				finalResult = Number(resp?.noOfPrcessor) >= profileSettings?.cpu_size;
				break;
			case 'upload_speed':
				finalResult = Number(resp?.speedMbps) >= profileSettings?.upload_speed;
				break;
			case 'download_speed':
				finalResult = Number(resp?.speedMbps) >= profileSettings?.download_speed;
				break;
			default:
				finalResult = false;
		}
		
		setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, finalResult);
		
		if (finalResult) {
			registerEvent({ 
				eventType: 'success', 
				notify: false, 
				eventName: `${id}_requirement_retry_success` 
			});
		} else {
			registerEvent({ 
				eventType: 'error', 
				notify: false, 
				eventName: `${id}_requirement_retry_failed` 
			});
		}
		
		return finalResult;
	} catch (error) {
		logger.error(`Error retrying ${id} requirement:`, error);
		setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, false);
		sentryExceptioMessage(error,{type:'error',message:`Error retrying ${id} requirement:`});
		return false;
	}
};

const getFailedRequirements = () => {
	const failedItems = [];
	const requirementItems = ['ram', 'cpu', 'upload_speed', 'download_speed'];
	
	requirementItems.forEach(itemId => {
		const statusIcon = window.mereos.shadowRoot.getElementById(`${itemId}StatusIcon`);
		if (!statusIcon) return;
		
		const currentIconPathname = new URL(statusIcon.src).pathname;
		const failureIconPathname = new URL(failureIconMap[itemId] || '').pathname;
		
		if (currentIconPathname === failureIconPathname) {
			failedItems.push(itemId);
		}
	});
	
	return failedItems;
};

const updateContinueButtonState = () => {
	const renderedItems = window.mereos.shadowRoot.querySelectorAll('.requirement-item');

	const allDiagnosticsPassed = Array.from(renderedItems).every(item => {
		const itemId = item.id.replace('RequirementItem', '');
		const statusIcon = window.mereos.shadowRoot.getElementById(`${itemId}StatusIcon`);
		if (!statusIcon) return false;

		const currentIconPathname = new URL(statusIcon.src).pathname;
		const expectedIconPathname = new URL(successIconMap[itemId] || '').pathname;

		return currentIconPathname === expectedIconPathname;
	});

	const continueBtn = window.mereos.shadowRoot.getElementById('requirementContinueBtn');
	if (continueBtn) {
		continueBtn.disabled = !allDiagnosticsPassed;
	}
};

const updateRefreshButtonVisibility = () => {
	const refreshBtn = window.mereos.shadowRoot.getElementById('requirementRefreshBtn');
	const continueBtn = window.mereos.shadowRoot.getElementById('requirementContinueBtn');
	
	if (!refreshBtn || !continueBtn) return;
	
	const failedRequirements = getFailedRequirements();
	
	if (failedRequirements.length > 0) {
		refreshBtn.style.display = 'block';
		continueBtn.style.display = 'none';
	} else {
		refreshBtn.style.display = 'none';
		continueBtn.style.display = 'block';
	}
};

export const SystemRequirement = async (tab1Content) => {
	if (!tab1Content) {
		logger.error('Element with id "SystemRequirements" not found.');
		return;
	}
	renderUI(tab1Content);

	try {
		const candidateAssessment = await getSecureFeatures();
		const secureFeatures = candidateAssessment?.entities || [];
		const profileSettings = candidateAssessment?.settings;

		let verifyRam = secureFeatures.find(entity => entity.key === 'verify_ram');
		let verifyCPU = secureFeatures.find(entity => entity.key === 'verify_cpu');
		let verifyUploadSpeed = secureFeatures.find(entity => entity.key === 'verify_upload_speed');
		let verifyDownloadSpeed = secureFeatures.find(entity => entity.key === 'verify_download_speed');

		const promises = [];

		if (verifyRam) {
			promises.push(getRAMInfo().then(resp => {
				updatePersistData('session', { RAMSpeed: resp });
				const ram_info = (parseInt(resp?.capacity) / (1024 ** 3)).toFixed(0);
				const isGoodRam = Number(ram_info) >= profileSettings?.ram_size;
				setElementStatus('ram', { success: ramGreen, failure: ramRed }, isGoodRam);
				return isGoodRam;
			}));
		} else {
			setElementStatus('ram', { success: ramGreen, failure: ramRed }, true);
		}

		if (verifyCPU) {
			promises.push(getCPUInfo().then(resp => {
				updatePersistData('session', { CPUSpeed: resp });
				const isGoodCpu = Number(resp?.noOfPrcessor) >= profileSettings?.cpu_size;
				setElementStatus('cpu', { success: cpuGreen, failure: cpuRed }, isGoodCpu);
				return isGoodCpu;
			}));
		} else {
			setElementStatus('cpu', { success: cpuGreen, failure: cpuRed }, true);
		}

		if (verifyUploadSpeed) {
			promises.push(getNetworkUploadSpeed().then(network => {
				updatePersistData('session', { uploadSpeed: network });
				const isGoodUpload = Number(network.speedMbps) >= profileSettings?.upload_speed;
				setElementStatus('upload_speed', { success: uploadSpeedGreen, failure: uploadSpeedRed }, isGoodUpload);
				return isGoodUpload;
			}));
		} else {
			setElementStatus('upload_speed', { success: uploadSpeedGreen, failure: uploadSpeedRed }, true);
		}

		if (verifyDownloadSpeed) {
			promises.push(getNetworkDownloadSpeed().then(network => {
				updatePersistData('session', { downloadSpeed: network });
				const isGoodDownload = Number(network.speedMbps) >= profileSettings?.download_speed;
				setElementStatus('download_speed', { success: downloadSpeedGreen, failure: downloadSpeedRed }, isGoodDownload);
				return isGoodDownload;
			}));
		} else {
			setElementStatus('download_speed', { success: downloadSpeedGreen, failure: downloadSpeedRed }, true);
		}

		await Promise.all(promises);

		updateContinueButtonState();
		updateRefreshButtonVisibility();

	} catch (error) {
		sentryExceptioMessage(error,{type:'error',message:`Error running system requirement`});
		logger.error('Error running system requirement:', error);
	}
};

const updateDiagnosticText = () => {
	if (!window.mereos || !window.mereos.shadowRoot) return;
	const diagnosticItems = ['ram', 'cpu', 'upload_speed', 'download_speed'];

	diagnosticItems.forEach(item => {
		const labelElement = window.mereos.shadowRoot.querySelector(`#${item}RequirementItem label`);
		if (labelElement) {
			labelElement.textContent = i18next.t(item);
		}
	});

	const heading = window.mereos.shadowRoot.querySelector('.system-requirement-heading');
	if (heading) {
		heading.textContent = i18next.t('system_requirements');
	}

	const description = window.mereos.shadowRoot.querySelector('.system-requirement-description');
	if (description) {
		description.textContent = i18next.t('system_requirement_checking_msg');
	}
	const btnText = window.mereos.shadowRoot.getElementById('requirementContinueBtn');
	if (btnText) {
		btnText.textContent = i18next.t('continue');
	}
	
	const refreshBtn = window.mereos.shadowRoot.getElementById('requirementRefreshBtn');
	if (refreshBtn) {
		refreshBtn.textContent = i18next.t('refresh');
	}
};

i18next.on('languageChanged', () => {
	updateDiagnosticText();
});