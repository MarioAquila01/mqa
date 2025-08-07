import { useEffect, useState } from 'react';
import axios from 'axios';

// Hook personalizado para buscar templates de e-mail
export const useEmailTemplates = () => {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('Prerendering detectado, pulando fetch.');
      return;
    }

    const fetchTemplates = async (retries = 3, delay = 1000) => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com';
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

  return { emailTemplates, error };
};
