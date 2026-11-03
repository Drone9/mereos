const TOPOLOGY_POLL_MS = 2000;
const VERIFY_SAMPLE_MS = 1000;
const VERIFY_FROZEN_MS = 10000;
const GRAB_TIMEOUT_MS = 3000;
const SAMPLE_WIDTH = 64;
const SAMPLE_HEIGHT = 36;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const grabFrameHash = async (imageCapture) => {
	const grab = imageCapture.grabFrame();
	const timedOut = Symbol('timeout');
	let bitmap = null;
	try {
		const result = await Promise.race([grab, wait(GRAB_TIMEOUT_MS).then(() => timedOut)]);
		if (result === timedOut) {
			grab.then((late) => late?.close?.()).catch(() => {});
			return null;
		}
		bitmap = result;
		const canvas = document.createElement('canvas');
		canvas.width = SAMPLE_WIDTH;
		canvas.height = SAMPLE_HEIGHT;
		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		ctx.drawImage(bitmap, 0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
		const { data } = ctx.getImageData(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
		let hash = 0;
		for (let i = 0; i < data.length; i += 4) {
			hash = (hash * 31 + data[i] + data[i + 1] * 3 + data[i + 2] * 7) | 0;
		}
		return hash;
	} catch {
		return null;
	} finally {
		bitmap?.close?.();
	}
};

const isShareStillLive = async (track, isStopped) => {
	const imageCapture = new window.ImageCapture(track);
	const startedAt = Date.now();
	let previousHash = null;

	while (Date.now() - startedAt < VERIFY_FROZEN_MS) {
		if (isStopped() || track.readyState !== 'live') return true;

		const hash = await grabFrameHash(imageCapture);
		if (hash !== null && previousHash !== null && hash !== previousHash) return true;
		if (hash !== null) previousHash = hash;
		await wait(VERIFY_SAMPLE_MS);
	}
	return false;
};

export const watchSharedDisplay = (track, { onLost }) => {
	const screen = window.screen;
	if (!track || typeof window.ImageCapture !== 'function' || typeof screen?.isExtended !== 'boolean') {
		return () => {};
	}

	let stopped = false;
	let verifying = false;
	let wasExtended = screen.isExtended;
	let intervalId = null;

	const stop = () => {
		stopped = true;
		clearInterval(intervalId);
		track.removeEventListener('ended', stop);
		screen.removeEventListener?.('change', check);
	};

	async function check() {
		if (stopped || verifying) return;
		if (track.readyState === 'ended') {
			stop();
			return;
		}
		const isExtended = screen.isExtended;
		const displayRemoved = wasExtended && !isExtended;
		wasExtended = isExtended;
		if (!displayRemoved) return;

		verifying = true;
		try {
			const live = await isShareStillLive(track, () => stopped);
			if (!live && !stopped) {
				stop();
				onLost();
			}
		} finally {
			verifying = false;
		}
	}

	intervalId = setInterval(check, TOPOLOGY_POLL_MS);
	screen.addEventListener?.('change', check);
	track.addEventListener('ended', stop);
	return stop;
};
