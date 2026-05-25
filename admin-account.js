const adminUpdateInfoButton = document.querySelector(".update-info-button");
const adminProfileOverlay = document.querySelector(".admin-profile-overlay");
const adminProfileUpdateButton = document.querySelector(".admin-profile-update-button");
const adminProfileEmailInput = document.querySelector(".admin-profile-email-input");
const adminAccountEmail = document.querySelector("#admin-account-email");
const adminEmailStorageKey = "video-cassette-admin-email";

function getSavedAdminEmail() {
  try {
    return localStorage.getItem(adminEmailStorageKey);
  } catch (error) {
    return null;
  }
}

function saveAdminEmail(email) {
  try {
    localStorage.setItem(adminEmailStorageKey, email);
  } catch (error) {
    console.warn("Admin email was not saved.", error);
  }
}

function setAdminEmail(email) {
  adminAccountEmail.textContent = email;
}

function openAdminProfileEditor() {
  adminProfileEmailInput.value = adminAccountEmail.textContent.trim();
  adminProfileOverlay.classList.add("is-open");
  adminProfileOverlay.setAttribute("aria-hidden", "false");
  adminProfileEmailInput.focus();
}

function closeAdminProfileEditor() {
  adminProfileOverlay.classList.remove("is-open");
  adminProfileOverlay.setAttribute("aria-hidden", "true");
}

function updateAdminProfile() {
  const nextEmail = adminProfileEmailInput.value.trim() || "jd@example.com";

  setAdminEmail(nextEmail);
  saveAdminEmail(nextEmail);
  closeAdminProfileEditor();
}

if (adminAccountEmail) {
  setAdminEmail(getSavedAdminEmail() || adminAccountEmail.textContent.trim());
}

if (adminUpdateInfoButton && adminProfileOverlay && adminProfileUpdateButton) {
  adminUpdateInfoButton.addEventListener("click", openAdminProfileEditor);
  adminProfileUpdateButton.addEventListener("click", updateAdminProfile);
  adminProfileOverlay.addEventListener("click", (event) => {
    if (event.target === adminProfileOverlay) {
      closeAdminProfileEditor();
    }
  });
}
