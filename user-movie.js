const rentTapeButton = document.querySelector(".rent-tape-button");
const confirmationOverlay = document.querySelector(".confirmation-overlay");
const confirmationCloseButtons = document.querySelectorAll(".confirmation-close");

function openConfirmation() {
  confirmationOverlay.classList.add("is-open");
  confirmationOverlay.setAttribute("aria-hidden", "false");
}

function closeConfirmation() {
  confirmationOverlay.classList.remove("is-open");
  confirmationOverlay.setAttribute("aria-hidden", "true");
}

if (rentTapeButton && confirmationOverlay) {
  rentTapeButton.addEventListener("click", openConfirmation);

  confirmationCloseButtons.forEach((button) => {
    button.addEventListener("click", closeConfirmation);
  });
}
