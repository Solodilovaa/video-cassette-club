const signUpButton = document.querySelector(".sign-up .log-in-click-area");

if (signUpButton) {
  signUpButton.addEventListener("click", () => {
    window.location.href = "./user-tapes.html";
  });
}
