import React, { useState } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const popularMedicines = ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Amoxicillin'];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/search?name=${searchTerm}`;
    }
  };

  return (
    <div className="home">
      <h1>Welcome to PharmaCompare</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for medicines"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h2>Popular Medicines</h2>
      <ul>
        {popularMedicines.map((medicine, index) => (
          <li key={index}>{medicine}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
