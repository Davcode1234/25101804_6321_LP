const toggleBtn = document.querySelector(".toggle-btn");
const textToWrap = document.querySelector(".expanded");
const mainSec = document.querySelector(".main-sec-container");
const infoSection = document.querySelector(".info-section");
const listColumn = document.querySelector(".list-column");

toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  textToWrap.classList.toggle("expanded");
  if (window.matchMedia("(min-width: 1300px)").matches) {
    infoSection.classList.toggle("expanded");
  } else if (window.matchMedia("(max-width: 1300px)").matches) {
    infoSection.classList.toggle("mobExpanded");
  }

  listColumn.classList.toggle("expanded");

  mainSec.classList.toggle("main-sec-expanded-form");
  const open = textToWrap.classList.contains("expanded");
  toggleBtn.textContent = open ? "Zwiń" : "Rozwiń";
});

function enforceInfoSection() {
  if (window.matchMedia("(max-width: 1299px)").matches) {
    infoSection.classList.remove("expanded");
  } else {
    infoSection.classList.add("expanded");
  }
}

window.addEventListener("DOMContentLoaded", enforceInfoSection);

window.addEventListener("resize", enforceInfoSection);
