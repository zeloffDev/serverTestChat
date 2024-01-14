const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    userName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    listFriend: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    listFriendRequest: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
