import { logger } from './functions';

const { SOCKET_URL } = require('./constant');

const { v4 } = require('uuid');

const generatePeerId = () => v4();

const getGroupId = () => {
	try {
		const newId = generatePeerId();
		localStorage.setItem('socketGroupId', JSON.stringify({ groupName: newId }));
		return newId;
	} catch (error) {
		logger.warn('Error accessing localStorage or invalid UUID:', error);
		return generatePeerId();
	}
};

const initSocket = () => {
	if (!SOCKET_URL) {
		throw new Error('SOCKET_URL is not defined');
	}

	window.socket = null;

	let finalGroupName = getGroupId();

	window.socket = new WebSocket(`${SOCKET_URL}?groupName=${finalGroupName}`);

	window.socket.onerror = (error) => {
		logger.error('WebSocket error:', error);
	};

	window.socket.onclose = (event) => {
		logger.warn('WebSocket connection closed:', event.reason);
	};

	window.socket.onopen = () => {
		logger.success('WebSocket connection opened');
	};
};

const sendMessage = (message) => {
	if (window.socket && window.socket.readyState === WebSocket.OPEN) {
		window.socket.send(message);
	} else {
		logger.error('WebSocket is not open. Unable to send message');
	}
};

const closeSocket = () => {
	if (window.socket) {
		window.socket.close();
	} else {
		logger.error('WebSocket is not initialized');
	}
};

export { initSocket, sendMessage, closeSocket  };
