import React from 'react';

const Contato = () => (
  <section id="contato" className="py-16 bg-gray-100">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Contato e Redes Sociais</h2>
      <p className="text-lg mb-8 text-gray-700">
        Entre em contato conosco ou siga-nos nas redes sociais para ficar por dentro de todas as novidades do MQA!
      </p>
      <div className="flex justify-center space-x-4">
        <a href="#instagram" className="text-purple-600 hover:text-purple-800">Instagram</a>
        <a href="#whatsapp" className="text-purple-600 hover:text-purple-800">WhatsApp</a>
        <a href="#email" className="text-purple-600 hover:text-purple-800">E-mail</a>
      </div>
    </div>
  </section>
);

export default Contato;