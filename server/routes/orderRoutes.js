const express = require('express');
const { createOrder, getOrders, getOrder, updateOrder, deleteOrder, getRecentOrders, getSalesData, getSalesSummary } = require('../controllers/orderController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/recent-orders', getRecentOrders);
router.get('/sales-data', getSalesData);
router.get('/sales-summary', getSalesSummary);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);


module.exports = router;