import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [pharmacies, setPharmacies] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      const medicineName = searchParams.get('name');
      const response = await axios.get(`/api/pharmacies?medicineName=${medicineName}`);
      setPharmacies(response.data);
    };
    fetchData();
  }, [searchParams]);

  const sortPharmacies = (order) => {
    const sorted = [...pharmacies].sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
    setPharmacies(sorted);
    setSortOrder(order);
  };

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      <button onClick={() => sortPharmacies('asc')}>Sort by Price (Low to High)</button>
      <button onClick={() => sortPharmacies('desc')}>Sort by Price (High to Low)</button>
      <ul>
        {pharmacies.map((pharmacy) => (
          <li key={pharmacy.id}>
            {pharmacy.name} - ${pharmacy.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
