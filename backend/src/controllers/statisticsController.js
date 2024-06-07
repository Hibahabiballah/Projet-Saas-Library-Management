const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');

exports.getStatistics = async (req, res) => {
  try {
    const totalBooks = await Book.count();
    const totalUsers = await User.count();
    const borrowedBooks = await Loan.count({ where: { status: 'borrowed' } });

    res.json({
      totalBooks,
      totalUsers,
      borrowedBooks
    });
  } catch (error) {
    console.error('Error retrieving statistics:', error);
    res.status(500).json({ error: 'Unable to retrieve statistics', details: error.message });
  }
};
