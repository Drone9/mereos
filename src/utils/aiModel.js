import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { convertDataIntoParse, findConfigs, getSecureFeatures, logger } from './functions';

const AI_MODEL_ENTITIES = ['object_detection', 'multiple_people_detection', 'person_missing'];
const MODEL_LOAD_TIMEOUT_MS = 30000;
const WARMUP_SIZE_PX = 64;

let modelPromise = null;
let loadGeneration = 0;

export const needsAiModel = () => {
	const secureFeatures = getSecureFeatures();
	return findConfigs(AI_MODEL_ENTITIES, secureFeatures?.entities || []).length > 0;
};

const withTimeout = (promise, ms) => {
	let timeoutId;
	const timeout = new Promise((_, reject) => {
		timeoutId = setTimeout(() => reject(new Error(`AI model load timed out after ${ms}ms`)), ms);
	});
	return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
};

const selectBackend = async () => {
	try {
		await tf.setBackend('webgl');
		await tf.ready();
	} catch (webglError) {
		logger.warn('WebGL not supported. Falling back to CPU.', webglError);
		await tf.setBackend('cpu');
		await tf.ready();
	}
};

const warmUp = async (net) => {
	try {
		const canvas = document.createElement('canvas');
		canvas.width = WARMUP_SIZE_PX;
		canvas.height = WARMUP_SIZE_PX;
		await net.detect(canvas);
	} catch (warmupError) {
		logger.warn('AI model warm-up failed', warmupError);
	}
};

export const loadAiModel = () => {
	if (window.mereos.net) return Promise.resolve(window.mereos.net);
	if (!modelPromise) {
		const generation = ++loadGeneration;
		modelPromise = withTimeout((async () => {
			await selectBackend();
			const net = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
			await warmUp(net);
			return net;
		})(), MODEL_LOAD_TIMEOUT_MS).then((net) => {
			if (generation !== loadGeneration) {
				net.dispose?.();
				throw new Error('AI model load cancelled');
			}
			window.mereos.net = net;
			return net;
		}).catch((error) => {
			if (generation === loadGeneration) modelPromise = null;
			throw error;
		});
	}
	return modelPromise;
};

export const preloadAiModel = () => {
	try {
		if (!needsAiModel()) return;
		const secureFeatures = getSecureFeatures();
		if (!findConfigs(['verify_multiple_devices'], secureFeatures?.entities || []).length) return;
		if (convertDataIntoParse('preChecksSteps')?.preValidation) return;
		loadAiModel().catch((error) => logger.warn('AI model preload failed', error));
	} catch (error) {
		logger.warn('AI model preload skipped', error);
	}
};

export const disposeAiModel = () => {
	loadGeneration++;
	modelPromise = null;
	try {
		window.mereos.net?.dispose?.();
	} catch (error) {
		logger.warn('AI model dispose failed', error);
	}
	window.mereos.net = null;
};
