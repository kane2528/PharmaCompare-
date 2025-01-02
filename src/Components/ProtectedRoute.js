import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  if (!isAuthenticated) {
    // Redirect to the Auth page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  return children; // Render the child component if authenticated
};

export default ProtectedRoute;
