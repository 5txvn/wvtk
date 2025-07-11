const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('chatbot', {
        title: 'AI Chatbot',
        pageTitle: 'AI Chatbot Tool'
    });
});

module.exports = router; 