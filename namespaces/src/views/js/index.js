const user = prompt("Please enter your user");

const profes = ["Retax", "Javier", "Jorge", "Jav"];

let socketNameSpace, group;

const chat = document.getElementById("chat");
const namespace = document.getElementById("namespace");

// crea un namespace para profesores y otro para alumnos
if (profes.includes(user)) {
  socketNameSpace = io("/teachers");
  group = "teachers";
} else {
  socketNameSpace = io("/students");
  group = "students";
}

socketNameSpace.on("connect", () => {
  namespace.textContent = group;
});

socketNameSpace.on("welcome message", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  chat.appendChild(li);
});

//envio de mensajes
const sendMessage = document.getElementById("sendMessage");
sendMessage.addEventListener("click", (e) => {
  const message = prompt("Please enter your message");
  socketNameSpace.emit("send message", { message, user });
});

//recibir mensajes
socketNameSpace.on("message", (data) => {
  const li = document.createElement("li");
  li.textContent = `${data.user}: ${data.message}`;
  chat.appendChild(li);
});
