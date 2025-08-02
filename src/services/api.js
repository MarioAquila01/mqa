// src/services/api.js
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Funções de envio
export const sendEbook = async (data) => {
  return api.post('/ebook', data);
};

export const sendSalaSecreta = async (data) => {
  return api.post('/send/sala-secreta', data);
};

export const sendContato = async (data) => {
  return api.post('/send/contato', data);
};

export default api;
