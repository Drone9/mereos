import * as TwilioVideo from 'twilio-video';
import { newStream } from '../ExamPrepreation/IdentityVerificationScreenFive';
import { cleanupLocalVideo } from '../StopRecording/stopRecording';
import { getSecureFeatures } from '../utils/functions';

export let roomInstance = null; 
export const startRecording = async (token) => {
    let cameraTrack = null;
    let screenTrack = null;
    let cameraRecordings = [];
    let audioRecordings = [];
    let screenRecordings = [];
    const secureFeatures = getSecureFeatures();
    console.log('secureFeatures',secureFeatures);

    let twilioOptions = {
      audio: findConfigs(['Record Audio'], secureFeatures).length ? 
        (deviceIDs?.microphoneID !== null ? {
          deviceId: { exact: deviceIDs?.microphoneID },
        } : true )
        :
        false,
      video : findConfigs(['Record Video'], secureFeatures).length ? 
        (deviceIDs?.videoDeviceID !== null ? {
          deviceId: { exact: deviceIDs?.videoDeviceID },
        } : true )
        : 
        false
    };

    try {
        let room = await TwilioVideo.connect(token, twilioOptions);
        roomInstance = room;
        console.log('Room connected:', room);

        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: localStorage.getItem('deviceId') ? { deviceId: { exact: localStorage.getItem('deviceId') } } : true, audio: true });
        cameraTrack = new TwilioVideo.LocalVideoTrack(mediaStream.getVideoTracks()[0]);
        await room.localParticipant.publishTrack(cameraTrack);
        console.log('Local camera track published:', cameraTrack);

        cameraRecordings = [
          ...cameraRecordings,
          ...Array.from(room?.localParticipant?.videoTracks, ([name, value]) => ({ name, value })).map(rt => rt.name)
        ];
        audioRecordings = [
            ...audioRecordings,
            ...Array.from(room?.localParticipant?.audioTracks, ([name, value]) => ({ name, value })).map(rt => rt.name)
        ];
        if(newStream && (findConfigs(['Record Screen'], section?.secure_feature_profile?.entity_relation).length)){
          screenTrack = new TwilioVideo.LocalVideoTrack(newStream?.getTracks()[0]);
          await room.localParticipant.publishTrack(screenTrack);
          screenRecordings = [...screenRecordings, screenTrackPublished.trackSid];
        }
        
        console.log('Local screen share track published:', screenTrack);

        displayLocalCameraVideo(mediaStream);

        room.on('disconnected', () => {
            cleanupLocalVideo(cameraTrack);
        });
    } catch (error) {
        console.error('Error starting recording:', error);
    }
};

const displayLocalCameraVideo = (mediaStream) => {
    const localVideoContainer = document.createElement('div');
    localVideoContainer.classList.add('local-video-container');

    const cameraVideoElement = document.createElement('video');
    cameraVideoElement.autoplay = true;
    cameraVideoElement.muted = true;
    cameraVideoElement.srcObject = mediaStream;
    localVideoContainer.appendChild(cameraVideoElement);

    document.body.appendChild(localVideoContainer);

    cameraVideoElement.style.position = 'fixed';
    cameraVideoElement.style.top = '10px';
    cameraVideoElement.style.right = '10px';
    cameraVideoElement.style.width = '200px';
    cameraVideoElement.style.height = 'auto';
};
