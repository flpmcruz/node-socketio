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

// Middleware de autenticacion
io.use((socket, next) => {
  const { token } = socket.handshake.auth;
  if (token === "123456") {
    next();
  } else {
    next(new Error("Authentication error"));
  }
});
// Pueden usarse varios middlewares uno tras otro

io.on("connection", (socket) => {
  socket.on("is connected", (msg) => {
    console.log(msg);
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
