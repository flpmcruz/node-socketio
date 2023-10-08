On, Once y Off
On → Se usa para detectar (o escuchar) un evento varias veces.
Once → Se usa para detectar (o escuchar) un evento una sola vez. Sin importar si el evento se emite varias veces.
Off → Se usa para dejar de escuchar un evento, sin importar que este se siga emitiendo.
💡 El listener del evento no debe ser una función anónima, sino una función nombrada.

socket.on("on", () => {
console.log("se imprime varias veces");
});
socket.on("once", () => {
console.log("se emite una sola vez");
});

const listener = () => console.log("off");
socket.on("off", listener);
setTimeout(() => socket.off("off", listener), 2000);


//server
io.on("connection", (socket) => {
  socketsOnline.push(socket.id);

  // Emision basica
  socket.emit("welcome", "Ahora estás conectado 😎");

  // socket.conn.once("upgrade", () => {
  //   console.log("Hemos pasado de HTTP Long-Polling a", socket.conn.transport.name);
  // });
  socket.on("server", (data) => console.log(data));

  // Emision a todos los clientes
  io.emit("everyone", socket.id + " Ahora estás conectado 😎");

  socket.on("last", (message) => {
    const lastSocket = socketsOnline[socketsOnline.length - 1];
    io.to(lastSocket).emit("salute", message);
  });

});


const socket = io();

socket.on("welcome", (data) => {
  text.textContent = data; 
});

const button = document.getElementById("emit");
button.addEventListener("click", () => {
  socket.emit("server", "Hola desde el cliente");
});

socket.on("everyone", (data) => {
  console.log(data);
});

const emitToLast = document.querySelector("#emit-to-last");
emitToLast.addEventListener("click", () => {
  socket.emit("last", "hola 😁");
});

socket.on("salute", (message) => {
  console.log(message);
});

socket.on("on", () => {
  console.log("se imprime varias veces");
});
socket.on("once", () => {
  console.log("se emite una sola vez");
});

const listener = () => console.log("off");
socket.on("off", listener);
setTimeout(() => socket.off("off", listener), 2000);