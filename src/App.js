import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Ensure this path is correct based on your project structure
import HeroSection from "./components/HeroSection";
import MissionSection from "./components/MissionSection";
import ProductsSection from "./components/ProductsSection";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/shop" element={<ProductsSection />} />
        <Route path="/our-story" element={<InfoSection />} />
        <Route path="/editorial" element={<MissionSection />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
