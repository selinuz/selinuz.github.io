// Handle navbar toggle
function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("open");
}

// Attach event listeners for navbar
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }
});
