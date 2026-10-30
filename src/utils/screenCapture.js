import { logger } from './functions';

const SOURCE_START_TIMEOUT_MS = 5000;
const PLAY_TIMEOUT_MS = 2000;

export const SCREEN_CAPTURE_NOT_READY = 'screen_capture_stream_not_ready';

const waitForLoadedData = (videoEl, timeoutMs) => new Promise((resolve) => {
	if (videoEl.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
		resolve(true);
		return;
	}

	const timeoutId = setTimeout(() => resolve(false), timeoutMs);
	videoEl.addEventListener('loadeddata', () => {
		clearTimeout(timeoutId);
		resolve(true);
	}, { once: true });
});

const createProcessorSource = (track) => {
	const processor = new window.MediaStreamTrackProcessor({ track });
	const reader = processor.readable.getReader();
	let latestFrame = null;
	let closed = false;

	const readLoop = async () => {
		try {
			while (!closed) {
				const { value, done } = await reader.read();
				if (done) break;
				if (latestFrame) {
					latestFrame.close();
				}
				latestFrame = value;
			}
		} catch (error) {
			if (!closed) {
				logger.error('Screen frame reader error:', error);
			}
		}
	};

	readLoop();

	return {
		kind: 'processor',
		draw(ctx, width, height) {
			if (latestFrame) {
				ctx.drawImage(latestFrame, 0, 0, width, height);
			}
		},
		dispose() {
			closed = true;
			try {
				reader.cancel();
			} catch (error) {
				logger.error('Error cancelling screen frame reader:', error);
			}
			if (latestFrame) {
				latestFrame.close();
				latestFrame = null;
			}
		}
	};
};

const createVideoSource = async (stream) => {
	const videoEl = document.createElement('video');
	videoEl.autoplay = true;
	videoEl.playsInline = true;
	videoEl.muted = true;
	videoEl.srcObject = stream;
	videoEl.setAttribute('aria-hidden', 'true');
	videoEl.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-1;';
	document.body.appendChild(videoEl);

	const loaded = await waitForLoadedData(videoEl, SOURCE_START_TIMEOUT_MS);
	if (!loaded) {
		videoEl.srcObject = null;
		videoEl.remove();
		return null;
	}

	await Promise.race([
		videoEl.play().catch((error) => {
			logger.error('Screen capture video play failed:', error);
		}),
		new Promise((resolve) => setTimeout(resolve, PLAY_TIMEOUT_MS))
	]);

	return {
		kind: 'video',
		draw(ctx, width, height) {
			ctx.drawImage(videoEl, 0, 0, width, height);
		},
		dispose() {
			videoEl.pause();
			videoEl.srcObject = null;
			videoEl.remove();
		}
	};
};

export const createScreenFrameSource = async (track, stream) => {
	if (typeof window.MediaStreamTrackProcessor === 'function' && track) {
		try {
			return createProcessorSource(track);
		} catch (error) {
			logger.error('MediaStreamTrackProcessor failed, falling back to video:', error);
		}
	}

	return createVideoSource(stream);
};

export const sampleCanvasPixels = (ctx, width, height) => {
	if (!ctx || !width || !height) {
		return { canvasBlack: null, pixels: [] };
	}

	const points = [
		[0, 0],
		[width - 1, 0],
		[0, height - 1],
		[width - 1, height - 1],
		[Math.floor(width / 2), Math.floor(height / 2)]
	];

	try {
		const pixels = points.map(([x, y]) => {
			const data = ctx.getImageData(x, y, 1, 1).data;
			return [data[0], data[1], data[2], data[3]];
		});
		const canvasBlack = pixels.every(([r, g, b]) => r === 0 && g === 0 && b === 0);
		return { canvasBlack, pixels };
	} catch (error) {
		return {
			canvasBlack: null,
			pixels: [],
			pixelSampleError: error?.message
		};
	}
};

// Samples the real share (not the canvas copy) to tell "screen really is black" apart from
// "the canvas copy broke".
export const sampleSourcePixels = async (mediaTrack) => {
	if (typeof window.ImageCapture !== 'function' || mediaTrack?.readyState !== 'live') {
		return { sourceBlack: null, sourcePixels: [], sourceSampleError: 'image_capture_unavailable' };
	}

	let bitmap = null;
	try {
		bitmap = await new window.ImageCapture(mediaTrack).grabFrame();
		const sampleCanvas = document.createElement('canvas');
		sampleCanvas.width = 160;
		sampleCanvas.height = 90;
		const sampleCtx = sampleCanvas.getContext('2d');
		sampleCtx.drawImage(bitmap, 0, 0, sampleCanvas.width, sampleCanvas.height);
		const { canvasBlack, pixels, pixelSampleError } = sampleCanvasPixels(
			sampleCtx,
			sampleCanvas.width,
			sampleCanvas.height
		);
		return {
			sourceBlack: canvasBlack,
			sourcePixels: pixels,
			...(pixelSampleError ? { sourceSampleError: pixelSampleError } : {})
		};
	} catch (error) {
		return {
			sourceBlack: null,
			sourcePixels: [],
			sourceSampleError: error?.message || String(error)
		};
	} finally {
		bitmap?.close?.();
	}
};
