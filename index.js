const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const connectSocket = require("./socket");
const connectToMongoose = require("./mongoDB");
const userRouter = require("./routes/userRouter");
const chatMessageRouter = require("./routes/chatMessageRouter");
const upload = require("./upload");
const path = require("path");

app.use(cors());
app.use(express.json());
const server = http.createServer(app);
connectToMongoose();
connectSocket(server);

app.use("/user", userRouter);
app.use("/massage", chatMessageRouter);
app.use("/upload", upload);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
