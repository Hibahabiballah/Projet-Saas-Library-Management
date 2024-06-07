import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';

const AddUser = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: '',
    role: 'user',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/users/register', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onUserAdded();
      setFormData({
        nom: '',
        email: '',
        motDePasse: '',
        role: 'user',
      });
    } catch (error) {
      setError('Error adding user');
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='addUser'>
      <h3 className="section-title">Add New User</h3>
      {error && <p className="error-message">{error}</p>}
      <form className='addUserForm' onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='form-group1'>
            <label htmlFor="nom">
              <i className="fas fa-user"></i> Name:
            </label>
            <input
              type="text"
              name="nom"
              id="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className='form-group1'>
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group1'>
            <label htmlFor="motDePasse">
              <i className="fas fa-lock"></i> Password:
            </label>
            <input
              type="password"
              name="motDePasse"
              id="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className='form-group1'>
            <label htmlFor="role">
              <i className="fas fa-user-shield"></i> Role:
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <button type="submit" className="addUserButton">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
