const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)
