import { attractions } from '../data/discover-data.mjs';

// Set current year and last modified date
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Handle navigation menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Set active class on current page in navigation
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Handle localStorage for visit tracking
function handleVisitMessage() {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();

    if (!lastVisit) {
        // First visit
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysDifference === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
        }
    }

    // Store current visit date
    localStorage.setItem('lastVisit', currentDate.toString());
}

// Generate attraction cards
function generateAttractionCards() {
    const gridContainer = document.getElementById('attractions-grid');

    attractions.forEach(attraction => {
        const card = document.createElement('article');
        card.className = 'attraction-card';

        card.innerHTML = `
            <div class="card-image">
                <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${attraction.name}</h3>
                <address class="card-address">
                    <i class="fas fa-map-marker-alt"></i>
                    ${attraction.address}
                </address>
                <p class="card-description">${attraction.description}</p>
                <button class="learn-more-btn">
                    Learn More <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        gridContainer.appendChild(card);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    handleVisitMessage();
    generateAttractionCards();
});