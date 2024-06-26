import RecordRTC from 'recordrtc';
import { ASSET_URL } from '../utils/constant';
import '../assets/css/step4.css';
import redDot from '../assets/images/red-dot.svg';
import whiteDot from '../assets/images/white-dot.svg';
import { showTab } from './examPrechecks';
import { uploadFileInS3Folder } from '../utils/functions';

export const IdentityVerificationScreenFour = async (tabContent) => {
    let recordingMode = 'startRecording';
    let showPlayer = false;
    let textMessage = 'Scan Your Room';
    let dotImg = whiteDot;
    let loading = false;
    let recordingTimer = null;
    let blob = null;
    let refVideo = null;
    let recorderRef = null;

    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: 'user',
        deviceId: localStorage.getItem('deviceId'),
        video: localStorage.getItem('deviceId') ? { deviceId: { exact: localStorage.getItem('deviceId') } } : true
    };

    const handleRestartRecording = async () => {
        showPlayer = false;
        loading = false;
        recordingMode = 'startRecording';
        updateUI();
    };

    const handleStartRecording = async () => {
        const mediaOptions = {
            audio: true,  // Ensure audio is always requested
        };

        if (localStorage.getItem('deviceId') !== null) {
            mediaOptions.video = { deviceId: { exact: localStorage.getItem('deviceId') } };
        } else {
            mediaOptions.video = true;  // Request video if device ID is not available
        }

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(mediaOptions);

            recorderRef = new RecordRTC(mediaStream, {
                type: 'video',
                mimeType: 'video/mp4',
            });

            startRecordingTimer();
            recorderRef.startRecording();

            recordingMode = 'beingRecorded';

            const startTime = Date.now();
            const intervalId = setInterval(() => {
                const elapsedMilliseconds = Date.now() - startTime;
                const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

                if (elapsedSeconds >= 60) {
                    handleStopRecording();
                    clearInterval(intervalId);
                }
            }, 1000);
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    const handleStopRecording = async () => {
        showPlayer = true;
        recorderRef.stopRecording(() => {
            refVideo.srcObject = null;
            blob = recorderRef.getBlob();
            refVideo.src = URL.createObjectURL(recorderRef.getBlob());
        });

        recordingMode = 'stopRecording';
        stopRecordingTimer();
        updateUI();
    };

    const nextStep = async () => {
        showTab('tab7');
    };

    const prevStep = () => {
        showTab('tab5');
        console.log('Navigate to previous step');
    };

    const startRecordingTimer = () => {
        recordingTimer = setInterval(() => {
            dotImg = dotImg.includes('white-dot') ? redDot : whiteDot;
            updateUI();
        }, 1000);
    };

    const stopRecordingTimer = () => clearInterval(recordingTimer);

    const uploadUserRoomVideo = async () => {
        try {
            loading = true;
            textMessage = 'file_is_being_uploaded';
            updateUI();

            let url = await uploadFileInS3Folder({
				file: blob,
				folderName:'videos'
			});
            if(url?.data?.file_url){
                const fileUrl = 'https://example.com/path/to/uploaded/video.mp4';

                // Example state update or action dispatch
                console.log('Room scan recording uploaded:', fileUrl);
                recordingMode = 'uploaded_file';
                textMessage = 'candidate_video_is_uploaded_successfully';
                updateUI();
            }
        } catch (error) {
            loading = false;
            textMessage = 'something_went_wrong_please_upload_again';
            recordingMode = 'stopRecording';
            updateUI();
        }
    };

    const updateUI = () => {
        let container = tabContent?.querySelector('.ivsf-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'ivsf-container';
            tabContent.appendChild(container);
        }
        container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'ivsf-wrapper';

        const headerTitle = document.createElement('div');
        headerTitle.className = 'ivsf-header-title';
        headerTitle.textContent = 'Workspace Checking';

        const message = document.createElement('div');
        message.className = 'ivsf-msg';
        message.textContent = 'Workspace checking message';

        const headerImgContainer = document.createElement('div');
        headerImgContainer.className = 'ivsf-header-img-container';

        if (showPlayer) {
            refVideo = document.createElement('video');
            refVideo.id = 'myVideo';
            refVideo.className = 'my-recorded-video';
            refVideo.controls = true;
            refVideo.autoplay = true;
            headerImgContainer.appendChild(refVideo);
        } else {
            if (recordingMode === 'beingRecorded') {
                const recordingBadge = document.createElement('div');
                recordingBadge.className = 'ivsf-recording-badge-container';

                const dot = document.createElement('img');
                dot.className = 'ivsf-recording-dot';
                dot.src = `${ASSET_URL}/${dotImg}`;
                dot.alt = 'white-dot';

                recordingBadge.appendChild(dot);
                recordingBadge.appendChild(document.createTextNode('Recording'));

                headerImgContainer.appendChild(recordingBadge);
            }

            const webcam = document.createElement('video');
            webcam.autoplay = true;
            webcam.height = 300;
            navigator.mediaDevices.getUserMedia(videoConstraints)
                .then(stream => {
                    webcam.srcObject = stream;
                });
            headerImgContainer.appendChild(webcam);
        }

        wrapper.appendChild(headerTitle);
        wrapper.appendChild(message);
        wrapper.appendChild(headerImgContainer);

        const queryMsg = document.createElement('div');
        queryMsg.className = 'ivsf-query-msg';
        queryMsg.textContent = textMessage;
        if (textMessage === 'something_went_wrong_please_upload_again') {
            queryMsg.style.color = '#E95E5E';
        }
        wrapper.appendChild(queryMsg);

        const btnContainer = document.createElement('div');
        btnContainer.className = 'ivsf-btn-container';

        if (recordingMode === 'startRecording') {
            const prevButton = createButton('Previous Step', 'orange-hollow-btn', prevStep);
            const recordButton = createButton('Record Video', 'orange-filled-btn', handleStartRecording);
            btnContainer.appendChild(prevButton);
            btnContainer.appendChild(recordButton);
        } else if (recordingMode === 'beingRecorded') {
            const prevButton = createButton('Previous Step', 'orange-hollow-btn', prevStep);
            const stopButton = createButton('Stop Recording', 'orange-filled-btn', handleStopRecording);
            btnContainer.appendChild(prevButton);
            btnContainer.appendChild(stopButton);
        } else if (recordingMode === 'stopRecording' || recordingMode === 'uploaded_file') {
            const resetButton = createButton('Reset', 'orange-hollow-btn', handleRestartRecording);
            btnContainer.appendChild(resetButton);

            if (recordingMode !== 'uploaded_file') {
                const uploadButton = createButton('Upload', 'orange-filled-btn', uploadUserRoomVideo);
                uploadButton.disabled = loading;
                btnContainer.appendChild(uploadButton);
            } else {
                const nextButton = createButton('Next Step', 'orange-filled-btn', nextStep);
                btnContainer.appendChild(nextButton);
            }
        }

        wrapper.appendChild(btnContainer);
        container.appendChild(wrapper);
    };

    const createButton = (text, className, onClick) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        button.addEventListener('click', onClick);
        return button;
    };

    updateUI();

    const cleanup = () => {
        if (recorderRef) {
            recorderRef.destroy();
        }
        stopRecordingTimer();
    };

    return {
        cleanup
    };
};
