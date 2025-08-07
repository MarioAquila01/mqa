// src/components/Admin/LeadTable.jsx
import React from 'react';

const LeadTable = ({ leads, selectedLeads, setSelectedLeads, toggleProspect, setEditingLead }) => {
  const handleSelect = (leadId) => {
    const updated = new Set(selectedLeads);
    if (updated.has(leadId)) {
      updated.delete(leadId);
    } else {
      updated.add(leadId);
    }
    setSelectedLeads(updated);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white border-separate border-spacing-y-1">
        <thead>
          <tr className="bg-gray-800 text-purple-300">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">E-mail</th>
            <th className="px-4 py-2">Etapa</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Data do Evento</th>
            <th className="px-4 py-2">Prospectável</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="bg-gray-800 border-t border-purple-800">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedLeads.has(lead._id)}
                  onChange={() => handleSelect(lead._id)}
                />
              </td>
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.email}</td>
              <td className="px-4 py-2 capitalize">{lead.selectedOption || '-'}</td>
              <td className="px-4 py-2">{lead.isProspect ? 'Prospecção' : '-'}</td>
              <td className="px-4 py-2">{lead.eventDate || '-'}</td>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={lead.isProspect}
                  onChange={() => toggleProspect(lead._id)}
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => setEditingLead(lead)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-center text-white">
        Página 1 de 1
      </div>
    </div>
  );
};

export default LeadTable;
