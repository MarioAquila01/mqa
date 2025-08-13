// src/pages/Home.jsx (ou onde seu Home está)
import React, { useEffect } from 'react';
import { scroller, Element } from 'react-scroll';
import { pageSections } from '@/sections';

const Home = ({ scrollTo }) => {
  useEffect(() => {
    const scrollToSection = (section) => {
      setTimeout(() => {
        scroller.scrollTo(section, {
          duration: 600,
          smooth: true,
          offset: -80, // ajuste conforme altura da Navbar fixa
        });
      }, 300); // delay para garantir montagem dos componentes
    };

    const validSections = pageSections.map((s) => s.name);

    // 1º: scrollTo vindo da rota (via prop App.jsx)
    if (scrollTo && validSections.includes(scrollTo)) {
      scrollToSection(scrollTo);
    } else {
      // 2º: check sessionStorage (navegação por botão)
      const sessionTarget = sessionStorage.getItem('scrollTarget');
      if (sessionTarget && validSections.includes(sessionTarget)) {
        scrollToSection(sessionTarget);
        sessionStorage.removeItem('scrollTarget');
      } else {
        // 3º: fallback – rola para o topo
        window.scrollTo(0, 0);
      }
    }
  }, [scrollTo]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white px-6 py-20 text-center">
        {/* WRAPPER DA FOTO: maior no mobile + glow colorido */}
        <div className="relative inline-block mx-auto mb-8 rounded-2xl overflow-visible">
          {/* Glow radial (base roxo, estilo do form) */}
          <div
            className="pointer-events-none absolute -inset-6 blur-2xl opacity-90
                       bg-[radial-gradient(60%_60%_at_50%_50%,rgba(168,85,247,0.35),rgba(0,0,0,0))]"
            aria-hidden
          />
          {/* Glow direcional extra (degrade pink->purple) */}
          <div
            className="pointer-events-none absolute -inset-10 blur-3xl opacity-70
                       bg-gradient-to-br from-pink-500/25 via-purple-500/15 to-sky-400/0"
            aria-hidden
          />

          {/* IMAGEM — maior no mobile, centralizada, bordas suaves e sombra */}
          <img
            src="/assets/img/mar-background.webp"
            alt="Thaís Rosa sorrindo - Mentoria Melhor Que Antes"
            loading="lazy"
            decoding="async"
            className="relative z-10
                       w-[19rem] xs:w-[20rem] sm:w-[22rem] md:w-[26rem] max-w-[88vw]
                       rounded-2xl object-cover object-center
                       shadow-[0_0_35px_rgba(128,90,213,0.5)]
                       ring-1 ring-white/10"
          />
        </div>

        <p className="text-base md:text-lg font-nunito italic mb-4 leading-relaxed text-gray-200 max-w-2xl">
          “A separação que parecia ser meu fim revelou-se o início de algo melhor que antes.”
        </p>
        <span className="font-semibold text-white text-lg mb-6">Thaís Rosa</span>
      </div>

      {/* Seções da Página */}
      {pageSections.map(({ name, component: Component }) => (
        <Element key={name} name={name} id={name}>
          <Component />
        </Element>
      ))}
    </>
  );
};

export default Home;
