const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ['Borrowed', 'Returned'], default: 'Borrowed' }
});

module.exports = mongoose.model('Borrow', BorrowSchema);
