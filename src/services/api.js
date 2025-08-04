// src/services/api.js (URL fixa configurada)
import axios from 'axios';

// 🔒 URL fixa da API Render
const API_BASE_URL = 'https://api-mqa.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Função de envio do Ebook
export const sendEbook = async (data) => {
  try {
    const response = await api.post('/ebook', data);
    console.log('✅ Ebook enviado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao enviar Ebook:', error.response || error);
    throw error;
  }
};

// ✅ Função de envio das Mentorias
export const sendMentoria = async (data) => {
  try {
    const response = await api.post('/api/send/mentoria', data);
    console.log('✅ Mentoria enviada com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao enviar Mentoria:', error.response || error);
    throw error;
  }
};

// ✅ Função de envio do Contato
export const sendContato = async (data) => {
  try {
    const response = await api.post('/send/contato', data);
    console.log('✅ Contato enviado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao enviar Contato:', error.response || error);
    throw error;
  }
};

export default api;
