import React, { useEffect, useState } from 'react';

const STATUS_OPTIONS = ['interesse', 'pago'];

const LeadEditForm = ({ editingLead, setEditingLead, updateLead }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    etapa: '',
    status: '',
    eventDate: '',
  });

  useEffect(() => {
    if (editingLead) {
      setFormData({
        name: editingLead.name || '',
        email: editingLead.email || '',
        whatsapp: editingLead.whatsapp || '',
        etapa: editingLead.etapa || editingLead.selectedOption || '',
        status: editingLead.status || '',
        eventDate: editingLead.eventDate || '',
      });
    }
  }, [editingLead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingLead) return;
    await updateLead({ ...editingLead, ...formData });
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
        <input
          name="etapa"
          value={formData.etapa}
          onChange={handleChange}
          placeholder="Etapa (live, sala, grupo, individual)"
          className="p-2 bg-gray-700 rounded text-white"
        />
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
        <input
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          placeholder="Data do Evento (ex: 2025-08-06)"
          className="p-2 bg-gray-700 rounded text-white"
        />
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
