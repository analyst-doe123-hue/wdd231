// DOM Elements
const currentYear = document.getElementById('currentYear');
const lastModified = document.getElementById('lastModified');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const spotlightContainer = document.getElementById('spotlight-container');

// Current year and last modified date
currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fetch and display spotlight members
async function getSpotlightMembers() {
    try {
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displaySpotlightMembers(data.members);

    } catch (error) {
        console.error('Error fetching member data:', error);
        // Use fallback data if fetch fails
        const fallbackData = getFallbackData();
        displaySpotlightMembers(fallbackData.members);
    }
}

function getFallbackData() {
    return {
        members: [
            {
                name: "Tech Solutions Inc.",
                address: "123 Tech Drive, Butere District",
                phone: "0713 935 610",
                website: "https://techsolutions.example.com",
                image: "tech-solutions.png",
                membershipLevel: 3,
                industry: "Technology",
                description: "Leading provider of innovative software solutions"
            },
            {
                name: "Green Thumb Landscaping",
                address: "456 Garden Lane, Wetende",
                phone: "0722305830",
                website: "https://greenthumb.example.com",
                image: "green-thumb.png",
                membershipLevel: 2,
                industry: "Landscaping",
                description: "Professional landscaping and garden maintenance"
            },
            {
                name: "Summit Construction",
                address: "654 Builder's Avenue, Westside",
                phone: "0723456789",
                website: "https://summitconstruction.example.com",
                image: "summit-construction.png",
                membershipLevel: 3,
                industry: "Construction",
                description: "Quality construction and remodeling services"
            },
            {
                name: "Precision Auto Repair",
                address: "321 Auto Way, Industrial Park",
                phone: "0712345678",
                website: "https://precisionauto.example.com",
                image: "precision-auto.png",
                membershipLevel: 2,
                industry: "Automotive",
                description: "Expert automotive repair and maintenance services"
            }
        ]
    };
}

function displaySpotlightMembers(members) {
    // Filter for gold and silver members only
    const qualifiedMembers = members.filter(member =>
        member.membershipLevel === 2 || member.membershipLevel === 3
    );

    // Randomly select 2-3 members
    const selectedMembers = getRandomMembers(qualifiedMembers, 2, 3);

    spotlightContainer.innerHTML = '';

    selectedMembers.forEach(member => {
        const card = createSpotlightCard(member);
        spotlightContainer.appendChild(card);
    });

    console.log(`Displayed ${selectedMembers.length} spotlight members`);
}

function getRandomMembers(members, min = 2, max = 3) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createSpotlightCard(member) {
    const card = document.createElement('div');
    card.className = 'spotlight-card';

    const membershipText = getMembershipText(member.membershipLevel);

    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} Logo" class="spotlight-logo" loading="lazy">
        <h3>${member.name}</h3>
        <div class="spotlight-info">
            <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
            <p><i class="fas fa-phone"></i> ${member.phone}</p>
            <p><i class="fas fa-industry"></i> ${member.industry}</p>
            <p><i class="fas fa-info-circle"></i> ${member.description}</p>
        </div>
        <span class="spotlight-level">${membershipText}</span>
        <a href="${member.website}" target="_blank" rel="noopener" class="website-link">
            <i class="fas fa-external-link-alt"></i> Visit Website
        </a>
    `;

    return card;
}

function getMembershipText(level) {
    switch (level) {
        case 2: return 'Silver Member';
        case 3: return 'Gold Member';
        default: return 'Member';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    getSpotlightMembers();
});