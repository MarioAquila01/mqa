import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white px-6 py-20 text-center">
      <h1 className="text-6xl font-bold text-purple-400 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Página Não Encontrada</h2>
      <p className="text-lg text-gray-300 mb-8">
        Oops! A página que você está procurando não existe.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-colors duration-300"
      >
        Voltar para a Home
      </Link>
    </div>
  );
};

export default NotFound;