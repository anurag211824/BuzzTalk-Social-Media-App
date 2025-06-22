import mongoose from "mongoose";

const callLogSchema = new mongoose.Schema(
  {
    // Caller
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Receiver
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Call type: "video" or "audio"
    type: {
      type: String,
      enum: ["video", "audio"],
      required: true,
    },

    // Call duration in seconds
    duration: {
      type: Number,
      default: 0,
    },

    // Status: "missed", "ended", "declined"
    status: {
      type: String,
      enum: ["missed", "ended", "declined"],
      default: "missed",
    },
  },
  {
    timestamps: true, // includes createdAt (call time)
  }
);

export default mongoose.model("CallLog", callLogSchema);
