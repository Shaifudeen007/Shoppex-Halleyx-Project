import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products', { params: { page } })
      .then(res => setProducts(res.data.products));
  }, [page]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Shop Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map(p => (
          <Link to={`/shop/${p._id}`} key={p._id} className="border p-2 rounded">
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};
export default CustomerProductList;
