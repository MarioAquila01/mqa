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

// Painel Admin Components
import DashboardAdmin from './components/admin/AdminDashboard';
import AdminLeadsList from './components/admin/AdminLeadsList';
import AdminTemplateEditor from './components/admin/AdminTemplateEditor'; // ✅ Import Editor de Templates

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
        {/* Home e seções */}
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

        {/* Aliases */}
        {pageSections.flatMap(section =>
          (section.aliases || []).map(alias => (
            <Route
              key={alias}
              path={`/${alias}`}
              element={<Navigate to={`/${section.name}`} replace />}
            />
          ))
        )}

        {/* Acesso Vip */}
        <Route path="/acesso-vip" element={<AcessoVip />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Página Lives e Mentorias */}
        <Route path="/lives-mentorias" element={<LivesMentorias />} />

        {/* Painel Administrativo Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />

        {/* Leads do E-book */}
        <Route
          path="/admin-dashboard/ebook-leads"
          element={
            <PrivateRoute>
              <AdminLeadsList />
            </PrivateRoute>
          }
        />

        {/* Editor de Templates de E-mails */}
        <Route
          path="/admin-dashboard/emails"
          element={
            <PrivateRoute>
              <AdminTemplateEditor />
            </PrivateRoute>
          }
        />

        {/* Área VIP protegida */}
        <Route
          path="/AreaVip"
          element={
            <PrivateRoute>
              <AreaVip />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
