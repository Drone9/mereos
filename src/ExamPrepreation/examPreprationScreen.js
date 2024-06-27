import '../assets/css/exam-prepration.css';
import readingBook from '../assets/images/oc-reading-book.png';
import addressIcon from '../assets/images/oc-address.svg';
import lightBulb from '../assets/images/oc-lightbulb.svg';
import megaphone from '../assets/images/oc-megaphone.svg';
import stackBook from '../assets/images/stacked-up-books.svg';
import vector1 from '../assets/images/vector-1.png';
import vector2 from '../assets/images/vector-2.png';
import vector3 from '../assets/images/vector-3.png';
import { showTab } from './examPrechecks';
import { addSectionSessionRecord, convertDataIntoParse, registerEvent, updatePersistData } from '../utils/functions';
import { initialSessionData } from '../utils/constant';
import { changeCandidateAssessmentStatus } from '../services/candidate-assessment.services';
import { changeCandidateInviteAssessmentSectionStatus } from '../services/candidate-invite-assessment-section.services';

const translations = {
  exam_preparation: 'Exam Preparation',
  icc_msg: 'Please read the instructions carefully before proceeding to the exam.',
  continue: 'Continue'
};

const t = (key) => translations[key];

const vectors = [
  { name: 'img1', src: `${addressIcon}`, alt: '' },
  { name: 'img2', src: `${lightBulb}`, alt: '' },
  { name: 'img3', src: `${megaphone}`, alt: '' },
  { name: 'img4', src: `${stackBook}`, alt: '' },
  { name: 'img5', src: `${vector2}`, alt: '' },
  { name: 'img6', src: `${vector1}`, alt: '' },
  { name: 'img7', src: `${vector3}`, alt: '' },
  { name: 'img8', src: `${vector1}`, alt: '' }
];

const getDateTime = () => new Date().toISOString();

const nextPage = () => {
  registerEvent({ eventType: 'success', notify: false, eventName: 'terms_and_conditions_read', eventValue: getDateTime() });
  showTab('runSystemDiagnostics')
};


export const ExamPreparation = async (tabContent) => {
  if (!tabContent) {
      console.error('tabContent is not defined or is not a valid DOM element');
      return;
  }
  const session = convertDataIntoParse('session')

  !session && localStorage.setItem('session',JSON.stringify(initialSessionData))
  const startSession = async () => {
    const candidateInviteAssessmentSection = convertDataIntoParse('candidateAssessment');
    console.log('session___',session);
    const resp = await addSectionSessionRecord(session, candidateInviteAssessmentSection);
    if (resp?.data) {
      updatePersistData('session',{ sessionId: resp?.data?.session_id,id: resp?.data?.id })
      registerEvent({eventType: 'success', notify: false, eventName: 'session_initiated'});
    }

    const candidateAssessmentResp = await changeCandidateAssessmentStatus({id: candidateInviteAssessmentSection?.candidate_assessment?.assessment?.id, status: 'Attending'});
						
    // Updating Invite status
    const candidateInviteAssessmentSectionResp = await changeCandidateInviteAssessmentSectionStatus({id: candidateInviteAssessmentSection.id, status: 'Initiated'});

    console.log(resp, candidateAssessmentResp, candidateInviteAssessmentSectionResp);
    updatePersistData('session',
      { 
      id: resp.data.id,
      sessionStatus: candidateInviteAssessmentSectionResp.data.status
      });
  }

  startSession();

  tabContent.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'exam-preparation';

  const examPreparationContainer = document.createElement('div');
  examPreparationContainer.className = 'exam-preparation-container';

  const headerImg = document.createElement('img');
  headerImg.className = 'header-img';
  headerImg.src = `${readingBook}`;
  headerImg.alt = 'header-img';
  examPreparationContainer.appendChild(headerImg);

  const title = document.createElement('h1');
  title.textContent = t('exam_preparation');
  examPreparationContainer.appendChild(title);

  const msgLabel = document.createElement('label');
  msgLabel.className = 'ep-msg';
  msgLabel.textContent = t('icc_msg');
  examPreparationContainer.appendChild(msgLabel);

  const continueButton = document.createElement('button');
  continueButton.className = 'orange-filled-btn';
  continueButton.textContent = t('continue');
  continueButton.style.marginTop = '30px';
  continueButton.style.justifyContent = 'center';
  continueButton.addEventListener('click', nextPage);
  examPreparationContainer.appendChild(continueButton);

  container.appendChild(examPreparationContainer);

  const bgImagesContainer = document.createElement('div');
  bgImagesContainer.className = 'bg-images';

  vectors.forEach((vector, index) => {
      const vectorImg = document.createElement('img');
      vectorImg.className = vector.name;
      vectorImg.src = vector.src;
      vectorImg.alt = vector.alt;
      bgImagesContainer.appendChild(vectorImg);
  });

  container.appendChild(bgImagesContainer);

  tabContent.appendChild(container);

  const styleElement = document.createElement('style');
  styleElement.textContent = `
      .exam-preparation {
          /* Define your CSS styles here */
      }
      .exam-preparation-container {
          /* Define your CSS styles here */
      }
      /* Define other classes as needed */
  `;
  document.head.appendChild(styleElement);
};