import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './SearchResults.css';
const SearchResults = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchParams] = useSearchParams();
  const medicineName = searchParams.get("name");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pharmacies?name=${medicineName}`);
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
    };

    if (medicineName) {
      fetchSearchResults();
    }
  }, [medicineName]);

  const handleSort = (order) => {
    const sorted = [...pharmacies].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setPharmacies(sorted);
    setSortOrder(order);
  };

  return (
    <div className="search-results">
      <h1>Search Results for "{medicineName}"</h1>
      <div className="sort-buttons">
        <button
          onClick={() => handleSort("asc")}
          className={sortOrder === "asc" ? "active" : ""}
        >
          Sort by Price (Ascending)
        </button>
        <button
          onClick={() => handleSort("desc")}
          className={sortOrder === "desc" ? "active" : ""}
        >
          Sort by Price (Descending)
        </button>
      </div>
      {pharmacies.length > 0 ? (
        <ul className="pharmacies-list">
          {pharmacies.map((pharmacy, index) => (
            <li key={index} className="pharmacy-card">
              <h3>{pharmacy.pharmacyName}</h3>
              <p>Price: ${pharmacy.price}</p>
              <p>Address: {pharmacy.address}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
