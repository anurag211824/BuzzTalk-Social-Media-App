import mongoose from 'mongoose';

const savedPostSchema = new mongoose.Schema({
  // 👤 User who saved the post
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // 🖼️ The post that was saved
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },

  // 🗓️ Auto-stored breakdown for filtering
  savedYear: {
    type: Number
  },
  savedMonth: {
    type: Number // 1 = Jan, 12 = Dec
  },
  savedDate: {
    type: Number // 1–31
  }

}, { timestamps: true });

// 🧠 Set savedYear, savedMonth, savedDate before save
savedPostSchema.pre('save', function (next) {
  const savedAt = this.createdAt || new Date();
  this.savedYear = savedAt.getFullYear();
  this.savedMonth = savedAt.getMonth() + 1; // getMonth() is 0-based
  this.savedDate = savedAt.getDate();
  next();
});

// 🔐 Prevent duplicate saves
savedPostSchema.index({ user: 1, post: 1 }, { unique: true });

export default mongoose.model('SavedPost', savedPostSchema);
