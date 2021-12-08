const HttpError = require('../models/http-error')
const Product = require('../models/product')

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

const addProduct = async (req, res, next) => {
  const { name, description, image, price, category, stocks } = req.body

  let existingProduct
  try {
    existingProduct = await Product.findOne({ name })
  } catch (err) {
    return next(new HttpError('Adding product failed, try again later'), 500)
  }

  if (existingProduct) {
    return next(new HttpError('Product already exist', 422))
  }

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

  res.status(201).json({ product: newProduct.toObject({ getters: true }) })
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
    return next(new HttpError('Updating product failed', 500))
  }

  res.status(200).json({ product: editProduct.toObject({ getters: true }) })
}

const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId

  let deleteProduct
  try {
    deleteProduct = await Product.findById(productId)

    if (!deleteProduct) {
      return next(
        new HttpError('Could not find product for the provided id.', 404)
      )
    }
  } catch (err) {
    return next(
      new HttpError('Something went wrong, deleting product failed', 500)
    )
  }

  try {
    await deleteProduct.remove()
  } catch (err) {
    return next(
      new HttpError('Something went wrong, deleting product failed', 500)
    )
  }

  res.status(200).json({ message: 'A product has been deleted successfully.' })
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
}
