const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Import routes
const indexRoutes = require('./app/routes/index');
const toolsRoutes = require('./app/routes/tools');
const apiRoutes = require('./app/routes/api');

// Use routes
app.use('/', indexRoutes);
app.use('/', toolsRoutes);
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Word Vector Toolkit server running on http://localhost:${PORT}`);
});
