import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BookList.css';

const BookList = ({ isAdmin, onSelectBook, deleteBook, books = [] }) => {
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [borrowDates, setBorrowDates] = useState({});

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBorrowDateChange = (bookId, field, value) => {
    setBorrowDates(prevDates => ({
      ...prevDates,
      [bookId]: {
        ...prevDates[bookId],
        [field]: value,
      },
    }));
  };

  const handleBorrowBook = async (id) => {
    const { startDate, endDate } = borrowDates[id] || {};

    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Borrowing book with data:', { id, startDate, endDate });
      const response = await fetch(`http://localhost:5000/api/loans/borrow/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ startDate, endDate })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error borrowing book');
      }

      console.log('Borrowing book response:', data);
      setError(null);
    } catch (error) {
      console.error('Borrowing book error:', error.message);
      setError(error.message);
    }
  };

  // Ensure books is always an array
  const filteredBooks = (books || []).filter(book =>
    book.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.auteur.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="book-list-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search books..."
        className="search-input"
      />
      {error && <p className="error-message">{error}</p>}
      <div className="book-list-scroll">
        {filteredBooks.length > 0 ? (
          <ul className="book-list">
            {filteredBooks.map(book => (
              <li key={book.id} className="book-item">
                <div className="book-title">{book.titre}</div>
                <div className="book-author">{book.auteur}</div>
                <div className="book-details">
                  {book.anneePublication} - {book.genre}
                </div>
                {!isAdmin && book.disponible && (
                  <div className="borrow-section">
                    <input
                      type="date"
                      value={borrowDates[book.id]?.startDate || ''}
                      onChange={(e) => handleBorrowDateChange(book.id, 'startDate', e.target.value)}
                      placeholder="Start Date"
                      className="date-input"
                    />
                    <input
                      type="date"
                      value={borrowDates[book.id]?.endDate || ''}
                      onChange={(e) => handleBorrowDateChange(book.id, 'endDate', e.target.value)}
                      placeholder="End Date"
                      className="date-input"
                    />
                    <button onClick={() => handleBorrowBook(book.id)} className="borrow-button">Borrow</button>
                  </div>
                )}
                {isAdmin && (
                  <div className="admin-buttons">
                    <button onClick={() => deleteBook(book.id)} className="delete-button">Delete</button>
                    <button onClick={() => onSelectBook(book.id)} className="update-button">Update</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

// Adding PropTypes for better type checking
BookList.propTypes = {
  isAdmin: PropTypes.bool,
  onSelectBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  books: PropTypes.array // Expecting an array of books
};

// Providing a default empty array for books
BookList.defaultProps = {
  books: []
};

export default BookList;
