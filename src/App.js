import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MissionSection from "./components/MissionSection";
import ProductsSection from "./components/ProductsSection";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";
import "./App.css"; // Create this CSS file for global styles

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <MissionSection />
      <ProductsSection />
      <InfoSection />
      <Footer />
    </div>
  );
}

export default App;
