import { getSocketServerInstance, getActiveRooms } from '../../serverStore.js';

const updateRooms = (toSpecifiedTargetId = null) => {
  const io = getSocketServerInstance();
  const activeRooms = getActiveRooms();

  if (toSpecifiedTargetId) {
    io.to(toSpecifiedTargetId).emit('active-rooms', {
      activeRooms,
    });
  } else {
    io.emit('active-rooms', {
      activeRooms,
    });
  }
};

export { updateRooms };
