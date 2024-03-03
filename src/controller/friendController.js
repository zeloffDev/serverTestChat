const User = require("../models/usersModel");
const mapPayload = require("../payload/mapPayload");
const payload = require("../payload/payload");

const friendController = {
  getListUser: async (req, res) => {
    try {
      const params = req.query;
      const skip = parseInt(params.skip) || 0;
      const limit = parseInt(params.limit) || 10;
      const userId = params.userId;
      let listUser = [];
      if (userId) {
        const user = await User.findById(userId);
        const excludedIds = [...user.listFriend, user._id];
        listUser = await User.find({
          $or: [{ name: { $regex: params?.name ?? "" } }],
          $and: [{ _id: { $nin: excludedIds } }],
        })
          .skip(skip)
          .limit(limit);
      } else {
        listUser = await User.find({
          $or: [{ name: { $regex: params?.name ?? "" } }],
        })
          .skip(skip)
          .limit(limit);
      }

      res.status(200).json(
        payload.createApiResponseSkipCountSuccess({
          data: mapPayload.mapData(listUser),
          skip,
          limit,
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getListFriend: async (req, res) => {
    try {
      const params = req.query;
      const skip = parseInt(params.skip) || 0;
      const limit = parseInt(params.limit) || 10;
      const userId = params.userId;
      const user = await User.findById(userId);
      const listFriendIds = user.listFriend;

      const listFriends = await User.find({
        _id: { $in: listFriendIds },
        name: { $regex: params?.name ?? "" },
      })
        .skip(skip)
        .limit(limit);

      res.status(200).json(
        payload.createApiResponseSkipCountSuccess({
          data: mapPayload.mapData(listFriends),
          skip,
          limit,
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getListFriendRequest: async (req, res) => {
    try {
      const params = req.query;
      const skip = parseInt(params.skip) || 0;
      const limit = parseInt(params.limit) || 10;
      const userId = params.userId;
      const user = await User.findById(userId);
      const listFriendRequest = user.listFriendRequest;

      const listFriendsRequest = await User.find({
        $or: [{ name: { $regex: params?.name ?? "" } }],
        _id: { $in: listFriendRequest },
      })
        .skip(skip)
        .limit(limit);
      res.status(200).json(
        payload.createApiResponseSkipCountSuccess({
          data: mapPayload.mapData(listFriendsRequest),
          skip,
          limit,
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  addFriend: async (req, res) => {
    try {
      const body = req.body;
      const userId = body.userId;
      const friendId = body.friendId;
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $push: { listFriend: friendId },
        $pull: { listFriendRequest: friendId },
      });
      await User.findByIdAndUpdate(friendId, {
        $push: { listFriend: userId },
      });
      res.status(200).json(
        payload.createApiResponseSuccess({
          data: mapPayload.mapObject(updatedUser),
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  addFriendRequest: async (req, res) => {
    try {
      const body = req.body;
      const userId = body.userId;
      const friendId = body.friendId;
      const updatedFriend = await User.findByIdAndUpdate(
        friendId,
        { $push: { listFriendRequest: userId } },
        { new: true }
      );
      res.status(200).json(
        payload.createApiResponseSuccess({
          data: mapPayload.mapObject(updatedFriend),
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  revokeFriendRequest: async (req, res) => {
    try {
      const body = req.body;
      const userId = body.userId;
      const friendId = body.friendId;
      const updatedUser = await User.findByIdAndUpdate(
        friendId,
        { $pull: { listFriendRequest: userId } },
        { new: true }
      );
      res.status(200).json(
        payload.createApiResponseSuccess({
          data: mapPayload.mapObject(updatedUser),
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteFriendRequest: async (req, res) => {
    try {
      const body = req.body;
      const userId = body.userId;
      const friendId = body.friendId;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { listFriendRequest: friendId } },
        { new: true }
      );
      res.status(200).json(
        payload.createApiResponseSuccess({
          data: mapPayload.mapObject(updatedUser),
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteFriend: async (req, res) => {
    try {
      const body = req.body;
      const userId = body.userId;
      const friendId = body.friendId;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { listFriend: friendId } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        friendId,
        { $pull: { listFriend: userId } },
        { new: true }
      );
      res
        .status(200)
        .json(payload.createApiResponseSuccess({ data: updatedUser }));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = friendController;
