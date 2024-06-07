import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  console.log("Token:", token);
  console.log("User:", user);

  if (!token || !user) {
    console.log("No token or user found. Redirecting to /login");
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    console.log(`User role (${user.role}) does not match required role (${role}). Redirecting to /`);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
