// src/hooks/useLeads.js
import { useEffect, useState } from 'react';
import {
  getMentoriaLeads,
  updateMentoriaLead,
  toggleProspectStatus,
  sendEmailQuick
} from '../services/api';

// Marca "Novo" se o lead foi criado nas últimas N horas (padrão 48h)
const isWithinHours = (dateString, hours = 48) => {
  if (!dateString) return false;
  const d = new Date(dateString);
  const now = new Date();
  return now - d <= hours * 60 * 60 * 1000;
};

export const useLeads = (filters = {}) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const fetchLeads = async (retries = 2, delay = 800) => {
    setLoading(true);
    setError(null);
    try {
      // monta query ?from=YYYY-MM-DD&to=YYYY-MM-DD (se backend aceitar)
      const params = new URLSearchParams();
      if (filters.from) params.set('from', filters.from);
      if (filters.to)   params.set('to',   filters.to);

      const data = await getMentoriaLeads(params.toString() ? `?${params}` : '');

      if (!Array.isArray(data)) {
        throw new Error('Resposta da API não é um array');
      }

      const normalized = data
        .map(lead => ({
          ...lead,
          isProspect: lead.isProspect || lead.prospect || false,
          eventDate:  lead.eventDate  || '',
          createdAt:  lead.createdAt  || lead.created_at || null,
        }))
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .map(l => ({ ...l, isNew: isWithinHours(l.createdAt, 48) }));

      setLeads(normalized);
    } catch (err) {
      console.error('Erro ao buscar leads:', err);
      if (retries > 0) {
        await new Promise(r => setTimeout(r, delay));
        return fetchLeads(retries - 1, delay * 2);
      }
      setError(`Não foi possível carregar os leads. Detalhes: ${err.message}`);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.from, filters.to]);

  const updateLead = async (lead) => {
    try {
      await updateMentoriaLead(lead._id, lead);
      setLeads(prev => prev.map(l => (l._id === lead._id ? { ...l, ...lead } : l)));
      // opcional: toast/alert
    } catch (err) {
      console.error('Erro ao atualizar lead:', err);
      setError('Erro ao atualizar lead.');
    }
  };

  const toggleProspect = async (leadId) => {
    try {
      const current = leads.find(l => l._id === leadId);
      if (!current) return;
      const next = !current.isProspect;
      await toggleProspectStatus(leadId, next);
      setLeads(prev => prev.map(l => (l._id === leadId ? { ...l, isProspect: next } : l)));
    } catch (err) {
      console.error('Erro ao alternar prospect:', err);
      setError('Erro ao alternar prospect.');
    }
  };

  const sendQuickEmailToLeads = async ({ subject, body, recipients }) => {
    try {
      await sendEmailQuick({ subject, body, recipients });
      // opcional: toast/alert
    } catch (err) {
      console.error('Erro ao enviar e-mail rápido:', err);
      setError('Erro ao enviar e-mail rápido.');
    }
  };

  return { leads, loading, error, updateLead, toggleProspect, sendQuickEmailToLeads };
};
