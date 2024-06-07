import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof M !== 'undefined') {
      M.AutoInit();
      const carousel = document.querySelector('.carousel');
      if (carousel) {
        M.Carousel.init(carousel, {});
      }
    }
  }, []);

  const changeBg = (title) => {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
      content.classList.remove('active');
      if (content.classList.contains(title)) {
        content.classList.add('active');
        content.style.backgroundImage = `url('./images/${content.getAttribute('data-bg')}')`;
      }
    });
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-page">
        <div className="banner">
          <div className="content 65 active" data-bg="bg-65.jpeg">
            <img src="./images/65-title.png" alt="" className="movie-title" />
          </div>
          <div className="carousel-box">
          <h1>Welcome to our Library Management System</h1>
         
            <div className="carousel">
              <div className="carousel-item" onClick={() => changeBg('the-little-mermaid')}>
                <img src="./images/movies/the-little-mermaid.jpeg" alt="" />
              </div>
              <div className="carousel-item" onClick={() => changeBg('65')}>
                <img src="./images/movies/65.jpg" alt="" />
              </div>
              <div className="carousel-item" onClick={() => changeBg('the-tank')}>
                <img src="./images/movies/the-tank.jpeg" alt="" />
              </div>
              <div className="carousel-item" onClick={() => changeBg('the-covenant')}>
                <img src="./images/movies/the-covenant.jpg" alt="" />
              </div>
              <div className="carousel-item" onClick={() => changeBg('the-black-demon')}>
                <img src="./images/movies/the-black-demon.jpg" alt="" />
              </div>
            </div>
          </div>
          <button className="btn-login" onClick={navigateToLogin}>Let's Start</button>
        </div>
    
    </div>
  );
};

export default WelcomePage;
