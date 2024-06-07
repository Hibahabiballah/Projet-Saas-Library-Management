// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authenticateToken, userController.getUsers);
router.get('/:id', authenticateToken, userController.getUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
