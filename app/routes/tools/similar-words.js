const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('similar-words', {
        title: 'Similar Words',
        pageTitle: 'Similar Words Tool'
    });
});

module.exports = router; 