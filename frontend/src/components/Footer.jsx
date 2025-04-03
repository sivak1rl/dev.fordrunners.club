import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <img src="/logo.jpg" alt="Ford Runners Club" className="footer-logo" />
          <p className="footer-tagline">
            Running together for health, fitness, and community
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/FordRunnersClub/" className="social-link" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/fordrunnersclub" className="social-link" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.strava.com/" className="social-link" aria-label="Strava">
              <i className="fab fa-strava"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-nav">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/events" className="footer-link">Events</Link></li>
            <li><Link to="/new" className="footer-link">New Runners</Link></li>
            <li><Link to="/gallery" className="footer-link">Photo Gallery</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <ul id="contact-links" className="footer-contact-list">
            <li className="footer-contact-item">
              <span className="footer-contact-icon">
                <i className="fas fa-envelope"></i>
              </span>
              Please reach out to either rsivak [at ford.com] or efishe40 [at ford.com] to join our MS Teams Chat
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} Ford Runners Club. All rights reserved.
        </p>
        <div className="footer-legal">
          <Link to="/disclaimer" className="footer-legal-link">Disclaimer</Link>
          <Link to="/sitemap" className="footer-legal-link">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;