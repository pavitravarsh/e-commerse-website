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
        <form action="/search" method="get">
          <input type="text" name="q" placeholder="Search..." />
          <i
            type="submit"
            id="search"
            className="fa-solid fa-magnifying-glass"
          ></i>
        </form>
        <button class="signin">SIGN IN</button>
      </nav>
    </header>
  );
}

export default Header;
