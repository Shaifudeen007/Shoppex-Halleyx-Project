const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ✅ Create new order
router.post('/', async (req, res) => {
  try {
    const { items, customerId } = req.body;

    const newOrder = new Order({
      items,
      customerId,
      status: 'Pending',
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// ✅ Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.productId', 'name price')
      .populate('customerId', 'first_name last_name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// ✅ Update order status
router.put('/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate('items.productId', 'name price')
      .populate('customerId', 'first_name last_name email');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
