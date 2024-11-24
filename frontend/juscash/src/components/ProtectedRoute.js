import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificar se o usuário está logado (por exemplo, se o token de acesso existe)
  const isAuthenticated = localStorage.getItem('accessToken');

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver logado, renderiza os filhos (a página desejada)
  return children;
};

export default ProtectedRoute;