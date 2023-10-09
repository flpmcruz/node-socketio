const socket = io();

const send = document.getElementById("send");
const disconnect = document.getElementById("disconnect");
const reconnect = document.getElementById("reconnect");

send.addEventListener("click", () => {
  // No emitir si no esta conectado, para no almacenar en el buffer
  if (socket.connected) socket.emit("is connected", "Esta conectado");

  // No usar el buffer usando el flag volatile
  // Los eventos volatiles no se almacenan en el buffer si el cliente no esta conectado
  // socket.volatile.emit("is connected", "Esta conectado");
});

disconnect.addEventListener("click", () => {
  socket.disconnect();
});

reconnect.addEventListener("click", () => {
  socket.connect();
});
