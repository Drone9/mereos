import { testMediaConnectionBitrate, testAudioInputDevice, AudioInputTest, testVideoInputDevice, VideoInputTest } from '@twilio/rtc-diagnostics';
import { findConfigs, getSecureFeatures, sentryExceptioMessage } from './functions';

export const checkMediaInputs = async (iceServersArray) => {
	try {
		const microphoneId = localStorage.getItem('microphoneID');
		const cameraId = localStorage.getItem('deviceId');
		const secureFeatures = getSecureFeatures();

		const shouldTestAudio = findConfigs(['record_audio'], secureFeatures.entities).length > 0;
		const shouldTestVideo = findConfigs(['record_video', 'record_room', 'verify_id', 'verify_candidate'], secureFeatures.entities).length > 0;
		const shouldTestBitrate = findConfigs(['verify_upload_speed'], secureFeatures.entities).length > 0;

		if (!shouldTestAudio && !shouldTestVideo && !shouldTestBitrate) {
			return {
				audio: null,
				video: null,
				bitrate: null,
				skipped: true,
				message: 'media_check_skipped'
			};
		}

		const audioTest = shouldTestAudio ? testAudioInputDevice({ deviceId: microphoneId || 'default' }) : null;
		const videoTest = shouldTestVideo ? testVideoInputDevice({ deviceId: cameraId || 'default' }) : null;
		const mediaConnectionBitrateTest = shouldTestBitrate ? testMediaConnectionBitrate({
			iceServers: iceServersArray,
			iceTransportPolicy: 'relay'
		}) : null;

		const testPromises = [];

		// Create promises for each test
		if (audioTest) {
			testPromises.push(new Promise((resolve) => {
				let audioReport = null;
				let audioError = null;

				audioTest.on(AudioInputTest.Events.End, (report) => {
					audioReport = report;
					console.log('Audio Report: ', report);
				});
				
				audioTest.on(AudioInputTest.Events.Error, (error) => {
					console.log('Audio Error:', error);
					audioError = error;
				});

				setTimeout(() => {
					audioTest.stop();
					
					const isAudioValid = () => {
						if (audioError || !audioReport || !Array.isArray(audioReport.values) || audioReport.errors?.length > 0) {
							return false;
						}
						const nonZero = audioReport.values.filter(v => v > 5);
						const percentActive = (nonZero.length / audioReport.values.length) * 100;
						return percentActive > 15;
					};

					resolve({
						type: 'audio',
						working: isAudioValid(),
						report: audioReport,
						error: audioError
					});
				}, 5000);
			}));
		}

		if (videoTest) {
			testPromises.push(new Promise((resolve) => {
				let videoReport = null;
				let videoError = null;

				videoTest.on(VideoInputTest.Events.End, (report) => {
					videoReport = report;
					console.log('Video Report: ', report);
				});
				
				videoTest.on(VideoInputTest.Events.Error, (error) => {
					console.log('Video Error:', error);
					videoError = error;
				});

				setTimeout(() => {
					videoTest.stop();
					
					const isVideoValid = () => {
						if (videoError || !videoReport || videoReport.errors?.length > 0 || !videoReport.resolution) return false;
						const { width, height } = videoReport.resolution;
						return width >= 320 && height >= 240;
					};

					resolve({
						type: 'video',
						working: isVideoValid(),
						report: videoReport,
						error: videoError
					});
				}, 5000);
			}));
		}

		if (mediaConnectionBitrateTest) {
			testPromises.push(new Promise((resolve) => {
				let bitrateReport = null;
				let bitrateError = null;
				let bitrateValues = [];

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

				setTimeout(() => {
					mediaConnectionBitrateTest.stop();
					
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

					resolve({
						type: 'bitrate',
						working: isBitrateValid(),
						report: bitrateReport,
						error: bitrateError,
						values: bitrateValues
					});
				}, 10000);
			}));
		}

		// Wait for all tests to complete
		const results = await Promise.all(testPromises);

		// Process results
		const audioResult = results.find(r => r.type === 'audio');
		const videoResult = results.find(r => r.type === 'video');
		const bitrateResult = results.find(r => r.type === 'bitrate');

		const audioWorking = shouldTestAudio ? (audioResult?.working ?? false) : null;
		const videoWorking = shouldTestVideo ? (videoResult?.working ?? false) : null;
		const bitrateWorking = shouldTestBitrate ? (bitrateResult?.working ?? false) : null;

		// Determine message
		let message = 'media_check_success';
		let errorMessage = '';

		if ((audioWorking || audioWorking === null) && (videoWorking || videoWorking === null) && (bitrateWorking || bitrateWorking === null)) {
			message = 'media_check_success';
		} else {
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
		}

		return {
			audio: audioWorking,
			video: videoWorking,
			bitrate: bitrateWorking,
			message: errorMessage ? undefined : message,
			error: errorMessage || undefined
		};
		
	} catch (err) {
		sentryExceptioMessage(err);
		console.log('Media Check Exception:', err);
		return {
			audio: false,
			video: false,
			bitrate: false,
			error: 'media_check_exception'
		};
	}
};