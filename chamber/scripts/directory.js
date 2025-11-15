// DOM Elements
const membersGrid = document.getElementById('membersGrid');
const membersList = document.getElementById('membersList');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const currentYear = document.getElementById('currentYear');
const lastModified = document.getElementById('lastModified');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Current year and last modified date
currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// View toggle functionality
gridViewBtn.addEventListener('click', () => {
    membersGrid.classList.remove('hidden');
    membersList.classList.add('hidden');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
    membersGrid.classList.add('hidden');
    membersList.classList.remove('hidden');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
});

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayMembers(data.members);

    } catch (error) {
        console.error('Error fetching member data:', error);
        // Use fallback data if fetch fails
        const fallbackData = getFallbackData();
        displayMembers(fallbackData.members);
    }
}

// Fallback demo data in case JSON file is missing
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
                name: "Main Street Cafe",
                address: "789 Main Street, Bulxura",
                phone: "0714199922",
                website: "https://mainstreetcafe.example.com",
                image: "main-street-cafe.png",
                membershipLevel: 1,
                industry: "Restaurant",
                description: "Cozy cafe serving fresh coffee and homemade pastries"
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
                name: "Family Dental Care",
                address: "987 Smile Boulevard, Medical Center",
                phone: "0734567890",
                website: "https://familydental.example.com",
                image: "family-dental.png",
                membershipLevel: 1,
                industry: "Healthcare",
                description: "Comprehensive dental care for the whole family"
            },
            {
                name: "Creative Web Designs",
                address: "147 Digital Lane, Tech Hub",
                phone: "0745678901",
                website: "https://creativeweb.example.com",
                image: "creative-web.png",
                membershipLevel: 2,
                industry: "Web Development",
                description: "Custom website design and development services"
            }
        ]
    };
}

function displayMembers(members) {
    // Clear existing content
    membersGrid.innerHTML = '';
    membersList.innerHTML = '';

    // Show loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-state';
    loadingDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #2196f3; margin-bottom: 1rem;"></i>
            <p>Loading business directory...</p>
        </div>
    `;
    membersGrid.appendChild(loadingDiv);

    // Simulate loading for better UX
    setTimeout(() => {
        membersGrid.innerHTML = '';

        members.forEach(member => {
            // Create grid view card
            const card = createMemberCard(member);
            membersGrid.appendChild(card);

            // Create list view item
            const listItem = createMemberListItem(member);
            membersList.appendChild(listItem);
        });

        console.log(`Successfully displayed ${members.length} businesses`);

    }, 500);
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';

    const membershipClass = getMembershipClass(member.membershipLevel);
    const membershipText = getMembershipText(member.membershipLevel);

    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} Logo" class="member-logo" loading="lazy">
        <h3>${member.name}</h3>
        <div class="member-info">
            <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
            <p><i class="fas fa-phone"></i> ${member.phone}</p>
            <p><i class="fas fa-industry"></i> ${member.industry}</p>
            <p><i class="fas fa-info-circle"></i> ${member.description}</p>
        </div>
        <span class="membership-level ${membershipClass}">${membershipText}</span>
        <a href="${member.website}" target="_blank" rel="noopener" class="website-link">
            <i class="fas fa-external-link-alt"></i> Visit Website
        </a>
    `;

    return card;
}

function createMemberListItem(member) {
    const listItem = document.createElement('div');
    listItem.className = 'member-list-item';

    const membershipClass = getMembershipClass(member.membershipLevel);
    const membershipText = getMembershipText(member.membershipLevel);

    listItem.innerHTML = `
        <div class="list-info">
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <div>
                <h3>${member.name}</h3>
                <span class="membership-level ${membershipClass}">${membershipText}</span>
            </div>
        </div>
        <div class="list-details">
            <p><i class="fas fa-phone"></i> ${member.phone}</p>
            <p><i class="fas fa-industry"></i> ${member.industry}</p>
            <a href="${member.website}" target="_blank" rel="noopener" class="website-link">
                <i class="fas fa-external-link-alt"></i> Visit Site
            </a>
        </div>
    `;

    return listItem;
}

function getMembershipClass(level) {
    switch (level) {
        case 1: return 'member';
        case 2: return 'silver';
        case 3: return 'gold';
        default: return 'member';
    }
}

function getMembershipText(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver Member';
        case 3: return 'Gold Member';
        default: return 'Member';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    getMembers();
});