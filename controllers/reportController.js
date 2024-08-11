const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

exports. mostBorrowedBooks = async (req, res) => {
    try {
        const result = await Borrow.aggregate([
            {
                $group: {
                    _id: "$bookId",
                    borrowCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            { $unwind: "$bookDetails" },
            {
                $project: {
                    _id: 0,
                    bookId: "$bookDetails._id",
                    title: "$bookDetails.title",
                    author: "$bookDetails.author",
                    borrowCount: 1
                }
            },
            { $sort: { borrowCount: -1 } },
       
        ]);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};


exports. activeMembers = async (req, res) => {
    try {
        const result = await Borrow.aggregate([
            {
                $group: {
                    _id: "$userId",
                    borrowCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    _id: 0,
                    userId: "$userDetails._id",
                    name: "$userDetails.name",
                    email: "$userDetails.email",
                    borrowCount: 1
                }
            },
            { $sort: { borrowCount: -1 } },
           
        ]);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};


exports. bookAvailability = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        const borrowedBooks = await Borrow.countDocuments({ status: "Borrowed" });
        const availableBooks = totalBooks - borrowedBooks;

        const result = {
            totalBooks,
            borrowedBooks,
            availableBooks
        };

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
