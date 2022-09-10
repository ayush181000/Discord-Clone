import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import { updateChatHistory } from './updates/chat.js';

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;

    // find if conversation already exists
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
      type: 'DIRECT',
    });

    if (conversation) {
      updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (err) {
    console.log(err);
  }
};

export default directChatHistoryHandler;
