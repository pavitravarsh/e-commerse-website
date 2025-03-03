import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext";
import "./styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(
          `Fetching: https://snail-backend.onrender.com/api/products/${id}`
        );
        const response = await axios.get(
          `https://snail-backend.onrender.com/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading">Loading product details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="error">Product not found.</p>;

  return (
    <div className="product-details">
      <div className="product-image">
        <img
          src={product.imageUrl || "/placeholder-image.jpg"}
          alt={product.name || "Product Image"}
          onError={(e) => (e.target.src = "/placeholder-image.jpg")}
        />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">
          {product.price
            ? new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(product.price)
            : "Price not available"}
        </p>
        <p className="description">
          {product.description || "No description available."}
        </p>
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>

      <div className="product-reviews">
        <h2>Product Reviews</h2>
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    </div>
  );
};

export default ProductDetails;
