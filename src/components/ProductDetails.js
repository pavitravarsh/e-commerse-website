import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext"; // Import the useCart hook
import "./styles/ProductDetails.css"; // Import styles if you have them

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { addToCart } = useCart(); // Destructure addToCart from the CartContext

  useEffect(() => {
    // Fetch product details using the product ID
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data); // Set the fetched product to state
        setLoading(false); // Set loading to false
      })
      .catch(() => {
        setError("Failed to load product details."); // Handle errors
        setLoading(false);
      });
  }, [id]);

  // Handle loading state
  if (loading) return <p>Loading product details...</p>;

  // Handle error state
  if (error) return <p>{error}</p>;

  return (
    <div className="product-details">
      {/* Left Section: Product Image */}
      <div className="product-image">
        <img
          src={product.imageUrl}
          alt={product.alt || "Product Image"}
          onError={(e) => (e.target.src = "/placeholder-image.jpg")} // Fallback image
        />
      </div>

      {/* Right Section: Product Details */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(product.price)}
        </p>
        <p className="description">{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>{" "}
        {/* Add to Cart button */}
      </div>

      {/* Optional: Reviews Section */}
      <div className="product-reviews">
        <h2>Product Reviews</h2>
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    </div>
  );
};

export default ProductDetails;
