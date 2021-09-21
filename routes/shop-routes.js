const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shop-controllers')

router.get('/products', shopController.getProducts)

router.get('/products/:productId', shopController.getProductById)

// router.get('/', productsController.getProductsByCategory)

module.exports = router
