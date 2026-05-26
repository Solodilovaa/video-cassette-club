const returnButton = document.querySelector(".return-button");
const returnConfirmationOverlay = document.querySelector(".return-confirmation-overlay");
const adminReturnDate = document.querySelector("#admin-return-date");
const rentalReturnStorageKey = "video-cassette-rental-returned";
const rentalReturnDateStorageKey = "video-cassette-rental-return-date";

function shortDate(date) {
  const parts = date.split(".");

  if (parts.length !== 3) {
    return date;
  }

  return `${parts[0]}.${parts[1]}.${parts[2].slice(-2)}`;
}

function loadReturnDate() {
  try {
    const returnDate = localStorage.getItem(rentalReturnDateStorageKey);

    if (returnDate && adminReturnDate) {
      adminReturnDate.textContent = shortDate(returnDate);
    }
  } catch {
    // Keep the default date from the mockup if browser storage is unavailable.
  }
}

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

loadReturnDate();

if (returnConfirmationOverlay) {
  returnConfirmationOverlay.addEventListener("click", (event) => {
    if (event.target === returnConfirmationOverlay) {
      closeReturnConfirmation();
    }
  });
}
