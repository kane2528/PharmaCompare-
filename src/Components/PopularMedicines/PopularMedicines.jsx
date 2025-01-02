import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularMedicines.css';

const PopularMedicines = () => {
  const navigate = useNavigate();

  const popularMedicines = [
    { id: '1', name: 'Paracetamol', image: 'paracetamol.webp' },
    { id: '2', name: 'Ibuprofen', image: 'ibuprofen.webp' },
    { id: '3', name: 'Aspirin', image: 'aspirin.jpg' },
    { id: '4', name: 'Amoxicillin', image: 'amoxicillin.webp' },
    { id: '5', name: 'Ciprofloxacin', image: 'ciprofloxacin.jpeg' },
    { id: '6', name: 'Metformin', image: 'metformin.jpeg' },
    { id: '7', name: 'Omeprazole', image: 'omeprazole.jpg' },
    { id: '8', name: 'Hydrochlorothiazide', image: 'hydrochlorothiazide.jpg' },
  ];

  const handleCardClick = (id) => {
    navigate(`/medicines/${id}`);
  };

  return (
    <div className="popular-medicines">
      <h2 className="popular-title">Popular Medicines</h2>
      <div className="medicine-card-container">
        {popularMedicines.map((medicine) => (
          <div
            key={medicine.id}
            className="medicine-card"
            onClick={() => handleCardClick(medicine.id)}
          >
            <img
              src={require(`../../assets/medicines/${medicine.image}`)}
              alt={medicine.name}
              className="medicine-image"
            />
            <h3 className="medicine-name">{medicine.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMedicines;
