const socket = io();

const sendMessage = document.getElementById("sendMessage");
const connectRoom1 = document.getElementById("connectRoom1");
const connectRoom2 = document.getElementById("connectRoom2");
const connectRoom3 = document.getElementById("connectRoom3");

connectRoom1.addEventListener("click", () => {
  socket.emit("connect to room", "room1");
});
connectRoom2.addEventListener("click", () => {
  socket.emit("connect to room", "room2");
});
connectRoom3.addEventListener("click", () => {
  socket.emit("connect to room", "room3");
});

sendMessage.addEventListener("click", () => {
  const message = prompt("Enter message");
  socket.emit("message", message);
});

socket.on("send message", ({ msg, room }) => {
  const li = document.createElement("li");
  li.innerText = `${room}: ${msg}`;
  document.querySelector(`#${room}`).append(li);
});
