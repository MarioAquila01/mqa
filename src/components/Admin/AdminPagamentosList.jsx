import React, { useEffect, useState } from 'react';
        import { useNavigate } from 'react-router-dom';
        import api from '../../services/api.js';
        import BackToDashboardButton from './BackToDashboardButton';

        const PainelAdminPagamentos = () => {
          const [pagamentos, setPagamentos] = useState([]);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState(null);
          const navigate = useNavigate();

          useEffect(() => {
            if (typeof window === 'undefined') {
              console.log('Prerendering detectado, pulando fetch.');
              return;
            }

            const fetchPagamentos = async (retries = 3, delay = 1000) => {
              setLoading(true);
              setError(null);
              try {
                console.log('📡 Tentando buscar pagamentos da API: https://api-mqa.onrender.com/admin/pagamentos');
                const response = await api.get('/admin/pagamentos', { timeout: 10000 });
                console.log('✅ Pagamentos recebidos:', response.data);
                setPagamentos(Array.isArray(response.data) ? response.data : []);
              } catch (error) {
                console.error('❌ Erro ao buscar pagamentos:', error.message, error.response?.data);
                if (retries > 0) {
                  console.log(`Tentando novamente em ${delay}ms... (${retries} tentativas restantes)`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return fetchPagamentos(retries - 1, delay * 2);
                }
                setError('Não foi possível carregar os pagamentos. Detalhes: ' + error.message);
                setPagamentos([]);
              } finally {
                setLoading(false);
              }
            };
            fetchPagamentos();
          }, []);

          const exportCSV = () => {
            if (pagamentos.length === 0) {
              setError('Nenhum pagamento para exportar.');
              return;
            }
            const csvContent = [
              ['Nome', 'E-mail', 'Produto', 'Transação', 'Data'],
              ...pagamentos.map(p => [
                p.name || '',
                p.email || '',
                p.productName || '',
                p.transaction || '',
                new Date(p.createdAt).toLocaleString('pt-BR')
              ])
            ]
              .map(e => e.join(','))
              .join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'pagamentos.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          };

          return (
            <div className="p-6 bg-gray-900 min-h-screen">
              <BackToDashboardButton />
              <h2 className="text-4xl font-bold mb-6 text-white">Painel de Pagamentos</h2>
              {error && <p className="text-red-500 mb-4 text-base">{error}</p>}
              <button
                onClick={exportCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base font-semibold mb-6"
              >
                Exportar CSV
              </button>
              {loading ? (
                <p className="text-white text-base">Carregando...</p>
              ) : pagamentos.length === 0 ? (
                <p className="text-white text-base">Nenhum pagamento encontrado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-[#1e1e28] border border-purple-500">
                    <thead>
                      <tr>
                        <th className="p-3 border-b text-white text-base font-semibold">Nome</th>
                        <th className="p-3 border-b text-white text-base font-semibold">E-mail</th>
                        <th className="p-3 border-b text-white text-base font-semibold">Produto</th>
                        <th className="p-3 border-b text-white text-base font-semibold">Transação</th>
                        <th className="p-3 border-b text-white text-base font-semibold">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagamentos.map(pagamento => (
                        <tr key={pagamento.id} className="text-center border-b border-purple-500">
                          <td className="p-3 text-white text-base">{pagamento.name}</td>
                          <td className="p-3 text-white text-base">{pagamento.email}</td>
                          <td className="p-3 text-white text-base">{pagamento.productName}</td>
                          <td className="p-3 text-white text-base">{pagamento.transaction}</td>
                          <td className="p-3 text-white text-base">{new Date(pagamento.createdAt).toLocaleString('pt-BR')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        };

        export default PainelAdminPagamentos;