let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

document.addEventListener("DOMContentLoaded", () => {
  arrangeInCustomLayout();
});

function arrangeInCustomLayout() {
  const values = document.querySelectorAll(".core-value");
  const positions = [
    { x: window.innerWidth / 2, y: 200 }, // Center
    { x: window.innerWidth / 2 - 200, y: 350 }, // Left
    { x: window.innerWidth / 2 + 200, y: 350 }, // Right
    { x: window.innerWidth / 2 - 200, y: 550 }, // Bottom Left
    { x: window.innerWidth / 2 + 200, y: 550 }, // Bottom Right
  ];

  values.forEach((value, index) => {
    if (positions[index]) {
      value.style.position = "absolute";
      value.style.left = `${positions[index].x - value.offsetWidth / 2}px`;
      value.style.top = `${positions[index].y}px`;
    }
  });
}

function startDrag(event) {
  draggedElement = event.target.closest(".core-value");
  if (!draggedElement) return;

  const rect = draggedElement.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;
  isDragging = false;

  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", stopDrag);
}

function dragMove(event) {
  if (!draggedElement) return;
  const x = event.clientX - offsetX;
  const y = event.clientY - offsetY;

  draggedElement.style.left = `${x}px`;
  draggedElement.style.top = `${y}px`;
  isDragging = true;
}

function stopDrag() {
  if (!draggedElement) return;
  document.removeEventListener("mousemove", dragMove);
  document.removeEventListener("mouseup", stopDrag);
  draggedElement = null;
}

function toggleDefinition(element) {
  if (!isDragging) {
    element.classList.toggle("expanded");
  }
}
