import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
