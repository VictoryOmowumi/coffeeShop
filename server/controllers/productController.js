const Product = require('../models/product');

// Create new product
exports.createProduct = async (req, res) => {
  const { name, description, category, price, stock, image } = req.body;  // Include image
  try {
    const product = new Product({ name, description, category, price, stock, image });  // Include image
    await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Unique Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Additional CRUD operations...
