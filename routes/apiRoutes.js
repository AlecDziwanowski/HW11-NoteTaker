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

        // obtain existing notes
        try {
            const savedNotes = await fs.readFile('./db/db.json');
            const parsedNotes = JSON.parse(savedNotes);
            // add newNote to db.json file
            parsedNotes.push(newNote);
            const parsedNotesNew = parsedNotes;
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotesNew));
            response.status(201).json('Success!');
        } catch {
            return response.status(500).json('Error in saving note.');
        }
    }
});

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll 
// need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

// async await

// Delete /api/notes/id - deletes note
// api.delete('/:id', (request, response) => {
//     // destructure req.body
//     const { title, text, id } = request.body;
// 
//     // if all required properties are given
//     // if (title && text && id) {
//     //     // establish properties of a note
//     //     const newNote = {
//     //         title,
//     //         text,
//     //         // gives each note a unique id
//     //         id: uuid(),
//     //     };

//         // obtain existing notes
//         fs.readFile('./db/db.json')
//         // return notes with newNote added
//         .then(data => JSON.parse(data))
//         // write updated notes to the db.json file
//         .then(parsedNotes => {
//             fs.writeFile('./db/db.json', JSON.stringify(parsedNotes));
//             response.status(201).json('Success!');
//         })
//         // if there is an error, tell the user
//         .catch(() => response.status(500).json('Error in saving note.'));
//     }
// });

// exports api so that it can be accessed at /api/notes path
module.exports = api;