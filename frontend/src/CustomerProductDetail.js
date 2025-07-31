import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CustomerProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <p>In stock: {product.stock_quantity}</p>
    </div>
  );
};
export default CustomerProductDetail;
