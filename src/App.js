import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Auth from './Pages/Auth/Auth';
import Profile from './Pages/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import PopularMedicines from './Components/PopularMedicines/PopularMedicines';
import MedicineDetails from './Pages/MedicineDetails/MedicineDetails'; // Import the MedicineDetails page
import AllMedicines from './Pages/AllMedicines/AllMedicines'; // Import AllMedicines component
import './App.css'; // Add global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar Component */}
        <Navbar />
        
        {/* Main Content */}
        <div className="content">
          <Routes>
            {/* Authentication Route */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Profile Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            {/* Popular Medicines and Welcome Page */}
            <Route
              path="/"
              element={
                <div className="welcome-page">
                  <h1>Welcome to PharmaCompare</h1>
                  <p>
                    Your one-stop solution to search for medicines, compare prices, and
                    manage your health efficiently.
                  </p>
                  {/* Popular Medicines */}
                  <PopularMedicines />
                </div>
              }
            />
            
            {/* Medicine Details Page */}
            <Route path="/medicines/:id" element={<MedicineDetails />} />
            
            {/* All Medicines Page */}
            <Route path="/medicines" element={<AllMedicines />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
