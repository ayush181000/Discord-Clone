import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

// rotues
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
