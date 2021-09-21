const HttpError = require('../models/http-error')
const Product = require('../models/product')

const addProduct = async (req, res, next) => {
  const { name, description, image, price, category, stocks } = req.body

  const newProduct = new Product({
    name,
    description,
    image,
    price,
    category,
    stocks,
  })

  try {
    await newProduct.save()
  } catch (err) {
    return next(new HttpError('Could not add new product.', 500))
  }

  res.status(201).json({ product: newProduct })
}

const updateProduct = async (req, res, next) => {
  const { name, description, image, price, category, stocks } = req.body
}

const deleteProduct = async (req, res, next) => {}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
}
