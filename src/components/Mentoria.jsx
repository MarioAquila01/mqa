import React from 'react';

const Mentoria = () => (
  <section id="mentoria" className="py-16 bg-gray-100">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Jornada de Reconstrução MQA</h2>
      <p className="text-lg mb-8 text-gray-700">
        Mentoria em grupo com 4 encontros ao vivo online, por apenas R$497 a R$997.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Encontro 1: Antes do Fim</h3>
          <p>Reflexões sobre o fim do relacionamento e o que vem depois.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Encontro 2: Devastação e Desamparo</h3>
          <p>Como lidar com as emoções mais difíceis da separação.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Encontro 3: Primeiros Passos</h3>
          <p>Estratégias práticas para começar a reconstrução.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Encontro 4: Renascimento (Kintsugi)</h3>
          <p>Transforme suas cicatrizes em força e beleza.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Mentoria;