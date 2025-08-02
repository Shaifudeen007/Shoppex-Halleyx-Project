const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import and use routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orderRoutes'); // ✅ match filename
const userRoutes = require('./routes/userRoutes'); // ✅ for admin/user actions

// 🆕 Customer management + impersonation
const customerRoutes = require('./routes/customerRoutes'); // new
const adminRoutes = require('./routes/admin'); // new

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth/users', userRoutes);

// 🆕 Mount new routes
app.use('/api/customers', customerRoutes); // Profile, Reset Password, Order History
app.use('/api/admin', adminRoutes);        // Impersonate Users

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
