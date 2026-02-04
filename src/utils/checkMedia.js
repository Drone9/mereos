import { testMediaConnectionBitrate, testAudioInputDevice, AudioInputTest, testVideoInputDevice, VideoInputTest } from '@twilio/rtc-diagnostics';
import { findConfigs, getSecureFeatures, sentryExceptioMessage } from './functions';

export const checkMediaInputs = (iceServersArray) => {
	return new Promise(async (resolve) => {
		try {
			const microphoneId = localStorage.getItem('microphoneID');
			const cameraId = localStorage.getItem('deviceId');
			const secureFeatures = getSecureFeatures();

			const shouldTestAudio = findConfigs(['record_audio'], secureFeatures.entities).length > 0;
			const shouldTestVideo = findConfigs(['record_video', 'record_room', 'verify_id', 'verify_candidate'], secureFeatures.entities).length > 0;
			const shouldTestBitrate = findConfigs(['verify_upload_speed'], secureFeatures.entities).length > 0;

			if (!shouldTestAudio && !shouldTestVideo && !shouldTestBitrate) {
				return resolve({
					audio: null,
					video: null,
					bitrate: null,
					skipped: true,
					message: 'media_check_skipped'
				});
			}

			const audioTest = shouldTestAudio ? testAudioInputDevice({ deviceId: microphoneId || 'default' }) : null;
			const videoTest = shouldTestVideo ? testVideoInputDevice({ deviceId: cameraId || 'default' }) : null;
			const mediaConnectionBitrateTest = shouldTestBitrate ? testMediaConnectionBitrate({
				iceServers: iceServersArray,
				iceTransportPolicy: 'relay'
			}) : null;

			let audioReport = null;
			let videoReport = null;
			let bitrateReport = null;
			let bitrateError = null;
			let bitrateValues = [];

			if (audioTest) {
				audioTest.on(AudioInputTest.Events.End, (report) => {
					audioReport = report;
					console.log('Audio Report: ', report);
				});
				audioTest.on(AudioInputTest.Events.Error, (error) => {
					console.log('Audio Error:', error);
				});
			}

			if (mediaConnectionBitrateTest) {
				mediaConnectionBitrateTest.on('bitrate', (bitrate) => {
					bitrateValues.push(bitrate);
				});

				mediaConnectionBitrateTest.on('error', (error) => {
					console.log('Bitrate Error: ', error);
					bitrateError = error?.message || String(error);
				});

				mediaConnectionBitrateTest.on('end', (report) => {
					bitrateReport = report;
					console.log('Bitrate Report: ', report);
				});
			}

			if (videoTest) {
				videoTest.on(VideoInputTest.Events.End, (report) => {
					videoReport = report;
					console.log('Video Report: ', report);
				});
				videoTest.on(VideoInputTest.Events.Error, (error) => {
					console.log('Video Error:', error);
				});
			}

			const timer = setTimeout(() => {
				clearTimeout(timer);
				if (audioTest) audioTest.stop();
				if (videoTest) videoTest.stop();
				if (mediaConnectionBitrateTest) mediaConnectionBitrateTest.stop();

				const isAudioValid = () => {
					if (!audioReport || !Array.isArray(audioReport.values) || audioReport.errors?.length > 0) {
						return false;
					}
					const nonZero = audioReport.values.filter(v => v > 5);
					const percentActive = (nonZero.length / audioReport.values.length) * 100;
					return percentActive > 15;
				};

				const isVideoValid = () => {
					if (!videoReport || videoReport.errors?.length > 0 || !videoReport.resolution) return false;
					const { width, height } = videoReport.resolution;
					return width >= 320 && height >= 240;
				};

				const isBitrateValid = () => {
					const uploadSpeed = secureFeatures?.settings?.upload_speed;
					const values = Array.isArray(bitrateReport?.values) && bitrateReport.values.length ? bitrateReport.values : bitrateValues;
					
					if (bitrateError || !values?.length) return false;
					
					const trimmed = values.length > 1 ? values.slice(1) : values;
					const avgKbps = Math.round(trimmed.reduce((a, b) => a + b, 0) / trimmed.length);
					const MIN_SAMPLES = 5;
					const MIN_AVG_KBPS = uploadSpeed?.speedKbps || 0;
					
					return trimmed.length >= MIN_SAMPLES && avgKbps >= MIN_AVG_KBPS;
				};

				const audioWorking = shouldTestAudio ? isAudioValid() : null;
				const videoWorking = shouldTestVideo ? isVideoValid() : null;
				const bitrateWorking = shouldTestBitrate ? isBitrateValid() : null;

				if ((audioWorking || audioWorking === null) && (videoWorking || videoWorking === null) && (bitrateWorking || bitrateWorking === null)) {
					resolve({
						audio: audioWorking,
						video: videoWorking,
						bitrate: bitrateWorking,
						message: 'media_check_success'
					});
				} else {
					let errorMessage = '';

					if (audioWorking === false && videoWorking === false && bitrateWorking === false) {
						errorMessage = 'media_check_all_failed';
					} else if (audioWorking === false && videoWorking === false) {
						errorMessage = 'media_check_both_failed';
					} else if (audioWorking === false) {
						errorMessage = 'media_check_audio_failed';
					} else if (videoWorking === false) {
						errorMessage = 'media_check_video_failed';
					} else if (bitrateWorking === false) {
						errorMessage = 'media_check_bitrate_failed';
					}

					resolve({
						audio: audioWorking,
						video: videoWorking,
						bitrate: bitrateWorking,
						error: errorMessage
					});
				}
			}, shouldTestBitrate ? 10000 : 5000);
		} catch (err) {
			sentryExceptioMessage(err);
			console.log('Media Check Exception:', err);
			resolve({
				audio: false,
				video: false,
				bitrate: false,
				error: 'media_check_exception'
			});
		}
	});
};