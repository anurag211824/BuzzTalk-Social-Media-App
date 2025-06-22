import mongoose from "mongoose";

const reelSchema = new mongoose.Schema(
  {
    // 👤 The user who posted the reel
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🎞️ Video file URL
    videoUrl: {
      type: String,
      required: true,
    },

    // 📝 Optional caption/description
    caption: {
      type: String,
      default: "",
    },

    // 🔊 Optional audio name (original or chosen)
    audio: {
      type: String,
      default: "",
    },

    // 👁️‍🗨️ Number of views
    views: {
      type: Number,
      default: 0,
    },

    // ❤️ Users who liked this reel
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Reel", reelSchema);
