import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import BorrowedBooks from '../components/BorrowedBooks';
import './UserDashboard.css';

const UserDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
  });

  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]); // State to hold available books
  const [showBooks, setShowBooks] = useState(false); // Initially set to false
  const [showBorrowedBooks, setShowBorrowedBooks] = useState(false); // Initially set to false

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log("Stored User:", storedUser); // Log the stored user data
    if (storedUser && storedUser.nom) {
      console.log("User's Name:", storedUser.nom); // Log the user's name
    } else {
      console.warn("User object or user's name not found in local storage");
    }
    setUser(storedUser);

    // Fetch statistics
    axios
      .get('http://localhost:5000/api/statistics')
      .then((response) => {
        setStatistics(response.data);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
      });

    // Fetch available books
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Books fetched in UserDashboard:', response.data);
        setBooks(response.data); // Update the books state
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleShowBooks = () => {
    setShowBooks(true);
    setShowBorrowedBooks(false);
  };

  const handleShowBorrowedBooks = () => {
    setShowBorrowedBooks(true);
    setShowBooks(false);
  };

  const handleClose = () => {
    setShowBooks(false);
    setShowBorrowedBooks(false);
  };

  return (
    <div className="dashboard-container">
      <h2 className="welcome-message">
        Welcome, {user && user.nom ? user.nom : 'User'}!
      </h2>
      {!showBooks && !showBorrowedBooks && (
        <div className="buttons-container">
          <button onClick={handleShowBooks}>View Available Books</button>
          <button onClick={handleShowBorrowedBooks}>View Borrowed Books</button>
        </div>
      )}
      {showBooks && (
        <div className="UserBooks">
          <button className="close-button" onClick={handleClose}>X</button>
          <div className="booklist-container">
            <BookList
              isAdmin={false}
              books={books} // Pass the books data to BookList
            />
          </div>
        </div>
      )}
      {showBorrowedBooks && (
        <>
          <button className="close-button" onClick={handleClose}>X</button>
          <h3 className="section-title">Borrowed Books</h3>
          <BorrowedBooks />
        </>
      )}
    </div>
  );
};

export default UserDashboard;
