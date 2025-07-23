import Missao from '@/components/Missao';
import Livro from '@/components/Livro';
import SalaSecreta from '@/components/SalaSecreta';
import Podcast from '@/components/Podcast';
import Contato from '@/components/Contato';

export const pageSections = [
  { name: 'missao', component: Missao },
  { name: 'livro', component: Livro },
  { name: 'sala-secreta', component: SalaSecreta, aliases: ['salasecreta'] },
  { name: 'podcast', component: Podcast },
  { name: 'contato', component: Contato },
];