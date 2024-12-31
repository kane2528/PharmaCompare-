import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import SearchResults from '../../Pages/SearchResults/SearchResults';
import MedicineDetails from '../../Pages/MedicineDetails/MedicineDetails';
import Login from '../../Pages/Login/Login';
import './Navbar.css';
import Auth from '../../Pages/Auth/Auth';
import Profile from '../../Pages/Profile/Profile';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Router>
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/" className="navbar-link">Home</Link></li>
            <li><Link to="/search" className="navbar-link">Search</Link></li>
            <li><Link to="/medicine/:id" className="navbar-link">Medicine Details</Link></li>
            <li><Link to="/Login" className="navbar-link">Login</Link></li>
          </ul>
        </nav>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/search" element={<SearchResults />} />
  <Route path="/medicine/:id" element={<MedicineDetails />} />
  <Route path="/login" element={<Auth/>} />
  <Route path="/profile" element={<Profile />} />
</Routes>

      </Router>
    </div>
  );
};

export default Navbar;
