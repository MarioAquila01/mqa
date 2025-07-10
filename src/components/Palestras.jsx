// ============================
// 📄 src/components/Palestras.jsx
// ============================

import React from 'react';

const Palestras = () => {
  return (
    <section id="palestras" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Palestras e Eventos</h2>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Experiências transformadoras para grupos e organizações
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">

          {/* Evento 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                📅
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Workshop: Renascimento Pessoal</h3>
                <p className="text-gray-500">15 de Agosto, 2025 • Online</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Um workshop interativo de 3 horas para quem busca ferramentas práticas para superar términos e reconstruir sua vida com propósito.
            </p>
            <a href="#" className="text-purple-600 font-medium hover:underline flex items-center">
              <span>Mais informações</span>
            </a>
          </div>

          {/* Evento 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                📅
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Palestra: Amor-Próprio</h3>
                <p className="text-gray-500">23 de Setembro, 2025 • São Paulo</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Uma imersão profunda nos fundamentos do amor-próprio e como cultivá-lo após experiências de rejeição e abandono emocional.
            </p>
            <a href="#" className="text-purple-600 font-medium hover:underline flex items-center">
              <span>Mais informações</span>
            </a>
          </div>

          {/* Evento 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                📅
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Retiro: Cura e Transformação</h3>
                <p className="text-gray-500">10-12 de Outubro, 2025 • Campos do Jordão</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Um final de semana imersivo para desconectar-se do passado e reconectar-se consigo mesmo em um ambiente acolhedor e transformador.
            </p>
            <a href="#" className="text-purple-600 font-medium hover:underline flex items-center">
              <span>Mais informações</span>
            </a>
          </div>

          {/* Evento 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                📅
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Palestra Corporativa</h3>
                <p className="text-gray-500">Agenda Aberta • Presencial ou Online</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Palestras personalizadas para empresas sobre resiliência emocional, inteligência emocional e bem-estar no ambiente de trabalho.
            </p>
            <a href="#" className="text-purple-600 font-medium hover:underline flex items-center">
              <span>Solicitar proposta</span>
            </a>
          </div>

        </div>

        {/* Formulário de Interesse */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Interesse em um evento?</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Evento de interesse</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                <option value="">Selecione um evento</option>
                <option value="workshop">Workshop: Renascimento Pessoal</option>
                <option value="palestra">Palestra: Amor-Próprio</option>
                <option value="retiro">Retiro: Cura e Transformação</option>
                <option value="corporativo">Palestra Corporativa</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"></textarea>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="bg-purple-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-purple-700">
                Enviar Mensagem
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Palestras;
