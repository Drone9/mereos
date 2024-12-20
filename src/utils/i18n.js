import i18next from 'i18next';
import { logger } from './functions';

i18next.init({
	lng: 'en',
	resources: {
		// en: {
		// 	translation: require('./locales/en.json')
		// },
		// es: {
		// 	translation: require('./locales/es.json')
		// },
		it: {
			translation: require('./locales/it/translations.json')
		}
	}
}, (err) => {
	if (err) return logger.error(err);
	updateTranslations();
});

const updateTranslations = () => {
	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const key = element.getAttribute('data-i18n');
		element.textContent = i18next.t(key);
	});
};

document.addEventListener('DOMContentLoaded', () => {
	updateTranslations();
});
