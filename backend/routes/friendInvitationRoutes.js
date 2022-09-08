import express from 'express';
const router = express.Router();

// validation
import Joi from 'joi';
import expressJoi from 'express-joi-validation';
const validator = expressJoi.createValidator({});

// middleware
import { protect } from '../middleware/authMiddleware.js';
import {
  postInvite,
  postAccept,
  postReject,
} from '../controllers/friendInvitationsController.js';

const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email().required(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  '/invite',
  protect,
  validator.body(postFriendInvitationSchema),
  postInvite
);

router.post(
  '/accept',
  protect,
  validator.body(inviteDecisionSchema),
  postAccept
);

router.post(
  '/reject',
  protect,
  validator.body(inviteDecisionSchema),
  postReject
);

export default router;
