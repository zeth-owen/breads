const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');


// CONFIG
require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI= process.env.MONGO_URI;

// Database connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('connected to mongo: ' + MONGO_URI);
    })



// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


// ROUTES
app.get('/', (req, res) => {
    res.send('Hello Bread. Welcome to an Awesome App');
});

// BREADS ROUTES
app.use('/breads', require('./controllers/breads_controller'));

// 404 Page
app.get('*', (req, res) => {
    res.status(404).send('404. Page not found.');
});

// LISTEN
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});

module.exports = app;