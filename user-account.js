const updateInfoButton = document.querySelector(".update-info-button");
const profileOverlay = document.querySelector(".profile-overlay");
const profileUpdateButton = document.querySelector(".profile-update-button");
const profileAddressInput = document.querySelector(".profile-address-input");
const profileEmailInput = document.querySelector(".profile-email-input");
const accountAddress = document.querySelector("#account-address");
const accountEmail = document.querySelector("#account-email");

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
