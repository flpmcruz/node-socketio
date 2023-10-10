const login = document.querySelector("#login");
login.addEventListener("click", (e) => {
  const user = document.querySelector("#username").value;
  if (user == "") {
    alert("Please enter a username");
    return;
  }

  document.cookie = `username=${user}`;
  window.location.href = "/";
});
