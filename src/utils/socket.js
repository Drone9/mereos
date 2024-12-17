import { logger } from './functions';

const { SOCKET_URL } = require('./constant');

const { v4 } = require('uuid');

const generatePeerId = () => v4();

const getGroupId = () => {
	try {
		const storedId = JSON.parse(localStorage.getItem('socketGroupId'));
		if (storedId?.groupName) {
			return storedId.groupName;
		}
		const newId = generatePeerId();
		localStorage.setItem('socketGroupId', JSON.stringify({ groupName: newId }));
		return newId;
	} catch (error) {
		logger.warn('Error accessing localStorage or invalid UUID:', error);
		return generatePeerId();
	}
};

let socket;

const initSocket = () => {
	if (!SOCKET_URL) {
		throw new Error('SOCKET_URL is not defined');
	}

	let finalGroupName = getGroupId();

	socket = new WebSocket(`${SOCKET_URL}?groupName=${finalGroupName}`);

	socket.onerror = (error) => {
		logger.error('WebSocket error:', error);
	};

	socket.onclose = (event) => {
		logger.warn('WebSocket connection closed:', event.reason);
	};

	socket.onopen = () => {
		logger.log('WebSocket connection opened');
	};
};

const sendMessage = (message) => {
	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(message);
	} else {
		logger.error('WebSocket is not open. Unable to send message');
	}
};

const closeSocket = () => {
	if (socket) {
		socket.close();
	} else {
		logger.error('WebSocket is not initialized');
	}
};

export { initSocket, sendMessage, closeSocket , socket };
