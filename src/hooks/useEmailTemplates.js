import { useEffect, useState } from 'react';
import axios from 'axios';

// Hook personalizado para templates de e-mail
export const useEmailTemplates = () => {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com';

  // Buscar templates ao carregar
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

  // Atualizar um template
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

  // Enviar e-mail em massa
  const sendEmail = async ({ type, subject, body, recipients }) => {
    try {
      await axios.post(`${apiUrl}/admin/send-email`, {
        type,
        subject,
        body,
        recipients,
      });
    } catch (err) {
      console.error('Erro ao enviar e-mail:', err);
      throw err;
    }
  };

  return {
    emailTemplates,
    error,
    updateEmailTemplate,
    sendEmail,
  };
};
