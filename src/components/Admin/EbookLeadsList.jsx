// src/components/Admin/EbookLeadsList.jsx
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEbookLeads } from '../../services/api.js';
import api from '../../services/api.js'; // ✅ para PUT/PATCH/POST
import BackToDashboardButton from '../Admin/BackToDashboardButton';

const LEADS_PER_PAGE = 10;
const FILTER_OPTIONS = {
  prospectOptions: ['all', 'prospect', 'non-prospect'],
};

const initialFilterState = {
  prospectFilter: 'all',
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROSPECT_FILTER':
      return { ...state, prospectFilter: action.payload };
    default:
      return state;
  }
};

const EbookLeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [editingLead, setEditingLead] = useState(null);
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);

  const navigate = useNavigate();

  // 🔒 pronto pra upgrade de link de WhatsApp
  const toWaLink = (phone) => {
    if (!phone) return null;
    let digits = String(phone).replace(/\D+/g, '');
    if (digits.length === 11) digits = '55' + digits; // DDI Brasil
    return `https://wa.me/${digits}`;
  };

  useEffect(() => {
    const fetchLeads = async (retries = 3, delay = 1000) => {
      setLoading(true);
      setError(null);
      try {
        console.log('📡 Buscando leads da API: /admin/ebook-leads');
        const data = await getEbookLeads();
        setLeads(
          Array.isArray(data)
            ? data.map(lead => ({
                ...lead,
                isProspect: lead.isProspect || false,
                indicationName: lead.indicationName || '',
                indicationWhatsapp: lead.indicationWhatsapp || '',
              }))
            : []
        );
      } catch (error) {
        console.error('❌ Erro ao buscar leads do Ebook:', error.message, error.response?.data);
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchLeads(retries - 1, delay * 2);
        }
        setError('Não foi possível carregar os leads. Detalhes: ' + error.message);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const exportCSV = () => {
    if (filteredLeads.length === 0) {
      setError('Nenhum lead para exportar.');
      return;
    }
    const csvContent = [
      ['Nome', 'E-mail', 'WhatsApp', 'E-book', 'Indicação Nome', 'Indicação WhatsApp', 'Prospectável'],
      ...filteredLeads.map(lead => [
        lead.name || '',
        lead.email || '',
        lead.whatsapp || '',
        lead.ebookOption || '',
        lead.indicationName || '',
        lead.indicationWhatsapp || '',
        lead.isProspect ? 'Sim' : 'Não',
      ]),
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ebook_leads.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleLeadSelection = (leadId) => {
    setSelectedLeads(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(leadId)) newSelection.delete(leadId);
      else newSelection.add(leadId);
      return newSelection;
    });
  };

  const handleEditLead = (lead) => {
    setEditingLead({ ...lead });
  };

  const handleSaveLead = async () => {
    if (!editingLead.name || !editingLead.email) {
      setError('Nome e e-mail são obrigatórios.');
      return;
    }
    try {
      await api.put(`/admin/ebook-leads/${editingLead._id}`, editingLead); // ✅ _id
      setLeads(prev => prev.map(lead => (lead._id === editingLead._id ? { ...editingLead } : lead)));
      setEditingLead(null);
      setError(null);
      alert('Lead atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar lead:', error.message);
      setError('Erro ao atualizar lead.');
    }
  };

  const toggleProspect = async (leadId) => {
    try {
      const updatedLead = leads.find(lead => lead._id === leadId);
      if (!updatedLead) return;
      const newProspectStatus = !updatedLead.isProspect;
      await api.patch(`/admin/ebook-leads/${leadId}`, { isProspect: newProspectStatus });
      setLeads(prev =>
        prev.map(lead =>
          lead._id === leadId ? { ...lead, isProspect: newProspectStatus } : lead
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status de prospecção:', error.message);
      setError('Erro ao atualizar status de prospecção.');
    }
  };

  const handleSendEmails = async () => {
    const leadsToSend = leads.filter(lead => selectedLeads.has(lead._id)); // ✅ _id
    if (leadsToSend.length === 0) {
      setError('Nenhum lead selecionado para envio.');
      return;
    }
    if (window.confirm(`Enviar e-mails para ${leadsToSend.length} leads?`)) {
      try {
        await api.post('/admin/send-email', { leads: leadsToSend });
        alert(`E-mails disparados para ${leadsToSend.length} leads`);
        setSelectedLeads(new Set());
      } catch (error) {
        console.error('Erro ao enviar e-mails:', error.message);
        setError('Erro ao enviar e-mails.');
      }
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchProspect =
        filterState.prospectFilter === 'all' ||
        lead.isProspect === (filterState.prospectFilter === 'prospect');
      return matchProspect;
    });
  }, [leads, filterState]);

  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * LEADS_PER_PAGE;
    return filteredLeads.slice(start, start + LEADS_PER_PAGE);
  }, [filteredLeads, page]);

  const renderFilters = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={filterState.prospectFilter}
        onChange={e => dispatch({ type: 'SET_PROSPECT_FILTER', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white text-base"
      >
        {FILTER_OPTIONS.prospectOptions.map(option => (
          <option key={option} value={option}>
            {option === 'all' ? 'Todos os Prospectos' : option === 'prospect' ? 'Prospectáveis' : 'Não Prospectáveis'}
          </option>
        ))}
      </select>
      <button
        onClick={exportCSV}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base font-semibold"
      >
        Exportar CSV
      </button>
      <button
        onClick={handleSendEmails}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-base font-semibold"
      >
        Enviar E-mails
      </button>
    </div>
  );

  const renderEditForm = () => editingLead && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl text-white max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-white">Editar Lead</h3>
        <input
          type="text"
          placeholder="Nome"
          value={editingLead.name}
          onChange={e => setEditingLead({ ...editingLead, name: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={editingLead.email}
          onChange={e => setEditingLead({ ...editingLead, email: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="WhatsApp"
          value={editingLead.whatsapp || ''}
          onChange={e => setEditingLead({ ...editingLead, whatsapp: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="E-book"
          value={editingLead.ebookOption || ''}
          onChange={e => setEditingLead({ ...editingLead, ebookOption: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="Nome da Indicação"
          value={editingLead.indicationName || ''}
          onChange={e => setEditingLead({ ...editingLead, indicationName: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="WhatsApp da Indicação"
          value={editingLead.indicationWhatsapp || ''}
          onChange={e => setEditingLead({ ...editingLead, indicationWhatsapp: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={!!editingLead.isProspect}
            onChange={() => setEditingLead({ ...editingLead, isProspect: !editingLead.isProspect })}
            className="mr-2"
          />
          <label className="text-white text-base">Prospectável</label>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSaveLead}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-base font-semibold"
          >
            Salvar
          </button>
          <button
            onClick={() => setEditingLead(null)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-base font-semibold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  const renderLeadTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#1e1e28] border border-purple-500">
        <thead>
          <tr>
            <th className="p-3 border-b text-white text-base font-semibold">Selecionar</th>
            <th className="p-3 border-b text-white text-base font-semibold">Nome</th>
            <th className="p-3 border-b text-white text-base font-semibold">E-mail</th>
            <th className="p-3 border-b text-white text-base font-semibold">WhatsApp</th> {/* ✅ novo */}
            <th className="p-3 border-b text-white text-base font-semibold">E-book</th>
            <th className="p-3 border-b text-white text-base font-semibold">Indicação Nome</th>
            <th className="p-3 border-b text-white text-base font-semibold">Indicação WhatsApp</th>
            <th className="p-3 border-b text-white text-base font-semibold">Prospectável</th>
            <th className="p-3 border-b text-white text-base font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLeads.map(lead => (
            <tr key={lead._id} className="text-center border-b border-purple-500">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedLeads.has(lead._id)}
                  onChange={() => toggleLeadSelection(lead._id)}
                />
              </td>
              <td className="p-3 text-white text-base">{lead.name}</td>
              <td className="p-3 text-white text-base">{lead.email}</td>

              {/* 🔹 Apenas número agora */}
              <td className="p-3 text-white text-base">{lead.whatsapp || '-'}</td>

              {/*
              🔓 Para ativar link no futuro, troque a célula acima por:
              <td className="p-3 text-white text-base">
                {lead.whatsapp ? (
                  <a
                    href={toWaLink(lead.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                    title={lead.whatsapp}
                  >
                    {lead.whatsapp}
                  </a>
                ) : ('-')}
              </td>
              */}

              <td className="p-3 text-white text-base">{lead.ebookOption || '-'}</td>
              <td className="p-3 text-white text-base">{lead.indicationName || '-'}</td>
              <td className="p-3 text-white text-base">{lead.indicationWhatsapp || '-'}</td>
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={!!lead.isProspect}
                  onChange={() => toggleProspect(lead._id)}
                />
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleEditLead(lead)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-base font-semibold"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 disabled:opacity-50 text-base font-semibold"
        >
          Anterior
        </button>
        <span className="text-white text-base">
          Página {page} de {Math.ceil(filteredLeads.length / LEADS_PER_PAGE)}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page * LEADS_PER_PAGE >= filteredLeads.length}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 disabled:opacity-50 text-base font-semibold"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <BackToDashboardButton />
      <h2 className="text-4xl font-bold mb-6 text-white">Leads do E-book</h2>
      {error && <p className="text-red-500 mb-4 text-base">{error}</p>}
      {renderFilters()}
      {renderEditForm()}
      {loading ? (
        <p className="text-white text-base">Carregando...</p>
      ) : filteredLeads.length === 0 ? (
        <p className="text-white text-base">Nenhum lead encontrado.</p>
      ) : (
        renderLeadTable()
      )}
    </div>
  );
};

export default EbookLeadsList;
