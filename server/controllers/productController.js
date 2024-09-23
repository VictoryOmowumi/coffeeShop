const Product = require('../models/product');

// Create new product
exports.createProduct = async (req, res) => {
  const { name, description, category, price, stock, image } = req.body; 
  try {
    const product = new Product({ name, description, category, price, stock, image });  
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

// Update A Single Product
exports.updateProduct = async (req, res) => {
  const { name, description, category, price, stock, image } = req.body;  

  if (!name || !description || !category || price == null || stock == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await Product.findOneAndUpdate(
      { _id: req.params.id },
      { name, description, category, price, stock, image },
      { new: true, runValidators: true }
    );
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete A Single Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  }
  catch (err) {
    res.status(500).json({ message: 'Server error' });
  } 
};


exports.getLowStockProducts = async (req, res) => {
  const threshold = 15; // Define your threshold
  try {
    const lowStockProducts = await Product.find({ stock: { $lt: threshold } });
    res.json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// In your product controller
exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await Product.find()
      .sort({ sold: -1 }) // Assuming you have a 'sold' field to track sales
      .limit(5);

    res.status(200).json(topProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
