import React, { useState } from "react";

function OrderManage() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      product: "Laptop",
      quantity: 2,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Jane Smith",
      product: "Phone",
      quantity: 1,
      status: "Shipped",
    },
  ]);

  const handleEdit = (id) => {
    console.log("Editing order:", id);
    // logic here
  };

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.customer}</td>
              <td className="border p-2">{order.product}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(order.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManage;
