const express = require('express');
const { borrowBook, returnBook, borrowHistory } = require('../controllers/borrow');
const authMiddleware = require('../middleware/authentication');
const router = express.Router();

router.post('/borrow', authMiddleware, borrowBook);
router.put('/return/:borrowId', authMiddleware, returnBook);
router.get('/history', authMiddleware, borrowHistory);

module.exports = router;
