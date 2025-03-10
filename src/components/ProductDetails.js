import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext"; // Import the useCart hook
import "./styles/ProductDetails.css"; // Import styles

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const { addToCart } = useCart(); // Get addToCart function

  useEffect(() => {
    axios
      .get(`https://snail-backend.onrender.com/api/products/${id}`)
      .then((response) => {
        console.log("Fetched Product:", response.data); // Debugging
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product }); // Ensure a new object is passed to prevent reference issues
      setShowPopup(true); // Show popup

      // Hide popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details">
      <div className="product-image">
        <img
          src={product.src ? product.src : "/placeholder-image.jpg"}
          alt={product.alt || "Product Image"}
          onError={(e) => (e.target.src = "/placeholder-image.jpg")}
        />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(product.price)}
        </p>
        <p className="description">
          {product.description || "No description available."}
        </p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="cart-popup">
          <p>{product.name} added to cart! 🛒</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
