const express = require('express');
const router = express.Router();

// Import individual tool routes
const similarWordsRouter = require('./tools/similar-words');
const wordAnalogiesRouter = require('./tools/word-analogies');
const vectorExplorerRouter = require('./tools/vector-explorer');
const wordClusteringRouter = require('./tools/word-clustering');
const spellcheckerRouter = require('./tools/spellchecker');
const chatbotRouter = require('./tools/chatbot');

// Mount individual tool routes
router.use('/similar-words', similarWordsRouter);
router.use('/word-analogies', wordAnalogiesRouter);
router.use('/vector-explorer', vectorExplorerRouter);
router.use('/word-clustering', wordClusteringRouter);
router.use('/spellchecker', spellcheckerRouter);
router.use('/chatbot', chatbotRouter);

module.exports = router; 