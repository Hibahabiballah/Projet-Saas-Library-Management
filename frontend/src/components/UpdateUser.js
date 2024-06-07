import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateUser.css'; // Ensure you have the CSS file for styling

const UpdateUser = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFormData(response.data);
      } catch (error) {
        setError('Error fetching user');
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

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
      setError(''); // Clear any previous error
      setSuccess(''); // Clear any previous success message
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('User updated successfully');
    } catch (error) {
      setError('Error updating user');
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="update-user-container">
      <div className="top-bar">
        <h3>Update User</h3>
      </div>
      {error && !success && <p className="error-message">{error}</p>}
      {success && !error && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="row-form">
        <div className="form-group-row">
          <div className="form-group">
            <label><i className="fas fa-user"></i> Name:</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <label><i className="fas fa-envelope"></i> Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="form-group-row">
          <div className="form-group">
            <label><i className="fas fa-key"></i> Password:</label>
            <input
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label><i className="fas fa-user-tag"></i> Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn"><i className="fas fa-save"></i> Update User</button>
          <button type="button" className="close-btn" onClick={onClose}><i className="fas fa-times"></i> Close</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
