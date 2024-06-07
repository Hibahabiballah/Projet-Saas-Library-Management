const express = require('express');
const bookController = require('../controllers/bookController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, bookController.getBooks);
router.get('/:id', authenticateToken, bookController.getBook);
router.post('/', authenticateToken, bookController.addBook);
router.put('/:id', authenticateToken, bookController.updateBook); // This route
router.delete('/:id', authenticateToken, bookController.deleteBook);

module.exports = router;
