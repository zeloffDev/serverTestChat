const ChatMassage = require("../models/chatMassageModel");
const payload = require("../payload/payload");

const chatMassageController = {
  getListHistoryMassage: async (req, res) => {
    try {
      console.log("request");
      const params = req.query;
      const page = parseInt(params.page) || 1;
      const pageSize = parseInt(params.pageSize) || 10;
      const skip = (page - 1) * pageSize;
      const senderId = params.senderId;
      const receiverId = params.receiverId;

      const listAllHistoryMassage = await ChatMassage.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      const listHistoryMassage = await ChatMassage.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
        .skip(skip)
        .limit(pageSize);

      const totalRecord = listAllHistoryMassage.length;
      const totalPage = Math.ceil(totalRecord / pageSize);

      res.status(200).json(
        payload.createApiResponsePage({
          data: listHistoryMassage,
          page,
          pageSize,
          totalPage,
          totalRecord,
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
      const massageId = params.massageId;
      const oldMassage = await ChatMassage.findOne({ _id: massageId });
      const newMassage = {
        ...oldMassage._doc,
        massage: "Đã thu hồi",
        type: "RECALL",
      };
      const massage = await ChatMassage.updateOne(
        { _id: massageId },
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
      const massageId = params.massageId;
      const massage = await ChatMassage.deleteOne({ _id: massageId });
      res.status(200).json(payload.createApiResponseSuccess({ data: massage }));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = chatMassageController;
