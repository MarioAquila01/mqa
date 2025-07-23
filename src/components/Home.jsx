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
          offset: -80 // ajuste conforme altura da Navbar fixa
        });
      }, 300); // delay para garantir montagem dos componentes
    };

    const validSections = pageSections.map(s => s.name);

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
        <img
          src="/assets/img/mar-background.webp"
          alt="Thaís Rosa sorrindo - Mentoria Melhor Que Antes"
          className="w-64 md:w-80 rounded-xl shadow-[0_0_35px_rgba(128,90,213,0.5)] mb-8"
          loading="lazy"
        />

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
