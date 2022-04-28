// access express library
const express = require('express');
// allow use of path object?
const path = require('path');
// import modular routers for api and html routes
const apiRouter = require('./apiRoutes');
const htmlRouter = require('./htmlRoutes');


// set PORT
const PORT = process.env.PORT || 3001;

const app = express();

// middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', apiRouter);
app.use('/notes', htmlRouter);

// access public folder in root directory for frontend files
app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(_dirname, '/public/index.html'))
);

// listen for requests sent to the established PORT and prints when listening to console
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);