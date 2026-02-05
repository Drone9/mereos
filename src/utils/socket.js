import { logger, sentryExceptioMessage } from './functions';

const { SOCKET_URL } = require('./constant');
const { v4 } = require('uuid');

let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectDelay = 2000;
let reconnectTimer = null;
let messageQueue = [];

const generatePeerId = () => v4();

const getGroupId = () => {
	try {
		const stored = localStorage.getItem('socketGroupId');
		if (stored) {
			const parsed = JSON.parse(stored);
			return parsed.groupName;
		}
		
		const newId = generatePeerId();
		localStorage.setItem('socketGroupId', JSON.stringify({ groupName: newId }));
		return newId;
	} catch (error) {
		sentryExceptioMessage(error,{type:'error',message:`Error accessing localStorage or invalid UUID`});
		logger.warn('Error accessing localStorage or invalid UUID:', error);
		return generatePeerId();
	}
};

const createWebSocketConnection = () => {
	if (window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN) {
		flushMessageQueue();
		return;
	}

	if (!SOCKET_URL) {
		throw new Error('SOCKET_URL is not defined');
	}

	if (window.mereos.socket) {
		try { window.mereos.socket.close(); } catch {}
	}

	const finalGroupName = getGroupId();

	window.mereos.socket = new WebSocket(`${SOCKET_URL}?groupName=${finalGroupName}`);

	window.mereos.socket.onopen = () => {
		reconnectAttempts = 0;
		if (reconnectTimer) {
			clearTimeout(reconnectTimer);
			reconnectTimer = null;
		}
		flushMessageQueue();
	};

	window.mereos.socket.onclose = (event) => {
		if (event.code !== 1000) {
			attemptReconnect();
		}
	};

	window.mereos.socket.onerror = (error) => {
		logger.error('WebSocket error:', error);
	};

	window.mereos.socket.onmessage = (event) => {
		logger.info('Message received:', event.data);
	};
};


const attemptReconnect = () => {
	if (reconnectTimer) clearTimeout(reconnectTimer);

	if (reconnectAttempts < maxReconnectAttempts) {
		reconnectAttempts++;
		reconnectTimer = setTimeout(() => {
			createWebSocketConnection();
		}, reconnectDelay);
	} else {
		logger.error('Max reconnection attempts reached.');
	}
};

const flushMessageQueue = () => {
	while (messageQueue.length && isSocketConnected()) {
		const msg = messageQueue.shift();
		try {
			window.mereos.socket.send(msg);
		} catch (err) {
			messageQueue.unshift(msg);
			break;
		}
	}
};

const initSocket = () => {
	createWebSocketConnection();
};

const sendMessage = (message) => {
	const payload = typeof message === 'string' ? message : JSON.stringify(message);
	if (isSocketConnected()) {
		try {
			window.mereos.socket.send(payload);
		} catch (err) {
			messageQueue.push(payload);
		}
	} else {
		messageQueue.push(payload);
		createWebSocketConnection();
	}
};

const closeSocket = () => {
	if (reconnectTimer) {
		clearTimeout(reconnectTimer);
		reconnectTimer = null;
	}

	reconnectAttempts = maxReconnectAttempts; 

	if (window.mereos.socket) {
		window.mereos.socket.close(1000, 'Manual close');
		window.mereos.socket = null;
	} else {
		logger.warn('WebSocket is not initialized');
	}
};

const getConnectionState = () => {
	if (!window.mereos.socket) return 'NOT_INITIALIZED';
	
	switch (window.mereos.socket.readyState) {
		case WebSocket.CONNECTING:
			return 'CONNECTING';
		case WebSocket.OPEN:
			return 'OPEN';
		case WebSocket.CLOSING:
			return 'CLOSING';
		case WebSocket.CLOSED:
			return 'CLOSED';
		default:
			return 'UNKNOWN';
	}
};

const isSocketConnected = () => {
	return window.mereos.socket && window.mereos.socket.readyState === WebSocket.OPEN;
};

const forceReconnect = () => {
	reconnectAttempts = 0;
	localStorage.removeItem('socketGroupId');
	createWebSocketConnection();
};

export { 
	initSocket, 
	sendMessage, 
	closeSocket, 
	getConnectionState, 
	isSocketConnected,
	forceReconnect 
};