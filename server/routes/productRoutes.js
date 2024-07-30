const express = require('express');
const { createProduct, getProducts, getCategories } = require('../controllers/productController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createProduct);
router.get('/', getProducts);
router.get('/categories', getCategories);


// Additional routes...

module.exports = router;
