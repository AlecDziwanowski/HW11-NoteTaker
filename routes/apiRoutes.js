// access express library
const api = require('express').Router();
const req = require('express/lib/request');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
api.get('/api/notes', (req,res) => {

})

// * `POST /api/notes` should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client. You'll 
// need to find a way to give each note a unique id when it's saved (look into npm 
// packages that could do this for you).
api.post('/api/notes', (req, res) => {
    // destructure req.body
    const {title, text} = req.body;
    // if all required properties are given
    if (title && text) {
        // 
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
    }
});