// Toggle between light and dark modes and save the preference to localStorage
function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Fetch and render chapter data
async function syncData() {
  const chaptersContainer = document.getElementById("chapters");
  chaptersContainer.innerHTML = ""; // Clear old content

  try {
    const response = await fetch("chap.json");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    updateChaptersContainer(data);
  } catch (error) {
    console.error("Error fetching data:", error);

    const errorMsg = document.createElement("p");
    errorMsg.textContent =
      "Failed to load chapters. Please check your internet connection or try again later.";
    chaptersContainer.appendChild(errorMsg);
  }
}

// Render chapter cards
function updateChaptersContainer(data) {
  const chaptersContainer = document.getElementById("chapters");
  chaptersContainer.innerHTML = "";

  data.chapters.forEach((chapter) => {
    const chapterLink = document.createElement("a");
    chapterLink.href = `chapter.html?file=${chapter.file}`;

    const chapterCard = document.createElement("div");
    chapterCard.classList.add("chapter-card");

    const chapterTitle = document.createElement("h2");
    chapterTitle.textContent = chapter.title;

    const chapterDate = document.createElement("p");
    chapterDate.classList.add("read-more");
    chapterDate.textContent = chapter.date;

    chapterCard.appendChild(chapterTitle);
    chapterCard.appendChild(chapterDate);
    chapterLink.appendChild(chapterCard);
    chaptersContainer.appendChild(chapterLink);
  });
}

// Create Sync button dynamically
function createSyncButton(container) {
  const syncButton = document.createElement("button");
  syncButton.textContent = "Sync";
  syncButton.classList.add("sync-button");
  syncButton.onclick = syncData;

  container.appendChild(syncButton);
}

// Sort chapters (asc/desc)
function sortChapters() {
  const chaptersContainer = document.getElementById("chapters");
  const chapterCards = Array.from(
    chaptersContainer.querySelectorAll(".chapter-card")
  );

  let sortOrder =
    document.querySelector(".sort-button").getAttribute("data-sort") || "asc";
  sortOrder = sortOrder === "asc" ? "desc" : "asc";

  document.querySelector(".sort-button").textContent = `Sort ${
    sortOrder === "asc" ? "Asc" : "Desc"
  }`;
  document
    .querySelector(".sort-button")
    .setAttribute("data-sort", sortOrder);

  if (sortOrder === "desc") {
    chapterCards.reverse();
  }

  chaptersContainer.innerHTML = "";
  chapterCards.forEach((card) => {
    const link = document.createElement("a");
    link.href = card.parentNode.href;
    link.appendChild(card);
    chaptersContainer.appendChild(link);
  });
}

// Initialize the app
async function init() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  const sortButtonContainer = document.querySelector(".sort-button");
  createSyncButton(sortButtonContainer.parentElement);

  await syncData();

  const startReadingButton = document.querySelector(".read-more-button");
  if (startReadingButton) {
    startReadingButton.addEventListener("click", (event) => {
      event.preventDefault();
      const targetElement = document.getElementById("chapters");
      const offsetTop = targetElement.offsetTop - 150;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  }
}

window.addEventListener("DOMContentLoaded", init);
