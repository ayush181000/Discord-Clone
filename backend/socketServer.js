import { Server } from 'socket.io';
import { verifyTokenSocket } from './middleware/authSocket.js';
import { getOnlineUsers, setSocketServerInstance } from './serverStore.js';
import disconnectHandler from './socketHandlers/disconnectHandler.js';
import newConnectionHandler from './socketHandlers/newConnectionHandler.js';

export const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  setSocketServerInstance(io);

  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  const emitOnlineUser = () => {
    const onlineUsers = getOnlineUsers();
    io.emit('online-users', { onlineUsers });
  };

  io.on('connection', (socket) => {
    newConnectionHandler(socket, io);
    emitOnlineUser();

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUser();
  }, [1000 * 8]);
};
