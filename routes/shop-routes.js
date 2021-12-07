const express = require('express')
const router = express.Router()
const cors = require('cors')

const shopController = require('../controllers/shop-controllers')

router.get('/products', shopController.getProducts)

router.get('/products/:productId', shopController.getProductById)

router.get('/cart/', shopController.getCart)

router.post('/cart/', shopController.addToCart)

router.delete('/cart/', shopController.deleteCart)

router.patch('/cart/', shopController.clearCart)

router.get('/wishlist/', shopController.getWish)

router.post('/wishlist/', shopController.addToWish)

router.delete('/wishlist/', shopController.deleteWish)

router.patch('/wishlist/', shopController.clearWish)

router.get('/orders', shopController.getOrder)

router.get('/orders/create', shopController.createOrder)

router.post('/checkout/', cors(), shopController.checkout)

module.exports = router
