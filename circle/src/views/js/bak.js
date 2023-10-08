const socket = io();

function checkSocketStatus() {
  console.log(socket.connected);
}

socket.on("connect", () => {
  console.log("connected", socket.id);
  checkSocketStatus();
});

socket.on("connect_error", (err) => {
  console.log("connect error", err);
  checkSocketStatus();
});

socket.on("disconnect", () => {
  console.log("disconnected");
  checkSocketStatus();
});

socket.io.on("reconnect_attempt", () => {
  console.log("reconnecting");
  checkSocketStatus();
});

socket.on("reconnect", () => {
  console.log("reconnected", socket.id);
  checkSocketStatus();
});
