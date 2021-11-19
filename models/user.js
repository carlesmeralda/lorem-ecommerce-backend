const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true /*default: 1*/ },
    },
  ],

  wishList: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
})

// userSchema.methods.addToCart = function (product) {
//   const cartProductIdx = this.cart.items.findIndex(cp => {
//     return cp.productId.toString() === product._id.toString()
//     // return cp.productId === product.id ---> test later bc of getters true
//   })

//   let newQuantity = 1
//   const updatedCartItems = [...this.cart.items]

//   if (cartProductIdx >= 0) {
//     newQuantity = this.cart.items[cartProductIdx].quantity + 1
//   } else {
//     updatedCartItems.push({
//       productId: product._id, //product.id test later
//       quantity: newQuantity,
//     })
//   }

//   const updatedCart = {
//     items: updatedCartItems,
//   }

//   this.cart = updatedCart

//   return this.save()
// }

module.exports = mongoose.model('User', userSchema)
