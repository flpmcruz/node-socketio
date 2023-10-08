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

const teachers = io.of("teachers");
const students = io.of("students");

teachers.on("connection", (socket) => {
  socket.emit("welcome message", "Welcome to the chat teacher");
  socket.on("send message", (data) => {
    teachers.emit("message", data);
  });
});

students.on("connection", (socket) => {
  socket.emit("welcome message", "Welcome to the chat student");
  socket.on("send message", (data) => {
    students.emit("message", data);
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
