import React, { useEffect } from 'react';
import { scroller } from 'react-scroll';

import Missao from './Missao';
import SalaSecreta from './SalaSecreta';
import Palestras from './Palestras';
import Livro from './Livro';
import Podcast from './Podcast';
import Contato from './Contato';

const Home = () => {
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget');
    if (target) {
      setTimeout(() => {
        scroller.scrollTo(target, {
          duration: 600,
          smooth: true,
          offset: -80,
        });
        sessionStorage.removeItem('scrollTarget');
      }, 300);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
        <div className="w-full md:w-1/2 h-[60vh] md:h-screen pt-20 md:pt-28 relative z-10">
          <img
            src="/assets/img/mar-background.JPG"
            alt="Thaís Rosa"
            className="absolute inset-0 w-full h-full object-contain md:object-cover object-top"
          />
        </div>

        <div className="w-full md:w-1/2 h-full flex items-center justify-center p-6 md:p-16 bg-black/40 backdrop-blur-md">
          <div className="bg-[#151515]/80 border border-purple-500/20 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_25px_rgba(128,90,213,0.3)] max-w-md w-full text-center transition-all duration-500 hover:shadow-purple-600/40 hover:-translate-y-1">
            <img
              src="/assets/img/logo-mqa-sem-raio.jpeg"
              alt="Logo Melhor que Antes"
              className="mx-auto mb-6 w-36 md:w-40 rounded-lg shadow-lg"
            />

            <p className="text-base md:text-lg font-nunito italic mb-6 leading-relaxed text-gray-200">
              “A separação que parecia ser meu fim revelou-se o início de algo melhor que antes.”<br />
              <span className="font-semibold block mt-2 text-white">Thaís Rosa</span>
            </p>

            <a
              href="#missao"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </div>

      <div id="missao"><Missao /></div>
      <div id="sala-secreta"><SalaSecreta /></div>
      <div id="palestras"><Palestras /></div>
      <div id="livro"><Livro /></div>
      <div id="podcast"><Podcast /></div>
      <div id="contato"><Contato /></div>
    </>
  );
};

export default Home;
