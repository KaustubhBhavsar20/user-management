import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Add CSS for awesome design

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to User Management Application</h1>
      <div className="home-buttons">
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn">Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
