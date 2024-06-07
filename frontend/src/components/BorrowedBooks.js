import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowedBooks.css';
const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/loans', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBorrowedBooks(response.data);
    } catch (error) {
      setError('Error fetching borrowed books');
      console.error('Error fetching borrowed books:', error);
    }
  };

  

  const handleReturnBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/loans/return/${bookId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBorrowedBooks(); // Refresh the borrowed books list
    } catch (error) {
      setError('Error returning book');
      console.error('Error returning book:', error);
    }
  };

  return (
    <div className='borrowedDIV'>

      {error && <p className="error-message">{error}</p>}
      <ul>
        {borrowedBooks.map(book => (
          <li key={book.id}>
            <p>Title: {book.titre}</p>
            <p>Author: {book.auteur}</p>
            <button className='return' onClick={() => handleReturnBook(book.id)}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowedBooks;
