import express from 'express';
const router = express.Router();
import { login, register } from '../controllers/authControllers.js';

import Joi from 'joi';
import expressJoi from 'express-joi-validation';
const validator = expressJoi.createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

router.post('/register', validator.body(registerSchema), register);

router.post('/login', validator.body(loginSchema), login);

export default router;
