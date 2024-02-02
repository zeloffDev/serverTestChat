const { Server } = require("socket.io");
require("dotenv").config();

const chatMassageController = require("./controller/chatMassageController");
const clientOrigin = process.env.CLIENT_ORIGIN;

const connectSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: [clientOrigin], methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("join_room", (id) => {
      console.log("User Join Room", id);
      socket.join(id);
    });

    socket.on("send_message", (message) => {
      console.log("Send Message", message.receiverId);
      socket.to(message.receiverId).emit("receive_message", message);
      chatMassageController.createMassageWithSocket(message);
    });

    socket.on("signOut", () => {
      console.log("User logged out");
      socket.disconnect();
    });

    socket.on("disconnect", () => {
      console.log("User Disconnect", socket.id);
    });
  });
};

module.exports = connectSocket;
