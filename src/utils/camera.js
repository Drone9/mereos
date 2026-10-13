export const CAMERA_FRAME_TIMEOUT_MS = 10000;
const CAMERA_BUSY_RETRY_DELAY_MS = 800;

const getStoredDeviceId = (key) => {
	const deviceId = localStorage.getItem(key);
	return deviceId && deviceId !== 'null' && deviceId !== 'undefined' ? deviceId : null;
};

export const getPreferredCameraId = () => getStoredDeviceId('deviceId');

export const getPreferredMicrophoneId = () => getStoredDeviceId('microphoneID');

export const isStreamLive = (mediaStream) =>
	!!mediaStream?.getVideoTracks().some(track => track.readyState === 'live');

export const stopStream = (mediaStream) => {
	mediaStream?.getTracks().forEach(track => track.stop());
	if (mediaStream && window.mereos?.globalStream === mediaStream) {
		window.mereos.globalStream = null;
	}
};

export const requestCameraStream = async (videoConstraints, { audio = false } = {}) => {
	const cameraId = getPreferredCameraId();
	const microphoneId = audio ? getPreferredMicrophoneId() : null;
	const buildConstraints = (useSelectedDevices) => ({
		video: useSelectedDevices && cameraId ? { ...videoConstraints, deviceId: { exact: cameraId } } : videoConstraints,
		audio: audio ? (useSelectedDevices && microphoneId ? { deviceId: { exact: microphoneId } } : true) : false
	});
	const getMedia = (useSelectedDevices) => navigator.mediaDevices.getUserMedia(buildConstraints(useSelectedDevices));

	try {
		return await getMedia(true);
	} catch (error) {
		if ((cameraId || microphoneId) && (error.name === 'OverconstrainedError' || error.name === 'NotFoundError')) {
			return getMedia(false);
		}
		if (error.name === 'NotReadableError' || error.name === 'AbortError') {
			await new Promise(resolve => setTimeout(resolve, CAMERA_BUSY_RETRY_DELAY_MS));
			return getMedia(true);
		}
		throw error;
	}
};

export const hasVideoFrame = (video) =>
	!!video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.videoWidth > 0;

export const waitForVideoReady = (video, timeoutMs = CAMERA_FRAME_TIMEOUT_MS) => new Promise((resolve, reject) => {
	if (video.readyState >= HTMLMediaElement.HAVE_METADATA && video.videoWidth > 0) {
		resolve();
		return;
	}
	const events = ['loadedmetadata', 'loadeddata'];
	const cleanup = () => {
		clearTimeout(timer);
		events.forEach(event => video.removeEventListener(event, onReady));
	};
	const onReady = () => {
		cleanup();
		resolve();
	};
	const timer = setTimeout(() => {
		cleanup();
		reject(new Error('camera_frame_timeout'));
	}, timeoutMs);
	events.forEach(event => video.addEventListener(event, onReady));
});
