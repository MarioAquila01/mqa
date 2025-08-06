import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // ✅ API configurada para chamadas HTTP (axios instance)

/**
 * Componente de Login da Área VIP e Painel Administrativo.
 * - Faz autenticação pela API.
 * - Redireciona conforme o role do usuário (admin ou comum).
 */
const Login = () => {
  // Estados controlados para os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para exibir mensagens de erro
  const navigate = useNavigate(); // Hook para redirecionamento de páginas

  /**
   * Função responsável por enviar os dados de login à API.
   * Faz o tratamento da resposta, armazenando o token e role no localStorage.
   * Redireciona conforme o nível de acesso do usuário.
   */
  const handleLogin = async () => {
    // Validação simples dos campos
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      // Requisição para rota de login da API (auth/login)
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      if (token) {
        // Armazenando o token JWT e dados no localStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', user.role);

        // Redireciona conforme o Role do usuário
        if (user.role === 'admin') {
          navigate('/admin-dashboard'); // ✅ Admin vai pro Painel Admin
        } else {
          navigate('/AreaVip'); // ✅ Usuário comum vai pra Área VIP
        }
      } else {
        setError('Login falhou.');
      }
    } catch (err) {
      // ✅ Exibe a mensagem de erro da API, se existir, ou uma mensagem padrão.
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="bg-[#151515]/90 border border-purple-500/30 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Login Área VIP</h2>
        
        {/* Campo de E-mail */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-purple-500/30 rounded-md bg-black/30 text-white"
        />

        {/* Campo de Senha */}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-purple-500/30 rounded-md bg-black/30 text-white"
        />

        {/* Botão de Login */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 rounded-full font-semibold shadow-lg hover:brightness-110 transition"
        >
          Entrar
        </button>

        {/* Mensagem de Erro */}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
