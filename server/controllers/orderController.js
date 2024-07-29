const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    const { products, total } = req.body;
    try {
        const order = new Order({ products, total });
        await order.save();
        res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
    };

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
    };
