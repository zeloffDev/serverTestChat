const mongoose = require("mongoose");

const chatMassage = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    massage: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ChatMassage = mongoose.model("ChatMassage", chatMassage);

module.exports = ChatMassage;
