let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

document.addEventListener("DOMContentLoaded", () => {
  arrangeInCustomLayout();
  arrangeActivityBoxes();
  document.addEventListener("mouseup", onMouseUp);
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
  draggedElement =
    event.target.closest(".core-value") ||
    event.target.closest(".activity-box");
  if (!draggedElement) return;

  const rect = draggedElement.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;
  isDragging = false;

  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", stopDrag);
  event.preventDefault();
}

function dragMove(event) {
  if (!draggedElement) return;
  const x = event.clientX - offsetX;
  const y = event.clientY - offsetY;

  draggedElement.style.left = `${x}px`;
  draggedElement.style.top = `${y}px`;
  isDragging = true;
  updateConnections();
  visibleTextBoxes.forEach((textBox, lineElement) => {
    textBox.remove();
    visibleTextBoxes.delete(lineElement);
  });
}

function stopDrag() {
  if (!draggedElement) return;
  document.removeEventListener("mousemove", dragMove);
  document.removeEventListener("mouseup", stopDrag);
  draggedElement = null;
  updateConnections();
}

function toggleDefinition(element) {
  if (!isDragging) {
    element.classList.toggle("expanded");
    updateConnections();
  }
}

const activityConnections = [
  {
    from: "ubc-cs",
    to: "excellence",
    text: "Consistently maintained high academic performance, earning Dean’s List recognition.",
  },
  {
    from: "ubc-cs",
    to: "leadership",
    text: "Awarded the KMILOT Award for exceptional leadership and academic achievement.",
  },
];

// Store currently visible text boxes to toggle visibility
const visibleTextBoxes = new Map();

function arrangeActivityBoxes() {
  const activityPositions = [{ id: "ubc-cs", x: 200, y: 100 }];

  activityPositions.forEach(({ id, x, y }) => {
    const activity = document.getElementById(id);
    if (activity) {
      activity.style.position = "absolute";
      activity.style.left = `${x - activity.offsetWidth / 2}px`;
      activity.style.top = `${y}px`;
    }
  });

  updateConnections();
}

function updateConnections() {
  const svg = document.getElementById("connections");
  svg.innerHTML = "";

  activityConnections.forEach(({ from, to, text }) => {
    const fromElem = document.getElementById(from);
    const toElem = document.getElementById(to);

    if (fromElem && toElem) {
      const fromRect = fromElem.getBoundingClientRect();
      const toRect = toElem.getBoundingClientRect();

      const x1 = fromRect.left + fromRect.width / 2;
      const y1 = fromRect.top + fromRect.height / 2;
      const x2 = toRect.left + toRect.width / 2;
      const y2 = toRect.top + toRect.height / 2;

      console.log(`Creating line from ${from} to ${to}`);

      const visibleLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      visibleLine.setAttribute("x1", x1);
      visibleLine.setAttribute("y1", y1);
      visibleLine.setAttribute("x2", x2);
      visibleLine.setAttribute("y2", y2);
      visibleLine.classList.add("line");
      svg.appendChild(visibleLine);

      const transparentLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      transparentLine.setAttribute("x1", x1);
      transparentLine.setAttribute("y1", y1);
      transparentLine.setAttribute("x2", x2);
      transparentLine.setAttribute("y2", y2);
      transparentLine.setAttribute("data-from", from);
      transparentLine.setAttribute("data-to", to);
      transparentLine.classList.add("transparent-line");

      transparentLine.addEventListener("click", (event) => {
        console.log("Line clicked!");
        toggleLineText(event, x1, y1, x2, y2, text);
      });

      svg.appendChild(transparentLine);
    }
  });
}

function toggleLineText(event, x1, y1, x2, y2, text) {
  const lineElement = event.target;
  const existingTextBox = visibleTextBoxes.get(lineElement);

  if (existingTextBox) {
    existingTextBox.remove();
    visibleTextBoxes.delete(lineElement);
  } else {
    const textBox = document.createElement("div");
    textBox.className = "line-text-box";
    textBox.innerText = text;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    textBox.style.left = `${midX}px`;
    textBox.style.top = `${midY}px`;

    textBox.addEventListener("click", () => {
      textBox.remove();
      visibleTextBoxes.delete(lineElement);
    });

    document.body.appendChild(textBox);
    visibleTextBoxes.set(lineElement, textBox);
  }
}

function showActivityDetails(activityBox) {
  const activityId = activityBox.id;
  const connectionsMap = {
    "ubc-cs": ["leadership", "excellence"],
  };

  const connectedValues = connectionsMap[activityId] || [];
  const isHighlighted = activityBox.classList.contains("highlight");

  document
    .querySelectorAll(".activity-box, .core-value, .transparent-line")
    .forEach((elem) => {
      elem.classList.remove("highlight");
    });

  if (!isHighlighted) {
    activityBox.classList.add("highlight");

    connectedValues.forEach((coreValueId) => {
      const coreValue = document.getElementById(coreValueId);
      if (coreValue) {
        coreValue.classList.add("highlight");
      }
    });

    const svg = document.getElementById("connections");
    svg.querySelectorAll("line").forEach((line) => {
      const from = line.getAttribute("data-from");
      const to = line.getAttribute("data-to");

      if (from === activityId || connectedValues.includes(to)) {
        line.classList.add("highlight");
      }
    });
  }
}
