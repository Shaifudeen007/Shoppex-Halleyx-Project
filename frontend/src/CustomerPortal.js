import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomerPortal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const customer = location.state?.customer;

  if (!customer) {
    return (
      <div className="p-6 text-red-600">
        No customer data found. Please impersonate from admin panel.
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Impersonation Banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded mb-6 shadow-md">
        <strong>Impersonation Mode:</strong> You are acting as <span className="font-semibold">{customer.firstName} {customer.lastName}</span>.
        <button
          onClick={() => navigate('/admin')}
          className="ml-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Exit Impersonation
        </button>
      </div>

      {/* Customer Info */}
      <h1 className="text-2xl font-bold mb-4">Welcome, {customer.firstName}!</h1>
      <p className="mb-2"><strong>Email:</strong> {customer.email}</p>
      <p className="mb-6"><strong>Status:</strong> {customer.status}</p>

      {/* Example Order History */}
      <h2 className="text-xl font-semibold mb-2">Order History</h2>
      <ul className="list-disc list-inside bg-gray-100 p-4 rounded">
        <li>Order #1001 - Wireless Mouse - Delivered</li>
        <li>Order #1002 - USB Keyboard - Processing</li>
      </ul>
    </div>
  );
};

export default CustomerPortal;
