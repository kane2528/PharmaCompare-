import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MedicineDetails = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState({});
  const [pharmacies, setPharmacies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const medicineResponse = await axios.get(`/api/medicines/${id}`);
      setMedicine(medicineResponse.data);

      const pharmaciesResponse = await axios.get(`/api/pharmacies?medicineId=${id}`);
      setPharmacies(pharmaciesResponse.data);
    };
    fetchData();
  }, [id]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await axios.delete(`/api/favorites/${id}`);
    } else {
      await axios.post('/api/favorites', { medicineId: id });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="medicine-details">
      <h1>{medicine.name}</h1>
      <p>{medicine.description}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <h2>Available at:</h2>
      <ul>
        {pharmacies.map((pharmacy) => (
          <li key={pharmacy.id}>
            {pharmacy.name} - ${pharmacy.price}{' '}
            <a href={pharmacy.purchaseLink} target="_blank" rel="noreferrer">
              Buy
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineDetails;
