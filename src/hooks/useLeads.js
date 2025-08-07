// src/hooks/useLeads.js
import { useEffect, useState } from 'react';
import {
  getMentoriaLeads,
  updateMentoriaLead,
  toggleProspectStatus
} from '../services/api';

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('Prerendering detectado, pulando fetch.');
      return;
    }

    const fetchLeads = async (retries = 3, delay = 1000) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMentoriaLeads();

        if (!Array.isArray(data)) {
          throw new Error('Resposta da API não é um array');
        }

        setLeads(data.map(lead => ({
          ...lead,
          isProspect: lead.isProspect || false,
          eventDate: lead.eventDate || ''
        })));
      } catch (err) {
        console.error('Erro ao buscar leads:', err.message);
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchLeads(retries - 1, delay * 2);
        }
        setError(`Não foi possível carregar os leads da mentoria. Detalhes: ${err.message}`);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const updateLead = async (lead) => {
    try {
      await updateMentoriaLead(lead._id, lead);
      setLeads(prev => prev.map(l => (l._id === lead._id ? { ...lead } : l)));
      alert('Lead atualizado com sucesso.');
    } catch (err) {
      console.error('Erro ao atualizar lead:', err.message);
      setError('Erro ao atualizar lead.');
    }
  };

  const toggleProspect = async (leadId) => {
    try {
      const updatedLead = leads.find(lead => lead._id === leadId);
      if (!updatedLead) return;
      const newProspectStatus = !updatedLead.isProspect;
      await toggleProspectStatus(leadId, newProspectStatus);
      setLeads(prev =>
        prev.map(lead =>
          lead._id === leadId ? { ...lead, isProspect: newProspectStatus } : lead
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar status de prospecção:', err.message);
      setError('Erro ao atualizar status de prospecção.');
    }
  };

  return { leads, loading, error, updateLead, toggleProspect };
};
