// Toggle between light and dark modes and save the preference to localStorage
function toggleDarkMode() {
    const currentTheme =
        document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Store theme in localStorage
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
    document.querySelector(".sort-button").textContent = `Sort ${sortOrder === "asc" ? "Asc" : "Desc"
        }`;
    document
        .querySelector(".sort-button")
        .setAttribute("data-sort", sortOrder);

    // Sort the chapter cards based on the date
    chapterCards.sort((a, b) => {
        const dateA = parseDate(a.querySelector(".read-more").textContent);
        const dateB = parseDate(b.querySelector(".read-more").textContent);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

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

function parseDate(dateString) {
    const [day, monthName] = dateString.split(" ");
    const month = getMonthNumber(monthName);
    return new Date(new Date().getFullYear(), month, parseInt(day));
}

function getMonthNumber(monthName) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return months.indexOf(monthName);
}

async function init() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

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

fetch('chap.json')
    .then(response => response.json())
    .then(data => {
        const chaptersContainer = document.getElementById('chapters');
        data.chapters.forEach(chapter => {
            const chapterLink = document.createElement('a');
            chapterLink.href = `chapter.html?file=${chapter.file}`;

            const chapterCard = document.createElement('div');
            chapterCard.classList.add('chapter-card');

            const chapterTitle = document.createElement('h2');
            chapterTitle.textContent = chapter.title;

            const chapterDate = document.createElement('p');
            chapterDate.classList.add('read-more');
            chapterDate.textContent = chapter.date;

            chapterCard.appendChild(chapterTitle);
            chapterCard.appendChild(chapterDate);
            chapterLink.appendChild(chapterCard);
            chaptersContainer.appendChild(chapterLink);
        });
    });