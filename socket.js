const { Server } = require("socket.io");

const connectSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: ["http://localhost:3000"], methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("join_room", (id) => {
      console.log("User Join Room", id);
      socket.join(id);
    });

    socket.on("send_massage", (message) => {
      console.log("Send Massage", message);
      socket.to(message.id).emit("receive_massage", message);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnect", socket.id);
    });
  });
};

module.exports = connectSocket;
