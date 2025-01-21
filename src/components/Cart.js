import React from "react";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
