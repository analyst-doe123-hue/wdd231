// Display submitted form data on thankyou page using URL parameters
document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Set last modified date
    document.getElementById('lastModified').textContent = document.lastModified;

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Display form data from URL parameters
    function getParameterValue(paramName) {
        const value = urlParams.get(paramName);
        return value ? decodeURIComponent(value) : 'Not provided';
    }

    // Set values from URL parameters
    document.getElementById('summary-firstName').textContent = getParameterValue('firstName');
    document.getElementById('summary-lastName').textContent = getParameterValue('lastName');
    document.getElementById('summary-email').textContent = getParameterValue('email');
    document.getElementById('summary-mobilePhone').textContent = getParameterValue('mobilePhone');
    document.getElementById('summary-orgName').textContent = getParameterValue('orgName');

    // Format and display timestamp
    const timestamp = getParameterValue('timestamp');
    if (timestamp && timestamp !== 'Not provided') {
        try {
            const date = new Date(timestamp);
            document.getElementById('summary-timestamp').textContent = date.toLocaleString();
        } catch (e) {
            document.getElementById('summary-timestamp').textContent = timestamp;
        }
    } else {
        document.getElementById('summary-timestamp').textContent = 'Not provided';
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});