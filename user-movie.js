const rentTapeButton = document.querySelector(".rent-tape-button");
const confirmationOverlay = document.querySelector(".confirmation-overlay");
const confirmationCloseButtons = document.querySelectorAll(".confirmation-close");
const rentalRentDateStorageKey = "video-cassette-rental-rent-date";
const rentalReturnDateStorageKey = "video-cassette-rental-return-date";

function formatRentalDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/\//g, ".");
}

function saveRentalDates() {
  const rentDate = new Date();
  const returnDate = new Date(rentDate);
  returnDate.setDate(returnDate.getDate() + 7);

  try {
    localStorage.setItem(rentalRentDateStorageKey, formatRentalDate(rentDate));
    localStorage.setItem(rentalReturnDateStorageKey, formatRentalDate(returnDate));
  } catch {
    // The rental confirmation still closes even if browser storage is unavailable.
  }
}

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
    button.addEventListener("click", () => {
      if (button.dataset.action === "confirm") {
        saveRentalDates();
      }

      closeConfirmation();
    });
  });
}
