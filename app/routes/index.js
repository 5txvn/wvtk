const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        borderColor: 'border-purple-500',
        hoverColor: 'hover:text-purple-600',
        iconColor: 'text-purple-600',
        pageTitle: 'AI-Powered Word Analysis'
    });
});

module.exports = router; 