import React from 'react';

const Podcast = () => (
  <section id="podcast" className="py-16 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Podcast MQA</h2>
      <p className="text-lg mb-8 text-gray-700">
        Ouça o podcast MQA com Thaís Rosa, onde compartilhamos histórias, dicas e inspirações para mulheres em busca de renovação. Disponível nas principais plataformas.
      </p>
      <div className="flex justify-center space-x-4">
        <a href="#spotify" className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600">Spotify</a>
        <a href="#apple-podcasts" className="bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-800">Apple Podcasts</a>
      </div>
    </div>
  </section>
);

export default Podcast;