import React, { useState, useEffect } from 'react';
import { getEmailTemplates, updateEmailTemplate, sendEmailToLeads } from '../../services/adminApi';

const AdminTemplateEditor = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    preheader: '',
    body: '',
    placeholders: {
      date: '',
      time: '',
      link: ''
    }
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      const data = await getEmailTemplates();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setFormData({
      subject: template.subject,
      preheader: template.preheader,
      body: template.body,
      placeholders: template.placeholders
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.placeholders) {
      setFormData(prev => ({ ...prev, placeholders: { ...prev.placeholders, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    await updateEmailTemplate(selectedTemplate.type, formData);
    alert('Template atualizado com sucesso!');
  };

  const handleSend = async () => {
    await sendEmailToLeads(selectedTemplate.type);
    alert('E-mails disparados!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Editor de Templates de E-mail</h2>

      <div className="flex gap-4 mb-6">
        {templates.map((template) => (
          <button
            key={template.type}
            onClick={() => handleSelectTemplate(template)}
            className={`px-4 py-2 rounded-md ${selectedTemplate?.type === template.type ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            {template.type.toUpperCase()}
          </button>
        ))}
      </div>

      {selectedTemplate && (
        <div className="space-y-4">
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Assunto do E-mail"
            className="w-full p-2 border rounded"
          />
          <input
            name="preheader"
            value={formData.preheader}
            onChange={handleChange}
            placeholder="Pré-cabeçalho (opcional)"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Corpo do E-mail"
            rows={10}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-4">
            <input name="date" value={formData.placeholders.date} onChange={handleChange} placeholder="Data" className="p-2 border rounded w-full" />
            <input name="time" value={formData.placeholders.time} onChange={handleChange} placeholder="Horário" className="p-2 border rounded w-full" />
            <input name="link" value={formData.placeholders.link} onChange={handleChange} placeholder="Link" className="p-2 border rounded w-full" />
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Salvar Alterações</button>
            <button onClick={handleSend} className="px-4 py-2 bg-green-500 text-white rounded-md">Enviar para Leads</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTemplateEditor;
