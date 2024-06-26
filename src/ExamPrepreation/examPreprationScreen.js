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

const getDateTime = () => new Date().toISOString(); // Simplified example of getDateTime function

const registerEvent = (event) => {
  console.log('Event registered:', event);
  // Implement the actual event registration logic here
};

const nextPage = () => {
  registerEvent({ eventType: 'success', notify: false, eventName: 'terms_and_conditions_read', eventValue: getDateTime() });
  showTab('tab2')
};


export const ExamPreparation = async (tabContent) => {
  if (!tabContent) {
      console.error('tabContent is not defined or is not a valid DOM element');
      return;
  }

  // Clear previous content
  tabContent.innerHTML = '';

  // Main container
  const container = document.createElement('div');
  container.className = 'exam-preparation';

  // Exam preparation container
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

  // Background images container
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

  // Append the constructed component into the specified tabContent container
  tabContent.appendChild(container);

  // Append CSS styles (add them to a style tag or a separate stylesheet in actual implementation)
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