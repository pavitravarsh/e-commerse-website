import React from "react";
import "./styles/InfoSection.css"; // Create this CSS file for InfoSection-specific styles

function InfoSection() {
  return (
    <section className="info-section">
      <div className="info-text">
        <h2>
          Snailedit: Your daily essentials—capture moments, stay stylish, and
          add a pop of fun.
        </h2>
        <button>Our Story</button>
      </div>
      <div className="info-image">
        <img src="images/Banner.jpg" alt="Skincare Routine" />
      </div>
    </section>
  );
}

export default InfoSection;
