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

	let finalGroupName = getGroupId();

	window.mereos.socket = new WebSocket(`${SOCKET_URL}?groupName=${finalGroupName}`);

	window.mereos.socket.onerror = (error) => {
		logger.error('WebSocket error:', error);
	};

	window.mereos.socket.onclose = (event) => {
		logger.warn('WebSocket connection closed:', event.reason);
	};

	window.mereos.socket.onopen = () => {
		logger.success('WebSocket connection opened');
	};
};

const sendMessage = (message) => {
	if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
		window.mereos.socket.send(message);
	} else {
		logger.error('WebSocket is not open. Unable to send message');
	}
};

const closeSocket = () => {
	if (window.mereos.socket) {
		window.mereos.socket.close();
	} else {
		logger.error('WebSocket is not initialized');
	}
};

export { initSocket, sendMessage, closeSocket  };
