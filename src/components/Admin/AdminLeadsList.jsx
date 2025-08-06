import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [etapa, setEtapa] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, [etapa, status]);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/ebook-leads`);
      let filtered = Array.isArray(response.data) ? response.data : [];

      if (etapa !== 'all') {
        filtered = filtered.filter(lead => lead.selectedOption === etapa);
      }
      if (status !== 'all') {
        filtered = filtered.filter(lead => lead.status === status);
      }

      setLeads(filtered);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const csvContent = [
      ['Nome', 'E-mail', 'Etapa', 'Status'],
      ...leads.map(lead => [lead.name, lead.email, lead.selectedOption || '-', lead.status || '-'])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Leads</h2>
      
      <div className="flex gap-4 mb-4">
        <select value={etapa} onChange={(e) => setEtapa(e.target.value)} className="p-2 rounded">
          <option value="all">Todas as Etapas</option>
          <option value="live">Live</option>
          <option value="sala-secreta">Sala Secreta</option>
          <option value="grupo">Sala em Grupo</option>
          <option value="individual">Sala Individual</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 rounded">
          <option value="all">Todos os Status</option>
          <option value="interesse">Interesse</option>
          <option value="pago">Pago</option>
        </select>

        <button onClick={exportCSV} className="px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-md text-white font-semibold hover:brightness-110">
          Exportar CSV
        </button>
      </div>

      {loading ? (
        <p>Carregando leads...</p>
      ) : leads.length === 0 ? (
        <p>Nenhum lead encontrado.</p>
      ) : (
        <table className="min-w-full bg-gray-800 text-white border border-purple-500">
          <thead>
            <tr>
              <th className="p-3 border-b">Nome</th>
              <th className="p-3 border-b">E-mail</th>
              <th className="p-3 border-b">Etapa</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, idx) => (
              <tr key={idx} className="border-b border-purple-500">
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.selectedOption || '-'}</td>
                <td className="p-3">{lead.status || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminLeadsList;
