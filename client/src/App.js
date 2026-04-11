import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from 'react';
import Header from './components/Header.js';
import Home from './components/Home.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import Playlist from './components/Playlist.js';
import Footer from './components/Footer.js';
import QuickCart from './components/QuickCart.js';
import HashScroll from './HashScroll.js';
import SectionScrollIndicator from './components/SectionScrollIndicator.js';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import RestoreScrollOnRoute from './components/RestoreScrollOnRoute';

function isHardReload() {
  if (typeof performance === 'undefined') return false;
  const entries = performance.getEntriesByType('navigation');
  const nav = entries[0];
  if (nav && 'type' in nav) {
    return nav.type === 'reload';
  }
  if (typeof performance.navigation !== 'undefined' && performance.navigation !== null) {
    return performance.navigation.type === 1;
  }
  return false;
}

/**
 * On the first paint after a full page reload only: send users to `/` (no hash).
 * `navigation.type` stays `"reload"` for the whole tab session, so we must not
 * re-run this on client-side route changes — that was blocking `/about`, etc.
 */
function HardRefreshHomeRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const handledReload = useRef(false);

  useEffect(() => {
    if (handledReload.current) return;
    if (!isHardReload()) return;

    handledReload.current = true;

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: '' }, { replace: true });
      return;
    }

    if (location.hash) {
      navigate({ pathname: '/', hash: '' }, { replace: true });
    }
  }, [navigate, location.pathname, location.hash]);

  return null;
}

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
      <HardRefreshHomeRedirect />
      <RestoreScrollOnRoute />
      <HashScroll />
      <AppRoutes />
      <ScrollToTop />
      <QuickCart />
      <Footer />
    </>
  );
}

export default App;
