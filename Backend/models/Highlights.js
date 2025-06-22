import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
  {
    // 👤 The user who owns this highlight
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🏷️ Title or name of the highlight
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // 🌁 Optional cover image (thumbnail)
    coverImage: {
      type: String,
      default: "",
    },

    // ⏳ Stories included in this highlight
    stories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Highlight", highlightSchema);
