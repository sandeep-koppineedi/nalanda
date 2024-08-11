const express = require('express');
const { mostBorrowedBooks, activeMembers, bookAvailability } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/most-borrowed-books', authMiddleware, mostBorrowedBooks);
router.get('/active-members', authMiddleware, activeMembers);
router.get('/book-availability', authMiddleware, bookAvailability);

module.exports = router;
