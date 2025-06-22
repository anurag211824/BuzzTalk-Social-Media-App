import mongoose from "mongoose";

// ➕ Followers Schema
const followerSchema = new mongoose.Schema(
  {
    // 👤 The user who follows
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📥 The user who is being followed
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // 🕒 To track when the follow happened
  }
);

// 🔐 Prevent duplicate follow entries
followerSchema.index({ follower: 1, following: 1 }, { unique: true });

export default mongoose.model("Follower", followerSchema);
