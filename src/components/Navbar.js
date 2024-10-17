import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Implement search functionality here
  };

  return (
    <header>
      <nav className="navbar">
        <img src="/images/logo.jpg" alt="Logo" className="logo" />
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/our-story">Our Story</Link>
          </li>
          <li>
            <Link to="/editorial">Editorial</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>{" "}
          {/* Add this line for Sign In */}
        </ul>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="q"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            id="search"
            className="fa-solid fa-magnifying-glass"
          ></button>
        </form>
      </nav>
    </header>
  );
};

export default Navbar;
