import React from 'react';
import './HomePage.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to <span className="highlight">Orbat</span></h1>
        <p>Streamline your workflow and manage your projects seamlessly with Orbat.</p>
        <div className="cta-buttons">
          <a href="/signup" className="btn primary-btn">Get Started</a>
          <a href="/signin" className="btn secondary-btn">Sign In</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
