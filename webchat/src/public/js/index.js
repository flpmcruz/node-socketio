const socket = io();

const send = document.getElementById("send-message");
const allMessage = document.getElementById("all-messages");

send.addEventListener("click", (e) => {
  const message = document.getElementById("message");
  socket.emit("message", message.value);
  message.value = "";
});

socket.on("connect", () => {
  console.log("connected");
});

socket.on("message", ({ message, user }) => {
  const msg = document.createRange().createContextualFragment(`
    <div class="message">
        <div class="image-container">
          <img src="/images/michi.jpeg" />
        </div>

        <div class="message-body">
          <div class="user-info">
            <span class="username">${user}</span>
            <span class="time">Hace 1 segundo</span>
          </div>

          <p>
            ${message}
          </p>
        </div>
    </div>`);

  allMessage.append(msg);
});
