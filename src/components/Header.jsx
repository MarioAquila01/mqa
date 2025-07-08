import React from 'react';

const Header = () => (
  <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 sticky top-0 z-50 shadow-lg">
    <div className="container mx-auto flex justify-between items-center px-4">
      <h1 className="text-2xl font-bold">MQA com Thaís Rosa</h1>
      <nav>
        <a href="#sala-secreta" className="mx-2 hover:underline">Sala Secreta</a>
        <a href="#mentoria" className="mx-2 hover:underline">Mentoria</a>
        <a href="#imersao" className="mx-2 hover:underline">Imersão</a>
      </nav>
    </div>
  </header>
);

export default Header;