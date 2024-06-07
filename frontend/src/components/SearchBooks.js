import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', query); // Debugging line
    axios.get(`http://localhost:5000/api/books/search?title=${query}`)
      .then(response => {
        console.log('Search results:', response.data); // Debugging line
        setResults(response.data);
        setMessage('');
      })
      .catch(error => {
        console.error('Search error:', error); // Debugging line
        if (error.response && error.response.status === 404) {
          setMessage('No books found');
        } else {
          setMessage('Error searching for books');
        }
      });
  };

  const handleBorrow = (bookId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    axios.post('http://localhost:5000/api/loans/borrow', { userId: user.id, bookId })
      .then(response => {
        setMessage('Book borrowed successfully');
      })
      .catch(error => {
        console.error('Error borrowing book:', error);
      });
  };

  return (
    <div>
      <h3>Search for Books</h3>
      <input
        type="text"
        placeholder="Enter book title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {message && <p>{message}</p>}
      <ul>
        {results.map(book => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => handleBorrow(book.id)}>Borrow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;
