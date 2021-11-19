const Product = require('../models/product')
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

const getCart = async (req, res, next) => {}

const postCart = async (req, res, next) => {}

const deleteCart = async (req, res, next) => {}

const getOrder = async (req, res, next) => {}

const createOrder = async (req, res, next) => {}

module.exports = {
  getProducts,
  getProductById,
  getCart,
  postCart,
  deleteCart,
  getOrder,
  createOrder,
}
