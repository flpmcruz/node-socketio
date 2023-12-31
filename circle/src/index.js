import http from "http";
import path from "path";
import express from "express";
import { Server } from "socket.io";

// Admin UI
import { instrument } from "@socket.io/admin-ui";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "$2b$10$QBr7lZsCT5NitYLdQYNuHeBy2A1gesP3WvAZIxUDfAU80JX7nNf0e",
  },
});

app.use(express.static(path.join(path.resolve() + "/src/views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve() + "/src/views/index.html"));
});

io.on("connection", (socket) => {
  socket.on("circle position", (position) => {
    socket.broadcast.emit("move circle", position);
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
