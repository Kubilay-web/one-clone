const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Conversation name is required"],
      trim: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    collection: "conversations",
    timestamps: true,
  }
);

module.exports = mongoose.model("ConversationModel", conversationSchema);
