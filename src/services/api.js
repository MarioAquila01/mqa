import axios from 'axios';

// 🔒 URL da API — local ou produção (Render)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ================================
   FORMULÁRIOS PÚBLICOS
================================= */

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

/* ================================
   CONSULTAS ADMINISTRATIVAS
================================= */

// ✅ Leads do E-book
export const getEbookLeads = async () => {
  try {
    const response = await api.get('/ebook/leads');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar leads do Ebook:', error.response || error);
    throw error;
  }
};

// ✅ Leads da Mentoria
export const getMentoriaLeads = async () => {
  try {
    const response = await api.get('/api/mentorialeads');
    if (!Array.isArray(response.data)) {
      throw new Error('❌ Resposta da API não é um array');
    }
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar leads da Mentoria:', error.message || error);
    throw error;
  }
};

// ✅ Atualizar um lead de mentoria
export const updateMentoriaLead = async (id, data) => {
  try {
    const response = await api.put(`/api/mentorialeads/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao atualizar lead da Mentoria:', error.response || error);
    throw error;
  }
};

// ✅ Atualizar status de prospecção
export const toggleProspectStatus = async (id, isProspect) => {
  try {
    const response = await api.patch(`/api/mentorialeads/${id}/prospect`, { isProspect });
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao atualizar status de prospecção:', error.response || error);
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

// ✅ Templates de E-mail
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
