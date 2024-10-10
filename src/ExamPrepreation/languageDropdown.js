import i18next from 'i18next';

export const LanguageDropdown = (languages) => {
	const dropdown = document.createElement('div');
	dropdown.className = 'dropdown';

	const select = document.createElement('div');
	select.className = 'select';

	const selectedLanguage = document.createElement('div');
	selectedLanguage.textContent = 'Select Language';
	select.appendChild(selectedLanguage);

	const dropdownContent = document.createElement('div');
	dropdownContent.className = 'dropdown-content';

	languages.forEach((language) => {
		const option = document.createElement('div');
		option.className = 'option';
		option.textContent = language.name;

		option.addEventListener('click', () => {
			selectedLanguage.textContent = language.name;
			dropdownContent.classList.remove('active');
			console.log(`Changing language to ${language.keyword}`); // Debugging log
			setLanguage(language.keyword); // Change language
		});

		dropdownContent.appendChild(option);
	});

	select.addEventListener('click', () => {
		dropdownContent.classList.toggle('active');
	});

	dropdown.appendChild(select);
	dropdown.appendChild(dropdownContent);

	return dropdown;
};

// Function to set the language using i18next
export const setLanguage = (lang) => {
	i18next.changeLanguage(lang, (err) => {
		if (err) return console.error(err);
		updateTranslations();
	});
};

// Function to update translations in the document
export const updateTranslations = () => {
	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const key = element.getAttribute('data-i18n');
		element.textContent = i18next.t(key);
	});
	console.log('Translations updated'); // Debugging log
};