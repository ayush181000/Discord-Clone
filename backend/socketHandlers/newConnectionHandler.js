import { addNewConnectedUser } from '../serverStore.js';
import {
  updateFriendsPendingInvitations,
  updateFriends,
} from './updates/friends.js';
import { updateRooms } from './updates/rooms.js';

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  addNewConnectedUser({ socketId: socket.id, userId: userDetails.userId });

  // update pending friends invitations list
  updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
  updateFriends(userDetails.userId);

  // update rooms
  setTimeout(() => {
    updateRooms(socket.id);
  }, [500]);
};

export default newConnectionHandler;
