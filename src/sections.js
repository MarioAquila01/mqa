import Missao from '@/components/Missao.jsx';
import Livro from '@/components/Livro.jsx';
import LivesMentorias from './components/LivesMentorias';
import Ebook from '@/components/Ebook.jsx';
import Podcast from '@/components/Podcast.jsx';
import Contato from '@/components/Contato.jsx';

export const pageSections = [
  { name: 'missao', component: Missao },
  { name: 'livro', component: Livro },
  { name: 'lives-mentorias', component: LivesMentorias },
  { name: 'ebook', component: Ebook },
  { name: 'podcast', component: Podcast },
  { name: 'contato', component: Contato },
];
