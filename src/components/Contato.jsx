import React from 'react';
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebook,
  FaLink,
} from 'react-icons/fa';

const Contato = () => (
  <section
    id="contato"
    className="py-20 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white"
  >
    <div className="max-w-3xl mx-auto px-6 text-center">
      {/* Imagem do topo com tamanho maior */}
      <img
        src="/assets/img/458183650_122096263916514663_1333870992515452106_n.png"
        alt="Logo Melhor Que Antes"
        className="mx-auto w-60 md:w-72 lg:w-80 rounded-xl mb-10 shadow-[0_0_35px_rgba(128,90,213,0.5)]"
      />

      <div className="bg-[#151515]/80 border border-purple-500/20 backdrop-blur-xl p-10 rounded-3xl shadow-[0_0_25px_rgba(128,90,213,0.3)]">
        <h2 className="text-4xl font-extrabold mb-6">📬 Contato e Redes Sociais</h2>
        <p className="text-lg text-gray-300 mb-10">
          Siga o MQA nas redes sociais e acompanhe nossos conteúdos, eventos e mensagens
          com Thaís Rosa. Se quiser falar com a gente, os links estão aqui! 💜
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-3xl">
          <a
            href="https://www.instagram.com/melhorqueantesoficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-pink-400 transition"
            title="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.youtube.com/@melhorqueantesoficial/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-red-500 transition"
            title="YouTube"
          >
            <FaYoutube />
          </a>

          <a
            href="https://www.tiktok.com/@melhorqueantestb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-white transition"
            title="TikTok"
          >
            <FaTiktok />
          </a>

          <a
            href="https://web.facebook.com/people/Melhorqueantesoficial/61565439890755/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-blue-400 transition"
            title="Facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://linktr.ee/melhorqueantes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-green-300 transition"
            title="Linktree"
          >
            <FaLink />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Contato;
