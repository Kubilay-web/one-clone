const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    conversation: {
      type: ObjectId,
      ref: "ConversationModel",
    },
    files: [],
  },
  {
    collection: "messages",
    timestaps: true,
  }
);

module.exports = mongoose.model("MessageModel", messageSchema);
