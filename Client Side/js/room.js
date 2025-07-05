function showAlert(message, type = "info", duration = 2000) {
  const alertBox = document.getElementById("global-alert");
  const alertMessage = document.getElementById("alert-message");

  alertBox.className = `alert ${type}`;
  alertMessage.textContent = message;
  alertBox.classList.remove("hidden");

  setTimeout(() => {
    hideAlert();
  }, duration);
}

function hideAlert() {
  const alertBox = document.getElementById("global-alert");
  alertBox.classList.add("hidden");
}

const url = document.querySelector("a")

