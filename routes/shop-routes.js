const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shop-controllers')

router.get('/products', shopController.getProducts)

router.get('/products/:productId', shopController.getProductById)

// router.get('/cart/:userId', shopController.getCart)
router.get('/cart/', shopController.getCart)

router.post('/cart/', shopController.addToCart)

router.delete('/cart/:userId/:productId', shopController.deleteCart)

router.get('/wishlist/', shopController.getWish)

router.post('/wishlist/', shopController.addToWish)

router.delete('/wishlist/:userId/:productId', shopController.deleteWish)

router.get('/orders', shopController.getOrder)

router.get('/orders/create', shopController.createOrder)

module.exports = router
