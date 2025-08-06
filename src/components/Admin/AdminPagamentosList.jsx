import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackToDashboardButton from '../Admin/BackToDashboardButton';

// Constantes
const PAYMENTS_PER_PAGE = 10;
const FILTER_OPTIONS = {
  productOptions: ['all', 'produto1', 'produto2', 'produto3'], // Ajuste conforme produtos reais
  prospectOptions: ['all', 'prospect', 'non-prospect'],
};

// Reducer para filtros
const initialFilterState = {
  searchTerm: '',
  productFilter: 'all',
  prospectFilter: 'all',
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_PRODUCT_FILTER':
      return { ...state, productFilter: action.payload };
    case 'SET_PROSPECT_FILTER':
      return { ...state, prospectFilter: action.payload };
    default:
      return state;
  }
};

const AdminPagamentosList = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedPayments, setSelectedPayments] = useState(new Set());
  const [editingPayment, setEditingPayment] = useState(null);
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);

  const navigate = useNavigate();

  // Busca de pagamentos
  useEffect(() => {
    const fetchPagamentos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/pagamentos`);
        setPagamentos(
          Array.isArray(response.data)
            ? response.data.map(pag => ({ ...pag, isProspect: pag.isProspect || false }))
            : []
        );
      } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
        setError('Não foi possível carregar os pagamentos. Tente novamente.');
        setPagamentos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPagamentos();
  }, []);

  // Exportação para CSV
  const exportCSV = () => {
    if (filteredPayments.length === 0) {
      setError('Nenhum pagamento para exportar.');
      return;
    }
    const csvContent = [
      ['Nome', 'E-mail', 'Produto', 'Transação', 'Data', 'Prospectável'],
      ...filteredPayments.map(pag => [
        pag.name || '',
        pag.email || '',
        pag.productName || '',
        pag.transaction || '',
        new Date(pag.purchaseDate).toLocaleString(),
        pag.isProspect ? 'Sim' : 'Não',
      ]),
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'pagamentos_hotmart.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Seleção de pagamentos
  const togglePaymentSelection = (paymentId) => {
    setSelectedPayments(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(paymentId)) {
        newSelection.delete(paymentId);
      } else {
        newSelection.add(paymentId);
      }
      return newSelection;
    });
  };

  // Edição de pagamentos
  const handleEditPayment = (payment) => {
    setEditingPayment({ ...payment });
  };

  const handleSavePayment = async () => {
    if (!editingPayment.name || !editingPayment.email) {
      setError('Nome e e-mail são obrigatórios.');
      return;
    }
    try {
      // Simulação de atualização na API
      // await axios.put(`${import.meta.env.VITE_API_URL}/pagamentos/${editingPayment.id}`, editingPayment);
      setPagamentos(prev =>
        prev.map(pag => (pag.id === editingPayment.id ? { ...editingPayment } : pag))
      );
      setEditingPayment(null);
      setError(null);
      alert('Pagamento atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar pagamento:', error);
      setError('Erro ao atualizar pagamento.');
    }
  };

  // Marcar/desmarcar pagamento como prospectável
  const toggleProspect = async (paymentId) => {
    try {
      const updatedPayment = pagamentos.find(pag => pag.id === paymentId);
      const newProspectStatus = !updatedPayment.isProspect;
      // Simulação de atualização na API
      // await axios.patch(`${import.meta.env.VITE_API_URL}/pagamentos/${paymentId}`, { isProspect: newProspectStatus });
      setPagamentos(prev =>
        prev.map(pag =>
          pag.id === paymentId ? { ...pag, isProspect: newProspectStatus } : pag
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status de prospecção:', error);
      setError('Erro ao atualizar status de prospecção.');
    }
  };

  // Filtragem de pagamentos
  const filteredPayments = useMemo(() => {
    return pagamentos.filter(pag => {
      const matchProduct = filterState.productFilter === 'all' || pag.productName === filterState.productFilter;
      const matchProspect = filterState.prospectFilter === 'all' || pag.isProspect === (filterState.prospectFilter === 'prospect');
      const matchSearch =
        pag.name.toLowerCase().includes(filterState.searchTerm.toLowerCase()) ||
        pag.email.toLowerCase().includes(filterState.searchTerm.toLowerCase());
      return matchProduct && matchProspect && matchSearch;
    });
  }, [pagamentos, filterState]);

  // Paginação
  const paginatedPayments = useMemo(() => {
    const start = (page - 1) * PAYMENTS_PER_PAGE;
    return filteredPayments.slice(start, start + PAYMENTS_PER_PAGE);
  }, [filteredPayments, page]);

  // Renderização dos filtros
  const renderFilters = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={filterState.productFilter}
        onChange={e => dispatch({ type: 'SET_PRODUCT_FILTER', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      >
        {FILTER_OPTIONS.productOptions.map(option => (
          <option key={option} value={option}>
            {option === 'all' ? 'Todos os Produtos' : option}
          </option>
        ))}
      </select>

      <select
        value={filterState.prospectFilter}
        onChange={e => dispatch({ type: 'SET_PROSPECT_FILTER', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      >
        {FILTER_OPTIONS.prospectOptions.map(option => (
          <option key={option} value={option}>
            {option === 'all' ? 'Todos os Prospectos' : option === 'prospect' ? 'Prospectáveis' : 'Não Prospectáveis'}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Buscar por nome ou e-mail"
        value={filterState.searchTerm}
        onChange={e => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white w-full md:w-auto"
      />

      <button
        onClick={exportCSV}
        className="px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-md text-white font-semibold hover:brightness-110"
      >
        Exportar CSV
      </button>
    </div>
  );

  // Renderização do formulário de edição
  const renderEditForm = () => editingPayment && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl text-white max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Editar Pagamento</h3>
        <input
          type="text"
          placeholder="Nome"
          value={editingPayment.name}
          onChange={e => setEditingPayment({ ...editingPayment, name: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={editingPayment.email}
          onChange={e => setEditingPayment({ ...editingPayment, email: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Produto"
          value={editingPayment.productName}
          onChange={e => setEditingPayment({ ...editingPayment, productName: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Transação"
          value={editingPayment.transaction}
          onChange={e => setEditingPayment({ ...editingPayment, transaction: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={editingPayment.isProspect}
            onChange={() => setEditingPayment({ ...editingPayment, isProspect: !editingPayment.isProspect })}
            className="mr-2"
          />
          <label>Prospectável</label>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSavePayment}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Salvar
          </button>
          <button
            onClick={() => setEditingPayment(null)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  // Renderização da tabela de pagamentos
  const renderPaymentTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#1e1e28] border border-purple-500">
        <thead>
          <tr>
            <th className="p-3 border-b">
              <input
                type="checkbox"
                onChange={e => {
                  const newSelection = new Set();
                  if (e.target.checked) {
                    paginatedPayments.forEach(pag => newSelection.add(pag.id));
                  }
                  setSelectedPayments(newSelection);
                }}
                checked={paginatedPayments.every(pag => selectedPayments.has(pag.id))}
              />
            </th>
            <th className="p-3 border-b">Nome</th>
            <th className="p-3 border-b">E-mail</th>
            <th className="p-3 border-b">Produto</th>
            <th className="p-3 border-b">Transação</th>
            <th className="p-3 border-b">Data</th>
            <th className="p-3 border-b">Prospectável</th>
            <th className="p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPayments.map(pag => (
            <tr key={pag.id} className="text-center border-b border-purple-500">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedPayments.has(pag.id)}
                  onChange={() => togglePaymentSelection(pag.id)}
                />
              </td>
              <td className="p-3">{pag.name}</td>
              <td className="p-3">{pag.email}</td>
              <td className="p-3">{pag.productName || '-'}</td>
              <td className="p-3">{pag.transaction || '-'}</td>
              <td className="p-3">{new Date(pag.purchaseDate).toLocaleString()}</td>
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={pag.isProspect}
                  onChange={() => toggleProspect(pag.id)}
                />
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleEditPayment(pag)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
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
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-white">
          Página {page} de {Math.ceil(filteredPayments.length / PAYMENTS_PER_PAGE)}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page * PAYMENTS_PER_PAGE >= filteredPayments.length}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <BackToDashboardButton />
      <h2 className="text-3xl font-bold mb-4 text-white">Pagamentos (Hotmart)</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {renderFilters()}
      {renderEditForm()}

      {loading ? (
        <p className="text-white">Carregando...</p>
      ) : filteredPayments.length === 0 ? (
        <p className="text-white">Nenhum pagamento encontrado.</p>
      ) : (
        renderPaymentTable()
      )}
    </div>
  );
};

export default AdminPagamentosList;