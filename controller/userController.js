const User = require("../models/usersModel");

const createApiResponse = (
  data = null,
  page = null,
  pageSize = null,
  totalPage = null,
  totalRecord = null
) => {
  return {
    data,
    page,
    pageSize,
    totalPage,
    totalRecord,
  };
};

const userController = {
  signup: async (req, res) => {
    try {
      const body = req.body;
      const userName = body.userName;
      const userAlreadyExists = await User.findOne({ userName });
      if (userAlreadyExists) {
        res.status(500).json({ message: "Account already exists" });
      } else {
        const user = await User.create(body);
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  signIn: async (req, res) => {
    try {
      const body = req.body;
      const userName = body.userName;
      const password = body.password;
      const userAlreadyExists = await User.findOne({ userName, password });
      if (userAlreadyExists) {
        res.status(200).json({ message: "Logged in successfully" });
      } else {
        res.status(500).json({ message: "Username or password is wrong" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getListUser: async (req, res) => {
    try {
      const params = req.query;
      const page = parseInt(params.page) || 1;
      const pageSize = parseInt(params.pageSize) || 10;
      const skip = (page - 1) * pageSize;

      const listAllUser = await User.find({
        $or: [{ userName: { $regex: params?.userName ?? "" } }],
      });

      const listUser = await User.find({
        $or: [{ userName: { $regex: params?.userName ?? "" } }],
      })
        .skip(skip)
        .limit(pageSize);

      const totalRecord = listAllUser.length;
      const totalPage = Math.ceil(totalRecord / pageSize);

      res
        .status(200)
        .json(
          createApiResponse(listUser, page, pageSize, totalPage, totalRecord)
        );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getListFriend: async (req, res) => {
    try {
      const params = req.query;
      const userId = params.userId;
      const page = parseInt(params.page) || 1;
      const pageSize = parseInt(params.pageSize) || 10;
      const skip = (page - 1) * pageSize;

      const user = await User.findById(userId);
      const listFriendIds = user.listFriend;

      const listAllFriends = await User.find({
        _id: { $in: listFriendIds },
      });

      const listFriends = await User.find({
        _id: { $in: listFriendIds },
      })
        .skip(skip)
        .limit(pageSize);

      const totalRecord = listAllFriends.length;
      const totalPage = Math.ceil(totalRecord / pageSize);

      res
        .status(200)
        .json(
          createApiResponse(listFriends, page, pageSize, totalPage, totalRecord)
        );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getListFriendRequest: async (req, res) => {
    try {
      const params = req.query;
      const userId = params.userId;
      const page = parseInt(params.page) || 1;
      const pageSize = parseInt(params.pageSize) || 10;
      const skip = (page - 1) * pageSize;

      const user = await User.findById(userId);
      const listFriendIds = user.listFriendRequest;

      const listAllFriendsRequest = await User.find({
        _id: { $in: listFriendIds },
      });

      const listFriendsRequest = await User.find({
        _id: { $in: listFriendIds },
      })
        .skip(skip)
        .limit(pageSize);

      const totalRecord = listAllFriendsRequest.length;
      const totalPage = Math.ceil(totalRecord / pageSize);

      res
        .status(200)
        .json(
          createApiResponse(
            listFriendsRequest,
            page,
            pageSize,
            totalPage,
            totalRecord
          )
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
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { listFriendRequest: friendId } },
        { new: true }
      );
      res.status(200).json(updatedUser);
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
      res.status(200).json(updatedUser);
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
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: { listFriend: friendId },
          $pull: { listFriendRequest: friendId },
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
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
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = userController;
