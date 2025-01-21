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
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching products!");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const groupedProducts = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <section className="products-section">
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="category-section">
          <h2>{category} Products</h2>
          <div className="product-list">
            {categoryProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="product"
              >
                <img
                  src={product.src}
                  alt={product.alt || "Product"}
                  onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                />
                <h3>{product.name}</h3>
                <p>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(product.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProductsSection;
