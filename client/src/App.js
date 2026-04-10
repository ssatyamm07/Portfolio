import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js';
import Home from './components/Home.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import Playlist from './components/Playlist.js';
import Footer from './components/Footer.js';
import QuickCart from './components/QuickCart.js';
import HashScroll from './HashScroll.js';
import SectionScrollIndicator from './components/SectionScrollIndicator.js';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

function AppRoutes() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
 <>
      {!isHome && <Header />}
      {isHome && <SectionScrollIndicator />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <HashScroll />
      <AppRoutes />
      <ScrollToTop />
      <QuickCart />
      <Footer />
    </>
  );
}

export default App;
