import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo à esquerda */}
        <Link to="/">
          <img
            src="/assets/img/logo-mqa-sem-raio.png"
            alt="Logo MQA"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Menu à direita */}
        <div className="space-x-4 text-white font-medium text-sm md:text-base">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/missao" className="hover:text-gray-200 transition">Missão</Link>
          <Link to="/livro" className="hover:text-gray-200 transition">Livro</Link>
          <Link to="/lives-mentorias" className="hover:text-gray-200 transition">Lives & Mentorias</Link>
          <Link to="/salasecreta" className="hover:text-gray-200 transition">Ebook</Link>
          <Link to="/podcast" className="hover:text-gray-200 transition">Podcast</Link>
          <Link to="/contato" className="hover:text-gray-200 transition">Contato</Link>
          <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
