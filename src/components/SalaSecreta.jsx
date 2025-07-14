import React, { useState } from 'react';
import api from '../services/api';

const SalaSecreta = () => {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [acceptEmail, setAcceptEmail] = useState(false);
  const [acceptWhatsApp, setAcceptWhatsApp] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.name || !formData.email || !formData.whatsapp) {
      setError('Por favor, preencha todos os campos.');
      setIsSubmitting(false);
      return;
    }

    if (!acceptEmail || !acceptWhatsApp) {
      setError('Você precisa aceitar os termos para continuar.');
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post('/send/sala-secreta', formData);
      alert('✅ Inscrição realizada com sucesso!');
      setFormData({ name: '', email: '', whatsapp: '' });
      setAcceptEmail(false);
      setAcceptWhatsApp(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao realizar inscrição.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = acceptEmail && acceptWhatsApp;

  return (
    <section className="py-20 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-md mx-auto bg-[#151515]/80 border border-purple-500/20 rounded-3xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">🔒 Sala Secreta MQA</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
            required
          />
          <input
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp (com DDD)"
            value={formData.whatsapp}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
            required
          />

          {/* CHECKBOX TERMOS */}
          <div className="text-left text-sm text-gray-300 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={acceptEmail}
                onChange={() => setAcceptEmail(!acceptEmail)}
                className="accent-purple-500"
              />
              <span>Autorizo o envio de e-mails com informações e novidades</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={acceptWhatsApp}
                onChange={() => setAcceptWhatsApp(!acceptWhatsApp)}
                className="accent-purple-500"
              />
              <span>Autorizo o envio de mensagens via WhatsApp</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={`w-full py-3 rounded-md font-semibold text-white shadow-lg transition 
              ${canSubmit ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:brightness-110' : 'bg-gray-600 cursor-not-allowed'}`}
          >
            {isSubmitting ? 'Enviando...' : 'Garantir Minha Vaga'}
          </button>

          {error && <p className="text-red-400 mt-4">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default SalaSecreta;
