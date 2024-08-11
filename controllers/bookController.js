const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    const { title, author, ISBN, publicationDate, genre, copiesAvailable } = req.body;
    try {
        const book = new Book({ title, author, ISBN, publicationDate, genre, copiesAvailable });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.listBooks = async (req, res) => {
    const { genre, author } = req.query;
    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;

    try {
        const books = await Book.find(filter);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
