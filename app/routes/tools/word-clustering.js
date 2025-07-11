const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('word-clustering', {
        title: 'Word Clustering',
        pageTitle: 'Word Clustering Tool'
    });
});

module.exports = router; 