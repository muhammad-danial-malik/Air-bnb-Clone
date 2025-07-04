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

// Creating Scroller Cards

const cityHeadings = [
  "Popular homes in ",
  "Best places available in ",
  "Stay in ",
  "Available next month in ",
  "Homes in ",
];

window.addEventListener("load", async () => {
  const url = "http://localhost:8000/api/v1/rooms";

  try {
    const response = await fetch(url);

    if (response.ok) {
      const result = await response.json();

      cardsData = result.data;

      console.log(cardsData);

      const mainContent = document.querySelector(".main-content");

      for (let key in cardsData) {
        const roomInfo = cardsData[key];

        // const cityHeading = document.querySelector(".content-header");

        // cityHeading.innerHTML = `<span class="heading">Popular homes in ${key.trim()} &gt;</span>`;
        console.log(key);
      }
    } else {
      showAlert(result.message || "Cards fetching failed.", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showAlert("Something went wrong. Please check your connection.", "error");
  }
});
