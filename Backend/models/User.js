import mongoose from "mongoose";

// 👤 User Schema for BuzzTalk
const userSchema = new mongoose.Schema(
  {
    // 🆔 Basic Info
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 📝 Profile Info
    bio: {
      type: String,
      default: "",
    },

    profilePicture: {
      type: String,
      default: "", // 🖼️ URL to profile picture
    },

    website: {
      type: String,
      default: "", // 🔗 Link in bio
    },

    isPrivate: {
      type: Boolean,
      default: false, // 🔒 Private account?
    },

    statusNote: {
      type: String,
      maxlength: 60,
      default: "", // ✏️ Temporary text note
    },

    // 📸 Posts & Media
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    reels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
      },
    ],

    stories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],

    highlights: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Highlight",
      },
    ],

    // 🤝 Social Interactions
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ❤️ Engagement
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true, // 🕒 Automatically adds createdAt & updatedAt
  }
);

export default mongoose.model("User", userSchema);
