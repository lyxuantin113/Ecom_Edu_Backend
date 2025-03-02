const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes.js');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST_NAME = process.env.HOST_NAME || 'localhost';

const path = require('path');

// Serve static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
