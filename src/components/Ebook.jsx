import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa';
import { sendEbook } from '../services/api'; // ✅ função correta

const Ebook = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    ebookOption: '',
    indicadoNome: '',
    indicadoWhatsapp: ''
  });
  const [acceptEmail, setAcceptEmail] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { name, email, ebookOption, indicadoNome, indicadoWhatsapp } = formData;

    if (!name || !email || !ebookOption) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    if (ebookOption === 'ambos' && (!indicadoNome || !indicadoWhatsapp)) {
      setError('Para receber os dois e-books, indique uma pessoa com nome e WhatsApp.');
      setIsSubmitting(false);
      return;
    }

    if (!acceptEmail) {
      setError('Você precisa aceitar o envio por e-mail para continuar.');
      setIsSubmitting(false);
      return;
    }

    try {
      await sendEbook(formData); // ✅ chamada correta
      alert('✅ Inscrição realizada com sucesso! Verifique seu e-mail.');
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        ebookOption: '',
        indicadoNome: '',
        indicadoWhatsapp: ''
      });
      setAcceptEmail(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao realizar inscrição.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-4">E-book Renascimento em 7 Dias</h2>

        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <img
            src="/assets/img/e-book-mulher.png"
            alt="E-book Mulher"
            className="w-40 h-56 object-cover rounded-xl shadow-md"
          />
          <img
            src="/assets/img/e-book-homem.png"
            alt="E-book Homem"
            className="w-40 h-56 object-cover rounded-xl shadow-md"
          />
        </div>

        <p className="text-lg mb-2">
          Adquira seu e-book gratuito fazendo o cadastro abaixo e receba diretamente no seu e-mail 📩
        </p>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black/40 border border-purple-500/30 text-purple-300 text-base md:text-lg font-semibold p-4 rounded-xl flex items-center gap-3 shadow-md mb-8 text-left"
        >
          <FaGift className="text-pink-400 text-2xl" />
          <p className="leading-snug">
            Selecione “Quero os dois” e indique alguém para receber as duas versões do e-book!
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-white text-left bg-[#151515]/80 border border-purple-500/20 rounded-3xl shadow-xl p-6"
        >
          <input
            name="name"
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
            required
          />

          <input
            name="whatsapp"
            type="text"
            placeholder="WhatsApp"
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
                name="indicadoNome"
                type="text"
                placeholder="Nome da pessoa indicada"
                value={formData.indicadoNome}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
              />
              <input
                name="indicadoWhatsapp"
                type="tel"
                placeholder="WhatsApp da pessoa indicada"
                value={formData.indicadoWhatsapp}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
              />
            </>
          )}

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
          </div>

          <button
            type="submit"
            disabled={!acceptEmail || isSubmitting}
            className={`w-full py-3 rounded-md font-semibold text-white shadow-lg transition 
              ${acceptEmail
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:brightness-110'
                : 'bg-gray-600 cursor-not-allowed'
              }`}
          >
            {isSubmitting ? 'Enviando...' : 'Garantir Meu E-book'}
          </button>

          {error && <p className="text-red-400 mt-4">{error}</p>}
        </form>
      </div>
            {/* VÍDEO EXPLICANDO O PROPÓSITO */}
      <div className="mt-24 max-w-5xl mx-auto">
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border border-purple-500/20">
          <iframe
            src="https://www.youtube.com/embed/uhWFqzYEREI"
            title="Propósito do Livro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-64 md:h-[400px]"
          ></iframe>
        </div>
      </div>

    </section>
  );
};

export default Ebook;
