// access express library
const api = require('express').Router();
// promisify fs module commands (e.g., const readFromFile = util.promisify(fs.readFile));
const fs = require('fs/promises');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

// GET /api/notes - read the db.json file and return all saved notes as JSON.
api.get('/', (request, response) => {
    fs.readFile('./db/db.json')
    .then(data => response.json(JSON.parse(data)))
    // if there is an error, tell the user
    .catch(() => response.status(500).json('Error in saving note.'));
});

// POST /api/notes - adds body to db.json
api.post('/', (request, response) => {
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

        // obtain existing notes
        fs.readFile('./db/db.json')
        // return notes with newNote added
        .then(data => {
            const parsedNotes = JSON.parse(data);
            // add newNote to db.json file
            parsedNotes.push(newNote);
            return parsedNotes;
        })
        // write updated notes to the db.json file
        .then(parsedNotes => {
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes));
            response.status(201).json('Success!');
        })
        // if there is an error, tell the user
        .catch(() => response.status(500).json('Error in saving note.'));
    }
});

// exports api so that it can be accessed at /api/notes path
module.exports = api;