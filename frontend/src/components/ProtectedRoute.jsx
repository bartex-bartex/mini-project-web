// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function ProtectedRoute({ children, requiredRole }) {
    const { token, role, loading } = useUser();

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while fetching user data
    }
    
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/" />;
    }
  
    return children;
  }

export default ProtectedRoute;