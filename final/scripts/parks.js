// Parks page JavaScript
import { debounce, formatNumber, capitalizeWords } from './utils.js';

// DOM Elements
const parksContainer = document.getElementById('parks-container');
const loadingSpinner = document.getElementById('loading-spinner');
const parkSearch = document.getElementById('park-search');
const parkTypeFilter = document.getElementById('park-type-filter');
const clearFilters = document.getElementById('clear-filters');
const sortSelect = document.getElementById('sort-select');
const pagination = document.getElementById('pagination');
const modal = document.getElementById('park-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const modalBody = document.getElementById('modal-body');
const modalTitle = document.getElementById('modal-title');
const addToFavoritesBtn = document.getElementById('add-to-favorites');

// Global variables
let allParks = [];
let currentParks = [];
let currentPage = 1;
const parksPerPage = 9;
let currentParkId = null;

// Fetch parks data from JSON file
export async function fetchParksData() {
    try {
        const response = await fetch('data/parks.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching parks data:', error);
        throw error;
    }
}

// Initialize parks page
document.addEventListener('DOMContentLoaded', async function () {
    try {
        allParks = await fetchParksData();
        currentParks = [...allParks];

        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }

        // Display parks
        displayParks();

        // Set up event listeners
        setupEventListeners();

        // Initialize pagination
        updatePagination();

    } catch (error) {
        console.error('Error initializing parks page:', error);
        if (parksContainer) {
            parksContainer.innerHTML = `
                <div class="error-message">
                    <h3>Unable to Load Parks Data</h3>
                    <p>Please check your internet connection and try again.</p>
                    <button onclick="location.reload()" class="btn btn-primary">Retry</button>
                </div>
            `;
        }
    }
});

// Display parks with pagination
function displayParks() {
    if (!parksContainer) return;

    const startIndex = (currentPage - 1) * parksPerPage;
    const endIndex = startIndex + parksPerPage;
    const parksToDisplay = currentParks.slice(startIndex, endIndex);

    parksContainer.innerHTML = parksToDisplay.map(park => `
        <article class="park-card" data-park-id="${park.id}">
            <img src="${park.image}" alt="${park.name}" class="park-image" loading="lazy" width="300" height="200">
            <div class="park-content">
                <h3 class="park-title">${park.name}</h3>
                <p class="park-location">${park.state} • ${park.type}</p>
                <p class="park-description">${park.description.substring(0, 120)}...</p>
                <div class="park-details">
                    <span>Est: ${park.established}</span>
                    <span>${park.area}</span>
                    <span>${formatNumber(park.visitors)} visitors</span>
                </div>
                <button class="btn btn-primary view-details-btn" data-park-id="${park.id}">
                    View Details
                </button>
            </div>
        </article>
    `).join('');

    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', function () {
            const parkId = parseInt(this.getAttribute('data-park-id'));
            showParkDetails(parkId);
        });
    });
}

// Show park details in modal
function showParkDetails(parkId) {
    const park = allParks.find(p => p.id === parkId);
    if (!park) return;

    currentParkId = parkId;

    // Update modal content
    if (modalTitle) modalTitle.textContent = park.name;

    if (modalBody) {
        modalBody.innerHTML = `
            <div class="modal-park-info">
                <img src="${park.image}" alt="${park.name}" class="modal-park-image" loading="lazy">
                <div class="modal-park-details">
                    <p><strong>Location:</strong> ${park.state}</p>
                    <p><strong>Type:</strong> ${park.type}</p>
                    <p><strong>Established:</strong> ${park.established}</p>
                    <p><strong>Area:</strong> ${park.area}</p>
                    <p><strong>Annual Visitors:</strong> ${formatNumber(park.visitors)}</p>
                </div>
            </div>
            <div class="modal-park-description">
                <h3>Description</h3>
                <p>${park.description}</p>
            </div>
            <div class="modal-park-features">
                <h3>Key Features</h3>
                <ul>
                    ${park.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-park-activities">
                <h3>Popular Activities</h3>
                <div class="activity-tags">
                    ${park.activities.map(activity => `
                        <span class="activity-tag">${activity}</span>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Update favorite button
    if (addToFavoritesBtn) {
        const favorites = JSON.parse(localStorage.getItem('favoriteParks') || '[]');
        const isFavorite = favorites.includes(parkId);
        addToFavoritesBtn.textContent = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
        addToFavoritesBtn.classList.toggle('btn-primary', !isFavorite);
        addToFavoritesBtn.classList.toggle('btn-secondary', isFavorite);
    }

    // Show modal
    modal.removeAttribute('hidden');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus on modal
    modal.focus();
}

// Set up event listeners
function setupEventListeners() {
    // Search input with debounce
    if (parkSearch) {
        parkSearch.addEventListener('input', debounce(filterParks, 300));
    }

    // Filter by park type
    if (parkTypeFilter) {
        parkTypeFilter.addEventListener('change', filterParks);
    }

    // Clear filters
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            if (parkSearch) parkSearch.value = '';
            if (parkTypeFilter) parkTypeFilter.value = '';
            currentParks = [...allParks];
            currentPage = 1;
            displayParks();
            updatePagination();
        });
    }

    // Sort parks
    if (sortSelect) {
        sortSelect.addEventListener('change', sortParks);
    }

    // Modal close buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !modal.hasAttribute('hidden')) {
            closeModal();
        }
    });

    // Add to favorites
    if (addToFavoritesBtn) {
        addToFavoritesBtn.addEventListener('click', toggleFavorite);
    }
}

// Filter parks based on search and type
function filterParks() {
    const searchTerm = parkSearch ? parkSearch.value.toLowerCase() : '';
    const selectedType = parkTypeFilter ? parkTypeFilter.value : '';

    currentParks = allParks.filter(park => {
        const matchesSearch = park.name.toLowerCase().includes(searchTerm) ||
            park.description.toLowerCase().includes(searchTerm) ||
            park.state.toLowerCase().includes(searchTerm);
        const matchesType = !selectedType || park.type === selectedType;

        return matchesSearch && matchesType;
    });

    currentPage = 1;
    displayParks();
    updatePagination();
}

// Sort parks based on selected option
function sortParks() {
    const sortValue = sortSelect.value;

    currentParks.sort((a, b) => {
        switch (sortValue) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'state-asc':
                return a.state.localeCompare(b.state);
            case 'visitors-desc':
                return parseInt(b.visitors.replace(/,/g, '')) - parseInt(a.visitors.replace(/,/g, ''));
            default:
                return 0;
        }
    });

    currentPage = 1;
    displayParks();
    updatePagination();
}

// Update pagination controls
function updatePagination() {
    if (!pagination) return;

    const totalPages = Math.ceil(currentParks.length / parksPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <button class="page-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''}>
            Previous
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
    }

    // Next button
    paginationHTML += `
        <button class="page-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''}>
            Next
        </button>
    `;

    pagination.innerHTML = paginationHTML;

    // Add event listeners to pagination buttons
    document.querySelectorAll('.page-btn:not(.prev-btn):not(.next-btn)').forEach(button => {
        button.addEventListener('click', function () {
            currentPage = parseInt(this.getAttribute('data-page'));
            displayParks();
            updatePagination();
        });
    });

    // Previous button
    const prevBtn = pagination.querySelector('.prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayParks();
                updatePagination();
            }
        });
    }

    // Next button
    const nextBtn = pagination.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayParks();
                updatePagination();
            }
        });
    }
}

// Close modal
function closeModal() {
    modal.setAttribute('hidden', 'true');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle favorite status
function toggleFavorite() {
    if (!currentParkId) return;

    let favorites = JSON.parse(localStorage.getItem('favoriteParks') || '[]');
    const index = favorites.indexOf(currentParkId);

    if (index === -1) {
        // Add to favorites
        favorites.push(currentParkId);
        addToFavoritesBtn.textContent = 'Remove from Favorites';
        addToFavoritesBtn.classList.remove('btn-primary');
        addToFavoritesBtn.classList.add('btn-secondary');
    } else {
        // Remove from favorites
        favorites.splice(index, 1);
        addToFavoritesBtn.textContent = 'Add to Favorites';
        addToFavoritesBtn.classList.remove('btn-secondary');
        addToFavoritesBtn.classList.add('btn-primary');
    }

    localStorage.setItem('favoriteParks', JSON.stringify(favorites));
}

// Export fetch function for use in other modules
export { fetchParksData };