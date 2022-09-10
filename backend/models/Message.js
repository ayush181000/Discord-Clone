import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  content: { type: String },
  date: { type: Date },
  type: {
    type: String,
    enum: ['GROUP', 'DIRECT'],
  },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
