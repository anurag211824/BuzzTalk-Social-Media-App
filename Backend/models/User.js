import mongoose from "mongoose";
import bcrypt from "bcryptjs"
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

    fullname: {
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
//Password Hash middleware
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

//Match User entered password to Hashed password
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

export default mongoose.model("User", userSchema);
