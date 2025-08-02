import { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleResetPassword = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/customers/reset-password/${id}`);
      alert("Temporary password: " + res.data.tempPassword);
    } catch (err) {
      console.error("Reset failed", err);
      alert("Failed to reset password.");
    }
  };

  const handleImpersonate = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/admin/impersonate/${id}`);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (err) {
      console.error("Impersonation failed", err);
      alert("Impersonation failed.");
    }
  };

  if (loading) return <p className="text-center text-blue-600 font-semibold">Loading customers...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Customer List</h1>

        {customers.length === 0 ? (
          <p className="text-center text-gray-500">No customers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{c.first_name} {c.last_name}</td>
                    <td className="py-2 px-4">{c.email}</td>
                    <td className={`py-2 px-4 ${c.status === "Active" || !c.status ? "text-green-600" : "text-black"}`}>
                      {c.status || "Active"}
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => handleResetPassword(c._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => handleImpersonate(c._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        Impersonate
                      </button>
                      <a
                        href={`/customers/${c._id}`}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerList;
