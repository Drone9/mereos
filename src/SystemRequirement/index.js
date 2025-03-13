import i18next from 'i18next';

import { 
  getCPUInfo, 
  getNetworkDownloadSpeed, 
  getNetworkUploadSpeed, 
  getRAMInfo, 
  getSecureFeatures, 
  logger, 
  registerEvent, 
  updatePersistData 
} from '../utils/functions';
import { ASSET_URL } from '../utils/constant';
import { showTab } from '../ExamsPrechecks';

import '../assets/css/system-reqiurements.css';

const ramGreen = `${ASSET_URL}/ram-icon-green.svg`;
const cpuGreen = `${ASSET_URL}/cpu-icon-green.svg`;
const uploadSpeedGreen = `${ASSET_URL}/upload-speed-green.svg`;
const downloadSpeedGreen = `${ASSET_URL}/download-speed-green.svg`;
const ramRed = `${ASSET_URL}/ram-icon-red.svg`;
const cpuRed = `${ASSET_URL}/cpu-icon-red.svg`;
const uploadSpeedRed = `${ASSET_URL}/upload-speed-red.svg`;
const downloadSpeedRed = `${ASSET_URL}/download-speed-red.svg`;

const createDiagnosticItem = (id, label) => {
  const diagnosticItem = document.createElement('div');
  diagnosticItem.classList.add('diagnostic-item', 'grey-box');
  diagnosticItem.id = `${id}DiagnosticItem`;

  const greyBoxRight = document.createElement('div');
  greyBoxRight.classList.add('grey-box-right');

  const statusIcon = document.createElement('img');
  statusIcon.id = `${id}StatusIcon`;
  statusIcon.src = `${ASSET_URL}/video-camera-light-gray.svg`;
  statusIcon.alt = '';

  const labelElement = document.createElement('label');
  labelElement.textContent = label;

  const greyBoxLeft = document.createElement('div');
  greyBoxLeft.classList.add('grey-box-left');

  const loadingIcon = document.createElement('img');
  loadingIcon.id = `${id}StatusLoading`;
  loadingIcon.src = `${ASSET_URL}/loading-gray.svg`;
  loadingIcon.alt = '';

  greyBoxRight.appendChild(statusIcon);
  greyBoxRight.appendChild(labelElement);
  greyBoxLeft.appendChild(loadingIcon);
  diagnosticItem.appendChild(greyBoxRight);
  diagnosticItem.appendChild(greyBoxLeft);

  return diagnosticItem;
};

const renderUI = (tab1Content) => {
  tab1Content.innerHTML = '';

  const container = document.createElement('div');
  container.classList.add('system-requirement-test-screen');

  const heading = document.createElement('h1');
  heading.classList.add('heading');
  heading.textContent = i18next.t('system_requirements');

  const diagnosticStatus = document.createElement('div');
  diagnosticStatus.classList.add('diagnostic-status', 'container-box');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('container');

  const containerTop = document.createElement('div');
  containerTop.classList.add('container-top');

  const description = document.createElement('label');
  description.classList.add('description');
  description.textContent = i18next.t('system_requirement_checking_msg');

  const containerMiddle = document.createElement('div');
  containerMiddle.classList.add('container-middle', 'box-section');

  const diagnosticItems =  ['ram', 'cpu', 'upload_speed', 'download_speed'];
  diagnosticItems.forEach(item => {
    const label = i18next.t(item);
    const diagnosticItem = createDiagnosticItem(item, label);
    containerMiddle.appendChild(diagnosticItem);
  });

  const buttonSection = document.createElement('div');
  buttonSection.classList.add('button-section');

  const continueBtn = document.createElement('button');
  continueBtn.classList.add('orange-filled-btn');
  continueBtn.id = 'diagnosticContinueBtn';
  continueBtn.disabled = true;
  continueBtn.textContent = 'Continue';
  continueBtn.addEventListener('click', () => {
    registerEvent({ eventType: 'success', notify: false, eventName: 'system_requirement_passed' });
    updatePersistData('preChecksSteps',{ requirementStep:true });
    showTab('Prevalidationinstruction');
  });
  buttonSection.appendChild(continueBtn);
  innerContainer.append(containerTop, description, containerMiddle, buttonSection);
  diagnosticStatus.appendChild(innerContainer);
  container.append(heading, diagnosticStatus);
  tab1Content.appendChild(container);
};

export const SystemRequirement = async (tab1Content) => {
  if (!tab1Content) {
    logger.error('Element with id "SystemRequirements" not found.');
    return;
  }
  renderUI(tab1Content);

  const setElementStatus = (id, status, isSuccess) => {
    const statusIcon = document.getElementById(`${id}StatusIcon`);
    const statusLoading = document.getElementById(`${id}StatusLoading`);
    if (!statusIcon || !statusLoading) {
      return;
    }
    statusIcon.src = isSuccess ? status.success : status.failure;
    statusLoading.src = isSuccess ? `${ASSET_URL}/checkmark-rounded-green.png` : `${ASSET_URL}/x-circle.png`;
  };

  const handleDiagnosticItemClick = (id, checkFunction) => {
    const element = document.getElementById(`${id}DiagnosticItem`);
    if (!element) {
      return;
    }
    element.addEventListener('click', async () => {
      const result = await checkFunction();
      setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, result);
      updateContinueButtonState();
    });
  };

  const updateContinueButtonState = () => {
    const continueButton = document.getElementById('diagnosticContinueBtn');
    const allDiagnosticsPassed = Object.keys(successIconMap).every(item => {	
        const currentIconSrc = document.getElementById(`${item}StatusIcon`)?.src;
        if (!currentIconSrc) {
            return false;
        }
  
        const currentIconPathname = new URL(currentIconSrc).pathname;
        const expectedIconPathname = new URL(successIconMap[item]).pathname;
        return currentIconPathname === expectedIconPathname;
    });
    
    if(continueButton){
      continueButton.disabled = !allDiagnosticsPassed;
    }
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
        const isGoodRam = resp?.capacity > profileSettings?.ram_size || 2;
        setElementStatus('ram', { success: ramGreen, failure: ramRed }, isGoodRam);
        handleDiagnosticItemClick('ram', getRAMInfo);
        return isGoodRam;
      }));
    } else {
      setElementStatus('ram', { success: ramGreen, failure: ramRed }, true);
    }

    if (verifyCPU) {
      promises.push(getCPUInfo().then(resp => {
        const isGoodCpu = resp?.noOfPrcessor > profileSettings?.cpu_size || 1.0;
        setElementStatus('cpu', { success: cpuGreen, failure: cpuRed }, isGoodCpu);
        handleDiagnosticItemClick('cpu', getCPUInfo);
        return isGoodCpu;
      }));
    } else {
      setElementStatus('cpu', { success: cpuGreen, failure: cpuRed }, true);
    }

    if (verifyUploadSpeed) {
      promises.push(getNetworkUploadSpeed().then(network => {
        const isGoodUpload = network.speedMbps > profileSettings?.upload_speed || 0.168;
        setElementStatus('upload_speed', { success: uploadSpeedGreen, failure: uploadSpeedRed }, isGoodUpload);
        handleDiagnosticItemClick('upload_speed', getNetworkUploadSpeed);
        return isGoodUpload;
      }));
    } else {
      setElementStatus('upload_speed', { success: uploadSpeedGreen, failure: uploadSpeedRed }, true);
    }

    if (verifyDownloadSpeed) {
      promises.push(getNetworkDownloadSpeed().then(network => {
        const isGoodDownload = network.speedMbps > profileSettings?.download_speed || 0.168;
        setElementStatus('download_speed', { success: downloadSpeedGreen, failure: downloadSpeedRed }, location);
        handleDiagnosticItemClick('download_speed', getNetworkDownloadSpeed);
        return isGoodDownload;
      }));
    } else {
      setElementStatus('download_speed', { success: downloadSpeedGreen, failure: downloadSpeedRed }, true);
    }

    await Promise.all(promises);

   setTimeout(() => {
      updateContinueButtonState();
    }, 500);

  } catch (error) {
    logger.error('Error running diagnostics:', error);
  }
};

const updateDiagnosticText = () => {
  const diagnosticItems = ['ram', 'cpu', 'upload_speed', 'download_speed'];

  diagnosticItems.forEach(item => {
    const labelElement = document.querySelector(`#${item}DiagnosticItem label`);
    if (labelElement) {
      labelElement.textContent = i18next.t(item);
    }
  });

  const heading = document.querySelector('.heading');
  if (heading) {
    heading.textContent = i18next.t('system_requirements');
  }

  const description = document.querySelector('.description');
  if (description) {
    description.textContent = i18next.t('system_requirement_checking_msg');
  }
};

i18next.on('languageChanged', () => {
  updateDiagnosticText();
});
