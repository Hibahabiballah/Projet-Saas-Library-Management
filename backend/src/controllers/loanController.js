const Loan = require('../models/Loan');
const Book = require('../models/Book');
const { Op } = require('sequelize');

exports.borrowBook = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Start date and end date are required' });
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    console.log('Received borrow request:', { userId, bookId: id, startDate: start, endDate: end });

    const overlappingLoan = await Loan.findOne({
      where: {
        bookId: id,
        status: 'borrowed',
        [Op.or]: [
          {
            startDate: { [Op.between]: [start, end] },
          },
          {
            endDate: { [Op.between]: [start, end] },
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: start } },
              { endDate: { [Op.gte]: end } },
            ],
          },
        ],
      },
    });

    if (overlappingLoan) {
      console.log('Overlapping loan found:', overlappingLoan);
      return res.status(400).json({ error: 'Book is already borrowed during the requested period' });
    }

    const newLoan = await Loan.create({
      userId,
      bookId: id,
      status: 'borrowed',
      startDate: start,
      endDate: end,
      createdAt: new Date(),
    });

    console.log('New loan created:', newLoan);
    res.status(200).json(newLoan);
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ error: 'Unable to borrow book', details: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const loan = await Loan.findOne({ where: { bookId: id, userId, status: 'borrowed' } });
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    loan.status = 'returned';
    await loan.save();

    const book = await Book.findByPk(id);
    if (book) {
      book.disponible = true;
      await book.save();
    }

    res.status(200).json(loan);
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ error: 'Unable to return book', details: error.message });
  }
};
exports.getUserBorrowedBooks = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log('Fetching borrowed books for user:', userId);
    const loans = await Loan.findAll({
      where: { userId, status: 'borrowed' },
      include: [{ model: Book, as: 'book' }]
    });

    console.log('Borrowed books fetched:', loans);
    res.status(200).json(loans);
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    res.status(500).json({ error: 'Unable to fetch borrowed books', details: error.message });
  }
};

