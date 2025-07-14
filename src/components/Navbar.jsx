import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <div className="font-bold text-xl">MQA</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/missao">Missão</Link>
        <Link to="/sala-secreta">Sala Secreta</Link>
        <Link to="/livro">Livro</Link>
        <Link to="/podcast">Podcast</Link>
        <Link to="/palestras">Palestras</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
