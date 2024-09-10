const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const postRoutes = require('./routes/posts');
const { initDb } = require('./database/db');

const app = express();

// Initialize database
initDb();

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', postRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
