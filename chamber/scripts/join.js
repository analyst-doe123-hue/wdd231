// Set current year and last modified date
document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Set last modified date
    document.getElementById('lastModified').textContent = document.lastModified;

    // Set timestamp for form
    document.getElementById('timestamp').value = new Date().toString();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Modal functionality
    const modalButtons = document.querySelectorAll('.info-button');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Open modal when info button is clicked
    modalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const level = this.getAttribute('data-level');
            const modal = document.getElementById(`${level}Modal`);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // Close modal when X is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Form validation for organizational title
    const orgTitleInput = document.getElementById('orgTitle');
    if (orgTitleInput) {
        orgTitleInput.addEventListener('input', function () {
            const pattern = /^[a-zA-Z\-\s]{7,}$/;
            if (this.value && !pattern.test(this.value)) {
                this.setCustomValidity('Title must contain only letters, hyphens, and spaces (minimum 7 characters)');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});