// --- Sidebar Toggle Logic ---
        const sidebar = document.getElementById('sidebar');
        const menuToggleBtn = document.getElementById('menuToggleBtn');

        menuToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
            // Save the new state to localStorage.
            localStorage.setItem('sidebarExpanded', sidebar.classList.contains('expanded'));
        });

        // On page load, check localStorage and apply the saved state.
        if (localStorage.getItem('sidebarExpanded') === 'true') {
            sidebar.classList.add('expanded');
        }

        // --- Notification Popup Logic ---
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPopup = document.getElementById('notificationPopup');
        const closePopupBtn = document.getElementById('closePopupBtn');

        // Toggle popup visibility when bell icon is clicked
        notificationBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the window click event from firing immediately
            notificationPopup.classList.toggle('hidden');
        });

        // Close popup with the 'X' button
        closePopupBtn.addEventListener('click', () => {
            notificationPopup.classList.add('hidden');
        });

        // Close popup when clicking anywhere outside of it
        window.addEventListener('click', (event) => {
            if (!notificationPopup.classList.contains('hidden') && !notificationPopup.contains(event.target)) {
                notificationPopup.classList.add('hidden');
            }
        });

        // --- Theme Toggle Logic ---
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        const body = document.body;
        
        // Function to update the icon based on the current theme
        function updateThemeIcon() {
            const icon = themeToggleBtn.querySelector('i');
            const isDarkMode = body.classList.contains('dark-mode');
            icon.classList.toggle('fa-moon', !isDarkMode);
            icon.classList.toggle('fa-sun', isDarkMode);
        }
        
        // On page load, check for a saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
        }
        updateThemeIcon(); // Set the correct icon on initial load
        
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            // Save the new preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            updateThemeIcon(); // Update the icon after a click
        });