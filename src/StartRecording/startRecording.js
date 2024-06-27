import * as TwilioVideo from 'twilio-video';
import { newStream } from '../ExamPrepreation/IdentityVerificationScreenFive';
import { cleanupLocalVideo } from '../StopRecording/stopRecording';
import { convertDataIntoParse, findConfigs, getCandidateAssessment, getTimeInSeconds, registerEvent, updatePersistData } from '../utils/functions';
import { v4 } from 'uuid';

export let roomInstance = null; 
export const startRecording = async (token) => {
    let cameraTrack = null;
    let screenTrack = null;
    let cameraRecordings = [];
    let audioRecordings = [];
    let screenRecordings = [];
    const secureFeatures = getCandidateAssessment();
    const session = convertDataIntoParse('session');
    console.log('secureFeatures',secureFeatures?.section?.secure_feature_profile?.entity_relation);

    let twilioOptions = {
      audio: findConfigs(['Record Audio'], secureFeatures?.section?.secure_feature_profile?.entity_relation).length ? 
        (localStorage.getItem(' microphoneID') !== null ? {
          deviceId: { exact: localStorage.getItem('microphoneID')  },
        } : true )
        :
        false,
      video : findConfigs(['Record Video'], secureFeatures?.section?.secure_feature_profile?.entity_relation).length ? 
        (localStorage.getItem('deviceId') !== null ? {
          deviceId: { exact: localStorage.getItem('deviceId') },
        } : true )
        : 
        false
    };

    try {
      const dateTime = new Date();
      const newRoomSessionId = v4();
			const newSessionId = session?.sessionId ? session?.sessionId : v4();

      updatePersistData('session',{
        roomSessionId: newRoomSessionId,
        sessionId: newSessionId,
        sessionStartTime: getTimeInSeconds({ inputDate: dateTime, isUTC: true })
      })

      console.log('twilioOptions',twilioOptions);
        let room = await TwilioVideo.connect(token, twilioOptions);
        roomInstance = room;
        console.log('Room connected:', room);

        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: localStorage.getItem('deviceId') ? { deviceId: { exact: localStorage.getItem('deviceId') } } : true, audio: (localStorage.getItem('microphoneID') ? {
          deviceId: { exact: localStorage.getItem('microphoneID') },
        } : true ) });

        displayLocalCameraVideo(mediaStream);

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

        updatePersistData('session',{ cameraRecordings: cameraRecordings, audioRecordings:audioRecordings ,room_id: room?.sid })
        if(session?.screenRecordingStream && (findConfigs(['Record Screen'], secureFeatures?.section?.secure_feature_profile?.entity_relation).length)){
          screenTrack = new TwilioVideo.LocalVideoTrack(newStream?.getTracks()[0]);
          let screenTrackPublished = await room.localParticipant.publishTrack(screenTrack);
          screenRecordings = [...screenRecordings, screenTrackPublished.trackSid];
          updatePersistData('session',{ screenRecordings: screenRecordings });
        }

        registerEvent({ eventType: 'success', notify: false, eventName: 'recording_started_successfully', startAt: dateTime });
        
        console.log('Local screen share track published:', screenTrack);

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
