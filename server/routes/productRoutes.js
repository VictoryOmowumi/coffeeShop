const express = require('express');
const { createProduct, getProducts, getCategories, updateProduct, deleteProduct, getLowStockProducts, getTopProducts } = require('../controllers/productController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/categories', getCategories);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/low-stock', getLowStockProducts);
router.get('/top-products', getTopProducts);

// Additional routes...

module.exports = router;
