function sortProjectsByDate(order) {
  const projects = [...document.querySelectorAll(".project-box")];
  projects.sort((a, b) => {
    const dateA = parseInt(a.getAttribute("data-date"));
    const dateB = parseInt(b.getAttribute("data-date"));
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
  const container = document.getElementById("projects-section");
  projects.forEach((project) => container.appendChild(project));
}

function updateTimeline() {
  const start = document.getElementById("start-year").value;
  const end = document.getElementById("end-year").value;
  document.getElementById("timeline-range").textContent = `${start} - ${end}`;
  filterByTimeline(start, end);
}

function filterByTimeline(start, end) {
  document.querySelectorAll(".project-box").forEach((box) => {
    const year = parseInt(box.getAttribute("data-date"));
    box.style.display = year >= start && year <= end ? "block" : "none";
  });
}

const selectedSkills = new Set();

function toggleSkillFilter(button, skill) {
  const selectAllButton = document.getElementById("select-all");

  if (selectedSkills.has(skill)) {
    selectedSkills.delete(skill);
    button.classList.remove("active");
  } else {
    selectedSkills.add(skill);
    button.classList.add("active");
  }

  if (selectedSkills.size === 0) {
    selectAllButton.classList.add("active");
  } else {
    selectAllButton.classList.remove("active");
  }

  applySkillFilters();
}

function resetFilters() {
  selectedSkills.clear();
  document
    .querySelectorAll(".skill-filter")
    .forEach((button) => button.classList.remove("active"));
  document.getElementById("select-all").classList.add("active");
  applySkillFilters();
}

function applySkillFilters() {
  document.querySelectorAll(".project-box").forEach((box) => {
    const skills = box.getAttribute("data-skills").split(", ");
    const matches = [...selectedSkills].some((skill) => skills.includes(skill));
    box.style.display = selectedSkills.size === 0 || matches ? "block" : "none";
  });
}
