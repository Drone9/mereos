import i18next from 'i18next';
import '../assets/css/modal.css';
import { runSystemDiagnostics } from './systemdiagnostic';
import { IdentityVerificationScreenOne } from './identityVerificationScreenOne';
import { IdentityVerificationScreenTwo } from './identityVerificationScreenTwo';
import { IdentityVerificationScreenThree } from './identityVerificationScreenThree';
import { IdentityVerificationScreenFour } from './identityVerificationScreenFour';
import { IdentityVerificationScreenFive } from './IdentityVerificationScreenFive';
import { ExamPreparation } from './examPreprationScreen';
import { LanguageDropdown } from './languageDropdown';
import { addSectionSessionRecord, convertDataIntoParse, getSecureFeatures, handlePreChecksRedirection, registerEvent, updatePersistData } from '../utils/functions';
import { changeCandidateInviteAssessmentSectionStatus } from '../services/candidate-invite-assessment-section.services';
import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';
import germanyFlag from '../assets/images/flag-of-germany.svg';
import UKFlag from '../assets/images/flag-of-uk.svg';
import spainFlag from '../assets/images/flag-of-spain.svg';
import franceFlag from '../assets/images/flag-of-france.svg';
import brazilFlag from '../assets/images/flag-of-brazil.svg';
import italyFlag from '../assets/images/flag-of-italy.svg';
import whalesFlag from '../assets/images/flag-of-whales.svg';

const modal = document.createElement('div');
modal.className = 'modal';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';

modal.appendChild(modalContent);

const tabsContainer = document.createElement('div');
tabsContainer.className = 'tabs-container';

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

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

const navigate = (newTabId) => {
    showTab(newTabId);
};

function openModal() {
    document.body.appendChild(modal);
    modal.style.display = 'block';
    const activeTab = handlePreChecksRedirection();
    console.log('activeTab',activeTab);

    showTab(activeTab);
    const session = convertDataIntoParse('session');

    console.log('session', session);
    startSession(session);
    const header = document.createElement('div');
    header.className = 'header';

    const languageDropdown = LanguageDropdown([
        { name: 'English', value: 'english', src: `${UKFlag}`, alt: '', keyword: 'en' },
        { name: 'Spanish', value: 'spanish', src: `${spainFlag}`, alt: '', keyword: 'es' },
        { name: 'German', value: 'german', src: `${germanyFlag}`, alt: '', keyword: 'de' },
        { name: 'French', value: 'french', src: `${franceFlag}`, alt: '', keyword: 'fr' },
        { name: 'Portuguese (Brazil)', value: 'portuguese_brazil', src: `${brazilFlag}`, alt: '', keyword: 'pt' },
        { name: 'Italian', value: 'italian', src: `${italyFlag}`, alt: '', keyword: 'it' },
        { name: 'Welsh', value: 'welsh', src: `${whalesFlag}`, alt: '', keyword: 'cy' },
    ]);

    header.style.position = 'absolute';
    header.style.top = '10px';
    header.style.right = '10px';

    header.appendChild(languageDropdown);
    modalContent.insertBefore(header, modalContent.firstChild);
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

    const getSecureFeature = getSecureFeatures();
    const secureFeatures = getSecureFeature?.entities || [];
    console.log('secureFeatures',secureFeatures);

    const systemDiagnosticSteps = ['Verify Desktop', 'Record Video', 'Record Audio', 'Verify Connection', 'Track Location', 'Enable Notifications','Upload Speed'];

    console.log('tabId',tabId);
    if (tabId === 'ExamPreparation') {
        if (!secureFeatures?.find(entity => entity.name === "Examination Window")) {
            navigate('runSystemDiagnostics');
            return;
        }
        await ExamPreparation(tabContent1);
    } else if (tabId === 'runSystemDiagnostics') {
        if (!secureFeatures?.filter(entity => systemDiagnosticSteps.includes(entity.name))?.length) {
            navigate('IdentityVerificationScreenOne');
            return;
        }
        runSystemDiagnostics();
    } else if (tabId === 'IdentityVerificationScreenOne') {
        if (!secureFeatures?.find(entity => entity.name === 'Verify Candidate')) {
            navigate('IdentityVerificationScreenTwo');
            return;
        }
        await IdentityVerificationScreenOne(tabContent3);
    } else if (tabId === 'IdentityVerificationScreenTwo') {
        if (!secureFeatures?.find(entity => entity.key === 'identity_card_requirement')) {
            navigate('IdentityVerificationScreenThree');
            return;
        }
        await IdentityVerificationScreenTwo(tabContent4);
    } else if (tabId === 'IdentityVerificationScreenThree') {
        if (!secureFeatures?.find(entity => entity.name === 'record_audio')) {
            navigate('IdentityVerificationScreenFour');
            return;
        }
        await IdentityVerificationScreenThree(tabContent5);
    } else if (tabId === 'IdentityVerificationScreenFour') {
        if (!secureFeatures?.find(entity => entity.key === 'record_room')) {
            navigate('IdentityVerificationScreenFive');
            return;
        }
        await IdentityVerificationScreenFour(tabContent6);
    } else if (tabId === 'IdentityVerificationScreenFive') {
        if (!secureFeatures?.find(entity => entity.key === 'record_screen')) {
            closeModal();
            return;
        }
        await IdentityVerificationScreenFive(tabContent7);
    }
};

const startSession = async (session) => {
    const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
    console.log('candidateInviteAssessmentSection',candidateInviteAssessmentSection,'session',session);

    try {
        const resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);
        if (resp?.data) {
            updatePersistData('session', { sessionId: resp?.data?.session_id, id: resp?.data?.id });
            registerEvent({ eventType: 'success', notify: false, eventName: 'session_initiated' });
        }
        // const candidateAssessmentResp = await changeCandidateAssessmentStatus({ id: candidateInviteAssessmentSection?.candidate_assessment?.assessment?.id, status: 'Attending' });

        // const candidateInviteAssessmentSectionResp = await changeCandidateInviteAssessmentSectionStatus({ id: candidateInviteAssessmentSection.id, status: 'Initiated' });

        // console.log(resp, candidateAssessmentResp, candidateInviteAssessmentSectionResp);
        updatePersistData('session',
            {
                id: resp.data.id,
                sessionStatus: 'Initiated'
            });
    } catch (e) {
        console.log('error', e);
    }
};

const updateTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
    console.log('Translations updated');
};

i18next.init({
    lng: 'en',
    resources: {
        en: {
            translation: require('../assets/locales/en/translation.json')
        },
       
        fr: {
            translation: require('../assets/locales/fr/translation.json')
        },
       
    }
}, (err, t) => {
    if (err) return console.error(err);
    updateTranslations();
});


document.addEventListener('DOMContentLoaded', () => {
    updateTranslations();
});

export { openModal, closeModal, modalContent, showTab };
