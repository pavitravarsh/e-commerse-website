import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth services
import app from "./firebaseConfig"; // Firebase config file with app initialization
import "./styles/Navbar.css"; // Add your custom CSS for Navbar

const Navbar = () => {
  const [query, setQuery] = useState(""); // Search query state
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const [userName, setUserName] = useState(null); // User's full name from Firebase
  const [userInitial, setUserInitial] = useState(null); // User's initial (first letter of name)

  // Fetch user data from Firebase when the component mounts
  useEffect(() => {
    const auth = getAuth(app); // Get Firebase Auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email); // Set user name or email if logged in
        setUserInitial(
          user.displayName
            ? user.displayName.charAt(0).toUpperCase()
            : user.email.charAt(0).toUpperCase()
        ); // Set the initial letter of the user
      } else {
        setUserName(null); // Reset userName and initial if not logged in
        setUserInitial(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Implement your search functionality here
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Handle user logout
  const handleLogout = () => {
    const auth = getAuth(app); // Get Firebase Auth instance
    signOut(auth)
      .then(() => {
        setUserName(null); // Clear username and initial after logout
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
          {/* Sign In link when not logged in */}
          {!userName && (
            <li>
              <Link to="/signin">Sign In</Link>
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

        {/* Account Container (Dropdown) */}
        <div className="account-container" onClick={toggleDropdown}>
          <div className="account-logo">
            {/* Display user's initial or default user icon */}
            {userInitial ? (
              <span className="user-initial">{userInitial}</span>
            ) : (
              <i className="fa fa-user"></i> // Default icon if no user logged in
            )}
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && userName && (
            <div className="dropdown-menu">
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
