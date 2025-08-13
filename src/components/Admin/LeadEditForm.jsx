// src/components/Admin/LeadEditForm.jsx
import React, { useEffect, useMemo, useState } from 'react';

const STATUS_OPTIONS = ['interesse', 'pago'];
const ETAPA_OPTIONS = ['live', 'sala', 'grupo', 'individual'];

const fmtDateTimeBR = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
};

const LeadEditForm = ({ editingLead, setEditingLead, updateLead }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    etapa: '',
    status: '',
    eventDate: '',
    isProspect: false,
    selectedOption: '', // espelha etapa p/ compatibilidade
  });

  // Valores derivados/ajustados do lead selecionado
  const createdAt = useMemo(
    () => editingLead?.createdAt || editingLead?.created_at || null,
    [editingLead]
  );

  useEffect(() => {
    if (editingLead) {
      const etapaValue = editingLead.etapa || editingLead.selectedOption || '';
      setFormData({
        name: editingLead.name || '',
        email: editingLead.email || '',
        whatsapp: editingLead.whatsapp || '',
        etapa: etapaValue,
        selectedOption: etapaValue,
        status: editingLead.status || '',
        eventDate: (editingLead.eventDate || '').toString().slice(0, 10), // normaliza p/ YYYY-MM-DD
        isProspect: !!(editingLead.isProspect ?? editingLead.prospect ?? false),
      });
    }
  }, [editingLead]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Quando mudar etapa, espelha em selectedOption
    if (name === 'etapa') {
      setFormData((prev) => ({
        ...prev,
        etapa: value,
        selectedOption: value,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingLead) return;

    // Monta payload consistente com o que o resto do app usa
    const payload = {
      ...editingLead,
      ...formData,
      // garante compatibilidade de nomes usados em outras telas
      selectedOption: formData.etapa || formData.selectedOption || '',
      prospect: formData.isProspect,   // se backend usa "prospect"
      isProspect: formData.isProspect, // se frontend usa "isProspect"
      eventDate: formData.eventDate || '', // YYYY-MM-DD
    };

    await updateLead(payload);
    setEditingLead(null);
  };

  if (!editingLead) return null;

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-800 rounded-lg text-white">
      <h3 className="text-2xl font-bold mb-4">Editar Lead</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome"
          className="p-2 bg-gray-700 rounded text-white"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail"
          className="p-2 bg-gray-700 rounded text-white"
        />

        <input
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp"
          className="p-2 bg-gray-700 rounded text-white"
        />

        {/* Etapa (select) */}
        <select
          name="etapa"
          value={formData.etapa}
          onChange={handleChange}
          className="p-2 bg-gray-700 rounded text-white"
        >
          <option value="">Etapa</option>
          {ETAPA_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 bg-gray-700 rounded text-white"
        >
          <option value="">Status</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Data do Evento */}
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="p-2 bg-gray-700 rounded text-white"
        />

        {/* Prospectável */}
        <label className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            name="isProspect"
            checked={!!formData.isProspect}
            onChange={handleChange}
          />
          <span>Prospectável</span>
        </label>

        {/* Somente leitura: criado em */}
        {createdAt && (
          <div className="md:col-span-2 text-sm text-gray-300">
            Cadastrado em: <span className="text-gray-100">{fmtDateTimeBR(createdAt)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={() => setEditingLead(null)}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default LeadEditForm;
