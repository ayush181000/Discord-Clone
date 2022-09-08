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

const updateFriends = async (userId) => {
  try {
    // find active connections of specefic id
    const receiverList = getActiveConnections(userId);
    if (receiverList.length > 0) {
      const user = await User.findById(userId, { id: 1, friends: 1 }).populate(
        'friends',
        '_id username mail'
      );

      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          };
        });

        // get io instance
        const io = getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit('friends-list', {
            friendsList: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export { updateFriendsPendingInvitations, updateFriends };
