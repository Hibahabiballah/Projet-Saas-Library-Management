import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [nom, setNom] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: '',
    role: 'user'
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // State to track success
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:5000/api/users/login', { nom, motDePasse })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        const { role } = response.data;
        setLoading(false);
        setSuccess(true); // Set success state to true
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'user') {
          navigate('/user-dashboard');
        } else {
          console.error('Unknown role:', role);
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setLoading(false);
        setMessage('Login failed: Invalid credentials');
        setSuccess(false); // Set success state to false on error
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:5000/api/users/register', formData)
      .then(response => {
        setMessage('Sign up successful! Please log in.');
        setSuccess(true); // Set success state to true
        setIsSignUpMode(false);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error signing up:', error);
        setLoading(false);
        setMessage('Sign up failed: ' + error.response.data.message);
        setSuccess(false); // Set success state to false on error
      });
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="nom"
                placeholder="Nom d'utilisateur"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="motDePasse"
                placeholder="Mot de passe"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" disabled={loading} />
            {message && <p style={{ color: success ? 'green' : 'red' }}>{message}</p>}
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              
            </div>
          </form>
          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="motDePasse"
                placeholder="Mot de passe"
                value={formData.motDePasse}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user-tag"></i>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <input type="submit" value="Sign Up" className="btn solid" disabled={loading} />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
             
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Join our library community! Whether you’re here to borrow and read from our vast collection or manage the library's resources as an admin, we've got you covered. Sign up to start your journey with us today.</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(true)}>Sign Up</button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Welcome back! Log in to continue exploring books, managing your account, or overseeing library operations. Whether you're a reader or an admin, your personalized dashboard awaits you.</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(false)}>Sign In</button>
          </div>
        </div>
      </div>
      {loading && <div className="loading-spinner">Loading...</div>}
    </div>
  );
};

export default LoginPage;
