import React from 'react';

const SalaSecreta = () => (
  <section id="sala-secreta" className="py-16 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Sala Segreta MQA</h2>
      <p className="text-lg mb-8 text-gray-700">
        Um evento online transformador de 2 a 3 horas ao vivo no Zoom, projetado para ajudar você a dar os primeiros passos na reconstrução da sua vida.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">As 3 Maiores Armadilhas Emocionais</h3>
          <p>Descubra como evitar as armadilhas emocionais que te impedem de seguir em frente.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Reconstrução com Filhos</h3>
          <p>Aprenda estratégias para reconstruir sua vida enquanto cuida dos seus filhos.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Superando a Dor</h3>
          <p>Entenda por que algumas mulheres não conseguem superar a separação e como mudar isso.</p>
        </div>
      </div>
    </div>
  </section>
);

export default SalaSecreta;