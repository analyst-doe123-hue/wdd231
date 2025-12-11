// Utility functions for the National Parks Explorer website

// Theme management
export function toggleTheme(isDark) {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update toggle state
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.checked = isDark;
    }
}

export function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.checked = theme === 'dark';
    }
}

// Format numbers with commas
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Capitalize first letter of each word
export function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Debounce function for search inputs
export function debounce(func, wait) {
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

// Get month name from number
export function getMonthName(monthNumber) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1] || '';
}

// Create event data (since we don't have a real events API)
export function generateEvents() {
    const events = [];
    const eventTypes = ['Ranger Program', 'Workshop', 'Guided Hike', 'Visitor Center', 'Special Event'];
    const parks = [
        'Amboseli National Park', 'Yosemite National Park', 'Grand Canyon National Park',
        'Zion National Park', 'Great Smoky Mountains', 'Rocky Mountain National Park'
    ];

    const today = new Date();

    for (let i = 0; i < 25; i++) {
        const parkIndex = i % parks.length;
        const eventTypeIndex = i % eventTypes.length;

        // Create dates in the next 6 months
        const eventDate = new Date(today);
        eventDate.setDate(today.getDate() + Math.floor(Math.random() * 180));

        events.push({
            id: i + 1,
            title: `${eventTypes[eventTypeIndex]}: ${parks[parkIndex].split(' ')[0]} Edition`,
            park: parks[parkIndex],
            type: eventTypes[eventTypeIndex],
            date: eventDate.toISOString().split('T')[0],
            time: `${Math.floor(Math.random() * 12) + 1}:${Math.random() > 0.5 ? '30' : '00'} ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
            location: `${parks[parkIndex]} Visitor Center`,
            description: `Join us for a special ${eventTypes[eventTypeIndex].toLowerCase()} at ${parks[parkIndex]}. Learn about the park's unique features and history.`,
            capacity: Math.floor(Math.random() * 50) + 10,
            registrationRequired: Math.random() > 0.5
        });
    }

    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// new code in final/scripts/utils.js
// scripts/utils.js - Utility functions

// Theme management
export function toggleTheme(isDark) {
    const theme = isDark ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

export function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme === 'dark' || (savedTheme === 'system' && prefersDark) ? 'dark' : 'light';

    document.body.setAttribute('data-theme', theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.checked = theme === 'dark';
    }
}

// Format numbers
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Capitalize words
export function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Get month name
export function getMonthName(monthNumber) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1] || '';
}

// Truncate text
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}