import { checkCamera, checkMicrophone, checkNotification, detectMultipleScreens, getLocation, getMultipleCameraDevices, getNetworkUploadSpeed } from '../utils/functions';
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

export const runSystemDiagnostics = async () => {
    const tab1Content = document.getElementById('tab1');
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
        const camera = await checkCamera();
        document.getElementById('cameraStatusIcon').src = camera ? `${videoGreen}` : `${videoRed}`;
        document.getElementById('cameraStatusLoading').src = camera ? `${checkMarkIcon}` : `${XCircle}`;

        const microphone = await checkMicrophone();
        document.getElementById('microphoneStatusIcon').src = microphone ? `${microPhoneGreen}` : `${microPhoneRed}`;
        document.getElementById('microphoneStatusLoading').src = microphone ? `${checkMarkIcon}` : `${XCircle}`;

        const network = await getNetworkUploadSpeed();
        document.getElementById('networkStatusIcon').src = network.speedMbps > 0.168 ? `${networkGreen}` : `${networkRed}`;
        document.getElementById('networkStatusLoading').src = network.speedMbps > 0.168 ? `${checkMarkIcon}` : `${XCircle}`;

        const location = await getLocation();
        document.getElementById('locationStatusIcon').src = location ? `${locationGreen}` : `${locationRed}`;
        document.getElementById('locationStatusLoading').src = location ? `${checkMarkIcon}` : `${XCircle}`;

        const notification = await checkNotification();
        document.getElementById('notificationStatusIcon').src = notification ? `${notificationGreen}` : `${notificationRed}`;
        document.getElementById('notificationStatusLoading').src = notification ? `${checkMarkIcon}` : `${XCircle}`;

        const screens = detectMultipleScreens();
        document.getElementById('screenStatusIcon').src = screens ? `${multipleScreenRed}` : `${multipleScreenGreen}`;
        document.getElementById('screenStatusLoading').src = screens ? `${XCircle}` : `${checkMarkIcon}`;

        const videoDevices = await getMultipleCameraDevices();
        console.log('videoDevices', videoDevices);
        localStorage.setItem('deviceId', videoDevices && videoDevices[0]?.deviceId);

        const allStatuses = [camera, microphone, network.speedMbps > 0.168, location, notification, !screens];
        const allActivated = allStatuses.every(status => status);
        const continueBtn = document.getElementById('diagnosticContinueBtn');
        continueBtn.disabled = !allActivated;
        if (allActivated) {
            continueBtn.addEventListener('click', () => {
                // Navigate to the next screen or perform the next action
            });
        }
    } catch (error) {
        console.error('Error during diagnostics:', error);
    }
};
