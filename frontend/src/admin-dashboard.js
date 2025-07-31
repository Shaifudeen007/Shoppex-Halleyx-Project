import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm">Total Products</p>
            <p className="text-xl font-semibold">120</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm">Total Customers</p>
            <p className="text-xl font-semibold">310</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm">Orders</p>
            <p className="text-base font-medium">Pending (12) | Processing (7) | Shipped (5)</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate('/create')}
          >
            Products
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate('/customers')}
          >
            Customers
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate('/orders')}
          >
            Orders
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate('/settings')}
          >
            Settings
          </button>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => navigate('/')}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
