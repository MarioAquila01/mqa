import Missao from '../components/Missao';
import Livro from '../components/Livro';
import SalaSecreta from '../components/SalaSecreta';
import Podcast from '../components/Podcast';
import Contato from '../components/Contato';

export const pageSections = [
  { name: 'missao', component: Missao },
  { name: 'livro', component: Livro },
  { name: 'salasecreta', component: SalaSecreta, aliases: ['sala-secreta'] },
  { name: 'podcast', component: Podcast },
  { name: 'contato', component: Contato },
];
