import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SalaSecreta from './components/SalaSecreta';
import Mentoria from './components/Mentoria';
import Imersao from './components/Imersao';
import Footer from './components/Footer';
import './index.css';

const App = () => (
  <div>
    <Header />
    <Hero />
    <SalaSecreta />
    <Mentoria />
    <Imersao />
    <Footer />
  </div>
);

export default App;