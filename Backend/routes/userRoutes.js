// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // define schema if not yet

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("User fetch failed:", err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
