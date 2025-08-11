// src/hooks/useLeads.js
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com';

  /**
   * 🔹 Buscar leads de e-book ou mentoria
   * @param {string} endpoint - Ex: '/admin/ebook-leads' ou '/admin/mentoria-leads'
   */
  const fetchLeads = useCallback(
    async (endpoint = '/admin/ebook-leads', retries = 3, delay = 1000) => {
      if (typeof window === 'undefined') return;
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${apiUrl}${endpoint}`, { timeout: 3000 });
        if (Array.isArray(response.data)) {
          setLeads(response.data);
        } else {
          console.warn('⚠️ Resposta inesperada da API (leads não são array):', response.data);
          setLeads([]);
        }
      } catch (err) {
        console.error(`❌ Erro ao buscar leads (${retries} tentativas restantes):`, err.message);
        if (retries > 0) {
          setTimeout(() => fetchLeads(endpoint, retries - 1, delay), delay);
        } else {
          setError('Erro ao carregar leads.');
        }
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  /**
   * 🔹 Editar lead existente
   */
  const updateLead = useCallback(
    async (id, data, endpoint = '/admin/update-lead') => {
      if (!id) throw new Error('ID do lead é obrigatório para atualização.');

      try {
        const response = await axios.put(`${apiUrl}${endpoint}/${id}`, data);
        setLeads((prevLeads) =>
          prevLeads.map((lead) => (lead._id === id ? { ...lead, ...data } : lead))
        );
        return response.data;
      } catch (err) {
        console.error('❌ Erro ao atualizar lead:', err.response?.data || err.message);
        throw err;
      }
    },
    [apiUrl]
  );

  /**
   * 🔹 Excluir lead
   */
  const deleteLead = useCallback(
    async (id, endpoint = '/admin/delete-lead') => {
      if (!id) throw new Error('ID do lead é obrigatório para exclusão.');

      try {
        await axios.delete(`${apiUrl}${endpoint}/${id}`);
        setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id));
      } catch (err) {
        console.error('❌ Erro ao excluir lead:', err.response?.data || err.message);
        throw err;
      }
    },
    [apiUrl]
  );

  return {
    leads,
    loading,
    error,
    fetchLeads,
    updateLead,
    deleteLead,
  };
};

export default useLeads;
