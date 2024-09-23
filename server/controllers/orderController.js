const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const generateOrderId = async () => {
  let orderId;
  let exists = true;

  while (exists) {
    // Generate a new order ID
    const lastOrder = await Order.findOne().sort({ _id: -1 }).limit(1);
    const lastOrderId = lastOrder ? lastOrder._id : 'ORD00000';
    const lastOrderNumber = parseInt(lastOrderId.replace('ORD', ''), 10);
    const newOrderNumber = lastOrderNumber + 1;
    orderId = `ORD${String(newOrderNumber).padStart(5, '0')}`;

    // Check if the generated orderId already exists
    exists = await Order.exists({ _id: orderId });
  }

  return orderId;
};


exports.createOrder = async (req, res) => {
  const { customerId, address, products, date, total } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Generate a new order ID
    const orderId = await generateOrderId();

    // Create the new order with the generated ID
    const order = new Order({
      _id: orderId,
      customer: customerId,
      address,
      products: products.map(({ productId, quantity }) => ({
        product: productId,
        quantity
      })),
      date,
      total
    });

    // Validate and update stock for each product
    for (const item of products) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }

      product.stock -= item.quantity;
      await product.save({ session });
    }

    // Save the order
    await order.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    // Abort the transaction if something goes wrong
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer', 'name email');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate('customer', 'name email')
      .populate({
        path: 'products.product',
        select: 'name price', // Adjust fields based on your Product schema
      });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { address, products, date, total } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.address = address;
    order.products = products.map(({ productId, quantity }) => ({
      product: productId,
      quantity
    }));
    order.date = date;
    order.total = total;
    await order.save();
    res.status(200).json({ message: 'Order updated successfully', order });
  }
  catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params; // This should be the custom order ID
  try {
    const order = await Order.findOne({ _id: id }); // Use findOne if using custom ID as _id
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.deleteOne({ _id: id }); // Delete the document using deleteOne
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getSalesSummary = async (req, res) => {
  try {
    // Aggregate order data to get total sales and other summary info
    const salesSummary = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total" },
          totalOrders: { $sum: 1 },
          totalProductsSold: { $sum: { $sum: "$products.quantity" } },
        },
      },
    ]);

    const totalSales = salesSummary[0]?.totalSales || 0;
    const totalOrders = salesSummary[0]?.totalOrders || 0;

    // Calculate products in stock
    const products = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" },
        },
      },
    ]);

    const totalStock = products[0]?.totalStock || 0;

    // Format numbers
    const numberFormatter = new Intl.NumberFormat('en-US');
    const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    const summaryData = [
      {
        title: 'Total Sales',
        amount: currencyFormatter.format(totalSales),
        lastUpdated: `Updated ${Math.floor(Math.random() * 10) + 1} minutes ago`, // Example updated time
      },
      {
        title: 'Orders',
        amount: numberFormatter.format(totalOrders),
        lastUpdated: `Updated ${Math.floor(Math.random() * 10) + 1} minutes ago`,
      },
      {
        title: 'Products in Stock',
        amount: numberFormatter.format(totalStock),
        lastUpdated: `Updated ${Math.floor(Math.random() * 10) + 1} minutes ago`,
      },
    ];

    res.status(200).json(summaryData);

  } catch (err) {
    console.error("Error fetching sales summary:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// In your order controller
exports.getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate('customer', 'name email')
      .sort({ date: -1 })
      .limit(5); // Adjust the number to how many recent orders you want

    res.status(200).json(recentOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getSalesData = async (req, res) => {
  const { filter } = req.query;

  try {
    const matchStage = {};
    const startDate = new Date();

    // Adjust date range based on filter
    if (filter === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (filter === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (filter === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    matchStage.date = { $gte: startDate };

    const salesData = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { $dayOfWeek: "$date" },
          totalSales: { $sum: "$total" },
        },
      },
      {
        $project: {
          dayOfWeek: "$_id",
          totalSales: 1,
          _id: 0
        },
      },
      { $sort: { dayOfWeek: 1 } } // Sort by day of the week
    ]);

    // Map MongoDB's day of the week (1=Sunday, 7=Saturday) to labels
    const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const formattedSalesData = salesData.map((data) => ({
      day: dayLabels[data.dayOfWeek - 1],
      sales: data.totalSales
    }));

    // Ensure all days are represented
    const allDaysData = dayLabels.map((day, index) => {
      const foundData = formattedSalesData.find(data => data.day === day);
      return foundData || { day, sales: 0 };
    });

    res.status(200).json(allDaysData);

  } catch (err) {
    console.error("Error fetching sales data:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

