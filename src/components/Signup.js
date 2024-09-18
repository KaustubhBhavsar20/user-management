import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Add CSS for signup page

function Signup() {
  const [user, setUser] = useState({ firstName: '', lastName: '', phone: '', dob: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios.post('http://localhost:5000/signup', user)
      .then(response => {
        alert('Registered successfully');
        navigate('/login');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleInputChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleInputChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={user.phone} onChange={handleInputChange} required />
        <input type="date" name="dob" value={user.dob} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleInputChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleInputChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
