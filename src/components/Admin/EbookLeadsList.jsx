import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EbookLeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ebook/leads`);
      setLeads(response.data);
    } catch (error) {
      console.error('Erro ao buscar leads do Ebook:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const csvContent = [
      ['Nome', 'E-mail', 'E-book', 'Indicação Nome', 'Indicação WhatsApp'],
      ...leads.map(lead => [
        lead.name,
        lead.email,
        lead.ebookChoice,
        lead.indicationName || '',
        lead.indicationWhatsApp || ''
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "ebook_leads.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Leads do E-book</h2>
      <button
        onClick={exportCSV}
        className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-md text-white font-semibold hover:brightness-110"
      >
        Exportar CSV
      </button>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1e1e28] border border-purple-500">
            <thead>
              <tr>
                <th className="p-3 border-b">Nome</th>
                <th className="p-3 border-b">E-mail</th>
                <th className="p-3 border-b">E-book</th>
                <th className="p-3 border-b">Indicação Nome</th>
                <th className="p-3 border-b">Indicação WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, idx) => (
                <tr key={idx} className="text-center border-b border-purple-500">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.ebookChoice}</td>
                  <td className="p-3">{lead.indicationName || '-'}</td>
                  <td className="p-3">{lead.indicationWhatsApp || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EbookLeadsList;
