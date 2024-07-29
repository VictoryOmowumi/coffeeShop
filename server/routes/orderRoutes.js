const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', getOrders);

module.exports = router;