// File: client/src/pages/Admin/CustomerManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    fetchCustomers();
  }, [search, status]);

  const fetchCustomers = async () => {
    const res = await axios.get("/api/customers", {
      params: { search, status },
    });
    setCustomers(res.data);
  };

  const toggleStatus = async (id, action) => {
    await axios.patch(`/api/customers/${id}/status`, { action });
    fetchCustomers();
  };

  const impersonate = (id) => {
    axios.post(`/api/customers/${id}/impersonate`).then(() => {
      window.location.href = "/"; // Redirect to customer portal
    });
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Are you sure to delete this customer?")) {
      await axios.delete(`/api/customers/${id}`);
      fetchCustomers();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customers</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search name/email"
          className="border px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-2 py-1"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, i) => (
            <tr key={c._id} className="text-center border-t">
              <td>{i + 1}</td>
              <td>{c.firstName} {c.lastName}</td>
              <td>{c.email}</td>
              <td>{c.status}</td>
              <td className="space-x-2">
                <button className="text-blue-500" onClick={() => impersonate(c._id)}>Impersonate</button>
                {c.status === "Active" ? (
                  <button className="text-yellow-500" onClick={() => toggleStatus(c._id, "block")}>Block</button>
                ) : (
                  <button className="text-green-600" onClick={() => toggleStatus(c._id, "unblock")}>Unblock</button>
                )}
                <button className="text-red-600" onClick={() => deleteCustomer(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
