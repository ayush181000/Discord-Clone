import io from 'socket.io-client';
import store from '../store/store';

import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from '../store/actions/friendsActions';

import { updateDirectChatHistoryIfActive } from '../shared/utils/chat';
import { newRoomCreated, updateActiveRooms } from './roomHandler';

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  // socket = io('https://discord-clone-v2-backend.herokuapp.com/', {
  //   auth: {
  //     token: jwtToken,
  //   },
  // });

  socket = io('http://localhost:5002', {
    auth: {
      token: jwtToken,
    },
  });

  socket.on('connect', () => {
    // console.log('successfully connected with socket.io server');
    // console.log(socket.id);
  });

  socket.on('friends-invitations', (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('friends-list', (data) => {
    const { friendsList } = data;
    store.dispatch(setFriends(friendsList));
  });

  socket.on('online-users', (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on('direct-chat-history', (data) => {
    updateDirectChatHistoryIfActive(data);
  });

  socket.on('room-create', (data) => {
    newRoomCreated(data);
  });

  socket.on('active-rooms', (data) => {
    updateActiveRooms(data);
  });
};

export const sendDirectMessage = (data) => {
  socket.emit('direct-message', data);
};

export const getDirectChatHistory = (data) => {
  socket.emit('direct-chat-history', data);
};

export const createRoom = () => {
  socket.emit('room-create');
};

export const joinARoom = (data) => {
  socket.emit('room-join', data);
};

export const leaveARoom = (data) => {
  socket.emit('room-leave', data);
};
