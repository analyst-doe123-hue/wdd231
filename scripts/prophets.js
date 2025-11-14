// URL for the prophets data
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Get reference to the cards container
const cards = document.querySelector('#cards');

// Async function to fetch prophet data
async function getProphetData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.table(data.prophets); // Temporary testing of data response

        // Comment out the console.table line after testing and call displayProphets
        displayProphets(data.prophets);

    } catch (error) {
        console.error('Error fetching prophet data:', error);
        cards.innerHTML = '<p>Sorry, there was an error loading the prophet data. Please try again later.</p>';
    }
}

// Function to display prophets
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let deathDate = document.createElement('p');
        let numChildren = document.createElement('p');
        let yearsServed = document.createElement('p');

        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Build the additional information
        birthDate.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;
        birthPlace.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;

        // Handle death date (some prophets are still living)
        if (prophet.death) {
            deathDate.innerHTML = `<strong>Date of Death:</strong> ${prophet.death}`;
        } else {
            deathDate.innerHTML = `<strong>Status:</strong> Currently Living`;
        }

        numChildren.innerHTML = `<strong>Number of Children:</strong> ${prophet.numofchildren}`;
        yearsServed.innerHTML = `<strong>Years as President:</strong> ${prophet.length}`;

        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${getOrderSuffix(prophet.order)} Latter-day Prophet`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append the section(card) with the created elements
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(deathDate);
        card.appendChild(numChildren);
        card.appendChild(yearsServed);

        cards.appendChild(card);
    });
}

// Helper function to get the ordinal suffix
function getOrderSuffix(order) {
    if (order % 10 === 1 && order % 100 !== 11) {
        return 'st';
    } else if (order % 10 === 2 && order % 100 !== 12) {
        return 'nd';
    } else if (order % 10 === 3 && order % 100 !== 13) {
        return 'rd';
    } else {
        return 'th';
    }
}

// Call the function to get and display prophet data
getProphetData();