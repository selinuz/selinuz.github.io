let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let zoomLevel = 1;
const visibleTextBoxes = new Map();

document.addEventListener("DOMContentLoaded", () => {
  arrangeCoreValues();
  arrangeActivityBoxes();
  setTimeout(() => {
    updateConnections();
  }, 100);

  const zoomInButton = document.getElementById("zoom-in");
  const zoomOutButton = document.getElementById("zoom-out");

  zoomInButton.addEventListener("click", () => adjustZoom(0.1));
  zoomOutButton.addEventListener("click", () => adjustZoom(-0.1));
});

function adjustZoom(delta) {
  // Limit zoom level between 0.5 and 2.0
  zoomLevel = Math.min(2.0, Math.max(0.5, zoomLevel + delta));

  const mapContent = document.getElementById("map-content");
  mapContent.style.transform = `scale(${zoomLevel})`;

  updateConnections();
}

function arrangeCoreValues() {
  const values = document.querySelectorAll(".core-value");
  const map = document.getElementById("map");

  const mapRect = map.getBoundingClientRect();
  const centerX = mapRect.width / 2;
  const centerY = mapRect.height / 2;
  const xOffset = mapRect.width / 5;

  const positions = [
    { x: centerX - 2 * xOffset, y: centerY },
    { x: centerX - xOffset, y: centerY },
    { x: centerX, y: centerY },
    { x: centerX + xOffset, y: centerY },
    { x: centerX + 2 * xOffset, y: centerY },
  ];

  values.forEach((value, index) => {
    if (positions[index]) {
      value.style.position = "absolute";
      value.style.left = `${positions[index].x - value.offsetWidth / 2}px`;
      value.style.top = `${positions[index].y - value.offsetHeight / 2}px`;
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

  const mapContent = document.getElementById("map-content");
  const mapContentRect = mapContent.getBoundingClientRect();

  const adjustedX = (event.clientX - mapContentRect.left - offsetX) / zoomLevel;
  const adjustedY = (event.clientY - mapContentRect.top - offsetY) / zoomLevel;

  const parent = document.getElementById("map");
  const parentRect = parent.getBoundingClientRect();
  const elementWidth = draggedElement.offsetWidth / zoomLevel;
  const elementHeight = draggedElement.offsetHeight / zoomLevel;

  let x = Math.max(
    0,
    Math.min(adjustedX, (parentRect.width - elementWidth) / zoomLevel)
  );
  let y = Math.max(
    0,
    Math.min(adjustedY, (parentRect.height - elementHeight) / zoomLevel)
  );

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
  // UBC CS
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

  // WiCS
  {
    from: "wics",
    to: "community",
    text: "Organized events to foster a sense of belonging and support for underrepresented genders in computer science.",
  },
  {
    from: "wics",
    to: "collaboration",
    text: "Worked closely with a team of five and tech sponsors to ensure smooth event execution.",
  },
  {
    from: "wics",
    to: "leadership",
    text: "Led a team of 5 and managed relationships with sponsors, facilitating successful partnerships.",
  },

  // SAP
  {
    from: "sap",
    to: "innovation",
    text: "Automated overdue notifications in Jira, optimizing workflows and enhancing productivity.",
  },
  {
    from: "sap",
    to: "excellence",
    text: "Created an SAP Analytics Cloud dashboard to maintain platform consistency.",
  },
  {
    from: "sap",
    to: "collaboration",
    text: "Coordinated with 8 interns and a full-time team member on an internal LMS platform.",
  },

  // Pocket Pelvis
  {
    from: "pocket-pelvis",
    to: "innovation",
    text: "Integrated AR features with a 3D-printed model to enhance learning and engagement.",
  },
  {
    from: "pocket-pelvis",
    to: "collaboration",
    text: "Collaborated with a team of six using Agile methodologies to deliver the project.",
  },

  // Feral Freedom
  {
    from: "feral-freedom",
    to: "community",
    text: "Developed a game inspired by a true story from your hometown, creating a meaningful connection.",
  },
  {
    from: "feral-freedom",
    to: "collaboration",
    text: "Worked with a team of six using Agile methods to design and implement the game.",
  },
  {
    from: "feral-freedom",
    to: "innovation",
    text: "Built a fully playable game in three months using OpenGL and creative gameplay mechanics.",
  },

  // YouCode
  {
    from: "youcode",
    to: "excellence",
    text: "Learned to use Figma as a drawing tool and applied this knowledge to web design.",
  },
  {
    from: "youcode",
    to: "innovation",
    text: "Developed a fully functional website from scratch within 24 hours, showcasing creativity under time pressure.",
  },
  {
    from: "youcode",
    to: "collaboration",
    text: "Worked with a team of five to deliver a high-quality project within tight deadlines.",
  },
];

function arrangeActivityBoxes() {
  const map = document.getElementById("map"); // Reference to the map container
  const mapRect = map.getBoundingClientRect(); // Get the dimensions of the map
  const centerX = mapRect.width / 2; // Horizontal center of the map
  const centerY = mapRect.height / 2; // Vertical center of the map
  const xOffset = 250; // Horizontal spacing between boxes
  const yOffset = 250; // Vertical spacing between rows

  const activityPositions = [
    {
      id: "ubc-cs",
      x: centerX - 2 * xOffset,
      y: centerY + yOffset,
    },
    {
      id: "wics",
      x: centerX,
      y: centerY - yOffset,
    },
    {
      id: "feral-freedom",
      x: centerX + 2 * xOffset,
      y: centerY - yOffset,
    },
    {
      id: "sap",
      x: centerX - 2 * xOffset,
      y: centerY - yOffset,
    },
    {
      id: "youcode",
      x: centerX,
      y: centerY + yOffset,
    },
    {
      id: "pocket-pelvis",
      x: centerX + 2 * xOffset,
      y: centerY + yOffset,
    },
  ];

  activityPositions.forEach(({ id, x, y }) => {
    const activity = document.getElementById(id);
    if (activity) {
      activity.style.position = "absolute";
      activity.style.left = `${x - activity.offsetWidth / 2}px`; // Center horizontally
      activity.style.top = `${y - activity.offsetHeight / 2}px`; // Center vertically
    }
  });
}

function updateConnections() {
  const svg = document.getElementById("connections");
  const mapContent = document.getElementById("map-content");
  const mapRect = mapContent.getBoundingClientRect();

  svg.innerHTML = ""; // Clear existing lines

  activityConnections.forEach(({ from, to, text }) => {
    const fromElem = document.getElementById(from);
    const toElem = document.getElementById(to);

    if (fromElem && toElem) {
      const fromRect = fromElem.getBoundingClientRect();
      const toRect = toElem.getBoundingClientRect();

      const x1 =
        (fromRect.left + fromRect.width / 2 - mapRect.left) / zoomLevel;
      const y1 = (fromRect.top + fromRect.height / 2 - mapRect.top) / zoomLevel;
      const x2 = (toRect.left + toRect.width / 2 - mapRect.left) / zoomLevel;
      const y2 = (toRect.top + toRect.height / 2 - mapRect.top) / zoomLevel;

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
        toggleLineText(event, x1, y1, x2, y2, text);
      });

      svg.appendChild(transparentLine);
    }
  });
}

function toggleLineText(event, x1, y1, x2, y2, text) {
  const lineElement = event.target;
  const existingTextBox = visibleTextBoxes.get(lineElement);
  const mapContent = document.getElementById("map-content");
  const mapRect = mapContent.getBoundingClientRect();

  if (existingTextBox) {
    existingTextBox.remove();
    visibleTextBoxes.delete(lineElement);
  } else {
    const textBox = document.createElement("div");
    textBox.className = "line-text-box";
    textBox.innerText = text;

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    textBox.style.position = "absolute";
    textBox.style.left = `${midX}px`;
    textBox.style.top = `${midY}px`;

    textBox.addEventListener("click", () => {
      textBox.remove();
      visibleTextBoxes.delete(lineElement);
    });

    document.getElementById("map-content").appendChild(textBox);
    visibleTextBoxes.set(lineElement, textBox);
  }
}

function showActivityDetails(activityBox) {
  toggleDefinition(activityBox);
  const activityId = activityBox.id;
  const connectionsMap = {
    "ubc-cs": ["leadership", "excellence"],
    wics: ["community", "collaboration", "leadership"],
    sap: ["innovation", "excellence", "collaboration"],
    "pocket-pelvis": ["innovation", "collaboration"],
    "feral-freedom": ["innovation", "collaboration", "community"],
    youcode: ["excellence", "innovation", "collaboration"],
  };

  const connectedValues = connectionsMap[activityId] || [];
  const isHighlighted = activityBox.classList.contains("highlight");

  document
    .querySelectorAll(".activity-box, .core-value, .transparent-line")
    .forEach((elem) => {
      elem.classList.remove("highlight");
    });

  if (!isHighlighted && !isDragging) {
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

      if (from === activityId) {
        line.classList.add("highlight");
      }
    });
  }
}
