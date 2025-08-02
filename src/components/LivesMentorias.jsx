// Lives & Mentorias Page (FINAL)
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarCheck } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const options = [
  {
    label: 'Live Gratuita',
    value: 'live',
    image: '/assets/img/1.png',
    glow: 'shadow-[0_0_60px_rgba(34,197,94,0.5)]',
    ctaText: '👉 Quero participar da Live Gratuita',
    description: `Talvez ninguém veja, mas por dentro você sente que algo se perdeu. O que antes te definia agora parece distante, confusa ou quebrada.

O que você vai viver nessa live:
• Sensação de vazio após o divórcio.
• Como reconstruir sua identidade.
• Caminho possível de reconstrução.
Duração: 1h a 1h30
Valor: Gratuito`
  },
  {
    label: 'Sala Secreta',
    value: 'sala',
    image: '/assets/img/2.png',
    glow: 'shadow-[0_0_60px_rgba(59,130,246,0.5)]',
    ctaText: '🔒 Quero minha vaga na Sala Secreta',
    description: `Encontro ao vivo, íntimo e transformador para quem carrega dores silenciosas após o divórcio.

O que acontece:
• Entenda por que ainda dói.
• Aprenda a reconstruir com base nas fases do luto.
• Espaço seguro e acolhedor.
Duração: 1h30 a 2h
Valor: R$ 47,60`
  },
  {
    label: 'Mentoria em Grupo',
    value: 'grupo',
    image: '/assets/img/3.png',
    glow: 'shadow-[0_0_60px_rgba(250,204,21,0.5)]',
    ctaText: '✍️ Quero descobrir meu arquétipo',
    description: `Mentoria em Grupo MQA: "Os Arquétipos do Divórcio"
Descubra como sua dor se manifesta e qual o caminho ideal de reconstrução.

O que você vai aprender:
• Identificar seu arquétipo dominante.
• Entender padrões e crenças.
• Plano de reconstrução emocional.
Formato: 4 encontros online semanais.
Valor: R$ 297,80 ou 3x de R$ 99,80`
  },
  {
    label: 'Mentoria Individual',
    value: 'individual',
    image: '/assets/img/4.png',
    glow: 'shadow-[0_0_60px_rgba(239,68,68,0.5)]',
    ctaText: '🗝️ Quero um plano só meu',
    description: `Mentoria 1:1 com Thaís Rosa – Uma jornada de reconstrução feita só para você.

O que acontece:
• Escuta sem julgamentos.
• Diagnóstico emocional personalizado.
• Plano de reconstrução de rotina, autoestima e vida.
Formato: 4 encontros online + suporte via WhatsApp.
Valor: R$ 2.997,80 ou 3x de R$ 999,80`
  }
];

const LivesMentorias = () => {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', selectedOption: '' });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCTAClick = (value) => {
    setFormData((prev) => ({ ...prev, selectedOption: value }));
    setSelectedCard(null);
    setTimeout(() => {
      document.getElementById('mentoria-form').scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.name || !formData.email || !formData.selectedOption) {
      setError('Preencha todos os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/api/send/mentoria`, formData);
      alert('Formulário enviado com sucesso!');
    } catch (err) {
      setError('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-red-500">Transforme Sua Vida Após o Divórcio</h2>
<p className="text-lg md:text-xl text-gray-300 mb-8">Participe das Lives & Mentorias Exclusivas com Thaís Rosa</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {options.map((opt, i) => (
            <div
              key={i}
              className={`relative rounded-2xl ${opt.glow} transition shadow-xl flex items-center justify-center h-[28rem] overflow-hidden cursor-pointer`}
              onClick={() => setSelectedCard(opt)}
            >
              <img src={opt.image} alt={opt.label} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black/40 border border-purple-500/30 text-purple-300 text-base md:text-lg font-semibold p-4 rounded-xl flex items-center gap-3 shadow-md mb-8 text-left"
        >
          <FaCalendarCheck className="text-pink-400 text-2xl" />
          <p className="leading-snug">Escolha abaixo o tipo de encontro e receba o link após o pagamento.</p>
        </motion.div>

        <form id="mentoria-form" onSubmit={handleSubmit} className="space-y-4 text-white text-left bg-[#151515]/80 border border-purple-500/20 rounded-3xl shadow-[0_0_35px_rgba(128,90,213,0.5)] p-6 max-w-md mx-auto">
          <input name="name" type="text" placeholder="Nome" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30" required />
          <input name="email" type="email" placeholder="E-mail" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30" required />
          <input name="whatsapp" type="text" placeholder="WhatsApp (opcional)" value={formData.whatsapp} onChange={handleChange} className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30" />
          <select name="selectedOption" value={formData.selectedOption} onChange={handleChange} className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30" required>
            <option value="">Selecione o tipo de encontro</option>
            {options.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}
          </select>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-md font-semibold text-white shadow-lg transition bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:brightness-110">{isSubmitting ? 'Enviando...' : 'Participar agora'}</button>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </form>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4" onClick={() => setSelectedCard(null)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#1e1e28] max-w-2xl w-full p-6 rounded-xl shadow-xl text-white overflow-y-auto max-h-[80vh]">
              <h3 className="text-2xl font-bold mb-4">{selectedCard.label}</h3>
              <p className="text-gray-300 whitespace-pre-line">{selectedCard.description}</p>
              <button onClick={() => handleCTAClick(selectedCard.value)} className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-md text-white font-semibold hover:brightness-110">{selectedCard.ctaText}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LivesMentorias;
