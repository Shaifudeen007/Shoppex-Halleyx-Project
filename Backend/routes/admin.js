// routes/admin.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const router = express.Router(); // ✅ This was missing!

// Impersonate a customer by generating a customer JWT
router.post('/impersonate/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const token = jwt.sign(
      { id: customer._id, role: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Impersonation error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
