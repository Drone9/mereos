import { checkCamera, checkForMultipleMicrophones, checkMicrophone, checkNotification, detectMultipleScreens, getCandidateAssessment, getLocation, getMultipleCameraDevices, getNetworkUploadSpeed, registerEvent, updatePersistData } from '../utils/functions';
import '../assets/css/systemDiagnostic.css';
import loadingGray from '../assets/images/loading-gray.svg';
import checkMarkIcon from '../assets/images/checkmark-rounded-green.png';
import XCircle from '../assets/images/x-circle.png'
import videoCameraGray from '../assets/images/video-camera-light-gray.svg'
import microPhoneGray from '../assets/images/microphone-light-gray.svg'
import networkGray from '../assets/images/spinner-gap-light-gray.svg'
import locationGray from '../assets/images/location-pin-black.svg'
import notificationGray from '../assets/images//bell-ringing-light-gray.svg'
import multipleScreenGray from '../assets/images/mutiple-screen-gray.svg'
import videoGreen from '../assets/images/video-camera-green.svg'
import videoRed from '../assets/images/video-camera-red.svg'
import microPhoneRed from '../assets/images/microphone-red.svg'
import microPhoneGreen from '../assets/images/microphone-green.svg'
import networkGreen from '../assets/images/spinner-gap-green.svg'
import networkRed from '../assets/images/spinner-maroon.svg'
import locationGreen from '../assets/images//location-pin-green.svg'
import locationRed from '../assets/images//location-pin-red.svg'
import notificationGreen from '../assets/images/bell-ringing-green.svg'
import notificationRed from '../assets/images/bell-ringing-maroon.svg'
import multipleScreenRed from '../assets/images/multiple-screen-red.svg'
import multipleScreenGreen from '../assets/images//multiple-screen-green.svg'
import prompMessage from '../assets/images/user-permission-english.svg'
import { showTab } from './examPrechecks';

export const runSystemDiagnostics = async () => {
    const tab1Content = document.getElementById('runSystemDiagnostics');
    tab1Content.innerHTML = `
        <div class="system-diagnostic-test-screen">
            <h1 class="heading">System Diagnostics</h1>
            <div class="diagnostic-status container-box">
                <div class="container">
                    <div class="container-top">
                        <label class="description">System Diagnostic Message</label>
                    </div>
                    <div className='container-prompt'>
							<img
								src=${prompMessage}
								alt=''
								width='400px'
								className='prompt-image'
							></img>
					</div>
                    <div class="container-middle box-section">
                        <div class="diagnostic-item grey-box">
                            <div class="grey-box-right">
                                <img id="cameraStatusIcon" src="${videoCameraGray}" alt="" />
                                <label>Camera</label>
                            </div>
                            <div class="grey-box-left">
                                <img id="cameraStatusLoading" src="${loadingGray}" alt="" />
                            </div>
                        </div>
                        <div class="diagnostic-item grey-box">
                            <div class="grey-box-right">
                                <img id="microphoneStatusIcon" src="${microPhoneGray}" alt="" />
                                <label>Microphone</label>
                            </div>
                            <div class="grey-box-left">
                                <img id="microphoneStatusLoading" src="${loadingGray}" alt="" />
                            </div>
                        </div>
                        <div class="diagnostic-item grey-box">
                            <div class="grey-box-right">
                                <img id="networkStatusIcon" src="${networkGray}" alt="" />
                                <label>Network Speed</label>
                            </div>
                            <div class="grey-box-left">
                                <img id="networkStatusLoading" src="${loadingGray}" alt="" />
                            </div>
                        </div>
                        <div class="diagnostic-item grey-box">
                            <div class="grey-box-right">
                                <img id="locationStatusIcon" src="${locationGray}" alt="" />
                                <label>Location</label>
                            </div>
                            <div class="grey-box-left">
                                <img id="locationStatusLoading" src="${loadingGray}" alt="" />
                            </div>
                        </div>
                        <div class="diagnostic-item grey-box">
                            <div class="grey-box-right">
                                <img id="notificationStatusIcon" src="${notificationGray}" alt="" />
                                <label>Notifications</label>
                            </div>
                            <div class="grey-box-left">
                                <img id="notificationStatusLoading" src="${loadingGray}" alt="" />
                            </div>
                        </div>
                        <div class="diagnostic-item grey-box">
                            <div class="grey-box-right">
                                <img id="screenStatusIcon" src="${multipleScreenGray}" alt="" />
                                <label>Multiple Screens</label>
                            </div>
                            <div class="grey-box-left">
                                <img id="screenStatusLoading" src="${loadingGray}" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="button-section">
                        <button class="orange-filled-btn" id="diagnosticContinueBtn" style="margin-top: 10px;" disabled>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    try {
        const candidateAssessment = getCandidateAssessment()
        const secureFeatures = candidateAssessment?.section?.secure_feature_profile?.entity_relation || [];
        console.log('secureFeatures',secureFeatures);
    
        let recordVideo = secureFeatures.find(entity => entity.name === 'Record Video');
        let recordAudio = secureFeatures.find(entity => entity.name === 'Record Audio');
        let checkNetwork = secureFeatures.find(entity => entity.name === 'Verify Connection');
        let trackLocation = secureFeatures.find(entity => entity.name === 'Track Location');
        let enableNotifications = secureFeatures.find(entity => entity.name === 'Enable Notifications');
        let multipleScreensCheck = secureFeatures.find(entity => entity.name === 'Verify Desktop');
    
        const setElementStatus = (id, status, isSuccess) => {
          document.getElementById(`${id}StatusIcon`).src = isSuccess ? `${status.success}` : `${status.failure}`;
          document.getElementById(`${id}StatusLoading`).src = isSuccess ? `${checkMarkIcon}` : `${XCircle}`;
        };
    
        let camera, microphone, location, notification, screens, network;

        if (recordVideo) {
          camera = await checkCamera();
          setElementStatus('camera', { success: videoGreen, failure: videoRed }, camera);
        } else {
          camera = true;
          setElementStatus('camera', { success: videoGreen, failure: videoRed }, true);
        }
    
        if (recordAudio) {
          microphone = await checkMicrophone();
          setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, microphone);
        } else {
          microphone = true;
          setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, true);
        }
    
        if (checkNetwork) {
          network = await getNetworkUploadSpeed();
          const isNetworkGood = network.speedMbps > 0.168;
          setElementStatus('network', { success: networkGreen, failure: networkRed }, isNetworkGood);
        } else {
            network=true;
          setElementStatus('network', { success: networkGreen, failure: networkRed }, true);
        }
    
        if (trackLocation) {
          location = await getLocation();
          updatePersistData('session',{ location: location })

          setElementStatus('location', { success: locationGreen, failure: locationRed }, location);
        } else {
          location = true;
          setElementStatus('location', { success: locationGreen, failure: locationRed }, true);
        }
    
        if (enableNotifications) {
          notification = await checkNotification();
          setElementStatus('notification', { success: notificationGreen, failure: notificationRed }, notification);
        } else {
          notification = true;
          setElementStatus('notification', { success: notificationGreen, failure: notificationRed }, true);
        }
    
        if (multipleScreensCheck) {
          screens = detectMultipleScreens();
          setElementStatus('screen', { success: multipleScreenGreen, failure: multipleScreenRed }, !screens);
        } else {
          screens = false;
          setElementStatus('screen', { success: multipleScreenGreen, failure: multipleScreenRed }, true);
        }
    
        const videoDevices = await getMultipleCameraDevices();
        console.log('videoDevices', videoDevices);
        localStorage.setItem('deviceId', videoDevices && videoDevices[0]?.deviceId);
    
        const microphones = await checkForMultipleMicrophones();
        console.log('microphones', microphones);
        localStorage.setItem('microphoneID', microphones && microphones[0]?.deviceId);
    
        const allStatuses = [
            camera,
            microphone,
            network,
            location,
            notification,
            !screens,
        ];
    
        const allActivated = allStatuses.every(status => status);
        const continueBtn = document.getElementById('diagnosticContinueBtn');
        continueBtn.disabled = !allActivated;
        if (allActivated) {
          continueBtn.addEventListener('click', () => {
			registerEvent({eventType: 'success', notify: false, eventName: 'system_diagnostic_passed'});
            showTab('IdentityVerificationScreenOne');
          });
        }
    } catch (error) {
        console.error('Error during diagnostics:', error);
    }
};
