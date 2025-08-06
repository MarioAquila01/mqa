import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('userToken');
  const userRole = localStorage.getItem('userRole'); // Pega o role salvo no login

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userRole !== 'admin') {
    // Se a rota for adminOnly e o usuário não for admin, redireciona pra Home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
