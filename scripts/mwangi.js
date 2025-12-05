// Import Express to create the server
const express = require('express');

// Initialize the app
const app = express();
// Tell Express to parse JSON (important for our APIs)
app.use(express.json());

// ----- START OF OUR APIs -----

// We simulate a database for now
let projectsDB = [];
let projectIdCounter = 1;
let documentIdCounter = 1; // Counter for documents

// --- MODULE 0: PROJECT MANAGEMENT ---

// API to create a new project
// POST /api/v1/projects
app.post('/api/v1/projects', (req, res) => {
    const { projectName } = req.body;
    if (!projectName) {
        return res.status(400).json({ error: 'projectName is required' });
    }
    const newProject = {
        id: projectIdCounter++,
        name: projectName,
        createdAt: new Date(),
        documents: [] // Project starts empty
    };
    projectsDB.push(newProject);
    console.log('New project created:', newProject);
    res.status(201).json(newProject);
});

// API to view all projects (for testing)
app.get('/api/v1/projects', (req, res) => {
    res.json(projectsDB);
});

// --- END MODULE 0 ---

// --- MODULE 1: ENTRY PORTAL ---

// NEW: API to add pasted text
// POST /api/v1/projects/:id/paste
app.post('/api/v1/projects/:id/paste', (req, res) => {
    // 1. Find the project to add the text to
    // :id comes from the URL (ex: /api/v1/projects/1/paste)
    const projectId = parseInt(req.params.id, 10);
    const project = projectsDB.find(p => p.id === projectId);

    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }

    // 2. Get the text sent by the user
    const { content, documentName } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'content is required' });
    }

    // 3. Create the new document (with its first version)
    const newDocument = {
        id: documentIdCounter++,
        name: documentName || 'New Document',
        createdAt: new Date(),
        // This is where we keep the history (Module 0)
        versions: [
            {
                version: 1,
                createdAt: new Date(),
                content: content // The pasted text
            }
        ]
    };

    // 4. Add this document to the project
    project.documents.push(newDocument);

    console.log(`New document [${newDocument.name}] added to project [${project.name}]`);

    // 5. Return the created document
    res.status(201).json(newDocument);
});

// --- END MODULE 1 ---


// ----- END OF OUR APIs -----

// Define port for the server to listen on
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log('--- MagikDesign API (V0.2) ---');
    console.log(`Server started and listening on http://localhost:${PORT}`);
    console.log('Paste API ready!');
});