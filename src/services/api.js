import axios from 'axios';

// Altere essa URL para o domínio final quando for usar em produção com domínio próprio
const API_BASE_URL = 'https://sala-secreta-api.onrender.com'; // Exemplo: https://api.mqa.com.br

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enviar dados da Sala Secreta
export const sendSalaSecreta = async (data) => {
  return api.post('/send/sala-secreta', data);
};

// Enviar dados do formulário de contato
export const sendContato = async (data) => {
  return api.post('/send/contato', data);
};

export default api;
