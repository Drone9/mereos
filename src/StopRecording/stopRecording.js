import {  roomInstance } from '../StartRecording/startRecording';
import { registerEvent, showNotification, updatePersistData } from '../utils/functions';

export const cleanupLocalVideo = () => {
    const webcamContainer = document.getElementById('webcam-container');
    if (webcamContainer) {
        const videoElement = webcamContainer.querySelector('video');
        if (videoElement) {
            videoElement.pause();
            videoElement.srcObject.getTracks().forEach(track => track.stop());
            videoElement.remove();
        }

        const canvas = webcamContainer.querySelector('canvas');
        if (canvas) {
            canvas.remove();
        }

        webcamContainer.remove();
    }
};

export const stopAllRecordings = () => {
    if (roomInstance) {
        roomInstance.localParticipant.tracks.forEach(publication => {
            const track = publication.track;
            if (track) {
                track.stop();
                roomInstance.localParticipant.unpublishTrack(track);
            }
        });
        roomInstance.disconnect();
    }

    cleanupLocalVideo();
    
    const dateTime = new Date();
    
    registerEvent({ eventType: 'success', notify: false, eventName: 'recording_stopped_successfully', startAt: dateTime });

    showNotification({
        title: 'Recording Stopped',
        body: 'Recording session has ended.',
    });

    updatePersistData('session', {
        recordingEnded: true
    });
};
