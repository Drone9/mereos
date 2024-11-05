import { SOCKET_URL } from './constant';
import { v4 } from 'uuid';

const generatePeerId = () => v4();

const getGroupId = () => {
	const storedId = JSON.parse(localStorage.getItem('socketGroupId'));
	if (storedId?.groupName) {
		return storedId.groupName;
	} else {
		const newId = generatePeerId(); // Generate a new group ID here if none exists
		localStorage.setItem('socketGroupId', JSON.stringify({ groupName: newId }));
		return newId;
	}
};

let finalGroupName = getGroupId();

const socket = new WebSocket(`${SOCKET_URL}?groupName=${finalGroupName}`);

export default socket;