const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('chatbot', {
        title: 'Chatbot',
        borderColor: 'border-blue-500',
        hoverColor: 'hover:text-blue-600',
        iconColor: 'text-blue-600',
        pageTitle: 'Chatbot Tool'
    });
});

module.exports = router; 