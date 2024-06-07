const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Unable to retrieve books' });
  }
};

exports.getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Unable to retrieve book', details: error.message });
  }
};

exports.addBook = async (req, res) => {
  const { titre, auteur, anneePublication, genre, resume, disponible } = req.body;
  try {
    const newBook = await Book.create({
      titre,
      auteur,
      anneePublication: parseInt(anneePublication, 10), // Ensure it's an integer
      genre,
      resume,
      disponible
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Unable to add book', details: error.message });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { titre, auteur, anneePublication, genre, resume, disponible } = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    book.titre = titre;
    book.auteur = auteur;
    book.anneePublication = parseInt(anneePublication, 10); // Ensure it's an integer
    book.genre = genre;
    book.resume = resume;
    book.disponible = disponible;
    await book.save();
    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Unable to update book', details: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Unable to delete book', details: error.message });
  }
};
