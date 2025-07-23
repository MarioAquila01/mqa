import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AreaVip from './components/AreaVip';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { pageSections } from '@/sections';
import axios from 'axios';
import NotFound from './components/NotFound';

const App = () => {
  useEffect(() => {
    axios.get('https://api-mqa.onrender.com/')
      .then(() => console.log('✅ API acordada'))
      .catch(() => console.log('⚠️ Falha ao acordar a API'));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Rotas para a Home e seções com scrollTo */}
        {['/', ...pageSections.map(s => `/${s.name}`)].map(path => {
          const sectionName = path === '/' ? null : path.slice(1);
          return (
            <Route
              key={path}
              path={path}
              element={<Home scrollTo={sectionName} />}
            />
          );
        })}

        {/* Redirecionamentos com aliases */}
        {pageSections.flatMap(section =>
          (section.aliases || []).map(alias => (
            <Route
              key={alias}
              path={`/${alias}`}
              element={<Navigate to={`/${section.name}`} replace />}
            />
          ))
        )}

        {/* Outras páginas */}
        <Route path="/login" element={<Login />} />
        <Route path="/vip" element={<AreaVip />} />

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
