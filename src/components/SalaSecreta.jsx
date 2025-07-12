import React, { useState } from 'react';
import api from '../services/api';  // ✅ Caminho certo

const SalaSecreta = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

    try {
      await api.post('/send/sala-secreta', formData);
      alert('✅ Inscrição realizada com sucesso!');
      setFormData({ name: '', email: '', whatsapp: '' });  // Limpa o formulário
    } catch (err) {
      console.error('Erro ao enviar:', err);
      const errorMessage = err.response?.data?.message || 'Erro ao realizar inscrição. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Sala Secreta MQA</h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-3 rounded-md border border-gray-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 rounded-md border border-gray-300"
          required
        />
        <input
          type="tel"
          name="whatsapp"
          placeholder="WhatsApp (com DDD)"
          value={formData.whatsapp}
          onChange={handleInputChange}
          className="w-full p-3 rounded-md border border-gray-300"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 disabled:bg-purple-300"
        >
          {isSubmitting ? 'Enviando...' : 'Garantir Minha Vaga'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </section>
  );
};

export default SalaSecreta;
