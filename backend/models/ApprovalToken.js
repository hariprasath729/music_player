import mongoose from 'mongoose';

const approvalTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true, expires: 0 }
});

export default mongoose.model('ApprovalToken', approvalTokenSchema);