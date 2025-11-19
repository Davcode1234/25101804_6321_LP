const toggleBtn = document.querySelector(".toggle-btn");
const textToWrap = document.querySelector(".expanded");
const backgroundImg = document.querySelector(".background-img");
const rightColumn = document.querySelector(".right-column");
const mainWrapper = document.querySelector(".main-wrapper");
const titleFlagContainer = document.querySelector(".title-flag-container");

toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  textToWrap.classList.toggle("expanded");
  backgroundImg.classList.toggle("extended-background-img");
  rightColumn.classList.toggle("extended-right-column");
  mainWrapper.classList.toggle("extended-main-wrapper");
  titleFlagContainer.classList.toggle("extended-title-flag-container");
  if (window.matchMedia("(min-width: 1300px)").matches) {
    infoSection.classList.toggle("expanded");
  } else if (window.matchMedia("(max-width: 1300px)").matches) {
    infoSection.classList.toggle("mobExpanded");
  }

  listColumn.classList.toggle("expanded");

  const open = textToWrap.classList.contains("expanded");
  toggleBtn.textContent = open ? "Zwiń" : "Rozwiń";
});

// function enforceInfoSection() {
//   if (window.matchMedia("(max-width: 1299px)").matches) {
//     infoSection.classList.remove("expanded");
//   } else {
//     infoSection.classList.add("expanded");
//   }
// }

window.addEventListener("DOMContentLoaded", enforceInfoSection);

window.addEventListener("resize", enforceInfoSection);
