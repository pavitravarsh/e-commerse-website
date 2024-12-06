import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/ProductsSection.css";

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // For filtering by category
  const [selectedSort, setSelectedSort] = useState("price"); // For sorting

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching products!");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Sort products based on selected option (price, popularity, newest)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "price") {
      return a.price - b.price;
    }
    if (selectedSort === "popularity") {
      return b.popularity - a.popularity;
    }
    if (selectedSort === "newest") {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <section className="products-section">
      {/* Category Filter */}
      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
          {/* Add more categories based on your data */}
        </select>

        {/* Sort Options */}
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="price">Sort by Price</option>
          <option value="popularity">Sort by Popularity</option>
          <option value="newest">Sort by Newest</option>
        </select>
      </div>

      {/* Display Products */}
      {sortedProducts.map((product) => (
        <div key={product._id} className="product">
          <img src={product.src} alt={product.alt} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </section>
  );
}

export default ProductsSection;
