// src/services/api.js
import axios from 'axios';

// ✅ URL atualizada para a API hospedada no Render
const API_BASE_URL = 'https://api-mqa.onrender.com';

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
