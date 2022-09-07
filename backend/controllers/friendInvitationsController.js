import User from '../models/User.js';
import FriendInvitation from '../models/FriendInvitation.js';
import { updateFriendsPendingInvitations } from '../socketHandlers/updates/friends.js';

const postInvite = async (req, res) => {
  try {
    const { targetMailAddress } = req.body;

    const { userId, mail } = req.user;
    // check if freind that we would like to invite is not the user
    if (mail.toLowerCase() === targetMailAddress.toLowerCase())
      return res
        .status(409)
        .send('Sorry. You cannot become friend with yourself');

    // if user not found with mail
    const targetUser = await User.findOne({ mail: targetMailAddress });
    if (!targetUser)
      return res
        .status(404)
        .send(
          `Email ${targetMailAddress} has not been found. Please check mail address`
        );

    // check if invitation has been already sent
    const inivtationAlreadyRecieved = await FriendInvitation.findOne({
      senderId: userId,
      receiverId: targetUser._id,
    });

    if (inivtationAlreadyRecieved)
      return res.status(409).send(`Invitation has already been sent`);

    // check if user which we would like to invite is already our friend
    const usersAlreadyFriends = targetUser.friends.find(
      (friendId) => friendId.toString() === userId.toString()
    );
    if (usersAlreadyFriends)
      return res
        .status(409)
        .send(`Friend already added. please check friends list`);

    /// create new invitation in database
    const newInvitation = await FriendInvitation.create({
      senderId: userId,
      receiverId: targetUser._id,
    });

    // if invitation has been successfully created we would like to upodate friends invitation if he is online

    // send pending invitations update to specefic user
    updateFriendsPendingInvitations(targetUser._id.toString());

    // send response
    return res.status(201).send('Invitation Sent');
  } catch (error) {
    return res.status(500).send('Error occured. Please try again');
  }
};
export { postInvite };
