import React from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { scroller } from 'react-scroll';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const goToSection = (target) => {
    if (isHome) {
      scroller.scrollTo(target, {
        duration: 600,
        smooth: true,
        offset: -80,
      });
    } else {
      sessionStorage.setItem('scrollTarget', target);
      setTimeout(() => navigate('/'), 50);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-r from-[#1e1e28]/90 to-[#2e2e3e]/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* 🔁 Agora o título é clicável */}
        <button
          onClick={() => goToSection('home')}
          className="text-xl font-bold text-white hover:text-purple-300 transition"
        >
          Melhor que Antes
        </button>

        <nav className="hidden md:flex space-x-4 text-white text-sm font-medium">
          <button onClick={() => goToSection('home')} className="hover:text-purple-300">Home</button>
          <button onClick={() => goToSection('missao')} className="hover:text-purple-300">Missão</button>
          <button onClick={() => goToSection('sala-secreta')} className="hover:text-purple-300">Sala Secreta</button>
          <button onClick={() => goToSection('livro')} className="hover:text-purple-300">Livro</button>
          <button onClick={() => goToSection('podcast')} className="hover:text-purple-300">Podcast</button>
          <button onClick={() => goToSection('contato')} className="hover:text-purple-300">Contato</button>
          <RouterLink to="/login" className="hover:text-purple-300">Login</RouterLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
