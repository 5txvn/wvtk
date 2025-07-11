const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const npy = require('numpy-parser');

// Load vocabulary and vectors
let vocabulary = [];
let vectors = null;

// Initialize data
try {
    // Load vocabulary
    const vocabData = fs.readFileSync(path.join(__dirname, '../data/vocabulary.json'), 'utf8');
    vocabulary = JSON.parse(vocabData);
    console.log(`Loaded vocabulary with ${vocabulary.length} words`);
    
    // Load vectors using numpy-parser
    const rawBuffer = fs.readFileSync(path.join(__dirname, '../data/vectors.npy'));
    const parsed = npy.fromArrayBuffer(rawBuffer.buffer.slice(rawBuffer.byteOffset, rawBuffer.byteOffset + rawBuffer.byteLength));
    vectors = parsed.data;
    const vectorDim = parsed.shape[1];
    console.log(`Loaded vectors with shape: ${parsed.shape}`);

    // Utility function to get 2D vector by word index
    global.getVectorByIndex = (index) => vectors.slice(index * vectorDim, (index + 1) * vectorDim);
    global.vectorDim = vectorDim;
} catch (error) {
    console.error('Error loading data:', error);
    process.exit(1);
}

function cosineSimilarity(vec1, vec2) {
    let dot = 0, norm1 = 0, norm2 = 0;
    for (let i = 0; i < vec1.length; i++) {
        dot += vec1[i] * vec2[i];
        norm1 += vec1[i] ** 2;
        norm2 += vec2[i] ** 2;
    }
    return dot / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

function getWordVector(word) {
    const index = vocabulary.indexOf(word.toLowerCase());
    if (index === -1) return null;
    return getVectorByIndex(index);
}

function getAverageVector(words) {
    const vecs = words.map(getWordVector).filter(v => v);
    if (vecs.length === 0) return null;
    const avg = new Array(vecs[0].length).fill(0);
    for (const v of vecs) for (let i = 0; i < v.length; i++) avg[i] += v[i];
    for (let i = 0; i < avg.length; i++) avg[i] /= vecs.length;
    return avg;
}

let qaPairs = [
    { question: "What is artificial intelligence?", answer: "Artificial intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn like humans.", vector: null },
    { question: "How do word vectors work?", answer: "Word vectors represent words as high-dimensional numerical vectors that capture semantic meaning and relationships between words.", vector: null },
    { question: "What is machine learning?", answer: "Machine learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed.", vector: null }
];

function initializeQAVectors() {
    qaPairs.forEach(pair => {
        const words = pair.question.toLowerCase().split(/\s+/);
        pair.vector = getAverageVector(words);
    });
}

initializeQAVectors();

// API Routes with path parameters
router.get('/vocabulary', (req, res) => {
    res.json({ vocabulary: vocabulary.slice(0, 1000) });
});

//get semantically similar words
router.get('/similar-words/:word/:limit', (req, res) => {
    console.log("reached");
    const { word, limit } = req.params;
    
    const wordVector = getWordVector(word);
    if (!wordVector) return res.status(404).json({ error: 'Word not found in vocabulary' });
    
    const similarities = [];
    for (let i = 0; i < vocabulary.length; i++) {
        if (vocabulary[i] === word.toLowerCase()) continue;
        
        const otherVector = getVectorByIndex(i);
        const similarity = cosineSimilarity(wordVector, otherVector);
        similarities.push({
            word: vocabulary[i],
            similarity: similarity
        });
    }
    
    similarities.sort((a, b) => b.similarity - a.similarity);
    res.json({ similar_words: similarities.slice(0, parseInt(limit)) });
});

router.post('/word-analogies', (req, res) => {
    const { word1, word2, word3, n = 10 } = req.body;
    
    if (!word1 || !word2 || !word3) {
        return res.status(400).json({ error: 'All three words are required' });
    }
    
    const vec1 = getWordVector(word1);
    const vec2 = getWordVector(word2);
    const vec3 = getWordVector(word3);
    
    if (!vec1 || !vec2 || !vec3) {
        return res.status(404).json({ error: 'One or more words not found in vocabulary' });
    }
    
    // Calculate analogy: word4 = word2 - word1 + word3
    const analogyVector = [];
    for (let i = 0; i < vec1.length; i++) {
        analogyVector.push(vec2[i] - vec1[i] + vec3[i]);
    }
    
    const similarities = [];
    for (let i = 0; i < vocabulary.length; i++) {
        const otherVector = getVectorByIndex(i);
        const similarity = cosineSimilarity(analogyVector, otherVector);
        similarities.push({
            word: vocabulary[i],
            similarity: similarity
        });
    }
    
    similarities.sort((a, b) => b.similarity - a.similarity);
    res.json({ 
        analogy_words: similarities.slice(0, parseInt(n)),
        analogy_vector: analogyVector
    });
});

router.get('/vector-stats', (req, res) => {
    res.json({
        vocabulary_size: vocabulary.length,
        vector_dimensions: vectorDim,
        total_vectors: vocabulary.length
    });
});

router.post('/cluster-words', (req, res) => {
    const { words, n_clusters = 3 } = req.body;
    
    if (!words || !Array.isArray(words) || words.length < 2) {
        return res.status(400).json({ error: 'At least 2 words are required' });
    }
    
    const wordVectors = [];
    const validWords = [];
    
    for (const word of words) {
        const vector = getWordVector(word);
        if (vector) {
            wordVectors.push(vector);
            validWords.push(word);
        }
    }
    
    if (wordVectors.length < 2) {
        return res.status(400).json({ error: 'At least 2 valid words are required' });
    }
    
    // Simple clustering using k-means (simplified)
    const clusters = [];
    const numClusters = Math.min(parseInt(n_clusters), wordVectors.length);
    
    // Initialize clusters randomly
    for (let i = 0; i < numClusters; i++) {
        clusters.push({
            centroid: wordVectors[i],
            words: [validWords[i]]
        });
    }
    
    // Assign remaining words to nearest cluster
    for (let i = numClusters; i < wordVectors.length; i++) {
        let bestCluster = 0;
        let bestSimilarity = -1;
        
        for (let j = 0; j < clusters.length; j++) {
            const similarity = cosineSimilarity(wordVectors[i], clusters[j].centroid);
            if (similarity > bestSimilarity) {
                bestSimilarity = similarity;
                bestCluster = j;
            }
        }
        
        clusters[bestCluster].words.push(validWords[i]);
    }
    
    res.json({ clusters });
});

// Spellchecker API
router.post('/spellcheck', (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Text parameter is required' });
    }
    
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const suggestions = [];
    
    words.forEach(word => {
        if (!vocabulary.includes(word)) {
            // Find similar words as suggestions
            const wordVector = getWordVector(word);
            if (wordVector) {
                // Word exists in vocabulary, no correction needed
                suggestions.push({
                    word: word,
                    corrected: word,
                    confidence: 1.0,
                    suggestions: []
                });
            } else {
                // Word not found, find similar words
                const similarities = [];
                for (let i = 0; i < vocabulary.length; i++) {
                    const otherVector = getVectorByIndex(i);
                    const similarity = cosineSimilarity(new Array(vectorDim).fill(0), otherVector);
                    similarities.push({
                        word: vocabulary[i],
                        similarity: similarity
                    });
                }
                
                similarities.sort((a, b) => b.similarity - a.similarity);
                const topSuggestions = similarities.slice(0, 5);
                
                suggestions.push({
                    word: word,
                    corrected: topSuggestions[0]?.word || word,
                    confidence: topSuggestions[0]?.similarity || 0,
                    suggestions: topSuggestions.map(s => s.word)
                });
            }
        } else {
            suggestions.push({
                word: word,
                corrected: word,
                confidence: 1.0,
                suggestions: []
            });
        }
    });
    
    res.json({ 
        original_text: text,
        suggestions: suggestions,
        corrected_text: suggestions.map(s => s.corrected).join(' ')
    });
});

// Chatbot APIs
router.get('/chatbot/qa-pairs', (req, res) => {
    res.json({ qa_pairs: qaPairs });
});

router.post('/chatbot/qa-pairs', (req, res) => {
    const { question, answer } = req.body;
    
    if (!question || !answer) {
        return res.status(400).json({ error: 'Question and answer are required' });
    }
    
    const words = question.toLowerCase().split(/\s+/);
    const vector = getAverageVector(words);
    
    if (!vector) {
        return res.status(400).json({ error: 'Could not generate vector for question' });
    }
    
    const newPair = {
        question: question,
        answer: answer,
        vector: vector
    };
    
    qaPairs.push(newPair);
    
    res.json({ 
        message: 'Q&A pair added successfully',
        qa_pair: newPair
    });
});

router.post('/chatbot/ask', (req, res) => {
    const { question } = req.body;
    
    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }
    
    const words = question.toLowerCase().split(/\s+/);
    const questionVector = getAverageVector(words);
    
    if (!questionVector) {
        return res.status(400).json({ error: 'Could not process question' });
    }
    
    let bestMatch = null;
    let bestSimilarity = -1;
    
    for (const pair of qaPairs) {
        if (pair.vector) {
            const similarity = cosineSimilarity(questionVector, pair.vector);
            if (similarity > bestSimilarity) {
                bestSimilarity = similarity;
                bestMatch = pair;
            }
        }
    }
    
    if (bestMatch && bestSimilarity > 0.3) { // Threshold for acceptable match
        res.json({
            question: question,
            answer: bestMatch.answer,
            confidence: bestSimilarity,
            matched_question: bestMatch.question
        });
    } else {
        res.json({
            question: question,
            answer: "I'm sorry, I don't have a good answer for that question. Please try rephrasing or add a new Q&A pair.",
            confidence: bestSimilarity || 0,
            matched_question: null
        });
    }
});

router.delete('/chatbot/qa-pairs/:index', (req, res) => {
    const index = parseInt(req.params.index);
    
    if (index < 0 || index >= qaPairs.length) {
        return res.status(404).json({ error: 'Q&A pair not found' });
    }
    
    const removed = qaPairs.splice(index, 1)[0];
    res.json({ 
        message: 'Q&A pair removed successfully',
        removed_pair: removed
    });
});

module.exports = router;
