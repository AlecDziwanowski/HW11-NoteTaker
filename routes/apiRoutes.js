// access express library
const api = require('express').Router();
const res = require('express/lib/response');
// promisifies fs commands (e.g., const readFromFile = util.promisify(fs.readFile));
const fs = require('fs/promises');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
// api.get('/api/notes', (req, res) => {

// })

// * `POST /api/notes` should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client. You'll 
// need to find a way to give each note a unique id when it's saved (look into npm 
// packages that could do this for you).
api.post('/', (request, response) => {
    // destructure req.body
    const { title, text } = request.body;
    
    // if all required properties are given
    if (title && text) {
        // establish properties of a note
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        // obtain existing notes
        // should i be writing then reading?
        fs.readFile('./db/db.json')
        .then(data => {
            const parsedNotes = JSON.parse(data);
            // console.log(newNote)
            // console.log(parsedNotes)
            parsedNotes.push(newNote);
            // console.log(parsedNotes)
            return parsedNotes;
        })
        .then(parsedNotes => {
            console.log(parsedNotes);
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes))
        })

        .catch(() => response.status(500).json('Error in saving note.'))
        // fs.readFile('./db/db.json', 'utf8')
        // .then ((err, data) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         const parsedNotes = JSON.parse(data);
        //         parsedNotes.push(newNote);
        //         // null 4? or null 2? in stringify
        //         return parsedNotes;
        //     }
        // })
        // .then (parsedNotes => {
        //     return fs.writeFile(
        //         './db/db.json',
        //         JSON.stringify(parsedNotes))
        // })
        // .then ((writeErr) =>
        //     res.status(201).json(response)
        // )
        // .catch ((err)=> res.status(500).json('Error in saving note'))
    }
});

module.exports = api;