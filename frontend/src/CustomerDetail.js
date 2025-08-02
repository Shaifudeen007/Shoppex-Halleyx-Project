import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const [userRes, orderRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/auth/users/${id}`),
          axios.get(`http://localhost:5000/api/orders/customer/${id}`)
        ]);
        setCustomer(userRes.data);
        setOrders(orderRes.data);
      } catch (err) {
        console.error("Failed to fetch customer data:", err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);

  if (loading) return <p>Loading customer details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!customer) return <p>Customer not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
        {customer.first_name} {customer.last_name}
      </h2>

      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Status:</strong> {customer.status || "N/A"}</p>
      </div>

      <h3 style={{ color: '#444' }}>Order History</h3>
      {orders.length > 0 ? (
        <ul style={{ paddingLeft: '20px' }}>
          {orders.map((o) => (
            <li key={o._id} style={{ marginBottom: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
              <strong>Order #{o._id}</strong> - ₹{o.total} - {new Date(o.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found for this customer.</p>
      )}
    </div>
  );
}

export default CustomerDetail;
