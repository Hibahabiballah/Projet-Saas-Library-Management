import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = () => {
  const [titre, setTitre] = useState('');
  const [auteur, setAuteur] = useState('');
  const [anneePublication, setAnneePublication] = useState('');
  const [genre, setGenre] = useState('');
  const [resume, setResume] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/books', {
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
      setSuccess('Book added successfully');
      setTitre('');
      setAuteur('');
      setAnneePublication('');
      setGenre('');
      setResume('');
      setDisponible(true);
    } catch (error) {
      setError('Error adding book');
      console.error(error);
    }
  };

  return (
    <div className='addBook'>
      <h3 className="section-title">Add Book</h3>
      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}
      <form className='addBookForm' onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='form-group'>
            <label htmlFor="titre">
              <i className="fas fa-book"></i> Title:
            </label>
            <input id="titre" type="text" value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Enter book title" required />
          </div>
          <div className='form-group'>
            <label htmlFor="auteur">
              <i className="fas fa-user"></i> Author:
            </label>
            <input id="auteur" type="text" value={auteur} onChange={(e) => setAuteur(e.target.value)} placeholder="Enter author name" required />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <label htmlFor="anneePublication">
              <i className="fas fa-calendar-alt"></i> Publication Year:
            </label>
            <input id="anneePublication" type="date" value={anneePublication} onChange={(e) => setAnneePublication(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label htmlFor="genre">
              <i className="fas fa-bookmark"></i> Genre:
            </label>
            <input id="genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Enter genre" required />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="resume">
            <i className="fas fa-file-alt"></i> Summary:
          </label>
          <textarea id="resume" value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Enter book summary" />
        </div>
        <div className='form-group'>
          <label htmlFor="disponible">
            <i className="fas fa-check-circle"></i> Available:
            <input id="disponible" type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
          </label>
        </div>
        <button className='AddBookBtn' type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
