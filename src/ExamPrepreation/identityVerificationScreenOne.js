import { dataURIToBlob, registerEvent, uploadFileInS3Folder } from '../utils/functions';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '../assets/css/step1.css';
import greenCheckMark from '../assets/images/checkmark-green.svg';
import closeRed from '../assets/images/close-red.svg';
import screenCenter from '../assets/images/screen-centered-grid.svg';
import { showTab } from './examPrechecks';
import * as tf from '@tensorflow/tfjs';

export const IdentityVerificationScreenOne = async (tabContent) => {
  let state = {
      captureMode: 'take',
      imageSrc: null,
      videoConstraints: {
          video: localStorage.getItem('deviceId') ? { deviceId: { exact: localStorage.getItem('deviceId') } } : true,
          width: 640,
          height: 480,
          facingMode: 'user',
          deviceId: localStorage.getItem('deviceId') || undefined,
      },
      msg: {
          type: 'checking',
          text: 'Center your face',
      },
  };

  let net = null;
  let loadModels = false;
  let webcamStream = null;
  let videoElement = null;

  const PREDICTION = {
      FACE: 'person',
  };

  const loadModelsAsync = async () => {
      try {
            loadModels = true;
            await tf.setBackend('webgl');
		    await tf.ready();
            const liveNet = await cocoSsd?.load();
            net = liveNet;
      } catch (e) {
          console.log('Error loading models:', e);
      } finally {
          loadModels = false;
      }
  };

  const startWebcam = async () => {
      try {
          videoElement = document.createElement('video');
          videoElement.width = state.videoConstraints.width;
          videoElement.height = state.videoConstraints.height;
          videoElement.autoplay = true;
          videoElement.style.transform = 'scaleX(-1)';
          const stream = await navigator.mediaDevices.getUserMedia(state.videoConstraints);
          videoElement.srcObject = stream;
          webcamStream = stream;
          if (tabContent) {
              const ivsoWebcamContainer = tabContent.querySelector('.ivso-webcam-container');
              if (ivsoWebcamContainer) {
                  ivsoWebcamContainer.innerHTML = '';
                  ivsoWebcamContainer.appendChild(videoElement);
              }
          }
      } catch (err) {
          console.error('Error accessing webcam:', err);
      }
  };

  const capturePhoto = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const imageSrc = canvas.toDataURL('image/jpeg');
      state = {
          ...state,
          captureMode: 'retake',
          imageSrc: imageSrc,
          msg: {
              type: 'checking',
              text: 'Please wait, we are processing',
          },
      };
      renderUI();
      handleImageProcessing();
  };

  const handleImageProcessing = async () => {
      if (state.imageSrc) {
          // Use TensorFlow model to detect faces
          const img = new Image();
          img.onload = async function () {
              const predictions = await net?.detect(img);

              const isFaceDetected = predictions?.find(prediction => prediction.class === PREDICTION.FACE && prediction.score > 0.67);
              const isMultipleFacesDetected = predictions?.filter(prediction => prediction.class === PREDICTION.FACE).length > 1;

              if (isFaceDetected) {
                  state = {
                      ...state,
                      imageSrc: state.imageSrc,
                      msg: {
                          type: 'successful',
                          text: 'Detected face successfully',
                      },
                  };
                  // registerEvent({ eventType: 'success', notify: false, eventName: 'detected_face_successfully' });
              } else if (isMultipleFacesDetected) {
                  state = {
                      ...state,
                      imageSrc: null,
                      captureMode: 'take',
                      msg: {
                          type: 'unsuccessful',
                          text: 'Multiple faces detected',
                      },
                  };
                  // registerEvent({ eventType: 'success', notify: false, eventName: 'multiple_face_detected' });
              } else {
                  state = {
                      ...state,
                      imageSrc: null,
                      captureMode: 'take',
                      msg: {
                          type: 'unsuccessful',
                          text: 'Face not detected',
                      },
                  };
                  // registerEvent({ eventType: 'success', notify: false, eventName: 'face_not_detected' });
              }
              renderUI();
          };
          img.src = state.imageSrc;
      }
  };

  const nextStep = () => {
    showTab('tab4');
      // registerEvent({ eventType: 'success', notify: false, eventName: 'candidate_photo_captured_successfully' });
  };

  const uploadUserCapturedPhoto = async () => {
    console.log('uploadUserCapturedPhoto');
      try {
          state = {
              ...state,
              msg: {
                  type: 'loading',
                  text: 'File is being uploaded',
              },
          };
          console.log('in the try function');
          let resp = await uploadFileInS3Folder({
              folderName: 'candidate_images',
              file: dataURIToBlob(state.imageSrc),
          });
          if (resp?.data?.file_url) {
              state = {
                  ...state,
                  captureMode: 'uploaded_photo',
                  msg: {
                      type: 'waiting',
                      text: 'Candidate photo uploaded successfully',
                  },
              };
              // registerEvent({ eventType: 'success', notify: false, eventName: 'candidate_photo_uploaded_successfully' });
          } else {
              throw 'internet_connection_unstable';
          }
      } catch (e) {
          state = {
              ...state,
              captureMode: 'take',
              imageSrc: null,
              msg: {
                  type: 'checking',
                  text: 'Something went wrong. Please upload again.',
              },
          };
          // registerEvent({ eventType: 'error', notify: false, eventName: 'internet_connection_unstable' });
      }
      renderUI();
  };

  const renderUI = () => {
      let ivsoContainer = tabContent.querySelector('.ivso-container');
      if (!ivsoContainer) {
          ivsoContainer = document.createElement('div');
          ivsoContainer.className = 'ivso-container';
          tabContent.appendChild(ivsoContainer);
      }

      ivsoContainer.innerHTML = '';

      const ivsoWrapper = document.createElement('div');
      ivsoWrapper.className = 'ivso-wrapper';

      const ivsHeaderTitle = document.createElement('div');
      ivsHeaderTitle.className = 'ivso-header-title';
      ivsHeaderTitle.textContent = 'Identity Verification';

      const ivsMsg = document.createElement('div');
      ivsMsg.className = 'ivso-msg';
      ivsMsg.textContent = state.msg.text;

      if (!webcamStream) {
          startWebcam();
      }
      
      const ivsoWebcamContainer = document.createElement('div');
      ivsoWebcamContainer.className = 'ivso-webcam-container';

      const ivsoHeaderImgContainer = document.createElement('div');
      ivsoHeaderImgContainer.className = 'ivso-header-img-container';

      const ivsoBtnContainer = document.createElement('div');
      ivsoBtnContainer.className = 'ivso-btn-container';

      const ivsoQueryMsg = document.createElement('div');
      ivsoQueryMsg.className = 'ivso-query-msg';
      ivsoQueryMsg.textContent = 'Did the photo turn out to be a bit blurry? Please try again.';

      if (state.msg.type === 'successful' || state.msg.type === 'unsuccessful') {
          const resultImg = document.createElement('img');
          resultImg.className = 'ivso-header-img-result';
          if (state.msg.type === 'successful') {
              resultImg.src = `${greenCheckMark}`;
          } else if (state.msg.type === 'unsuccessful') {
              resultImg.src = `${closeRed}`;
          }
          ivsoHeaderImgContainer.appendChild(resultImg);
      } else {
          ivsoWebcamContainer.appendChild(videoElement);

          const gridImg = document.createElement('img');
          gridImg.src = `${screenCenter}`;
          gridImg.className = 'ivso-screen-grid';
          ivsoHeaderImgContainer.appendChild(gridImg);
      }

      if (state.captureMode === 'take') {
          const takePhotoBtn = document.createElement('button');
          takePhotoBtn.textContent = 'Take Photo';
          takePhotoBtn.className = 'orange-filled-btn';
          takePhotoBtn.addEventListener('click', capturePhoto);
          ivsoBtnContainer.appendChild(takePhotoBtn);
      } else if(state.captureMode === 'uploaded_photo'){
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.className = 'orange-filled-btn';
        nextBtn.addEventListener('click', nextStep);
        ivsoBtnContainer.appendChild(nextBtn);
      }else {
        const retakePhotoBtn = document.createElement('button');
        retakePhotoBtn.textContent = 'Retake Photo';
        retakePhotoBtn.className = 'orange-hollow-btn';
        retakePhotoBtn.addEventListener('click', () => {
            state = {
                ...state,
                imageSrc: null,
                captureMode: 'take',
                videoConstraints: {
                    ...state.videoConstraints,
                    deviceId: localStorage.getItem('deviceId') || undefined,
                },
                msg: {
                    type: 'checking',
                    text: 'Center your face',
                },
            };
            renderUI();
        
            startWebcam();        
          });
          ivsoBtnContainer.appendChild(retakePhotoBtn);

          const uploadPhotoBtn = document.createElement('button');
          uploadPhotoBtn.textContent = 'Upload Photo';
          uploadPhotoBtn.className = 'orange-filled-btn';
          uploadPhotoBtn.addEventListener('click', uploadUserCapturedPhoto);
          ivsoBtnContainer.appendChild(uploadPhotoBtn);
      }

      ivsoWrapper.appendChild(ivsHeaderTitle);
      ivsoWrapper.appendChild(ivsMsg);
      ivsoWrapper.appendChild(ivsoHeaderImgContainer);
      ivsoWrapper.appendChild(ivsoWebcamContainer);
      ivsoWrapper.appendChild(ivsoBtnContainer);
      if (state.captureMode === 'retake') {
          ivsoWrapper.appendChild(ivsoQueryMsg);
      }

      ivsoContainer.appendChild(ivsoWrapper);
  };

  renderUI();

  await loadModelsAsync();
};

