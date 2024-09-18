// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Welcome from './components/Welcome';
// import Home from './components/Home'; // Import Home page

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} /> {/* Home page as default */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/welcome" element={<Welcome />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Home from './components/Home';
import UpdateUser from './components/UpdateUser'; // Import the update page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/update/:id" element={<UpdateUser />} /> {/* Route for updating user */}
      </Routes>
    </Router>
  );
}

export default App;
