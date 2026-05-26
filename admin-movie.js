const adminMovieImage = document.querySelector(".admin-movie .image");
const imageUpload = document.querySelector(".image-upload");
const chooseImageButton = document.querySelector(".choose-image-button");
const saveAllButton = document.querySelector(".save-all-button");
const saveConfirmationOverlay = document.querySelector(".save-confirmation-overlay");
const deleteButton = document.querySelector(".delete-button");
const adminFields = document.querySelectorAll(".admin-field");
const storageKey = "video-cassette-admin-movie";
const deletedStorageKey = "video-cassette-home-alone-deleted";

const defaultMovieData = {
  actors: "Macaulay Culkin, Joe Pesci, Daniel Stern",
  description:
    "When 8-year-old Kevin McCallister is accidentally left home alone for the holidays, he thinks his wish has come true. But when two blundering burglars target his house, Kevin must defend his home with a series of hilarious, homemade booby traps.",
  director: "Chris Columbus",
  duration: "1h 43m",
  genres: "Comedy",
  image: "https://c.animaapp.com/CHhpEx9h/img/image@2x.png",
  tapeId: "VHS-1990-0102",
  title: "Home Alone",
  year: "1990",
};

let savedMovieData = { ...defaultMovieData };

function getFormData() {
  const movieData = {};

  adminFields.forEach((field) => {
    movieData[field.dataset.field] = field.value;
  });

  movieData.image = adminMovieImage.src;
  return movieData;
}

function applyMovieData(movieData) {
  adminFields.forEach((field) => {
    const key = field.dataset.field;
    field.value = movieData[key] || defaultMovieData[key] || "";
  });

  adminMovieImage.src = movieData.image || defaultMovieData.image;
}

function loadMovieData() {
  try {
    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      savedMovieData = { ...defaultMovieData, ...JSON.parse(savedData) };
    }
  } catch {
    savedMovieData = { ...defaultMovieData };
  }

  applyMovieData(savedMovieData);
}

function openSaveConfirmation() {
  if (!saveConfirmationOverlay) {
    return;
  }

  saveConfirmationOverlay.classList.add("is-open");
  saveConfirmationOverlay.setAttribute("aria-hidden", "false");
}

function closeSaveConfirmation() {
  if (!saveConfirmationOverlay) {
    return;
  }

  saveConfirmationOverlay.classList.remove("is-open");
  saveConfirmationOverlay.setAttribute("aria-hidden", "true");
}

function confirmSave() {
  savedMovieData = getFormData();

  try {
    localStorage.setItem(storageKey, JSON.stringify(savedMovieData));
  } catch {
    // Large uploaded images can exceed browser storage. Keep the visible changes anyway.
  }

  closeSaveConfirmation();
}

function cancelSave() {
  applyMovieData(savedMovieData);
  closeSaveConfirmation();
}

if (chooseImageButton && imageUpload) {
  chooseImageButton.addEventListener("click", () => {
    imageUpload.click();
  });

  imageUpload.addEventListener("change", () => {
    const file = imageUpload.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      adminMovieImage.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
}

if (saveAllButton) {
  saveAllButton.addEventListener("click", openSaveConfirmation);
}

if (saveConfirmationOverlay) {
  saveConfirmationOverlay.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");

    if (!actionButton) {
      return;
    }

    if (actionButton.dataset.action === "confirm") {
      confirmSave();
    }

    if (actionButton.dataset.action === "cancel") {
      cancelSave();
    }
  });
}

if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    try {
      localStorage.setItem(deletedStorageKey, "true");
    } catch {
      // The visible redirect still shows the deletion result for this demo flow.
    }

    window.location.href = "./admin-tapes.html";
  });
}

loadMovieData();
