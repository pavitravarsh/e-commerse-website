import React from "react";
import { useCart } from "./CartContext";
import "./styles/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.name}</h3>
              <p>
                ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
              </p>
              <button
                className="cart-button remove-button"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <h2 className="total-price">Total: ₹{totalPrice}</h2>
          <button className="cart-button clear-button" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
