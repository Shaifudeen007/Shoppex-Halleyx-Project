import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const allProducts = [
  {
    _id: 1,
    name: "iPhone 14 Pro",
    image: "https://m.media-amazon.com/images/I/71ZDY57yTQL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 2,
    name: "Samsung Galaxy S23",
    image: "https://m.media-amazon.com/images/I/61RZDb2mQxL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 3,
    name: "OnePlus 11R",
    image: "https://m.media-amazon.com/images/I/61IiuWQcVjL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 4,
    name: "MacBook Air M2",
    image: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 5,
    name: "Dell XPS 13",
    image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 6,
    name: "Asus ROG Zephyrus",
    image: "https://dlcdnwebimgs.asus.com/gain/9E8B3BDF-4BB7-45CC-B7BE-F38810969B9A/w260/fwebp",
  },
  {
    _id: 7,
    name: "HP Pavilion Gaming",
    image: "https://images-cdn.ubuy.co.in/633ac3d5db44c968516c7482-hp-pavilion-gaming-15-inch-laptop-intel.jpg",
  },
  {
    _id: 8,
    name: "Sony WH-1000XM4",
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 9,
    name: "Apple Watch Series 9",
    image: "https://rukminim2.flixcart.com/image/704/844/xif0q/smartwatch/s/q/r/-original-imagte6xkwbyutkk.jpeg?q=90&crop=false",
  },
  {
    _id: 10,
    name: "iPad Air 5th Gen",
    image: "https://m.media-amazon.com/images/I/61XZQXFQeVL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 11,
    name: "Canon EOS 1500D",
    image: "https://m.media-amazon.com/images/I/914hFeTU2-L._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 12,
    name: "GoPro HERO11",
    image: "https://m.media-amazon.com/images/I/51QEQo4BgOL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 13,
    name: "Samsung Galaxy Tab S8",
    image: "https://m.media-amazon.com/images/I/61oJOj6S7XL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 14,
    name: "JBL Flip 6",
    image: "https://m.media-amazon.com/images/I/71U-RiE-TCL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 15,
    name: "Amazon Echo Dot 5",
    image: "https://m.media-amazon.com/images/I/71QjDQ97NEL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 16,
    name: "Mi 4K Smart TV Stick",
    image: "https://m.media-amazon.com/images/I/51B1M0g+OrL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 17,
    name: "Samsung 27\" Monitor",
    image: "https://m.media-amazon.com/images/I/61+L4A2vp1L._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 18,
    name: "Logitech MX Master 3",
    image: "https://m.media-amazon.com/images/I/61X7C7vKk7L._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 19,
    name: "Apple AirPods Pro",
    image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: 20,
    name: "Boat Airdopes 141",
    image: "https://m.media-amazon.com/images/I/51HBom8xz7L._AC_UY327_FMwebp_QL65_.jpg",
  },
].map((product) => ({
  ...product,
  price: (Math.random() * 50000 + 1000).toFixed(0),
}));

const ProductsShowcase = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  const startIndex = (page - 1) * itemsPerPage;
  const paginated = allProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = () => {
    navigate("/register");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Explore Top Electronics
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {paginated.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded shadow hover:shadow-lg p-4 transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <button
              onClick={handleAddToCart}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {[1].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-1 rounded ${
              p === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsShowcase;
