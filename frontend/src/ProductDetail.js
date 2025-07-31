import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const deleteProduct = async () => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      navigate('/admin');
    }
  };

  if (!product) return <div>Loading...</div>;
  return (
    <div className="p-4">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <p>Stock: {product.stock_quantity}</p>
      <button onClick={() => navigate(`/admin/edit/${product._id}`)}>Edit</button>
      <button onClick={deleteProduct}>Delete</button>
    </div>
  );
};
export default ProductDetail;