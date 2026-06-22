import path from 'path';

function patchFunctionsJs(content) {
	if (content.includes('cyTranslation')) {
		return content;
	}

	const localeImports = `
import cyTranslation from '../assets/locales/cy/translation.json';
import enTranslation from '../assets/locales/en/translation.json';
import frTranslation from '../assets/locales/fr/translation.json';
import itTranslation from '../assets/locales/it/translation.json';
import ptTranslation from '../assets/locales/pt/translation.json';
import nlTranslation from '../assets/locales/nl/translation.json';
import esTranslation from '../assets/locales/es/translation.json';
import deTranslation from '../assets/locales/de/translation.json';`;

	content = content.replace(
		"import * as Sentry from '@sentry/browser';",
		`import * as Sentry from '@sentry/browser';${localeImports}`,
	);

	const localeMap = [
		["require('../assets/locales/cy/translation.json')", 'cyTranslation'],
		["require('../assets/locales/en/translation.json')", 'enTranslation'],
		["require('../assets/locales/fr/translation.json')", 'frTranslation'],
		["require('../assets/locales/it/translation.json')", 'itTranslation'],
		["require('../assets/locales/pt/translation.json')", 'ptTranslation'],
		["require('../assets/locales/nl/translation.json')", 'nlTranslation'],
		["require('../assets/locales/es/translation.json')", 'esTranslation'],
		["require('../assets/locales/de/translation.json')", 'deTranslation'],
	];

	for (const [from, to] of localeMap) {
		content = content.split(from).join(to);
	}

	return content;
}

function patchSocketJs(content) {
	if (content.includes("import { SOCKET_URL }")) {
		return content;
	}

	const normalized = content.replace(/\r\n/g, '\n');
	const patched = normalized.replace(
		`const { SOCKET_URL } = require('./constant');
const { v4 } = require('uuid');`,
		`import { SOCKET_URL } from './constant';
import { v4 } from 'uuid';`,
	);

	return patched === normalized
		? content.replace(
			"const { SOCKET_URL } = require('./constant');",
			"import { SOCKET_URL } from './constant';",
		).replace(
			"const { v4 } = require('uuid');",
			"import { v4 } from 'uuid';",
		)
		: patched;
}

function patchI18nJs(content) {
	if (content.includes('itTranslation')) {
		return content;
	}

	return content
		.replace(
			"import { logger } from './functions';",
			`import { logger } from './functions';
import itTranslation from './locales/it/translations.json';`,
		)
		.replace(
			"translation: require('./locales/it/translations.json')",
			'translation: itTranslation',
		);
}

function normalizeId(id) {
	return id.split('?')[0].replace(/\\/g, '/');
}

function patchFile(file, content) {
	if (file.endsWith('/src/utils/functions.js')) {
		return patchFunctionsJs(content);
	}
	if (file.endsWith('/src/utils/socket.js')) {
		return patchSocketJs(content);
	}
	if (file.endsWith('/src/utils/i18n.js')) {
		return patchI18nJs(content);
	}
	return null;
}

function isLibraryFile(file, projectRoot) {
	const normalized = file.replace(/\\/g, '/');
	const root = projectRoot.replace(/\\/g, '/');
	return normalized.startsWith(`${root}/src/`) || normalized === `${root}/index.js`;
}

export function browserCompatPlugin(projectRoot) {
	const root = projectRoot.replace(/\\/g, '/');

	return {
		name: 'mereos-browser-compat',
		enforce: 'pre',
		transform(code, id) {
			const file = normalizeId(id);
			if (!file.startsWith(root)) {
				return null;
			}
			const patched = patchFile(file, code);
			return patched ? { code: patched, map: null } : null;
		},
		configureServer(server) {
			server.watcher.add(path.join(projectRoot, 'index.js'));
			server.watcher.add(path.join(projectRoot, 'src'));
		},
		handleHotUpdate({ file, server }) {
			if (!isLibraryFile(file, projectRoot)) {
				return;
			}

			const modules = new Set();
			for (const mod of server.moduleGraph.getModulesByFile(file) ?? []) {
				modules.add(mod);
				mod.importers.forEach((importer) => modules.add(importer));
			}

			const mereosEntry = path.join(projectRoot, 'index.js');
			for (const mod of server.moduleGraph.getModulesByFile(mereosEntry) ?? []) {
				modules.add(mod);
				mod.importers.forEach((importer) => modules.add(importer));
			}

			return [...modules];
		},
	};
}
