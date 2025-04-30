// Toggle between light and dark modes and save the preference to localStorage
function toggleDarkMode() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme); // Store theme in localStorage
}

async function syncData() {
  const chaptersContainer = document.getElementById("chapters");
  // Remove all existing chapter cards
  while (chaptersContainer.firstChild) {
    chaptersContainer.removeChild(chaptersContainer.firstChild);
  }
  try {
    const response = await fetch("chap.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    localStorage.setItem("chaptersData", JSON.stringify(data));
    updateChaptersContainer(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    const localData = localStorage.getItem("chaptersData");
    if (localData) {
      updateChaptersContainer(JSON.parse(localData));
    } else {
      const errorMsg = document.createElement("p");
      errorMsg.textContent =
        "Failed to load chapters. Please check your internet connection or try again later.";
      chaptersContainer.appendChild(errorMsg);
    }
  }
}

function updateChaptersContainer(data) {
  const chaptersContainer = document.getElementById("chapters");
  // Remove all existing chapter cards
  while (chaptersContainer.firstChild) {
    chaptersContainer.removeChild(chaptersContainer.firstChild);
  }
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

function createSyncButton(container) {
  const syncButton = document.createElement("button");
  syncButton.textContent = "Sync";
  syncButton.classList.add("sync-button");
  syncButton.onclick = syncData;

  container.appendChild(syncButton);
}

function sortChapters() {
   const chaptersContainer = document.getElementById("chapters");
  const chapterCards = Array.from(
    chaptersContainer.querySelectorAll(".chapter-card")
  );

  // Get the current sort order from the button's data attribute or set it to 'asc' initially
  let sortOrder =
    document.querySelector(".sort-button").getAttribute("data-sort") ||
    "asc";

  // Toggle the sort order
  sortOrder = sortOrder === "asc" ? "desc" : "asc";

  // Update the button's text and data attribute
  document.querySelector(".sort-button").textContent = `Sort ${
    sortOrder === "asc" ? "Asc" : "Desc"
  }`;
  document
    .querySelector(".sort-button")
    .setAttribute("data-sort", sortOrder);    
  
   if(sortOrder === "desc"){
    // Reverse the order of chapter cards for descending order
    chapterCards.reverse();
  }

  // Remove all chapter cards from the container
  while (chaptersContainer.firstChild) {
    chaptersContainer.removeChild(chaptersContainer.firstChild);
  }

  // Append the sorted chapter cards back to the container
  chapterCards.forEach((card) => {
    const link = document.createElement("a");
    link.href = card.parentNode.href; // Preserve the original link
    link.appendChild(card); // Append the card to the new link
    chaptersContainer.appendChild(link); // Append the link to the container
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available, show the update popup
                  showUpdatePopup(registration);
                } else {
                  // No previous service worker, so the app is offline capable
                  console.log('App is now available offline!');
                }
              }
            });
          }
        });
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });

    // Check for updates on subsequent visits
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('New content available; reloading...');
      window.location.reload();
    });
  }
}

function showUpdatePopup(registration) {
  if (confirm('A new version of the app is available. Update now?')) {
    registration.waiting.postMessage('skipWaiting');
    window.location.reload();
    
  }
}

if ('serviceWorker' in navigator) {
  registerServiceWorker();
}


async function init() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
  // Get the sort button container
  const sortButtonContainer = document.querySelector(".sort-button");

  // Create the sync button next to the sort button
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