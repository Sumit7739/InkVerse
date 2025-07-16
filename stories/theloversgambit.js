// This is a modified version of the logic from the original script.js.

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
        // Adjust the path if necessary to point to the correct location of your JSON file
        const response = await fetch("loversgambitchapters/chapters.json");
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
        // Adjust the chapter link as needed
        chapterLink.href = `chapter.html?file=${chapter.file}`;

        const chapterCard = document.createElement("div");
        chapterCard.classList.add("chapter-card"); // Use this class for basic styling

        const chapterTitle = document.createElement("h2");
        chapterTitle.textContent = chapter.title;

        const chapterDate = document.createElement("p");
        chapterDate.classList.add("read-more"); // Re-using for now, change if necessary
        chapterDate.textContent = chapter.date;

        chapterCard.appendChild(chapterTitle);
        chapterCard.appendChild(chapterDate);
        chapterLink.appendChild(chapterCard);
        chaptersContainer.appendChild(chapterLink);
    });
}

// Sort chapters (asc/desc) - This may need adaptation based on your needs
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

// Initialize the app - Adapt this to call in the new HTML structure
async function init() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

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
