import User from '../../models/User.js';
import FriendInvitation from '../../models/FriendInvitation.js';
import {
  getActiveConnections,
  getSocketServerInstance,
} from '../../serverStore.js';

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail');

    // find if user of specified userId jas active connections
    const receiverList = getActiveConnections(userId);

    const io = getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitations', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export { updateFriendsPendingInvitations };
