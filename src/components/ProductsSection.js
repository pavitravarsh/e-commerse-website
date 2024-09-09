import React from "react";
import "./styles/ProductsSection.css"; // Create this CSS file for ProductsSection-specific styles

const products = [
  {
    id: 1,
    src: "images/product1.jpg",
    alt: "Vertical Polaroids",
    name: "Vertical Polaroids",
    price: "99.00 INR",
  },
  {
    id: 2,
    src: "images/product2.jpg",
    alt: "Strips Polaroids",
    name: "Strips Polaroids",
    price: "99.00 INR",
  },
  {
    id: 3,
    src: "images/product3.jpg",
    alt: "Square Polaroids",
    name: "Square Polaroids",
    price: "99.00 INR",
  },
  {
    id: 4,
    src: "images/product4.jpg",
    alt: "Horizontal Polaroids",
    name: "Horizontal Polaroids",
    price: "99.00 INR",
  },
];

function ProductsSection() {
  return (
    <section className="products-section">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.src} alt={product.alt} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </section>
  );
}

export default ProductsSection;
