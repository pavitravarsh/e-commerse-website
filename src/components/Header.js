import React from "react";
import "./styles/Header.css"; // Create this CSS file for Header-specific styles

function Header() {
  return (
    <header>
      <nav className="navbar">
        <img src="images/logo.jpg" alt="Logo" className="logo" />
        <ul className="nav-links">
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">Our Story</a>
          </li>
          <li>
            <a href="#">Editorial</a>
          </li>
        </ul>

        {/* Search form with a submit button */}
        <form action="/search" method="get" className="search-container">
          <input
            type="text"
            name="q"
            className="search-input"
            placeholder="Search..."
          />
          <button type="submit" className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <button className="signin">SIGN IN</button>
      </nav>
    </header>
  );
}

export default Header;
