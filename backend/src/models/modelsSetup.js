const sequelize = require('../config/db');
const Book = require('./Book');
const Loan = require('./Loan');

// Define associations
Book.hasMany(Loan, { foreignKey: 'bookId', as: 'loans' });
Loan.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

module.exports = {
  sequelize,
  Book,
  Loan
};
