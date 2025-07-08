const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('word-analogies', {
        title: 'Word Analogies',
        borderColor: 'border-blue-500',
        hoverColor: 'hover:text-blue-600',
        iconColor: 'text-blue-600',
        pageTitle: 'Word Analogies Tool'
    });
});

module.exports = router; 