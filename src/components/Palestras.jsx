import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContato } from '../services/api';

const Palestras = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    evento: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await sendContato(formData);
      setSuccess(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        evento: '',
        mensagem: ''
      });
    } catch (err) {
      setError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="palestras" className="py-20 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-6">📣 Palestras e Eventos</h2>
          <p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Experiências transformadoras para grupos e organizações
          </p>
        </motion.div>

        {/* Cards de eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {[
            {
              title: 'Workshop: Renascimento Pessoal',
              date: '15 de Agosto, 2025 • Online',
              desc: 'Workshop interativo com ferramentas para reconstruir sua vida com propósito.',
            },
            {
              title: 'Palestra: Amor-Próprio',
              date: '23 de Setembro, 2025 • São Paulo',
              desc: 'Imersão nos fundamentos do amor-próprio após rejeições emocionais.',
            },
            {
              title: 'Retiro: Cura e Transformação',
              date: '10-12 de Outubro, 2025 • Campos do Jordão',
              desc: 'Final de semana imersivo para reconectar-se em um ambiente acolhedor.',
            },
            {
              title: 'Palestra Corporativa',
              date: 'Agenda Aberta • Presencial ou Online',
              desc: 'Palestras personalizadas sobre inteligência emocional nas empresas.',
            }
          ].map((event, i) => (
            <motion.div
              key={i}
              className="bg-[#151515]/80 border border-purple-500/20 rounded-xl p-6 shadow-lg hover:shadow-purple-500/30 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-1 text-white">{event.title}</h3>
              <p className="text-sm text-purple-300 mb-3">{event.date}</p>
              <p className="text-gray-200 mb-4">{event.desc}</p>
              <a href="#" className="text-purple-300 font-medium hover:underline">Mais informações</a>
            </motion.div>
          ))}
        </div>

        {/* Formulário de interesse */}
        <div className="max-w-3xl mx-auto bg-[#151515]/80 border border-purple-500/20 rounded-xl shadow-xl p-8">
          <h3 className="text-2xl font-semibold text-center text-white mb-6">Interesse em um evento?</h3>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome completo"
              required
              className="bg-black/30 p-3 rounded-md border border-purple-500/30"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              required
              className="bg-black/30 p-3 rounded-md border border-purple-500/30"
            />
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Telefone"
              className="bg-black/30 p-3 rounded-md border border-purple-500/30"
            />
            <select
              name="evento"
              value={formData.evento}
              onChange={handleChange}
              className="bg-black/30 p-3 rounded-md border border-purple-500/30"
            >
              <option value="">Selecione um evento</option>
              <option value="Workshop">Workshop: Renascimento Pessoal</option>
              <option value="Amor-Proprio">Palestra: Amor-Próprio</option>
              <option value="Retiro">Retiro: Cura e Transformação</option>
              <option value="Corporativa">Palestra Corporativa</option>
              <option value="Outro">Outro</option>
            </select>
            <textarea
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              rows="4"
              placeholder="Mensagem"
              className="md:col-span-2 bg-black/30 p-3 rounded-md border border-purple-500/30"
            />
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:brightness-110 transition"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
              {success && <p className="text-green-400 mt-4">Mensagem enviada com sucesso!</p>}
              {error && <p className="text-red-400 mt-4">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Palestras;
