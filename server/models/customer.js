const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String }, // Optional email
  address: { type: String }, // Optional address
  phone: { type: String }, // Optional phone number
});

module.exports = mongoose.model('Customer', customerSchema);
