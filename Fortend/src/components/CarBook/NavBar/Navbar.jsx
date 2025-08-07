



import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-first">Atto</span>
          <span className="logo-second">Cars</span>
        </Link>
        
        <div 
          className={`navbar-mobile-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/cars1" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Cars</Link>
          </li>
          <li>
            <Link to="/profile" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Profile</Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className="navbar-link login-link" 
              aria-label="Login"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;