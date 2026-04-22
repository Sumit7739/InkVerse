// Global state management
let isDark = false;
let mousePos = { x: 0, y: 0 };
let typewriterText = '';
let currentWordIndex = 0;
let typewriterInterval;
let wordChangeInterval;

// Constants
const words = ["Discover", "Explore", "Read", "Experience", "Journey"];
const fullText = "Welcome to InkVerse";

// Novel data
const novels = [
    {
        title: "The Lover's Gambit",
        description: "In love and war, every move counts. A slow-burn tale of strategy, romance, and veiled intentions. Set in a campus where every smile hides a scheme, and silence says more than words. For those who crave tension, wit, and the art of unspoken battles",
        genre: "Romance, Drama, Psychological",
        chapters: 10,
        rating: 4.8,
        image: "https://github.com/Sumit7739/InkVerse/blob/main/img/cover.png?raw=true?w=400&h=600&fit=crop",
        isInProgress: true,
        link: "https://sumit7739.github.io/InkVerse/stories/theloversgambit.html" // Replace with actual link
    }
];

// SVG Icons
const icons = {
    star: `<svg class="w-4 h-4 fill-yellow-400 text-yellow-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>`,
    bookOpen: `<svg class="w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>`
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    setupEventListeners();
    startTypewriter();
    startWordMorphing();
    generateFloatingParticles();
    renderNovels();
    setupMouseTracking();

    // Add staggered animation delays to footer links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
    });
});

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    isDark = shouldBeDark;
    document.documentElement.classList.toggle('dark', shouldBeDark);
    updateThemeIcons();
}

function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons();
}

function updateThemeIcons() {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Event listeners
function setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Navigation items
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Mouse tracking for parallax effects
function setupMouseTracking() {
    document.addEventListener('mousemove', (e) => {
        mousePos.x = (e.clientX / window.innerWidth) * 100;
        mousePos.y = (e.clientY / window.innerHeight) * 100;

        // Update background elements
        const bgElement1 = document.getElementById('bg-element-1');
        const bgElement2 = document.getElementById('bg-element-2');

        if (bgElement1) {
            bgElement1.style.left = `${mousePos.x * 0.1}%`;
            bgElement1.style.top = `${mousePos.y * 0.1}%`;
        }

        if (bgElement2) {
            bgElement2.style.right = `${mousePos.x * 0.05}%`;
            bgElement2.style.bottom = `${mousePos.y * 0.05}%`;
        }

        // Update floating particles
        const particles = document.querySelectorAll('.floating-particle');
        particles.forEach(particle => {
            const translateX = e.clientX * 0.02;
            const translateY = e.clientY * 0.01;
            particle.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
}

// Typewriter effect
function startTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    let currentLength = 0;

    typewriterInterval = setInterval(() => {
        if (currentLength < fullText.length) {
            currentLength++;
            typewriterElement.textContent = fullText.slice(0, currentLength);
        } else {
            clearInterval(typewriterInterval);
        }
    }, 100);
}

// Word morphing effect
function startWordMorphing() {
    const morphingElement = document.getElementById('morphing-word');

    wordChangeInterval = setInterval(() => {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        morphingElement.textContent = words[currentWordIndex];
    }, 2000);
}

// Generate floating particles
function generateFloatingParticles() {
    const particlesContainer = document.getElementById('floating-particles');

    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle absolute w-2 h-2 bg-primary/20 rounded-full animate-floating-particle';
        particle.style.left = `${(i * 20) + 10}%`;
        particle.style.animationDelay = `${i * 0.5}s`;
        particlesContainer.appendChild(particle);
    }
}

// Novel card creation
function createNovelCard(novel, index) {
    const offsetClass = index % 3 === 1 ? 'md:mt-8' : (index % 5 === 2 ? 'lg:mt-12' : '');

    return `
        <div class="novel-card relative group perspective-1000 ${offsetClass}" data-index="${index}">
            <!-- Floating background shape -->
            <div class="card-bg absolute inset-0 transform transition-all duration-700 ease-out">
                <div class="w-full h-full bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent rounded-3xl blur-xl scale-75 transition-all duration-700"></div>
            </div>

            <!-- Main card -->
            <div class="card-main relative transform transition-all duration-700 ease-out">
                <!-- Card container -->
                <div class="relative bg-card/90 backdrop-blur-sm border border-border/30 rounded-3xl overflow-hidden shadow-xl transform transition-all duration-500 hover:shadow-2xl">
                    <!-- Image section -->
                    <div class="relative h-80 overflow-hidden">
                        <!-- Image container -->
                        <div class="card-image w-full h-full transition-all duration-700">
                            <img src="${novel.image}" alt="${novel.title}" class="w-full h-full object-cover" />
                        </div>
                        
                        <!-- Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        <!-- Rating badge -->
                        ${novel.rating > 0 ? `
                            <div class="rating-badge absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 transform transition-all duration-500">
                                ${icons.star}
                                <span class="text-white text-sm font-medium">${novel.rating}</span>
                            </div>
                        ` : ''}

                        <!-- Progress indicator -->
                        ${novel.isInProgress ? `
                            <div class="absolute top-4 left-4">
                                <div class="relative">
                                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <div class="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                                </div>
                            </div>
                        ` : ''}

                        <!-- Ink splash effect -->
                        <div class="ink-splash absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent transform transition-all duration-700"></div>
                    </div>

                    <!-- Content section -->
                    <div class="p-6 space-y-4 relative">
                        <!-- Title -->
                        <div class="space-y-3">
                            <h3 class="card-title font-bold text-xl leading-tight line-clamp-2 transform transition-all duration-500">
                                ${novel.title}
                            </h3>
                            
                            <!-- Genre badges -->
                            <div class="flex flex-wrap gap-2">
                                ${novel.genre.split(', ').map((genre, i) => `
                                    <span class="genre-badge inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground transform transition-all duration-500 hover:scale-105" 
                                          style="animation-delay: ${i * 0.1}s">
                                        ${genre}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Description -->
                        <p class="card-description text-sm text-muted-foreground leading-relaxed line-clamp-3 transform transition-all duration-500">
                            ${novel.description}
                        </p>
                        
                        <!-- Bottom action area -->
                        <div class="flex items-center justify-between pt-4">
                            <div class="card-chapters flex items-center gap-2 text-sm text-muted-foreground transform transition-all duration-500">
                                ${icons.bookOpen}
                                <span>${novel.chapters} Chapters</span>
                            </div>
                            
							<!-- Read button with link -->
							<a href="${novel.link}" class="read-btn relative overflow-hidden rounded-full px-4 py-2 bg-primary text-primary-foreground font-medium transform transition-all duration-500 hover:scale-110 hover:shadow-lg">
								<span class="relative z-10">Read Now</span>
								<div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary scale-0 hover:scale-100 transition-transform duration-300 rounded-full"></div>
							</a>

                        </div>
                    </div>

                    <!-- Decorative corners -->
                    <div class="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl"></div>
                    <div class="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/20 rounded-br-3xl"></div>
                </div>
            </div>

            <!-- Hover particles -->
            <div class="hover-particles absolute inset-0 pointer-events-none opacity-0">
                ${Array(3).fill(0).map((_, i) => `
                    <div class="absolute w-1 h-1 bg-primary rounded-full animate-float-up opacity-60" 
                         style="left: ${Math.random() * 100}%; animation-delay: ${i * 0.2}s"></div>
                `).join('')}
            </div>
        </div>
    `;
}

// Render novels
function renderNovels() {
    const novelsGrid = document.getElementById('novels-grid');
    novelsGrid.innerHTML = novels.map((novel, index) => createNovelCard(novel, index)).join('');

    // Add hover effects to novel cards
    document.querySelectorAll('.novel-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const cardBg = card.querySelector('.card-bg > div');
            const cardMain = card.querySelector('.card-main');
            const cardImage = card.querySelector('.card-image');
            const ratingBadge = card.querySelector('.rating-badge');
            const inkSplash = card.querySelector('.ink-splash');
            const cardTitle = card.querySelector('.card-title');
            const cardDescription = card.querySelector('.card-description');
            const cardChapters = card.querySelector('.card-chapters');
            const genreBadges = card.querySelectorAll('.genre-badge');
            const hoverParticles = card.querySelector('.hover-particles');

            // Apply hover effects
            if (cardBg) {
                cardBg.classList.add('scale-110', 'rotate-6');
                cardBg.classList.remove('scale-75');
            }
            if (cardMain) {
                cardMain.classList.add('rotate-y-12', 'scale-105');
            }
            if (cardImage) {
                cardImage.classList.add('scale-110', 'rotate-3');
            }
            if (ratingBadge) {
                ratingBadge.classList.add('scale-110', 'rotate-12');
            }
            if (inkSplash) {
                inkSplash.classList.add('scale-x-110');
            }
            if (cardTitle) {
                cardTitle.classList.add('translate-x-2', 'text-primary');
            }
            if (cardDescription) {
                cardDescription.classList.add('translate-x-1');
            }
            if (cardChapters) {
                cardChapters.classList.add('scale-105');
            }
            if (hoverParticles) {
                hoverParticles.classList.remove('opacity-0');
                hoverParticles.classList.add('opacity-100');
            }

            // Animate genre badges
            genreBadges.forEach((badge, i) => {
                const rotation = i % 2 ? '2deg' : '-2deg';
                badge.style.transform = `translateY(-2px) rotate(${rotation})`;
            });
        });

        card.addEventListener('mouseleave', () => {
            const cardBg = card.querySelector('.card-bg > div');
            const cardMain = card.querySelector('.card-main');
            const cardImage = card.querySelector('.card-image');
            const ratingBadge = card.querySelector('.rating-badge');
            const inkSplash = card.querySelector('.ink-splash');
            const cardTitle = card.querySelector('.card-title');
            const cardDescription = card.querySelector('.card-description');
            const cardChapters = card.querySelector('.card-chapters');
            const genreBadges = card.querySelectorAll('.genre-badge');
            const hoverParticles = card.querySelector('.hover-particles');

            // Remove hover effects
            if (cardBg) {
                cardBg.classList.remove('scale-110', 'rotate-6');
                cardBg.classList.add('scale-75');
            }
            if (cardMain) {
                cardMain.classList.remove('rotate-y-12', 'scale-105');
            }
            if (cardImage) {
                cardImage.classList.remove('scale-110', 'rotate-3');
            }
            if (ratingBadge) {
                ratingBadge.classList.remove('scale-110', 'rotate-12');
            }
            if (inkSplash) {
                inkSplash.classList.remove('scale-x-110');
            }
            if (cardTitle) {
                cardTitle.classList.remove('translate-x-2', 'text-primary');
            }
            if (cardDescription) {
                cardDescription.classList.remove('translate-x-1');
            }
            if (cardChapters) {
                cardChapters.classList.remove('scale-105');
            }
            if (hoverParticles) {
                hoverParticles.classList.add('opacity-0');
                hoverParticles.classList.remove('opacity-100');
            }

            // Reset genre badges
            genreBadges.forEach(badge => {
                badge.style.transform = '';
            });
        });
    });
}

// Cleanup function
window.addEventListener('beforeunload', () => {
    if (typewriterInterval) clearInterval(typewriterInterval);
    if (wordChangeInterval) clearInterval(wordChangeInterval);
});
