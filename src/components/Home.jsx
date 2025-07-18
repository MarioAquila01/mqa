import React, { useEffect } from 'react';
import { scroller, Element, Link } from 'react-scroll';

import Missao from './Missao';
import Livro from './Livro';
import SalaSecreta from './SalaSecreta';
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
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white px-6 py-20 text-center">
        
        <img
          src="/assets/img/mar-background.png"
          alt="Thaís Rosa"
          className="w-60 md:w-72 rounded-xl shadow-[0_0_35px_rgba(128,90,213,0.5)] mb-8"
          loading="lazy"
        />

        <p className="text-base md:text-lg font-nunito italic mb-4 leading-relaxed text-gray-200 max-w-2xl">
          “A separação que parecia ser meu fim revelou-se o início de algo melhor que antes.”
        </p>
        <span className="font-semibold text-white text-lg mb-6">Thaís Rosa</span>

        <Link
          to="missao"
          smooth={true}
          duration={600}
          offset={-80}
          className="cursor-pointer bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
        >
          Saiba Mais
        </Link>
      </div>

      {/* Seções da Página */}
      <Element name="missao" id="missao"><Missao /></Element>
      <Element name="livro" id="livro"><Livro /></Element>
      <Element name="sala-secreta" id="sala-secreta"><SalaSecreta /></Element>
      <Element name="podcast" id="podcast"><Podcast /></Element>
      <Element name="contato" id="contato"><Contato /></Element>
    </>
  );
};

export default Home;
