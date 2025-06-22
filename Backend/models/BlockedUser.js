import mongoose from 'mongoose';

// 🚫 Blocked Users Schema
const blockedUserSchema = new mongoose.Schema({
  // 👤 User who is doing the blocking
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // ❌ The user being blocked
  blockedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // 🕒 block time
});

// 🔐 Prevent duplicate block entries
blockedUserSchema.index({ user: 1, blockedUser: 1 }, { unique: true });

export default mongoose.model('BlockedUser', blockedUserSchema);