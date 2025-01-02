import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MedicineDetails = () => {
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // Simulated hardcoded data for medicine details and pharmacies
    const fetchMedicineDetails = () => {
      if (medicineId === "6775830fc31f9425eb8daf46") {
        setMedicine({
          _id: "6775830fc31f9425eb8daf46",
          name: "Paracetamol",
          description: "Pain reliever and fever reducer",
          price: 5.99,
        });
        setPharmacies([
          {
            pharmacyName: "HealthFirst Pharmacy",
            address: "123 Wellness Blvd, Cityville, ST 12345",
            price: 12.5,
            contact: "(123) 456-7890",
          },
          {
            pharmacyName: "MediCare Central",
            address: "456 Cure Ave, Healthtown, ST 54321",
            price: 15.75,
            contact: "(987) 654-3210",
          },
        ]);
      } else if (medicineId === "1") {
        setMedicine({
          _id: "1",
          name: "Ibuprofen",
          description: "Reduces inflammation and relieves pain",
          price: 7.99,
        });
        setPharmacies([
          {
            pharmacyName: "GoodHealth Pharmacy",
            address: "789 Vitality Rd, Medicity, ST 67890",
            price: 9.99,
            contact: "(555) 111-2222",
          },
          {
            pharmacyName: "PillPoint Rx",
            address: "321 Remedy St, Drugsville, ST 98765",
            price: 11.5,
            contact: "(444) 333-6666",
          },
          {
            pharmacyName: "CarePlus Pharmacy",
            address: "654 Healing Ln, Pharmatown, ST 24680",
            price: 10.99,
            contact: "(999) 888-7777",
          },
        ]);
      } else {
        console.error("Medicine ID not found.");
      }
    };

    // Uncomment below if fetching from database
    /*
    const fetchMedicineDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/medicines/${medicineId}`);
        const data = await response.json();
        setMedicine(data);
      } catch (error) {
        console.error("Error fetching medicine details:", error.message);
      }
    };

    const fetchPharmacies = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pharmacies?medicineId=${medicineId}`);
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error("Error fetching pharmacies:", error.message);
      }
    };
    */

    fetchMedicineDetails();
  }, [medicineId]);

  return (
    <div className="medicine-details">
      {medicine ? (
        <div>
          <h1>{medicine.name}</h1>
          <p>{medicine.description}</p>
          <p>Price: ${medicine.price}</p>
        </div>
      ) : (
        <p>Loading medicine details...</p>
      )}
      <h2>Available at Pharmacies</h2>
      {pharmacies.length > 0 ? (
        <ul className="pharmacies-list">
          {pharmacies.map((pharmacy, index) => (
            <li key={index} className="pharmacy-card">
              <h3>{pharmacy.pharmacyName}</h3>
              <p>Address: {pharmacy.address}</p>
              <p>Price: ${pharmacy.price}</p>
              <p>Contact: {pharmacy.contact}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pharmacies found for this medicine.</p>
      )}
    </div>
  );
};

export default MedicineDetails;
