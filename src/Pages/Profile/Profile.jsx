import React from 'react';
import './Profile.css';

const Profile = () => {
  // Mocked favorite medicines (replace with actual user data)
  const favoriteMedicines = ['Paracetamol', 'Ibuprofen', 'Metformin'];

  return (
    <div className="profile-container">
      <h2>Welcome, [Username]</h2>
      <h3>Your Favorite Medicines</h3>
      <ul className="favorites-list">
        {favoriteMedicines.map((medicine, index) => (
          <li key={index} className="favorites-item">
            {medicine}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
