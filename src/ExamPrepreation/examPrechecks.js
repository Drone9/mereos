import '../assets/css/modal.css';
import { runSystemDiagnostics } from './systemdiagnostic';
import { IdentityVerificationScreenOne } from './identityVerificationScreenOne';
import { IdentityVerificationScreenTwo } from './identityVerificationScreenTwo';
import { IdentityVerificationScreenThree } from './identityVerificationScreenThree';
import { IdentityVerificationScreenFour } from './identityVerificationScreenFour';
import { IdentityVerificationScreenFive } from './IdentityVerificationScreenFive';
import { ExamPreparation } from './examPreprationScreen';
import { getCandidateAssessment } from '../utils/functions';

const modal = document.createElement('div');
modal.className = 'modal';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';

const closeModalButton = document.createElement('span');
closeModalButton.className = 'close';
closeModalButton.textContent = '×';
closeModalButton.onclick = closeModal;

modalContent.appendChild(closeModalButton);
modal.appendChild(modalContent);

const tabsContainer = document.createElement('div');
tabsContainer.className = 'tabs-container';

const tab1 = document.createElement('div');
tab1.className = 'tab';
tab1.textContent = 'Exam Prepration';
tab1.dataset.tab = 'ExamPreparation';
// tab1.onclick = () => showTab('tab1');

const tab2 = document.createElement('div');
tab2.className = 'tab';
tab2.textContent = 'System Diagnostics';
tab2.dataset.tab = 'runSystemDiagnostics';
// tab2.onclick = () => showTab('tab2');

const tab3 = document.createElement('div');
tab3.className = 'tab';
tab3.textContent = 'Identity Verification';
tab3.dataset.tab = 'IdentityVerificationScreenOne';
// tab3.onclick = () => showTab('tab3');

const tab4 = document.createElement('div');
tab4.className = 'tab';
tab4.textContent = 'Identity Validation';
tab4.dataset.tab = 'IdentityVerificationScreenTwo';
tab4.onclick = () => showTab('IdentityVerificationScreenTwo');

const tab5 = document.createElement('div');
tab5.className = 'tab';
tab5.textContent = 'Audio Validation';
tab5.dataset.tab = 'IdentityVerificationScreenThree';
tab5.onclick = () => showTab('IdentityVerificationScreenThree');

const tab6 = document.createElement('div');
tab6.className = 'tab';
tab6.textContent = 'Room Scan';
tab6.dataset.tab = 'IdentityVerificationScreenFour';
tab6.onclick = () => showTab('IdentityVerificationScreenFour');

const tab7 = document.createElement('div');
tab7.className = 'tab';
tab7.textContent = 'Screen Share';
tab7.dataset.tab = 'IdentityVerificationScreenFive';
tab7.onclick = () => showTab('IdentityVerificationScreenFive');

tabsContainer.appendChild(tab1);
tabsContainer.appendChild(tab2);
tabsContainer.appendChild(tab3);
tabsContainer.appendChild(tab4);
tabsContainer.appendChild(tab5);
tabsContainer.appendChild(tab6);
tabsContainer.appendChild(tab7);

modalContent.appendChild(tabsContainer);

const tabContentsWrapper = document.createElement('div');
tabContentsWrapper.className = 'tab-contents-wrapper';

const tabContent1 = document.createElement('div');
tabContent1.className = 'tab-content';
tabContent1.id = 'ExamPreparation';

const tabContent2 = document.createElement('div');
tabContent2.className = 'tab-content';
tabContent2.id = 'runSystemDiagnostics';

const tabContent3 = document.createElement('div');
tabContent3.className = 'tab-content';
tabContent3.id = 'IdentityVerificationScreenOne';

const tabContent4 = document.createElement('div');
tabContent4.className = 'tab-content';
tabContent4.id = 'IdentityVerificationScreenTwo';

const tabContent5 = document.createElement('div');
tabContent5.className = 'tab-content';
tabContent5.id = 'IdentityVerificationScreenThree';

const tabContent6 = document.createElement('div');
tabContent6.className = 'tab-content';
tabContent6.id = 'IdentityVerificationScreenFour';

const tabContent7 = document.createElement('div');
tabContent7.className = 'tab-content';
tabContent7.id = 'IdentityVerificationScreenFive';

tabContentsWrapper.appendChild(tabContent1);
tabContentsWrapper.appendChild(tabContent2);
tabContentsWrapper.appendChild(tabContent3);
tabContentsWrapper.appendChild(tabContent4);
tabContentsWrapper.appendChild(tabContent5);
tabContentsWrapper.appendChild(tabContent6);
tabContentsWrapper.appendChild(tabContent7);

modalContent.appendChild(tabContentsWrapper);

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

function openModal() {
    document.body.appendChild(modal);
    modal.style.display = 'block';
    showTab('ExamPreparation');
}

function closeModal() {
    modal.style.display = 'none';
    modal.remove();
}

const showTab = async (tabId) => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabId) {
            tab.classList.add('active');
        }
    });

    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
    

    if(tabId === 'ExamPreparation') {
        await ExamPreparation(tabContent1);
    }
    if (tabId === 'runSystemDiagnostics') {
        runSystemDiagnostics();
    }
    if (tabId === 'IdentityVerificationScreenOne') {
        await IdentityVerificationScreenOne(tabContent3);
    }
    if (tabId === 'IdentityVerificationScreenTwo') {
        await IdentityVerificationScreenTwo(tabContent4);
    } 
    if(tabId === 'IdentityVerificationScreenThree') {
        await IdentityVerificationScreenThree(tabContent5);
    }
    if(tabId === 'IdentityVerificationScreenFour') {
        await IdentityVerificationScreenFour(tabContent6);
    }
    if(tabId === 'IdentityVerificationScreenFive') {
        await IdentityVerificationScreenFive(tabContent7);
    }
    
}

export { openModal, closeModal, modalContent, showTab };
