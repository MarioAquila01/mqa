import React from 'react';

const Livro = () => {
  return (
    <section id="livro" className="bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white py-20 px-6 md:px-16">
      
      {/* TÍTULO PRINCIPAL */}
      <div className="max-w-4xl mx-auto text-center mb-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-300">
          Meu Amor por Você Acabou
        </h2>
      </div>

      {/* CAPA DO LIVRO */}
      <div className="max-w-4xl mx-auto mb-12 flex justify-center">
        <img
          src="/assets/img/livro-fisico.jpeg"
          alt="Capa do Livro"
          className="w-full max-w-md rounded-2xl shadow-xl hover:scale-105 transition-transform"
        />
      </div>

      {/* DESCRIÇÃO */}
      <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-md p-8 rounded-3xl border border-purple-500/10 shadow-lg text-left">
        <p 
       className="text-lg md:text-xl text-gray-300 mt-2">
          Um guia para renascer após o término
        </p>

        <p className="text-gray-200 mb-4 text-lg leading-relaxed">
          Quando uma separação acontece, o mundo desaba. Julgamentos surgem, estigmas pesam, e a solidão se instala em cada canto da vida.
        </p>
        <p className="text-gray-200 mb-4 text-lg leading-relaxed">
          Esta não é apenas uma história sobre separação — é um relato honesto de como nossa maior crise pode revelar nossa verdadeira missão. Por meio do livro <strong>Meu amor por você acabou</strong>, você descobrirá como a autora transformou dor em força, renascendo no entorno de suas cicatrizes para uma nova versão: melhor que antes, reestruturada em uma vida autêntica, plena e feliz.
        </p>
        <p className="text-gray-200 mb-4 text-lg leading-relaxed">
          Este livro é para você que:
        </p>
        <ul className="list-disc pl-6 text-gray-200 text-base space-y-2">
          <li>procura inspiração concreta para reconstruir seu caminho após a separação;</li>
          <li>deseja transformar experiências dolorosas em propósito de vida;</li>
          <li>precisa identificar sinais de crise em seu relacionamento e adotar atitudes preventivas antes que seja tarde demais.</li>
        </ul>
        <p className="text-gray-100 font-semibold mt-6 text-lg">
          Descubra como é possível sobreviver ao fim de um amor e florescer a partir dele.
        </p>
      </div>

      {/* BOTÕES DE COMPRA */}
      <div className="text-center mt-10 flex flex-col md:flex-row justify-center gap-6">
        <a
          href="https://www.amazon.com.br/gp/product/650141198X?smid=A1EJQMTMXZXNMS&psc=1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-transform hover:scale-105"
        >
          Comprar na Amazon
        </a>
        <a
          href="https://www.amazon.com.br/dp/B0FHRRC9F5"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-pink-600 to-purple-500 hover:brightness-110 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-transform hover:scale-105"
        >
          E-book Amazon Kindle
        </a>
      </div>

      {/* VÍDEO EXPLICANDO O PROPÓSITO */}
      <div className="mt-24 max-w-5xl mx-auto">
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border border-purple-500/20">
          <iframe
            src="https://www.youtube.com/embed/uhWFqzYEREI"
            title="Propósito do Livro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-64 md:h-[400px]"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Livro;
