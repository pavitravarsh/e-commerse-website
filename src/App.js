import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Ensure this path is correct based on your project structure
import HeroSection from "./components/HeroSection";
import MissionSection from "./components/MissionSection";
import ProductsSection from "./components/ProductsSection";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext"; // Import CartProvider
import "./App.css";

function App() {
  return (
    <CartProvider>
      {" "}
      {/* Wrap the app with CartProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ProductsSection />
                <MissionSection />
                <InfoSection />
              </>
            }
          />
          <Route path="/shop" element={<ProductsSection />} />
          <Route path="/our-story" element={<InfoSection />} />
          <Route path="/editorial" element={<MissionSection />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
