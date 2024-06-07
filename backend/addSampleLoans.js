const User = require('./src/models/User');
const Book = require('./src/models/Book');
const Loan = require('./src/models/Loan');
const sequelize = require('./src/config/db'); // Ensure your DB connection is initialized

const sampleUsers = [
  { username: 'John Doe', email: 'john.doe@example.com', password: 'password', role: 'user' },
  { username: 'Jane Smith', email: 'jane.smith@example.com', password: 'password', role: 'user' },
];

const sampleBooks = [
  { titre: "Harry Potter and the Sorcerer's Stone", auteur: 'J.K. Rowling', anneePublication: 1997, genre: 'Fantasy', resume: 'First book in the Harry Potter series.', disponible: true },
  { titre: "Harry Potter and the Chamber of Secrets", auteur: 'J.K. Rowling', anneePublication: 1998, genre: 'Fantasy', resume: 'Second book in the Harry Potter series.', disponible: true },
];

const sampleLoans = [
  { bookId: 1, userId: 1, dueDate: '2024-06-15', returned: false, dateEmprunt: '2024-06-01', dateRetour: null },
  { bookId: 2, userId: 2, dueDate: '2024-06-20', returned: false, dateEmprunt: '2024-06-02', dateRetour: null },
];

async function addData() {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    for (const user of sampleUsers) {
      await User.create(user);
    }
    for (const book of sampleBooks) {
      await Book.create(book);
    }
    for (const loan of sampleLoans) {
      await Loan.create(loan);
    }
    console.log('Sample data added successfully');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

addData();
