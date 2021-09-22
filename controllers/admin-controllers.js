const HttpError = require('../models/http-error')
const Product = require('../models/product')

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

const editProduct = async (req, res, next) => {
  const { name, description, image, price, category, stocks } = req.body

  const productId = req.params.productId

  let editProduct
  try {
    editProduct = await Product.findById(productId)
  } catch (err) {
    return next(new HttpError('Something went wrong, try again later', 500))
  }

  editProduct.name = name
  editProduct.description = description
  editProduct.image = image
  editProduct.price = price
  editProduct.category = category
  editProduct.stocks = stocks

  try {
    await editProduct.save()
  } catch (err) {
    return next(new HttpError('Updating place failed', 500))
  }

  res.status(200).json({ place: editProduct.toObject({ getters: true }) })
}

const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId

  let deleteProduct
  try {
    deleteProduct = await Product.findById(productId)

    if (!deleteProduct) {
      return next(
        new HttpError('Could not find place for the provided id.', 404)
      )
    }
  } catch (err) {
    return next(
      new HttpError('Something went wrong, deleting place failed', 500)
    )
  }

  try {
    await deleteProduct.remove()
  } catch (err) {
    return next(
      new HttpError('Something went wrong, deleting place failed', 500)
    )
  }

  res.status(200).json({ message: 'A place has been deleted successfully.' })
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
}
