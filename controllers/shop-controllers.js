const Product = require('../models/product')
const HttpError = require('../models/http-error')

const getProducts = async (req, res, next) => {
  let products
  let queryCategory = req.query.category

  try {
    products = await Product.find()
  } catch (err) {
    return next(new HttpError('Fetching products failed'), 500)
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

module.exports = {
  getProducts,
  getProductById,
}
