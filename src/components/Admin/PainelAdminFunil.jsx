// src/components/Admin/PainelAdminFunil.jsx
import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import EmailEditor from './EmailEditor';
import LeadEditForm from './LeadEditForm';
import LeadTable from './LeadTable';
import HeaderButtons from './HeaderButtons';

import { useLeads } from '../../hooks/useLeads';
import { useEmailTemplates } from '../../hooks/useEmailTemplates';

const PainelAdminFunil = () => {
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [editingLead, setEditingLead] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // novo estado de filtro de data
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  const { leads, loading, error, updateLead, toggleProspect } = useLeads(dateFilter);
  const { emailTemplates, updateEmailTemplate, sendEmailQuick } = useEmailTemplates();

  useEffect(() => {
    if (emailTemplates.length && !selectedEmail) {
      setSelectedEmail(emailTemplates[0]);
    }
  }, [emailTemplates, selectedEmail]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-white">Painel de Funil de Vendas - Mentoria</h2>

      <HeaderButtons />

      {error && <p className="text-red-500 mb-4 text-base">{error}</p>}

      <Filters
        leads={Array.isArray(leads) ? leads : []}
        setSelectedEmail={setSelectedEmail}
        onDateFilterChange={setDateFilter} // <<<<<<<<<<<<<< conecta filtro de data
      />

      <EmailEditor
        selectedEmail={selectedEmail}
        setSelectedEmail={setSelectedEmail}
        emailTemplates={emailTemplates}
        updateEmailTemplate={updateEmailTemplate}
        sendEmailQuick={sendEmailQuick}
        selectedLeads={selectedLeads}
        leads={Array.isArray(leads) ? leads : []}
      />

      <LeadEditForm
        editingLead={editingLead}
        setEditingLead={setEditingLead}
        updateLead={updateLead}
      />

      {loading ? (
        <p className="text-white text-base">Carregando leads...</p>
      ) : !Array.isArray(leads) || leads.length === 0 ? (
        <p className="text-white text-base">Nenhum lead encontrado.</p>
      ) : (
        <LeadTable
          leads={leads}
          selectedLeads={selectedLeads}
          setSelectedLeads={setSelectedLeads}
          toggleProspect={toggleProspect}
          setEditingLead={setEditingLead}
        />
      )}
    </div>
  );
};

export default PainelAdminFunil;
