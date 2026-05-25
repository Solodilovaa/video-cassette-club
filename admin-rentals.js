const returnButton = document.querySelector(".return-button");
const returnConfirmationOverlay = document.querySelector(".return-confirmation-overlay");
const rentalReturnStorageKey = "video-cassette-rental-returned";

function openReturnConfirmation() {
  if (returnButton && returnButton.classList.contains("is-returned")) {
    return;
  }

  if (!returnConfirmationOverlay) {
    return;
  }

  returnConfirmationOverlay.classList.add("is-open");
  returnConfirmationOverlay.setAttribute("aria-hidden", "false");
}

function closeReturnConfirmation() {
  if (!returnConfirmationOverlay) {
    return;
  }

  returnConfirmationOverlay.classList.remove("is-open");
  returnConfirmationOverlay.setAttribute("aria-hidden", "true");
}

function markReturned() {
  if (!returnButton) {
    return;
  }

  returnButton.textContent = "RETURNED";
  returnButton.classList.add("is-returned");

  try {
    localStorage.setItem(rentalReturnStorageKey, "true");
  } catch (error) {
    console.warn("Rental return state was not saved.", error);
  }
}

function confirmRentalReturn() {
  markReturned();
  closeReturnConfirmation();
}

try {
  if (localStorage.getItem(rentalReturnStorageKey) === "true") {
    markReturned();
  }
} catch (error) {
  console.warn("Rental return state was not loaded.", error);
}

if (returnConfirmationOverlay) {
  returnConfirmationOverlay.addEventListener("click", (event) => {
    if (event.target === returnConfirmationOverlay) {
      closeReturnConfirmation();
    }
  });
}
