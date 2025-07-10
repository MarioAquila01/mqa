import React from 'react';

const Missao = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-white">
      <img
        src="/assets/img/missao-image.jpg"
        alt="Imagem Missão"
        className="w-full md:w-1/3 rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
      />
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Nossa Missão no Melhor Que Antes</h2>
        <p className="text-gray-700 mb-4">
          O Melhor Que Antes nasceu de uma dor que se transformou em caminho — e hoje existe para converter o fim de uma história em um convite poderoso ao recomeço.
        </p>
        <p className="text-gray-700 mb-4">
          Somos uma comunidade construída por quem viveu o caos do divórcio, as lágrimas escondidas no banheiro, o medo do desconhecido... e descobriu, no meio dos escombros, uma força que nunca imaginou possuir.
        </p>
        <p className="text-gray-700 mb-4">
          Acreditamos que ninguém deveria atravessar essa jornada sozinha. Por isso, criamos um espaço de apoio, acolhimento e reconstrução — onde a vulnerabilidade é bem-vinda, a coragem é celebrada e o recomeço acontece com leveza e autenticidade.
        </p>
        <p className="text-gray-700">
          Nossa missão é mostrar que você pode renascer. Que existe vida, amor e propósito depois do fim. E que, sim, sua nova história pode ser melhor que antes.
        </p>
      </div>
    </div>
  );
};

export default Missao;
