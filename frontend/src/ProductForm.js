import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [form, setForm] = useState({ name: '', price: '', stock_quantity: '', description: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) axios.get(`http://localhost:5000/api/products/${id}`).then(res => setForm(res.data));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/api/products/${id}`, form);
    } else {
      await axios.post('http://localhost:5000/api/products', form);
    }
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
      <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" required />
      <input type="number" value={form.stock_quantity} onChange={e => setForm({ ...form, stock_quantity: e.target.value })} placeholder="Stock" required />
      <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
};
export default ProductForm;