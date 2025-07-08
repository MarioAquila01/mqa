import React, { useState } from 'react';

const Hero = () => {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert(`Inscrição recebida! Nome: ${formData.name}, Email: ${formData.email}, WhatsApp: ${formData.whatsapp}`);
  };

  return (
    <section className="bg-gray-100 py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-purple-800">
          Sala Secreta: A Revelação dos Primeiros Passos para Viver Melhor Que Antes
        </h2>
        <p className="text-lg mb-6 text-gray-700">
          Participe da Sala Secreta com Thaís Rosa e descubra como reconstruir sua vida pós-divórcio!
        </p>
        <div className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700"
          >
            Garantir Minha Vaga
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;