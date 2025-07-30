import { testAudioInputDevice, AudioInputTest, testVideoInputDevice, VideoInputTest } from '@twilio/rtc-diagnostics';
import { findConfigs, getSecureFeatures } from './functions';

export const checkMediaInputs = () => {
	return new Promise(async (resolve) => {
		try {
			const microphoneId = localStorage.getItem('microphoneID');
			const cameraId = localStorage.getItem('deviceId');
			const secureFeatures = getSecureFeatures();

			const shouldTestAudio = findConfigs(['record_audio'], secureFeatures.entities).length > 0;
			const shouldTestVideo = findConfigs(['record_video', 'record_room'], secureFeatures.entities).length > 0;

			if (!shouldTestAudio && !shouldTestVideo) {
				return resolve({
					audio: null,
					video: null,
					skipped: true,
					message: 'media_check_skipped'
				});
			}

			const audioTest = shouldTestAudio ? testAudioInputDevice({ deviceId: microphoneId || 'default' }) : null;
			const videoTest = shouldTestVideo ? testVideoInputDevice({ deviceId: cameraId || 'default' }) : null;

			let audioReport = null;
			let videoReport = null;

			if (audioTest) {
				audioTest.on(AudioInputTest.Events.End, (report) => {
					audioReport = report;
				});
				audioTest.on(AudioInputTest.Events.Error, (error) => {
					console.log('Audio Error:', error);
				});
			}

			if (videoTest) {
				videoTest.on(VideoInputTest.Events.End, (report) => {
					videoReport = report;
				});
				videoTest.on(VideoInputTest.Events.Error, (error) => {
					console.log('Video Error:', error);
				});
			}

			setTimeout(() => {
				if (audioTest) audioTest.stop();
				if (videoTest) videoTest.stop();

				const isAudioValid = () => {
					if (!audioReport || !Array.isArray(audioReport.values) || audioReport.errors?.length > 0) {
						return false;
					}
					const nonZero = audioReport.values.filter(v => v > 5);
					const percentActive = (nonZero.length / audioReport.values.length) * 100;
					return percentActive > 30;
				};

				const isVideoValid = () => {
					if (!videoReport || videoReport.errors?.length > 0 || !videoReport.resolution) return false;
					const { width, height } = videoReport.resolution;
					return width >= 320 && height >= 240;
				};

				const audioWorking = shouldTestAudio ? isAudioValid() : null;
				const videoWorking = shouldTestVideo ? isVideoValid() : null;

				if ((audioWorking || audioWorking === null) && (videoWorking || videoWorking === null)) {
					resolve({
						audio: audioWorking,
						video: videoWorking,
						message: 'media_check_success'
					});
				} else {
					let errorMessage = '';

					if (audioWorking === false && videoWorking === false) {
						errorMessage = 'media_check_both_failed';
					} else if (audioWorking === false) {
						errorMessage = 'media_check_audio_failed';
					} else if (videoWorking === false) {
						errorMessage = 'media_check_video_failed';
					}

					resolve({
						audio: audioWorking,
						video: videoWorking,
						error: errorMessage
					});
				}
			}, 3000);
		} catch (err) {
			console.log('Media Check Exception:', err);
			resolve({
				audio: false,
				video: false,
				error: 'media_check_exception'
			});
		}
	});
};