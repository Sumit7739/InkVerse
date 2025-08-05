  // 1. Get references to the HTML elements for book details
        const bookCard = document.querySelector('.book-card');
        const authorImage = document.getElementById('authorImage');
        const authorName = document.getElementById('authorName');
        const bookSummary = document.getElementById('bookSummary');
        const bookTitle = document.getElementById('bookTitle');
        const bookInfo = document.getElementById('bookInfo');

        // 2. Sample book data (in a real app, this would come from a server or a larger data source)
        const sampleBook = {
            title: "The Lover's Gambit",
            info: "10 Chapters | Romance",
            authorName: "Purrs",
            authorImage: "https://avatars.githubusercontent.com/u/67714622?s=400&u=64900f585210a3d113466588820dc77ea133af9c&v=4",
            summary: "In a world of chess and secrets, two rivals find themselves in a game of love and betrayal. Every move is critical, and the heart is the ultimate prize. Will they checkmate their opponents or each other?",
            coverContent: "The Lover's Gambit"
        };

        // 3. Function to update the UI with book data
        function updateBookDetails(book) {
            authorImage.src = book.authorImage;
            authorName.textContent = book.authorName;
            bookSummary.textContent = book.summary;
            bookTitle.textContent = book.title;
            bookInfo.textContent = book.info;
        }

        // 4. Add click event listener to the book card
        bookCard.addEventListener('click', () => {
            updateBookDetails(sampleBook);
        });

        // --- Sidebar Toggle Logic ---
        const sidebar = document.getElementById('sidebar');
        const menuToggleBtn = document.getElementById('menuToggleBtn');

        menuToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
            // Save the state to localStorage so it persists across pages
            localStorage.setItem('sidebarExpanded', sidebar.classList.contains('expanded'));
        });

        // On page load, check if the sidebar should be expanded
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