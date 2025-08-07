import * as XLSX from 'xlsx';
import { MentoriaLead } from '../types';

export const exportToExcel = (leads: MentoriaLead[]) => {
  const data = leads.map(lead => ({
    Nome: lead.name,
    Email: lead.email,
    Etapa: lead.etapa,
    Status: lead.status,
    'Data do Evento': lead.eventDate || '-',
    Prospectável: lead.isProspect ? 'Sim' : 'Não'
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads Mentoria');
  XLSX.writeFile(workbook, `leads_mentoria_${new Date().toISOString().split('T')[0]}.xlsx`);
};
    