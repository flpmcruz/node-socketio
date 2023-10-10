import { Server } from "socket.io";

export default function (httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    const cookie = socket.handshake.headers.cookie;
    const user = cookie.split("=")[1];

    socket.on("message", (message) => {
      io.emit("message", {
        user,
        message,
      });
    });
  });
}
