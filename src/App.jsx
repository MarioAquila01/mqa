import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import VipArea from './components/AreaVip';
import Missao from './components/Missao';  // ✅ Import da página Missão

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/area-vip" element={<VipArea />} />
        <Route path="/missao" element={<Missao />} />  {/* ✅ Rota da Missão */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
