import store from '../store/store';
import {
  setActiveRooms,
  setOpenRoom,
  setRoomDetails,
} from '../store/actions/roomActions';
import { createRoom, joinARoom, leaveARoom } from './socketConnection';
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () => {
  const successCallbackFunc = () => {
    store.dispatch(setOpenRoom(true, true));
    createRoom();
  };

  webRTCHandler.getLocalStreamPreview(false, successCallbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  const friends = store.getState().friends.friends;
  const rooms = [];

  activeRooms.forEach((room) => {
    friends.forEach((f) => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUsername: f.username });
      }
    });
  });

  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  store.dispatch(setRoomDetails({ roomId }));
  store.dispatch(setOpenRoom(false, true));
  joinARoom(roomId);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;
  leaveARoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
