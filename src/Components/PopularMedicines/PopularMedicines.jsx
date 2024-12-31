import React from 'react';
import './PopularMedicines.css'; // Add a CSS file for styling the popular medicines list

const PopularMedicines = () => {
  const popularMedicines = [
    { name: 'Paracetamol', image: 'paracetamol.webp' },
    { name: 'Ibuprofen', image: 'ibuprofen.webp' },
    { name: 'Aspirin', image: 'aspirin.jpg' },
    { name: 'Amoxicillin', image: 'amoxicillin.webp' },
    { name: 'Ciprofloxacin', image: 'ciprofloxacin.jpeg' },
    { name: 'Metformin', image: 'metformin.jpeg' },
    { name: 'Omeprazole', image: 'omeprazole.jpg' },
    { name: 'Hydrochlorothiazide', image: 'hydrochlorothiazide.jpg' },
  ];

  return (
    <div className="popular-medicines">
      <h2 className="popular-title">Popular Medicines</h2>
      <div className="medicine-card-container">
        {popularMedicines.map((medicine, index) => (
          <div key={index} className="medicine-card">
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
