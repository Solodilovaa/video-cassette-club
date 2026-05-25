const signInButton = document.querySelector(".sign-in-click-area");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

const adminEmail = "admin@example.com";
const adminPassword = "admin123";

function signIn() {
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (email === adminEmail && password === adminPassword) {
    window.location.href = "./admin-tapes.html";
    return;
  }

  window.location.href = "./user-tapes.html";
}

if (signInButton) {
  signInButton.addEventListener("click", signIn);
}

[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      signIn();
    }
  });
});
