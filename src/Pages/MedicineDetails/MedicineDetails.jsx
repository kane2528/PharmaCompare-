import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MedicineDetails = () => {
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      const response = await fetch(`http://localhost:5000/api/medicines/${medicineId}`);
      const data = await response.json();
      setMedicine(data);
    };

    const fetchPharmacies = async () => {
      const response = await fetch(`http://localhost:5000/api/pharmacies?medicineId=${medicineId}`);
      const data = await response.json();
      setPharmacies(data);
    };

    fetchMedicineDetails();
    fetchPharmacies();
  }, [medicineId]);

  const toggleFavorite = async () => {
    const url = `http://localhost:5000/api/users/favorites`;
    const method = isFavorite ? "DELETE" : "POST";
    const body = JSON.stringify({ medicineId });

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body,
    });

    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      {medicine && (
        <div>
          <h1>{medicine.name}</h1>
          <p>{medicine.description}</p>
          <p>Price: ${medicine.price}</p>
          <button onClick={toggleFavorite}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      )}
      <h2>Available at Pharmacies</h2>
      <ul>
        {pharmacies.map((pharmacy) => (
          <li key={pharmacy._id}>
            <h3>{pharmacy.name}</h3>
            <p>Price: ${pharmacy.medicines[0].price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineDetails;
