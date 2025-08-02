const Order = require('../models/Order');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public (you can add auth if needed)
const createOrder = async (req, res) => {
  try {
    const { customerId, items, totalAmount, status } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    const order = new Order({
      customerId,
      items,
      totalAmount,
      status: status || 'Pending', // Default status
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('items.productId', 'name price');

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};
