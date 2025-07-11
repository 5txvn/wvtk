const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        pageTitle: 'AI-Powered Word Analysis'
    });
});

module.exports = router; 