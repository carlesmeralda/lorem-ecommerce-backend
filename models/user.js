const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        productId: { type: mongoose.Types.ObjectId, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  wishList: {
    items: [
      {
        productId: { type: mongoose.Types.ObjectId, required: true },
      },
    ],
  },
})

module.exports = mongoose.model('User', userSchema)
