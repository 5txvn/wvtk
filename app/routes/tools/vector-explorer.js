const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('vector-explorer', {
        title: 'Vector Explorer',
        borderColor: 'border-blue-500',
        hoverColor: 'hover:text-blue-600',
        iconColor: 'text-blue-600',
        pageTitle: 'Vector Explorer Tool'
    });
});

module.exports = router; 