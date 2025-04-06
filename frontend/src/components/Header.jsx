// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    closeMenu();
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
              
              {/* Show these links only when user is authenticated */}
              {currentUser && (
                <>
                  <li>
                    <Link 
                      to="/profile" 
                      className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                    >
                      My Profile
                    </Link>
                  </li>
                  
                  {/* Admin-only link */}
                  {currentUser.is_admin && (
                    <li>
                      <Link 
                        to="/admin" 
                        className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="nav-link text-left w-full"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              
              {/* Show these links only when user is not authenticated */}
              {!currentUser && (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Ford Runners Club</h1>
          <p className="hero-subtitle">Running together for health, fitness, and community</p>
          
          {/* User greeting if logged in */}
          {currentUser && (
            <div className="text-white mt-4 bg-black bg-opacity-30 p-2 rounded-lg">
              Welcome back, {currentUser.username}!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
