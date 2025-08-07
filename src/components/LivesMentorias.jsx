import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarCheck } from 'react-icons/fa';
import { sendMentoria } from '../services/api';

// Define options array with details for each mentorship/live option
const options = [
  {
    label: 'Live Gratuita',
    value: 'live',
    image: '/assets/img/1.png',
    glowColor: 'bg-green-500/20',
    ctaText: '👉 Quero participar da Live Gratuita',
    hotmartLink: '',
    description: `LIVE GRATUITA – O que sobrou de mim depois do divórcio?
Talvez ninguém veja, mas por dentro você sente que algo se perdeu.
O que antes te definia agora parece distante, confusa ou quebrada.
Se você já tentou seguir em frente, mas sente que ainda não se encontrou… essa conversa é pra você.
______________

O que eu vou te contar nessa live:
* Minha história, como a minha identidade se desmontou depois do divórcio, e como comecei a reconstruir, passo a passo.
* O que eu aprendi sobre o luto que ninguém vê.
* Quais  foram os primeiros gestos que realmente me ajudaram a voltar pra mim.
* E por que hoje eu consigo olhar pra tudo isso sem vergonha, sem culpa e com uma força que antes eu nem sabia que existia.

Duração aproximada: 1h30
Essa live é o primeiro passo pra lembrar que você não acabou com o fim do relacionamento.
Você está começando.`,
  },
  {
    label: 'Sala Secreta',
    value: 'sala',
    image: '/assets/img/2.png',
    glowColor: 'bg-blue-500/20',
    ctaText: '🔒 Quero minha vaga na Sala Secreta',
    hotmartLink: 'https://pay.hotmart.com/N101188112B',
    description: `Você merece um espaço seguro para começar de novo.
A Sala Secreta MQA é um encontro ao vivo, íntimo e transformador, feito pra você que está carregando dores silenciosas desde o fim do seu relacionamento.
Talvez você esteja tentando ser forte por fora, mas por dentro ainda está perdida, cansada, presa ao que passou — ou ao que nunca foi.
Esse espaço é pra você olhar com mais compaixão pra sua história e com mais clareza pro seu futuro.
________________________________________
O que vai acontecer na Sala Secreta:
• Você vai entender por que ainda dói tanto, mesmo depois de meses ou anos.
• Vai descobrir que existe um caminho possível de reconstrução, com base nas fases do luto e da identidade pós-divórcio.
• Vai sentir que alguém finalmente te entende, porque aqui ninguém vai te dizer “segue em frente” sem antes te ensinar a juntar os pedaços.
________________________________________
Duração:
2h, ao vivo com Thaís Rosa, em grupo fechado, com espaço pra escuta, acolhimento e partilha.
________________________________________
🔒 Vagas limitadas. É um encontro íntimo. Real. Profundo.
Esse não é um evento somente para assistir, é pra sentir, refletir e sair diferente de como entrou.
________________________________________
Valor simbólico de entrada: R$47,60
Você não está pagando por um conteúdo.
Está investindo na primeira virada de chave da sua nova vida.
Vagas Limitadas. Em breve uma nova turma. Garanta a sua vaga.`
  },
  {
    label: 'Mentoria em Grupo',
    value: 'grupo',
    image: '/assets/img/3.png',
    glowColor: 'bg-yellow-500/20',
    ctaText: '✍️ Quero descobrir meu arquétipo',
    hotmartLink: 'https://pay.hotmart.com/GRUPO-LINK',
    description: `Mentoria em Grupo MQA: "Os Arquétipos do Divórcio"
Formato: 4 encontros online semanais.
Valor: R$ 297,80 ou 3x de R$ 99,80`
  },
  {
    label: 'Mentoria Individual',
    value: 'individual',
    image: '/assets/img/4.png',
    glowColor: 'bg-red-500/20',
    ctaText: '🗝️ Quero um plano só meu',
    hotmartLink: 'https://pay.hotmart.com/INDIVIDUAL-LINK',
    description: `Mentoria 1:1 com Thaís Rosa – Uma jornada de reconstrução feita só para você.
Formato: 4 encontros online + suporte via WhatsApp.
Valor: R$ 2.997,80 ou 3x de R$ 999,80`
  },
];

const LivesMentorias = () => {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', selectedOption: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (opt) => setSelectedCard(opt);

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
    if (!formData.name || !formData.email || !formData.selectedOption) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    setError(null);
    setIsLoading(true);
    const selectedOpt = options.find(opt => opt.value === formData.selectedOption);

    try {
      if (selectedOpt.value === 'live') {
        await sendMentoria(formData);
        setSuccess('✅ Inscrição para a Live Gratuita enviada com sucesso! Verifique seu e-mail.');
        setTimeout(() => setSuccess(null), 5000);
      } else if (selectedOpt.hotmartLink) {
        await sendMentoria(formData);
        window.location.href = selectedOpt.hotmartLink;
      }
    } catch (error) {
      setError('Erro ao enviar os dados. Tente novamente.');
      console.error('API error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = formData.selectedOption === 'live' ? 'Enviar' : 'Ir para Pagamento';

  return (
    <section className="py-20 bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-red-500">
          Transforme Sua Vida Após o Divórcio
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Participe das Lives & Mentorias Exclusivas com Thaís Rosa
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {options.map((opt, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden shadow-xl cursor-pointer h-[28rem] flex items-end justify-center transition group border border-white/10`}
              onClick={() => handleCardClick(opt)}
            >
              <div className={`absolute inset-0 ${opt.glowColor} blur-2xl z-0`}></div>
              <img
                src={opt.image}
                alt={opt.label}
                className="absolute top-0 left-0 w-full h-full object-cover z-10 group-hover:scale-105 transition rounded-xl sm:rounded-2xl object-center md:object-cover"
              />
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
          <p>Escolha abaixo o tipo de encontro e receba o link após o pagamento.</p>
        </motion.div>

        <form
          id="mentoria-form"
          onSubmit={handleSubmit}
          className="space-y-4 text-white text-left bg-[#151515]/80 border border-purple-500/20 rounded-3xl shadow-[0_0_35px_rgba(128,90,213,0.5)] p-6 max-w-md mx-auto"
        >
          <input
            name="name"
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
            required
          />
          <input
            name="whatsapp"
            type="text"
            placeholder="WhatsApp (opcional)"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
          />
          <select
            name="selectedOption"
            value={formData.selectedOption}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-purple-500/30 bg-black/30"
            required
          >
            <option value="">Selecione o tipo de encontro</option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md font-semibold text-white shadow-lg transition bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:brightness-110 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processando...' : buttonText}
          </button>
          {error && <p className="text-red-400 mt-4">{error}</p>}
          {success && <p className="text-green-400 mt-4">{success}</p>}
        </form>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1e1e28] max-w-2xl w-full p-6 rounded-xl shadow-xl text-white overflow-y-auto max-h-[80vh]"
            >
              <h3 className="text-2xl font-bold mb-4">{selectedCard.label}</h3>
              <p className="text-gray-300 whitespace-pre-line mb-6">{selectedCard.description}</p>
              <button
                onClick={() => handleCTAClick(selectedCard.value)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-md text-white font-semibold hover:brightness-110"
              >
                {selectedCard.ctaText}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LivesMentorias;
