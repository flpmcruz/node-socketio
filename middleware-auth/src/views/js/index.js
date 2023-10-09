const socket = io({
  auth: {
    token: "123456",
  },
});

//En caso de error de autenticacion
socket.on("connect_error", (err) => {
  console.log(err.message);
});

socket.on("connect", () => {
  console.log(socket.id);
});
