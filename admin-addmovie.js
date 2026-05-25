const addMoviePreview = document.querySelector(".admin-addmovie .image");
const addImageUpload = document.querySelector(".image-upload");
const addChooseImageButton = document.querySelector(".choose-image-button");
const addSaveAllButton = document.querySelector(".save-all-button");
const addSaveConfirmationOverlay = document.querySelector(".save-confirmation-overlay");
const addMovieFields = document.querySelectorAll(".add-field");
const addMovieStorageKey = "video-cassette-admin-added-movie";

const emptyMovieData = {
  actors: "",
  description: "",
  director: "",
  duration: "",
  genres: "",
  image: "",
  tapeId: "",
  title: "",
  year: "",
};

let savedAddMovieData = { ...emptyMovieData };

function getAddMovieData() {
  const movieData = {};

  addMovieFields.forEach((field) => {
    movieData[field.dataset.field] = field.value;
  });

  movieData.image = addMoviePreview.style.backgroundImage;
  return movieData;
}

function applyAddMovieData(movieData) {
  addMovieFields.forEach((field) => {
    field.value = movieData[field.dataset.field] || "";
  });

  addMoviePreview.style.backgroundImage = movieData.image || "";
}

function loadAddMovieData() {
  try {
    const savedData = localStorage.getItem(addMovieStorageKey);

    if (savedData) {
      savedAddMovieData = { ...emptyMovieData, ...JSON.parse(savedData) };
    }
  } catch {
    savedAddMovieData = { ...emptyMovieData };
  }

  applyAddMovieData(savedAddMovieData);
}

function openAddSaveConfirmation() {
  addSaveConfirmationOverlay.classList.add("is-open");
  addSaveConfirmationOverlay.setAttribute("aria-hidden", "false");
}

function closeAddSaveConfirmation() {
  addSaveConfirmationOverlay.classList.remove("is-open");
  addSaveConfirmationOverlay.setAttribute("aria-hidden", "true");
}

function confirmAddSave() {
  savedAddMovieData = getAddMovieData();

  try {
    localStorage.setItem(addMovieStorageKey, JSON.stringify(savedAddMovieData));
  } catch {
    // Large uploaded images can exceed browser storage, but the visible form still stays filled.
  }

  closeAddSaveConfirmation();
}

function cancelAddSave() {
  applyAddMovieData(savedAddMovieData);
  closeAddSaveConfirmation();
}

if (addChooseImageButton && addImageUpload) {
  addChooseImageButton.addEventListener("click", () => {
    addImageUpload.click();
  });

  addImageUpload.addEventListener("change", () => {
    const file = addImageUpload.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      addMoviePreview.style.backgroundImage = `url("${reader.result}")`;
    });
    reader.readAsDataURL(file);
  });
}

if (addSaveAllButton) {
  addSaveAllButton.addEventListener("click", openAddSaveConfirmation);
}

if (addSaveConfirmationOverlay) {
  addSaveConfirmationOverlay.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");

    if (!actionButton) {
      return;
    }

    if (actionButton.dataset.action === "confirm") {
      confirmAddSave();
    }

    if (actionButton.dataset.action === "cancel") {
      cancelAddSave();
    }
  });
}

loadAddMovieData();
