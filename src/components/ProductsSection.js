import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/ProductsSection.css";

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://snail-backend.onrender.com/api/products") // Fetch products
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;

  // Group products by category and remove duplicates
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category?.trim() || "Uncategorized";
    if (!acc[category]) acc[category] = new Map(); // Use Map to prevent duplicates

    // Ensure unique products based on `_id`
    if (!acc[category].has(product._id)) {
      acc[category].set(product._id, product);
    }

    return acc;
  }, {});

  return (
    <section className="products-section">
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="category-section">
          <h2>{category} Products</h2>
          <div className="product-list">
            {[...categoryProducts.values()].map((product) => {
              // Extract numeric price safely
              const numericPrice = product.price
                ? parseFloat(product.price.replace(/[^\d.]/g, ""))
                : NaN;
              const price = !isNaN(numericPrice)
                ? new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(numericPrice)
                : "N/A";

              return (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="product"
                >
                  <img
                    src={
                      product.src && product.src.trim()
                        ? product.src
                        : "/placeholder-image.jpg"
                    }
                    alt={product.alt || "Product Image"}
                    onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                  />
                  <h3>{product.name || "Unnamed Product"}</h3>
                  <p>Price: {price}</p>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProductsSection;
