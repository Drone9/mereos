import '../assets/css/step4.css';
import redDot from '../assets/images/red-dot.svg';
import { showTab } from './examPrechecks';
import { getDateTime, registerEvent, updatePersistData, uploadFileInS3Folder } from '../utils/functions';
import i18next from 'i18next';

export const IdentityVerificationScreenFour = async (tabContent) => {
    let recordingMode = 'startRecording';
    let showPlayer = false;
    let textMessage = 'scan_your_room';
    let loading = false;
    let recordingTimer = null;
    let blob = null;
    let refVideo = null;
    let mediaRecorder = null;
    let recordedChunks = [];

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
        blob = null;
        updateUI();
    };

    const handleStartRecording = async () => {
        const mediaOptions = {
            audio: localStorage.getItem('microphoneID') !== null ? { deviceId: { exact: localStorage.getItem('microphoneID') }} : true,
            video: localStorage.getItem('deviceId') !== null ? { deviceId: { exact: localStorage.getItem('deviceId') } } : true,
        };

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(mediaOptions);

            mediaRecorder = new MediaRecorder(mediaStream, {
                mimeType: 'video/webm; codecs=vp9'
            });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                blob = new Blob(recordedChunks, {
                    type: 'video/webm'
                });
                showPlayer = true;
                recordedChunks = [];
                updateUI();
                if (refVideo) {
                    refVideo.src = URL.createObjectURL(blob);
                }
            };

            mediaRecorder.start();
            recordingMode = 'beingRecorded';
            updateUI();

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
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        stopRecordingTimer();
        recordingMode = 'stopRecording';
        updateUI();
    };

    const nextStep = async () => {
        registerEvent({ eventType: 'success', notify: false, eventName: 'room_scan_completed', eventValue: getDateTime() });
        showTab('IdentityVerificationScreenFive');
    };

    const prevStep = () => {
        showTab('IdentityVerificationScreenThree');
        console.log('Navigate to previous step');
    };

    const stopRecordingTimer = () => clearInterval(recordingTimer);

    const uploadUserRoomVideo = async () => {
        try {
            loading = true;
            textMessage = 'file_is_being_uploaded';
            updateUI();

            let url = await uploadFileInS3Folder({
                file: blob,
                folderName: 'videos'
            });

            if (url?.data?.file_url) {
                const fileUrl = url.data.file_url;
                updatePersistData('session', { room_scan_video: fileUrl });
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
        headerTitle.textContent = i18next.t('workspace_checking');

        const message = document.createElement('div');
        message.className = 'ivsf-msg';
        message.textContent = i18next.t('workspace_checking_msg');

        const headerImgContainer = document.createElement('div');
        headerImgContainer.className = 'ivsf-header-img-container';

        if (showPlayer && blob) {
            refVideo = document.createElement('video');
            refVideo.id = 'myVideo';
            refVideo.className = 'my-recorded-video';
            refVideo.controls = true;
            refVideo.autoplay = true;
            headerImgContainer.appendChild(refVideo);
            if (refVideo && blob) {
                refVideo.src = URL.createObjectURL(blob);
            }
        } else {
            if (recordingMode === 'beingRecorded') {
                const recordingBadge = document.createElement('div');
                recordingBadge.className = 'ivsf-recording-badge-container';

                const dot = document.createElement('img');
                dot.className = 'ivsf-recording-dot';
                dot.src = redDot; 
                dot.alt = 'red-dot';

                recordingBadge.appendChild(dot);

                recordingBadge.appendChild(dot);
                recordingBadge.appendChild(document.createTextNode(`${i18next.t('recording')}`));

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
        queryMsg.textContent = i18next.t(textMessage);
        if (textMessage === 'something_went_wrong_please_upload_again') {
            queryMsg.style.color = '#E95E5E';
        }
        wrapper.appendChild(queryMsg);

        const btnContainer = document.createElement('div');
        btnContainer.className = 'ivsf-btn-container';

        if (recordingMode === 'startRecording') {
            const prevButton = createButton(`${i18next.t('previous_step')}`, 'orange-hollow-btn', prevStep);
            const recordButton = createButton(`${i18next.t('record_video')}`, 'orange-filled-btn', handleStartRecording);
            btnContainer.appendChild(prevButton);
            btnContainer.appendChild(recordButton);
        } else if (recordingMode === 'beingRecorded') {
            const prevButton = createButton(`${i18next.t('previous_step')}`, 'orange-hollow-btn', prevStep);
            const stopButton = createButton(`${i18next.t('stop_recording')}`, 'orange-filled-btn', handleStopRecording);
            btnContainer.appendChild(prevButton);
            btnContainer.appendChild(stopButton);
        } else if (recordingMode === 'stopRecording' || recordingMode === 'uploaded_file') {
            const resetButton = createButton('Reset', 'orange-hollow-btn', handleRestartRecording);
            btnContainer.appendChild(resetButton);

            if (recordingMode !== 'uploaded_file') {
                const uploadButton = createButton(`${i18next.t('Upload')}`, 'orange-filled-btn', uploadUserRoomVideo);
                uploadButton.disabled = loading;
                btnContainer.appendChild(uploadButton);
            } else {
                const nextButton = createButton(`${i18next.t('next_step')}`, 'orange-filled-btn', nextStep);
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

    i18next.on('languageChanged', () => {
        updateUI();
    });

    const cleanup = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        stopRecordingTimer();
    };

    return {
        cleanup
    };
};
