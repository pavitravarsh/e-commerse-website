import React from "react";
import "./styles/HeroSection.css"; // Create this CSS file for HeroSection-specific styles

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Snailedit: Level up your daily look with our pop-up essentials.</h1>
        <button>Shop Our Products</button>
      </div>
      <div className="hero-image">
        <img src="images/Banner1.jpg" alt="Products" />
      </div>
    </section>
  );
}

export default HeroSection;
