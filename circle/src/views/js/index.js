const socket = io();

const circle = document.querySelector("#circle");

const moveCircle = (position) => {
  circle.style.top = position.top;
  circle.style.left = position.left;
};

const drag = (e) => {
  const position = { top: e.clientY + "px", left: e.clientX + "px" };
  socket.emit("circle position", position);
  moveCircle(position);
};

document.addEventListener("mousedown", (e) => {
  document.addEventListener("mousemove", drag);
});

document.addEventListener("mouseup", (e) => {
  document.removeEventListener("mousemove", drag);
});

socket.on("move circle", (position) => {
  moveCircle(position);
});
