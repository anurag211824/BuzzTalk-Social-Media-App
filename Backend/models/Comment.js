import mongoose from "mongoose";

// 💬 Comment Schema
const commentSchema = new mongoose.Schema(
  {
    // ✍️ Comment text
    text: {
      type: String,
      required: true,
      trim: true,
    },

    // 👤 Who made the comment
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📝 Which post this comment belongs to
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    // 🗓️ Time tracking
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export default mongoose.model("Comment", commentSchema);
