import React from 'react';
import Missao from './Missao';
import SalaSecreta from './SalaSecreta';
import Palestras from './Palestras';  // ✅ Novo componente

const Home = () => {
  return (
    <>
      <div
        id="home"
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/assets/img/mar-background.png')" }}
      >
        <div className="p-8 max-w-2xl">
          <img
            src="/assets/img/logo-mqa-sem-raio.jpeg"
            alt="Logo Melhor que Antes"
            className="mx-auto mb-6 w-40"
          />
          <h1 className="text-5xl font-bold font-bebas mb-4 text-white">Melhor que Antes</h1>
          <p className="text-lg font-nunito text-white italic mb-6">
            “A separação que parecia ser meu fim revelou-se o início de algo melhor que antes.” <br />
            <span className="font-semibold">Thaís Rosa</span>
          </p>
          <a
            href="#missao"
            className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700"
          >
            Saiba Mais
          </a>
        </div>
      </div>

      <div id="missao">
        <Missao />
      </div>

      <div id="sala-secreta">
        <SalaSecreta />
      </div>

      <div id="palestras">
        <Palestras />
      </div>
    </>
  );
};

export default Home;
