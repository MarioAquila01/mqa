import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AcessoVip from './components/AcessoVip';
import Login from './components/Login';
import AreaVip from './components/AreaVip';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { pageSections } from '@/sections';
import axios from 'axios';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import LivesMentorias from './components/LivesMentorias';

// Painel Administrativo Novo
import PainelAdminFunil from './components/Admin/PainelAdminFunil';
import EbookLeadsList from './components/Admin/EbookLeadsList';
import AdminPagamentosList from './components/Admin/AdminPagamentosList';

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  useEffect(() => {
    axios.get(API_URL)
      .then(() => console.log('✅ API acordada'))
      .catch(() => console.log('⚠️ Falha ao acordar a API'));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
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

        {pageSections.flatMap(section =>
          (section.aliases || []).map(alias => (
            <Route
              key={alias}
              path={`/${alias}`}
              element={<Navigate to={`/${section.name}`} replace />}
            />
          ))
        )}

        <Route path="/acesso-vip" element={<AcessoVip />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lives-mentorias" element={<LivesMentorias />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute adminOnly>
              <PainelAdminFunil />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard/ebook-leads"
          element={
            <PrivateRoute adminOnly>
              <EbookLeadsList />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard/pagamentos"
          element={
            <PrivateRoute adminOnly>
              <AdminPagamentosList />
            </PrivateRoute>
          }
        />

        <Route path="/AreaVip" element={<PrivateRoute><AreaVip /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
