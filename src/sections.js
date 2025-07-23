import Missao from '@/components/Missao.jsx';
import Livro from '@/components/Livro.jsx';
import SalaSecreta from '@/components/SalaSecreta.jsx';
import Podcast from '@/components/Podcast.jsx';
import Contato from '@/components/Contato.jsx';

export const pageSections = [
  { name: 'missao', component: Missao },
  { name: 'livro', component: Livro },
  { name: 'sala-secreta', component: SalaSecreta, aliases: ['salasecreta'] },
  { name: 'podcast', component: Podcast },
  { name: 'contato', component: Contato },
];
