import React, { useState } from 'react';
import api from '../services/api';

const SalaSecreta = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    ebookOption: '',
    indicadoNome: '',
    indicadoWhatsapp: ''
  });
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

    const { name, email, whatsapp, ebookOption, indicadoNome, indicadoWhatsapp } = formData;

    if (!name || !email || !whatsapp || !ebookOption) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    if (ebookOption === 'ambos' && (!indicadoNome || !indicadoWhatsapp)) {
      setError('Para receber os dois e-books, indique uma pessoa com nome e WhatsApp.');
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
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        ebookOption: '',
        indicadoNome: '',
        indicadoWhatsapp: ''
      });
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
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-4">📘 E-book Renascimento em 7 Dias</h2>

        {/* Blocos coloridos representando as capas */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <div className="w-40 h-56 bg-pink-400 rounded-xl flex items-center justify-center font-bold">
            Mulher
          </div>
          <div className="w-40 h-56 bg-blue-400 rounded-xl flex items-center justify-center font-bold">
            Homem
          </div>
        </div>

        <p className="text-lg mb-8">
          Adquira seu e-book gratuito fazendo o cadastro abaixo e receba diretamente no seu WhatsApp 📲
        </p>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="space-y-4 text-white text-left bg-[#151515]/80 border border-purple-500/20 rounded-3xl shadow-xl p-6">
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

          <select
            name="ebookOption"
            value={formData.ebookOption}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
            required
          >
            <option value="">Escolha seu e-book</option>
            <option value="mulher">E-book para Mulheres</option>
            <option value="homem">E-book para Homens</option>
            <option value="ambos">Quero os dois (indique 1 pessoa)</option>
          </select>

          {formData.ebookOption === 'ambos' && (
            <>
              <input
                type="text"
                name="indicadoNome"
                placeholder="Nome da pessoa indicada"
                value={formData.indicadoNome}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
              />
              <input
                type="tel"
                name="indicadoWhatsapp"
                placeholder="WhatsApp da pessoa indicada"
                value={formData.indicadoWhatsapp}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
              />
            </>
          )}

          {/* TERMOS */}
          <div className="text-sm text-gray-300 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={acceptEmail}
                onChange={() => setAcceptEmail(!acceptEmail)}
                className="accent-purple-500"
              />
              <span>Autorizo o envio de e-mails com novidades</span>
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
            {isSubmitting ? 'Enviando...' : 'Garantir Meu E-book'}
          </button>

          {error && <p className="text-red-400 mt-4">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default SalaSecreta;
