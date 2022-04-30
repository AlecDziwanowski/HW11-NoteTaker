// access express library
const api = require('express').Router();
// promisify fs module commands (e.g., const readFromFile = util.promisify(fs.readFile));
const fs = require('fs/promises');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

// GET /api/notes - read the db.json file and return all saved notes as JSON.
api.get('/', async (request, response) => {
    try {
        const savedNotes = await fs.readFile('./db/db.json');
        return response.json(JSON.parse(savedNotes));
    } catch {
        // if there is an error, tell the user
        return response.status(500).json('Error in saving note.');
    }
});

// POST /api/notes - adds body to db.json
api.post('/', async (request, response) => {
    // destructure req.body
    const { title, text } = request.body;
    // if all required properties are given
    if (title && text) {
        // establish properties of a note
        const newNote = {
            title,
            text,
            // gives each note a unique id
            id: uuid(),
        };
        
        try {
            // obtain existing notes
            const savedNotes = await fs.readFile('./db/db.json');
            const parsedNotes = JSON.parse(savedNotes);
            // add newNote to db.json file
            parsedNotes.push(newNote);
            const parsedNotesNew = parsedNotes;
            // update db.json file with new note
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotesNew));
            response.status(201).json('Success!');
        } catch {
            // if there is an error, tell the user
            return response.status(500).json('Error in saving note.');
        }
    }
});

// Delete /api/notes/id - deletes note
api.delete('/:id', async (request, response) => {
    try {
        // obtain existing notes
        const savedNotes = await fs.readFile('./db/db.json');
        const parsedNotes = JSON.parse(savedNotes);
        // filter out deleted note
        const parsedNotesAfterDelete = parsedNotes.filter(parsedNote => parsedNote.id !== request.params.id);
        // write updated notes to the db.json file
        fs.writeFile('./db/db.json', JSON.stringify(parsedNotesAfterDelete));
        response.status(201).json('Success!');
    } catch {
        // if there is an error, tell the user
        return response.status(500).json('Error in saving note.');
    }
});

// exports api so that it can be accessed at /api/notes path
module.exports = api;