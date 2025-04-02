import { Link } from 'react-router-dom';
import '../styles/style.css';

function Sitemap() {
  return (
    <div id="content">
      <h1>Sitemap</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/gallery">Photo Gallery</Link></li>
        <li><Link to="/disclaimer">Disclaimer</Link></li>
        <li><Link to="/sitemap">Sitemap</Link></li>
      </ul>
    </div>
  );
}

export default Sitemap;