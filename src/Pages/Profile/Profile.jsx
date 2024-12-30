import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get('/api/favorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFavorites(response.data);
    };
    fetchFavorites();
  }, []);

  return (
    <div className="profile">
      <h1>Your Favorite Medicines</h1>
      <ul>
        {favorites.map((medicine) => (
          <li key={medicine.id}>{medicine.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
