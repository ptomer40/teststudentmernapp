import React from 'react';
import { Navigate } from 'react-router-dom';

// A protected route wrapper that checks for user role
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // If user is not logged in or doesn't have the correct role, redirect
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
