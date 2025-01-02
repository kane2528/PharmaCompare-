import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './AllMedicines.css';
const AllMedicines = () => {
  const [medicines, setMedicines] = useState([]); // State for all medicines
  const [favorites, setFavorites] = useState([]); // State for favorites
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const navigate = useNavigate(); // For navigation

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set true if token exists
  }, []);

  // Fetch all medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/medicines");
        const data = await response.json();
        setMedicines(data.slice(0, 10)); // Limit to 10 items (5x2 grid)
      } catch (error) {
        console.error("Failed to fetch medicines:", error.message);
      }
    };

    fetchMedicines();
  }, []);

  // Fetch user's favorites
  useEffect(() => {
    if (!isLoggedIn) return; // Skip fetching favorites if user is not logged in

    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/favorites", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavorites(data.map((favorite) => favorite._id)); // Set favorites as an array of medicine IDs
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error.message);
      }
    };

    fetchFavorites();
  }, [isLoggedIn]);

  // Toggle favorite status
  const toggleFavorite = async (medicineId) => {
    try {
      if (favorites.includes(medicineId)) {
        // Remove from favorites
        const response = await fetch(`http://localhost:5000/api/users/favorites/${medicineId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          alert("Medicine removed from favorites!");
          setFavorites((prev) => prev.filter((id) => id !== medicineId)); // Update favorites locally
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to remove from favorites");
        }
      } else {
        // Add to favorites
        const response = await fetch("http://localhost:5000/api/users/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ medicineId }),
        });

        if (response.ok) {
          alert("Medicine added to favorites!");
          setFavorites((prev) => [...prev, medicineId]); // Update favorites locally
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to add to favorites");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="all-medicines">
      <h2 className="all-medicines-title">All Medicines</h2>
      <div className="medicine-grid">
        {medicines.map((medicine) => (
          <div key={medicine._id} className="medicine-card">
            <h3>{medicine.name}</h3>
            <p>{medicine.description}</p>
            <p>Price: ${medicine.price}</p>
            {isLoggedIn && ( // Show buttons only for logged-in users
              <button
                className={`favorite-button ${favorites.includes(medicine._id) ? "favorited" : ""}`}
                onClick={() => toggleFavorite(medicine._id)}
              >
                {favorites.includes(medicine._id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            )}
            <button
              className="details-button"
              onClick={() => navigate(`/medicines/${medicine._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMedicines;
