// src/hooks/useEmailTemplates.js
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const useEmailTemplates = () => {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com';

  /**
   * 🔹 Buscar templates no backend
   */
  const fetchTemplates = useCallback(async (retries = 3, delay = 1000) => {
    if (typeof window === 'undefined') return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${apiUrl}/admin/email-templates`, { timeout: 3000 });
      if (Array.isArray(response.data)) {
        setEmailTemplates(response.data);
      } else {
        console.warn('⚠️ Resposta inesperada da API (templates não são array):', response.data);
        setEmailTemplates([]);
      }
    } catch (err) {
      console.error(`❌ Erro ao buscar templates (${retries} tentativas restantes):`, err.message);
      if (retries > 0) {
        setTimeout(() => fetchTemplates(retries - 1, delay), delay);
      } else {
        setError('Erro ao carregar templates de e-mail.');
      }
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  /**
   * 🔹 Atualizar template no backend
   */
  const updateEmailTemplate = useCallback(
    async (type, data) => {
      if (!type) throw new Error('Tipo do template é obrigatório para atualização.');

      try {
        const response = await axios.put(`${apiUrl}/admin/email-templates/${type}`, data);
        setEmailTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template.type === type ? { ...template, ...data } : template
          )
        );
        return response.data;
      } catch (err) {
        console.error('❌ Erro ao atualizar template:', err.response?.data || err.message);
        throw err;
      }
    },
    [apiUrl]
  );

  /**
   * 🔹 Enviar e-mail rápido (sem salvar no banco)
   */
  const sendEmailQuick = useCallback(
    async ({ subject, body, recipients }) => {
      if (!subject || !body || !Array.isArray(recipients) || recipients.length === 0) {
        throw new Error('Assunto, corpo e lista de destinatários são obrigatórios.');
      }

      try {
        const res = await axios.post(`${apiUrl}/admin/send-email-quick`, {
          subject,
          body,
          recipients,
        });
        return res.data;
      } catch (err) {
        console.error('❌ Erro ao enviar e-mail rápido:', err.response?.data || err.message);
        throw err;
      }
    },
    [apiUrl]
  );

  return {
    emailTemplates,
    loading,
    error,
    fetchTemplates,
    updateEmailTemplate,
    sendEmailQuick,
  };
};

export default useEmailTemplates;
