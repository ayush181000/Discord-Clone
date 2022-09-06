import express from 'express';
const router = express.Router();

// validation
import Joi from 'joi';
import expressJoi from 'express-joi-validation';
const validator = expressJoi.createValidator({});

// middleware
import { protect } from '../middleware/authMiddleware.js';
import { postInvite } from '../controllers/friendInvitationsController.js';

const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email().required(),
});

router.post(
  '/invite',
  protect,
  validator.body(postFriendInvitationSchema),
  postInvite
);

export default router;
