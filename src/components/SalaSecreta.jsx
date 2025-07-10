import React, { useState } from 'react';
import api from '../services/api';

const SalaSecreta = () => {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/api/sala-secreta', {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
      });
      localStorage.setItem('registeredEmail', formData.email);
      alert(`Inscrição realizada com sucesso! Nome: ${formData.name}, Email: ${formData.email}, WhatsApp: ${formData.whatsapp}. Você receberá instruções por e-mail com sua senha temporária.`);
    } catch (err) {
      setError('Erro ao realizar inscrição. Tente novamente.');
    }
  };

  return (
    <section id="sala-secreta" className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Sala Secreta MQA</h2>
        <p className="text-lg mb-8 text-gray-700">
          Um evento online transformador de 2 a 3 horas ao vivo no Zoom, projetado para ajudar você a dar os primeiros passos na reconstrução da sua vida.
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
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
};

export default SalaSecreta;