import store from '../store/store';
import {
  setActiveRooms,
  setLocalStream,
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

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
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
  const successCallbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    joinARoom(roomId);
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;

  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  leaveARoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
