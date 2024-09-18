// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Welcome.css'; // Add CSS for Welcome page

// function Welcome() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/users')
//       .then(response => setUsers(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleUpdate = (id) => {
//     const firstName = prompt("Enter new first name:");
//     const lastName = prompt("Enter new last name:");
//     const phone = prompt("Enter new phone:");
//     const dob = prompt("Enter new DOB:");
//     const email = prompt("Enter new email:");

//     axios.put(`http://localhost:5000/update/${id}`, { firstName, lastName, phone, dob, email })
//       .then(response => {
//         alert(response.data.message);
//         window.location.reload();
//       })
//       .catch(error => console.error(error));
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:5000/delete/${id}`)
//       .then(response => {
//         alert(response.data.message);
//         setUsers(users.filter(user => user.id !== id));
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="welcome-container">
//       <h2>Welcome to User Management System</h2>
//       <ul className="user-list">
//         {users.map(user => (
//           <li key={user.id} className="user-item">
//             {user.firstName} {user.lastName} - {user.email}
//             <button onClick={() => handleUpdate(user.id)}>Update</button>
//             <button onClick={() => handleDelete(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Welcome;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Navigate to update page with user ID
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(response => {
        alert('User deleted successfully');
        setUsers(users.filter(user => user.id !== id)); // Remove from frontend list
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="welcome-container">
      <h2>Welcome to User Management System</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            {user.firstName} {user.lastName} - {user.email}
            <button onClick={() => handleUpdate(user.id)}>Update</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Welcome;
