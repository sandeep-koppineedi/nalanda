const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

// Borrow a book
exports.borrowBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id;

    try {
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.copiesAvailable <= 0) {
            return res.status(400).json({ message: 'No copies available' });
        }

        const borrow = new Borrow({
            userId,
            bookId,
        });

        await borrow.save();

        book.copiesAvailable -= 1;
        await book.save();

        res.status(201).json(borrow);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    const { borrowId } = req.params;

    try {
        const borrow = await Borrow.findById(borrowId).populate('bookId');

        if (!borrow) {
            return res.status(404).json({ message: 'Borrow record not found' });
        }

        if (borrow.status === 'Returned') {
            return res.status(400).json({ message: 'Book already returned' });
        }

        borrow.status = 'Returned';
        borrow.returnDate = new Date();
        await borrow.save();

        const book = borrow.bookId;
        book.copiesAvailable += 1;
        await book.save();

        res.status(200).json(borrow);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// View borrowing history
exports.borrowHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        const borrowHistory = await Borrow.find({ userId }).populate('bookId');
        res.status(200).json(borrowHistory);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
