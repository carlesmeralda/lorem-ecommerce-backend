const express = require('express')
const router = express.Router()

const productsController = require('../controllers/products-controllers')

router.get('/', productsController.getAllProducts)

router.get('/:productId', productsController.getProductById)

// router.get('/', productsController.getProductsByCategory)

module.exports = router
