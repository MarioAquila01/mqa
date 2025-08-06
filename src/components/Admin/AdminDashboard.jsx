import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const cards = [
    { title: 'Live Gratuita', route: '/admin-dashboard/emails?type=live', color: 'from-green-400 to-green-600' },
    { title: 'Sala Secreta', route: '/admin-dashboard/emails?type=sala', color: 'from-blue-400 to-blue-600' },
    { title: 'Sala em Grupo', route: '/admin-dashboard/emails?type=grupo', color: 'from-yellow-400 to-yellow-600' },
    { title: 'Sala Individual', route: '/admin-dashboard/emails?type=individual', color: 'from-red-400 to-red-600' },
    { title: 'Leads E-book', route: '/admin-dashboard/ebook-leads', color: 'from-purple-400 to-purple-600' }, // ✅ NOVO
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Painel Administrativo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-xl p-8 text-white font-bold text-2xl bg-gradient-to-r ${card.color} shadow-lg hover:scale-105 transition`}
            onClick={() => handleCardClick(card.route)}
          >
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdmin;
