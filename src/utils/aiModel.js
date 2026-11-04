import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { findConfigs, getSecureFeatures, logger } from './functions';

const AI_MODEL_ENTITIES = ['object_detection', 'multiple_people_detection', 'person_missing'];
const MODEL_BASE = 'lite_mobilenet_v2';
const MODEL_LOAD_TIMEOUT_MS = 30000;

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

export const loadAiModel = () => {
	if (window.mereos.net) return Promise.resolve(window.mereos.net);
	if (!modelPromise) {
		const generation = ++loadGeneration;
		modelPromise = withTimeout((async () => {
			await selectBackend();
			return cocoSsd.load({ base: MODEL_BASE });
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
