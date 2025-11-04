// Course data array - Web and Computer Programming Certificate courses
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// Function to display courses based on filter
function displayCourses(filter = 'all') {
    const courseCards = document.getElementById('courseCards');
    courseCards.innerHTML = '';

    // Filter courses based on selection
    let filteredCourses;
    if (filter === 'all') {
        filteredCourses = courses;
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    } else if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    }

    // Create course cards
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;

        // Create technology badges
        const techBadges = course.technology.map(tech =>
            `<span class="tech-badge">${tech}</span>`
        ).join('');

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p class="course-title">${course.title}</p>
            <p class="course-description">${course.description}</p>
            <div class="technologies">
                ${techBadges}
            </div>
            <div class="course-info">
                <span>Credits: ${course.credits}</span>
                <span class="status">${course.completed ? '✓ Completed' : 'In Progress'}</span>
            </div>
        `;

        courseCards.appendChild(card);
    });

    // Update total credits
    updateTotalCredits(filteredCourses);
}

// Function to update total credits display
function updateTotalCredits(courses) {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('totalCredits').textContent = totalCredits;
}

// Function to handle filter button clicks
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value and display courses
            const filter = this.getAttribute('data-filter');
            displayCourses(filter);
        });
    });
}

// Initialize course functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // IMPORTANT: Update these based on your actual course completion status
    // Example - set to true for courses you've completed:
    courses[0].completed = true; // CSE 110
    courses[1].completed = true; // WDD 130
    courses[2].completed = true; // CSE 111
    courses[3].completed = true; // CSE 210
    courses[4].completed = true; // WDD 131

    // Display all courses initially
    displayCourses();

    // Set up filter buttons
    setupFilterButtons();
});