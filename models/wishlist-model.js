const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('WishList', wishListSchema)
