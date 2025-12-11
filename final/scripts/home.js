// scripts/home.js - Home page with modal popup functionality

// Import functions from main.js
import { updateActiveNavLink } from './main.js';

// DOM Elements
const featuredParksContainer = document.getElementById('featured-parks-container');
const totalParksSpan = document.getElementById('total-parks');
const totalRegionsSpan = document.getElementById('total-regions');
const upcomingEventsSpan = document.getElementById('upcoming-events');
const searchInput = document.getElementById('search-input');
const regionFilter = document.getElementById('region-filter');

// Modal Elements
const modal = document.getElementById('park-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalCloseButtons = document.querySelectorAll('.modal-close');

// Global variables
let allParks = [];

// Initialize home page
document.addEventListener('DOMContentLoaded', function () {
    console.log('Kenya Parks Explorer - Home Page Loaded');

    // Update active nav link
    updateActiveNavLink();

    // Load parks data
    loadParksData();

    // Set up search and filter
    setupSearchFilter();

    // Initialize modal
    initModal();
});

// Load parks data from JSON file
async function loadParksData() {
    try {
        console.log('Fetching parks data...');
        const response = await fetch('data/parks.json');

        if (!response.ok) {
            throw new Error(`Failed to load parks data: ${response.status}`);
        }

        allParks = await response.json();
        console.log(`Loaded ${allParks.length} Kenya national parks`);

        // Update statistics
        updateStatistics(allParks);

        // Populate region filter
        populateRegionFilter(allParks);

        // Display featured parks
        displayFeaturedParks(allParks.slice(0, 6));

    } catch (error) {
        console.error('Error loading parks data:', error);
        showErrorMessage('Unable to load Kenya parks data. Please check your connection and try again.');
    }
}

// Update dashboard statistics
function updateStatistics(parks) {
    if (totalParksSpan) {
        totalParksSpan.textContent = parks.length;
    }

    if (totalRegionsSpan) {
        const regions = [...new Set(parks.map(park => park.region))];
        totalRegionsSpan.textContent = regions.length;
    }

    if (upcomingEventsSpan) {
        // Calculate upcoming events based on current month
        const month = new Date().getMonth();
        let eventCount = 0;

        if (month >= 6 && month <= 9) {
            eventCount = 15; // High season (June-September)
        } else if (month >= 1 && month <= 2) {
            eventCount = 10; // Dry season (Jan-Feb)
        } else {
            eventCount = 5;  // Low season
        }

        upcomingEventsSpan.textContent = eventCount;
    }
}

// Populate region filter dropdown
function populateRegionFilter(parks) {
    if (!regionFilter) return;

    // Get unique regions and sort them
    const regions = [...new Set(parks.map(park => park.region))].sort();

    // Add regions to filter
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });
}

// Display featured parks
function displayFeaturedParks(parks) {
    if (!featuredParksContainer) return;

    if (parks.length === 0) {
        featuredParksContainer.innerHTML = `
            <div class="no-results">
                <p>No parks found matching your search criteria.</p>
                <button onclick="resetFilters()" class="btn btn-primary">Show All Parks</button>
            </div>
        `;
        return;
    }

    const parksHTML = parks.map(park => `
        <article class="park-card" data-park-id="${park.id}">
            <div class="park-image-container">
                <div class="park-badge">${park.type}</div>
                <img src="${park.image || 'images/default-park.jpg'}" 
                     alt="${park.name} - Kenya National Park" 
                     class="park-image" 
                     loading="lazy">
            </div>
            <div class="park-content">
                <h3 class="park-title">${park.name}</h3>
                <p class="park-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                    ${park.region}
                </p>
                <p class="park-description">${truncateText(park.description, 100)}...</p>
                <div class="park-details">
                    <span class="park-size">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                        </svg>
                        ${park.size}
                    </span>
                    <span>Est: ${park.established}</span>
                </div>
                <button class="btn btn-secondary learn-more-btn" data-park-id="${park.id}">
                    Learn More
                </button>
                ${park.kws_link ? `<a href="${park.kws_link}" target="_blank" rel="noopener" class="btn btn-primary">KWS Site</a>` : ''}
            </div>
        </article>
    `).join('');

    featuredParksContainer.innerHTML = parksHTML;

    // Add event listeners to "Learn More" buttons
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const parkId = parseInt(this.getAttribute('data-park-id'));
            showParkModal(parkId);
        });
    });
}

// Show park details in modal
function showParkModal(parkId) {
    const park = allParks.find(p => p.id === parkId);
    if (!park) return;

    // Update modal title
    if (modalTitle) {
        modalTitle.textContent = park.name;
    }

    // Update modal body content
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="modal-park-info">
                <img src="${park.image || 'images/default-park.jpg'}" 
                     alt="${park.name}" 
                     class="modal-park-image" 
                     loading="lazy">
                <div class="modal-park-details">
                    <p><strong>Location:</strong> ${park.region}</p>
                    <p><strong>Type:</strong> ${park.type}</p>
                    <p><strong>Established:</strong> ${park.established}</p>
                    <p><strong>Size:</strong> ${park.size}</p>
                    <p><strong>Entry Fee:</strong> ${park.entry_fee || 'Contact KWS for rates'}</p>
                    <p><strong>Best Time to Visit:</strong> ${park.best_time || 'Year-round'}</p>
                </div>
            </div>
            <div class="modal-park-description">
                <h3>Description</h3>
                <p>${park.description}</p>
            </div>
            <div class="modal-park-features">
                <h3>Key Animals</h3>
                <ul>
                    ${park.animals ? park.animals.map(animal => `<li>${animal}</li>`).join('') : '<li>Various wildlife species</li>'}
                </ul>
            </div>
            <div class="modal-park-activities">
                <h3>Popular Activities</h3>
                <div class="activity-tags">
                    ${park.activities ? park.activities.map(activity =>
            `<span class="activity-tag">${activity}</span>`
        ).join('') : '<span class="activity-tag">Game Drives</span>'}
                </div>
            </div>
        `;
    }

    // Show modal
    if (modal) {
        modal.removeAttribute('hidden');
        modal.setAttribute('aria-hidden', 'false');
    }

    if (modalOverlay) {
        modalOverlay.classList.add('active');
    }

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Focus on modal for accessibility
    modal.focus();
}

// Initialize modal functionality
function initModal() {
    if (!modal || !modalOverlay) return;

    // Close modal when clicking close buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !modal.hasAttribute('hidden')) {
            closeModal();
        }
    });

    // Close modal when clicking outside modal content
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    if (modal) {
        modal.setAttribute('hidden', 'true');
        modal.setAttribute('aria-hidden', 'true');
    }

    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }

    // Restore body scrolling
    document.body.style.overflow = '';
}

// Set up search and filter functionality
function setupSearchFilter() {
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterParks, 300));
    }

    if (regionFilter) {
        regionFilter.addEventListener('change', filterParks);
    }
}

// Filter parks based on search and region
function filterParks() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedRegion = regionFilter ? regionFilter.value : '';

    const filteredParks = allParks.filter(park => {
        const matchesSearch = !searchTerm ||
            park.name.toLowerCase().includes(searchTerm) ||
            park.description.toLowerCase().includes(searchTerm) ||
            park.region.toLowerCase().includes(searchTerm) ||
            (park.animals && park.animals.some(animal => animal.toLowerCase().includes(searchTerm)));

        const matchesRegion = !selectedRegion || park.region === selectedRegion;

        return matchesSearch && matchesRegion;
    });

    displayFeaturedParks(filteredParks.slice(0, 6));
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Truncate text with ellipsis
function truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Show error message
function showErrorMessage(message) {
    if (featuredParksContainer) {
        featuredParksContainer.innerHTML = `
            <div class="error-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#d32f2f">
                    <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
                <h3>Unable to Load Data</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                    </svg>
                    Retry
                </button>
            </div>
        `;
    }

    console.error(message);
}

// Reset all filters
function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (regionFilter) regionFilter.value = '';

    displayFeaturedParks(allParks.slice(0, 6));
}

// Make functions available globally for HTML onclick
window.resetFilters = resetFilters;