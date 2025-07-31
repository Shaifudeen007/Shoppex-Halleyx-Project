import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const exploreProducts = [
  { id: 101, name: 'Smartwatch X200', price: 149.99, image: 'https://via.placeholder.com/150?text=Smartwatch+X200' },
  { id: 102, name: 'Wireless Headphones Pro', price: 199.99, image: 'https://via.placeholder.com/150?text=Headphones+Pro' },
  { id: 103, name: 'Gaming Keyboard RGB', price: 89.99, image: 'https://via.placeholder.com/150?text=Gaming+Keyboard' },
  { id: 104, name: '4K Action Camera', price: 249.99, image: 'https://via.placeholder.com/150?text=4K+Camera' },
  { id: 105, name: 'Bluetooth Speaker Boom', price: 59.99, image: 'https://via.placeholder.com/150?text=Bluetooth+Speaker' },
  { id: 106, name: 'Portable SSD 1TB', price: 119.99, image: 'https://via.placeholder.com/150?text=Portable+SSD' },
  { id: 107, name: 'Ergonomic Mouse', price: 39.99, image: 'https://via.placeholder.com/150?text=Ergonomic+Mouse' },
  { id: 108, name: 'Webcam Full HD', price: 69.99, image: 'https://via.placeholder.com/150?text=Webcam+HD' },
  { id: 109, name: 'Noise Cancelling Mic', price: 89.99, image: 'https://via.placeholder.com/150?text=Mic+Noise+Cancel' },
];

const ExploreProducts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.warning("You must log in to add items to cart!", { autoClose: 2000 });
      setTimeout(() => navigate('/register'), 2000);
    } else {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Explore New Products</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 text-sm px-4 py-2 rounded hover:bg-gray-300"
        >
           Back to Home
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exploreProducts.map((product) => (
          <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition-all">
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 mx-auto object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-center">{product.name}</h2>
            <p className="text-gray-600 text-center mb-3">${product.price.toFixed(2)}</p>
            <div className="flex justify-center">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProducts;
