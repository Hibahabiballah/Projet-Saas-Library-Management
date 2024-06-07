const express = require('express');
const router = express.Router();
const { getUserBorrowedBooks, borrowBook, returnBook } = require('../controllers/loanController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', authenticate, getUserBorrowedBooks);
router.post('/borrow/:id', authenticate, borrowBook);
router.post('/return/:id', authenticate, returnBook);

module.exports = router;
