// src/components/Admin/LeadTable.jsx
import React from 'react';

const HOURS_NEW = 48; // ajuste se quiser outra janela p/ "Novo"

const formatDateTime = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  // Ex.: 13/08/2025 19:42
  return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
};

const isWithinHours = (iso, hours = HOURS_NEW) => {
  if (!iso) return false;
  const created = new Date(iso).getTime();
  const now = Date.now();
  return now - created <= hours * 60 * 60 * 1000;
};

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

  // 🔒 Código pronto para ativar link de WhatsApp no futuro
  const toWaLink = (phone) => {
    if (!phone) return null;
    let digits = String(phone).replace(/\D+/g, '');
    if (digits.length === 11) digits = '55' + digits; // prefixa DDI Brasil
    return `https://wa.me/${digits}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white border-separate border-spacing-y-1">
        <thead>
          <tr className="bg-gray-800 text-purple-300">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">E-mail</th>
            <th className="px-4 py-2">WhatsApp</th>
            <th className="px-4 py-2">Etapa</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Data do Evento</th>
            <th className="px-4 py-2">Prospectável</th>
            <th className="px-4 py-2">Cadastrado em</th> {/* NOVO */}
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const createdAt = lead.createdAt || lead.created_at || null;
            const novo = isWithinHours(createdAt);

            return (
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

                {/* 🔹 Apenas mostra número agora */}
                <td className="px-4 py-2">{lead.whatsapp || '-'}</td>

                {/*
                🔓 Para ativar link no futuro, troque a linha acima por:
                <td className="px-4 py-2">
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
                  ) : (
                    '-'
                  )}
                </td>
                */}

                <td className="px-4 py-2 capitalize">{lead.selectedOption || '-'}</td>
                <td className="px-4 py-2">{lead.isProspect ? 'Prospecção' : '-'}</td>
                <td className="px-4 py-2">{lead.eventDate || '-'}</td>

                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={!!lead.isProspect}
                    onChange={() => toggleProspect(lead._id)}
                  />
                </td>

                {/* NOVO: Cadastrado em + badge "Novo" */}
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span>{formatDateTime(createdAt)}</span>
                    {novo && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/30">
                        Novo
                      </span>
                    )}
                  </div>
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
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 text-center text-white">
        Página 1 de 1
      </div>
    </div>
  );
};

export default LeadTable;
