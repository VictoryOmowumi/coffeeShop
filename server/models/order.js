const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: { type: String, required: true }, // Ensure _id is a String
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  address: { type: String, required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  date: { type: Date, required: true },
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
