const express = require("express");
const app = express();
const port = 3001;
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected:${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    console.log(data);
    socket
      .to(data.roomid)
      .emit("receive_message", {
        username: data.username,
        message: data.message,
      });
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
