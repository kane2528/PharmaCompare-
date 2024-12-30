import React from 'react';
import './Home.css'; // Import the CSS file
import Welcome from '../../Components/Welcome/Welcome';
import SearchBar from '../../Components/SearchBar/SearchBar'; // Import the SearchBar component
import PopularMedicines from '../../Components/PopularMedicines/PopularMedicines'; // Import the PopularMedicines component

const Home = () => {
  return (
    <div className="home">
      <Welcome />
      <SearchBar />
      <PopularMedicines />
    </div>
  );
};

export default Home;
