// src/services/api.js
import axios from 'axios';

// 🔒 URL fixa da API Render
const API_BASE_URL = 'https://api-mqa.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==============================
// FUNÇÕES DE ENVIO DE DADOS
// ==============================

// ✅ Envio do Ebook
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

// ✅ Envio das Mentorias
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

// ✅ Envio do Contato
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

// ==============================
// FUNÇÕES DE CONSULTA ADMIN
// ==============================

// ✅ Buscar Leads do Ebook (rota corrigida)
export const getEbookLeads = async () => {
  try {
    const response = await api.get('/ebook/leads');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar leads do Ebook:', error.response || error);
    throw error;
  }
};

// ✅ Buscar Leads de Mentoria
export const getMentoriaLeads = async () => {
  try {
    const response = await api.get('/admin/mentorialeads');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar leads da Mentoria:', error.response || error);
    throw error;
  }
};

// ✅ Buscar Pagamentos
export const getPagamentos = async () => {
  try {
    const response = await api.get('/admin/pagamentos');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar pagamentos:', error.response || error);
    throw error;
  }
};

// ✅ Buscar Templates de Email
export const getEmailTemplates = async () => {
  try {
    const response = await api.get('/admin/email-templates');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar templates de e-mail:', error.response || error);
    throw error;
  }
};

export default api;
