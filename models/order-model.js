const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'Peding' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
