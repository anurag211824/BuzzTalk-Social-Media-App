import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    // 📸 Media content: can be images or videos
    media: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["image", "video"],
          default: "image",
        },
      },
    ],

    // ✍️ Caption for the post
    caption: {
      type: String,
      default: "",
    },

    // 📍 Optional location
    location: {
      type: String,
      default: "",
    },

    // 👤 Author of the post
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ❤️ Likes: list of users who liked the post
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // 💬 Comments on the post
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    // 🏷️ Users tagged in the post
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // 📌 Saved by users (reverse of savedPosts in User)
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // 🕓 Timestamps
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
