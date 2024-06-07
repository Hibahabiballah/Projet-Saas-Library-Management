import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Import your CSS file for UserList

const UserList = ({ onSelectUser, onUserDeleted }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter(user => user.id !== id));
      onUserDeleted();
    } catch (error) {
      setError('Error deleting user');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-list-container">
      <h3>User List</h3>
      {error && <p className="error-message">{error}</p>}
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <p><i className="fas fa-user"></i> Name: {user.nom}</p>
              <p><i className="fas fa-envelope"></i> Email: {user.email}</p>
              <p><i className="fas fa-user-tag"></i> Role: {user.role}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => onSelectUser(user.id)}>
                <i className="fas fa-edit"></i> Edit
              </button>
              <button onClick={() => handleDeleteUser(user.id)}>
                <i className="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
