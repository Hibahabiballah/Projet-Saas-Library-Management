import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateBook.css'; // Import your CSS file for UpdateBook

const UpdateBook = ({ bookId, onClose }) => {
  const [titre, setTitre] = useState('');
  const [auteur, setAuteur] = useState('');
  const [anneePublication, setAnneePublication] = useState('');
  const [genre, setGenre] = useState('');
  const [resume, setResume] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log(`Fetching book with ID: ${bookId}`);
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { titre, auteur, anneePublication, genre, resume, disponible } = response.data;
        setTitre(titre);
        setAuteur(auteur);
        // Check if anneePublication is a string, if not convert it
        if (typeof anneePublication === 'string') {
          setAnneePublication(anneePublication.split('T')[0]);
        } else {
          setAnneePublication(new Date(anneePublication).toISOString().split('T')[0]);
        }
        setGenre(genre);
        setResume(resume);
        setDisponible(disponible);
      } catch (error) {
        setError('Error fetching book');
        console.error(error);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/books/${bookId}`, {
        titre,
        auteur,
        anneePublication,
        genre,
        resume,
        disponible
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('Book updated successfully');
    } catch (error) {
      setError('Error updating book');
      console.error(error);
    }
  };

  return (
    <div className="update-book-container">
      <div className="top-bar">
        <h3>Update Book</h3>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="mainForm">
        <div className="form-group">
          <label><i className="fas fa-book"></i> Title:</label>
          <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Enter book title" />
        </div>
        <div className="form-group">
          <label><i className="fas fa-user"></i> Author:</label>
          <input type="text" value={auteur} onChange={(e) => setAuteur(e.target.value)} placeholder="Enter author's name" />
        </div>
        <div className="form-group">
          <label><i className="fas fa-calendar-alt"></i> Publication Year:</label>
          <input type="date" value={anneePublication} onChange={(e) => setAnneePublication(e.target.value)} />
        </div>
        <div className="form-group">
          <label><i className="fas fa-tags"></i> Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Enter genre" />
        </div>
        <div className="form-group">
          <label><i className="fas fa-align-left"></i> Summary:</label>
          <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Enter summary" />
        </div>
        <div className="form-group">
          <label><i className="fas fa-check"></i> Available:</label>
          <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
        </div>
        <button type="submit" className="submit-btn"><i className="fas fa-save"></i> Update Book</button>
        <button type="button" className="close-btn" onClick={onClose}><i className="fas fa-times"></i> Close</button>
      </form>
    </div>
  );
};

export default UpdateBook;
