import mongoose from "mongoose";

// ❤️ Like Schema
const likeSchema = new mongoose.Schema(
  {
    // 👤 User who liked
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📝 Post that was liked
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true, // 🕒 Like time (createdAt)
  }
);

export default mongoose.model("Like", likeSchema);
