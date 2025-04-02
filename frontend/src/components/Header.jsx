import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !menuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <Link to="/" className="header-logo">
            <img src="/logo.jpg" alt="Ford Runners Club" />
            <span className="header-logo-text">Ford Runners Club</span>
          </Link>
          
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
          
          <div 
            className={`nav-backdrop ${menuOpen ? 'active' : ''}`} 
            onClick={closeMenu}
            style={{ display: menuOpen ? 'block' : 'none' }}
          ></div>
          
          <nav className={`nav ${menuOpen ? 'active' : ''}`}>
            <button 
              className="nav-close" 
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>
            
            <div className="nav-header">
              <img src="/logo.jpg" alt="Ford Runners Club" width="80" />
            </div>
            
            <ul className="nav-menu">
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/new" 
                  className={`nav-link ${location.pathname === '/new' ? 'active' : ''}`}
                >
                  New Runners
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
                >
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Ford Runners Club</h1>
          <p className="hero-subtitle">Running together for health, fitness, and community</p>
        </div>
      </div>
    </>
  );
}

export default Header;