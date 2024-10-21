import { SOCKET_URL } from './constant';
import { v4 } from 'uuid';

const socketGroupId  = JSON.parse(localStorage.getItem('socketGroupId'));

const v4Id = v4();
let finalGroupName = socketGroupId?.groupName || v4Id;

if (!socketGroupId?.groupName) {
	localStorage.setItem('socketGroupId',JSON.stringify({ groupName:finalGroupName }));
}

const socket = new WebSocket(`${SOCKET_URL}?groupName=${finalGroupName}`);
console.log('socket',socket);
export default socket;