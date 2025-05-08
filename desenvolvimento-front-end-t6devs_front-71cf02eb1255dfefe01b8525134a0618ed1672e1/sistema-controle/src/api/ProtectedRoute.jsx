import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  const isAuthenticated = !!token;
  const hasRequiredRole = role.includes(userType);

  if (!isAuthenticated || !hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;