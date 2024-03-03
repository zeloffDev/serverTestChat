const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const userRouter = require("./src/routes/userRouter");
const friendRouter = require("./src/routes/friendRouter");
const chatMessageRouter = require("./src/routes/chatMessageRouter");
const upload = require("./src/upLoads/upload");
const path = require("path");
const connectToMongoose = require("./src/config/mongoDB");
const authenticateToken = require("./src/authenticate/authenticate");
const connectSocket = require("./src/socket/socket");

// const { authorizeRoles, ADMIN } = require("./roles");

app.use(cors());
app.use(express.json());
app.use(authenticateToken);
const server = http.createServer(app);
connectToMongoose();
connectSocket(server);

// app.use("/user", authorizeRoles(ADMIN), userRouter);
app.use("/user", userRouter);
app.use("/friend", friendRouter);
app.use("/message", chatMessageRouter);
app.use("/upload", upload);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
