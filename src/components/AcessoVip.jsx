import React, { useState } from 'react';

const AcessoVip = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    aceitar: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.nome || !form.email || !form.whatsapp) {
      return setError('Preencha todos os campos.');
    }

    if (!form.aceitar) {
      return setError('É necessário aceitar os termos para continuar.');
    }

    // 🔁 Enviar para API aqui (opcional)

    // ✅ Redirecionar para pagamento (substitua pelo link real)
    window.location.href = 'https://pay.hotmart.com/EXEMPLO-DE-LINK';
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white px-4">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">Quero Acessar a Mentoria VIP</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-purple-200">Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-purple-200">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-purple-200">WhatsApp</label>
            <input
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="(DDD) 91234-5678"
              className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:outline-none"
              required
            />
          </div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="aceitar"
              checked={form.aceitar}
              onChange={handleChange}
              className="mt-1"
              required
            />
            <label className="text-sm text-purple-200">
              Li e aceito os <a href="#" className="underline text-purple-300">termos de uso</a> e a <a href="#" className="underline text-purple-300">política de privacidade</a>.
            </label>
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-2 rounded text-white font-bold transition-all"
          >
            Ir para Pagamento
          </button>
        </form>
      </div>
    </div>
  );
};

export default AcessoVip;
