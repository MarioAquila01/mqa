import axios from 'axios';

// 🔒 URL fixa da API no Render
const API_BASE_URL = 'https://api-mqa.onrender.com/admin';

// ✅ API GET: Buscar Templates de E-mail
export const getEmailTemplates = async () => {
  const response = await axios.get(`${API_BASE_URL}/email-templates`);
  return response.data;
};

// ✅ API POST: Atualizar Template de E-mail
export const updateEmailTemplate = async (type, data) => {
  await axios.post(`${API_BASE_URL}/email-templates/update`, { type, ...data });
};

// ✅ API POST: Disparar E-mails para Leads (do tipo selecionado)
export const sendEmailToLeads = async (type) => {
  await axios.post(`${API_BASE_URL}/send-email`, { type });
};
