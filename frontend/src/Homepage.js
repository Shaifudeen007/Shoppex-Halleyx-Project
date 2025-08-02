import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

const HomePage = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      name: 'iPhone 14 Pro',
      image: 'https://www.designinfo.in/wp-content/uploads/2023/02/71yzJoE7WlL._SX679_.jpg',
    },
    {
      name: 'Asus ROG',
      image: 'https://in.store.asus.com/media/catalog/product/g/6/g614ju-n3200ws_4-zone_rgb_eclps_gry_1_.png',
    },
    {
      name: 'MacBook Air M2',
      image: 'https://www.designinfo.in/wp-content/uploads/2023/10/Apple-13.6-MacBook-Air-M2-Starlight-1.webp',
    },
  ];

  const categories = [
    'Smartphones',
    'Laptops',
    'Accessories',
    'Gaming',
    'Smart Home',
    'Wearables',
  ];

  const testimonials = [
    {
      name: 'Vishnu Priyan',
      review: 'Shoppex is my go-to store! Amazing prices and reliable delivery.',
    },
    {
      name: 'Ganesh Balaji',
      review: 'Great service and quality products. Totally recommended!',
    },
    {
      name: 'Ragavi R',
      review: 'Loved the experience. Simple checkout and fast shipping.',
    },
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
        <motion.section
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
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
        </motion.section>

        {/* Featured Products */}
        <motion.section
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredProducts.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 transition text-center"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-contain mb-4"
                />
                <p className="text-xl font-medium">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Shop With Us */}
        <motion.section
          className="mt-24 max-w-5xl mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Shop With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div className="bg-white p-6 rounded-lg shadow" whileHover={{ scale: 1.05 }}>
              <h3 className="font-semibold text-lg mb-2 text-blue-600">Low Prices</h3>
              <p className="text-gray-600">We keep margins low so you save more.</p>
            </motion.div>
            <motion.div className="bg-white p-6 rounded-lg shadow" whileHover={{ scale: 1.05 }}>
              <h3 className="font-semibold text-lg mb-2 text-blue-600">Genuine Products</h3>
              <p className="text-gray-600">Every item is authentic and warranty-protected.</p>
            </motion.div>
            <motion.div className="bg-white p-6 rounded-lg shadow" whileHover={{ scale: 1.05 }}>
              <h3 className="font-semibold text-lg mb-2 text-blue-600">Fast Shipping</h3>
              <p className="text-gray-600">Get your orders quickly and reliably.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Categories */}
        <motion.section
          className="mt-24 max-w-5xl mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, idx) => (
              <motion.span
                key={idx}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm hover:bg-blue-200 cursor-pointer transition"
                whileHover={{ scale: 1.1 }}
              >
                {cat}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          className="mt-24 max-w-5xl mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.02 }}
              >
                <p className="italic text-gray-700 mb-4">“{item.review}”</p>
                <p className="font-semibold text-blue-700">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter */}
        <motion.section
          className="mt-24 max-w-3xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get exclusive deals, latest releases & news from Shoppex!
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 mt-20 border-t">
        © {new Date().getFullYear()} <span className="font-semibold">Shoppex</span> &nbsp;|&nbsp;
        <Link to="/about" className="hover:text-blue-600">About</Link> &nbsp;|&nbsp;
        <Link to="/contact" className="hover:text-blue-600">Contact</Link> &nbsp;|&nbsp;
        <Link to="/policies" className="hover:text-blue-600">Policies</Link>
      </footer>
    </div>
  );
};

export default HomePage;
