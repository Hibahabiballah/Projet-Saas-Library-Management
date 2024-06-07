const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { nom, email, motDePasse, role } = req.body;
  try {
    if (!motDePasse) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const newUser = await User.create({ nom, email, motDePasse: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to register user', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { nom, motDePasse } = req.body;
  try {
    const user = await User.findOne({ where: { nom } });
    if (!user || !(await bcrypt.compare(motDePasse, user.motDePasse))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, nom: user.nom, role: user.role }, process.env.ACCESS_TOKEN_SECRET || 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Unable to fetch users' });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve user' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { motDePasse } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (motDePasse) {
      req.body.motDePasse = await bcrypt.hash(motDePasse, 10);
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete user' });
  }
};
