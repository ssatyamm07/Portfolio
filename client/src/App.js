import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js';
import Home from './components/Home.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import Playlist from './components/Playlist.js';
import Footer from './components/Footer.js';
import {Routes, Route} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
   <>
   <Header />
   <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/playlist' element={<Playlist />} />
      <Route path='/contact' element={<Contact />} />
      
   </Routes>
   <ScrollToTop />
   <Footer /> 
   </>
  );
}

export default App;
