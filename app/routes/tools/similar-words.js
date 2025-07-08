const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('similar-words', {
        title: 'Similar Words',
        borderColor: 'border-blue-500',
        hoverColor: 'hover:text-blue-600',
        iconColor: 'text-blue-600',
        pageTitle: 'Similar Words Tool'
    });
});

module.exports = router; 