import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Homepage from "./Homepage";
import AdminDashboard from "./admin-dashboard";
import Admin from "./Admin";
import Profile from "./Profile";
import AdminProducts from "./AdminProducts";
import ShopPage from "./ShopPage";
import AdminOrdersPage from "./AdminOrderPages";
import CustomerList from "./CustomerList"; // ✅ New
import CustomerDetail from "./CustomerDetail"; // ✅ New
import Impersonation from "./Impersonation"; // ✅ New
import About from "./About";
import "./App.css";
import Contact from './Contact';
import ProductsShowcase from "./ProductShowCase";



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
<Route path="/explore" element={<ProductsShowcase />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/orders" element={<AdminOrdersPage />} />
        <Route path="/customers" element={<CustomerList />} /> {/* ✅ View all customers */}
        <Route path="/customers/:id" element={<CustomerDetail />} /> {/* ✅ Edit/view customer */}
        <Route path="/impersonate/:id" element={<Impersonation />} /> {/* ✅ Impersonate user */}
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
        {/* Customer Pages */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
