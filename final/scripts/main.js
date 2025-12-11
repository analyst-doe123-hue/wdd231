// // Main JavaScript file - handles common functionality
// import { toggleTheme, loadTheme } from './utils.js';

// // DOM Elements
// const menuToggle = document.querySelector('.menu-toggle');
// const nav = document.querySelector('.nav');
// const currentYearSpan = document.getElementById('current-year');
// const themeToggle = document.getElementById('theme-toggle');

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', function () {
//     // Set current year in footer
//     if (currentYearSpan) {
//         currentYearSpan.textContent = new Date().getFullYear();
//     }

//     // Initialize theme
//     loadTheme();

//     // Set up theme toggle
//     if (themeToggle) {
//         themeToggle.addEventListener('change', function () {
//             toggleTheme(this.checked);
//         });
//     }

//     // Set up mobile menu toggle
//     if (menuToggle && nav) {
//         menuToggle.addEventListener('click', function () {
//             const isExpanded = this.getAttribute('aria-expanded') === 'true';
//             this.setAttribute('aria-expanded', !isExpanded);
//             nav.classList.toggle('active');

//             // Prevent body scrolling when menu is open
//             document.body.style.overflow = isExpanded ? '' : 'hidden';
//         });

//         // Close menu when clicking on a link
//         const navLinks = document.querySelectorAll('.nav-link');
//         navLinks.forEach(link => {
//             link.addEventListener('click', () => {
//                 menuToggle.setAttribute('aria-expanded', 'false');
//                 nav.classList.remove('active');
//                 document.body.style.overflow = '';
//             });
//         });

//         // Close menu when clicking outside
//         document.addEventListener('click', function (event) {
//             if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
//                 menuToggle.setAttribute('aria-expanded', 'false');
//                 nav.classList.remove('active');
//                 document.body.style.overflow = '';
//             }
//         });
//     }

//     // Handle skip link focus
//     const skipLink = document.querySelector('.skip-link');
//     if (skipLink) {
//         skipLink.addEventListener('click', function (e) {
//             e.preventDefault();
//             const targetId = this.getAttribute('href');
//             const targetElement = document.querySelector(targetId);
//             if (targetElement) {
//                 targetElement.setAttribute('tabindex', '-1');
//                 targetElement.focus();
//                 targetElement.removeAttribute('tabindex');
//             }
//         });
//     }

//     // Update active nav link
//     updateActiveNavLink();
// });

// // Update active navigation link based on current page
// function updateActiveNavLink() {
//     const currentPage = window.location.pathname.split('/').pop() || 'index.html';
//     const navLinks = document.querySelectorAll('.nav-link');

//     navLinks.forEach(link => {
//         const linkPage = link.getAttribute('href');
//         if (currentPage === linkPage ||
//             (currentPage === '' && linkPage === 'index.html') ||
//             (linkPage.includes(currentPage.replace('.html', '')) && currentPage !== 'index.html')) {
//             link.classList.add('active');
//             link.setAttribute('aria-current', 'page');
//         } else {
//             link.classList.remove('active');
//             link.removeAttribute('aria-current');
//         }
//     });
// }

// // Export functions for use in other modules
// export { updateActiveNavLink };

// Main JavaScript file - handles common functionality

// Import utility functions
import { toggleTheme, loadTheme } from './utils.js';
// scripts/main.js - Updated with imports



// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const currentYearSpan = document.getElementById('current-year');
const themeToggle = document.getElementById('theme-toggle');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Initialize theme
    loadTheme();

    // Set up theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', function () {
            toggleTheme(this.checked);
        });
    }

    // Set up mobile menu toggle
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');

            // Prevent body scrolling when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

// Update active navigation link based on current page
export function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (linkPage.includes(currentPage.replace('.html', '')) && currentPage !== 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}