import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?name=${searchTerm}`);
      setSearchTerm(''); // Clear the search bar after submission
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">PharmaCompare</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link
            to="/"
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/medicines"
            className={`navbar-link ${location.pathname === '/medicines' ? 'active' : ''}`}
          >
            All Medicines
          </Link>
        </li>
        <li>
          <Link
            to="/auth"
            className={`navbar-link ${location.pathname === '/auth' ? 'active' : ''}`}
          >
            Login/Signup
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}
          >
            Profile
          </Link>
        </li>
      </ul>
      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
