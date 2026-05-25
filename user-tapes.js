const tapeFrame = document.querySelector(".user-tapes .frame");

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
