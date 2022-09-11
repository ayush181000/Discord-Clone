import store from '../store/store';
import { setOpenRoom, setRoomDetails } from '../store/actions/roomActions';
import { createRoom } from './socketConnection';

export const createNewRoom = () => {
  store.dispatch(setOpenRoom(true, true));
  createRoom();
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;

  store.dispatch(setRoomDetails(roomDetails));
};
