import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToDashboardButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin-dashboard')}
      className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
    >
      ← Voltar ao Painel Principal
    </button>
  );
};

export default BackToDashboardButton;
