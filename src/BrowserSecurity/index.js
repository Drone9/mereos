import i18next from 'i18next';
import { detectIncognito } from 'detectincognitojs';

import { 
	getSecureFeatures, 
	logger, 
	registerEvent, 
	showToast, 
	updatePersistData 
} from '../utils/functions';
import { ASSET_URL, EXTENSIONS_LIST } from '../utils/constant';
import { showTab } from '../ExamsPrechecks';

const extensionGreen = `${ASSET_URL}/extension-green.svg`;
const incognitoGreen = `${ASSET_URL}/incognito-green.svg`;
const extensionRed = `${ASSET_URL}/extension-red-icon.svg`;
const incognitoRed = `${ASSET_URL}/incognito-red.svg`;

const successIconMap = {
	extensions: extensionGreen,
	incognito: incognitoGreen
};

const failureIconMap = {
	extensions: extensionRed,
	incognito: incognitoRed
};

const renderUI = (tabContent) => {
	const candidateAssessment = getSecureFeatures();
	const secureFeatures = candidateAssessment?.entities || [];
	const checkExtensions = secureFeatures.some(entity => entity.key === 'disable_tampering');
	const checkIncognitoMode = secureFeatures.some(entity => entity.key === 'allow_incognito_mode');

	let securityItemsHTML = '';
    
	if (checkExtensions) {
		securityItemsHTML += createSecurityItemHTML('extensions', i18next.t('detect_extensions'));
	}
	if (checkIncognitoMode) {
		securityItemsHTML += createSecurityItemHTML('incognito', i18next.t('allow_incognito_mode'));
	}

	const html = `
    <div class="browswer-security-test-screen">
        <h1 class="heading">${i18next.t('browser_security_check')}</h1>
        <div class="container-box">
            <div class="container">
                <div class="container-top">
                    <label class="description">${i18next.t('browser_security_check_msg')}</label>
                </div>
                <div class="container-prompt">
                    <img src="${ASSET_URL}/extension-image.png" 
                         alt="" width="400px" class="browser-prompt-image" id="security-img">
                </div>
                <div class="container-middle">
                    <div class="box-section">
                        ${securityItemsHTML}
                    </div>
                    <div class="button-section">
                        <button class="orange-filled-btn" id="securityContinueBtn" disabled>
                            ${i18next.t('continue')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

	tabContent.innerHTML = html;

window.mereos.shadowRoot.getElementById('securityContinueBtn')?.addEventListener('click', () => {
	registerEvent({ eventType: 'success', notify: false, eventName: 'browser_security_passed' });
	updatePersistData('preChecksSteps', { browserSecurity: true });
	showTab('Prevalidationinstruction');
});

addSecurityItemClickEvents();
};

const createSecurityItemHTML = (id, label) => {
	const statusIconMap = {
		extensions: 'extension-gray-icon.svg',
		incognito: 'incognito-gray.svg'
	};

	return `
    <div class="diagnostic-item grey-box" id="${id}SecurityItem">
        <div class="grey-box-right">
            <img id="${id}StatusIcon" src="${ASSET_URL}/${statusIconMap[id] || 'extension-gray-icon.svg'}" alt="">
            <label>${label}</label>
        </div>
        <div class="grey-box-left">
            <img id="${id}StatusLoading" src="${ASSET_URL}/loading-gray.svg" alt="">
        </div>
    </div>
    `;
};

const addSecurityItemClickEvents = () => {
	const handleSecurityItemClick = (id, checkFunction) => {
		const element = window.mereos.shadowRoot.getElementById(`${id}SecurityItem`);
		if (!element) {
			return;
		}
        
		element.addEventListener('click', async () => {
			const result = await checkFunction();
			setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, result);
			updateContinueButtonState();
		});
	};

	handleSecurityItemClick('extensions', checkExtensions);
	handleSecurityItemClick('incognito', checkIncognitoMode);
};

const setElementStatus = (id, status, isSuccess) => {
    
    const securityItem = window.mereos?.shadowRoot?.getElementById(`${id}SecurityItem`);
    const statusIcon = window.mereos?.shadowRoot?.getElementById(`${id}StatusIcon`);
    const statusLoading = window.mereos?.shadowRoot?.getElementById(`${id}StatusLoading`);
    
    if (!securityItem || !statusIcon || !statusLoading) {
        return;
    }

    securityItem.dataset.checkCompleted = 'true';
    securityItem.dataset.checkSuccess = isSuccess.toString();
    
    statusIcon.src = isSuccess ? status.success : status.failure;
    statusLoading.src = isSuccess ? `${ASSET_URL}/checkmark-rounded-green.png` : `${ASSET_URL}/x-circle.png`;
};

const updateContinueButtonState = () => {    
    if (!window.mereos?.shadowRoot) {
        return;
    }

    const continueBtn = window.mereos.shadowRoot.getElementById('securityContinueBtn');
    if (!continueBtn) {
        return;
    }

    const securityItems = window.mereos.shadowRoot.querySelectorAll('#extensionsSecurityItem, #incognitoSecurityItem');
    
    if (securityItems.length === 0) {
        continueBtn.disabled = false;
        return;
    }

    let allSecurityChecksPassed = true;
    
    Array.from(securityItems).forEach(item => {
        const itemId = item.id;
        const isCompleted = item.dataset.checkCompleted === 'true';
        const isSuccess = item.dataset.checkSuccess === 'true';

        if (!isCompleted || !isSuccess) {
            allSecurityChecksPassed = false;
        } else {
            logger.success(`✅ ${itemId} passed check`);
        }
    });

    continueBtn.disabled = !allSecurityChecksPassed;
};

const detectExtension = async (extension) => {
	try {
		const url = `chrome-extension://${extension.id}/${extension.file}`;
		const controller = new AbortController();

		const response = await fetch(url, {
			method: 'HEAD',
			signal: controller.signal
		});

		return { 
			...extension, 
			detected: true,
			status: response.status 
		};
	} catch (error) {
		return { 
			...extension, 
			detected: false,
			error: error.name 
		};
	}
};

const checkExtensions = async () => {
	try {
		const extensionArray = Object.entries(EXTENSIONS_LIST || {}).map(([id, data]) => ({
			id,
			name: data.name,
			file: data.file
		}));

		const results = await Promise.allSettled(
			extensionArray.map(ext => detectExtension(ext))
		);

		const detected = results
			.filter(r => r.status === 'fulfilled' && r.value.detected)
			.map(r => r.value);

		if (detected.length > 0) {
			registerEvent({ eventType: 'error', notify: false, eventName: 'extensions_detected' });
			showToast('error', i18next.t('please_disable_your_browser_extensions'));
			return false;
		} else {
			return true;
		}
	} catch (error) {
		logger.error('Extension check failed:', error);
		registerEvent({ eventType: 'error', notify: false, eventName: 'extension_check_failed' });
		return false;
	}
};

const checkIncognitoMode = async () => {
	try {
		const { isPrivate, browserName } = await detectIncognito();

		if (!isPrivate) {
			registerEvent({
				eventType: 'error',
				notify: false,
				eventName: 'standard_browser_mode_detected',
				details: { browserName }
			});
			showToast('error', i18next.t('please_open_incognito_mode_to_continue'));
			return false;
		} else {
			registerEvent({
				eventType: 'success',
				notify: false,
				eventName: 'incognito_mode_detected',
				details: { browserName }
			});
			return true;
		}
	} catch (error) {
		logger.error('Incognito detection failed:', error);
		return true;
	}
};

export const BrowserSecurity = async (tabContent) => {
	if (!tabContent) {
		logger.error('Element for browser security check not found.');
		return;
	}

	logger.success('Browser security check initialized');
	renderUI(tabContent);

	try {
		const candidateAssessment = getSecureFeatures();
		const secureFeatures = candidateAssessment?.entities || [];
		const checkExtension = secureFeatures.some(entity => entity.key === 'disable_tampering');
		const checkIncognito = secureFeatures.some(entity => entity.key === 'allow_incognito_mode');

		const promises = [];

		if (checkExtension) {
			promises.push(checkExtensions().then(result => {
				setElementStatus('extensions', { success: extensionGreen, failure: extensionRed }, result);
				return result;
			}));
		} else {
			setElementStatus('extensions', { success: extensionGreen, failure: extensionRed }, true);
		}

		if (checkIncognito) {
			promises.push(checkIncognitoMode().then(result => {
				setElementStatus('incognito', { success: incognitoGreen, failure: incognitoRed }, result);
				return result;
			}));
		} else {
			setElementStatus('incognito', { success: incognitoGreen, failure: incognitoRed }, true);
		}

		await Promise.all(promises);
		setTimeout(() => {
			updateContinueButtonState();
		}, 100);
    
	} catch (error) {
		logger.error('Error running browser security checks:', error);
	}
};

const updateSecurityText = () => {
	if (!window.mereos || !window.mereos.shadowRoot) return;
    
	const securityItems = ['detect_extensions', 'allow_incognito_mode'];

	securityItems.forEach(item => {
		const labelElement = window.mereos.shadowRoot.querySelector(`#${item}SecurityItem label`);
		if (labelElement) {
			labelElement.textContent = i18next.t(item);
		}
	});

	const heading = window.mereos.shadowRoot.querySelector('.heading');
	if (heading) {
		heading.textContent = i18next.t('browser_security_check');
	}

	const description = window.mereos.shadowRoot.querySelector('.description');
	if (description) {
		description.textContent = i18next.t('browser_security_check_msg');
	}
    
	const btnText = window.mereos.shadowRoot.querySelector('.orange-filled-btn');
	if (btnText) {
		btnText.textContent = i18next.t('continue');
	}
};

i18next.on('languageChanged', () => {
	updateSecurityText();
});