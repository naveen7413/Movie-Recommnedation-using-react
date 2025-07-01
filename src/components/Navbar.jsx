import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className='logo'> Movie@3</Link>  {/* Logo link */}
      </div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/search" className="nav-link">Search</Link>
        </li>
        <li>
          <Link to="/categories" className="nav-link">Categories</Link>
        </li>
        <li>
          <Link to="/recommendations" className="nav-link">Get Recommendations</Link>
        </li>
        <li>
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
        </li>
      </ul>
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default Navbar;
