const express = require('express');
const { addBook, updateBook, deleteBook, listBooks } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authentication');
const router = express.Router();

router.post('/books', authMiddleware, addBook);
router.put('/books/:id', authMiddleware, updateBook);
router.delete('/books/:id', authMiddleware, deleteBook);
router.get('/books', listBooks);

module.exports = router;
