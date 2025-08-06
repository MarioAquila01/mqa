// --- 3. COMPONENTE ADMIN PAGAMENTOS LIST ---
// File: src/components/Admin/AdminPagamentosList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPagamentosList = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPagamentos();
  }, []);

  const fetchPagamentos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/pagamentos`);
      setPagamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Pagamentos (Hotmart)</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1e1e28] border border-purple-500">
            <thead>
              <tr>
                <th className="p-3 border-b">Nome</th>
                <th className="p-3 border-b">E-mail</th>
                <th className="p-3 border-b">Produto</th>
                <th className="p-3 border-b">Transação</th>
                <th className="p-3 border-b">Data</th>
              </tr>
            </thead>
            <tbody>
              {pagamentos.map((pag, idx) => (
                <tr key={idx} className="text-center border-b border-purple-500">
                  <td className="p-3">{pag.name}</td>
                  <td className="p-3">{pag.email}</td>
                  <td className="p-3">{pag.productName}</td>
                  <td className="p-3">{pag.transaction}</td>
                  <td className="p-3">{new Date(pag.purchaseDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPagamentosList;