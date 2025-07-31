import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Homepage from "./Homepage";
import AdminDashboard from "./admin-dashboard";
import Admin from "./Admin";

import CustomerManagement from "./CustomerManage";
import CustomerPortal from "./CustomerPortal";
import OrderManage from "./OrderManage";

import Profile from "./Profile";
import CustomerProductList from './CustomerProductList';
import CustomerProductDetail from './CustomerProductDetail';

import Cart from './Cart';
import ExploreProducts from "./exploreproduct";
import "./App.css";
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductDetail from './ProductDetail';

import { CartProvider } from "./CartContext"; // ✅ Wrap the app with this if using useCart()

function App() {
  return (
    <CartProvider> {/* ✅ Needed for useCart to work */}
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
         <Route path="/shop" element={<CustomerProductList />} />
<Route path="/shop/:id" element={<CustomerProductDetail />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/orders" element={<OrderManage />} />
  
          {/* Customer Pages */}
          <Route path="/customer-portal" element={<CustomerPortal />} />
        
           <Route path="/" element={<ProductList />} />
      <Route path="/create" element={<ProductForm />} />
      <Route path="/edit/:id" element={<ProductForm />} />
      <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/explore" element={<ExploreProducts />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
