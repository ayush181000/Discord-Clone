import { Server } from 'socket.io';
import { verifyTokenSocket } from './middleware/authSocket.js';
import { setSocketServerInstance } from './serverStore.js';
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

  io.on('connection', (socket) => {
    newConnectionHandler(socket, io);

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });
};
