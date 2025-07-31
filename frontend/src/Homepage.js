// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// ✅ Import images correctly
import widgetA from './assets/14pro.jpg';
import widgetB from './assets/asusrog.jpg';
import widgetC from './assets/macbookaim2.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    { name: 'iPhone 14 Pro', image: widgetA },
    { name: 'Asus ROG', image: widgetB },
    { name: 'MacBook Air M2', image: widgetC },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-extrabold text-blue-700 tracking-wide">
          Shoppex
        </div>
        <div className="space-x-3">
          <button
            className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate('/Login')}
          >
            Login
          </button>
          <button
            className="px-5 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-lg hover:bg-indigo-50 transition"
            onClick={() => navigate('/Register')}
          >
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow px-6 sm:px-12 py-16">
        <section className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Welcome to <span className="text-blue-600">Shoppex</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Don't delay — purchase today!
          </p>
          <button
            className="px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-black transition"
            onClick={() => navigate('/explore')}
          >
            Explore Products
          </button>
        </section>

        {/* Featured Products */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredProducts.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-xl font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 mt-12 border-t">
        © {new Date().getFullYear()} <span className="font-semibold">Shoppex</span> &nbsp;|&nbsp;
        <a href="#" className="hover:text-blue-600">About</a> &nbsp;|&nbsp;
        <a href="#" className="hover:text-blue-600">Contact</a> &nbsp;|&nbsp;
        <a href="#" className="hover:text-blue-600">Policies</a>
      </footer>
    </div>
  );
};

export default HomePage;
