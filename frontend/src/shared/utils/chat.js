import store from '../../store/store';
import { setMessages } from '../../store/actions/chatActions';

const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;

  // find id of user and token and id from active connection
  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userDetails._id;

  if (receiverId && userId) {
    const usersInConversation = [receiverId, userId];

    updateDirectChatHistoryIfSameConversationsActive({
      participants,
      usersInConversation,
      messages,
    });
  }
};

const updateDirectChatHistoryIfSameConversationsActive = ({
  participants,
  usersInConversation,
  messages,
}) => {
  const result = participants.every(function (participantId) {
    return usersInConversation.includes(participantId);
  });

  if (result) {
    store.dispatch(setMessages(messages));
  }
};

export { updateDirectChatHistoryIfActive };
