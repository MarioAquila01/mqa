import React from 'react';
import { motion } from 'framer-motion';

const videoLinks = [
  'FIEsKy3lu6g',
  'wyDTBg3eDxE',
  'AgEUQQRcDgg',
  'fTKYPeYzysY',
  'Tc7aYeMvIsE',
  'v8b6ACttPwk',
  'oK9ZsHXy6G8',
  'DPK6BLy2EmQ',
  'xpc5ohuDd-s',
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Podcast = () => (
  <section
    id="podcast"
    className="py-20 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white"
  >
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        className="bg-[#151515]/80 border border-purple-500/20 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_0_25px_rgba(128,90,213,0.3)] transition-all duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6 text-white text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          🎧 Podcast MQA
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto text-center"
          variants={fadeUp}
          custom={0.2}
        >
          Histórias reais, reflexões profundas e inspiração para quem está recomeçando.
          Transforme sua dor em força e siga em frente com o MQA.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {videoLinks.map((id, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-black/80"
              variants={fadeUp}
              custom={index * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title={`Podcast MQA ${index + 1}`}
                className="w-full h-64"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a
            href="https://www.youtube.com/@melhorqueantesoficial/playlists"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:brightness-110 hover:scale-105 transition duration-300"
          >
            Ver todos os episódios no YouTube
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Podcast;
