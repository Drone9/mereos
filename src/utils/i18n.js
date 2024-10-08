import i18next from 'i18next';

i18next.init({
	lng: 'en',
	resources: {
		en: {
			translation: require('./locales/en.json')
		},
		es: {
			translation: require('./locales/es.json')
		}
	}
}, (err) => {
	if (err) return console.error(err);
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
