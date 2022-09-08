import { addNewConnectedUser } from '../serverStore.js';
import { updateFriendsPendingInvitations } from './updates/friends.js';

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  addNewConnectedUser({ socketId: socket.id, userId: userDetails.userId });

  // update pending friends invitations list
  updateFriendsPendingInvitations(userDetails.userId);
};

export default newConnectionHandler;
