const updateInfoButton = document.querySelector(".update-info-button");
const profileOverlay = document.querySelector(".profile-overlay");
const profileUpdateButton = document.querySelector(".profile-update-button");
const profileAddressInput = document.querySelector(".profile-address-input");
const profileEmailInput = document.querySelector(".profile-email-input");
const accountAddress = document.querySelector("#account-address");
const accountEmail = document.querySelector("#account-email");
const accountRentDate = document.querySelector("#account-rent-date");
const accountReturnDate = document.querySelector("#account-return-date");
const rentalRentDateStorageKey = "video-cassette-rental-rent-date";
const rentalReturnDateStorageKey = "video-cassette-rental-return-date";

function loadRentalDates() {
  try {
    const rentDate = localStorage.getItem(rentalRentDateStorageKey);
    const returnDate = localStorage.getItem(rentalReturnDateStorageKey);

    if (rentDate && accountRentDate) {
      accountRentDate.textContent = `RENT DATE ${rentDate}`;
    }

    if (returnDate && accountReturnDate) {
      accountReturnDate.textContent = `RETURN DATE ${returnDate}`;
    }
  } catch {
    // Keep the default dates from the mockup if browser storage is unavailable.
  }
}

function openProfileEditor() {
  profileAddressInput.value = accountAddress.textContent.trim();
  profileEmailInput.value = accountEmail.textContent.trim();
  profileOverlay.classList.add("is-open");
  profileOverlay.setAttribute("aria-hidden", "false");
  profileAddressInput.focus();
}

function closeProfileEditor() {
  profileOverlay.classList.remove("is-open");
  profileOverlay.setAttribute("aria-hidden", "true");
}

function updateProfile() {
  const nextAddress = profileAddressInput.value.trim() || "42 Movie Ave, New York";
  const nextEmail = profileEmailInput.value.trim() || "jd@example.com";

  accountAddress.textContent = nextAddress;
  accountEmail.textContent = nextEmail;
  accountEmail.href = `mailto:${nextEmail}`;

  closeProfileEditor();
}

if (updateInfoButton && profileOverlay) {
  updateInfoButton.addEventListener("click", openProfileEditor);
  profileUpdateButton.addEventListener("click", updateProfile);
}

loadRentalDates();
