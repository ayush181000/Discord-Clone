import express from 'express';
import cors from 'cors';
import http from 'http';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';

import { registerSocketServer } from './socketServer.js';
import authRoutes from './routes/authRoutes.js';
import friendInvitationRoutes from './routes/friendInvitationRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

// rotues
app.get('/', (req, res) => {
  res.send('Server started successfully');
});
app.use('/api/auth', authRoutes);
app.use('/api/friend-invitation', friendInvitationRoutes);

const server = http.createServer(app);
registerSocketServer(server);

const PORT = process.env.PORT || process.env.API_PORT;

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
