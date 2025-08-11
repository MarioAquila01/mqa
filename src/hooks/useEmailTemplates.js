// src/hooks/useEmailTemplates.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useEmailTemplates = () => {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com';

  // 🔹 Buscar templates ao carregar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fetchTemplates = async (retries = 3, delay = 1000) => {
      try {
        const response = await axios.get(`${apiUrl}/admin/email-templates`, { timeout: 1000 });
        setEmailTemplates(response.data);
      } catch (err) {
        console.error('Erro ao buscar templates:', err);
        if (retries > 0) {
          setTimeout(() => fetchTemplates(retries - 1, delay), delay);
        } else {
          setError('Erro ao carregar templates de e-mail.');
        }
      }
    };

    fetchTemplates();
  }, []);

  // 🔹 Atualizar template salvo no Mongo
  const updateEmailTemplate = async (type, data) => {
    try {
      const response = await axios.put(`${apiUrl}/admin/email-templates/${type}`, data);
      setEmailTemplates((prevTemplates) =>
        prevTemplates.map((template) =>
          template.type === type ? { ...template, ...data } : template
        )
      );
      return response.data;
    } catch (err) {
      console.error('Erro ao atualizar template:', err);
      throw err;
    }
  };

  /**
   * 🔹 Enviar e-mail rápido (sem salvar no banco)
   * @param {Object} params
   * @param {string} params.subject - Assunto do e-mail
   * @param {string} params.body - Corpo HTML do e-mail
   * @param {string[]} params.recipients - Lista de e-mails dos destinatários
   */
  const sendEmailQuick = async ({ subject, body, recipients }) => {
    try {
      await axios.post(`${apiUrl}/admin/send-email-quick`, {
        subject,
        body,
        recipients,
      });
    } catch (err) {
      console.error('Erro ao enviar e-mail rápido:', err);
      throw err;
    }
  };

  return {
    emailTemplates,
    error,
    updateEmailTemplate,
    sendEmailQuick, // 🚀 Novo método para e-mails diretos
  };
};
