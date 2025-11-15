// Enhanced DOM Elements with error handling
const elements = {
    membersGrid: document.getElementById('membersGrid'),
    membersList: document.getElementById('membersList'),
    gridViewBtn: document.getElementById('gridView'),
    listViewBtn: document.getElementById('listView'),
    currentYear: document.getElementById('currentYear'),
    lastModified: document.getElementById('lastModified'),
    menuToggle: document.querySelector('.menu-toggle'),
    navMenu: document.querySelector('.nav-menu')
};

// Validate all required elements exist
const validateElements = () => {
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`Required element not found: ${key}`);
            return false;
        }
    }
    return true;
};

// Initialize the application
const initApp = () => {
    if (!validateElements()) {
        console.error('Application initialization failed: Missing required elements');
        return;
    }

    // Set current year and last modified date
    elements.currentYear.textContent = new Date().getFullYear();
    elements.lastModified.textContent = formatLastModifiedDate(document.lastModified);

    // Initialize event listeners
    initEventListeners();

    // Load member data
    getMembers();
};

// Format last modified date
const formatLastModifiedDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
};

// Enhanced event listeners
const initEventListeners = () => {
    // Mobile menu toggle with enhanced accessibility
    elements.menuToggle.addEventListener('click', toggleMobileMenu);
    elements.menuToggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // View toggle functionality
    elements.gridViewBtn.addEventListener('click', () => switchView('grid'));
    elements.listViewBtn.addEventListener('click', () => switchView('list'));

    // Keyboard navigation for view toggle
    elements.gridViewBtn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchView('grid');
        }
    });

    elements.listViewBtn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchView('list');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!elements.menuToggle.contains(e.target) && !elements.navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
};

// Enhanced mobile menu functionality
const toggleMobileMenu = () => {
    const isExpanded = elements.menuToggle.getAttribute('aria-expanded') === 'true';
    elements.menuToggle.setAttribute('aria-expanded', !isExpanded);
    elements.menuToggle.classList.toggle('active');
    elements.navMenu.classList.toggle('active');
};

const closeMobileMenu = () => {
    elements.menuToggle.setAttribute('aria-expanded', 'false');
    elements.menuToggle.classList.remove('active');
    elements.navMenu.classList.remove('active');
};

// Enhanced view switching with animation
const switchView = (viewType) => {
    const isGrid = viewType === 'grid';

    // Update button states
    elements.gridViewBtn.classList.toggle('active', isGrid);
    elements.listViewBtn.classList.toggle('active', !isGrid);

    // Update ARIA labels for accessibility
    elements.gridViewBtn.setAttribute('aria-pressed', isGrid);
    elements.listViewBtn.setAttribute('aria-pressed', !isGrid);

    // Toggle visibility with smooth transitions
    if (isGrid) {
        elements.membersList.classList.add('hidden');
        setTimeout(() => {
            elements.membersGrid.classList.remove('hidden');
        }, 50);
    } else {
        elements.membersGrid.classList.add('hidden');
        setTimeout(() => {
            elements.membersList.classList.remove('hidden');
        }, 50);
    }

    // Store user preference in localStorage
    localStorage.setItem('preferredView', viewType);
};

// Fetch and display members - Simple async/await implementation
const getMembers = async () => {
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
};

// Fallback demo data in case JSON file is missing
const getFallbackData = () => {
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
};

// Enhanced member display with loading states
const displayMembers = (members) => {
    if (!members || !Array.isArray(members)) {
        console.warn('Invalid members data, using fallback');
        members = getFallbackData().members;
    }

    // Clear existing content
    elements.membersGrid.innerHTML = '';
    elements.membersList.innerHTML = '';

    // Show loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-state';
    loadingDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #2196f3; margin-bottom: 1rem;"></i>
            <p>Loading business directory...</p>
        </div>
    `;
    elements.membersGrid.appendChild(loadingDiv);

    // Simulate loading for better UX
    setTimeout(() => {
        elements.membersGrid.innerHTML = '';

        if (members.length === 0) {
            showNoMembersMessage();
            return;
        }

        members.forEach((member, index) => {
            // Create grid view card
            const card = createMemberCard(member);
            card.style.animationDelay = `${index * 0.1}s`;
            elements.membersGrid.appendChild(card);

            // Create list view item
            const listItem = createMemberListItem(member);
            listItem.style.animationDelay = `${index * 0.1}s`;
            elements.membersList.appendChild(listItem);
        });

        // Restore user's preferred view
        const preferredView = localStorage.getItem('preferredView') || 'grid';
        switchView(preferredView);

        console.log(`Successfully displayed ${members.length} businesses`);

    }, 500);
};

// Show message when no members are found
const showNoMembersMessage = () => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'info-message';
    messageDiv.innerHTML = `
        <div style="text-align: center; padding: 3rem; background: #e3f2fd; border-radius: 12px; margin: 2rem 0; border-left: 4px solid #2196f3;">
            <i class="fas fa-building" style="font-size: 3rem; color: #2196f3; margin-bottom: 1.5rem;"></i>
            <h3 style="color: #1976d2; margin-bottom: 1rem;">Butere Business Directory</h3>
            <p style="margin-bottom: 1.5rem; font-size: 1.1rem; color: #555;">
                Showing local businesses in Butere. Data loaded successfully.
            </p>
            <div style="display: inline-flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                <span style="background: #4caf50; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
                    <i class="fas fa-check-circle"></i> ${members.length} Businesses Loaded
                </span>
                <span style="background: #2196f3; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
                    <i class="fas fa-sync"></i> Live Data
                </span>
            </div>
        </div>
    `;
    elements.membersGrid.appendChild(messageDiv);
};

// Enhanced member card creation
const createMemberCard = (member) => {
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
};

// Enhanced list item creation
const createMemberListItem = (member) => {
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
};

// Utility functions
const getMembershipClass = (level) => {
    switch (level) {
        case 1: return 'member';
        case 2: return 'silver';
        case 3: return 'gold';
        default: return 'member';
    }
};

const getMembershipText = (level) => {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver Member';
        case 3: return 'Gold Member';
        default: return 'Member';
    }
};

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}