const express = require('express')
const router = express.Router()

const productsController = require('../controllers/products-controllers')

router.get('/', productsController.getAllProducts)

router.get('/product/:productId', productsController.getProductById)

router.get('/product/', productsController.getProductsByCategory)

module.exports = router
