// Set course title
export function setTitle(course) {
  document.querySelector("#courseTitle").textContent = `${course.code}: ${course.name}`;
}

// Render all sections
export function renderSections(sections) {
  const ul = document.querySelector("#sectionsList");
  ul.innerHTML = "";

  sections.forEach(sec => {
    const li = document.createElement("li");
    li.textContent = `Section ${sec.sectionNum} – ${sec.days} – ${sec.roomNum} – Instructor: ${sec.instructor} – Enrolled: ${sec.enrolled}`;
    ul.appendChild(li);
  });
}
