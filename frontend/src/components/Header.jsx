// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div id="header">
        <div id="banner-container">
          <div className="left25"></div>
          <div className="center100">
            <Link to="/">
              <img src="/logo.webp" alt="Ford Runners Club logo" id="logo" />
            </Link>
          </div>
          <div className="right25"></div>
          <div role="banner" tabIndex="0" aria-label="banner" id="banner"></div>
          <nav id="nav">
            <input 
              type="checkbox" 
              id="toggle" 
              checked={menuOpen}
              onChange={toggleMenu}
              aria-labelledby="waffle"
            />
            <label 
              htmlFor="toggle" 
              id="invisible" 
              aria-details="toggle" 
              aria-labelledby="waffle"
            ></label>
            <label 
              htmlFor="toggle" 
              id="waffle" 
              aria-details="toggle"
              aria-label="Toggle the navigation menu"
              onClick={toggleMenu}
            >☰</label>
            <ul>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link></li>
              <li><Link to="/new" onClick={() => setMenuOpen(false)}>New Runners</Link></li>
              <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
              <li><Link to="/gallery" onClick={() => setMenuOpen(false)}>Photo Gallery</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;