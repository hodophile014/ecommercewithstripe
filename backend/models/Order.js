const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ productId: String, quantity: Number }],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true },
  paymentIntentId: { type: String },
  
});

const Order = mongoose.model('Order', orderSchema);
module.exports=Order;