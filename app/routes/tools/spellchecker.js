const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('spellchecker', {
        title: 'AI Spellchecker',
        pageTitle: 'AI Spellchecker Tool'
    });
});

module.exports = router; 