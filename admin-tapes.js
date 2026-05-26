const adminTapeFrame = document.querySelector(".admin-tapes .frame");
const homeAloneCard = document.querySelector(".home-alone-card");
const deletedStorageKey = "video-cassette-home-alone-deleted";

if (homeAloneCard) {
  try {
    homeAloneCard.classList.toggle("is-deleted", localStorage.getItem(deletedStorageKey) === "true");
  } catch {
    homeAloneCard.classList.remove("is-deleted");
  }
}

if (adminTapeFrame) {
  let isDragging = false;
  let shouldCancelClick = false;
  let startX = 0;
  let startScrollLeft = 0;
  const dragThreshold = 12;

  adminTapeFrame.querySelectorAll("img").forEach((image) => {
    image.draggable = false;
  });

  adminTapeFrame.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    isDragging = true;
    shouldCancelClick = false;
    startX = event.clientX;
    startScrollLeft = adminTapeFrame.scrollLeft;
    adminTapeFrame.classList.add("is-dragging");
  });

  adminTapeFrame.addEventListener("pointermove", (event) => {
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

    adminTapeFrame.scrollLeft = startScrollLeft - moveX;
  });

  function stopDragging(event) {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    adminTapeFrame.classList.remove("is-dragging");
  }

  adminTapeFrame.addEventListener("pointerup", stopDragging);
  adminTapeFrame.addEventListener("pointercancel", stopDragging);
  adminTapeFrame.addEventListener("pointerleave", stopDragging);
  adminTapeFrame.addEventListener(
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
