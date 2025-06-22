import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  // 👤 The user who posted the story
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // 🖼️ Media URL (image or video)
  mediaUrl: {
    type: String,
    required: true
  },

  // 📝 Optional caption
  caption: {
    type: String,
    default: ''
  },

  // ⏳ Expiry date (default 24 hours after creation)
  expiresAt: {
    type: Date,
    required: true
  }

}, {
  timestamps: true // adds createdAt and updatedAt
});

// ⏱️ Set default expiry to 24 hours if not provided
storySchema.pre('save', function (next) {
  if (!this.expiresAt) {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);
    this.expiresAt = expiry;
  }
  next();
});

export default mongoose.model('Story', storySchema);
