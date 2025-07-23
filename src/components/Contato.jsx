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
    className="py-20 bg-gradient-to-r from-[#1e1e28] to-[#2e2e3e] text-white"
  >
    <div className="max-w-3xl mx-auto px-6 text-center">
      {/* Imagem do topo com tamanho maior */}
      <img
        src="/assets/img/458183650_122096263916514663_1333870992515452106_n.png"
        alt="Logo Melhor Que Antes"
        className="mx-auto w-60 md:w-72 lg:w-80 rounded-xl mb-10 shadow-[0_0_35px_rgba(128,90,213,0.5)]"
      />

      {/* FORMULÁRIO DE CONTATO */}
      <div className="bg-[#151515]/80 border border-purple-500/20 backdrop-blur-xl p-10 rounded-3xl shadow-[0_0_25px_rgba(128,90,213,0.3)] mb-10">
        <h2 className="text-3xl font-bold mb-6">📩 Fale com a gente</h2>
        <form
          action="https://formsubmit.co/melhorqueantestb@gmail.com"
          method="POST"
          className="space-y-6 text-left"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Nova mensagem do site MQA" />
          <input type="hidden" name="_template" value="box" />

          <div>
            <label className="block mb-1 text-sm text-gray-300">Assunto</label>
            <input
              type="text"
              name="assunto"
              required
              className="w-full p-3 rounded-md bg-[#2e2e3e] text-white border border-purple-400/20"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Nome</label>
            <input
              type="text"
              name="nome"
              required
              className="w-full p-3 rounded-md bg-[#2e2e3e] text-white border border-purple-400/20"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">E-mail</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 rounded-md bg-[#2e2e3e] text-white border border-purple-400/20"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Telefone</label>
            <input
              type="tel"
              name="telefone"
              className="w-full p-3 rounded-md bg-[#2e2e3e] text-white border border-purple-400/20"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-md font-bold hover:brightness-110 transition"
          >
            Enviar Mensagem
          </button>
        </form>
      </div>

      {/* REDES SOCIAIS - ORIGINAL MANTIDO */}
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
