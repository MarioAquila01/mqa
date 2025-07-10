import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 sticky top-0 z-50 shadow-lg">
    <div className="container mx-auto flex justify-between items-center px-4">
      <h1 className="text-2xl font-bold">Melhor que Antes</h1>

      <nav className="flex flex-wrap items-center text-sm sm:text-base">
        {/* Link para o topo da página (Home) */}
        <a href="#home" className="mx-2 hover:underline">Home</a>

        {/* Links de rolagem suave na Home */}
        <a href="#missao" className="mx-2 hover:underline">Missão</a>
        <a href="#sala-secreta" className="mx-2 hover:underline">Sala Secreta</a>
        <a href="#livro" className="mx-2 hover:underline">Livro</a>
        <a href="#palestras" className="mx-2 hover:underline">Palestras</a>
        <a href="#podcast" className="mx-2 hover:underline">Podcast</a>
        <a href="#contato" className="mx-2 hover:underline">Contato</a>

        {/* Login separado */}
        <Link to="/login" className="mx-2 hover:underline">Login</Link>
      </nav>
    </div>
  </header>
);

export default Header;
