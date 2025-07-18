import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Missao from './components/Missao';
import SalaSecreta from './components/SalaSecreta';
import Livro from './components/Livro';
import Podcast from './components/Podcast';
import Contato from './components/Contato';
import Login from './components/Login';
import AreaVip from './components/AreaVip';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import axios from 'axios';

const App = () => {
  // 👇 Ping para acordar a API ao carregar o site
  useEffect(() => {
    axios.get('https://api-mqa.onrender.com/')
      .then(() => console.log('✅ API acordada'))
      .catch(() => console.log('⚠️ Falha ao acordar a API'));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/missao" element={<Missao />} />
        <Route path="/sala-secreta" element={<SalaSecreta />} />
        <Route path="/livro" element={<Livro />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vip" element={<AreaVip />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
