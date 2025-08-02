import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsShipped = async (orderId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: "Shipped" }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Shipped" } : order
        )
      );
    } catch (err) {
      console.error(
        "Failed to update order status:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">All Orders</h1>

        {loading ? (
          <p className="text-center text-blue-600 font-medium">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
              >
                <p className="text-sm font-semibold mb-2 text-gray-700">
                  Order ID: <span className="text-gray-900">{order._id}</span>
                </p>

                <p className="mb-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Shipped" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>

                {order.customerId && (
                  <p className="text-sm mt-1 text-blue-700">
                    Customer: {order.customerId.first_name} {order.customerId.last_name} (
                    {order.customerId.email})
                  </p>
                )}

                <div className="mt-3">
                  <p className="font-semibold mb-1 text-gray-800">Items:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.productId?.name || "Unnamed Product"} — Qty: {item.quantity} — ₹
                        {item.productId?.price ?? "N/A"}
                      </li>
                    ))}
                  </ul>
                </div>

                {order.status !== "Shipped" && (
                  <button
                    onClick={() => markAsShipped(order._id)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded shadow transition"
                  >
                    Mark as Shipped
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
