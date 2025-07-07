const scrollAmount = 250; // Adjust scroll amount as needed

// Slider
document.querySelectorAll(".popular-listings").forEach((listing) => {
  const slider = listing.querySelector(".slider");
  const leftArrow = listing.querySelector(".left-arrow");
  const rightArrow = listing.querySelector(".right-arrow");

  function updateArrowState() {
    // Check if slider is at the start
    if (slider.scrollLeft <= 0) {
      leftArrow.classList.add("disabled");
    } else {
      leftArrow.classList.remove("disabled");
    }

    // Check if slider is at the end
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
      rightArrow.classList.add("disabled");
    } else {
      rightArrow.classList.remove("disabled");
    }
  }

  leftArrow.addEventListener("click", () => {
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  slider.addEventListener("scroll", updateArrowState);

  // Call on load to set correct initial state
  // window.addEventListener("load", () => {
  updateArrowState();
});
// });

const menuIcon = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");
const experience = document.querySelector("#experience");

if (menuIcon && mobileMenu) {
  menuIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

// Auto-close menu on scroll
window.addEventListener("scroll", () => {
  if (mobileMenu.classList.contains("show")) {
    mobileMenu.classList.remove("show");
  }
});

window.addEventListener("resize", () => {
  const isDesktop = window.innerWidth >= 1024;

  if (isDesktop) {
    // Close mobile menu if open
    if (mobileMenu.classList.contains("show")) {
      mobileMenu.classList.remove("show");
    }
  }
});

experience.addEventListener("mouseenter", () => {
  document.querySelector("#experience img").src =
    "./assets/experience-hover.png";
});

experience.addEventListener("mouseleave", () => {
  document.querySelector("#experience img").src = "./assets/experience.png";
});

const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  playersTopCards = document.querySelectorAll(".playersTopCard");

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    });
  });
});

function showForgotPassword() {
  forms.classList.remove("show-signup", "show-login");
  forms.classList.add("show-forgot");
}

function activateLogin() {
  forms.classList.remove("show-signup", "show-forgot");
  forms.classList.add("show-login");
}

function activateSignUp() {
  forms.classList.remove("show-login", "show-forgot");
  forms.classList.add("show-signup");
}

function closeForms() {
  forms.classList.remove("show-login", "show-signup", "show-forgot");
}

document
  .querySelector(".dimmed-background")
  .addEventListener("click", closeForms);

document.querySelector(".dimmed-background").addEventListener("scroll", () => {
  document.querySelector(".dimmed-background").scroll = no;
});
