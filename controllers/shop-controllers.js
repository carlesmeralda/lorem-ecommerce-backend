const Product = require('../models/product')
const User = require('../models/user')
const HttpError = require('../models/http-error')

const getProducts = async (req, res, next) => {
  const queryLimit = req.query.limit
  const queryNew = req.query.new
  const queryAsc = req.query.asc
  const queryDesc = req.query.desc
  const queryHighest = req.query.highest
  const queryLowest = req.query.lowest
  const queryCategory = req.query.category

  let products
  if (queryLimit) {
    try {
      products = await Product.find().limit(6)
      // products = await Product.aggregate({ $sample: { size: 6 } })
    } catch (err) {
      return next(new HttpError('Fetching Products failed', 500))
    }
  } else if (queryNew) {
    try {
      products = await Product.find().sort({ createdAt: -1 }).limit(12)
    } catch (err) {
      return next(new HttpError('Fetching Products failed', 500))
    }
  } else if (queryAsc) {
    try {
      products = await Product.find().sort({ name: 1 })
    } catch (err) {
      return next(new HttpError('Fetching products failed', 500))
    }
  } else if (queryDesc) {
    try {
      products = await Product.find().sort({ name: -1 })
    } catch (err) {
      return next(new HttpError('Fetching products failed', 500))
    }
  } else if (queryHighest) {
    try {
      products = await Product.find().sort({ price: -1 })
    } catch (err) {
      return next(new HttpError('Fetching products failed', 500))
    }
  } else if (queryLowest) {
    products = await Product.find().sort({ price: 1 })
    try {
    } catch (err) {
      return next(new HttpError('Fetching products failed', 500))
    }
  } else if (queryCategory) {
    try {
      products = await Product.find({ category: queryCategory })
    } catch (err) {
      return next(new HttpError('Fetching products failed', 500))
    }
  } else {
    try {
      products = await Product.find()
    } catch (err) {
      return next(new HttpError('Fetching products failed', 500))
    }
  }

  if (!products) {
    return next(new HttpError('Could not find a products'), 404)
  }

  res.json({ products: products.map(p => p.toObject({ getters: true })) })
  // res.json({ products: products })
}

const getProductById = async (req, res, next) => {
  const productId = req.params.productId

  let product
  try {
    product = await Product.findById(productId)
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find a product.'),
      500
    )
  }

  if (!product) {
    return next(
      new HttpError('Could not find a product for the provided product id.'),
      404
    )
  }

  res.json({ product: product.toObject({ getters: true }) })
}

const getCart = async (req, res, next) => {
  const userId = '61a4581b372f1e163515acbb'

  let userCart
  try {
    userCart = await User.findById(userId).populate('cart')
  } catch (err) {
    return next(new HttpError('Something went wrong, could not find cart', 500))
  }

  if (!userCart || userCart.cart.length === 0) {
    return next(new HttpError('Cart is empty at the moment', 404))
  }

  res.json({
    cart: userCart.cart.map(item => item.toObject({ getters: true })),
  })
}

const addToCart = async (req, res, next) => {
  const userId = '61a4581b372f1e163515acbb'
  const { id, quantity } = req.body

  const cartProduct = {
    productId: id,
    quantity,
  }

  let user
  try {
    user = await User.findById(userId)
  } catch (err) {
    return next(new HttpError('Adding to cart failed', 500))
  }

  if (!user) {
    return next(new HttpError('Could not find user for the provided id', 404))
  }

  try {
    const itemIdx = user.cart.findIndex(
      item => item.productId.toString() === id
    )

    if (itemIdx === -1) {
      user.cart.push(cartProduct)
      await user.save()
    } else {
      return next(new HttpError('Item is already in cart', 422))
    }
  } catch (err) {
    return next(new HttpError('Adding to cart failed, try again', 500))
  }

  res.status(201).json({ cart: cartProduct })
}

const deleteCart = async (req, res, next) => {
  const userId = '61a4581b372f1e163515acbb'
  const productId = req.body.id

  let user
  try {
    user = await User.findById(userId)
  } catch (err) {
    return next(new HttpError('Deleting an item in cart failed', 500))
  }

  if (!user) {
    return next(new HttpError('Could not find user for the provided id', 404))
  }

  try {
    const newCart = user.cart.filter(
      item => item.productId.toString() !== productId
    )
    console.log(newCart)
    user.cart = newCart
    await user.save()
  } catch (err) {
    return next(
      new HttpError('Something went wrong, deleting item failed', 404)
    )
  }

  res.status(200).json({ message: 'An item has been removed succesfully' })
}

const getWish = async (req, res, next) => {
  const userId = '61a4581b372f1e163515acbb'

  let userWish
  try {
    userWish = await User.findById(userId).populate('wishList')
  } catch (err) {
    return next(new HttpError('Something went wrong, could not find cart', 500))
  }

  if (!userWish || userWish.wishList.length === 0) {
    return next(new HttpError('Wish list is empty at the moment', 404))
  }

  res.json({
    wishList: userWish.wishList.map(item => item.toObject({ getters: true })),
  })
}

const addToWish = async (req, res, next) => {
  const userId = '61a4581b372f1e163515acbb'
  const { id } = req.body

  const wishProduct = id

  let user
  try {
    user = await User.findById(userId)
  } catch (err) {
    return next(new HttpError('Adding to wish list failed', 500))
  }

  if (!user) {
    return next(new HttpError('Could not find user for the provided id', 404))
  }

  try {
    const itemIdx = user.wishList.findIndex(item => item._id.toString() === id)

    if (itemIdx === -1) {
      user.wishList.push(wishProduct)
      await user.save()
    } else {
      return next(new HttpError('Item is already in wish list', 422))
    }
  } catch (err) {
    return next(new HttpError('Adding to wish list failed, try again', 500))
  }

  res.status(201).json({ wishList: wishProduct })
}

const deleteWish = async (req, res, next) => {
  const userId = '61a4581b372f1e163515acbb'
  const productId = req.body.id

  let user
  try {
    user = await User.findById(userId)
  } catch (err) {
    return next(new HttpError('Deleting an item in wish list failed', 500))
  }

  if (!user) {
    return next(new HttpError('Could not find user for the provided id', 404))
  }

  try {
    const newWish = user.wishList.filter(
      item => item._id.toString() !== productId
    )
    user.wishList = newWish
    await user.save()
  } catch (err) {
    return next(
      new HttpError('Something went wrong, deleting item failed', 404)
    )
  }

  res.status(200).json({ message: 'An item has been removed succesfully' })
}

const clearCart = async (req, res, next) => {
  const userId = '61a4581b372f1e163515acbb'

  let user
  try {
    user = await User.findById(userId)
  } catch (err) {
    return next(new HttpError('Deleting an item in wish list failed', 500))
  }

  if (!user) {
    return next(new HttpError('Could not find user for the provided id', 404))
  }

  try {
    const emptyCart = []
    user.cart = emptyCart
    user.save()
  } catch (err) {
    return next(
      new HttpError('Something went wrong, clearing cart failed', 404)
    )
  }

  res
    .status(200)
    .json({ message: 'All items in cart has been removed successfulyy' })
}

const clearWish = async (req, res, next) => {
  const userId = '61a4581b372f1e163515acbb'

  let user
  try {
    user = await User.findById(userId)
  } catch (err) {
    return next(new HttpError('Deleting an item in wish list failed', 500))
  }

  if (!user) {
    return next(new HttpError('Could not find user for the provided id', 404))
  }

  try {
    const emptyWish = []
    user.wishList = emptyWish
    user.save()
  } catch (err) {
    return next(
      new HttpError('Something went wrong, clearing wish list failed', 404)
    )
  }

  res
    .status(200)
    .json({ message: 'All items in wish list has been removed successfulyy' })
}

const getOrder = async (req, res, next) => {}

const createOrder = async (req, res, next) => {}

module.exports = {
  getProducts,
  getProductById,
  getCart,
  addToCart,
  deleteCart,
  getWish,
  addToWish,
  deleteWish,
  clearCart,
  clearWish,
  getOrder,
  createOrder,
}
