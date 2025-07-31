import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios.get('http://localhost:5000/api/products', { params: { page } })
      .then(res => setProducts(res.data.products));
  }, [page]);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Admin - Products</h2>
      <Link to="/admin/create" className="btn">+ Create</Link>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <Link to={`/admin/products/${p._id}`}>{p.name} - ₹{p.price}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
};
export default ProductList;