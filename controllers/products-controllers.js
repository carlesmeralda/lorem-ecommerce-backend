const Product = require('../models/product-model')
const HttpError = require('../models/http-error')

const getAllProducts = async (req, res, next) => {
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

const getProductById = async (req, res, next) => {}

const getProductsByCategory = async (req, res, next) => {}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
}
