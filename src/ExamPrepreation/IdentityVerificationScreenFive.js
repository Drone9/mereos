import { detectMultipleScreens, getCandidateAssessment, getDateTime, registerEvent, shareScreenFromContent, updatePersistData } from '../utils/functions';
import mockImage from '../assets/images/screen-recorder-mock.svg'
import '../assets/css/step5.css';
import { closeModal, showTab } from './examPrechecks';

const translations = {
  verification_completed: 'Verification Completed',
  verification_completed_msg: 'Your verification is now complete. Please share your entire screen.',
  please_share_entire_screen: 'Please share the entire screen.',
  screen_shared_successfully: 'Screen shared successfully',
  previous_step: 'Previous Step',
  done: 'Done',
  reshare_screen: 'Reshare Screen',
};

const t = (key) => translations[key];
export let newStream;

export const IdentityVerificationScreenFive = async (tabContent) => {
let multipleScreens;
  if (!tabContent) {
      console.error('tabContent is not defined or is not a valid DOM element');
      return;
  }

  let stream = null;
  let mode = 'startScreenRecording';
  let msg = {
      type: 'successful',
      text: t('please_share_entire_screen')
  };

  const checkMutipleScreens = async () => {
    const resp = detectMultipleScreens();
    if (resp) {
        multipleScreens = (true);
    } else {
        multipleScreens = (false);
        registerEvent({eventType: 'error', notify: false, eventName: 'multiple_screens_detected'});
    }
    };

  const shareScreen = async () => {
      try {
        newStream = await shareScreenFromContent();
          console.log('Screen sharing stream obtained:', newStream);
          updatePersistData('session',{ screenRecordingStream: location })

          if (newStream.getVideoTracks()[0].getSettings().displaySurface === 'monitor') {
              stream = newStream;
              mode = 'startScreenRecording';
              msg = {
                  type: 'successful',
                  text: t('screen_shared_successfully')
              };
              console.log('Screen shared successfully');
          } else {
              newStream.getVideoTracks()[0].stop();
              throw t('please_share_entire_screen');
          }
      } catch (err) {
          console.error('Error during screen sharing:', err);
          mode = 'rerecordScreen';
          msg = {
              type: 'unsuccessful',
              text: err
          };
      }
  };

  const nextStep = () => {
	  registerEvent({eventType: 'success', notify: false, eventName: 'screen_recording_window_shared', eventValue: getDateTime()});
      closeModal();
  };

  const prevStep = () => {
      if (stream) {
          stream.getVideoTracks()[0].stop();
      }
      showTab('IdentityVerificationScreenFour');
  };

  const container = document.createElement('div');
  container.classList.add('ivsf-container');

  const wrapper = document.createElement('div');
  wrapper.classList.add('ivsf-wrapper');

  const headerTitle = document.createElement('div');
  headerTitle.classList.add('ivsf-header-title');
  headerTitle.textContent = t('verification_completed');
  wrapper.appendChild(headerTitle);

  const msgElement = document.createElement('div');
  msgElement.classList.add('ivsf-msg');
  msgElement.textContent = t('verification_completed_msg');
  wrapper.appendChild(msgElement);

  const headerImg = document.createElement('img');
  headerImg.classList.add('ivsf-header-img');
  headerImg.src = `${mockImage}`;
  headerImg.alt = 'camera-icon';
  wrapper.appendChild(headerImg);

  if (msg.text) {
      const queryMsg = document.createElement('div');
      queryMsg.classList.add('ivsf-query-msg');
      queryMsg.textContent = msg.text;
      if (msg.type === 'unsuccessful') {
          queryMsg.style.color = '#E95E5E';
      }
      wrapper.appendChild(queryMsg);
  }

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('ivsf-btn-container');

  const prevButton = document.createElement('button');
  prevButton.className = 'orange-hollow-btn';
  prevButton.textContent = t('previous_step');
  prevButton.addEventListener('click', prevStep);
  btnContainer.appendChild(prevButton);

  if (mode === 'startScreenRecording') {
      const doneButton = document.createElement('button');
      doneButton.className = 'orange-filled-btn';
      doneButton.textContent = t('done');
      doneButton.disabled = multipleScreens;
      doneButton.addEventListener('click', nextStep);
      btnContainer.appendChild(doneButton);
  } else if (mode === 'rerecordScreen') {
      const reshareButton = document.createElement('button');
      reshareButton.className = 'orange-filled-btn';
      reshareButton.textContent = t('reshare_screen');
      reshareButton.addEventListener('click', shareScreen);
      btnContainer.appendChild(reshareButton);
  }

  wrapper.appendChild(btnContainer);
  container.appendChild(wrapper);

  const styleElement = document.createElement('style');
  styleElement.textContent = `
      .ivsf-container {
          /* Define your CSS styles here */
      }
      .ivsf-wrapper {
          /* Define your CSS styles here */
      }
      /* Define other classes as needed */
  `;
  container.appendChild(styleElement);

  tabContent.innerHTML = '';
  tabContent.appendChild(container);

  shareScreen();
  const candidateAssessment = getCandidateAssessment()
  const secureFeatures = candidateAssessment?.section?.secure_feature_profile?.entity_relation || [];
  console.log('secureFeatures',secureFeatures);
  let multipleScreensCheck = secureFeatures.find(entity => entity.name === 'Verify Desktop');
  console.log('multipleScreensCheck',multipleScreensCheck);

  multipleScreensCheck && checkMutipleScreens();
  return container;
};
