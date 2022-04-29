// access express library
const html = require('express').Router();
// access path module
const path = require('path');

// GET /notes returns the notes.html file
html.get('/', (request, response) =>
    response.sendFile(path.join(__dirname, '../public/notes.html'))
);
// GET * should returns the index.html file
html.get('*', (request, response) =>
    response.sendFile(path.join(__dirname, '../public/index.html'))
);

// exports html so that it can be accessed at /notes path
module.exports = html;