import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Constantes
const ETAPAS = ['live', 'sala', 'grupo', 'individual'];
const STATUS_OPTIONS = ['all', 'interesse', 'pago'];
const LEADS_PER_PAGE = 10;

// Modelos de e-mails para a etapa "live"
const EMAIL_TEMPLATES = [
  {
    id: 'confirmation',
    title: 'Confirmação',
    subject: 'Que bom que você se inscreveu 💗',
    preheader: 'Essa live pode ser o começo da sua nova história.',
    body: `Oi, [nome] 💗
Que bom que você se inscreveu. De verdade.
Essa live é um espaço que eu desejei muito ter lá atrás, quando tudo dentro de mim estava confuso, quebrado e em silêncio.
O que sobrou de mim depois do divórcio não foi força. Foi um vazio que ninguém via, mas me consumia.
E é por isso que esse encontro vai além de um conteúdo:
é uma conversa real, entre mulheres que estão se reconstruindo, uma a uma, no seu tempo, do seu jeito.

📍 Detalhes da live
Tema: O que sobrou de mim depois do divórcio
Data: [inserir data]
Horário: [inserir horário]
Duração: 1h a 1h30
Link de acesso: [inserir link]

Estou muito feliz de ter você lá comigo. 💗
Com carinho,
Thaís Rosa
@melhorqueantesoficial`,
    date: '',
    time: '',
    link: '',
  },
  {
    id: 'reminder_3days',
    title: 'Lembrete (3 Dias)',
    subject: 'Faltam 3 dias para o nosso encontro 💗',
    preheader: 'A live que pode virar a chave da sua reconstrução.',
    body: `Oi, [nome] 💗
Faltam 3 dias para a nossa live “O que sobrou de mim depois do divórcio”.
Eu vou te contar como foi o meu processo, como eu mesma me perdi depois da separação e como comecei a juntar os pedaços por dentro.
Vai ser mais do que conteúdo.
Vai ser verdade. E começo.

📍 Guarde essa informação:
Dia: [data]
Hora: [horário]
Link: [link]
Se ainda não anotou, anota. Se quiser, responde esse e-mail com dúvidas.
A gente vai juntas.
Thaís Rosa`,
    date: '',
    time: '',
    link: '',
  },
  {
    id: 'reminder_tomorrow',
    title: 'Lembrete (Amanhã)',
    subject: 'É amanhã 💗',
    preheader: 'Sua vaga tá confirmada e vai ser especial.',
    body: `Oi, [nome],
É amanhã.
Nosso encontro ao vivo. Uma live feita com tudo que eu gostaria de ter ouvido lá atrás, quando me sentia em pedaços e tentava seguir sozinha.
Amanhã, a gente vai falar do que sobra da gente depois que tudo acaba.
Do que quebra. Mas também do que ainda pulsa.

📍Lembrete rápido:
Live: O que sobrou de mim depois do divórcio
🗓️ Data: [inserir]
⏰ Horário: [inserir]
🔗 Link: [inserir link]
Se puder, chega uns minutinhos antes.
Vai ser especial.
Com carinho,
Thaís`,
    date: '',
    time: '',
    link: '',
  },
  {
    id: 'reminder_today',
    title: 'Lembrete (Hoje)',
    subject: 'É hoje. E você não está sozinha 💗',
    preheader: 'Último lembrete antes da live.',
    body: `Oi, [nome],
É hoje.
Hoje a gente vai se encontrar ao vivo pra conversar com verdade sobre o que sobrou de você depois do fim.
Se você sente que ainda está tentando se encontrar…
se tudo parece confuso por dentro…
essa live é seu ponto de partida.

📍 Informações da live:
🗓️ Hoje
⏰ Horário: [inserir]
🔗 Acesso: [link direto]
Eu te espero lá. 💗
Thaís Rosa
@melhorqueantesoficial`,
    date: '',
    time: '',
    link: '',
  },
];

// Reducer para filtros
const initialFilterState = {
  etapaFilter: 'all',
  statusFilter: 'all',
  searchTerm: '',
  prospectFilter: 'all',
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
    default:
      return state;
  }
};

const PainelAdminFunil = () => {
  const [leads, setLeads] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailTemplates, setEmailTemplates] = useState(EMAIL_TEMPLATES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [editingLead, setEditingLead] = useState(null);
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);

  const navigate = useNavigate();

  // Busca de leads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/ebook-leads`);
        setLeads(
          Array.isArray(response.data)
            ? response.data.map(lead => ({ ...lead, isProspect: lead.isProspect || false }))
            : []
        );
      } catch (error) {
        console.error('Erro ao buscar leads:', error);
        setError('Não foi possível carregar os leads. Tente novamente.');
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Manipulação de e-mails
  const handleEmailChange = (field, value) => {
    setEmailTemplates(prev =>
      prev.map(template =>
        template.id === selectedEmail.id ? { ...template, [field]: value } : template
      )
    );
  };

  const handleSendEmail = async () => {
    if (!selectedEmail) {
      setError('Selecione um e-mail para enviar.');
      return;
    }
    if (!selectedEmail.subject || !selectedEmail.body || !selectedEmail.link) {
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
      // Simulação de envio na API
      // await axios.post(`${import.meta.env.VITE_API_URL}/admin/send-emails`, {
      //   leads: leadsToSend,
      //   email: { ...selectedEmail, body: selectedEmail.body.replace('[nome]', '{nome}') }
      // });
      if (window.confirm(`Enviar e-mail "${selectedEmail.title}" para ${leadsToSend.length} leads na etapa "live"?`)) {
        alert(`E-mails disparados para ${leadsToSend.length} leads.`);
        setSelectedLeads(new Set());
        setSelectedEmail(null);
        setError(null);
      }
    } catch (error) {
      console.error('Erro ao enviar e-mails:', error);
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
      // Simulação de atualização na API
      // await axios.put(`${import.meta.env.VITE_API_URL}/admin/ebook-leads/${editingLead.id}`, editingLead);
      setLeads(prev =>
        prev.map(lead => (lead.id === editingLead.id ? { ...editingLead } : lead))
      );
      setEditingLead(null);
      setError(null);
      alert('Lead atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
      setError('Erro ao atualizar lead.');
    }
  };

  // Marcar/desmarcar lead como prospectável
  const toggleProspect = async (leadId) => {
    try {
      const updatedLead = leads.find(lead => lead.id === leadId);
      const newProspectStatus = !updatedLead.isProspect;
      // Simulação de atualização na API
      // await axios.patch(`${import.meta.env.VITE_API_URL}/admin/ebook-leads/${leadId}`, { isProspect: newProspectStatus });
      setLeads(prev =>
        prev.map(lead =>
          lead.id === leadId ? { ...lead, isProspect: newProspectStatus } : lead
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status de prospecção:', error);
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
      return matchEtapa && matchStatus && matchProspect && matchSearch;
    });
  }, [leads, filterState]);

  // Paginação
  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * LEADS_PER_PAGE;
    return filteredLeads.slice(start, start + LEADS_PER_PAGE);
  }, [filteredLeads, page]);

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

      <input
        type="text"
        placeholder="Buscar por nome ou e-mail"
        value={filterState.searchTerm}
        onChange={e => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white text-base w-full md:w-auto"
      />

      <button
        onClick={() => setSelectedEmail(EMAIL_TEMPLATES[0])}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-base font-semibold"
      >
        Editar E-mails (Live)
      </button>
    </div>
  );

  // Renderização do editor de e-mails
  const renderEmailEditor = () => selectedEmail && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl text-white max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4 text-white">Editar E-mail: {selectedEmail.title}</h3>
        <select
          value={selectedEmail.id}
          onChange={e => setSelectedEmail(emailTemplates.find(t => t.id === e.target.value))}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        >
          {emailTemplates.map(template => (
            <option key={template.id} value={template.id}>
              {template.title}
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
          value={selectedEmail.date}
          onChange={e => handleEmailChange('date', e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="Horário (ex.: 20:00)"
          value={selectedEmail.time}
          onChange={e => handleEmailChange('time', e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <input
          type="text"
          placeholder="Link de Acesso"
          value={selectedEmail.link}
          onChange={e => handleEmailChange('link', e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white text-base"
        />
        <div className="flex gap-4">
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