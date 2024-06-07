import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import UserList from '../components/UserList';
import LoanList from '../components/LoanList';
import AddUser from '../components/AddUser';
import UpdateUser from '../components/UpdateUser';
import AddBook from '../components/AddBook';
import UpdateBook from '../components/UpdateBook';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalBooks: 0,
    totalUsers: 0,
    activeLoans: 0,
  });

  const [user, setUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showBooks, setShowBooks] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showLoans, setShowLoans] = useState(false);
  const [books, setBooks] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showOtherBookFunctions, setShowOtherBookFunctions] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showOtherUserFunctions, setShowOtherUserFunctions] = useState(false);
  const [showUpdateBook, setShowUpdateBook] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    axios
      .get('http://localhost:5000/api/statistics')
      .then((response) => {
        setStatistics(response.data);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
      });

    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Books fetched in AdminDashboard:', response.data);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    document.body.classList.add('admin-dashboard-body');

    return () => {
      document.body.classList.remove('admin-dashboard-body');
    };
  }, []);

  const handleUserSelect = (id) => {
    setSelectedUserId(id);
  };

  const handleBookSelect = (id) => {
    setSelectedBookId(id);
    setShowUpdateBook(true);
  };

  const handleShowBooks = () => {
    setShowBooks(true);
    setShowUsers(false);
    setShowLoans(false);
    setShowButtons(false);
  };

  const handleShowUsers = () => {
    setShowUsers(true);
    setShowBooks(false);
    setShowLoans(false);
    setShowButtons(false);
  };

  const handleShowLoans = () => {
    setShowLoans(true);
    setShowBooks(false);
    setShowUsers(false);
    setShowButtons(false);
  };

  const handleReturnToMain = () => {
    setShowBooks(false);
    setShowUsers(false);
    setShowLoans(false);
    setShowButtons(true);
    setShowAddBook(false);
    setShowOtherBookFunctions(false);
    setShowAddUser(false);
    setShowOtherUserFunctions(false);
    setShowUpdateBook(false);
  };

  const handleReturnToBooksMain = () => {
    setShowAddBook(false);
    setShowOtherBookFunctions(false);
    setShowUpdateBook(false);
  };

  const handleReturnToUsersMain = () => {
    setShowAddUser(false);
    setShowOtherUserFunctions(false);
  };

  const handleUserAdded = () => {
    setShowUsers(false);
    setShowUsers(true);
  };

  const handleUserUpdated = () => {
    setSelectedUserId(null);
    setShowUsers(false);
    setShowUsers(true);
  };

  const handleUserDeleted = () => {
    setSelectedUserId(null);
    setShowUsers(false);
    setShowUsers(true);
  };

  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  const handleCloseUpdateBook = () => {
    setSelectedBookId(null);
    setShowUpdateBook(false);
  };

  const handleShowAddBook = () => {
    setShowAddBook(true);
    setShowOtherBookFunctions(false);
  };

  const handleShowOtherBookFunctions = () => {
    setShowAddBook(false);
    setShowOtherBookFunctions(true);
  };

  const handleShowAddUser = () => {
    setShowAddUser(true);
    setShowOtherUserFunctions(false);
  };

  const handleShowOtherUserFunctions = () => {
    setShowAddUser(false);
    setShowOtherUserFunctions(true);
  };

  return (
    <div className="dashboard-container">
      <h2 className="welcome-message">
        Welcome, {user && user.nom ? user.nom : 'Admin'}!
      </h2>
      {showButtons && (
        <div className="statistics-container">
          <p className="statistic">Total Books: {statistics.totalBooks}</p>
          <p className="statistic">Total Users: {statistics.totalUsers}</p>
          <p className="statistic">Active Loans: {statistics.activeLoans}</p>
        </div>
      )}
      <div className="content-container">
        <div className="sidebar">
          <button onClick={handleShowBooks}>
            <i className="fas fa-book"></i> Manage Books
          </button>
          <button onClick={handleShowUsers}>
            <i className="fas fa-user"></i> Manage Users
          </button>
          <button onClick={handleShowLoans}>
            <i className="fas fa-clipboard-list"></i> Manage Loans
          </button>
        </div>
        <div className="main-content">
          {showBooks && !showAddBook && !showOtherBookFunctions && !showUpdateBook && (
            <>
              <div className="upper-div">
                <h3 className="section-title">Manage Books</h3>
                <div className="form-container">
                  <button onClick={handleShowAddBook}>Add Book</button>
                  <button onClick={handleShowOtherBookFunctions}>Delete / Update</button>
                  <button onClick={handleReturnToMain}>Return to Main</button>
                </div>
              </div>
            </>
          )}
          {showAddBook && (
            <>
              <button className="close-button" onClick={handleReturnToBooksMain}>X</button>
              <AddBook />
            </>
          )}
          {showOtherBookFunctions && !showUpdateBook && (
            <>
              <button className="close-button" onClick={handleReturnToBooksMain}>X</button>
              <div className="booklist-container">
                <BookList isAdmin={true} onSelectBook={handleBookSelect} books={books} deleteBook={deleteBook} />
              </div>
            </>
          )}
          {showUpdateBook && (
            <>
              <button className="close-button" onClick={handleReturnToBooksMain}>X</button>
              <UpdateBook bookId={selectedBookId} onClose={handleCloseUpdateBook} />
            </>
          )}
          {showUsers && !showAddUser && !showOtherUserFunctions && (
            <>
              <div className="upper-div">
                <h3 className="section-title">Manage Users</h3>
                <div className="form-container">
                  <button onClick={handleShowAddUser}>Add User</button>
                  <button onClick={handleShowOtherUserFunctions}>Delete / Update </button>
                  <button onClick={handleReturnToMain}>Return to Main</button>
                </div>
              </div>
            </>
          )}
          {showAddUser && (
            <>
              <AddUser onUserAdded={handleUserAdded} />
              <button className="close-button" onClick={handleReturnToUsersMain}>X</button>
            </>
          )}
          {showOtherUserFunctions && (
            <>
              <button className="close-button" onClick={handleReturnToUsersMain}>X</button>
              <div className="userlist-container">
                <UserList onSelectUser={handleUserSelect} onUserDeleted={handleUserDeleted} />
                {selectedUserId && <UpdateUser userId={selectedUserId} onUserUpdated={handleUserUpdated} />}
              </div>
            </>
          )}
          {showLoans && (
            <>
              <h3 className="section-title">Manage Loans</h3>
              <LoanList />
              <button onClick={handleReturnToMain}>Return to Main</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
