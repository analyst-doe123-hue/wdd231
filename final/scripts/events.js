// Events page JavaScript
import { generateEvents, getMonthName, debounce } from './utils.js';

// DOM Elements
const eventsContainer = document.getElementById('events-container');
const loadingSpinner = document.getElementById('loading-spinner');
const eventTypeFilter = document.getElementById('event-type-filter');
const monthFilter = document.getElementById('month-filter');
const resetFilters = document.getElementById('reset-filters');
const eventsCountSpan = document.getElementById('events-count');
const totalEventsSpan = document.getElementById('total-events');

// Global variables
let allEvents = [];
let filteredEvents = [];

// Initialize events page
document.addEventListener('DOMContentLoaded', function () {
    // Generate events data
    allEvents = generateEvents();
    filteredEvents = [...allEvents];

    // Hide loading spinner
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }

    // Populate month filter
    populateMonthFilter();

    // Display events
    displayEvents();

    // Update statistics
    updateStatistics();

    // Set up event listeners
    setupEventListeners();
});

// Populate month filter dropdown
function populateMonthFilter() {
    if (!monthFilter) return;

    const months = new Set();
    allEvents.forEach(event => {
        const month = new Date(event.date).getMonth() + 1;
        months.add(month);
    });

    const sortedMonths = [...months].sort((a, b) => a - b);

    sortedMonths.forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = getMonthName(month);
        monthFilter.appendChild(option);
    });
}

// Display events
function displayEvents() {
    if (!eventsContainer) return;

    eventsContainer.innerHTML = filteredEvents.map(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <article class="event-card">
                <div class="event-header">
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-date">${formattedDate}</div>
                </div>
                <div class="event-details">
                    <p><strong>Park:</strong> ${event.park}</p>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Type:</strong> ${event.type}</p>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-footer">
                    <p><strong>Capacity:</strong> ${event.capacity} people</p>
                    <p><strong>Registration:</strong> ${event.registrationRequired ? 'Required' : 'Not required'}</p>
                </div>
            </article>
        `;
    }).join('');
}

// Update statistics
function updateStatistics() {
    if (eventsCountSpan) {
        eventsCountSpan.textContent = filteredEvents.length;
    }

    if (totalEventsSpan) {
        totalEventsSpan.textContent = allEvents.length;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Event type filter
    if (eventTypeFilter) {
        eventTypeFilter.addEventListener('change', filterEvents);
    }

    // Month filter
    if (monthFilter) {
        monthFilter.addEventListener('change', filterEvents);
    }

    // Reset filters
    if (resetFilters) {
        resetFilters.addEventListener('click', () => {
            if (eventTypeFilter) eventTypeFilter.value = '';
            if (monthFilter) monthFilter.value = '';
            filteredEvents = [...allEvents];
            displayEvents();
            updateStatistics();
        });
    }
}

// Filter events based on selected criteria
function filterEvents() {
    const selectedType = eventTypeFilter ? eventTypeFilter.value : '';
    const selectedMonth = monthFilter ? parseInt(monthFilter.value) : null;

    filteredEvents = allEvents.filter(event => {
        const matchesType = !selectedType || event.type === selectedType;
        const eventMonth = new Date(event.date).getMonth() + 1;
        const matchesMonth = !selectedMonth || eventMonth === selectedMonth;

        return matchesType && matchesMonth;
    });

    displayEvents();
    updateStatistics();
}