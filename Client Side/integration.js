function showAlert(message, type = "info", duration = 2000) {
  const alertBox = document.getElementById("global-alert");
  const alertMessage = document.getElementById("alert-message");

  // Reset classes
  alertBox.className = `alert ${type}`;
  alertMessage.textContent = message;
  alertBox.classList.remove("hidden");

  // Auto-hide after duration
  setTimeout(() => {
    hideAlert();
  }, duration);
}

function hideAlert() {
  const alertBox = document.getElementById("global-alert");
  alertBox.classList.add("hidden");
}

// Register User

const signUpbtn = document.querySelector("#signUpBtn_A");

signUpbtn.addEventListener("click", (e) => {
  e.preventDefault();

  const username = document.querySelector("#signUp_usernameInput").value.trim();
  const email = document.querySelector("#signUp_emailInput").value.trim();
  const password = document.querySelector("#signUp_passwordInput").value;
  const confPassword = document.querySelector(
    "#signUp_confPasswordInput"
  ).value;
  const forms = document.querySelector(".forms");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || !email || !password || !confPassword) {
    showAlert("All fields are require.", "error");
    return;
  }

  if (!emailRegex.test(email)) {
    showAlert("Please enter a valid email address.", "error");
    return;
  }

  if (password.length < 8) {
    showAlert("Password must be at least 8 characters long.", "error");
    return;
  }

  if (password != confPassword) {
    showAlert("Make sure both password fields match exactly.", "error");
    return;
  }

  const postData = async (username, email, password) => {
    const url = "http://localhost:8000/api/v1/users/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        showAlert("Signup successful!", "success");
        console.log("Server Response:", result);

        setTimeout(
          forms.classList.remove("show-login", "show-signup", "show-forgot"),
          2100
        );
      } else {
        showAlert(
          result.message || "Signup failed. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("Something went wrong. Please check your connection.", "error");
    }
  };

  postData(username, email, password);
});

// Login User

const loginBtn = document.querySelector("#loginBtn_A");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.querySelector("#login_emailInput").value.trim();
  const password = document.querySelector("#login_passwordInput").value;
  const forms = document.querySelector(".forms");

  if (!email || !password) {
    showAlert("All fields are require.", "error");
    return;
  }

  const postData = async (email, password) => {
    const url = "http://localhost:8000/api/v1/users/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        showAlert("login successful!", "success");
        console.log("Server Response:", result);
        setTimeout(() => {
          forms.classList.remove("show-login", "show-signup", "show-forgot");
        }, 2100);
      } else {
        showAlert(result.message || "login failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("Something went wrong. Please check your connection.", "error");
    }
  };

  postData(email, password);
});
