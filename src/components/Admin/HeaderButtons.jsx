import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => navigate('/admin-dashboard/ebook-leads')}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-base font-semibold"
      >
        Ver Leads do E-book
      </button>
      <button
        onClick={() => navigate('/admin-dashboard/pagamentos')}
        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 text-base font-semibold"
      >
        Ver Pagamentos (Hotmart)
      </button>
    </div>
  );
};

export default HeaderButtons;
