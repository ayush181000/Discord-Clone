const connectedUsers = new Map();

export const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });

  console.log('new user connected');
  console.log(connectedUsers);
};

export const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log('deleted a user');
    console.log(connectedUsers);
  }
};
