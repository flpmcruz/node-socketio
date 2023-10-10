import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(path.resolve(), "src/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "src/public"));
});

let startLat = 12.554729;
let startLong = 55.70651;

io.on("connection", (socket) => {
  socket.emit("welcome", {
    msg: "Bienvenido",
    position: [startLat, startLong],
  });
  setInterval(() => {
    socket.emit("position", {
      position: [startLat, startLong],
    });
    startLong += 0.01 / 20;
  }, 1000);
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000");
});
