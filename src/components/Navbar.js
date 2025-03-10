import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./firebaseConfig";
import "./styles/Navbar.css";

const Navbar = ({ cartItemCount = 0 }) => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userInitial, setUserInitial] = useState(null);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
        setUserInitial(
          user.displayName
            ? user.displayName.charAt(0).toUpperCase()
            : user.email.charAt(0).toUpperCase()
        );
      } else {
        setUserName(null);
        setUserInitial(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Cart Items Count:", cartItemCount); // Debugging
  }, [cartItemCount]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        setUserName(null);
        setUserInitial(null);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <header>
      <nav className="navbar">
        {/* Logo */}
        <img src="/images/logo.jpg" alt="Logo" className="logo" />

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/our-story"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Our Story
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/editorial"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Editorial
            </NavLink>
          </li>
          {!userName && (
            <li>
              <NavLink
                to="/signin"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Sign In
              </NavLink>
            </li>
          )}
        </ul>

        {/* Search Form */}
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

        {/* Cart Icon */}
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          <i className="fa fa-shopping-cart"></i>
          <span className="cart-badge">{cartItemCount}</span>{" "}
          {/* Always visible */}
        </div>

        {/* Account Container (Dropdown) */}
        <div
          className="account-container"
          onClick={() => setDropdownOpen((prev) => !prev)}
          ref={dropdownRef}
        >
          <div className="account-logo">
            {userInitial ? (
              <span className="user-initial">{userInitial}</span>
            ) : (
              <i className="fa fa-user"></i>
            )}
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && userName && (
            <div className="dropdown-menu">
              <p className="dropdown-item">{userName}</p>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
