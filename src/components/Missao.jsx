import React from 'react';

const Missao = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white py-20 px-6 md:px-16" id="missao">
      <div className="w-full md:w-1/2 mb-10 md:mb-0 md:mr-8">
        <img
          src="/assets/img/missao-image.jpeg"
          alt="Imagem Missão"
          className="w-full rounded-2xl shadow-[0_0_25px_rgba(128,90,213,0.3)] object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 bg-black/30 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-purple-500/10 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-400">Nossa Missão no Melhor Que Antes</h2>
        <p className="text-gray-200 mb-4">
          O Melhor Que Antes nasceu de uma dor que se transformou em caminho — e hoje existe para converter o fim de uma história em um convite poderoso ao recomeço.
        </p>
        <p className="text-gray-200 mb-4">
          Somos uma comunidade construída por quem viveu o caos do divórcio, as lágrimas escondidas no banheiro, o medo do desconhecido... e descobriu, no meio dos escombros, uma força que nunca imaginou possuir.
        </p>
        <p className="text-gray-200 mb-4">
          Acreditamos que ninguém deveria atravessar essa jornada sozinha. Por isso, criamos um espaço de apoio, acolhimento e reconstrução — onde a vulnerabilidade é bem-vinda, a coragem é celebrada e o recomeço acontece com leveza e autenticidade.
        </p>
        <p className="text-gray-100 font-semibold">
          Nossa missão é mostrar que você pode renascer. Que existe vida, amor e propósito depois do fim. E que, sim, sua nova história pode ser melhor que antes.
        </p>
      </div>
    </section>
  );
};

export default Missao;
