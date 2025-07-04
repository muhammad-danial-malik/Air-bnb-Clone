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
let accessToken;
let refreshToken;

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
        accessToken = result.data.accessToken;
        refreshToken = result.data.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("Server Response:", result);

        const loginTime = new Date().getTime();
        localStorage.setItem("loginTime", loginTime);

        setTimeout(() => {
          forms.classList.remove("show-login", "show-signup", "show-forgot");

          loginSignupBtn.classList.add("btnInactive");
          logoutBtn.classList.remove("btnInactive");
        }, 2100);

        showAlert("login successful!", "success");
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

window.addEventListener("load", () => {
  const token = localStorage.getItem("accessToken");
  const loginTime = localStorage.getItem("loginTime");

  const FIVE_HOURS = 5 * 60 * 60 * 1000;

  if (!token || !loginTime || new Date().getTime() - loginTime > FIVE_HOURS) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("loginTime");
    accessToken = null;
    refreshToken = null;

    loginSignupBtn.classList.remove("btnInactive");
    logoutBtn.classList.add("btnInactive");

    showAlert("Session expired. Please login again.", "error");
  } else {
    loginSignupBtn.classList.add("btnInactive");
    logoutBtn.classList.remove("btnInactive");
  }
});

// logout
const loginSignupBtn = document.querySelector("#loginSignupbtn");
const logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener("click", () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    showAlert("UnAuthorize Access", "error");
    return;
  }

  const logout = async () => {
    const url = "http://localhost:8000/api/v1/users/logout";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("loginTime");
        accessToken = null;
        refreshToken = null;

        showAlert("Logout successful!", "success");

        loginSignupBtn.classList.remove("btnInactive");
        logoutBtn.classList.add("btnInactive");
      } else {
        showAlert(result.message || "Logout failed.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("Something went wrong. Please check your connection.", "error");
    }
  };

  logout();
});
