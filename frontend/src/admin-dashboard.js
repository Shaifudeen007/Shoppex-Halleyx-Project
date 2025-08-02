import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    products: 0,
    customers: 0,
    orders: {
      Pending: 0,
      Processing: 0,
      Shipped: 0,
    },
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [productRes, customerRes, orderRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/customers"),
          axios.get("http://localhost:5000/api/orders"),
        ]);

        const orderStats = { Pending: 0, Processing: 0, Shipped: 0 };
        const orders = Array.isArray(orderRes.data)
          ? orderRes.data
          : orderRes.data.orders || [];

        orders.forEach((order) => {
          if (order.status in orderStats) {
            orderStats[order.status]++;
          }
        });

        setSummary({
          products: productRes.data.length,
          customers: customerRes.data.length,
          orders: orderStats,
        });
      } catch (err) {
        console.error("Error fetching admin summary:", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-5xl mx-auto border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-10 text-center">
          Admin Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 rounded-2xl shadow-md">
            <p className="text-sm text-blue-800">Total Products</p>
            <p className="text-3xl font-bold text-blue-900 mt-1">{summary.products}</p>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-2xl shadow-md">
            <p className="text-sm text-green-800">Total Customers</p>
            <p className="text-3xl font-bold text-green-900 mt-1">{summary.customers}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-5 rounded-2xl shadow-md">
            <p className="text-sm text-yellow-800">Orders</p>
            <p className="text-base font-semibold text-yellow-900 mt-1">
              Pending ({summary.orders.Pending})<br />
              Processing ({summary.orders.Processing})<br />
              Shipped ({summary.orders.Shipped})
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center flex-wrap gap-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-md"
            onClick={() => navigate('/products')}
          >
            Manage Products
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-md"
            onClick={() => navigate('/customers')}
          >
            View Customers
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-md"
            onClick={() => navigate('/orders')}
          >
            View Orders
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-all shadow-md"
            onClick={() => {
              localStorage.removeItem("token");
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
