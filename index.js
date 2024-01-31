const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const connectSocket = require("./socket");
const connectToMongoose = require("./mongoDB");
const userRouter = require("./routes/userRouter");
const friendRouter = require("./routes/friendRouter");
const chatMessageRouter = require("./routes/chatMessageRouter");
const upload = require("./upload");
const path = require("path");
const authenticateToken = require("./authenticate");
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
app.use("/massage", chatMessageRouter);
app.use("/upload", upload);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
