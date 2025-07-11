const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('word-analogies', {
        title: 'Word Analogies',
        pageTitle: 'Word Analogies Tool'
    });
});

module.exports = router; 