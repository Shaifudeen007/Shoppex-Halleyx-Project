import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalCost = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handlePlaceOrder = () => {
    alert('✅ Your order has been placed!');
    // Optional: Add logic to clear the cart here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
                <button
                  onClick={() => removeFromCart(index)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="text-right mb-4 text-lg font-semibold">
            Total: ${totalCost.toFixed(2)}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
