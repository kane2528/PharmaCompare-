import React, { useEffect, useState } from "react";
import './Profile.css';
const Profile = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch("http://localhost:5000/api/users/favorites", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Your Favorite Medicines</h1>
      <ul>
        {favorites.map((medicine) => (
          <li key={medicine._id}>
            <h3>{medicine.name}</h3>
            <p>{medicine.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
