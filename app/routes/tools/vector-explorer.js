const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('vector-explorer', {
        title: 'Vector Explorer',
        pageTitle: 'Vector Explorer Tool'
    });
});

module.exports = router; 