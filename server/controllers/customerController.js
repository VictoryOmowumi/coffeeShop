const Customer = require('../models/customer');

exports.createCustomer = async (req, res) => {
    const { name, email, address, phone } = req.body;
    try {
        const customer = new Customer({ name, email, address, phone });
        await customer.save();
        res.status(201).json({ message: 'Customer created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
    };

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
    };


exports.updateCustomer = async (req, res) => {
    const { name, email, address, phone } = req.body;
    try {
        await Customer.findOneAndUpdate(
            { _id: req.params.id },
            { name, email, address, phone }
        );
        res.json({ message: 'Customer updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
    };

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.deleteOne({ _id: req.params.id });
        res.json({ message: 'Customer deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
    };
    