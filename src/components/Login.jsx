// ============================
// 📄 src/components/Login.jsx
// ============================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/api/login-unico', { email, password });
      const { token, role } = response.data;

      if (token) {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', role);

        if (role === 'admin') {
          navigate('/area-vip');
        } else {
          navigate('/vip');
        }
      } else {
        setError('Login falhou. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Área VIP / Admin</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700"
        >
          Entrar
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
