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
  "Popular homes in",
  "Best places available in",
  "Stay in",
  "Available next month in",
  "Homes in",
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
      let i = 0;

      for (let key in cardsData) {
        const roomListing = cardsData[key];

        let cardsHtml = "";

        roomListing.forEach((listing) => {
          const { _id, type, city, price, images } = listing;
          const imageUrl = images?.[0]?.url || "./fallback.jpg";

          cardsHtml += `
                <a href="http://localhost:8000/api/v1/rooms/${_id}" alt="card-link" class="card-Link">
                    <div class="card">
                        <div class="badge">
                            <span class="badge-text">Guest favorite</span>
                            <i class="fa-regular fa-heart heart-icon"></i>
                        </div>
                        <img src="${imageUrl}" alt="">
                        <div class="card-content">
                            <span class="title">${type} in</span>
                            <span class="location">${city}</span>
                            <span class="price">$${price}/night</span>
                        </div>
                    </div>
                </a>
            `;
        });

        const listingsHtml = `
        <div class="popular-listings">
            <div class="content-header">
                <span class="heading">${cityHeadings[i]} ${city} &gt;</span>
                <div>
                    <span class="icons left-arrow disabled"><i class="fa-solid fa-less-than"></i></span>
                    <span class="icons right-arrow"><i class="fa-solid fa-greater-than"></i></span>
                </div>
            </div>
             <div class="slider-content slider">
            ${cardsHtml}
            </div>
        </div>
        `;

        mainContent.insertAdjacentHTML(listingsHtml);
        i++;
      }
    } else {
      showAlert(result.message || "Cards fetching failed.", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showAlert("Something went wrong. Please check your connection.", "error");
  }
});
