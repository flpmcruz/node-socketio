import http from "http";
import path from "path";
import express from "express";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(path.resolve() + "/src/views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve() + "/src/views/index.html"));
});

io.on("connection", (socket) => {
  socket.connectedRoom = "";

  socket.on("connect to room", (room) => {
    socket.leave(socket.connectedRoom);
    socket.join(room);
    socket.connectedRoom = room;
  });

  socket.on("message", (msg) => {
    const room = socket.connectedRoom;
    io.to(room).emit("send message", { msg, room });
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
