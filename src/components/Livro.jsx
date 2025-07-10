import React from 'react';

const Livro = () => (
  <section id="livro" className="py-16 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Livro: Reconstrução MQA</h2>
      <p className="text-lg mb-8 text-gray-700">
        Disponível em formato físico ou eBook, o livro "Reconstrução MQA" traz histórias inspiradoras e estratégias práticas para superar o divórcio e construir uma vida melhor. Escrito por Thaís Rosa, é o guia perfeito para sua jornada de transformação.
      </p>
      <div className="flex justify-center space-x-4">
        <a href="#comprar-fisico" className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700">Comprar Livro Físico</a>
        <a href="#comprar-ebook" className="bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-800">Comprar eBook</a>
      </div>
    </div>
  </section>
);

export default Livro;