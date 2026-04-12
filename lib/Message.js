import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }   // adds createdAt + updatedAt automatically
);

// Prevent re-registering the model during hot-reload
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;
