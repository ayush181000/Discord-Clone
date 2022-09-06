import { removeConnectedUser } from '../serverStore.js';

const disconnectHandler = async (socket) => {
  removeConnectedUser(socket.id);
};

export default disconnectHandler;
