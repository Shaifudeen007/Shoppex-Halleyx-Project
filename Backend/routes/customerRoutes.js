const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Fetch all customers (non-admins)
router.get('/', async (req, res) => {
  try {
    const customers = await User.find({
      $or: [{ isAdmin: false }, { isAdmin: { $exists: false } }],
    }).select('-password');

    res.json(customers);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
});

// Get single customer details
router.get('/:id', async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select('-password');
    if (!customer || customer.isAdmin) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    console.error("Error fetching customer:", err);
    res.status(500).json({ message: 'Failed to fetch customer' });
  }
});

// Reset password for a customer
router.post('/reset-password/:id', async (req, res) => {
  try {
    const tempPassword = Math.random().toString(36).slice(2, 10);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const customer = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    );

    if (!customer || customer.isAdmin) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Password reset successful', tempPassword });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: 'Password reset failed' });
  }
});

// Update profile
router.put('/:id', async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    const customer = await User.findById(req.params.id);
    if (!customer || customer.isAdmin) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.first_name = first_name || customer.first_name;
    customer.last_name = last_name || customer.last_name;
    customer.email = email || customer.email;

    await customer.save();
    res.status(200).json({ message: 'Profile updated successfully', customer });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Change password
router.put('/:id/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const customer = await User.findById(req.params.id);
    if (!customer || customer.isAdmin) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(newPassword, salt);

    await customer.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: 'Failed to change password' });
  }
});

module.exports = router;
