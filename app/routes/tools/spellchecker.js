const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('spellchecker', {
        title: 'Spellchecker',
        borderColor: 'border-blue-500',
        hoverColor: 'hover:text-blue-600',
        iconColor: 'text-blue-600',
        pageTitle: 'Spellchecker Tool'
    });
});

module.exports = router; 