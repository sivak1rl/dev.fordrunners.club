import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import NewRunners from './pages/NewRunners';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Disclaimer from './pages/Disclaimer';
import Sitemap from './pages/Sitemap';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/new" element={<NewRunners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;