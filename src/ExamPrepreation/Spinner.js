export const createSpinner = ({ backgroundColor, style }) => {
	const spinnerContainer = document.createElement('div');
	spinnerContainer.className = 'spinner';

	if (style) {
		Object.assign(spinnerContainer.style, style);
	}

	const colorStyles = backgroundColor ? { backgroundColor } : {backgroundColor: '#3498db'};

	function createBounce(className) {
		const bounce = document.createElement('div');
		bounce.className = className;
		Object.assign(bounce.style, colorStyles);
		return bounce;
	}

	const bounce1 = createBounce('bounce1');
	const bounce2 = createBounce('bounce2');
	const bounce3 = createBounce('bounce3');

	spinnerContainer.appendChild(bounce1);
	spinnerContainer.appendChild(bounce2);
	spinnerContainer.appendChild(bounce3);

	return spinnerContainer;
};

