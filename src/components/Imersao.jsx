import React from 'react';

const Imersao = () => (
  <section id="imersao" className="py-16 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Imersão Apaixone-se pela Sua Nova Vida</h2>
      <p className="text-lg mb-8 text-gray-700">
        Um evento presencial de 2 dias em São Paulo, com dinâmicas de autoestima e desbloqueio emocional, por R$4.997 a R$9.997.
      </p>
      <div className="max-w-2xl mx-auto">
        <ul className="text-left space-y-4 text-gray-700">
          <li>🟣 Dinâmicas de resgate da autoestima</li>
          <li>🟣 Técnicas de desbloqueio emocional</li>
          <li>🟣 Ativações de futuro, propósito e imagem</li>
          <li>🟣 Participação de psicóloga, terapeuta de imagem e convidadas especiais</li>
        </ul>
        <button className="mt-6 bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700">
          Saiba Mais
        </button>
      </div>
    </div>
  </section>
);

export default Imersao;