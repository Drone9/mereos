import { 
    checkCamera, 
    checkForMultipleMicrophones, 
    checkMicrophone, 
    checkNotification, 
    detectMultipleScreens, 
    getCandidateAssessment, 
    getLocation, 
    getMultipleCameraDevices, 
    getNetworkUploadSpeed, 
    registerEvent, 
    updatePersistData 
} from '../utils/functions';
import '../assets/css/systemDiagnostic.css';
import loadingGray from '../assets/images/loading-gray.svg';
import checkMarkIcon from '../assets/images/checkmark-rounded-green.png';
import XCircle from '../assets/images/x-circle.png';
import videoCameraGray from '../assets/images/video-camera-light-gray.svg';
import microPhoneGray from '../assets/images/microphone-light-gray.svg';
import networkGray from '../assets/images/spinner-gap-light-gray.svg';
import locationGray from '../assets/images/location-pin-black.svg';
import notificationGray from '../assets/images/bell-ringing-light-gray.svg';
import multipleScreenGray from '../assets/images/mutiple-screen-gray.svg';
import videoGreen from '../assets/images/video-camera-green.svg';
import videoRed from '../assets/images/video-camera-red.svg';
import microPhoneRed from '../assets/images/microphone-red.svg';
import microPhoneGreen from '../assets/images/microphone-green.svg';
import networkGreen from '../assets/images/spinner-gap-green.svg';
import networkRed from '../assets/images/spinner-maroon.svg';
import locationGreen from '../assets/images/location-pin-green.svg';
import locationRed from '../assets/images/location-pin-red.svg';
import notificationGreen from '../assets/images/bell-ringing-green.svg';
import notificationRed from '../assets/images/bell-ringing-maroon.svg';
import multipleScreenRed from '../assets/images/multiple-screen-red.svg';
import multipleScreenGreen from '../assets/images/multiple-screen-green.svg';
import prompMessage from '../assets/images/user-permission-english.svg';
import { showTab } from './examPrechecks';
import i18next from 'i18next';

export const runSystemDiagnostics = async () => {
    const tab1Content = document.getElementById('runSystemDiagnostics');
        if (!tab1Content) {
            console.error('Element with id "runSystemDiagnostics" not found.');
            return;
        }
        try{
            tab1Content.innerHTML = `
            <div class="system-diagnostic-test-screen">
               <h1 class="heading">${i18next.t('system_diagnostic')}</h1>
                <div class="diagnostic-status container-box">
                    <div class="container">
                        <div class="container-top">
                            <label class="description">${i18next.t('system_diagnostic_msg')}</label>
                        </div>
                        <div className='container-prompt'>
                                <img
                                    src=${prompMessage}
                                    alt=''
                                    width='330px'
                                    className='prompt-image'
                                ></img>
                        </div>
                        <div class="container-middle box-section">
                            <div class="diagnostic-item grey-box" id="cameraDiagnosticItem">
                                <div class="grey-box-right">
                                    <img id="cameraStatusIcon" src="${videoCameraGray}" alt="" />
                                    <label>${i18next.t('webcam')}</label>
                                </div>
                                <div class="grey-box-left">
                                    <img id="cameraStatusLoading" src="${loadingGray}" alt="" />
                                </div>
                            </div>
                            <div class="diagnostic-item grey-box" id="microphoneDiagnosticItem">
                                <div class="grey-box-right">
                                    <img id="microphoneStatusIcon" src="${microPhoneGray}" alt="" />
                                    <label>${i18next.t('microphone')}</label>
                                </div>
                                <div class="grey-box-left">
                                    <img id="microphoneStatusLoading" src="${loadingGray}" alt="" />
                                </div>
                            </div>
                            <div class="diagnostic-item grey-box" id="networkDiagnosticItem">
                                <div class="grey-box-right">
                                    <img id="networkStatusIcon" src="${networkGray}" alt="" />
                                    <label>${i18next.t('connection')}</label>
                                </div>
                                <div class="grey-box-left">
                                    <img id="networkStatusLoading" src="${loadingGray}" alt="" />
                                </div>
                            </div>
                            <div class="diagnostic-item grey-box" id="locationDiagnosticItem">
                                <div class="grey-box-right">
                                    <img id="locationStatusIcon" src="${locationGray}" alt="" />
                                    <label>${i18next.t('location')}</label>
                                </div>
                                <div class="grey-box-left">
                                    <img id="locationStatusLoading" src="${loadingGray}" alt="" />
                                </div>
                            </div>
                            <div class="diagnostic-item grey-box" id="notificationDiagnosticItem">
                                <div class="grey-box-right">
                                    <img id="notificationStatusIcon" src="${notificationGray}" alt="" />
                                    <label>${i18next.t('notification')}</label>
                                </div>
                                <div class="grey-box-left">
                                    <img id="notificationStatusLoading" src="${loadingGray}" alt="" />
                                </div>
                            </div>
                            <div class="diagnostic-item grey-box" id="screenDiagnosticItem">
                                <div class="grey-box-right">
                                    <img id="screenStatusIcon" src="${multipleScreenGray}" alt="" />
                                    <label>${i18next.t('multiple_screens')}</label>
                                </div>
                                <div class="grey-box-left">
                                    <img id="screenStatusLoading" src="${loadingGray}" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="button-section">
                            <button class="orange-filled-btn" id="diagnosticContinueBtn" disabled>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        const setElementStatus = (id, status, isSuccess) => {
            document.getElementById(`${id}StatusIcon`).src = isSuccess ? status.success : status.failure;
            document.getElementById(`${id}StatusLoading`).src = isSuccess ? checkMarkIcon : XCircle;
        };
    
        const handleDiagnosticItemClick = (id, checkFunction) => {
            document.getElementById(`${id}DiagnosticItem`).addEventListener('click', async () => {
                const result = await checkFunction();
                setElementStatus(id, { success: successIconMap[id], failure: failureIconMap[id] }, result);
            });
        };
    
        const iconMap = {
            camera: { icon: videoCameraGray, loading: loadingGray, checkFunction: checkCamera },
            microphone: { icon: microPhoneGray, loading: loadingGray, checkFunction: checkMicrophone },
            network: { icon: networkGray, loading: loadingGray, checkFunction: getNetworkUploadSpeed },
            location: { icon: locationGray, loading: loadingGray, checkFunction: getLocation },
            notification: { icon: notificationGray, loading: loadingGray, checkFunction: checkNotification },
            screen: { icon: multipleScreenGray, loading: loadingGray, checkFunction: detectMultipleScreens }
        };
    
        const successIconMap = {
            camera: videoGreen,
            microphone: microPhoneGreen,
            network: networkGreen,
            location: locationGreen,
            notification: notificationGreen,
            screen: multipleScreenGreen
        };
    
        const failureIconMap = {
            camera: videoRed,
            microphone: microPhoneRed,
            network: networkRed,
            location: locationRed,
            notification: notificationRed,
            screen: multipleScreenRed
        };
    
        try {
            const candidateAssessment = getCandidateAssessment();
            const secureFeatures = candidateAssessment?.section?.secure_feature_profile?.entity_relation || [];
            console.log('secureFeatures', secureFeatures);
    
            let recordVideo = secureFeatures.find(entity => entity.name === 'Record Video');
            let recordAudio = secureFeatures.find(entity => entity.name === 'Record Audio');
            let checkNetwork = secureFeatures.find(entity => entity.name === 'Verify Connection');
            let trackLocation = secureFeatures.find(entity => entity.name === 'Track Location');
            let enableNotifications = secureFeatures.find(entity => entity.name === 'Enable Notifications');
            let multipleScreensCheck = secureFeatures.find(entity => entity.name === 'Verify Desktop');
    
            const promises = [];
    
            if (recordVideo) {
                promises.push(checkCamera().then(camera => {
                    setElementStatus('camera', { success: videoGreen, failure: videoRed }, camera);
                    handleDiagnosticItemClick('camera', checkCamera);
                    return camera;
                }));
            } else {
                setElementStatus('camera', { success: videoGreen, failure: videoRed }, true);
            }
    
            if (recordAudio) {
                promises.push(checkMicrophone().then(microphone => {
                    setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, microphone);
                    handleDiagnosticItemClick('microphone', checkMicrophone);
                    return microphone;
                }));
            } else {
                setElementStatus('microphone', { success: microPhoneGreen, failure: microPhoneRed }, true);
            }
    
            if (checkNetwork) {
                promises.push(getNetworkUploadSpeed().then(network => {
                    const isNetworkGood = network.speedMbps > 0.168;
                    setElementStatus('network', { success: networkGreen, failure: networkRed }, isNetworkGood);
                    handleDiagnosticItemClick('network', getNetworkUploadSpeed);
                    return isNetworkGood;
                }));
            } else {
                setElementStatus('network', { success: networkGreen, failure: networkRed }, true);
            }
    
            if (trackLocation) {
                promises.push(getLocation().then(location => {
                    updatePersistData('session', { location });
                    setElementStatus('location', { success: locationGreen, failure: locationRed }, location);
                    handleDiagnosticItemClick('location', getLocation);
                    return location;
                }));
            } else {
                setElementStatus('location', { success: locationGreen, failure: locationRed }, true);
            }
    
            if (enableNotifications) {
                promises.push(checkNotification().then(notification => {
                    setElementStatus('notification', { success: notificationGreen, failure: notificationRed }, notification);
                    handleDiagnosticItemClick('notification', checkNotification);
                    return notification;
                }));
            } else {
                setElementStatus('notification', { success: notificationGreen, failure: notificationRed }, true);
            }
    
            if (multipleScreensCheck) {
                promises.push(detectMultipleScreens().then(screens => {
                    setElementStatus('screen', { success: multipleScreenGreen, failure: multipleScreenRed }, !screens);
                    handleDiagnosticItemClick('screen', detectMultipleScreens);
                    return !screens;
                }));
            } else {
                setElementStatus('screen', { success: multipleScreenGreen, failure: multipleScreenRed }, true);
            }
    
            const results = await Promise.all(promises);
            const allStatuses = results.every(status => status);
    
            const videoDevices = await getMultipleCameraDevices();
            console.log('videoDevices', videoDevices);
            localStorage.setItem('deviceId', videoDevices && videoDevices[0]?.deviceId);
    
            const microphones = await checkForMultipleMicrophones();
            console.log('microphones', microphones);
            localStorage.setItem('microphoneID', microphones && microphones[0]?.deviceId);
    
            const continueBtn = document.getElementById('diagnosticContinueBtn');
            continueBtn.disabled = !allStatuses;
            if (allStatuses) {
                continueBtn.addEventListener('click', () => {
                    registerEvent({ eventType: 'success', notify: false, eventName: 'system_diagnostic_passed' });
                    showTab('IdentityVerificationScreenOne');
                });
            }
        } catch (error) {
            console.error('Error during diagnostics:', error);
        }
        }catch(error){
            console.error('Error during diagnostics:', error);
        }
};

i18next.on('languageChanged', () => {
    runSystemDiagnostics();
});
