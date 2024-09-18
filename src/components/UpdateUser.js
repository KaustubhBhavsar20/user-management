import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateUser.css'; // Add some cool CSS

function UpdateUser() {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState({ firstName: '', lastName: '', phone: '', dob: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user data by ID
    axios.get(`http://localhost:5000/user/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the user in the database
    axios.put(`http://localhost:5000/update/${id}`, user)
      .then(response => {
        alert('User updated successfully');
        navigate('/welcome'); // Redirect to Welcome page after update
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="update-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleInputChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleInputChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={user.phone} onChange={handleInputChange} required />
        <input type="date" name="dob" value={user.dob} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleInputChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
