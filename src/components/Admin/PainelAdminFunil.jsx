import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

// Constantes
const ETAPAS = ['live', 'sala', 'grupo', 'individual'];
const STATUS_OPTIONS = ['all', 'interesse', 'pago'];
const LEADS_PER_PAGE = 10;

// Reducer para filtros
const initialFilterState = {
  etapaFilter: 'all',
  statusFilter: 'all',
  searchTerm: '',
  prospectFilter: 'all',
  eventDateFilter: 'all',
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ETAPA_FILTER':
      return { ...state, etapaFilter: action.payload };
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_PROSPECT_FILTER':
      return { ...state, prospectFilter: action.payload };
    case 'SET_EVENT_DATE_FILTER':
      return { ...state, eventDateFilter: action.payload };
    default:
      return state;
  }
};

const PainelAdminFunil = () => {
  const [leads, setLeads] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [editingLead, setEditingLead] = useState(null);
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);

  const navigate = useNavigate();

  // Busca de leads e templates
  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('Prerendering detectado, pulando fetch.');
      return;
    }

    const fetchData = async (retries = 3, delay = 1000) => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com';
        console.log('📡 Tentando buscar dados da API:', apiUrl);

        // Buscar leads
        const leadsResponse = await axios.get(`${apiUrl}/admin/ebook-leads`, { timeout: 10000 });
        console.log('✅ Leads recebidos:', leadsResponse.data);
        setLeads(
          Array.isArray(leadsResponse.data)
            ? leadsResponse.data.map(lead => ({ ...lead, isProspect: lead.isProspect || false, eventDate: lead.eventDate || '' }))
            : []
        );

        // Buscar templates
        const templatesResponse = await axios.get(`${apiUrl}/admin/email-templates`, { timeout: 10000 });
        console.log('✅ Templates recebidos:', templatesResponse.data);
        setEmailTemplates(templatesResponse.data.filter(t => t.type.startsWith('live_')));
      } catch (error) {
        console.error('❌ Erro ao buscar dados:', error.message, error.response?.data);
        if (retries > 0) {
          console.log(`Tentando novamente em ${delay}ms... (${retries} tentativas restantes)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchData(retries - 1, delay * 2);
        }
        setError(`Não foi possível carregar os dados. Detalhes: ${error.message}`);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Exportar leads para Excel
  const exportToExcel = () => {
    const exportData = filteredLeads.map(lead => ({
      Nome: lead.name,
      Email: lead.email,
      Etapa: lead.selectedOption || '-',
      Status: lead.status || '-',
      Prospectável: lead.isProspect ? 'Sim' : 'Não',
      'Data do Evento': lead.eventDate || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
    XLSX.writeFile(workbook, `leads_export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Manipulação de e-mails
  const handleEmailChange = (field, value) => {
    setSelectedEmail(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEmailTemplate = async () => {
    if (!selectedEmail) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com'}/admin/email-templates/update`, {
        type: selectedEmail.type,
        data: {
          subject: selectedEmail.subject,
          preheader: selectedEmail.preheader,
          body: selectedEmail.body,
          placeholders: selectedEmail.placeholders
        }
      });
      setEmailTemplates(prev =>
        prev.map(t => (t.type === selectedEmail.type ? selectedEmail : t))
      );
      alert('Template atualizado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao salvar template:', error.message);
      setError('Erro ao salvar template.');
    }
  };

  const handleSendEmail = async () => {
    if (!selectedEmail) {
      setError('Selecione um e-mail para enviar.');
      return;
    }
    if (!selectedEmail.subject || !selectedEmail.body || !selectedEmail.placeholders.link) {
      setError('Assunto, corpo e link do e-mail são obrigatórios.');
      return;
    }
    const leadsToSend = leads.filter(
      lead => selectedLeads.has(lead.id) && lead.selectedOption === 'live'
    );
    if (leadsToSend.length === 0) {
      setError('Nenhum lead na etapa "live" selecionado para envio.');
      return;
    }
    try {
      console.log('📧 Enviando e-mail:', selectedEmail, 'para leads:', leadsToSend);
      await axios.post(`${import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com'}/admin/send-email`, {
        type: selectedEmail.type,
        leads: leadsToSend
      });
      alert(`E-mails disparados para ${leadsToSend.length} leads.`);
      setSelectedLeads(new Set());
      setSelectedEmail(null);
      setError(null);
    } catch (error) {
      console.error('❌ Erro ao enviar e-mails:', error.message);
      setError('Erro ao enviar e-mails.');
    }
  };

  // Seleção de leads
  const toggleLeadSelection = (leadId) => {
    setSelectedLeads(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(leadId)) {
        newSelection.delete(leadId);
      } else {
        newSelection.add(leadId);
      }
      return newSelection;
    });
  };

  // Edição de leads
  const handleEditLead = (lead) => {
    setEditingLead({ ...lead });
  };

  const handleSaveLead = async () => {
    if (!editingLead.name || !editingLead.email) {
      setError('Nome e e-mail são obrigatórios.');
      return;
    }
    try {
      console.log('Salvando lead:', editingLead);
      await axios.put(`${import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com'}/admin/ebook-leads/${editingLead.id}`, editingLead);
      setLeads(prev =>
        prev.map(lead => (lead.id === editingLead.id ? { ...editingLead } : lead))
      );
      setEditingLead(null);
      setError(null);
      alert('Lead atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar lead:', error.message);
      setError('Erro ao atualizar lead.');
    }
  };

  // Marcar/desmarcar lead como prospectável
  const toggleProspect = async (leadId) => {
    try {
      const updatedLead = leads.find(lead => lead.id === leadId);
      const newProspectStatus = !updatedLead.isProspect;
      console.log('Atualizando prospecção do lead:', leadId, newProspectStatus);
      await axios.patch(`${import.meta.env.VITE_API_URL || 'https://api-mqa.onrender.com'}/admin/ebook-leads/${leadId}`, { isProspect: newProspectStatus });
      setLeads(prev =>
        prev.map(lead =>
          lead.id === leadId ? { ...lead, isProspect: newProspectStatus } : lead
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status de prospecção:', error.message);
      setError('Erro ao atualizar status de prospecção.');
    }
  };

  // Filtragem de leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchEtapa = filterState.etapaFilter === 'all' || lead.selectedOption === filterState.etapaFilter;
      const matchStatus = filterState.statusFilter === 'all' || lead.status === filterState.statusFilter;
      const matchProspect = filterState.prospectFilter === 'all' || lead.isProspect === (filterState.prospectFilter === 'prospect');
      const matchSearch =
        lead.name.toLowerCase().includes(filterState.searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(filterState.searchTerm.toLowerCase());
      const matchEventDate = filterState.eventDateFilter === 'all' || lead.eventDate === filterState.eventDateFilter;
      return matchEtapa && matchStatus && matchProspect && matchSearch && matchEventDate;
    });
  }, [leads, filterState]);

  // Paginação
  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * LEADS_PER_PAGE;
    return filteredLeads.slice(start, start + LEADS_PER_PAGE);
  }, [filteredLeads, page]);

  // Obter datas de eventos únicas
  const eventDates = useMemo(() => {
    const dates = new Set(leads.map(lead => lead.eventDate).filter(date => date));
    return ['all', ...Array.from(dates).sort()];
  }, [leads]);

  // Renderização dos filtros
  const renderFilters = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={filterState.etapaFilter}
        onChange={e => dispatch({ type: 'SET_ETAPA_FILTER', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white text-base"
      >
        <option value="all">Todas as Etapas</option>
        {ETAPAS.map(et => (
          <option key={et} value={et}>
            {et.toUpperCase()}
          </option>
        ))}
      </select>
      <select
        value={filterState.statusFilter}
        onChange={e => dispatch({ type: 'SET_STATUS_FILTER', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white text-base"
      >
        {STATUS_OPTIONS.map(status => (
          <option key={status} value={status}>
            {status === 'all' ? 'Todos os Status' : status.toUpperCase()}
          </option>
        ))}
      </select>
      <select
        value={filterState.prospectFilter}
        onChange={e => dispatch({ type: 'SET_PROSPECT_FILTER', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white text-base"
      >
        <option value="all">Todos os Prospectos</option>
        <option value="prospect">Prospectáveis</option>
        <option value="non-prospect">Não Prospectáveis</option>
      </select>
      <select
        value={filterState.eventDateFilter}
        onChange={e => dispatch({ type: 'SET_EVENT_DATE_FILTER', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white text-base"
      >
        <option value="all">Todas as Datas</option>
        {eventDates.filter(date => date !== 'all').map(date => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Buscar por nome ou e-mail"
        value={filterState.searchTerm}
        onChange={e => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white text-base w-full md:w-auto"
      />
      <button
        onClick={() => setSelectedEmail(emailTemplates[0] || null)}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-base font-semibold"
      >
        Editar E-mails (Live)
      </button>
      <button
        onClick={exportToExcel}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base font-semibold"
      >
        Exportar para Excel
      </button>
    </div>
  );

  // Renderização do editor de e-mails
  const renderEmailEditor = () => selectedEmail && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl text-white max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4 text-white">Editar E-mail: {selectedEmail.type.replace('live_', '')}</h3>
        <select
          value={selectedEmail.type}
          onChange={e => setSelectedEmail(emailTemplates.find(t => t.type === e.target.value))}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        >
          {emailTemplates.map(template => (
            <option key={template.type} value={template.type}>
              {template.type.replace('live_', '')}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Assunto"
          value={selectedEmail.subject}
          onChange={e => handleEmailChange('subject', e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="Pré-cabeçalho"
          value={selectedEmail.preheader}
          onChange={e => handleEmailChange('preheader', e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <textarea
          placeholder="Corpo do E-mail"
          rows={10}
          value={selectedEmail.body}
          onChange={e => handleEmailChange('body', e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="Data (ex.: 10/08/2025)"
          value={selectedEmail.placeholders.date}
          onChange={e => handleEmailChange('placeholders', { ...selectedEmail.placeholders, date: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="Horário (ex.: 20:00)"
          value={selectedEmail.placeholders.time}
          onChange={e => handleEmailChange('placeholders', { ...selectedEmail.placeholders, time: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="Link de Acesso"
          value={selectedEmail.placeholders.link}
          onChange={e => handleEmailChange('placeholders', { ...selectedEmail.placeholders, link: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <div className="flex gap-4">
          <button
            onClick={handleSaveEmailTemplate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base font-semibold"
          >
            Salvar Template
          </button>
          <button
            onClick={handleSendEmail}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-base font-semibold"
          >
            Enviar E-mail
          </button>
          <button
            onClick={() => setSelectedEmail(null)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-base font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );

  // Renderização do formulário de edição de leads
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
        <select
          value={editingLead.selectedOption}
          onChange={e => setEditingLead({ ...editingLead, selectedOption: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        >
          {ETAPAS.map(et => (
            <option key={et} value={et}>
              {et.toUpperCase()}
            </option>
          ))}
        </select>
        <select
          value={editingLead.status}
          onChange={e => setEditingLead({ ...editingLead, status: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        >
          {STATUS_OPTIONS.slice(1).map(status => (
            <option key={status} value={status}>
              {status.toUpperCase()}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Data do Evento (ex.: 10/08/2025)"
          value={editingLead.eventDate}
          onChange={e => setEditingLead({ ...editingLead, eventDate: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={editingLead.isProspect}
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

  // Renderização da tabela de leads
  const renderLeadTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#1e1e28] border border-purple-500">
        <thead>
          <tr>
            <th className="p-3 border-b text-white text-base font-semibold">
              <input
                type="checkbox"
                onChange={e => {
                  const newSelection = new Set();
                  if (e.target.checked) {
                    paginatedLeads.forEach(lead => newSelection.add(lead.id));
                  }
                  setSelectedLeads(newSelection);
                }}
                checked={paginatedLeads.every(lead => selectedLeads.has(lead.id))}
              />
            </th>
            <th className="p-3 border-b text-white text-base font-semibold">Nome</th>
            <th className="p-3 border-b text-white text-base font-semibold">E-mail</th>
            <th className="p-3 border-b text-white text-base font-semibold">Etapa</th>
            <th className="p-3 border-b text-white text-base font-semibold">Status</th>
            <th className="p-3 border-b text-white text-base font-semibold">Data do Evento</th>
            <th className="p-3 border-b text-white text-base font-semibold">Prospectável</th>
            <th className="p-3 border-b text-white text-base font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLeads.map((lead) => (
            <tr key={lead.id} className="text-center border-b border-purple-500">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedLeads.has(lead.id)}
                  onChange={() => toggleLeadSelection(lead.id)}
                />
              </td>
              <td className="p-3 text-white text-base">{lead.name}</td>
              <td className="p-3 text-white text-base">{lead.email}</td>
              <td className="p-3 text-white text-base">{lead.selectedOption || '-'}</td>
              <td className="p-3 text-white text-base">{lead.status || '-'}</td>
              <td className="p-3 text-white text-base">{lead.eventDate || '-'}</td>
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={lead.isProspect}
                  onChange={() => toggleProspect(lead.id)}
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
      <h2 className="text-4xl font-bold mb-6 text-white">Painel de Funil de Vendas</h2>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate('/admin-dashboard/ebook-leads')}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-base font-semibold"
        >
          Ver Leads do E-book
        </button>
        <button
          onClick={() => navigate('/admin-dashboard/pagamentos')}
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 text-base font-semibold"
        >
          Ver Pagamentos (Hotmart)
        </button>
      </div>
      {error && <p className="text-red-500 mb-4 text-base">{error}</p>}
      {renderFilters()}
      {renderEmailEditor()}
      {renderEditForm()}
      {loading ? (
        <p className="text-white text-base">Carregando leads...</p>
      ) : filteredLeads.length === 0 ? (
        <p className="text-white text-base">Nenhum lead encontrado.</p>
      ) : (
        renderLeadTable()
      )}
    </div>
  );
};

export default PainelAdminFunil;