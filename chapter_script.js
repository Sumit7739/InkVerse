function toggleDarkMode() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let currentChapter =
  getQueryParam("file") ||
  localStorage.getItem("currentChapter") ||
  "ch1.md";

let chapterFiles = []; // We will load this from index.json

//   <a href="index.html"><i class="fas fa-home"></i>Home</a> show this at the start
const homeLink = document.createElement('a');
homeLink.href = 'index.html';
homeLink.innerHTML = '<i class="fas fa-home"></i>Home';
document.getElementById('sidebar').insertBefore(homeLink, document.getElementById('chapter-list'));


function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const isSidebarOpen = sidebar.classList.contains("open");

  if (isSidebarOpen) {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  } else {
    sidebar.classList.add("open");
    overlay.classList.add("open");
  }
}

function loadChaptersIntoSidebar() {
  fetch('chap.json')
    .then(response => response.json())
    .then(data => {
      const sidebarList = document.getElementById('chapter-list');
      sidebarList.innerHTML = '';

      data.chapters.forEach(chapter => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = chapter.title;
        link.dataset.file = chapter.file;
        listItem.appendChild(link);
        sidebarList.appendChild(listItem);
      });
      highlightCurrentChapter();
    })
    .catch(error => console.error('Error loading chapters:', error));
}

function highlightCurrentChapter() {
  const links = document.querySelectorAll('#chapter-list a');
  links.forEach(link => {
    if (link.dataset.file === currentChapter) {
      link.classList.add('current-chapter');
    } else {
      link.classList.remove('current-chapter');
    }
  });
}

document.getElementById('hamburger').addEventListener('click', toggleSidebar);
document.getElementById('overlay').addEventListener('click', toggleSidebar);


function updateChapter() {
  fetch(`chapters/${currentChapter}`)
    .then((res) => res.text())
    .then((md) => {
      document.getElementById("chapter-body").innerHTML =
        marked.parse(md);
      document.getElementById("chapter-body").style.opacity = 1;
      document.getElementById("chapter-title").innerText = currentChapter
        .replace(".md", "")
        .replace("ch", "Chapter ");
      updateProgressBar();
      localStorage.setItem("currentChapter", currentChapter);
      highlightCurrentChapter();
    })
    .catch(() => {
      document.getElementById("chapter-body").innerHTML =
        "<p>Failed to load chapter.</p>";
    });
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
}

function loadChapter(direction) {
  if (!chapterFiles.length) return;

  let currentIndex = chapterFiles.indexOf(currentChapter);

  if (direction === "next") {
    if (currentIndex === chapterFiles.length - 1) {
      window.location.href = "index.html";
      return;
    }
    currentIndex = (currentIndex + 1) % chapterFiles.length;
  } else if (direction === "prev") {
    currentIndex =
      (currentIndex - 1 + chapterFiles.length) % chapterFiles.length;
  }

  currentChapter = chapterFiles[currentIndex];
  updateChapter();
}

async function init() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  try {
    const res = await fetch("chapters/index.json");
    chapterFiles = await res.json();

    if (!chapterFiles.includes(currentChapter)) {
      currentChapter = chapterFiles[0];
    }

    const chapterList = document.getElementById("chapter-list");
    chapterList.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        const newChapter = event.target.dataset.file;
        currentChapter = newChapter;
        updateChapter();
        toggleSidebar();
      }
    });

    loadChaptersIntoSidebar();

    updateChapter();
  } catch (err) {
    console.error("Failed to load chapters:", err);
    document.getElementById("chapter-body").innerHTML =
      "<p>Failed to load chapters list.</p>";
  }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("scroll", updateProgressBar);