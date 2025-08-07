import React, { useState, useEffect } from 'react';

const EmailEditor = ({
  selectedEmail,
  setSelectedEmail,
  emailTemplates,
  updateEmailTemplate,
  sendEmail,
  selectedLeads,
  leads,
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (selectedEmail) {
      setSubject(selectedEmail.subject || '');
      setBody(selectedEmail.body || '');
    }
  }, [selectedEmail]);

  const handleUpdate = async () => {
    if (!selectedEmail) return;
    await updateEmailTemplate(selectedEmail.type, { subject, body });
    alert('Template atualizado com sucesso!');
  };

  const handleSend = async () => {
    if (!selectedEmail) return;
    if (selectedLeads.size === 0) {
      alert('Selecione ao menos um lead para enviar o e-mail.');
      return;
    }

    const selectedEmails = leads
      .filter((lead) => selectedLeads.has(lead._id))
      .map((lead) => lead.email);

    await sendEmail({
      type: selectedEmail.type,
      subject,
      body,
      recipients: selectedEmails,
    });

    alert('E-mails enviados com sucesso!');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 text-white">
      <h3 className="text-xl font-bold mb-4">Editor de E-mails</h3>

      <div className="mb-4">
        <label className="block mb-1">Selecionar Template:</label>
        <select
          className="p-2 rounded bg-gray-700 text-white w-full"
          onChange={(e) => {
            const template = emailTemplates.find((t) => t.type === e.target.value);
            setSelectedEmail(template || null);
          }}
          value={selectedEmail?.type || ''}
        >
          <option value="">Selecione um template</option>
          {emailTemplates.map((template) => (
            <option key={template.type} value={template.type}>
              {template.type}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Assunto:</label>
        <input
          className="p-2 w-full rounded bg-gray-700 text-white"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Corpo do E-mail:</label>
        <textarea
          className="p-2 w-full h-40 rounded bg-gray-700 text-white"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div className="flex gap-4 justify-end">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Salvar Template
        </button>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
        >
          Enviar E-mail
        </button>
      </div>
    </div>
  );
};

export default EmailEditor;
