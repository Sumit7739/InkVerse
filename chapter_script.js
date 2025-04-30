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
  
      updateChapter();
    } catch (err) {
      console.error("Failed to load chapters:", err);
      document.getElementById("chapter-body").innerHTML =
        "<p>Failed to load chapters list.</p>";
    }
  }
  
  window.addEventListener("DOMContentLoaded", init);
  window.addEventListener("scroll", updateProgressBar);