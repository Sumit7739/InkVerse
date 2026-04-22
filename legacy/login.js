document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const body = document.body;

  function updateThemeIcon() {
    const icon = themeToggleBtn.querySelector('i');
    const isDarkMode = body.classList.contains('dark-mode');
    icon.classList.toggle('fa-moon', !isDarkMode);
    icon.classList.toggle('fa-sun', isDarkMode);
  }

  // Check localStorage for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
  }
  updateThemeIcon();

  // Toggle theme on button click
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    updateThemeIcon();
  });

  // Login form submission (basic placeholder)
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Login attempt:', { email, password });
    // Add your login logic here
    alert('Login functionality to be implemented!');
  });
});