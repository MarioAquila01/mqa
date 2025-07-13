import React from 'react';

const Livro = () => {
  return (
    <section id="livro" className="bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white py-20 px-6 md:px-16">
      
      {/* TÍTULO DE TOPO DA SEÇÃO */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-300">
          Dê o primeiro passo!
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mt-3">
          Guia: <span className="font-semibold text-white">Renascimento em 7 Dias</span>
        </p>
      </div>

      {/* IMAGEM DO LIVRO */}
      <div className="max-w-4xl mx-auto mb-12 flex justify-center">
        <img
          src="/assets/img/ebook1.png"
          alt="Ebook Renascimento em 7 Dias"
          className="w-full max-w-md rounded-2xl shadow-xl hover:scale-105 transition-transform"
        />
      </div>

      {/* DESCRIÇÃO DO LIVRO */}
      <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-md p-8 rounded-3xl border border-purple-500/10 shadow-lg text-center">
        <h2 className="text-4xl font-bold text-purple-300 mb-6">Renascimento Pós Divórcio</h2>
        <p className="text-gray-200 text-lg mb-6">
          Você vai receber um guia cuidadosamente elaborado para apoiá-la(o) nos primeiros passos de sua jornada de redescoberta e renascimento pessoal.
          Criamos este e-book com um propósito claro: oferecer a você ferramentas práticas, ferramentas poderosas e, acima de tudo, esperança para este novo capítulo de sua vida!
        </p>
        <p className="text-gray-100 text-lg font-semibold mb-8">
          <em>"Renascimento em 7 Dias"</em> não é apenas um livro digital, é um guia de transformação!
        </p>

        <div className="text-left text-gray-200 mb-10">
          <h3 className="text-xl font-bold text-purple-200 mb-3">Ao longo de sete dias, vamos explorar:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dia 1:</strong> Abraçando a Mudança</li>
            <li><strong>Dia 2:</strong> Nutrindo Seu Bem-Estar Emocional</li>
            <li><strong>Dia 3:</strong> Primeiros Passos para Independência Financeira</li>
            <li><strong>Dia 4:</strong> Fortalecendo Laços Familiares na Transição</li>
            <li><strong>Dia 5:</strong> Explorando Seu Potencial Profissional</li>
            <li><strong>Dia 6:</strong> Construindo Sua Tribo de Apoio</li>
            <li><strong>Dia 7:</strong> Desenhando Seu Novo Capítulo</li>
          </ul>
        </div>

        {/* BOTÃO DE COMPRA */}
        <a
          href="https://pay.hotmart.com/Y98362855B?off=1t3be51p&hotfeature=51&_hi=eyJjaWQiOiIxNzUxOTExNjAzNzQ3NjM0Njc4NDUyNjEzNzYxMzAwIiwiYmlkIjoiMTc1MTkxMTYwMzc0NzYzNDY3ODQ1MjYxMzc2MTMwMCIsInNpZCI6ImQ2N2Y1NmQzYjI2MzQzZjNhNzM5N2E1YmQ4YzEwOWM5In0=.1752406117820&bid=1752406120264"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-transform hover:scale-105"
        >
          Comprar Agora por R$27,90
        </a>
      </div>

      {/* BLOCO VÍDEO + TEXTO */}
      <section className="mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
          {/* VIDEO */}
          <div className="w-full md:w-1/2">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border border-purple-500/20">
              <iframe
                src="https://www.youtube.com/embed/uhWFqzYEREI"
                title="Vídeo Renascimento"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 md:h-[350px]"
              ></iframe>
            </div>
          </div>

          {/* TEXTO */}
          <div className="w-full md:w-1/2 bg-black/30 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-purple-500/10 shadow-lg">
            <h3 className="text-3xl font-bold text-purple-300 mb-4">Sinta-se mais forte, confiante e no controle da sua vida!</h3>
            <p className="text-lg text-gray-200 mb-6 font-semibold">O que você vai ganhar?</p>
            <ul className="list-disc text-gray-300 pl-6 space-y-3">
              <li><strong>Autoestima renovada</strong> – recupere sua confiança e descubra seu verdadeiro valor.</li>
              <li><strong>Equilíbrio emocional</strong> – aprenda a lidar com sentimentos difíceis e siga em frente sem culpa.</li>
              <li><strong>Independência financeira</strong> – comece a organizar sua vida financeira com segurança.</li>
              <li><strong>Relações fortalecidas</strong> – construa laços saudáveis com filhos, amigos e um novo amor.</li>
              <li><strong>Plano de ação claro</strong> – defina novos objetivos e desenhe um futuro brilhante para você.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BLOCO DEPOIMENTOS */}
      <section className="mt-24 text-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-300 mb-4">O Que Estão Dizendo</h2>
          <p className="text-gray-300 text-lg">Histórias reais de transformação com o Renascimento em 7 Dias</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              nome: "Carla M.",
              texto: "Esse eBook foi um divisor de águas na minha vida. Em 7 dias, senti forças que nem sabia que existiam.",
            },
            {
              nome: "Amanda S.",
              texto: "A clareza que encontrei aqui me ajudou a me reencontrar como mulher. Gratidão eterna à equipe do MQA.",
            },
            {
              nome: "Fernanda R.",
              texto: "Achei que seria só mais um livro, mas virou meu guia de cabeceira. Tudo mudou desde então.",
            },
          ].map((dep, i) => (
            <div
              key={i}
              className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-purple-500/10 shadow-lg hover:shadow-purple-700/30 transition-transform hover:-translate-y-1"
            >
              <p className="text-gray-100 italic mb-4">“{dep.texto}”</p>
              <p className="text-purple-400 font-semibold">– {dep.nome}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Livro;
