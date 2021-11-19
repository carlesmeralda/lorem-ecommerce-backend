const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shop-controllers')

router.get('/products', shopController.getProducts)

router.get('/products/:productId', shopController.getProductById)

router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postCart)

router.delete('/cart/:productId', shopController.deleteCart)

router.get('/orders', shopController.getOrder)

router.get('/orders/create', shopController.createOrder)

module.exports = router
