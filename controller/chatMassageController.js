const ChatMassage = require("../models/chatMassageModel");
const payload = require("../payload/payload");

const chatMassageController = {
  getListHistoryMassage: async (req, res) => {
    try {
      const params = req.query;
      const skip = parseInt(params.skip) || 0;
      const limit = parseInt(params.limit) || 10;
      const senderId = params.senderId;
      const receiverId = params.receiverId;

      const listHistoryMassage = await ChatMassage.find({
        $or: [
          { senderId, senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      res.status(200).json(
        payload.createApiResponseSkipCountSuccess({
          data: listHistoryMassage,
          skip,
          limit,
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createMassage: async (req, res) => {
    try {
      const body = req.body;
      const massage = await ChatMassage.create(body);
      res.status(200).json(payload.createApiResponseSuccess({ data: massage }));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createMassageWithSocket: async (body) => {
    try {
      const massage = await ChatMassage.create(body);
      console.log(massage);
    } catch (error) {
      console.error(error);
    }
  },

  recallMassage: async (req, res) => {
    try {
      const params = req.params;
      const messageId = params.messageId;
      const oldMassage = await ChatMassage.findOne({ _id: messageId });
      const newMassage = {
        ...oldMassage._doc,
        massage: "Đã thu hồi",
        type: "REVOKE",
      };
      const massage = await ChatMassage.updateOne(
        { _id: messageId },
        { $set: newMassage }
      );
      res.status(200).json(payload.createApiResponseSuccess({ data: massage }));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteMassage: async (req, res) => {
    try {
      const params = req.params;
      const messageId = params.messageId;
      const massage = await ChatMassage.deleteOne({ _id: messageId });
      res.status(200).json(payload.createApiResponseSuccess({ data: massage }));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = chatMassageController;
