import {  roomInstance } from '../StartRecording/startRecording';


export const cleanupLocalVideo = (cameraTrack) => {
  if (cameraTrack) {
      cameraTrack.stop();
  }
  const localVideoContainer = document.querySelector('.local-video-container');
  if (localVideoContainer) {
      localVideoContainer.remove();
  }
};

export const stopAllRecordings = () => {
  console.log('roomInstance', roomInstance);

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

  // Stop any media streams that might still be active
  const activeMediaStreams = document.querySelectorAll('video');
  activeMediaStreams.forEach(videoElement => {
      const mediaStream = videoElement.srcObject;
      if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
      }
  });

  const localVideoContainer = document.querySelector('.local-video-container');
  if (localVideoContainer) {
      localVideoContainer.remove();
  }
};

