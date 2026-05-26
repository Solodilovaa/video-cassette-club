const tapeFrame = document.querySelector(".user-tapes .frame");
const movieSearchInput = document.querySelector(".movie-search-input");
const tapeCards = document.querySelectorAll(".user-tapes .tape-card");

if (movieSearchInput) {
  movieSearchInput.addEventListener("input", () => {
    const query = movieSearchInput.value.trim().toLowerCase();

    tapeCards.forEach((card) => {
      const title = (card.dataset.title || "").toLowerCase();
      card.classList.toggle("is-hidden", query !== "" && !title.includes(query));
    });

    if (tapeFrame) {
      tapeFrame.scrollLeft = 0;
    }
  });
}

if (tapeFrame) {
  let isDragging = false;
  let shouldCancelClick = false;
  let startX = 0;
  let startScrollLeft = 0;
  const dragThreshold = 12;

  tapeFrame.querySelectorAll("img").forEach((image) => {
    image.draggable = false;
  });

  tapeFrame.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    isDragging = true;
    shouldCancelClick = false;
    startX = event.clientX;
    startScrollLeft = tapeFrame.scrollLeft;
    tapeFrame.classList.add("is-dragging");
  });

  tapeFrame.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    const moveX = event.clientX - startX;

    if (Math.abs(moveX) > 3) {
      event.preventDefault();
    }

    if (Math.abs(moveX) > dragThreshold) {
      shouldCancelClick = true;
    }

    tapeFrame.scrollLeft = startScrollLeft - moveX;
  });

  function stopDragging(event) {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    tapeFrame.classList.remove("is-dragging");
  }

  tapeFrame.addEventListener("pointerup", stopDragging);
  tapeFrame.addEventListener("pointercancel", stopDragging);
  tapeFrame.addEventListener("pointerleave", stopDragging);
  tapeFrame.addEventListener(
    "click",
    (event) => {
      if (shouldCancelClick) {
        event.preventDefault();
        event.stopPropagation();
        shouldCancelClick = false;
      }
    },
    true,
  );
}
