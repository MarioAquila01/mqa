import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mentoria from './Mentoria';
import Imersao from './Imersao';

const VipArea = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/vip-login');
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">Área VIP MQA</h2>
          <p className="text-lg mb-8 text-gray-700">
            Bem-vinda à Área VIP! Aqui você tem acesso a conteúdos exclusivos, como a Mentoria e a Imersão MQA.
          </p>
        </div>
      </section>
      <Mentoria />
      <Imersao />
    </div>
  );
};

export default VipArea;
