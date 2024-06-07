const sequelize = require('../config/db');
const User = require('./User');
const Book = require('./Book');
const Loan = require('./Loan');

// Define associations
User.hasMany(Loan, { foreignKey: 'userId' });
Loan.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Loan, { foreignKey: 'bookId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = {
  sequelize,
  User,
  Book,
  Loan
};
