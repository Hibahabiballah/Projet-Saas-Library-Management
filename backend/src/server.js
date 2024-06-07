require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Book, Loan } = require('./models/modelsSetup'); // Import models and sequelize from modelsSetup.js
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');
const homepageRoutes = require('./routes/HomePageRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json());
app.use('/api/statistics', statisticsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);
app.use('/', homepageRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System!');
});

// Sync the database
sequelize.sync({ force: true }).then(() => { // Set force: true only for development to recreate tables
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to sync database:', err);
});
